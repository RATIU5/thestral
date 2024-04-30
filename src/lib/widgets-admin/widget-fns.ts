export async function getWidgetNameById(widgetId: string): Promise<string> {
  try {
    // Read the map.json file to get the widget name from it's id
    const map = (await import("@/widgets/map.json")).default;
    return map[widgetId as keyof typeof map];
  } catch (e) {
    // @ts-ignore
    if (__VERBOSE__) {
      console.error(e);
    } else {
      console.error(
        "error: failed to import widget map at 'src/widgets/map.json'; please run 'thes map' to generate it"
      );
    }
    return "<undefined>";
  }
}
