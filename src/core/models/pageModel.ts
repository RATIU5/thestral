import { createForm } from "simple:form";
import { z } from "zod";

export const updateForm = createForm({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: z.enum(["draft", "published", "archived", "review"]),
  parent_id: z.number(),
  admin_name: z.string().min(1).optional(),
});
const updateFieldsObject = z.object(updateForm["validator"]);
export type UpdateFormFields = z.infer<typeof updateFieldsObject> | undefined;
