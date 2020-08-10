import { Property, Operator } from '../../../../../types';

import { TYPES_CONFIG } from '../../../constants';

export const createOptions = (propertyType: Property) => {
  const operatorsConfig = TYPES_CONFIG[propertyType];
  if (operatorsConfig) {
    const operators = Object.keys(operatorsConfig);

    return operators.map((operatorKey: Operator) => ({
      label: operatorsConfig[operatorKey].label,
      rootOperator: operatorsConfig[operatorKey].rootOperator,
      value: operatorKey,
    }));
  }

  return [];
};
