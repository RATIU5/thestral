import dynamic from "astro:import";

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
  data: Array<CollectWidgetsProps>,
): Promise<
  Array<{ component: AstroComponentFactory; props: { [x: string]: any } }>
> {
  const components: Array<{
    component: AstroComponentFactory;
    props: { [x: string]: any };
  }> = [];

  let map;
  try {
    // Read the map.json file to get the widget name from it's id
    map = (await import("@/widgets/map.json")).default;
  } catch (e) {
    // @ts-ignore
    if (__VERBOSE__) {
      console.error(e);
    } else {
      console.error(
        "error: failed to import widget map at 'src/widgets/map.json'; please run 'thes map' to generate it",
      );
    }
    return components;
  }

  for (const w of data) {
    // Pull the widget name from the map
    const widgetName = map[w.widgetId as keyof typeof map];
    const widgetTemplatePath = `widgets/${widgetName}/template.astro`;
    try {
      const component = await dynamic(widgetTemplatePath);
      components.push({
        component,
        props: w.props,
      });
    } catch (e) {
      // @ts-ignore
      if (__VERBOSE__) {
        console.error(e);
      } else {
        console.error(
          `error: failed to import widget at '${widgetTemplatePath}'; skipping`,
        );
      }
    }
  }
  return components;
}
