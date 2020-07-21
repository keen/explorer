export const createCollection = (properties: Record<string, string>) =>
  Object.keys(properties).map((key: string) => ({
    propertyPath: key,
    propertyType: properties[key],
  }));
