import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Schema } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformSchemaToDefaultProps(schema: Schema) {
  const defaultProps = {} as Record<string, any>;
  const widgets = schema.widgets;
  for (const w of widgets) {
    defaultProps[w.name] = w.defaultValue;
  }
  return defaultProps;
}
