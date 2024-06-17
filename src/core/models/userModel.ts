import { z } from "zod";
import { createForm } from "simple:form";

export const createUserFormObject = {
  email: z
    .string()
    .email("Invalid email address")
    .refine((e) => e.endsWith("@maloufcompanies.com"), "Invalid email address"),
  role: z.enum(["admin", "editor", "viewer"]),
};
export const createUserForm = createForm(createUserFormObject);
export const createUserFieldsObject = z.object(createUserForm["validator"]);
export type CreateUserFormFields =
  | z.infer<typeof createUserFieldsObject>
  | undefined;
