import dynamic from "astro:import";
import pullWidgetById from "../lib/pull-widget-by-id";

export async function collectRenderWidgets(
  data: Array<{
    widgetId: string;
    payload: {
      [x: string]: any;
    };
  }>
) {
  const components: Array<{
    component: AstroComponentFactory;
    props: { [x: string]: any };
  }> = [];
  for (const w of data) {
    const id = await pullWidgetById(w.widgetId);
    console.log(w.widgetId);

    const widgetPath = `widgets/${id}.astro`;
    const component = await dynamic(widgetPath);
    components.push({ component, props: w.payload });
  }
  return components;
}
