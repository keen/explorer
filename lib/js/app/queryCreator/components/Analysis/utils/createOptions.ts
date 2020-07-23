import { ANALYSIS_TYPES } from '../../../constants';
import { Analysis } from '../../../../types';

import { transformName } from './transformName';

export const createOptions = (): { label: string; value: Analysis }[] =>
  ANALYSIS_TYPES.map((analysisName: Analysis) => ({
    label: transformName(analysisName),
    value: analysisName,
  }));
