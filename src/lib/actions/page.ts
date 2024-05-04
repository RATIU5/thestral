import { Constants } from "../db/collection";
import type { Page } from "../types/database/page";

export function createNewPageObject(
  language: Page["defaultLanguageCode"],
  slug: Page["path"],
  parentId?: Page["parentId"],
) {
  let path = "";
  let currentTime = new Date().toISOString();
  if (parentId) {
    // TODO: implement this
    // fetch parent page and get its path, append slug to the path
  }

  path += slug + "/";
  const page: Page = {
    parentId,
    path,
    template: "default",
    status: "draft",
    defaultLanguageCode: Constants.DefaultLanguageCode,
    createdAt: currentTime,
    updatedAt: currentTime,
    publishedAt: null,
    translations: {
      [language]: {
        title: "",
        description: "",
        keywords: [],
      },
    },
    widgets: [],
  };

  return page;
}
