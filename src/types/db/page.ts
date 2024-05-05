type PageStatus = "draft" | "published" | "archived";

type PageTranslation = {
  [lang: string]: {
    title: string;
    description: string;
    keywords: string[];
  };
};

type PageWidget = {
  widgetId: string;
  order: number;
};

export type Page = {
  parentId?: string;
  path: string;
  template: string;
  status: PageStatus;
  defaultLanguageCode: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  translations: PageTranslation;
  widgets: PageWidget[];
};
