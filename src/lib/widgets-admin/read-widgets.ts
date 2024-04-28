import { existsSync } from "fs";
import { readdir } from "fs/promises";
import path from "path";
import type { Schema, AdminWidget } from "../types";

/**
 * Pull all necessary information from the schema.ts files in the widgets directory
 * to show each widget in the admin panel
 * @returns an array of AdminWidget objects
 */
export async function readAdminWidgets(): Promise<Array<AdminWidget>> {
  const widgetArray: Array<AdminWidget> = [];
  const widgetPath = path.join(process.cwd(), "src/widgets");
  if (!existsSync(widgetPath)) {
    console.error("error: 'widgets' directory was not found");
    return widgetArray;
  }
  const widgetDirs = (await readdir(widgetPath, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  try {
    for (const widget of widgetDirs) {
      const widgetSchemaPath = path.join(widgetPath, widget, "schema.ts");
      if (!existsSync(widgetSchemaPath)) {
        console.warn(
          `warning: widget schema not found at '${widgetSchemaPath}'; skipping`
        );
        continue;
      }
      const data = (await import(`../../widgets/${widget}/schema.ts`))
        .default as Schema | undefined;
      if (!data) {
        console.warn(
          `warning: widget schema at '${widgetSchemaPath}' does not have a default export; skipping`
        );
        continue;
      }
      if (!data.id) {
        console.warn(
          `warning: widget schema at '${widgetSchemaPath}' does not have an 'id' property; skipping`
        );
        continue;
      }
      widgetArray.push({
        name: data.name ?? widget,
        description: data.description,
      });
    }
  } catch (e) {
    console.error(e);
  }
  return widgetArray;
}
