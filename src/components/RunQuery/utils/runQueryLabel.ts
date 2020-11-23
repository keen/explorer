/* eslint-disable @typescript-eslint/camelcase */
export const runQueryLabel = (query: any) => {
  const { analysis_type } = query;
  if (analysis_type === 'extraction') return 'editor.preview_events_button';
  return 'editor.run_query_button';
};
