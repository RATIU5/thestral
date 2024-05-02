export type AdminWidget = {
  id: string;
  name: string;
  description: string | undefined;
};

export type LocalizedText = {
  [language: string]: string;
};

export type WidgetTypes =
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

export interface TextWidget extends BaseWidget {
  type: "text";
  defaultValue: LocalizedText;
  placeholder?: string;
}

export interface TextareaWidget extends BaseWidget {
  type: "textarea";
  defaultValue: LocalizedText;
  placeholder?: string;
}

export interface DateWidget extends BaseWidget {
  type: "date";
  defaultValue: string;
}

export interface NumberWidget extends BaseWidget {
  type: "number";
  defaultValue: number;
}

export interface CheckboxWidget extends BaseWidget {
  type: "checkbox";
  defaultValue: boolean;
}

export type RadioValue = string;

export interface RadioWidget extends BaseWidget {
  type: "radio";
  defaultValue: RadioValue;
  options: Array<{ label: string; value: RadioValue }>;
}

export type SelectValue = string;

export interface SelectWidget extends BaseWidget {
  type: "select";
  defaultValue: SelectValue;
  options: Array<{ label: string; value: SelectValue }>;
}

export interface ArrayWidget extends BaseWidget {
  type: "array";
  options: Array<Exclude<Widget, ArrayWidget>>;
  defaultValues: Array<{
    [K in keyof Exclude<Widget, ArrayWidget>]: K extends "defaultValues"
      ? LocalizedText
      : Exclude<Widget, ArrayWidget>[K];
  }>;
}

export type Widget =
  | TextWidget
  | TextareaWidget
  | DateWidget
  | NumberWidget
  | CheckboxWidget
  | RadioWidget
  | SelectWidget
  | ArrayWidget;

export type Schema = {
  id: string | undefined;
  name?: string;
  description?: string;
  widgets: Array<Widget>;
};

type WidenLiteral<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : unknown;

export type SchemaProps<T extends Schema> = {
  [Name in T["widgets"][number]["name"]]: WidenLiteral<
    Extract<T["widgets"][number], { name: Name }>["defaultValue"]
  >;
};
