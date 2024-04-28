import type { TsrlSchema } from "@/lib/types";

export default {
  id: "LIeYZCMKcfOzc6kebnalU0Y0vUxIrZtM",
  description: "This is a test widget",
  widgets: [
    {
      name: "title",
      type: "text",
      label: "Title",
      defaultValue: "This is a title",
    },
  ],
} as const satisfies TsrlSchema;
