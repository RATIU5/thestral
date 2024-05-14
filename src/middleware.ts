import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.url);
  if (url.pathname.startsWith("/admin")) {
    const session = await getSession(context.request); // Pass context.request instead of context
    console.log(session);

    if (!session) {
      return context.redirect("/auth/signin", 302);
    }
  }
  next();
});
