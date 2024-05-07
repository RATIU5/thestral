import type { DB_Page } from "@/types/db/page";
import { createPageService, getExistingPagePathsAndIdsService } from "@/server/services/pageService";
import { createPageTransformer } from "../utils/transformations/pageTransformer";
import { Languages } from "../utils/enums";

export async function createPageController({
  slug,
  parentId,
}: {
  slug: DB_Page["path"];
  parentId: DB_Page["parentId"];
}) {
  const page = await createPageTransformer({
    language: Languages.Default,
    slug,
    parentId,
  });

  await createPageService(page);
}

export async function getExistingPagePathsAndIdsController() {
  return await getExistingPagePathsAndIdsService();
}
