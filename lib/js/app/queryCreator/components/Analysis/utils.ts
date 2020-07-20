import { ANALYSIS_TYPES } from '../../constants';
import { Analysis } from '../../../types';

export const createOptions = (): { label: string; value: Analysis }[] =>
  ANALYSIS_TYPES.map((analysisName: Analysis) => ({
    label: analysisName,
    value: analysisName,
  }));
