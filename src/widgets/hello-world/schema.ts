import type { Schema } from "@/types/widgets/schema";

export default {
  id: "507c7f79bcf86cd7994f6c0e",
  name: "Hello World",
  description: "A simple widget that displays a greeting.",
  widgets: [
    {
      type: "text",
      name: "greeting",
      label: "Greeting",
      defaultValue: "Hello, World!",
    },
    {
      type: "number",
      name: "fontSize",
      label: "Font Size",
    },
    {
      type: "checkbox",
      name: "bold",
      label: "Bold",
      defaultValue: false,
    },
    {
      type: "select",
      name: "color",
      label: "Color",
      options: [
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
      ],
    },
    {
      type: "radio",
      name: "alignment",
      label: "Alignment",
      defaultValue: "left",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    {
      type: "date",
      name: "date",
      label: "Date",
    },
    {
      type: "array",
      name: "cart",
      label: "Cart",
      items: [
        {
          type: "text",
          name: "item",
          label: "Item",
        },
        {
          type: "number",
          name: "quantity",
          label: "Quantity",
        },
      ],
    },
    {
      type: "custom",
      name: "custom",
      data: {
        foo: "bar",
        baz: 42,
      },
    },
  ],
} as const satisfies Schema;
