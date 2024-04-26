export type WidgetTypes =
  | "text"
  | "textarea"
  | "date"
  | "number"
  | "checkbox"
  | "radio"
  | "select";

interface BaseWidget {
  label: string;
}

export interface TextWidget extends BaseWidget {
  type: "text";
  defaultValue: string;
  placeholder: string;
}

export interface TextareaWidget extends BaseWidget {
  type: "textarea";
  defaultValue: string;
  placeholder: string;
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

export interface SelectWidget extends BaseWidget {
  type: "select";
  defaultValue: string;
  options: Array<{ label: string; value: string }>;
}

export type Widget =
  | TextWidget
  | TextareaWidget
  | DateWidget
  | NumberWidget
  | CheckboxWidget
  | RadioWidget
  | SelectWidget;

export type TsrlWidget = {
  description: string;
  url: string;
  widgets: Array<Widget>;
};
