const neo4j = require("neo4j-driver");
const faker = require("faker");
const { hash } = require("bcryptjs");
const driver = neo4j.driver(
  process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USER || "neo4j",
    process.env.NEO4J_PASSWORD || "letmein"
  )
);

const session = driver.session();
faker.locale = "en";

async function user() {
  const userQuery = `
         CREATE (a:User {seedID: $seedID, name: $name, email: $email, password: $password, avatar:$avatar, description:$description}) return a
         `;

  await session.run(userQuery, {
    seedID: 99999,
    name: "user",
    email: faker.internet.email(),
    password: await hash("pass", 10),
    avatar: faker.image.avatar(),
    description: faker.lorem.paragraphs()
  });

  for (let i = 0; i < 5; i++) {
    const password = await hash(faker.name.firstName(), 10);

    await session.run(userQuery, {
      seedID: i,
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: password,
      avatar: faker.image.avatar(),
      description: faker.lorem.paragraphs()
    });
  }
}

module.exports = user;
