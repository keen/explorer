import _ from 'lodash';
import S from 'string';
import moment from 'moment';

const ISO_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';

function _isWrappedInSingleQuotes(value) {
  return value.substring(0, 1) === "'" && value.substring(value.length - 1) === "'";
}

function _isWrappedInDoubleQuotes(value) {
  return value.substring(0, 1) === '"' && value.substring(value.length - 1) === '"';
}

export function toTitleCase(text) {
    return text.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

export function singularize(text) {
    return text.replace(/s+$/, '');
  };

export function prettyPrintJSON(json) {
    return JSON.stringify(json, undefined, 2);
  };

export function coercionTypeForPropertyType(type) {
    var coercionTypeMap = {
      'string':   'String',
      'num':      'Number',
      'datetime': 'Datetime',
      'list':     'List',
      'null':     'Null',
      'bool':     'Boolean'
    };
    return coercionTypeMap[type];
  };

export function booleanMap(value) {
    if (value === null || value === '' ) {
      return '';
    } else if (value === 'false') {
      return 'false';
    } else if (value === 'true') {
      return 'true';
    } else {
      return value ? 'true' : 'false';
    }
  };

export function sortItems(items, keyFunc) {
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
  };

  /**
   * Checks whether the given string is in a date format, as defined by:
   * 'YYYY-MM-DDTHH:mm:ss.SSS'
   * @return {Boolean} Whether or not the string is in the expected format.
   */
export function isDateInStrictFormat(dateString) {
    return moment(dateString, ISO_DATE_FORMAT, true).isValid();
  };

export function convertDateToUTC(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  };

export function formatISOTimeNoTimezone(time) {
    return moment(time).format('YYYY-MM-DDTHH:mm:ss.SSS');
  };

export function generateRandomId(prefix) {
    return (prefix || '') + (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  };

export function generateTempId() {
    return generateRandomId('TEMP-');
  };

export function isValidQueryValue(value) {
    if (_.isArray(value)) return value.length > 0;
    if (value === false) return true;
    if (value === 0) return true;
    if (_.isPlainObject(value)) return !_.isEmpty(value);
    return !isNullOrUndefined(value);
  };

export function parseList(value) {
    if (value) {
      if (!isList(value)) return '';
      var parsedList = S(value).parseCSV();

      parsedList = _.map(parsedList, function(val) {
        if (_isWrappedInSingleQuotes(val)) {
          var quotelessVal = val.replace("'", "");
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
  };

export function isList(str) {
    var strVal = String(str);
    var isList = true;
    var items = strVal.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    if (items) {
      for(var i=0; i<items.length; i++) {
        isList = (_isWrappedInSingleQuotes(items[i].trim()) || _isWrappedInDoubleQuotes(items[i].trim()));
        if (!isList) break;
      }
      return isList;
    }
    else {
      return false;
    }

  };

export function isNullOrUndefined(value) {
    return (_.isNull(value) || _.isUndefined(value));
  };

export function padLeft(value) {
    return value < 10 ? '0' + value : value;
  };

const FormatUtils = {
  toTitleCase,
  singularize,
  prettyPrintJSON,
  coercionTypeForPropertyType,
  booleanMap,
  sortItems,
  isDateInStrictFormat,
  convertDateToUTC,
  formatISOTimeNoTimezone,
  generateRandomId,
  generateTempId,
  isValidQueryValue,
  parseList,
  isList,
  isNullOrUndefined,
  padLeft
};

export default FormatUtils;
