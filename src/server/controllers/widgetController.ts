import {
  createNewWidgetService as createWidgetService,
  listWidgetsService,
  readWidgetComponentService,
} from "../services/widgetService";
import { Languages } from "../utils/enums";
import type { DB_Widget, PageWidgetData } from "@/types/db/widget";

export async function readWidgetComponentController(data: PageWidgetData[]) {
  return await readWidgetComponentService(data);
}

export async function createWidgetController({
  widgetId,
  name,
  description,
  status,
}: {
  widgetId: string;
  name?: string;
  description?: string;
  status?: DB_Widget["status"];
}) {
  const newWidget: DB_Widget = {
    widgetId,
    status: status ? status : "inactive",
    name,
    description,
    data: {
      [Languages.Default]: {},
    },
  };
  return await createWidgetService(newWidget);
}

export async function listWidgetsController(status: DB_Widget["status"]) {
  return await listWidgetsService(status);
}
