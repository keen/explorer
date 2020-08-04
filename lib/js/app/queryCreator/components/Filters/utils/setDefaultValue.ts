import { TYPES_CONFIG } from '../constants';

import { Property, Operator } from '../../../types';

export const setDefaultValue = (property: Property, operator: Operator) => {
  const operatorSettings = TYPES_CONFIG[property];

  console.log(
    operatorSettings[operator],
    'setDefaultValue',
    operator,
    operatorSettings
  );

  const { defaultValue } = operatorSettings[operator];

  if (
    typeof defaultValue === 'function' &&
    {}.toString.call(defaultValue) === '[object Function]'
  ) {
    return defaultValue();
  }

  return defaultValue;
};
