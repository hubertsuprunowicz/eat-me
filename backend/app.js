const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const neo4j = require("neo4j-driver");
const dotenv = require("dotenv");
const { makeExecutableSchema } = require("apollo-server");
const {
  makeAugmentedSchema,
  augmentSchema,
  augmentTypeDefs
} = require("neo4j-graphql-js");
const bodyParser = require("body-parser");
const {
  IsAuthenticatedDirective,
  HasScopeDirective
} = require("graphql-auth-directives");
const cors = require("cors");
const resolvers = require("./lib/resolver");
const typeDefs = require("./lib/schema/graphql-schema");
dotenv.config();

const schema = makeAugmentedSchema({
  typeDefs,
  resolvers,
  config: {
    query: true,
    mutation: true,
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
  process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USER || "neo4j",
    process.env.NEO4J_PASSWORD || "trudne10"
  )
);

const checkErrorHeaderMiddleware = async (req, res, next) => {
  req.error = req.headers["x-error"];
  next();
};

const app = express();
app.use(bodyParser.json());
app.use("*", checkErrorHeaderMiddleware);
app.use(
  cors({
    credentials: true
  })
);

const server = new ApolloServer({
  schema: schema,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    return {
      headers: req.headers,
      driver
    };
  }
});

const port = process.env.GRAPHQL_LISTEN_PORT;
const path = "/graphql";

server.applyMiddleware({ app, path });

let arr = [];
for (let i = 0; i < 100; i++) {
  arr.push({ id: i, name: "name - " + i, timestamp: "18 18 18: 2020" });
}
app.post("/test", (req, res) => {
  return res.send(arr.slice(req.body.offset, req.body.limit + req.body.offset));
});

app.listen({ port, path }, () => {
  console.log(`GraphQL server ready at http://localhost:${port}${path}`);
});
