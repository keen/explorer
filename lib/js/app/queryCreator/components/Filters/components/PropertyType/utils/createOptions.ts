export const createOptions = (dataTypes: string[]) =>
  dataTypes.map((dataType) => ({
    label: dataType,
    value: dataType,
  }));
