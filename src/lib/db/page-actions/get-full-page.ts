import { Collection } from "@/server/utils/enums";
import { executeQuery } from "@/server/services/db";

export async function getFullDataPageById(id: string) {
  const page = await executeQuery(async (db) => {
    const collection = db.collection(Collection.Pages);
    return await collection.findOne({});
  });
  if (!page) {
    throw new Error("Page not found");
  }
}
