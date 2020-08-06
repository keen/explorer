import { Filter } from '../types';

import { TYPES_CONFIG } from '../components/Filters';
import { ABSTRACT_OPERATORS } from '../constants';

export const convertAbstractOperators = ({
  operator,
  propertyValue,
  propertyType,
  ...filter
}: Filter): Filter => {
  let updatedOperator = operator;
  const isAbstractOperator = ABSTRACT_OPERATORS.includes(operator);

  if (isAbstractOperator) {
    const { rootOperator } = TYPES_CONFIG[propertyType][operator];
    updatedOperator = rootOperator;
  }

  return {
    operator: updatedOperator,
    propertyType,
    propertyValue,
    ...filter,
  };
};
