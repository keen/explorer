export const SELECT_EVENT_COLLECTION = '@query-creator/SELECT_EVENT_COLLECTION';
export const SELECT_ANALYSIS = '@query-creator/SELECT_ANALYSIS';

export const SET_QUERY_EVENT = '@query-creator/set-query';
export const NEW_QUERY_EVENT = '@query-creator/new-query';

export const DEFAULT_ANALYSIS = 'count';

import { Analysis } from '../types';

export const KEYBOARD_KEYS = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  ESCAPE: 27,
};

export const SCHEMA_PROPS = {
  num: 'Number',
  string: 'String',
  bool: 'Boolean',
  datetime: 'Datetime',
  null: 'String',
  list: 'List',
  geo: 'Geo',
  array: 'List',
};

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
