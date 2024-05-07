import { listWidgetsController } from "@/server/controllers/widgetController";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const data = listWidgetsController("inactive");
  return new Response(JSON.stringify(data), { status: 200 });
};
