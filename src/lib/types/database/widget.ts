type WidgetData = {
  [key: string]:
    | unknown
    | {
        [key: string]: unknown;
      };
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
