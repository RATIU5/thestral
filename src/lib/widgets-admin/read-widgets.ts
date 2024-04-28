import { existsSync } from "fs";
import { readdir } from "fs/promises";
import path from "path";
import type { Component, Schema, WidgetComponent } from "../types";

export default async function readWidgets<T extends Schema>(): Promise<
  Array<WidgetComponent<T>>
> {
  const widgetPath = path.join(process.cwd(), "src/widgets");
  const widgetSet: Array<WidgetComponent<T>> = [];
  if (!existsSync(widgetPath)) {
    console.error("error: 'widgets' directory was not found");
    return widgetSet;
  }

  let widgets = (await readdir(widgetPath))
    .filter((file) => file.endsWith(".astro"))
    .map((file) => file.replace(".astro", ""));

  for (const widget of widgets) {
    try {
      const data = (await import(`../widgets/${widget}.astro`)) as Component<T>;
      let isWidget = !!data.tsrlWidget;
      if (data.tsrlID) {
        widgetSet.push({
          path: data.file,
          name: widget,
          isWidget,
          description: data.tsrlWidget?.description,
          widgetData: data.tsrlWidget,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  return widgetSet;
}
