const { sign } = require("jsonwebtoken");
const { compare, hash } = require("bcryptjs");

const resolvers = {
  Query: {
    recipeSearch: (_, args, context) => {
      const session = context.driver.session();

      const query = `
                MATCH(n:Recipe)
                WHERE (n.name) CONTAINS $recipeName
                RETURN n
            `;

      return session
        .run(query, args)
        .then(result =>
          result.records.map(record => record.get("recipe").properties)
        );
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

      return {
        token: token,
        userID: userID
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
          RETURN ID(c)
          `;

      const messageID = await session
        .run(messageQuery, {
          title: args.title,
          message: args.message,
          timestamp: args.timestamp
        })
        .then(results => results.records[0].get(0).low);

      return {
        _id: messageID
      };
    },

    async createUser(_, args, context) {
      const session = await context.driver.session();
      const password = await hash(args.password, 10);

      const query =
        "CREATE (n:User{name:$name, password:$password}) RETURN ID(n)";

      const userID = await session
        .run(query, { name: args.name, password })
        .then(results => results.records[0].get(0).low);

      const token = sign({ userId: userID }, process.env.JWT_SECRET);

      return {
        token: token,
        userID: userID
      };
    },

    async createRecipe(_, args, context) {
      const session = await context.driver.session();
      const { userID } = args;

      const userQuery = `MATCH (n:User) where ID(n) = ${userID} return n`;

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
