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
      defaultValue: "Hello World",
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      defaultValue: "This is a test widget",
    },
    {
      type: "array",
      name: "items",
      label: "Items",
      options: [
        {
          type: "text",
          name: "itemName",
          label: "Item Name",
          defaultValue: "Default Item Name",
        },
        {
          type: "number",
          name: "itemQuantity",
          label: "Item Quantity",
          defaultValue: 1,
        },
      ],
    },
  ],
} as const satisfies Schema;
