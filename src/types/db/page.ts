import type { WidgetData, WidgetTranslation } from "./widget";

type PageStatus = "draft" | "published" | "archived";

type PageTranslation = {
  [lang: string]: {
    title: string;
    metaTitle: string;
    description: string;
    keywords: string[];
  };
};

export type PageWidget = {
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

/**
 * Data for a page widget (presorted by order upon retrieval)
 */
export type PageWidgetData = {
  widgetId: string;
  data: WidgetTranslation;
};
