import { Collection, Db, MongoClient, type OptionalId } from "mongodb";
import { faker } from "@faker-js/faker";

if (!import.meta.env.MONGODB_URI) {
  throw new Error("Invalid enviornment variable: MONGODB_URI");
}
const uri = import.meta.env.MONGODB_URI;
const options = {};
let cachedMongo: MongoClient | null;

async function connectToDB() {
  const mongo = await new MongoClient(uri, options).connect();
  return mongo;
}

export async function getDB() {
  if (import.meta.env.NODE_ENV === "development") {
    // @ts-ignore
    if (!global._mongoConnection) {
      // @ts-ignore
      global._mongoConnection = await connectToDB();
      // @ts-ignore
      cachedMongo = global._mongoConnection;
    }
    if (!cachedMongo) {
    }
    return cachedMongo;
  }

  const mongo = await connectToDB();
  return mongo;
}

export async function seedDB(withTestData = false) {
  if (!import.meta.env.DB_NAME) {
    throw new Error("Invalid enviornment variable: DB_NAME");
  }
  const db = (await getDB())?.db(import.meta.env.DB_NAME);
  if (!db) {
    throw new Error("database not found");
  }

  db.dropCollection("users");
  db.dropCollection("templates");
  db.dropCollection("pages");
  db.dropCollection("assets");
  db.dropCollection("languages");

  const users = await db.createCollection("users");
  const templates = await db.createCollection("templates");
  const pages = await db.createCollection("pages");
  const assets = await db.createCollection("assets");
  const languages = await db.createCollection("languages");

  if (withTestData) {
    addUsers(users as unknown as Collection<Document>, 4);
    addTemplates(templates as unknown as Collection<Document>, 2);
    addPages(pages as unknown as Collection<Document>, 3);
    addAssets(assets as unknown as Collection<Document>, 5);
    addLanguages(languages as unknown as Collection<Document>);
  }
}

function addUsers(users: Collection<Document>, count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    data.push(user);
  }
  users.insertMany(data as unknown as OptionalId<Document>[]);
}

function addTemplates(templates: Collection<Document>, count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const template = {
      name: faker.lorem.word(),
      templateId: faker.string.uuid(),
    };
    data.push(template);
  }
  templates.insertMany(data as unknown as OptionalId<Document>[]);
}

function addAssets(assets: Collection<Document>, count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const asset = {
      name: faker.lorem.word(),
      url: faker.internet.url(),
    };
    data.push(asset);
  }
  assets.insertMany(data as unknown as OptionalId<Document>[]);
}

function addPages(pages: Collection<Document>, count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const page = {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      keywords: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      path: `${faker.lorem.word()}/`,
      template: faker.lorem.word(),
      status: faker.helpers.arrayElement(["draft", "published", "review"]),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      publishedAt: faker.date.recent(),
      languages: [faker.helpers.arrayElement(["en", "es", "fr"])],
      widgets: [
        {
          id: faker.string.uuid(),
          order: 0,
          data: {
            en: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph(),
            },
          },
        },
        {
          id: faker.string.uuid(),
          order: 1,
          data: {
            en: {
              name: faker.lorem.word(),
              email: faker.internet.email(),
              tags: [
                faker.lorem.word(),
                faker.number.int(),
                faker.lorem.word(),
              ],
              age: faker.number.int({ min: 10, max: 80 }),
              color: faker.internet.color(),
            },
          },
        },
        {
          id: faker.string.uuid(),
          order: 2,
          data: {
            en: {
              title: faker.lorem.sentence(),
              description: faker.lorem.paragraph(),
            },
          },
        },
      ],
    };
    data.push(page);
  }
  pages.insertMany(data as unknown as OptionalId<Document>[]);
}

async function addLanguages(languages: Collection<Document>) {
  languages.insertOne({
    code: "en",
    name: "English",
  } as unknown as OptionalId<Document>);
}
