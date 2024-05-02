import type { Schema } from "@/lib/types";

export default {
  id: "wN0dXBrFAILbAPjpvAlZlDmEhy3dIywe",
  name: "Hello World",
  description: "This is a test widget",
  widgets: [
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: {
        en: "Hello, World!",
      },
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      defaultValue: {
        en: "This is a test widget",
      },
    },
  ],
} as const satisfies Schema;
