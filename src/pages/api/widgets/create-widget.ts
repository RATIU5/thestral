import { createWidgetController } from "@/server/controllers/widgetController";
import type { DB_Widget } from "@/types/db/widget";
import type { APIRoute } from "astro";
import type { ObjectId } from "mongodb";

export type RequestBody = {
  widgetId: DB_Widget["widgetId"];
  name?: DB_Widget["name"];
  description?: DB_Widget["description"];
  status?: DB_Widget["status"];
};

export type ResponseBody = {
  error?: string;
  data?: {
    insertedId: ObjectId;
    acknowledged: boolean;
  };
};

export const POST: APIRoute = async ({ request }) => {
  const { widgetId, name, description, status } = await request.json();
  if (!widgetId) {
    return new Response(JSON.stringify({ error: "'widgetId' is required" }), { status: 400 });
  }
  const res = await createWidgetController({ widgetId, name, description, status });
  return new Response(JSON.stringify({ data: res }), { status: 201 });
};
