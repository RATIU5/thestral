import dynamic from "astro:import";
import { existsSync } from "fs";
import { readdir } from "fs/promises";
import path from "path";
import type { Schema } from "../types";

//! ===============================================================
//! Make these functions more efficient, they are currently O(n^2)!
//? Maybe add a checker at build time to compute checks every time
//? a widget is added or removed or renamed or otherwise changed
//! ===============================================================

/**
 * Pulls the name (the folder name containing the schema.ts and template.astro files) of a widget by its id
 * @param id the id of the widget to pull the name of
 * @returns the name of the widget
 */
async function pullWidgetNameById(id: string): Promise<string> {
  let widgetName = "<undefined>";
  const widgetPath = path.join(process.cwd(), "src/widgets");
  if (!existsSync(widgetPath)) {
    console.error("error: 'widgets' directory was not found at 'src/widgets'");
    return widgetName;
  }
  const widgetFolders = (await readdir(widgetPath, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const wName of widgetFolders) {
    const wPath = path.join(widgetPath, wName, "schema.ts");
    if (!existsSync(wPath)) {
      console.warn(`warning: widget schema not found at '${wPath}'; skipping`);
      continue;
    }
    try {
      const data = (await import(`../../widgets/${wName}/schema.ts`))
        .default as Schema | undefined;

      if (!data) {
        console.warn(
          `warning: widget schema at '${wPath}' does not have a default export; skipping`
        );
        continue;
      }
      if (!data.id) {
        console.warn(
          `warning: widget schema at '${wPath}' does not have an 'id' property; skipping`
        );
        continue;
      }
      if (data.id === id) {
        widgetName = wName;
        break;
      }
    } catch (e) {
      console.error(e);
    }
  }
  return widgetName;
}

//? This type needs to reflect the schema returned from the database
export type CollectWidgetsProps = {
  widgetId: string;
  props: {
    [x: string]: any;
  };
};

/**
 * Collects widgets from the database and returns an array of objects that contain
 * the AstroComponentFactory component and the props to pass to it
 * @param data array of widget data from the database
 * @returns array of objects containing the AstroComponentFactory component and the props
 */
export async function collectWidgets(
  data: Array<CollectWidgetsProps>
): Promise<
  Array<{ component: AstroComponentFactory; props: { [x: string]: any } }>
> {
  const components: Array<{
    component: AstroComponentFactory;
    props: { [x: string]: any };
  }> = [];
  for (const w of data) {
    const widgetName = await pullWidgetNameById(w.widgetId);
    if (widgetName === "<undefined>") {
      console.warn(
        `warning: widget with id '${w.widgetId}' not found; skipping`
      );
      continue;
    }
    const widgetTemplatePath = `widgets/${widgetName}/template.astro`;
    try {
      const component = await dynamic(widgetTemplatePath);
      components.push({
        component,
        props: w.props,
      });
    } catch (e) {
      console.error(e);
    }
  }
  return components;
}
