var _ = require('lodash');
var S = require('string');
var moment = require('moment');
var DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSS";

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
   * Returns an ISO formatted datetime string.
   * "time" is a UTC time, so Date.parse will put it back into local timezone.
   * So we need to use .utc() to get it back to UTC format.
   * @param  {String} time A UTC datetime
   * @return {String}      ISO formatted datetime string
   */
  formatUTCTimezoneIntoISO: function(time) {
    return moment(Date.parse(time)).utc().format(DATE_FORMAT);
  },

  isDateInStrictFormat: function(value) {
    return moment(value, DATE_FORMAT, true).isValid();
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
      return !_.isUndefined(value) && !_.isNull(value) && !_.isEmpty(value);
    }
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