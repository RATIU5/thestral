import { readUserWithEmail } from "@/core/controllers/userController";
import Entra from "@auth/core/providers/microsoft-entra-id";
import { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
    Entra({
      clientId: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: import.meta.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
    }),
  ],
  callbacks: {
    signIn: async ({ profile }) => {
      try {
        const doesEmailExist = await readUserWithEmail(profile.email);
        return doesEmailExist ? true : false;
      } catch (e) {
        return false;
      }
    },
  }
});
