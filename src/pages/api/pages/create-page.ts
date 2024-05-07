import { createPageController } from "@/server/controllers/pageController";
import type { DB_Page } from "@/types/db/page";
import type { APIRoute } from "astro";
import type { ObjectId } from "mongodb";

export type RequestBody = {
  slug: DB_Page["path"];
  parentId: DB_Page["parentId"];
};

export type ResponseBody = {
  error?: string;
  data?: {
    insertedId: ObjectId;
    acknowledged: boolean;
  };
};

export const POST: APIRoute = async ({ request }) => {
  const { slug, parentId } = await request.json();
  if (!slug) {
    return new Response(JSON.stringify({ error: "'slug' is required" }), { status: 400 });
  }
  const res = await createPageController({ parentId, slug });
  return new Response(JSON.stringify({ data: res }), { status: 201 });
};
