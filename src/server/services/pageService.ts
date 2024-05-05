import type { Page } from "@/types/db/page";
import { executeQuery } from "@/server/services/db";
import { Collection, ErrorCodes } from "@/server/utils/enums";
import { DatabaseError } from "@/server/utils/errors";
import { ObjectId } from "mongodb";

export async function createPageService(page: Page) {
  await executeQuery(async (db) => {
    const collection = db.collection(Collection.Pages);

    const existingPage = await collection.findOne({ path: page.path, parentId: page.parentId });
    if (existingPage) {
      throw new DatabaseError(ErrorCodes.SlugAlreadyExists, "slug already exists");
    }

    if (page.parentId) {
      const parentPage = await collection.findOne(
        { _id: new ObjectId(page.parentId) },
        { projection: { path: 1, _id: 0 } },
      );
      if (!parentPage) {
        throw new DatabaseError(ErrorCodes.ParentPageNotFound, "parent page not found");
      }
    }

    const newPage = await collection.insertOne(page);
    if (!newPage) {
      throw new DatabaseError(ErrorCodes.PageNotCreated, "page not created");
    }
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
