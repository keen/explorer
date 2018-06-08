import _ from 'lodash';
import DateUtils from './DateUtils';
import FormatUtils from './FormatUtils.js';

// ***********************
// ** Project Constants
// ***********************

const CONSTANTS = {

  DEFAULT_TIMEZONE: 'UTC',

  ANALYSIS_TYPES: [
    'sum',
    'count',
    'count_unique',
    'minimum',
    'maximum',
    'average',
    'select_unique',
    'extraction',
    'percentile',
    'median',
    'funnel'
  ],

  ABSOLUTE_INTERVAL_TYPES: [
    { name: 'minutely', value: 'minutely' },
    { name: 'hourly',   value: 'hourly' },
    { name: 'daily',    value: 'daily' },
    { name: 'weekly',   value: 'weekly' },
    { name: 'monthly',  value: 'monthly' },
    { name: 'yearly',   value: 'yearly' }
  ],

  RELATIVE_INTERVAL_TYPES: [
    { name: 'minutes',  value: 'minutes' },
    { name: 'hours',    value: 'hours' },
    { name: 'days',     value: 'days' },
    { name: 'weeks',    value: 'weeks' },
    { name: 'months',   value: 'months' },
    { name: 'years',    value: 'years' }
  ],

  TIMEZONES: [
    {
      name: 'UTC',
      offset: 0,
      dst_offset: 0
    },
    {
      name: 'Europe/London',
      offset: 0,
      dst_offset: 3600
    },
    {
      name: 'Africa/Casablanca',
      offset: 0,
      dst_offset: 0
    },
    {
      name: 'Africa/Nairobi',
      offset: 10800,
      dst_offset: 0
    },
    {
      name: 'Asia/Dubai',
      offset: 14400,
      dst_offset: 0
    },
    {
      name: 'America/Sao_Paulo',
      offset: -10800,
      dst_offset: -7200
    },
    {
      name: 'US/Eastern',
      offset: -18000,
      dst_offset: -14400
    },
    {
      name: 'US/Central',
      offset: -21600,
      dst_offset: -18000
    },
    {
      name: 'US/Mountain',
      offset: -25200,
      dst_offset: -21600
    },
    {
      name: 'US/Pacific',
      offset: -28800,
      dst_offset: -25200
    },
    {
      name: 'US/Alaska',
      offset: -32400,
      dst_offset: -28800
    },
    {
      name: 'US/Hawaii',
      offset: -36000,
      dst_offset: -32400
    },
    {
      name: 'Europe/Paris',
      offset: 3600,
      dst_offset: 7200
    },
    {
      name: 'Europe/Amsterdam',
      offset: 3600,
      dst_offset: 7200
    },
    {
      name: 'Europe/Stockholm',
      offset: 3600,
      dst_offset: 7200
    },
    {
      name: 'Europe/Prague',
      offset: 3600,
      dst_offset: 7200
    },
    {
      name: 'Asia/Istanbul',
      offset: 7200,
      dst_offset: 10800
    },
    {
      name: 'Europe/Istanbul',
      offset: 7200,
      dst_offset: 10800
    },
    {
      name: 'Europe/Copenhagen',
      offset: 3600,
      dst_offset: 7200
    },
    {
      name: 'Asia/Jakarta',
      offset: 25200,
      dst_offset: 25200
    },
    {
      name: 'Asia/Singapore',
      offset: 28800,
      dst_offset: 28800
    },
    {
      name: 'Australia/Perth',
      offset: 28800,
      dst_offset: 28800
    },
    {
      name: 'Asia/Tokyo',
      offset: 32400,
      dst_offset: 32400
    },
    {
      name: 'Australia/Sydney',
      offset: 36000,
      dst_offset: 39600
    },
    {
      name: 'Pacific/Auckland',
      offset: 43200,
      dst_offset: 46800
    }
  ],

  FILTER_OPERATORS: [
    { name: '\u003D Equal to',
      value: 'eq',
      canBeCoeredTo: ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime']
    },
    { name: '\u2260 Not equal to',
      value: 'ne',
      canBeCoeredTo: ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime']
    },
    { name: '\u003E Greater than',
      value: 'gt',
      canBeCoeredTo: ['Number', 'Null', 'Datetime', 'String']
    },
    { name: '\u2265 Greater than or equal to',
      value: 'gte',
      canBeCoeredTo: ['Number', 'Null', 'Datetime', 'String']
    },
    { name: '\u003C Less than',
      value: 'lt',
      canBeCoeredTo: ['Number', 'Null', 'Datetime', 'String']
    },
    { name: '\u2264 Less than or equal to',
      value: 'lte',
      canBeCoeredTo: ['Number', 'Null', 'Datetime', 'String']
    },
    { name: '\u2203 Property exists',
      value: 'exists',
      canBeCoeredTo: ['Boolean']
    },
    { name: '\u229A String contains',
      value: 'contains',
      canBeCoeredTo: ['String', 'Null']
    },
    { name: '\u2349 String does not contain',
      value: 'not_contains',
      canBeCoeredTo: ['String', 'Null']
    },
    { name: '\u29C7 Matches any value in a list',
      value: 'in',
      canBeCoeredTo: ['List']
    },
    { name: '\u2690 Within a given radius (geo)',
      value: 'within',
      canBeCoeredTo: ['Geo']
    }
  ]
};

module.exports = {

  getConstant: function(name) {
    return CONSTANTS[name];
  },

  eventsUrl: function(client) {
    return client.url('events', {
      api_key: client.config.masterKey
    });
  },

  getEventCollectionPropertyNames: function(project, collection) {
    return project.schema[collection] ? project.schema[collection].sortedProperties : [];
  },

  getPropertyType: function(project, collection, propertyName) {
    var collection = project.schema[collection];
    return collection ? collection.properties[propertyName] : null;
  },

  /*
    Returns the local timezone offset in seconds offset from UTC.
    This is how the Keen API wants the offset to look. This is also
    opposite in negative/positive numbers from how Javascript
    handles it.
   */
  getLocalTimezoneOffset: function(date){
    return (new Date().getTimezoneOffset() * -1) * 60;
  },

  getLocalTimezone: function(date){
    var isDST = DateUtils.isDST();
    var localOffset = module.exports.getLocalTimezoneOffset();
    var zones = CONSTANTS.TIMEZONES.filter((zone) => {
      if (isDST) {
        return zone.dst_offset === localOffset;
      } else {
        return zone.offset === localOffset;
      }
    });
    if (!zones.length) return localOffset;
    return zones[0].name;
  },

};
