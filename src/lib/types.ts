export type AdminWidget = {
  id: string;
  name: string;
  description: string | undefined;
};

type WidgetTypes =
  | "text"
  | "textarea"
  | "date"
  | "number"
  | "checkbox"
  | "radio"
  | "select"
  | "array";

interface BaseWidget {
  type: WidgetTypes;
  name: string;
  label: string;
}

interface TextWidget extends BaseWidget {
  type: "text";
  defaultValue: string;
  placeholder?: string;
}

interface TextareaWidget extends BaseWidget {
  type: "textarea";
  defaultValue: string;
  placeholder?: string;
}

interface DateWidget extends BaseWidget {
  type: "date";
  defaultValue: string;
}

interface NumberWidget extends BaseWidget {
  type: "number";
  defaultValue: number;
}

interface CheckboxWidget extends BaseWidget {
  type: "checkbox";
  defaultValue: boolean;
}

type RadioValue = string;

interface RadioWidget extends BaseWidget {
  type: "radio";
  defaultValue: RadioValue;
  options: Array<{ label: string; value: RadioValue }>;
}

type SelectValue = string;

interface SelectWidget extends BaseWidget {
  type: "select";
  defaultValue: SelectValue;
  options: Array<{ label: string; value: SelectValue }>;
}

interface ArrayWidget extends BaseWidget {
  type: "array";
  options: Array<Exclude<Widget, ArrayWidget>>;
}

type Widget =
  | TextWidget
  | TextareaWidget
  | DateWidget
  | NumberWidget
  | CheckboxWidget
  | RadioWidget
  | SelectWidget
  | ArrayWidget;

type WidenLiteral<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : unknown;

type ArrayWidgetProps<T extends ArrayWidget> = Array<{
  readonly [K in T["options"][number]["name"]]: Extract<
    T["options"][number],
    { name: K }
  >["defaultValue"] extends infer U
    ? WidenLiteral<U>
    : never;
}>;

export type SchemaProps<T extends Schema> = {
  readonly [Name in T["widgets"][number]["name"]]: Extract<
    T["widgets"][number],
    { name: Name }
  > extends ArrayWidget
    ? ArrayWidgetProps<
        Extract<T["widgets"][number], ArrayWidget & { name: Name }>
      >
    : Extract<T["widgets"][number], { name: Name }> extends {
        defaultValue: infer U;
      }
    ? WidenLiteral<U>
    : never;
};

export type Schema = {
  id: string | undefined;
  name?: string;
  description?: string;
  widgets: Array<Widget>;
};

// =================================================================
// ===================== Collection Types ==========================
// =================================================================

export type WidgetStoreLocaleString = {
  [lang: string]: {
    [key: string]: string;
  };
};

export type WidgetStoreData = {
  [key: string]:
    | WidgetStoreLocaleString
    | number
    | boolean
    | {
        [key: string]: WidgetStoreLocaleString | number | boolean;
      };
};

export type WidgetStore = {
  id: string;
  order: number;
  data: WidgetStoreData;
};

export type PageCollection = {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  template: string;
  status: "draft" | "published" | "review";
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  languages: string[];
  widgets: WidgetStore[];
};
