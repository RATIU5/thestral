import { TranspileError } from "../custom-errors";
import { getPagePathById } from "../db/page-actions";
import { ErrorCodes, Languages } from "../enums";
import type { Page } from "../types/database/page";

type NewPageObjectProps = {
  language: Page["defaultLanguageCode"];
  slug: Page["path"];
  parentId?: Page["parentId"];
};

export async function createNewPageObject({ language, slug, parentId }: NewPageObjectProps) {
  let path = "";
  let currentTime = new Date().toISOString();
  if (parentId) {
    const parentPath = await getPagePathById(parentId);
    path = parentPath ?? "";
  }

  // Regular expression pattern to match valid slugs
  const slugPattern = /^[a-zA-Z0-9_-]+$/;

  // Check if the slug is valid
  if (!slugPattern.test(slug)) {
    throw new TranspileError(ErrorCodes.SlugIsInvalid, "Invalid slug");
  }

  // Append the slug to the path
  path += slug + "/";
  const page: Page = {
    parentId,
    path,
    template: "default",
    status: "draft",
    defaultLanguageCode: Languages.Default,
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
