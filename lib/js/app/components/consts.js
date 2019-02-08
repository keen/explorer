export const ANALYSIS_TYPES = [
  { type: 'sum', targetProperty: true },
  { type: 'count' },
  { type: 'count_unique', targetProperty: true },
  { type: 'minimum', targetProperty: true },
  { type: 'maximum', targetProperty: true },
  { type: 'average', targetProperty: true },
  { type: 'select_unique', targetProperty: true },
  { type: 'extraction', extraction: true },
  { type: 'percentile', targetProperty: true, percentile: true },
  { type: 'standard_deviation', targetProperty: true },
  { type: 'median', targetProperty: true },
  { type: 'funnel', funnel: true }
];

export const TIME_UNITS = [
  'minutes',
  'hours',
  'days',
  'weeks',
  'months',
  'years'
];

export const RELATIVITY_UNITS = [
  'this',
  'previous'
];

export const TIMEFRAME_TABS = [
  'relative',
  'absolute'
];
