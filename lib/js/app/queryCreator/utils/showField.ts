import { CreatorFields } from '../types';
import { Analysis } from '../../types';

import { FIELDS_CONFIG } from '../config';

export const showField = (fieldName: CreatorFields, analysis: Analysis) => {
  const fieldRule = FIELDS_CONFIG[fieldName];
  if (fieldRule.includes('*')) return true;
  return fieldRule.includes(analysis);
};
