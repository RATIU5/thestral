import { MongoClient } from "mongodb";

if (!import.meta.env.MONGODB_URI) {
  throw new Error("Invalid enviornment variable: ");
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
    return cachedMongo;
  }

  const mongo = await connectToDB();
  return mongo;
}

export async function seedDB(withTestData = false) {
  const db = (await getDB())?.db("thestral");
  if (!db) {
    throw new Error("Database not found");
  }

  const users = await db.createCollection("users");
  const templates = await db.createCollection("templates");
  const pages = await db.createCollection("pages");
}
