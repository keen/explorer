import { DATA_TYPES } from '../constants';
import { Filter , PropertyType} from '../../../types';

export const getPropertyType = ({ schema, filter }: {schema: any, filter: Filter}) => {
  const { propertyName, operator } = filter;

  let { propertyType } = filter;

  if (propertyType) {
    return propertyType;
  }

  const typeFromSchema = (schema && schema[propertyName]) || {};
  propertyType = DATA_TYPES[typeFromSchema];

  if (operator === 'exists') {
    propertyType = 'Boolean';
  }

  return propertyType as PropertyType;
};