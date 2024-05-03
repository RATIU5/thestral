import type { Widget } from "./widget";

export type Schema = {
  id: string;
  name: string;
  description?: string;
  widgets: Array<Widget>;
};
