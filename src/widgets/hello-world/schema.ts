import type { Schema } from "@/lib/types";

export default {
  id: "wN0dXBrFAILbAPjpvAlZlDmEhy3dIywe",
  name: "Hello World",
  description: "This is a test widget",
  widgets: [
    {
      name: "title",
      type: "number",
      label: "Title",
      defaultValue: 2,
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      defaultValue: "This is a description",
    },
  ],
} as const satisfies Schema;
