import { seedDB } from "@/lib/db/mongodb";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const seedWithData =
    new URL(request.url).searchParams.get("withData") === "true";
  try {
    await seedDB(seedWithData);
  } catch (e) {
    return new Response("failed to seed database: " + (e as Error).message, {
      status: 500,
    });
  }
  return new Response("database seeded successfully", { status: 200 });
};
