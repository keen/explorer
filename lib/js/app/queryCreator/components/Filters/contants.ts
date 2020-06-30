// export const DATA_TYPES = [
//   'String',
//   'Number',
//   'Null',
//   'List',
//   'Boolean',
//   'Datetime'
// ];

export const DATA_TYPES = {
  string: 'String',
  num: 'Number',
  datetime: 'Datetime',
  list: 'List',
  null: 'Null',
  bool: 'Boolean',
};

const today = new Date();
export const DEFAULT_TIMEFRAME_ABSOLUTE_VALUE = {
  start: new Date(today.setHours(0, 0, 0, 0)).toISOString(),
  end: new Date(today.setHours(24, 0, 0, 0)).toISOString(),
};

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
    dataTypes: ['Geo'],
  },
];