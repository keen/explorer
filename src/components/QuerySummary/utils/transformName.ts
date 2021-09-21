import { Analysis } from '@keen.io/query';

export const transformName = (analysisName: Analysis | 'multi_analysis') => {
  const parts = analysisName.split('_');
  parts[0] = parts[0].replace(/^\w/, (c: string) => c.toUpperCase());
  return parts.join(' ');
};
