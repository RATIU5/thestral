import type { Page } from "@/lib/types/database/page";
import { executeQuery } from "@/lib/db/connection";
import { Collection } from "@/lib/db/collection";

export async function storeNewPage(page: Page) {
  let result = false;
  try {
    const allPagePaths = await executeQuery(async (db) => {
      const collection = db.collection(Collection.Pages);
      return (await collection.distinct("path", {})) as string[];
    });

    if (allPagePaths) {
      const existingSlug = allPagePaths.find((path) => path === page.path);
      if (existingSlug) {
        throw new Error("Slug already exists");
      }
    }

    await executeQuery(async (db) => {
      const pages = db.collection(Collection.Pages);
      await pages.insertOne(page);
      result = true;
    });
  } catch (e: unknown) {
    throw new Error((e as Error).message);
  }
}

export async function getFullDataPageById(id: string) {
  const page = await executeQuery(async (db) => {
    const collection = db.collection(Collection.Pages);
    return await collection.findOne({});
  });
  if (!page) {
    throw new Error("Page not found");
  }
}
