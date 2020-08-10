import { Filter, Operator } from '../types';

export const createAbstractOperator = ({
  propertyValue,
  operator,
}: Filter): Operator => {
  if (propertyValue === null) {
    if (operator === 'eq') return 'is_null';
    if (operator === 'ne') return 'is_not_null';
  }

  return operator;
};
