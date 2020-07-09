import { Filter } from '../../../types';

const getType = (value) => {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  return value.constructor.name.toLowerCase();
}

const isList = (value) => {
  const strValue = value.toString();
  return strValue.split(',').length > 1
}

const getTypeFromValue = (filter: Filter) => {
  if (!filter) return null;
  const { propertyValue, operator } = filter;
  switch(getType(propertyValue)) {
    case 'object':
      return 'Geo';
    case 'string':
      if (operator === 'exists') return 'Boolean';
      if (['false', 'true'].includes(propertyValue)) return 'Boolean';
      if (!isNaN(propertyValue) && ['contains', 'not_contains'].includes(operator)) return 'Number';
      if (new Date(propertyValue) && new Date(propertyValue).toString() !== 'Invalid Date') return 'Datetime';
      if (isList(propertyValue)) return 'List';
      return 'String';
    case 'array':
      return 'List';
    case 'boolean':
      return 'Boolean';
    case 'number':
      return 'Number';
    case 'null':
      return 'Null';
  }
}

export const getPropertyType = (item: Filter) => {
  const propertyType = item?.propertyType || getTypeFromValue(item);
  return propertyType ? { label: propertyType, value: propertyType } : null;
}