import { Db, MongoClient } from "mongodb";

let client: MongoClient;
export async function connect() {
  if (!client) {
    if (!import.meta.env.MONGODB_URI) {
      throw new Error("failed to read MONGODB_URI from env");
    }
    if (!import.meta.env.MONGODB_NAME) {
      throw new Error("failed to read MONGODB_NAME from env");
    }
    client = new MongoClient(import.meta.env.MONGODB_URI);
  }

  return await client.connect();
}

export async function disconnect() {
  return await client.close();
}

export async function executeQuery<T>(callback: (client: Db) => Promise<T>) {
  try {
    const db = await connect();
    return await callback(db.db(import.meta.env.MONGODB_NAME));
  } catch (e) {
    console.error(e);
  } finally {
    await disconnect();
  }
}
