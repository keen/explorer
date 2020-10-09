/* eslint-disable @typescript-eslint/camelcase */
export const runQueryLabel = (query: any) => {
  const { analysis_type } = query;
  if (analysis_type === 'extraction') return 'Preview events';
  return 'Run Query';
};
