var _ = require('lodash');
var S = require('string');
var moment = require('moment');
var ISO_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';

var QUERY_PARAMS = [
  'event_collection',
  'analysis_type',
  'target_property',
  'percentile',
  'group_by',
  'timeframe',
  'timeframe.start',
  'timeframe.end',
  'interval',
  'timezone',
  'filters',
  'filters.property_name',
  'filters.operator',
  'filters.property_value',
  'email',
  'latest',
  'property_names',
  'steps',
  'steps.event_collection',
  'steps.actor_property',
  'steps.timeframe',
  'steps.timeframe.start',
  'steps.timeframe.end',
  'steps.timezone',
  'steps.filters.property_name', 
  'steps.filters.operator',
  'steps.filters.property_value',
  'steps.optional',
  'steps.inverted'
];

function _isWrappedInSingleQuotes(value) {
  return value.substring(0, 1) === "'" && value.substring(value.length - 1) === "'";
}

function _isWrappedInDoubleQuotes(value) {
  return value.substring(0, 1) === '"' && value.substring(value.length - 1) === '"';
}

module.exports = {

  toTitleCase: function(text) {
    return text.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },

  singularize: function(text) {
    return text.replace(/s+$/, '');
  },

  prettyPrintJSON: function(json) {
    return JSON.stringify(json, undefined, 2);
  },

  coercionTypeForPropertyType: function(type) {
    var coercionTypeMap = {
      'string':   'String',
      'num':      'Number',
      'datetime': 'Datetime',
      'list':     'List',
      'null':     'Null',
      'bool':     'Boolean'
    };
    return coercionTypeMap[type];
  },

  booleanMap: function(value) {
    if (value === null || value === '' ) {
      return '';
    } else if (value === 'false') {
      return 'false';
    } else if (value === 'true') {
      return 'true';
    } else {
      return value ? 'true' : 'false';
    }
  },

  sortItems: function(items, keyFunc) {
    // using a key + mapped indices avoids repeated calls to
    // possibly-slow key functions.
    // keyFunc is assumed to return a unicode string.
    keyFunc = keyFunc || function formatString(str) {
        return str.replace(/[-_ .]/, '').toLowerCase();
    };

    var mapped = items.map(function(el, i) {
      return { index: i, value: keyFunc(el) };
    })

    mapped.sort(function(a, b) {
      return a.value.localeCompare(b.value);
    });

    return mapped.map(function(el){
      return items[el.index];
    });
  },

  /**
   * Checks whether the given string is in a date format, as defined by:
   * 'YYYY-MM-DDTHH:mm:ss.SSS'
   * @return {Boolean} Whether or not the string is in the expected format.
   */
  isDateInStrictFormat: function(dateString) {
    return moment(dateString, ISO_DATE_FORMAT, true).isValid();
  },

  formatISOTimeNoTimezone: function(time) {
    return moment(time).format('YYYY-MM-DDTHH:mm:ss.SSS');
  },

  generateRandomId: function(prefix) {
    return (prefix || '') + (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  },

  generateTempId: function() {
    return module.exports.generateRandomId('TEMP-');
  },

  isValidQueryValue: function(value) {
    if (_.isArray(value)) {
      return value.length > 0;
    } else {
      if (value === false) return true;
      if (value === 0) return true;
      return !_.isUndefined(value) && !_.isNull(value) && !(!_.isNumber(value) && _.isEmpty(value));
    }
  },

  isValidQueryParameter: function(key) {
    return _.contains(QUERY_PARAMS, key);
  },
  
  // Remove any empty properties or ones that shouldn't be
  // part of the query request.
  cleanQueryParameters: function(params, prefix) {
    if(_.isUndefined(prefix)) {
      prefix = "";
    } else {
      prefix = prefix + ".";
    }

    _.each(params, function(value, key) {

      // Oh hell yeah, recursion.
      if(_.isPlainObject(value)) {
        module.exports.cleanQueryParameters(value, prefix + key);      
      } else if(_.isArray(value) && _.isPlainObject(value[0])) { // an array of objects (we don't ever have mixed arrays...right?)
        _.each(value, function(subValue, index) {
          module.exports.cleanQueryParameters(subValue, prefix + key);
        });
      }

      // cleanQueryParameters may have set some array items to undefined or empty objects
      _.remove(value, function (subValue) {
        return _.isUndefined(subValue) || (_.isPlainObject(subValue) && _.isEmpty(subValue));
      });
      
      if(!module.exports.isValidQueryParameter(prefix + key) || !module.exports.isValidQueryValue(value)) {
        delete params[key];
      }
    });
  },

  parseList: function(value) {
    if (value) {
      if (!module.exports.isList(value)) return '';
      var parsedList = S(value).parseCSV();

      parsedList = _.map(parsedList, function(val) {
        if (_isWrappedInSingleQuotes(val)) {
          quotelessVal = val.replace("'", "");
          if (parseFloat(quotelessVal)) {
            val = parseFloat(quotelessVal);
          }
        }
        return val;
      });

      return parsedList;
    } else {
      return '';
    }
  },

  isList: function(str) {
    var isList = true;
    var items = str.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    for(var i=0; i<items.length; i++) {
      isList = (_isWrappedInSingleQuotes(items[i].trim()) || _isWrappedInDoubleQuotes(items[i].trim()));
      if (!isList) break;
    }
    return isList;
  }

};
