const neo4j = require("neo4j-driver");
const faker = require("faker");
const driver = neo4j.driver(
  process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USER || "neo4j",
    process.env.NEO4J_PASSWORD || "letmein"
  )
);

const session = driver.session();
faker.locale = "en";

async function recipes() {
  const recipeQuery = `
          MATCH (b:User) WHERE b.seedID = $index
          CREATE (a:Recipe{seedID: $seedID,name:$name, description:$description, difficulty:$difficulty, 
          image:$image, time:$time})<-[:POSTS]-(b)
          RETURN ID(a)`;

  for (let i = 0, index = 0; i < 200; i++) {
    for (let j = 0; j < 3; j++, index++) {
      await session.run(recipeQuery, {
        index: i,
        seedID: index,
        name: faker.lorem.words(8),
        description: faker.lorem.paragraphs(3),
        difficulty: index % 2 ? "EASY" : "HARD",
        image: `https://spoonacular.com/recipeImages/${index + 1}-556x370.jpg`,
        time: faker.random.number(350)
      });
    }
  }
}

module.exports = recipes;
