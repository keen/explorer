export const ANALYSIS_TYPES = [
  { type: 'average', targetProperty: true },
  { type: 'count', default: true },
  { type: 'count_unique', targetProperty: true },
  { type: 'extraction', extraction: true },
  { type: 'funnel', funnel: true },
  { type: 'maximum', targetProperty: true },
  { type: 'median', targetProperty: true },
  { type: 'minimum', targetProperty: true },
  { type: 'percentile', targetProperty: true, percentile: true },
  { type: 'select_unique', targetProperty: true },
  { type: 'standard_deviation', targetProperty: true },
  { type: 'sum', targetProperty: true },
];

export const TIME_UNITS = [
  'minutes',
  'hours',
  'days',
  'weeks',
  'months',
  'years'
];

export const INTERVALS = [
  'minutely',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly'
];

export const RELATIVITY_UNITS = [
  'this',
  'previous'
];

export const TIMEFRAME_TABS = [
  'relative',
  'absolute'
];
