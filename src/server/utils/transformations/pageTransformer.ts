import { TranspileError } from "@/server/utils/errors";
import { getPagePathById } from "@/server/services/pageService";
import { ErrorCodes, Languages } from "@/server/utils/enums";
import type { Page } from "@/types/db/page";

type NewPageObjectProps = {
  language: Page["defaultLanguageCode"];
  slug: Page["path"];
  parentId?: Page["parentId"];
};

export async function createPageTransformer({ language, slug, parentId }: NewPageObjectProps) {
  if (slug.trim() === "") {
    throw new TranspileError(ErrorCodes.SlugIsEmpty, "slug is empty");
  }

  let path = "";
  let currentTime = new Date().toISOString();
  if (parentId) {
    const parentPath = await getPagePathById(parentId);
    path = parentPath ?? "";
  }

  const slugPattern = /^[a-zA-Z0-9_-]+$/;

  if (!slugPattern.test(slug)) {
    throw new TranspileError(ErrorCodes.SlugIsInvalid, "invalid slug");
  }

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
