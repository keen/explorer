const setValue = (obj: Record<string, any>, path: string, value: string) => {
  const keys = path.split('.');
  let objectCopy = obj;

  while (keys.length - 1) {
    const key = keys.shift();
    if (!(key in objectCopy)) objectCopy[key] = {};
    objectCopy = objectCopy[key];
  }
  objectCopy[keys[0]] = [path, value];
};

export const createTree = (properties: Record<string, any>) =>
  Object.keys(properties)
    .sort()
    .reduce((acc, key) => {
      const propertyType = properties[key];
      setValue(acc, key, propertyType);
      return acc;
    }, {});
