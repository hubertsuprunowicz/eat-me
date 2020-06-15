const { sign } = require('jsonwebtoken');
const { compare, hash } = require('bcryptjs');
const { PubSub, withFilter, UserInputError } = require('apollo-server');

const pubsub = new PubSub();
pubsub.ee.setMaxListeners(30);

const resolvers = {
	Subscription: {
		messageRecived: {
			subscribe: withFilter(
				() => pubsub.asyncIterator('messageRecived'),
				(payload, variables) => {
					return payload.messageRecived.addressee._id.toString() === variables.id;
				}
			)
		},
		newRecipeDiscover: {
			subscribe: withFilter(
				() => pubsub.asyncIterator('newRecipeDiscover'),
				(payload, variables) => {
					if (payload.newRecipeDiscover.subscribers && payload.newRecipeDiscover.subscribers.length > 0)
						return !!payload.newRecipeDiscover.subscribers.find((it) => it.toString() === variables.id);

					return false;
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
		},

		async watchesRecipes(_, args, context) {
			const session = await context.driver.session();

			const recipesRuery = `MATCH (a:User)-[:WATCHES]->(b:User)-[:POSTS]->(r:Recipe) WHERE ID(a) = ${args.id} RETURN collect(r), collect(b)`;

			const recipes = await session.run(recipesRuery).then((results) => {
				return {
					...results.records[0].get(0).map((it, index) => {
						return {
							...it.properties,
							_id: it.identity.low,
							user: {
								...results.records[0].get(1)[index].properties,
								_id: results.records[0].get(1)[index].identity.low
							}
						};
					})
				};
			});

			return Object.values(recipes);
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

			const userParams = {
				_id: user[0].get(0).identity.low,
				...user[0].get(0).properties
			};

			const valid = await compare(args.password, userParams.password);

			if (!valid) {
				throw new Error('Invalid password or username');
			}

			const token = sign({ userID: userParams._id }, process.env.JWT_SECRET);
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

			const userQuery = 'MATCH (n:User{name: $name}) RETURN n';
			const isUserExists = await session.run(userQuery, { name: args.name }).then((result) => result.records[0]);

			if (isUserExists) {
				throw new UserInputError('Existing user with the given name');
			}

			const query = `CREATE (n:User{name:$name, password:$password, timestamp: $timestamp})
						   RETURN n`;

			const user = await session
				.run(query, { name: args.name, password: password, timestamp: Date.now() })
				.then((results) => {
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
					timestamp: Date.now()
				})
				.then((results) => {
					return {
						_id: results.records[0].get(0).identity.low,
						properties: results.records[0].get(0).properties
					};
				});

			return {
				...comment.properties,
				_id: comment._id
			};
		},

		async deleteMessage(_, args, context) {
			const session = await context.driver.session();
			const query = `MATCH (m:Message) WHERE ID(m) = ${args.id} DETACH DELETE m`;

			await session.run(query).then((result) => result.records);

			return 200;
		},

		async deleteRecipe(_, args, context) {
			const session = await context.driver.session();
			const query = `MATCH (r:Recipe) WHERE ID(r) = ${args.id} DETACH DELETE r`;

			await session.run(query).then((result) => result.records);

			return 200;
		},

		async createMessage(_, args, context) {
			const session = await context.driver.session();

			const addresseeQuery = `MATCH (n:User{name: $addressee}) RETURN n`;
			const isAddresseeExists = await session
				.run(addresseeQuery, {
					addressee: args.addressee
				})
				.then((result) => result.records[0]);

			if (!isAddresseeExists) {
				throw new UserInputError('User does not exist');
			}

			const messageQuery = `
          MATCH (a:User{name: $addressee}), (b:User{name: $sender})
          CREATE (b)<-[:SENT_FROM]-(c:Message{message: $message, timestamp: $timestamp})
          -[:SENT_TO]->(a)
          RETURN c, a, b
		  `;

			const message = await session
				.run(messageQuery, {
					addressee: args.addressee,
					sender: args.sender,
					message: args.message,
					timestamp: Date.now()
				})
				.then((results) => {
					return {
						...results.records[0].get(0).properties,
						_id: results.records[0].get(0).identity.low,
						addressee: {
							...results.records[0].get(1).properties,
							_id: results.records[0].get(1).identity.low
						},
						sender: {
							...results.records[0].get(2).properties,
							_id: results.records[0].get(2).identity.low
						}
					};
				});

			pubsub.publish('messageRecived', {
				messageRecived: {
					...message,
					_id: message._id,
					addressee: message.addressee,
					sender: message.sender
				}
			});
			return {
				...message,
				_id: message._id,
				addressee: message.addressee,
				sender: message.sender
			};
		},

		async updateUser(_, { user }, context) {
			const session = await context.driver.session();
			const userQuery = 'MATCH (n:User{name: $name}) RETURN n';
			const isUserExists = await session.run(userQuery, { name: user.name }).then((result) => result.records[0]);

			if (isUserExists) {
				throw new UserInputError('Existing user with the given name');
			}

			if (user.email) {
				const emailQuery = 'MATCH (n:User{email: $email}) RETURN n';
				const isEmailExists = await session
					.run(emailQuery, { email: user.email })
					.then((result) => result.records[0]);

				if (isEmailExists) {
					throw new UserInputError('Email must be unique');
				}
			}

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
						...results.records[0].get(0).properties,
						_id: results.records[0].get(0).identity.low
					};
				});

			return userData;
		},

		// TODO: total refactor of this method
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
          MATCH (b:User) WHERE ID(b) = $userID
          CREATE (a:Recipe{name:$name, description:$description, difficulty:$difficulty, 
          image:$image, time:$time, totalCost:$totalCost, timestamp: $timestamp})<-[:POSTS]-(b)
          RETURN a, b
          `;

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
						user: {
							...results.records[0].get(1).properties,
							_id: results.records[0].get(1).identity.low
						},
						_id: results.records[0].get(0).identity.low
					};
				});

			// FIXME: such spaghetti...
			let tagQueryBuilder = `
        MATCH (a:Recipe) WHERE ID(a) = ${recipe._id}
        CREATE 
      `;

			for (let i = 0; i < args.tag.length; i++) {
				tagQueryBuilder += `(${String.fromCharCode(98 + i)}:Tag{name:'${args.tag[i]
					.name}', timestamp: ${Date.now()}})<-[:HAS_TAG]-(a) `;
			}

			const tagQuery = tagQueryBuilder.split(') (').join('), (');
			await session.run(tagQuery);

			let ingredientQueryBuilder = `
        MATCH (a:Recipe) WHERE ID(a) = ${recipe._id}
        CREATE 
      `;

			for (let i = 0; i < args.ingredient.length; i++) {
				ingredientQueryBuilder += `(${String.fromCharCode(98 + i)}:Ingredient{name:'${args.ingredient[i]
					.name}', amount: '${args.ingredient[i]
					.amount}', timestamp: ${Date.now()}})<-[:HAS_INGREDIENT]-(a) `;
			}

			const ingredientgQuery = ingredientQueryBuilder.split(') (').join('), (');
			await session.run(ingredientgQuery);

			const subsribingUserQuery = `MATCH (a:User), (b:User) WHERE id(a) = ${userID} MATCH (a)<-[:WATCHES]-(b) RETURN collect(ID(b))`;
			const subscribingUsers = await session.run(subsribingUserQuery).then((results) => {
				return results.records[0].get(0).map((it) => it.low);
			});

			pubsub.publish('newRecipeDiscover', {
				newRecipeDiscover: { ...recipe, subscribers: subscribingUsers }
			});

			return recipe;
		},

		async updateRecipe(_, args, context) {
			const session = await context.driver.session();

			let setter = `timestamp: ${Date.now()},`;
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
						_id: results.records[0].get(0).identity.low
					};
				});

			const ingredientsClean = JSON.parse(JSON.stringify(args.ingredient));
			const ingredientRemove = `MATCH (a:Recipe)-[:HAS_INGREDIENT]->(b:Ingredient) WHERE ID(a) = ${args.id}
									DETACH DELETE b`;
									const tagRemove = `MATCH (a:Recipe)-[:HAS_TAG]->(b:Tag) WHERE ID(a) = ${args.id}
									DETACH DELETE b`;
			const ingredientQuery = `MATCH (a:Recipe) WHERE ID(a) = ${args.id}
									WITH $ingredients AS payload, a
									UNWIND payload AS ingredient
									MERGE (a)-[:HAS_INGREDIENT]->(c:Ingredient{name: ingredient.name, amount: ingredient.amount, timestamp: ${Date.now()}})
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
			
			const tagQuery = `MATCH (a:Recipe) WHERE ID(a) = ${args.id}
							WITH $tags AS payload, a
							UNWIND payload AS tag
							MERGE (a)-[:HAS_TAG]->(c:Tag{name: tag.name, timestamp: ${Date.now()}})
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
						...it.properties,
						_id: it.identity.low
					};
				}),
				tag: tags.map((it) => {
					return {
						...it.properties,
						_id: it.identity.low
					};
				})
			};
		}
	}
};

module.exports = resolvers;
