import { z } from "zod";
import { createForm as sf_createForm } from "simple:form";

export const updateForm = sf_createForm({
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

export const createForm = sf_createForm({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  parent_id: z.number(),
});
const createFieldsObject = z.object(createForm["validator"]);
export type CreateFormFields = z.infer<typeof createFieldsObject> | undefined;
