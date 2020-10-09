import { v4 as uuid } from 'uuid';

import { ExtractionProperty } from '../types';

export const serializePropertyNames = (
  propertyNames: string | string[]
): ExtractionProperty[] => {
  if (Array.isArray(propertyNames)) {
    return propertyNames.map((propertyName) => ({
      id: uuid(),
      propertyName,
    }));
  }

  return [
    {
      id: uuid(),
      propertyName: propertyNames,
    },
  ];
};
