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
    'UTC',
    'Europe/London',
    'Africa/Casablanca',
    'Africa/Nairobi',
    'Asia/Dubai',
    'America/Sao_Paulo',
    'US/Eastern',
    'US/Central',
    'US/Mountain',
    'US/Pacific',
    'US/Alaska',
    'US/Hawaii',
    'Europe/Paris',
    'Europe/Amsterdam',
    'Europe/Stockholm',
    'Europe/Prague',
    'Asia/Istanbul',
    'Europe/Istanbul',
    'Europe/Copenhagen',
    'Asia/Jakarta',
    'Asia/Singapore',
    'Australia/Perth',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Pacific/Auckland'
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
