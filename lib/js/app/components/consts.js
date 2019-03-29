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

export const TIMEZONES = [
    {
      label: 'UTC',
      value: 0,
      dst_value: 0
    },
    {
      label: 'Europe/London',
      value: 0,
      dst_value: 3600
    },
    {
      label: 'Africa/Casablanca',
      value: 0,
      dst_value: 0
    },
    {
      label: 'Africa/Nairobi',
      value: 10800,
      dst_value: 0
    },
    {
      label: 'Asia/Dubai',
      value: 14400,
      dst_value: 0
    },
    {
      label: 'America/Sao_Paulo',
      value: -10800,
      dst_value: -7200
    },
    {
      label: 'US/Eastern',
      value: -18000,
      dst_value: -14400
    },
    {
      label: 'US/Central',
      value: -21600,
      dst_value: -18000
    },
    {
      label: 'US/Mountain',
      value: -25200,
      dst_value: -21600
    },
    {
      label: 'US/Pacific',
      value: -28800,
      dst_value: -25200
    },
    {
      label: 'US/Alaska',
      value: -32400,
      dst_value: -28800
    },
    {
      label: 'US/Hawaii',
      value: -36000,
      dst_value: -32400
    },
    {
      label: 'Europe/Paris',
      value: 3600,
      dst_value: 7200
    },
    {
      label: 'Europe/Amsterdam',
      value: 3600,
      dst_value: 7200
    },
    {
      label: 'Europe/Stockholm',
      value: 3600,
      dst_value: 7200
    },
    {
      label: 'Europe/Prague',
      value: 3600,
      dst_value: 7200
    },
    {
      label: 'Asia/Istanbul',
      value: 7200,
      dst_value: 10800
    },
    {
      label: 'Europe/Istanbul',
      value: 7200,
      dst_value: 10800
    },
    {
      label: 'Europe/Copenhagen',
      value: 3600,
      dst_value: 7200
    },
    {
      label: 'Asia/Jakarta',
      value: 25200,
      dst_value: 25200
    },
    {
      label: 'Asia/Singapore',
      value: 28800,
      dst_value: 28800
    },
    {
      label: 'Australia/Perth',
      value: 28800,
      dst_value: 28800
    },
    {
      label: 'Asia/Tokyo',
      value: 32400,
      dst_value: 32400
    },
    {
      label: 'Australia/Sydney',
      value: 36000,
      dst_value: 39600
    },
    {
      label: 'Pacific/Auckland',
      value: 43200,
      dst_value: 46800
    }
  ];

  export const FILTER_OPERATORS = [
    { label: '\u003D Equal to',
      value: 'eq',
      canBeCoeredTo: ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime']
    },
    { label: '\u2260 Not equal to',
      value: 'ne',
      canBeCoeredTo: ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime']
    },
    { label: '\u003E Greater than',
      value: 'gt',
      canBeCoeredTo: ['Number', 'Null', 'Datetime', 'String']
    },
    { label: '\u2265 Greater than or equal to',
      value: 'gte',
      canBeCoeredTo: ['Number', 'Null', 'Datetime', 'String']
    },
    { label: '\u003C Less than',
      value: 'lt',
      canBeCoeredTo: ['Number', 'Null', 'Datetime', 'String']
    },
    { label: '\u2264 Less than or equal to',
      value: 'lte',
      canBeCoeredTo: ['Number', 'Null', 'Datetime', 'String']
    },
    { label: '\u2203 Property exists',
      value: 'exists',
      canBeCoeredTo: ['Boolean']
    },
    { label: '\u229A String contains',
      value: 'contains',
      canBeCoeredTo: ['String', 'Null']
    },
    { label: '\u2349 String does not contain',
      value: 'not_contains',
      canBeCoeredTo: ['String', 'Null']
    },
    { label: '\u29C7 Matches any value in a list',
      value: 'in',
      canBeCoeredTo: ['List']
    },
    { label: '\u2690 Within a given radius (geo)',
      value: 'within',
      canBeCoeredTo: ['Geo']
    }
  ];

  export const DATA_TYPES = [
    {
      label: 'String',
      value: 'String'
    },
    {
      label: 'Number',
      value: 'Number'
    },
    {
      label: 'Null',
      value: 'Null'
    },
    {
      label: 'List',
      value: 'List'
    },
    {
      label: 'Boolean',
      value: 'Boolean'
    },
    {
      label: 'Datetime',
      value: 'Datetime'
    }
  ];
