import type { Page } from "@/lib/types/database/page";
import { executeQuery } from "@/lib/db/connection";
import { Collection, ErrorCodes } from "@/lib/enums";
import { DatabaseError } from "../custom-errors";
import { ObjectId } from "mongodb";

export async function storeNewPage(page: Page) {
  await executeQuery(async (db) => {
    const collection = db.collection(Collection.Pages);
    const allPagePaths = (await collection.distinct("path", {})) as string[];

    if (allPagePaths) {
      const existingSlug = allPagePaths.find((path) => path === page.path);
      if (existingSlug) {
        throw new DatabaseError(ErrorCodes.SlugAlreadyExists, "slug already exists");
      }
    }

    const pages = db.collection(Collection.Pages);
    await pages.insertOne(page);
  });
}

export async function getFullDataPageById(id: string) {
  const page = await executeQuery(async (db) => {
    const collection = db.collection(Collection.Pages);
    return await collection.findOne({});
  });
  if (!page) {
    throw new DatabaseError(ErrorCodes.PageNotFound, "page not found");
  }
}

// TODO: Maybe not call this database fetch twice
export async function getExistingPagePathsAndIds(): Promise<Array<{ _id: string; path: string }> | undefined> {
  return executeQuery(async (db) => {
    const collection = db.collection(Collection.Pages);
    const result = await collection.find({}, { projection: { _id: 1, path: 1 } }).toArray();
    return result.map((doc) => ({ _id: doc._id.toString(), path: doc.path }));
  });
}

export async function getPagePathById(pageId: string): Promise<string | undefined> {
  return executeQuery(async (db) => {
    const collection = db.collection(Collection.Pages);
    const result = await collection.findOne({ _id: new ObjectId(pageId) }, { projection: { path: 1 } });
    return result?.path;
  });
}
