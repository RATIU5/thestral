import type { PageWidgetData } from "@/types/db/page";
import {
  createNewWidgetService,
  readWidgetComponentService,
  readWidgetDetailsService,
} from "../services/widgetService";
import { Languages } from "../utils/enums";
import type { Widget } from "@/types/db/widget";

export async function readWidgetDetailsController() {
  return await readWidgetDetailsService();
}

export async function readWidgetComponentController(data: PageWidgetData[]) {
  return await readWidgetComponentService(data);
}

export async function createNewWidgetController(widgetUuid: string) {
  // TODO: fill out the translations data for the new widget
  const newWidget: Widget = {
    uuid: widgetUuid,
    translations: {
      [Languages.Default]: {},
    },
  };

  return await createNewWidgetService(newWidget);
}
