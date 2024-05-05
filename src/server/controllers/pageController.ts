import type { Page } from "@/types/db/page";
import { createPageService } from "@/server/services/pageService";
import { createPageTransformer } from "../utils/transformations/pageTransformer";
import { Languages } from "../utils/enums";

export async function createPageController({ slug, parentId }: { slug: Page["path"]; parentId: Page["parentId"] }) {
  try {
    const page = await createPageTransformer({
      language: Languages.Default,
      slug,
      parentId,
    });
    await createPageService(page);
  } catch (e) {
    throw e;
  }
}
