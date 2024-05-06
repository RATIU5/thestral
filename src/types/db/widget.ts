export type WidgetData = {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | { [key: string]: string | number | boolean | undefined }[]
    | { [key: string]: unknown };
};

export type WidgetTranslation = {
  [languageCode: string]: WidgetData;
};

export type Widget = {
  uuid: string;
  translations: WidgetTranslation;
};
