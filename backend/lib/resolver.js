const { sign } = require("jsonwebtoken");
const { compare, hash } = require("bcryptjs");
const { PubSub, withFilter } = require("apollo-server");

const pubsub = new PubSub();
pubsub.ee.setMaxListeners(30);

const resolvers = {
  Subscription: {
    messageRecived: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("messageRecived"),
        (payload, variables) => {
          return payload.messageRecived.addresseeID.toString() === variables.id;
        }
      )
    }
  },
  Mutation: {
    async login(_, args, context) {
      const session = await context.driver.session();
      const query = "MATCH (n:User{name: $name}) RETURN n";
      const user = await session
        .run(query, { name: args.name })
        .then(result => result.records);

      if (!user | (user.length <= 0)) {
        throw new Error("No such user found");
      }

      const userParams = user[0].get(0).properties;
      const valid = await compare(args.password, userParams.password);

      if (!valid) {
        throw new Error("Invalid password");
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
        .then(results => results.records[0].get(0).properties);

      return {
        ...comment
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
          RETURN ID(c), b
          `;

      const message = await session
        .run(messageQuery, {
          title: args.title,
          message: args.message,
          timestamp: args.timestamp
        })
        .then(results => {
          return {
            id: results.records[0].get(0).low,
            properties: results.records[0].get(1).properties
          };
        });

      pubsub.publish("messageRecived", {
        messageRecived: {
          _id: message.id,
          ...args,
          sender: { name: message.properties.name }
        }
      });
      return {
        _id: message.id
      };
    },

    async createUser(_, args, context) {
      const session = await context.driver.session();
      const password = await hash(args.password, 10);

      const query =
        "CREATE (n:User{name:$name, password:$password}) RETURN ID(n)";

      const user = await session
        .run(query, { name: args.name, password })
        .then(results => {
          return {
            _id: results.records[0].get(0).low,
            name: results.records[0].get(0).properties.name
          };
        });

      const token = sign({ userId: userID }, process.env.JWT_SECRET);

      return {
        token: token,
        user: user
      };
    },

    async editUser(_, { user }, context) {
      const session = await context.driver.session();

      let password;
      if (user.password) password = await hash(user.password, 10);

      let setter = "";
      if (user.name) setter += "name: $name,";
      if (user.email) setter += "email: $email,";
      if (user.password) setter += "password: $password,";
      if (user.avatar) setter += "avatar: $avatar,";
      if (user.description) setter += "description: $description,";
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
        .then(results => {
          return {
            _id: results.records[0].get(0).low,
            name: results.records[0].get(0).properties.name
          };
        });

      return {
        user: userData
      };
    },

    async createRecipe(_, args, context) {
      const session = await context.driver.session();
      const { userID } = args;

      const userQuery = `MATCH (n:User) WHERE ID(n) = ${userID} RETURN n`;

      const user = await session
        .run(userQuery, { id: userID })
        .then(results => {
          if (results.records[0]) return results.records[0].get(0);
        });

      if (!user)
        throw new Exception("Something went wrong. Please come back later");

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
          time: args.time
        })
        .then(results => results.records[0].get(0).low);

      // FIXME: such spaghetti...
      let tagQueryBuilder = `
        MATCH (a:Recipe) WHERE ID(a) = ${recipeID}
        CREATE 
      `;

      for (let i = 0; i < args.tag.length; i++) {
        tagQueryBuilder += `(${String.fromCharCode(98 + i)}:Tag{name:'${
          args.tag[i].name
        }'})<-[:HAS_TAG]-(a) `;
      }

      const tagQuery = tagQueryBuilder.replace(") (", "), (");
      await session.run(tagQuery);

      let ingredientQueryBuilder = `
        MATCH (a:Recipe) WHERE ID(a) = ${recipeID}
        CREATE 
      `;

      for (let i = 0; i < args.ingredient.length; i++) {
        ingredientQueryBuilder += `(${String.fromCharCode(
          98 + i
        )}:Ingredient{name:'${args.ingredient[i].name}', amount: '${
          args.ingredient[i].amount
        }'})<-[:HAS_INGREDIENT]-(a) `;
      }

      const ingredientgQuery = ingredientQueryBuilder.replace(") (", "), (");
      await session.run(ingredientgQuery);

      return {
        _id: recipeID
      };
    }
  }
};

module.exports = resolvers;
