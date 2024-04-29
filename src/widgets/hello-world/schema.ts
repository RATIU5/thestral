import type { Schema } from "@/lib/types";

export default {
  id: "wN0dXBrFAILbAPjpvAlZlDmEhy3dIywe",
  name: "Greeting",
  description: "This widget greets the world!",
  widgets: [
    {
      name: "greeting",
      type: "text",
      label: "Greeting",
      defaultValue: "Hello",
    },
  ],
} as const satisfies Schema;
