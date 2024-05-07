import dynamic from "astro:import";
import type { PageWidgetData } from "@/types/db/widget";
import type { Schema, WidgetDetails } from "@/types/widgets/schema";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { existsSync } from "fs";
import { readdir } from "fs/promises";
import path from "path";
import type { DB_Widget } from "@/types/db/widget";
import { executeQuery } from "./db";
import { Collection } from "../utils/enums";
import type { ObjectId } from "mongodb";

async function readWidgetDetailsService() {
  const widgetArray: WidgetDetails[] = [];
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
        console.warn(`warning: widget schema not found at '${widgetSchemaPath}'; skipping`);
        continue;
      }
      const data = (await import(`../../widgets/${widget}/schema.ts`)).default as Schema | undefined;
      if (!data) {
        console.warn(`warning: widget schema at '${widgetSchemaPath}' does not have a default export; skipping`);
        continue;
      }
      if (!data.id) {
        console.warn(`warning: widget schema at '${widgetSchemaPath}' does not have an 'id' property; skipping`);
        continue;
      }
      widgetArray.push({
        name: data.name ?? widget,
        description: data.description,
        widgetId: data.id,
      });
    }
  } catch (e) {
    throw e;
  }
  return widgetArray;
}

export async function getWidgetMap() {
  try {
    return (await import("@/widgets/map.json")).default as { [x: string]: string };
  } catch (e) {
    if (__VERBOSE__) {
      console.error(e);
    } else {
      console.error(
        "error: failed to import widget map at 'src/widgets/map.json'; please run 'thes map' to generate it",
      );
    }
    return {};
  }
}

/**
 * Reads the widget component and props from the database
 * @param data the widget data pulled from the database
 * @returns an array of Astro components and their props
 */
export async function readWidgetComponentService(data: PageWidgetData[]) {
  const components: Array<{
    component: AstroComponentFactory;
    props: { [x: string]: any };
  }> = [];
  let map = await getWidgetMap();
  for (const w of data) {
    // Pull the widget name from the map
    const widgetName = map[w.widgetId as keyof typeof map];
    const widgetTemplatePath = `widgets/${widgetName}/template.astro`;
    try {
      const component = await dynamic(widgetTemplatePath);
      components.push({
        component,
        props: w.data,
      });
    } catch (e) {
      if (__VERBOSE__) {
        console.error(e);
      } else {
        console.warn(`warning: failed to import widget at '${widgetTemplatePath}'; skipping`);
      }
      return components;
    }
  }
  return components;
}

export async function listWidgetsService(status: DB_Widget["status"]) {
  switch (status) {
    case "inactive": {
      const widgets = await readWidgetDetailsService();
      console.log(widgets);

      return widgets.map((widget) => ({
        ...widget,
        status: "inactive",
      }));
    }
    case "active": {
      const widgets = await executeQuery(async (db) => {
        const collection = db.collection(Collection.Widgets);
        return await collection.find({ status: "active" }).toArray();
      });
      console.log(widgets);
      return [];
    }
    default: {
      return [];
    }
  }
}

export async function createNewWidgetService(widget: DB_Widget) {
  return await executeQuery(async (db) => {
    const collection = db.collection(Collection.Widgets);
    return (await collection.insertOne(widget)) as {
      insertedId: ObjectId;
      acknowledged: boolean;
    };
  });
}
