import type { Page } from "@/types/db/page";
import {
  addWidgetToPageService,
  createPageService,
  getExistingPagePathsAndIdsService,
} from "@/server/services/pageService";
import { createPageTransformer } from "../utils/transformations/pageTransformer";
import { Languages } from "../utils/enums";
import { createNewWidgetController } from "./widgetController";

export async function createPageController({ slug, parentId }: { slug: Page["path"]; parentId: Page["parentId"] }) {
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

export async function addWidgetToPageController(pageId: string, widgetUuid: string) {
  const { insertedId } = await createNewWidgetController(widgetUuid);

  return await addWidgetToPageService(insertedId, pageId);
}
