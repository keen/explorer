export const sortVisualizations = (a: string, b: string) => {
  const widgetA = a.toLowerCase();
  const widgetB = b.toLowerCase();

  if (widgetA < widgetB) return -1;
  if (widgetA > widgetB) return 1;
  return 0;
};
