export const createCollection = (properties: Record<string, string>) =>
  Object.keys(properties).map((key: string) => ({
    path: key,
    type: properties[key],
  }));
