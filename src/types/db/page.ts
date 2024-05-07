import type { ObjectId } from "mongodb";

export type DB_Page = {
  /**
   * Optional parent ID, used to create page hierarchies
   */
  parentId?: string;
  /**
   * The full path for the page, including the parent path and the page slug
   * @example
   * - /about-us/our-team
   * - /contact
   */
  path: string;
  /**
   * The optional template ID for the page, used to render the page with a specific layout
   * TODO - Add more details about the template ID and how it is used
   */
  templateId: string;
  /**
   * The status of the page [draft|published|archived|review]
   * @note `draft` - the page is not visible to the public, only visible in the admin panel
   * @note `published` - the page is visible to the public
   * @note `archived` - the page is no longer in use
   * @note `review` - the page is under review by an admin
   */
  status: DB_PageStatus;
  /**
   * The default language code for the page, used to determine the language of the page content
   * @example
   * - en
   * - es
   * TODO: Look into this to see if there is a better way to handle language codes
   */
  defaultLanguageCode: string;
  /**
   * The date and time when the page was created
   */
  createdAt: string;
  /**
   * The date and time when the page was last updated
   */
  updatedAt: string;
  /**
   * The date and time when the page was last published
   */
  publishedAt: string | null;
  /**
   * The translations for the page, including the title, meta title, description, and keywords
   */
  translations: DB_PageTranslation;
  /**
   * The widgets included on the page, stored as an array of widget IDs and their order on the page
   * @example
   * [
   *  { id: "a99f7223h35b21a2c01", order: 1 },
   *  { id: "b12c3a4d5e6f7d8h9b0", order: 2 },
   * ]
   */
  widgets: DB_PageWidget[];
};

type DB_PageWidget = {
  /**
   * The unique ID for the widget, created by MongoDB when the time the widget was added to the database
   */
  id: ObjectId;
  /**
   * The numerical order of the widget on the page, used to determine the position of the widget on the page
   */
  order: number;
};

type DB_PageStatus = "draft" | "published" | "archived" | "review";

type DB_PageTranslation = {
  [lang: string]: {
    /**
     * The title of the page, displayed in the browser tab
     */
    title: string;
    /**
     * The meta title of the page, displayed in search engine results
     */
    metaTitle: string;
    /**
     * The meta description of the page, displayed in search engine results
     */
    description: string;
    /**
     * The keywords for the page, used for SEO optimization
     */
    keywords: string[];
  };
};
