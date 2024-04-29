import type { Schema } from "@/lib/types";

export default {
  id: "rrw0b09CzCCnDZNFqsh8pajxaWy2Tkss",
  name: "Header",
  description: "This is the header for the page",
  widgets: [
    {
      name: "linkName",
      type: "text",
      label: "Link Name",
      defaultValue: "Link 1",
    },
    {
      name: "linkUrl",
      type: "text",
      label: "Link URL",
      defaultValue: "https://example.com/",
    },
  ],
} as const satisfies Schema;
