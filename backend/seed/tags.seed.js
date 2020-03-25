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

const cuisines = [
    "Chinese food",
    "Indian cuisine",
    "Japanese Cuisine",
    "Italian food",
    "Mexican food",
    "Thai food",
    "Polish food",
    "Russian food",
    "Spanish cuisine",
    "German food",
    "Vegetarian food",
    "Sea food",
    "Turkish food",
    "Cuban food",
    "Irish food",
    "Ukrainian",
    "Egyptian"
  ];

async function tags() {
    const tagQuery = `
        MATCH (a:Recipe) WHERE a.seedID = $index
        CREATE (b:Tag{seedID: $seedID, name: $name})<-[:HAS_TAG]-(a)
      `;

  for (let index = 0, seedID = 0; index < 300; index++) {
    await session.run(tagQuery, {
      index: index,
      seedID: seedID,
      name: cuisines[Math.floor(Math.random() * cuisines.length)]
    }).then(_ => seedID++);


    await session.run(tagQuery, {
      index: index,
      seedID: index,
      name: cuisines[Math.floor(Math.random() * cuisines.length)]
    }).then(_ => seedID++);

    await session.run(tagQuery, {
      index: index,
      seedID: index,
      name: cuisines[Math.floor(Math.random() * cuisines.length)]
    }).then(_ => seedID++);
  }
}

module.exports = tags;
