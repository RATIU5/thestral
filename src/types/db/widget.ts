/**
 * The widget object as stored in the database, excluding the `_id` field
 */
export type DB_Widget = {
  /**
   * The status of the widget [active|inactive|archived]
   * @note `active` - the widget is currently in use by one or more pages
   * @note `inactive` - the widget is not in use by any page
   * @note `archived` - the widget is no longer in use and is marked for deletion
   */
  status: DB_WidgetStatus;
  /**
   * The unique ID for the widget, created by the `thes` CLI tool
   * @note This ID is used to reference the widget in the codebase
   */
  widgetId: string;
  /**
   * An optional title to describe the widget in the admin panel
   */
  title?: string;
  /**
   * An optional description to describe the widget in the admin panel
   */
  description?: string;
  /**
   * The data for the widget props, stored as a JSON object
   * @example
   * {
   *   "en": {
   *     "title": "Hello, World!",
   *     "description": "This is a test widget",
   *   },
   *   "es": {
   *     "title": "¡Hola, Mundo!",
   *     "description": "Este es un widget de prueba",
   *   }
   * }
   */
  data: DB_WidgetTranslation;
};

type DB_WidgetData = {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | { [key: string]: string | number | boolean | undefined }[]
    | { [key: string]: unknown };
};

type DB_WidgetTranslation = {
  [languageCode: string]: DB_WidgetData;
};

type DB_WidgetStatus = "active" | "inactive" | "archived";
