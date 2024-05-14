import Entra from "@auth/core/providers/microsoft-entra-id";
import Github from "@auth/core/providers/github";
import { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
    Entra({
      clientId: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
    }),
    Github({
      clientId: import.meta.env.AUTH_GITHUB_ID,
      clientSecret: import.meta.env.AUTH_GITHUB_SECRET,
    }),
  ],
});
