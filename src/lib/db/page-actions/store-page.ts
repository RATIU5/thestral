import type { Page } from "@/types/db/page";
import { executeQuery } from "@/server/services/db";
import { Collection } from "@/server/utils/enums";

export async function storeNewPage(page: Page): Promise<boolean> {
  let result = false;
  try {
    await executeQuery(async (db) => {
      const pages = db.collection(Collection.Pages);
      await pages.insertOne(page);
      result = true;
    });
  } catch (e) {
    console.error(e);
    result = false;
  }
  return result;
}
