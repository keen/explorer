export const runQueryLabel = (query: any) => {
  const { analysis_type, email } = query;
  if (analysis_type === 'extraction' && email) return 'Extract to email';
  return 'Run Query';
};
