type PrimitiveWidgetTypes =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "array"
  | "custom";

type WidgetValueTypeMap = {
  text: string;
  textarea: string;
  number: number;
  select: string;
  radio: string;
  checkbox: boolean;
  date: string;
  array: Array<Exclude<Widget, ArrayWidget>>;
  custom: {
    [key: string]: unknown;
  };
};

interface BaseWidget {
  type: PrimitiveWidgetTypes;
  name: string;
  label?: string;
  required?: boolean;
}

interface TextWidget extends BaseWidget {
  type: "text";
  placeholder?: WidgetValueTypeMap["text"];
  defaultValue?: WidgetValueTypeMap["text"];
}

interface TextAreaWidget extends BaseWidget {
  type: "textarea";
  placeholder?: WidgetValueTypeMap["textarea"];
  defaultValue?: WidgetValueTypeMap["textarea"];
}

interface NumberWidget extends BaseWidget {
  type: "number";
  placeholder?: WidgetValueTypeMap["number"];
  min?: number;
  max?: number;
}

interface SelectWidget extends BaseWidget {
  type: "select";
  defaultValue?: WidgetValueTypeMap["select"];
  options: Array<{ label: string; value: WidgetValueTypeMap["select"] }>;
}

interface RadioWidget extends BaseWidget {
  type: "radio";
  defaultValue?: WidgetValueTypeMap["radio"];
  options: Array<{ label: string; value: WidgetValueTypeMap["radio"] }>;
}

interface CheckboxWidget extends BaseWidget {
  type: "checkbox";
  defaultValue?: WidgetValueTypeMap["checkbox"];
}

interface DateWidget extends BaseWidget {
  type: "date";
  defaultValue?: WidgetValueTypeMap["date"];
}

interface ArrayWidget extends BaseWidget {
  type: "array";
  items: WidgetValueTypeMap["array"];
  defaultValue?: WidgetValueTypeMap["array"];
}

interface CustomWidget extends BaseWidget {
  type: "custom";
  data: WidgetValueTypeMap["custom"];
  defaultValue?: WidgetValueTypeMap["custom"];
}

export type Widget =
  | TextWidget
  | TextAreaWidget
  | NumberWidget
  | SelectWidget
  | RadioWidget
  | CheckboxWidget
  | DateWidget
  | ArrayWidget
  | CustomWidget;
