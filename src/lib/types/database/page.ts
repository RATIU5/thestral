type PageStatus = "draft" | "published" | "archived";

type PageTranslation = {
  languageCode: string;
  title: string;
  description: string;
  keywords: string[];
};

type PageWidget = {
  widgetId: string;
  order: number;
};

type Page = {
  id: string;
  parentId?: string;
  path: string;
  template: string;
  status: PageStatus;
  defaultLanguageCode: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  translations: PageTranslation[];
  widgets: PageWidget[];
};
