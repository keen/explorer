import { ANALYSIS_TYPES } from '../../constants';

export const createOptions = () =>
  ANALYSIS_TYPES.map((analysisName: string) => ({
    label: analysisName,
    value: analysisName,
  }));
