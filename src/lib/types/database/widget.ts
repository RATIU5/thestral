type WidgetData = {
  [key: string]: string | number | boolean | undefined | { [key: string]: string | number | boolean | undefined }[];
};

type WidgetTranslation = {
  languageCode: string;
  data: WidgetData;
};

type Widget = {
  id: string;
  type: string;
  translations: WidgetTranslation[];
};
