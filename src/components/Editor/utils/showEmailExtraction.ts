/* eslint-disable @typescript-eslint/camelcase */
export const showEmailExtraction = ({ analysis_type }: Record<string, any>) =>
  analysis_type === 'extraction';

export const isExtraction = ({ analysis_type }: Record<string, any>) =>
  analysis_type === 'extraction';
