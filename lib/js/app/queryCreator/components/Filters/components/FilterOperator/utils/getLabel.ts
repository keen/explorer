import { Property, Operator } from '../../../../../types';

import { TYPES_CONFIG } from '../../../constants';

export const getLabel = (propertyType: Property, operator?: Operator) => {
  const operatorsConfig = TYPES_CONFIG[propertyType];
  if (operatorsConfig && operator) {
    const { label } = operatorsConfig[operator];
    return label;
  }

  return null;
};
