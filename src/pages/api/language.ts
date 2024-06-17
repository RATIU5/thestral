import { Constants } from "@/core/utils/constants";
import sql from "@/core/utils/dbConnection";
import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";

export type UpdateLanguageRequest = {
  /**
   * The language code to update
   * @example "en"
   */
  language: string;
};

export const POST: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  const code = (await request.json()).language;

  if (session) {
    const res = await sql`SELECT code FROM language WHERE code = ${code}`;
    if (res.length === 0) {
      return new Response("Language not found", { status: 404 });
    }

    if (session.user) {
      const email = session.user.email as string;
      const res =
        await sql`UPDATE users SET language_code = ${code} WHERE email = ${email}`;
      if (res) {
        return new Response("Language updated", { status: 200 });
      }
      return new Response("Failed to update language", { status: 500 });
    }
  }
  return new Response("Unauthorized", { status: 401 });
};
