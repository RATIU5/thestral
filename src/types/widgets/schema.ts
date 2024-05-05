import type { ArrayWidget, CustomWidget, Widget, WidgetValueTypeMap } from "@/types/widgets/widget";

export type Schema = {
  id: string;
  name: string;
  description?: string;
  widgets: Array<Widget>;
};

export type SchemaProps<T extends Schema> = {
  readonly [WidgetName in T["widgets"][number]["name"]]: T["widgets"][number] extends infer Widget
    ? Widget extends { name: WidgetName }
      ? Widget extends { type: infer WidgetType }
        ? WidgetType extends keyof WidgetValueTypeMap
          ? WidgetType extends "array"
            ? Widget extends ArrayWidget
              ? ReadonlyArray<{
                  readonly [ItemName in Widget["items"][number]["name"]]: Extract<
                    Widget["items"][number],
                    { name: ItemName }
                  > extends infer Item
                    ? Item extends { type: infer ItemType }
                      ? ItemType extends keyof WidgetValueTypeMap
                        ? WidgetValueTypeMap[ItemType]
                        : never
                      : never
                    : never;
                }>
              : never
            : WidgetType extends "custom"
              ? Widget extends CustomWidget
                ? {
                    readonly [Key in keyof Widget["data"]]: Widget["data"][Key] extends infer Value ? Value : never;
                  }
                : never
              : WidgetValueTypeMap[WidgetType]
          : never
        : never
      : never
    : never;
};
