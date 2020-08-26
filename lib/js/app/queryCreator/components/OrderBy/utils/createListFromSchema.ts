export const createListFromSchema = (schema: any) => {
  const arr = [];
  for (const key in schema) {
    arr.push({ path: key, type: schema[key] });
  }
  return arr;
};
