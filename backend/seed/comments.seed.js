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

const min = 1580062625;
const max = Date.now();

async function comments() {
  const commentQuery = `
    MATCH (a:User), (b:Recipe) WHERE a.seedID = $seedX AND b.seedID = $seedY
    CREATE (a)-[:COMMENTS]->(c:Comment{rating: $rating, description: $description, timestamp: $timestamp})
    <-[:HAS_COMMENT]-(b)
    RETURN c
    `;

  for (let x = 0, seedID = 0; x < 300; x++) {
    for (let y = 0; y < 300; y++) {
      const randomDate = Math.floor(Math.random() * (max - min + 1) + min);

      await session
        .run(commentQuery, {
          seedX: x,
          seedY: y,
          seedID: seedID,
          rating: Math.floor(Math.random() * 5),
          description: faker.lorem.sentence(),
          timestamp: randomDate
        })
        .then(_ => seedID++);
    }
  }
}

module.exports = comments;
