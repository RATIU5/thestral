import { existsSync } from "fs";
import { readdir } from "fs/promises";
import path from "path";
import type { TsrlWidget } from "./types";

type Component<T extends TsrlWidget> = {
  tsrlWidget: T | undefined;
  tsrlID: string | undefined;
  default: [Function: string];
  file: string;
  url: string | undefined;
};

type Widget<T extends TsrlWidget> = {
  path: string;
  name: string;
  description: string | undefined;
  isWidget: boolean;
  widgetData: T | undefined;
};

export default async function readWidgets<T extends TsrlWidget>(): Promise<
  Array<Widget<T>>
> {
  const widgetPath = path.join(process.cwd(), "src/widgets");
  const widgetSet: Array<Widget<T>> = [];
  if (!existsSync(widgetPath)) {
    console.error("error: 'widgets' directory was not found");
    return widgetSet;
  }

  let widgets = (await readdir(widgetPath))
    .filter((file) => file.endsWith(".astro"))
    .map((file) => file.replace(".astro", ""));

  for (let i = 0; i < widgets.length; i++) {
    const widget = widgets[i];
    try {
      const data = (await import(`../widgets/${widget}.astro`)) as Component<T>;
      let isWidget = data.tsrlWidget ? true : false;
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
