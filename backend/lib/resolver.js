const { sign } = require('jsonwebtoken');
const { compare, hash } = require('bcryptjs');
const { PubSub, withFilter } = require('apollo-server');

const pubsub = new PubSub();
pubsub.ee.setMaxListeners(30);

const resolvers = {
	Subscription: {
		messageRecived: {
			subscribe: withFilter(
				() => pubsub.asyncIterator('messageRecived'),
				(payload, variables) => {
					return payload.messageRecived.addresseeID.toString() === variables.id;
				}
			)
		}
	},
	Query: {
		async getWatch(_, args, context) {
			const session = await context.driver.session();
			const query = `MATCH (a:User)-[r:WATCHES]->(b:User) WHERE ID(a) = ${args.subscribingUser} AND ID(b) = ${args.subscribedUser} RETURN r`;

			const subscribed = await session.run(query).then((result) => result.records);

			return { subscribed: subscribed.length > 0 };
		}
	},
	Mutation: {
		async createWatchRelationship(_, args, context) {
			const session = await context.driver.session();
			const query = `MATCH (a:User), (b:User) WHERE ID(a) = ${args.subscribingUser} AND ID(b) = ${args.subscribedUser} CREATE (a)-[:WATCHES]->(b)`;

			await session.run(query).then((result) => result.records);

			return 200;
		},

		async removeWatchRelationship(_, args, context) {
			const session = await context.driver.session();
			const query = `MATCH (a:User)-[r:WATCHES]->(b:User) WHERE ID(a) = ${args.subscribingUser} AND ID(b) = ${args.subscribedUser} DELETE r`;

			await session.run(query).then((result) => result.records);

			return 200;
		},

		async login(_, args, context) {
			const session = await context.driver.session();
			const query = 'MATCH (n:User{name: $name}) RETURN n';
			const user = await session.run(query, { name: args.name }).then((result) => result.records);

			if (!user | (user.length <= 0)) {
				throw new Error('No such user found');
			}

			const userParams = user[0].get(0).properties;

			const valid = await compare(args.password, userParams.password);

			if (!valid) {
				throw new Error('Invalid password');
			}

			const token = sign({ userID: userParams.id }, process.env.JWT_SECRET);
			const userID = user[0].get(0).identity.low;
			const userName = user[0].get(0).properties.name;

			return {
				token: token,
				user: {
					_id: userID,
					name: userName
				}
			};
		},

		async createUser(_, args, context) {
			const session = await context.driver.session();
			const password = await hash(args.password, 10);

			const query = 'CREATE (n:User{name:$name, password:$password}) RETURN n';

			const user = await session.run(query, { name: args.name, password }).then((results) => {
				return {
					_id: results.records[0].get(0).identity.low,
					name: results.records[0].get(0).properties.name
				};
			});

			const token = sign({ userId: user._id }, process.env.JWT_SECRET);

			return {
				token: token,
				user: user
			};
		},

		async createComment(_, { input }, context) {
			const session = await context.driver.session();

			const commentQuery = `
          MATCH (a:User), (b:Recipe) WHERE ID(a) = ${input.userID} AND ID(b) = ${input.recipeID}
          CREATE (a)-[:COMMENTS]->(c:Comment{rating: $rating, description: $description, timestamp: $timestamp})
          <-[:HAS_COMMENT]-(b)
          RETURN c
          `;

			const comment = await session
				.run(commentQuery, {
					rating: input.rating,
					description: input.description,
					timestamp: input.timestamp
				})
				.then((results) => {
					return {
						id: results.records[0].get(0).identity.low,
						properties: results.records[0].get(0).properties
					};
				});

			return {
				id: comment.id,
				...comment.properties
			};
		},

		async createMessage(_, args, context) {
			const session = await context.driver.session();

			const addresseeID = args.addresseeID;
			const senderID = args.senderID;

			const messageQuery = `
          MATCH (a:User), (b:User) WHERE ID(a) = ${addresseeID} AND ID(b) = ${senderID}
          CREATE (b)<-[:SENT_FROM]-(c:Message{title: $title, message: $message, timestamp: $timestamp})
          -[:SENT_TO]->(a)
          RETURN ID(c), a, b
          `;

			const message = await session
				.run(messageQuery, {
					title: args.title,
					message: args.message,
					timestamp: args.timestamp
				})
				.then((results) => {
					return {
						id: results.records[0].get(0).low,
						...results.records[0].get(1).properties,
						addressee: {
							id: results.records[0].get(1).identity.low,
							...results.records[0].get(1).properties
						},
						sender: {
							id: results.records[0].get(2).identity.low,
							...results.records[0].get(2).properties
						}
					};
				});

			pubsub.publish('messageRecived', {
				messageRecived: {
					_id: message.id,
					id: message.id,
					...args,
					addressee: { ...message.addressee },
					sender: { ...message.sender }
				}
			});
			return {
				_id: message.id,
				id: message.id,
				...args,
				addressee: { ...message.addressee },
				sender: { ...message.sender }
			};
		},

		async editUser(_, { user }, context) {
			const session = await context.driver.session();

			let password;
			if (user.password) password = await hash(user.password, 10);

			let setter = '';
			if (user.name) setter += 'name: $name,';
			if (user.email) setter += 'email: $email,';
			if (user.password) setter += 'password: $password,';
			if (user.avatar) setter += 'avatar: $avatar,';
			if (user.description) setter += 'description: $description,';
			setter = setter.slice(0, -1);

			const query = `MATCH (a:User) WHERE a.name = '${user.oldName}' SET a += {${setter}} RETURN a`;

			const userData = await session
				.run(query, {
					name: user.name,
					email: user.email,
					password: password,
					avatar: user.avatar,
					description: user.description
				})
				.then((results) => {
					return {
						id: results.records[0].get(0).identity.low,
						_id: results.records[0].get(0).identity.low,
						...results.records[0].get(0).properties
					};
				});

			return {
				...userData
			};
		},

		// TODO: total refactor of this method
		// proper return
		// proper query
		async createRecipe(_, args, context) {
			const session = await context.driver.session();
			const { userID } = args;

			const userQuery = `MATCH (n:User) WHERE ID(n) = ${userID} RETURN n`;

			const user = await session.run(userQuery, { id: userID }).then((results) => {
				if (results.records[0]) return results.records[0].get(0);
			});

			if (!user) throw new Exception('Something went wrong. Please come back later');

			const recipeQuery = `
          MATCH (b:User) WHERE ID(b) = ${userID}
          CREATE (a:Recipe{name:$name, description:$description, difficulty:$difficulty, 
          image:$image, time:$time})<-[:POSTS]-(b)
          RETURN ID(a)
          `;

			const recipeID = await session
				.run(recipeQuery, {
					name: args.name,
					description: args.description,
					difficulty: args.difficulty,
					image: args.image,
					time: args.time,
					totalCost: args.totalCost
				})
				.then((results) => results.records[0].get(0).low);

			// FIXME: such spaghetti...
			let tagQueryBuilder = `
        MATCH (a:Recipe) WHERE ID(a) = ${recipeID}
        CREATE 
      `;

			for (let i = 0; i < args.tag.length; i++) {
				tagQueryBuilder += `(${String.fromCharCode(98 + i)}:Tag{name:'${args.tag[i].name}'})<-[:HAS_TAG]-(a) `;
			}

			const tagQuery = tagQueryBuilder.split(') (').join('), (');
			await session.run(tagQuery);

			let ingredientQueryBuilder = `
        MATCH (a:Recipe) WHERE ID(a) = ${recipeID}
        CREATE 
      `;

			for (let i = 0; i < args.ingredient.length; i++) {
				ingredientQueryBuilder += `(${String.fromCharCode(98 + i)}:Ingredient{name:'${args.ingredient[i]
					.name}', amount: '${args.ingredient[i].amount}'})<-[:HAS_INGREDIENT]-(a) `;
			}

			const ingredientgQuery = ingredientQueryBuilder.replace(') (', '), (');
			await session.run(ingredientgQuery);

			return {
				_id: recipeID
			};
		},

		async editRecipe(_, args, context) {
			const session = await context.driver.session();

			let setter = '';
			if (args.name) setter += 'name: $name,';
			if (args.description) setter += 'description: $description,';
			if (args.difficulty) setter += 'difficulty: $difficulty,';
			if (args.image) setter += 'image: $image,';
			if (args.time) setter += 'time: $time,';
			if (args.totalCost) setter += 'totalCost: $totalCost,';
			setter = setter.slice(0, -1);

			const recipeQuery = `MATCH (a:Recipe) WHERE ID(a) = ${args.id} SET a += {${setter}} RETURN a`;

			const recipe = await session
				.run(recipeQuery, {
					name: args.name,
					description: args.description,
					difficulty: args.difficulty,
					image: args.image,
					time: args.time,
					totalCost: args.totalCost
				})
				.then((results) => {
					return {
						...results.records[0].get(0).properties,
						id: results.records[0].get(0).identity.low
					};
				});

			const ingredientsClean = JSON.parse(JSON.stringify(args.ingredient));
			const ingredientRemove = `MATCH (a:Recipe)-[:HAS_INGREDIENT]->(b:Ingredient) WHERE ID(a) = ${args.id}
									DETACH DELETE b`;
			const ingredientQuery = `MATCH (a:Recipe) WHERE ID(a) = ${args.id}
									WITH $ingredients AS payload, a
									UNWIND payload AS ingredient
									MERGE (a)-[:HAS_INGREDIENT]->(c:Ingredient{name: ingredient.name, amount: ingredient.amount})
									RETURN collect(c)
									`;

			const ingredients = await session.run(ingredientRemove).then(async () => {
				return await session
					.run(ingredientQuery, {
						ingredients: ingredientsClean
					})
					.then((results) => {
						return results.records[0].get(0);
					});
			});

			const tagsClean = JSON.parse(JSON.stringify(args.tag));
			const tagRemove = `MATCH (a:Recipe)-[:HAS_TAG]->(b:Tag) WHERE ID(a) = ${args.id}
									DETACH DELETE b`;
			const tagQuery = `MATCH (a:Recipe) WHERE ID(a) = ${args.id}
							WITH $tags AS payload, a
							UNWIND payload AS tag
							MERGE (a)-[:HAS_TAG]->(c:Tag{name: tag.name})
							RETURN collect(c)`;

			const tags = await session.run(tagRemove).then(async () => {
				return await session
					.run(tagQuery, {
						tags: tagsClean
					})
					.then((results) => {
						return results.records[0].get(0);
					});
			});

			return {
				...recipe,
				ingredient: ingredients.map((it) => {
					return {
						id: it.identity.low,
						...it.properties
					};
				}),
				tag: tags.map((it) => {
					return {
						id: it.identity.low,
						...it.properties
					};
				})
			};
		}
	}
};

module.exports = resolvers;
