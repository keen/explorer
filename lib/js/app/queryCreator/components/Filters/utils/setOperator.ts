import { TYPES_CONFIG } from '../constants';

import { Operator, Property } from '../../../types';

export const setOperator = (
  propertyType: Property,
  currentOperator?: Operator
): Operator => {
  const operatorsConfig = TYPES_CONFIG[propertyType];
  const operators = Object.keys(operatorsConfig) as Operator[];

  const [firstOperator] = operators;

  return operators.includes(currentOperator) ? currentOperator : firstOperator;
};
