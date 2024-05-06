import { readWidgetDetailsService } from "../services/widgetService";

export async function readWidgetDetailsController() {
  return await readWidgetDetailsService();
}
