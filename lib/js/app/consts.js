/* eslint-disable @typescript-eslint/camelcase */

import moment from 'moment';

export const PANEL_NEW_QUERY = 0;
export const PANEL_BROWSE = 1;

export const ERRORS = {
  OVER_LIMIT_ERROR: 'OverCachedQueryLimitError',
  TOO_MANY_QUERIES: 'TooManyCachedQueriesInTheCurrentBillingPeriod',
};

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
  'years',
];

/*
end: "2020-06-02T00:00:00.000Z"
start: "2019-06-12T00:00:00.000Z"

*/

export const DEFAULT_NUMBER_OF_TIME_UNITS = 14;

export const RELATIVITY_UNITS = ['this', 'previous'];

export const DEFAULT_TIMEFRAME_RELATIVE_VALUE = `${RELATIVITY_UNITS[0]}_${DEFAULT_NUMBER_OF_TIME_UNITS}_${TIME_UNITS[2]}`;
export const DEFAULT_TIMEFRAME_ABSOLUTE_VALUE = {
  start: `${moment().subtract(1, 'day').format('YYYY-MM-DD')}T${moment(
    moment().format('YYYY-MM-DD')
  ).format('HH:mm')}:00.000Z`,
  end: `${moment(moment().format('YYYY-MM-DD')).format('YYYY-MM-DD')}T${moment(
    moment().format('YYYY-MM-DD')
  ).format('HH:mm')}:00.000Z`,
};

export const INTERVALS = [
  'minutely',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
];

export const DEFAULT_STANDARD_INTERVAL = INTERVALS[2];
export const DEFAULT_CUSTOM_INTERVAL = `every_7_${TIME_UNITS[2]}`;

export const TIMEFRAME_TABS = ['relative', 'absolute'];

export const TIMEZONES = [
  {
    label: 'UTC',
    value: 0,
    dst_value: 0,
  },
  {
    label: 'Europe/London',
    value: 0,
    dst_value: 3600,
  },
  {
    label: 'Africa/Casablanca',
    value: 0,
    dst_value: 0,
  },
  {
    label: 'Africa/Nairobi',
    value: 10800,
    dst_value: 0,
  },
  {
    label: 'Asia/Dubai',
    value: 14400,
    dst_value: 0,
  },
  {
    label: 'America/Sao_Paulo',
    value: -10800,
    dst_value: -7200,
  },
  {
    label: 'US/Eastern',
    value: -18000,
    dst_value: -14400,
  },
  {
    label: 'US/Central',
    value: -21600,
    dst_value: -18000,
  },
  {
    label: 'US/Mountain',
    value: -25200,
    dst_value: -21600,
  },
  {
    label: 'US/Pacific',
    value: -28800,
    dst_value: -25200,
  },
  {
    label: 'US/Alaska',
    value: -32400,
    dst_value: -28800,
  },
  {
    label: 'US/Hawaii',
    value: -36000,
    dst_value: -32400,
  },
  {
    label: 'Europe/Paris',
    value: 3600,
    dst_value: 7200,
  },
  {
    label: 'Europe/Amsterdam',
    value: 3600,
    dst_value: 7200,
  },
  {
    label: 'Europe/Stockholm',
    value: 3600,
    dst_value: 7200,
  },
  {
    label: 'Europe/Prague',
    value: 3600,
    dst_value: 7200,
  },
  {
    label: 'Asia/Istanbul',
    value: 7200,
    dst_value: 10800,
  },
  {
    label: 'Europe/Istanbul',
    value: 7200,
    dst_value: 10800,
  },
  {
    label: 'Europe/Copenhagen',
    value: 3600,
    dst_value: 7200,
  },
  {
    label: 'Asia/Jakarta',
    value: 25200,
    dst_value: 25200,
  },
  {
    label: 'Asia/Singapore',
    value: 28800,
    dst_value: 28800,
  },
  {
    label: 'Australia/Perth',
    value: 28800,
    dst_value: 28800,
  },
  {
    label: 'Asia/Tokyo',
    value: 32400,
    dst_value: 32400,
  },
  {
    label: 'Australia/Sydney',
    value: 36000,
    dst_value: 39600,
  },
  {
    label: 'Pacific/Auckland',
    value: 43200,
    dst_value: 46800,
  },
];

export const FILTER_OPERATORS = [
  {
    label: '\u003D Equal to',
    value: 'eq',
    dataTypes: ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime'],
  },
  {
    label: '\u2260 Not equal to',
    value: 'ne',
    dataTypes: ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime'],
  },
  {
    label: '\u003E Greater than',
    value: 'gt',
    dataTypes: ['Number', 'Null', 'Datetime', 'String'],
  },
  {
    label: '\u2265 Greater than or equal to',
    value: 'gte',
    dataTypes: ['Number', 'Null', 'Datetime', 'String'],
  },
  {
    label: '\u003C Less than',
    value: 'lt',
    dataTypes: ['Number', 'Null', 'Datetime', 'String'],
  },
  {
    label: '\u2264 Less than or equal to',
    value: 'lte',
    dataTypes: ['Number', 'Null', 'Datetime', 'String'],
  },
  {
    label: '\u2203 Property exists',
    value: 'exists',
    dataTypes: ['String', 'Number', 'Boolean'],
  },
  {
    label: '\u229A String contains',
    value: 'contains',
    dataTypes: ['String', 'Null'],
  },
  {
    label: '\u2349 String does not contain',
    value: 'not_contains',
    dataTypes: ['String', 'Null'],
  },
  {
    label: '\u229A Regex',
    value: 'regex',
    dataTypes: ['String'],
  },
  {
    label: '\u29C7 Matches any value in a list',
    value: 'in',
    dataTypes: ['String', 'Number', 'List'],
  },
  {
    label: '\u2690 Within a given radius (geo)',
    value: 'within',
    dataTypes: ['Geo', 'List'],
  },
];

export const DATA_TYPES = [
  {
    label: 'String',
    value: 'String',
  },
  {
    label: 'Number',
    value: 'Number',
  },
  {
    label: 'Null',
    value: 'Null',
  },
  {
    label: 'List',
    value: 'List',
  },
  {
    label: 'Boolean',
    value: 'Boolean',
  },
  {
    label: 'Datetime',
    value: 'Datetime',
  },
];

export const TAB_TIMEFRAME_RELATIVE = 0;
export const TAB_TIMEFRAME_ABSOLUTE = 1;
export const TAB_EXTRACTION_PREVIEW = 0;
export const TAB_EXTRACTION_BULK = 1;

export const EXTRACTION_PREVIEW_EVENTS_DEFAULT = 100;
export const EXTRACTION_PREVIEW_EVENTS_LIMIT = 100000;
export const EXTRACTION_BULK_EVENTS_DEFAULT = 1000;
export const EXTRACTION_BULK_EVENTS_LIMIT = 10000000;
