const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { apolloUploadExpress  } = require('apollo-upload-server');
const express = require('express');
const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');
const { makeAugmentedSchema } = require('neo4j-graphql-js');
const bodyParser = require('body-parser');
const { IsAuthenticatedDirective, HasScopeDirective } = require('graphql-auth-directives');
const cors = require('cors');
const resolvers = require('./lib/resolver');
const typeDefs = require('./lib/schema/graphql-schema');
dotenv.config();

const schema = makeAugmentedSchema({
	typeDefs,
	resolvers,
	config: {
		query: true,
		mutation: false,
		auth: {
			hasRole: false,
			isAuthenticated: true,
			hasScope: false
		}
	},
	schemaDirectives: {
		isAuthenticated: IsAuthenticatedDirective,
		hasScope: HasScopeDirective
	}
});

const driver = neo4j.driver(
	process.env.NEO4J_URI || 'bolt://localhost:7687',
	neo4j.auth.basic(process.env.NEO4J_USER || 'neo4j', process.env.NEO4J_PASSWORD)
);

const checkErrorHeaderMiddleware = async (req, _res, next) => {
	req.error = req.headers['x-error'];
	next();
};

const app = express();
app.use(apolloUploadExpress());
app.use(bodyParser.json());
app.use('*', checkErrorHeaderMiddleware);
app.use(
	cors({
		credentials: true
	})
);

const server = new ApolloServer({
	schema: schema,
	introspection: true,
	playground: true,
	context: async ({ req, connection }) => {
		if (connection) {
			return connection.context;
		} else {
			return {
				headers: req.headers,
				driver
			};
		}
	},
	onConnect: (connectionParams) => {
		if (connectionParams.Authorization) {
			return true;
		}
		throw new Error('Missing auth token!');
	}
});

const port = process.env.GRAPHQL_LISTEN_PORT;
const path = '/graphql';

server.applyMiddleware({ app, path });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port }, () => {
	console.log(`🚀 GraphQL server ready at http://localhost:${port}${path}`);
	console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
});
