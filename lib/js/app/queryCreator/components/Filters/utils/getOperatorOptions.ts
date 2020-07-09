import { FILTER_OPERATORS } from '../constants';
import { PropertyType } from '../../../types';

export const getOperatorOptions = (type?: PropertyType) => {
  if (!type) return FILTER_OPERATORS;

  return FILTER_OPERATORS.filter(operator => operator.dataTypes.includes(type));
}