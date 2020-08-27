export const createListFromSchema = (schema: Record<string, string>) => {
  const arr = [];
  for (const key in schema) {
    arr.push({ path: key, type: schema[key] });
  }
  return arr;
};
