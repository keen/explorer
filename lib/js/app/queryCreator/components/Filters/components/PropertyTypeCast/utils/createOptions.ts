export const createOptions = (dataTypes: string[]) =>
  dataTypes.map((dataType) => ({
    label: dataType.toLowerCase(),
    value: dataType,
  }));
