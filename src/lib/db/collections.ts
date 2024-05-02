import type { PageCollection } from "../types";
import { getDB } from "./mongodb";

export async function insertPageCollection(config: PageCollection) {
  if (!import.meta.env.DB_NAME) {
    throw new Error("Invalid environment variable: DB_NAME");
  }
  const db = (await getDB())?.db(import.meta.env.DB_NAME);
  if (!db) {
    throw new Error("Failed to connect to database");
  }
  await db.collection("pages").insertOne(config);
}
