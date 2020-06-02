export const SELECT_EVENT_COLLECTION = '@query-creator/SELECT_EVENT_COLLECTION';
export const SELECT_ANALYSIS = '@query-creator/SELECT_ANALYSIS';

export const DEFAULT_ANALYSIS = 'count';

import { Analysis } from '../types';

export const ANALYSIS_TYPES: Analysis[] = [
  'average',
  'count',
  'count_unique',
  'extraction',
  'funnel',
  'maximum',
  'median',
  'minimum',
  'percentile',
  'select_unique',
  'standard_deviation',
  'sum',
];
