import { TYPES_CONFIG } from '../constants';

import { Property, Operator } from '../../../types';

export const isComponentChange = (
  propertyType: Property,
  currentOperator: Operator,
  updatedOperator: Operator
) => {
  const operatorsSettings = TYPES_CONFIG[propertyType];
  return (
    operatorsSettings[currentOperator].component !==
    operatorsSettings[updatedOperator].component
  );
};
