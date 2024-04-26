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

export default async function pullWidgetById<T extends TsrlWidget>(
  id: string
): Promise<string> {
  const widgetPath = path.join(process.cwd(), "src/widgets");
  if (!existsSync(widgetPath)) {
    console.error("error: 'widgets' directory was not found");
    return "";
  }

  let widgets = (await readdir(widgetPath))
    .filter((file) => file.endsWith(".astro"))
    .map((file) => file.replace(".astro", ""));

  for (let i = 0; i < widgets.length; i++) {
    const widget = widgets[i];
    try {
      const data = (await import(`../widgets/${widget}.astro`)) as Component<T>;
      if (data.tsrlID === id) {
        return widget;
      } else if (data.tsrlID) {
        continue;
      } else {
        console.error(
          `error: widget '${widget}' does not have an exported string 'tsrlID'`
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
  return "";
}
