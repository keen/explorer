var _ = require('lodash');
var DateUtils = require('./DateUtils');
var FormatUtils = require('./FormatUtils.js');

// ***********************
// ** Project Constants
// ***********************

var CONSTANTS = {

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
    { name: 'UTC Time (GMT+00:00)',           value: 'UTC',                  offset: '+00:00' },
    { name: 'Europe/London (GMT+00:00)',      value: 'Europe/London',        offset: '+00:00' },
    { name: 'Africa/Casablanca (GMT+00:00)',  value: 'Africa/Casablanca',    offset: '+00:00' },
    { name: 'Africa/Nairobi (GMT+03:00)',     value: 'Africa/Nairobi',       offset: '+03:00' },
    { name: 'Asia/Dubai (GMT+04:00)',         value: 'Asia/Dubai',           offset: '+04:00' },
    { name: 'America/Sao Paulo (GMT-03:00)',  value: 'America/Sao_Paulo',    offset: '-03:00' },
    { name: 'US/Eastern (GMT-05:00)',         value: 'US/Eastern',           offset: '-05:00' },
    { name: 'US/Central (GMT-06:00)',         value: 'US/Central',           offset: '-06:00' },
    { name: 'US/Mountain (GMT-07:00)',        value: 'US/Mountain',          offset: '-07:00' },
    { name: 'US/Pacific (GMT-08:00)',         value: 'US/Pacific',           offset: '-08:00' },
    { name: 'US/Alaska (GMT-09:00)',          value: 'US/Alaska',            offset: '-09:00' },
    { name: 'US/Hawaii (GMT-10:00)',          value: 'US/Hawaii',            offset: '-10:00' },
    { name: 'Europe/Paris (GMT+01:00)',       value: 'Europe/Paris',         offset: '+01:00' },
    { name: 'Europe/Amsterdam (GMT+01:00)',   value: 'Europe/Amsterdam',     offset: '+01:00' },
    { name: 'Europe/Stockholm (GMT+01:00)',   value: 'Europe/Stockholm',     offset: '+01:00' },
    { name: 'Europe/Prague (GMT+02:00)',      value: 'Europe/Prague',        offset: '+02:00' },
    { name: "Asia/Istanbul (GMT+02:00)",      value: 'Asia/Istanbul',        offset: '+02:00' },
    { name: "Europe/Istanbul (GMT+02:00)",    value: 'Europe/Istanbul',      offset: '+02:00' },
    { name: 'Europe/Copenhagen (GMT+02:00)',  value: 'Europe/Copenhagen',    offset: '+02:00' },
    { name: 'Asia/Jakarta (GMT+07:00)',       value: 'Asia/Jakarta',         offset: '+07:00' },
    { name: 'Asia/Singapore (GMT+08:00)',     value: 'Asia/Singapore',       offset: '+08:00' },
    { name: 'Australia/Perth (GMT+08:00)',    value: 'Australia/Perth',      offset: '+08:00' },
    { name: "Asia/Tokyo (GMT+09:00)",         value: 'Asia/Tokyo',           offset: '+09:00' },
    { name: 'Australia/Sydney (GMT+10:00)',   value: 'Australia/Sydney',     offset: '+10:00' },
    { name: "Pacific/Auckland (GMT+12:00)",   value: 'Pacific/Auckland',     offset: '+12:00' }
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

CONSTANTS.TIMEZONE_NAMES = _.map(CONSTANTS.TIMEZONES, 'name');

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

  getLocalTimezoneOffset: function(date){
    var offset = new Date().getTimezoneOffset();
    if (DateUtils.isDST()) {
      offset += 60;
    }
    var strSign = offset > 0 ? '-' : '+';
    var strHours = FormatUtils.padLeft(Math.floor(offset / 60));
    var strMinutes = FormatUtils.padLeft(offset % 60);
    var found = _.find(CONSTANTS.TIMEZONES, function(timezone){
      return timezone.offset === strSign + strHours + ':' + strMinutes;
    });
    return found ? found.value : offset * -60;
  },

};
