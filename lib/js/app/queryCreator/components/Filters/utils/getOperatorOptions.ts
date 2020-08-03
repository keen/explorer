import { FILTER_OPERATORS } from '../constants';
import { Property } from '../../../types';

export const getOperatorOptions = (type?: Property) => {
  if (!type) return FILTER_OPERATORS;

  return FILTER_OPERATORS.filter((operator) =>
    operator.dataTypes.includes(type)
  );
};
