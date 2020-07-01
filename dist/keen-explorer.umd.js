(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("react"), require("moment"), require("classnames"), require("keymirror"), require("jQuery"), require("qs"), require("string"), require("keen-analysis"), require("react-dom"), require("json-stable-stringify"), require("flux"), require("keen-dataviz"), require("react-highlight"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "react", "moment", "classnames", "keymirror", "jQuery", "qs", "string", "keen-analysis", "react-dom", "json-stable-stringify", "flux", "keen-dataviz", "react-highlight"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("lodash"), require("react"), require("moment"), require("classnames"), require("keymirror"), require("jQuery"), require("qs"), require("string"), require("keen-analysis"), require("react-dom"), require("json-stable-stringify"), require("flux"), require("keen-dataviz"), require("react-highlight")) : factory(root["lodash"], root["react"], root["moment"], root["classnames"], root["keymirror"], root["jQuery"], root["qs"], root["string"], root["keen-analysis"], root["react-dom"], root["json-stable-stringify"], root["flux"], root["keen-dataviz"], root["react-highlight"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__19__, __WEBPACK_EXTERNAL_MODULE__30__, __WEBPACK_EXTERNAL_MODULE__31__, __WEBPACK_EXTERNAL_MODULE__32__, __WEBPACK_EXTERNAL_MODULE__50__, __WEBPACK_EXTERNAL_MODULE__51__, __WEBPACK_EXTERNAL_MODULE__54__, __WEBPACK_EXTERNAL_MODULE__57__, __WEBPACK_EXTERNAL_MODULE__62__, __WEBPACK_EXTERNAL_MODULE__66__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toTitleCase = toTitleCase;
exports.singularize = singularize;
exports.prettyPrintJSON = prettyPrintJSON;
exports.coercionTypeForPropertyType = coercionTypeForPropertyType;
exports.booleanMap = booleanMap;
exports.sortItems = sortItems;
exports.isDateInStrictFormat = isDateInStrictFormat;
exports.convertDateToUTC = convertDateToUTC;
exports.formatISOTimeNoTimezone = formatISOTimeNoTimezone;
exports.generateRandomId = generateRandomId;
exports.generateTempId = generateTempId;
exports.isValidQueryValue = isValidQueryValue;
exports.parseList = parseList;
exports.isList = isList;
exports.isNullOrUndefined = isNullOrUndefined;
exports.padLeft = padLeft;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _string = __webpack_require__(32);

var _string2 = _interopRequireDefault(_string);

var _moment = __webpack_require__(6);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ISO_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';

function _isWrappedInSingleQuotes(value) {
  return value.substring(0, 1) === "'" && value.substring(value.length - 1) === "'";
}

function _isWrappedInDoubleQuotes(value) {
  return value.substring(0, 1) === '"' && value.substring(value.length - 1) === '"';
}

function toTitleCase(text) {
  return text.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

function singularize(text) {
  return text.replace(/s+$/, '');
};

function prettyPrintJSON(json) {
  return JSON.stringify(json, undefined, 2);
};

function coercionTypeForPropertyType(type) {
  var coercionTypeMap = {
    'string': 'String',
    'num': 'Number',
    'datetime': 'Datetime',
    'list': 'List',
    'null': 'Null',
    'bool': 'Boolean'
  };
  return coercionTypeMap[type];
};

function booleanMap(value) {
  if (value === null || value === '') {
    return '';
  } else if (value === 'false') {
    return 'false';
  } else if (value === 'true') {
    return 'true';
  } else {
    return value ? 'true' : 'false';
  }
};

function sortItems(items, keyFunc) {
  // using a key + mapped indices avoids repeated calls to
  // possibly-slow key functions.
  // keyFunc is assumed to return a unicode string.
  keyFunc = keyFunc || function formatString(str) {
    return str.replace(/[-_ .]/, '').toLowerCase();
  };

  var mapped = items.map(function (el, i) {
    return { index: i, value: keyFunc(el) };
  });

  mapped.sort(function (a, b) {
    return a.value.localeCompare(b.value);
  });

  return mapped.map(function (el) {
    return items[el.index];
  });
};

/**
 * Checks whether the given string is in a date format, as defined by:
 * 'YYYY-MM-DDTHH:mm:ss.SSS'
 * @return {Boolean} Whether or not the string is in the expected format.
 */
function isDateInStrictFormat(dateString) {
  return (0, _moment2.default)(dateString, ISO_DATE_FORMAT, true).isValid();
};

function convertDateToUTC(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
};

function formatISOTimeNoTimezone(time) {
  return (0, _moment2.default)(time).format('YYYY-MM-DDTHH:mm:ss.SSS');
};

function generateRandomId(prefix) {
  return (prefix || '') + (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
};

function generateTempId() {
  return generateRandomId('TEMP-');
};

function isValidQueryValue(value) {
  if (_lodash2.default.isArray(value)) return value.length > 0;
  if (value === false) return true;
  if (value === 0) return true;
  if (_lodash2.default.isPlainObject(value)) return !_lodash2.default.isEmpty(value);
  return !isNullOrUndefined(value);
};

function parseList(value) {
  if (value) {
    if (!isList(value)) return '';
    var parsedList = (0, _string2.default)(value).parseCSV();

    parsedList = _lodash2.default.map(parsedList, function (val) {
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

function isList(str) {
  var strVal = String(str);
  var isList = true;
  var items = strVal.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  if (items) {
    for (var i = 0; i < items.length; i++) {
      isList = _isWrappedInSingleQuotes(items[i].trim()) || _isWrappedInDoubleQuotes(items[i].trim());
      if (!isList) break;
    }
    return isList;
  } else {
    return false;
  }
};

function isNullOrUndefined(value) {
  return _lodash2.default.isNull(value) || _lodash2.default.isUndefined(value);
};

function padLeft(value) {
  return value < 10 ? '0' + value : value;
};

var FormatUtils = {
  toTitleCase: toTitleCase,
  singularize: singularize,
  prettyPrintJSON: prettyPrintJSON,
  coercionTypeForPropertyType: coercionTypeForPropertyType,
  booleanMap: booleanMap,
  sortItems: sortItems,
  isDateInStrictFormat: isDateInStrictFormat,
  convertDateToUTC: convertDateToUTC,
  formatISOTimeNoTimezone: formatISOTimeNoTimezone,
  generateRandomId: generateRandomId,
  generateTempId: generateTempId,
  isValidQueryValue: isValidQueryValue,
  parseList: parseList,
  isList: isList,
  isNullOrUndefined: isNullOrUndefined,
  padLeft: padLeft
};

exports.default = FormatUtils;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _qs = __webpack_require__(31);

var _qs2 = _interopRequireDefault(_qs);

var _jsonStableStringify = __webpack_require__(54);

var _jsonStableStringify2 = _interopRequireDefault(_jsonStableStringify);

var _moment = __webpack_require__(6);

var _moment2 = _interopRequireDefault(_moment);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

var _FunnelUtils = __webpack_require__(55);

var _FunnelUtils2 = _interopRequireDefault(_FunnelUtils);

var _ProjectUtils = __webpack_require__(4);

var _ProjectUtils2 = _interopRequireDefault(_ProjectUtils);

var _FilterUtils = __webpack_require__(7);

var _FilterUtils2 = _interopRequireDefault(_FilterUtils);

var _TimeframeUtils = __webpack_require__(14);

var _TimeframeUtils2 = _interopRequireDefault(_TimeframeUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QUERY_PARAMS = ['event_collection', 'analysis_type', 'target_property', 'percentile', 'group_by', 'timeframe', 'interval', 'timezone', 'filters', 'steps', 'email', 'latest', 'property_names'];

var EXRACTION_EVENT_LIMIT = 100;

var ANALYSIS_TYPES_WITHOUT_TARGET = ['extraction', 'count', 'funnel'];

function toCamelcaseName(name) {
  return name.replace(/_(.)/, function (match, p1) {
    return p1.toUpperCase();
  });
}

function toUnderscoreName(name) {
  return name.replace(/([A-Z])/, function (match, p1) {
    return '_' + p1.toLowerCase();
  });
}

var SKIP = {};
function mapSkip(collection, fn) {
  return _lodash2.default.without(_lodash2.default.map(collection, fn), SKIP);
}

function echoIf(valueMaybe, append) {
  if (valueMaybe) {
    return append;
  }
  return '';
}

var ExplorerUtils = {

  EXRACTION_EVENT_LIMIT: EXRACTION_EVENT_LIMIT,

  isPersisted: function isPersisted(explorer) {
    return explorer.id && !explorer.id.toString().match('TEMP');
  },

  saveType: function saveType(explorer) {
    return ExplorerUtils.isPersisted(explorer) ? 'update' : 'save';
  },

  shouldHaveTarget: function shouldHaveTarget(explorer) {
    return !_FormatUtils2.default.isNullOrUndefined(explorer.query.analysis_type) && ANALYSIS_TYPES_WITHOUT_TARGET.indexOf(explorer.query.analysis_type) === -1;
  },

  isEmailExtraction: function isEmailExtraction(explorer) {
    return explorer.query.analysis_type === 'extraction' && !_lodash2.default.isNull(explorer.query.email);
  },

  isImmediateExtraction: function isImmediateExtraction(explorer) {
    return explorer.query.analysis_type === 'extraction' && _lodash2.default.isNull(explorer.query.email);
  },

  mergeResponseWithExplorer: function mergeResponseWithExplorer(explorer, response) {
    var newModel = _lodash2.default.defaultsDeep(ExplorerUtils.formatQueryParams(response), explorer);
    delete newModel.originalModel; // Remove the original model.
    newModel.id = response.query_name; // Set the ID to the query_name (it's now persisted.)
    newModel.originalModel = _lodash2.default.cloneDeep(newModel);
    return newModel;
  },

  queryJSON: function queryJSON(explorer) {
    if (!explorer || !explorer.query) return;
    var params = _lodash2.default.cloneDeep(explorer.query);

    if (params.analysis_type === 'extraction') {
      if (_FormatUtils2.default.isNullOrUndefined(params.email)) {
        params.latest = EXRACTION_EVENT_LIMIT;
      }
    } else {
      delete params.latest;
      delete params.email;
      delete params.property_names;
    }

    if (params.analysis_type !== 'funnel') {
      _lodash2.default.assign(params, _TimeframeUtils2.default.getTimeParameters(params.time, params.timezone));
    }

    // Add filters
    if (params.filters) {
      params.filters = _lodash2.default.map(params.filters, function (filter) {
        return _FilterUtils2.default.queryJSON(filter);
      });
    }

    if (params.steps) {
      params.steps = _lodash2.default.map(params.steps, _FunnelUtils2.default.stepJSON);
    }

    _lodash2.default.each(params, function (value, key) {
      // If it's an array, clean out any empty elements
      if (_lodash2.default.isArray(value)) {
        _lodash2.default.remove(value, function (element) {
          return !_lodash2.default.isNumber(element) && _lodash2.default.isEmpty(element);
        });
      }

      // Remove any empty properties or ones that shouldn't be
      // part of the query request.
      if (!_FormatUtils2.default.isValidQueryValue(value) || !_lodash2.default.includes(QUERY_PARAMS, key)) {
        delete params[key];
      }
    });

    return params;
  },

  toJSON: function toJSON(explorer) {
    var json = _lodash2.default.pick(explorer, ['id', 'query_name', 'refresh_rate', 'metadata']);
    json.query = ExplorerUtils.queryJSON(explorer);
    if (json.query.analysis_type === 'extraction') json.refresh_rate = 0;
    return json;
  },

  cleanJSONforSave: function cleanJSONforSave(explorer) {
    if (explorer.query.analysis_type === 'extraction') {
      explorer.query.latest = EXRACTION_EVENT_LIMIT;
      delete explorer.query.email;
      delete explorer.query.property_names;
    }
    return explorer;
  },

  paramsForURL: function paramsForURL(explorer) {
    var attrs = ExplorerUtils.toJSON(explorer);
    return _lodash2.default.omit(attrs, ['id', 'query_name', 'refresh_rate', 'metadata']);
  },

  /**
   * Execures a Keen.js query with the provided client and query params, calling the
   * callbacks after execution.
   * @param {Object} config The runQuery configuration
   * Expected structure:
   * {
   *   client:   {The Keen.js client},
   *   query:    {The object with the query parameters},
   *   success:  {Success callback function},
   *   error:    {Error callback function},
   *   complete: {Complete callback function}
   * }
   * @return {undefined}
   */
  runQuery: function runQuery(config) {
    config.client.query(config.query.analysis_type, _lodash2.default.omit(config.query, 'analysis_type')).then(function (res, err) {
      if (err) {
        config.error(err);
      } else {
        config.success(res);
      }
      if (config.complete) config.complete(err, res);
    }).catch(config.error);
  },

  /**
   * Takes in an object of query params directly taken from the URL and formats/deconstructs them appropriately to work well
   * with our data model.
   * @param  {Object} the raw params from the URL
   * @return {Object} formatted attributes to be used for creating a new Explorer model.
   */
  formatQueryParams: function formatQueryParams(params) {
    if (!params || !params.query) return;
    if (params.query && params.query.timeframe) {
      var unpackedTime = _TimeframeUtils2.default.unpackTimeframeParam(params.query.timeframe, params.query.timezone);
      params.query.time = unpackedTime.time;
      params.query.timezone = unpackedTime.timezone;
    }
    if (params.query.group_by && !_lodash2.default.isArray(params.query.group_by)) {
      params.query.group_by = [params.query.group_by];
    }
    if (params.query.filters) {
      params.query.filters = _lodash2.default.compact(_lodash2.default.map(params.query.filters, _FilterUtils2.default.formatFilterParams));
    }
    if (params.query.steps) {
      params.query.steps = _lodash2.default.compact(_lodash2.default.map(params.query.steps, _FunnelUtils2.default.formatQueryParams));
      params.query.steps[params.query.steps.length - 1].active = true;
    }
    if (!params.id && params.query_name) params.id = params.query_name;

    if (!params.metadata) {
      params.metadata = {};
    }

    if (!params.metadata.display_name) params.metadata.display_name = params.query_name;
    if (!params.metadata.visualization || !params.metadata.visualization.chart_type) {
      params.metadata.visualization = {};
      if (params.query.interval) {
        params.metadata.visualization.chart_type = "area";
      } else {
        params.metadata.visualization.chart_type = "metric";
      }
    }
    return params;
  },

  encodeAttribute: function encodeAttribute(attr) {
    return encodeURIComponent(JSON.stringify(attr));
  },

  getApiQueryUrl: function getApiQueryUrl(client, explorer) {
    var attrs = ExplorerUtils.queryJSON(explorer);
    var url = client.url('queries', attrs.analysis_type);

    var analysisType = attrs.analysis_type;
    delete attrs.analysis_type;

    var timeframe = _lodash2.default.cloneDeep(attrs.timeframe);
    delete attrs.timeframe;

    var filters = _lodash2.default.map(attrs.filters, function (filter) {
      return _lodash2.default.omit(_lodash2.default.cloneDeep(filter), 'coercion_type');
    });
    delete attrs.filters;

    var steps;
    if (attrs.steps && attrs.steps.length) {
      steps = ExplorerUtils.encodeAttribute(attrs.steps);
      delete attrs.steps;
    }

    if (attrs.group_by && _lodash2.default.isArray(attrs.group_by) && attrs.group_by.length) {
      attrs.group_by = attrs.group_by.length > 1 ? JSON.stringify(attrs.group_by) : attrs.group_by[0];
    }

    var queryAttrs = _qs2.default.stringify(attrs);

    if (timeframe && _TimeframeUtils2.default.timeframeType(explorer.query.time) === 'relative') {
      queryAttrs += '&timeframe=' + timeframe;
    } else if (timeframe && _TimeframeUtils2.default.timeframeType(explorer.query.time) === 'absolute') {
      // This is an absolute timeframe, so we need to encode the object in a specific way before sending it, as per keen docs => https://keen.io/docs/data-analysis/timeframe/#absolute-timeframes
      timeframe = ExplorerUtils.encodeAttribute(timeframe);
      queryAttrs += '&timeframe=' + timeframe;
    }

    // We need to encode the filters the same way as we encode the absolute timeframe.
    if (filters) {
      filters = ExplorerUtils.encodeAttribute(filters);
      queryAttrs += '&filters=' + filters;
    }

    if (steps) {
      queryAttrs += '&steps=' + steps;
    }

    var authKey = client.masterKey() || client.readKey();

    url += '?api_key=' + authKey + '&' + queryAttrs;
    return url;
  },

  resultCanBeVisualized: function resultCanBeVisualized(explorer) {
    return explorer.response && !_FormatUtils2.default.isNullOrUndefined(explorer.response.result) && (_lodash2.default.isNumber(explorer.response.result) || _lodash2.default.isArray(explorer.response.result) && explorer.response.result.length);
  },

  isJSONViz: function isJSONViz(explorer) {
    return explorer.metadata.visualization.chart_type && explorer.metadata.visualization.chart_type.toLowerCase() === 'json';
  },

  isTableViz: function isTableViz(explorer) {
    return explorer.metadata.visualization.chart_type && explorer.metadata.visualization.chart_type.toLowerCase() === 'table';
  },

  getSdkExample: function getSdkExample(explorer, client) {
    var defaultKeenAnalysisOpts = {
      host: 'api.keen.io',
      protocol: 'https',
      requestType: 'jsonp'
    },
        params = ExplorerUtils.queryJSON(explorer),
        s = _jsonStableStringify2.default,
        dynamicCriteria,
        paramNames,
        dynamicConstructorNames = ['host', 'protocol', 'requestType'],
        funnelRootParams = ['event_collection', 'steps'],
        dynamicConstructorValues;

    var chartTitle = 'Untitled Chart';
    if (explorer.metadata && explorer.metadata.display_name) {
      chartTitle = explorer.metadata.display_name;
    }

    var chartType = '';
    if (explorer.metadata && explorer.metadata.visualization && explorer.metadata.visualization.chart_type && explorer.metadata.visualization.chart_type !== 'JSON') {
      chartType = explorer.metadata.visualization.chart_type;
    }

    switch (params.analysis_type) {
      case 'funnel':
        paramNames = ['steps'];
        break;

      default:
        paramNames = ['event_collection', 'filters', 'group_by', 'interval', 'target_property', 'percentile', 'timeframe', 'timezone'];
        break;
    }

    if (params.steps) {
      params.steps = _lodash2.default.map(params.steps, function (step) {
        return _lodash2.default.omit(step, 'active');
      });
    }

    dynamicConstructorValues = mapSkip(dynamicConstructorNames, function (name) {
      if (client.config[name] == defaultKeenAnalysisOpts[name]) {
        return SKIP;
      }
      return '  ' + name + ': ' + s(client.config[name]);
    }).join(',\n');
    // remove coercion from example; it's already been handled elsewhere.
    _lodash2.default.each(params['filters'], function (filter) {
      delete filter['coercion_type'];
    });

    dynamicCriteria = mapSkip(paramNames, function (param) {
      if (!params[param]) {
        return SKIP;
      }
      return '        ' + param + ': ' + s(params[param], { space: 0 });
    }).join(',\n');

    var value = ['<!DOCTYPE html>', '<html>', '<head>', '  <meta charset="utf-8">', '  <link href="https://d26b395fwzu5fz.cloudfront.net/keen-dataviz-2.0.4.min.css" rel="stylesheet" />', '</head>', '<body>', '  <!-- Target DOM Node -->', '  <div id="keen-example-chart"></div>', '  ', '  <script src="https://d26b395fwzu5fz.cloudfront.net/keen-analysis-2.0.0.min.js" type="text/javascript"></script>', '  <script src="https://d26b395fwzu5fz.cloudfront.net/keen-dataviz-2.0.4.min.js" type="text/javascript"></script>', '  <script type="text/javascript">', '    var client = new Keen({', '      projectId: ' + s(client.config.projectId) + ',', '      readKey: ' + s(client.config.readKey) + echoIf(dynamicConstructorValues, ','), dynamicConstructorValues, '    });', '    ', '    var chart = new Keen.Dataviz()', '      .el("#keen-example-chart")', '      .height(240)', '      .title("' + chartTitle + '")', '' + chartType ? '      .type("' + chartType + '")' : '', '      .prepare();', '    ', '    client', '      .query(' + s(params.analysis_type) + ', {', dynamicCriteria, '      })', '      .then(function(res) {', '        chart.data(res).render();', '      })', '      .catch(function(err) {', '        chart.message(err.message);', '      });', '    ', '  </script>', '</body>', '</html>'];
    return _lodash2.default.filter(value, function (val) {
      return val !== "";
    }).join('\n');
  },

  slugify: function slugify(name) {
    return name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/ /g, '-');
  }

};

exports.default = ExplorerUtils;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _DateUtils = __webpack_require__(56);

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ***********************
// ** Project Constants
// ***********************

var CONSTANTS = {

  DEFAULT_TIMEZONE: 'UTC',

  ANALYSIS_TYPES: ['sum', 'count', 'count_unique', 'minimum', 'maximum', 'average', 'select_unique', 'extraction', 'percentile', 'median', 'funnel', 'standard_deviation'],

  ABSOLUTE_INTERVAL_TYPES: [{ name: 'minutely', value: 'minutely' }, { name: 'hourly', value: 'hourly' }, { name: 'daily', value: 'daily' }, { name: 'weekly', value: 'weekly' }, { name: 'monthly', value: 'monthly' }, { name: 'yearly', value: 'yearly' }],

  RELATIVE_INTERVAL_TYPES: [{ name: 'minutes', value: 'minutes' }, { name: 'hours', value: 'hours' }, { name: 'days', value: 'days' }, { name: 'weeks', value: 'weeks' }, { name: 'months', value: 'months' }, { name: 'years', value: 'years' }],

  TIMEZONES: [{
    name: 'UTC',
    offset: 0,
    dst_offset: 0
  }, {
    name: 'Europe/London',
    offset: 0,
    dst_offset: 3600
  }, {
    name: 'Africa/Casablanca',
    offset: 0,
    dst_offset: 0
  }, {
    name: 'Africa/Nairobi',
    offset: 10800,
    dst_offset: 0
  }, {
    name: 'Asia/Dubai',
    offset: 14400,
    dst_offset: 0
  }, {
    name: 'America/Sao_Paulo',
    offset: -10800,
    dst_offset: -7200
  }, {
    name: 'US/Eastern',
    offset: -18000,
    dst_offset: -14400
  }, {
    name: 'US/Central',
    offset: -21600,
    dst_offset: -18000
  }, {
    name: 'US/Mountain',
    offset: -25200,
    dst_offset: -21600
  }, {
    name: 'US/Pacific',
    offset: -28800,
    dst_offset: -25200
  }, {
    name: 'US/Alaska',
    offset: -32400,
    dst_offset: -28800
  }, {
    name: 'US/Hawaii',
    offset: -36000,
    dst_offset: -32400
  }, {
    name: 'Europe/Paris',
    offset: 3600,
    dst_offset: 7200
  }, {
    name: 'Europe/Amsterdam',
    offset: 3600,
    dst_offset: 7200
  }, {
    name: 'Europe/Stockholm',
    offset: 3600,
    dst_offset: 7200
  }, {
    name: 'Europe/Prague',
    offset: 3600,
    dst_offset: 7200
  }, {
    name: 'Asia/Istanbul',
    offset: 7200,
    dst_offset: 10800
  }, {
    name: 'Europe/Istanbul',
    offset: 7200,
    dst_offset: 10800
  }, {
    name: 'Europe/Copenhagen',
    offset: 3600,
    dst_offset: 7200
  }, {
    name: 'Asia/Jakarta',
    offset: 25200,
    dst_offset: 25200
  }, {
    name: 'Asia/Singapore',
    offset: 28800,
    dst_offset: 28800
  }, {
    name: 'Australia/Perth',
    offset: 28800,
    dst_offset: 28800
  }, {
    name: 'Asia/Tokyo',
    offset: 32400,
    dst_offset: 32400
  }, {
    name: 'Australia/Sydney',
    offset: 36000,
    dst_offset: 39600
  }, {
    name: 'Pacific/Auckland',
    offset: 43200,
    dst_offset: 46800
  }],

  FILTER_OPERATORS: [{ name: '= Equal to',
    value: 'eq',
    canBeCoeredTo: ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime']
  }, { name: '\u2260 Not equal to',
    value: 'ne',
    canBeCoeredTo: ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime']
  }, { name: '> Greater than',
    value: 'gt',
    canBeCoeredTo: ['Number', 'Null', 'Datetime', 'String']
  }, { name: '\u2265 Greater than or equal to',
    value: 'gte',
    canBeCoeredTo: ['Number', 'Null', 'Datetime', 'String']
  }, { name: '< Less than',
    value: 'lt',
    canBeCoeredTo: ['Number', 'Null', 'Datetime', 'String']
  }, { name: '\u2264 Less than or equal to',
    value: 'lte',
    canBeCoeredTo: ['Number', 'Null', 'Datetime', 'String']
  }, { name: '\u2203 Property exists',
    value: 'exists',
    canBeCoeredTo: ['Boolean']
  }, { name: '\u229A String contains',
    value: 'contains',
    canBeCoeredTo: ['String', 'Null']
  }, { name: '\u2349 String does not contain',
    value: 'not_contains',
    canBeCoeredTo: ['String', 'Null']
  }, { name: '\u29C7 Matches any value in a list',
    value: 'in',
    canBeCoeredTo: ['List']
  }, { name: '\u2690 Within a given radius (geo)',
    value: 'within',
    canBeCoeredTo: ['Geo']
  }]
};

var projectUtils = {

  getConstant: function getConstant(name) {
    return CONSTANTS[name];
  },

  eventsUrl: function eventsUrl(client) {
    return client.url('events', {
      api_key: client.config.masterKey
    });
  },

  getEventCollectionPropertyNames: function getEventCollectionPropertyNames(project, collection) {
    return project.schema[collection] ? project.schema[collection].sortedProperties : [];
  },

  getPropertyType: function getPropertyType(project, collection, propertyName) {
    var collection = project.schema[collection];
    return collection ? collection.properties[propertyName] : null;
  },

  /*
    Returns the local timezone offset in seconds offset from UTC.
    This is how the Keen API wants the offset to look. This is also
    opposite in negative/positive numbers from how Javascript
    handles it.
   */
  getLocalTimezoneOffset: function getLocalTimezoneOffset(date) {
    return new Date().getTimezoneOffset() * -1 * 60;
  },

  getLocalTimezone: function getLocalTimezone(date) {
    var isDST = _DateUtils2.default.isDST();
    var localOffset = projectUtils.getLocalTimezoneOffset();
    var zones = CONSTANTS.TIMEZONES.filter(function (zone) {
      if (isDST) {
        return zone.dst_offset === localOffset;
      } else {
        return zone.offset === localOffset;
      }
    });
    if (!zones.length) return localOffset;
    return zones[0].name;
  }

};

exports.default = projectUtils;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _AppDispatcher = __webpack_require__(8);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _ExplorerConstants = __webpack_require__(20);

var _ExplorerConstants2 = _interopRequireDefault(_ExplorerConstants);

var _ExplorerStore = __webpack_require__(12);

var _ExplorerStore2 = _interopRequireDefault(_ExplorerStore);

var _ExplorerValidations = __webpack_require__(28);

var _ExplorerValidations2 = _interopRequireDefault(_ExplorerValidations);

var _NoticeActions = __webpack_require__(21);

var _NoticeActions2 = _interopRequireDefault(_NoticeActions);

var _AppStateActions = __webpack_require__(22);

var _AppStateActions2 = _interopRequireDefault(_AppStateActions);

var _ProjectActions = __webpack_require__(25);

var _ProjectActions2 = _interopRequireDefault(_ProjectActions);

var _ProjectStore = __webpack_require__(11);

var _ProjectStore2 = _interopRequireDefault(_ProjectStore);

var _RunValidations = __webpack_require__(10);

var _RunValidations2 = _interopRequireDefault(_RunValidations);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _ChartTypeUtils = __webpack_require__(27);

var _ChartTypeUtils2 = _interopRequireDefault(_ChartTypeUtils);

var _CashedQueryUtils = __webpack_require__(40);

var _CashedQueryUtils2 = _interopRequireDefault(_CashedQueryUtils);

var _query_actions = __webpack_require__(41);

var _query_actions2 = _interopRequireDefault(_query_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExplorerActions = {

  create: function create(attrs) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_CREATE,
      attrs: attrs
    });
  },

  createBatch: function createBatch(models) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_CREATE_BATCH,
      models: models
    });
  },

  clone: function clone(sourceId) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_CLONE,
      id: sourceId
    });
    _NoticeActions2.default.create({
      text: "Query cloned! Add a name for this cloned query and save it.",
      type: 'success',
      icon: 'check'
    });
  },

  update: function update(id, updates) {
    var updated_query,
        project = _ProjectStore2.default.getProject();
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_UPDATE,
      id: id,
      updates: updates
    });
    // Fetch schema for selected event collection
    updated_query = updates.query ? updates.query : updates.response && updates.response.query ? updates.response.query : {};
    if (updated_query.event_collection) {
      _ProjectActions2.default.fetchCollectionSchema(project.client, updated_query.event_collection);
    }
    if (updated_query.steps && updated_query.steps.length) {
      _lodash2.default.each(updated_query.steps, function (step, i) {
        _ProjectActions2.default.fetchCollectionSchema(project.client, step.event_collection);
      });
    }
  },

  remove: function remove(id) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_REMOVE,
      id: id
    });
  },

  setActive: function setActive(id) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_SET_ACTIVE,
      id: id
    });
  },

  revertActiveChanges: function revertActiveChanges() {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_REVERT_ACTIVE_CHANGES
    });
  },

  clear: function clear(id) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_CLEAR,
      id: id
    });
  },

  validate: function validate(id) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_VALIDATE,
      id: id
    });
  },

  addFilter: function addFilter(id, attrs) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_ADD_FILTER,
      id: id,
      attrs: attrs
    });
  },

  removeFilter: function removeFilter(id, index) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_REMOVE_FILTER,
      id: id,
      index: index
    });
  },

  updateFilter: function updateFilter(id, index, attrs) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_UPDATE_FILTER,
      id: id,
      index: index,
      attrs: attrs
    });
  },

  addStep: function addStep(id, attrs) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_ADD_STEP,
      id: id,
      attrs: attrs
    });
  },

  removeStep: function removeStep(id, index) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_REMOVE_STEP,
      id: id,
      index: index
    });
  },

  setStepActive: function setStepActive(id, index) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_SET_STEP_ACTIVE,
      id: id,
      index: index
    });
  },

  updateStep: function updateStep(id, index, attrs) {
    var project = _ProjectStore2.default.getProject();
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_UPDATE_STEP,
      id: id,
      index: index,
      attrs: attrs
    });

    // Fetch schema for selected event collection
    if (attrs.event_collection) {
      _ProjectActions2.default.fetchCollectionSchema(project.client, attrs.event_collection);
    }
  },

  moveStep: function moveStep(id, index, direction) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_MOVE_STEP,
      id: id,
      index: index,
      direction: direction
    });
  },

  addStepFilter: function addStepFilter(id, stepIndex, attrs) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_ADD_STEP_FILTER,
      id: id,
      stepIndex: stepIndex,
      attrs: attrs
    });
  },

  removeStepFilter: function removeStepFilter(id, stepIndex, filterIndex) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_REMOVE_STEP_FILTER,
      id: id,
      stepIndex: stepIndex,
      filterIndex: filterIndex
    });
  },

  updateStepFilter: function updateStepFilter(id, stepIndex, filterIndex, attrs) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_UPDATE_STEP_FILTER,
      id: id,
      stepIndex: stepIndex,
      filterIndex: filterIndex,
      attrs: attrs
    });
  },

  exec: function exec(client, id) {
    var explorer = _ExplorerStore2.default.get(id);
    if (explorer.loading) {
      throw new Error("Warning: calling exec when model loading is true. Explorer id: " + explorer.id);
    }
    ExplorerActions.validate(explorer.id);
    explorer = _ExplorerStore2.default.get(id);
    if (!explorer.isValid) {
      _AppDispatcher2.default.dispatch({
        actionType: _ExplorerConstants2.default.EXPLORER_FOUND_INVALID,
        id: explorer.id
      });
      return;
    }
    _NoticeActions2.default.clearAll();

    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_UPDATE,
      id: explorer.id,
      updates: { loading: true }
    });

    _ExplorerUtils2.default.runQuery({
      client: client,
      query: _ExplorerUtils2.default.queryJSON(explorer),
      error: ExplorerActions.execError.bind(this, explorer),
      success: ExplorerActions.execSuccess.bind(this, explorer)
    });
  },

  execError: function execError(explorer, err) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_QUERY_ERROR,
      query: explorer.query,
      error: err.message
    });
    ExplorerActions.update(explorer.id, { loading: false });
    _NoticeActions2.default.create({ text: err.message, type: 'error' });
  },

  execSuccess: function execSuccess(explorer, response) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_QUERY_SUCCESS,
      query: explorer.query,
      isSaved: _ExplorerUtils2.default.isPersisted(explorer)
    });
    _NoticeActions2.default.clearAll();

    var updates = {};
    updates.response = response;
    // If there is no query object on the response, add one. This is required for Dataviz to properly auto-parse
    // the result + the query to correctly choose a chart type.
    if (!response.query) response.query = _ExplorerUtils2.default.queryJSON(explorer);
    updates.loading = false;

    if (!_ChartTypeUtils2.default.responseSupportsChartType(response.query, explorer.metadata.visualization.chart_type)) {
      updates.metadata = _lodash2.default.cloneDeep(explorer.metadata);
      updates.metadata.visualization.chart_type = _ChartTypeUtils2.default.getChartTypeOptions(response.query)[0];
    }

    updates.dataTimestamp = Date.now();
    ExplorerActions.update(explorer.id, updates);
  },

  runEmailExtraction: function runEmailExtraction(client, id) {
    ExplorerActions.validate(id);
    var explorer = _ExplorerStore2.default.get(id);

    if (!explorer.isValid) {
      _AppDispatcher2.default.dispatch({
        actionType: _ExplorerConstants2.default.EXPLORER_FOUND_INVALID,
        id: explorer.id
      });
      return;
    }
    _NoticeActions2.default.clearAll();

    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_UPDATE,
      id: explorer.id,
      updates: { loading: true }
    });

    _ExplorerUtils2.default.runQuery({
      client: client,
      query: _ExplorerUtils2.default.queryJSON(explorer),
      success: ExplorerActions.runEmailExtractionSuccess.bind(this, explorer),
      error: ExplorerActions.runEmailExtractionError
    });
  },

  runEmailExtractionSuccess: function runEmailExtractionSuccess(explorer, res) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_QUERY_SUCCESS,
      query: explorer.query,
      isSaved: _ExplorerUtils2.default.isPersisted(explorer)
    });
    _NoticeActions2.default.clearAll();
    _NoticeActions2.default.create({
      text: "Email extraction successfully requested. Check your email (" + explorer.query.email + ").",
      type: 'success',
      icon: 'check'
    });
    ExplorerActions.update(explorer.id, {
      result: res,
      loading: false
    });
  },

  runEmailExtractionError: function runEmailExtractionError(err) {
    _NoticeActions2.default.create({ text: err.message, type: 'error', icon: 'remove-sign' });
  },

  fetchAllPersisted: function fetchAllPersisted(persistence, callback) {
    _AppStateActions2.default.update({ fetchingPersistedExplorers: true });
    persistence.get(null, function (err, resp) {
      if (err) {
        callback(err);
        return;
      }
      var models = [];
      resp.forEach(function (model) {
        var formattedModel = _ExplorerUtils2.default.formatQueryParams(model);
        _RunValidations2.default.run(_ExplorerValidations2.default, formattedModel);
        if (!formattedModel.isValid) {
          console.warn('A persisted explorer model is invalid: ', formattedModel);
          console.log('Errors: ', formattedModel.errors);
        }
        models.push(formattedModel);
      });
      ExplorerActions.createBatch(models);
      _AppStateActions2.default.update({ fetchingPersistedExplorers: false });
      callback(null);
    });
  },

  fetchPersisted: function fetchPersisted(persistence, id, callback) {
    persistence.get(id, function (err, resp) {
      if (err) {
        callback(err);
        return;
      }
      var model = _ExplorerUtils2.default.formatQueryParams(resp);
      _RunValidations2.default.run(_ExplorerValidations2.default, model);
      if (!model.isValid) {
        console.warn('A persisted explorer model is invalid: ', model);
      }
      ExplorerActions.create(model);
      callback(null);
    });
  },

  save: function save(persistence, sourceId) {
    var saveType = _ExplorerUtils2.default.saveType(_ExplorerStore2.default.get(sourceId));
    var persistenceFunction = saveType === 'save' ? 'create' : 'update';
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_SAVING,
      id: sourceId,
      saveType: saveType
    });

    var explorer = _ExplorerStore2.default.get(sourceId);
    if (!explorer.isValid) {
      _AppDispatcher2.default.dispatch({
        actionType: _ExplorerConstants2.default.EXPLORER_FOUND_INVALID,
        id: explorer.id
      });
      ExplorerActions.update(sourceId, { saving: false });
      return;
    }
    _NoticeActions2.default.clearAll();

    var explorerJSON = _ExplorerUtils2.default.cleanJSONforSave(_ExplorerUtils2.default.toJSON(_ExplorerStore2.default.get(sourceId)));
    persistence[persistenceFunction](explorerJSON, function (err, res) {
      if (err) {
        if (err.error_code === 'OverCachedQueryLimitError') {
          _AppStateActions2.default.update({ isLimited: true });
        }
        _AppDispatcher2.default.dispatch({
          actionType: _ExplorerConstants2.default.EXPLORER_SAVE_FAIL,
          saveType: saveType,
          id: sourceId,
          errorResp: err,
          query: _ExplorerStore2.default.get(sourceId).query
        });
        return;
      }
      ExplorerActions.saveSuccess(sourceId, res);
    });
  },

  saveSuccess: function saveSuccess(sourceId, res) {
    var saveType = _ExplorerUtils2.default.saveType(_ExplorerStore2.default.get(sourceId));
    var updatedModel = _ExplorerUtils2.default.mergeResponseWithExplorer(_ExplorerStore2.default.get(sourceId), res);
    _CashedQueryUtils2.default.checkLimits();
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_UPDATE,
      id: sourceId,
      updates: updatedModel
    });
    // We need to use the new model id below, not the old sourceId passed in.
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_SAVE_SUCCESS,
      id: updatedModel.id,
      saveType: saveType,
      query: updatedModel.query
    });
  },

  destroy: function destroy(persistence, sourceId) {
    _AppDispatcher2.default.dispatch({
      actionType: _ExplorerConstants2.default.EXPLORER_DESTROYING
    });
    var attrs = _lodash2.default.clone(_ExplorerUtils2.default.toJSON(_ExplorerStore2.default.get(sourceId)));
    persistence.destroy(attrs, function (err, res) {
      if (err) {
        _AppDispatcher2.default.dispatch({
          actionType: _ExplorerConstants2.default.EXPLORER_DESTROY_FAIL,
          errorMsg: err,
          query: _ExplorerStore2.default.get(sourceId).query
        });
      } else {
        _CashedQueryUtils2.default.checkLimits();
        _AppDispatcher2.default.dispatch({
          actionType: _ExplorerConstants2.default.EXPLORER_REMOVE,
          id: sourceId
        });
        _AppDispatcher2.default.dispatch({
          actionType: _ExplorerConstants2.default.EXPLORER_DESTROY_SUCCESS,
          query: attrs.query
        });
      }
    });
  }

};

exports.default = ExplorerActions;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = __webpack_require__(6);

var _moment2 = _interopRequireDefault(_moment);

var _string = __webpack_require__(32);

var _string2 = _interopRequireDefault(_string);

var _TimeframeUtils = __webpack_require__(14);

var _TimeframeUtils2 = _interopRequireDefault(_TimeframeUtils);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

var _FilterValidations = __webpack_require__(23);

var _FilterValidations2 = _interopRequireDefault(_FilterValidations);

var _RunValidations = __webpack_require__(10);

var _RunValidations2 = _interopRequireDefault(_RunValidations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exists(value) {
  return !_lodash2.default.isNull(value) && !_lodash2.default.isUndefined(value);
}

function toType(obj) {
  return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function isNumeric(num) {
  return !isNaN(num);
}

var filterUtils = {

  coercionFunctions: {

    'Datetime': function Datetime(filter) {
      if (typeof filter.property_value === 'string') {
        var coercedDate = new Date(filter.property_value);
        if (coercedDate !== null && coercedDate.toString() !== 'Invalid Date') return coercedDate.toString();
      }
      return filterUtils.defaultDate();
    },

    'String': function String(filter) {
      if (!exists(filter.property_value)) return null;
      return filter.property_value.toString();
    },

    'Number': function Number(filter) {
      if (!exists(filter.property_value)) return null;
      var newVal = parseFloat(filter.property_value);
      if (typeof newVal === 'undefined' || newVal === null || isNaN(newVal)) {
        newVal = '';
      }
      return newVal;
    },

    'Boolean': function Boolean(filter) {
      var isFalse = filter.property_value === 'false' || filter.property_value === false;
      return isFalse ? false : true;
    },

    'Null': function Null(filter) {
      return null;
    },

    'Geo': function Geo(filter) {
      return filter.property_value;
    },

    'List': function List(filter) {
      return filter.property_value;
    }

  },

  defaultDate: function defaultDate() {
    var yesterday = (0, _moment2.default)().subtract(1, 'days').startOf('day').format('x');
    return new Date(Number(yesterday));
  },

  getCoercedValue: function getCoercedValue(filter) {
    if (!filterUtils.coercionFunctions[filter.coercion_type]) return null;
    return filterUtils.coercionFunctions[filter.coercion_type](filter);
  },

  /**
   * Gets the type for the given filter's property_value. This value should be raw, as in it should not have
   * been put through getCoercedValue yet. So for example, if it's a list type, it should be a string with the
   * expected list format: "\a word\"", '1', '56', \""another word\""
   * @param  {Object} filter The filter to get the property value coercion type for.
   * @return {String}        The determined type for the given property value.
   */
  getCoercionType: function getCoercionType(filter) {
    switch (toType(filter.property_value)) {
      case 'object':
        return 'Geo';
        break;
      case 'string':
        if (filter.operator === 'exists') return 'Boolean';
        if (['false', 'true'].indexOf(filter.property_value) > -1) return 'Boolean';
        if (isNumeric(filter.property_value) && ['contains', 'not_contains'].indexOf(filter.operator) === -1) return 'Number';
        if (_FormatUtils2.default.isDateInStrictFormat(filter.property_value.substring(0, filter.property_value.length - 6))) return 'Datetime';
        if (_FormatUtils2.default.isList(filter.property_value)) return 'List';
        return 'String';
        break;
      case 'array':
        return 'List';
        break;
      case 'boolean':
        return 'Boolean';
        break;
      case 'number':
        return 'Number';
        break;
      case 'null':
        return 'Null';
        break;
    }
  },

  isComplete: function isComplete(filter) {
    var attrs = ['property_name', 'property_value', 'operator', 'coercion_type'];
    var complete = true;
    for (var i = 0; i < attrs.length; i++) {
      var val = filter[attrs[i]];
      complete = !_lodash2.default.isUndefined(val) && !_lodash2.default.isNull(val);
      if (_lodash2.default.isObject(val)) complete = !_lodash2.default.isEmpty(val);
      if (!complete) break;
    }
    return complete;
  },

  queryJSON: function queryJSON(filter) {
    _RunValidations2.default.run(_FilterValidations2.default, filter);
    if (!filter.isValid) return {};

    var attrs = _lodash2.default.cloneDeep(filter);
    attrs.property_value = filterUtils.getCoercedValue(filter);

    if (attrs.coercion_type === 'Datetime') {
      attrs.property_value = _FormatUtils2.default.formatISOTimeNoTimezone(attrs.property_value);
    }
    if (attrs.coercion_type === 'List') {
      attrs.property_value = _FormatUtils2.default.parseList(attrs.property_value);
    }

    return _lodash2.default.pick(attrs, ['property_name', 'operator', 'property_value']);
  },

  initList: function initList(filter) {
    var newVal = "";
    _lodash2.default.each(filter.property_value, function (item, index) {
      if (_lodash2.default.isString(item)) newVal += '"' + item + '"';
      if (_lodash2.default.isNumber(item)) newVal += "'" + item + "'";
      if (index !== filter.property_value.length - 1) newVal += ', ';
    });
    filter.property_value = newVal;
    return filter;
  },

  formatFilterParams: function formatFilterParams(filter) {
    filter.coercion_type = filterUtils.getCoercionType(filter);
    if (filter.coercion_type === 'List') {
      filter = _lodash2.default.assign({}, filter, filterUtils.initList(filter));
    }
    filter.property_value = filterUtils.getCoercedValue(filter);
    if (filter.coercion_type === 'Datetime') {
      filter.property_value = _FormatUtils2.default.convertDateToUTC(new Date(filter.property_value));
    }
    return filter;
  },

  coerceGeoValue: function coerceGeoValue(value) {
    var trailingDecimals = value.match(/\.+$/);
    if (value === '-' || trailingDecimals && trailingDecimals.length) {
      return value;
    } else {
      return parseFloat(value) || 0;
    }
  },

  validFilters: function validFilters(filters) {
    return _lodash2.default.filter(filters, function (filter) {
      _RunValidations2.default.run(_FilterValidations2.default, filter);
      return filter.isValid;
    });
  }

};

exports.default = filterUtils;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flux = __webpack_require__(57);

exports.default = new _flux.Dispatcher();

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var run = function run(validatorSet, model) {
  var keys = Object.keys(validatorSet);
  model.isValid = true;
  model.errors = [];

  for (var i = 0; i < keys.length; i++) {
    var validator = validatorSet[keys[i]];

    // Check if this validator should be run at all.
    if (validator.shouldRun && !validator.shouldRun(model)) continue;

    var result = validator.validate(model);

    // Validator returned true. This attribute is valid. Move on.
    if (result === true) continue;

    // There is an error. Set the model as invalid and set the errors on the model.
    model.isValid = false;
    model.errors.push({
      attribute: keys[i],
      msg: result === false ? validator.msg : result
    });
  }
};
exports.default = { run: run };

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AppDispatcher = __webpack_require__(8);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _events = __webpack_require__(18);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _ProjectConstants = __webpack_require__(33);

var _ProjectConstants2 = _interopRequireDefault(_ProjectConstants);

var _ProjectUtils = __webpack_require__(4);

var _ProjectUtils2 = _interopRequireDefault(_ProjectUtils);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ExplorerStore */

var CHANGE_EVENT = 'change';

var _projects = {};

function defaultAttrs() {
  return {
    id: null,
    loading: true,
    eventCollections: [],
    sortedEventCollections: {},
    schema: {}
  };
}

function _create(attrs) {
  var id = _FormatUtils2.default.generateTempId();
  _projects[id] = _lodash2.default.assign(defaultAttrs(), { id: id }, attrs);
}

function _update(id, updates) {
  _projects[id] = _lodash2.default.assign({}, _projects[id], updates);
}

function _updateEventCollection(id, collectionName, updates) {
  var newCollection = _lodash2.default.assign({}, _projects[id].schema[collectionName], updates);
  _projects[id].schema[collectionName] = newCollection;
}

var ProjectStore = _lodash2.default.assign({}, _events.EventEmitter.prototype, {
  unregisterWithDispatcher: function unregisterWithDispatcher() {
    _AppDispatcher2.default.unregister(_dispatcherToken);
  },

  clearAll: function clearAll() {
    _projects = {};
  },

  getProject: function getProject() {
    var keys = Object.keys(_projects);
    if (keys.length) {
      return _projects[keys[0]];
    }
  },

  getAll: function getAll() {
    return _projects;
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
var _dispatcherToken = _AppDispatcher2.default.register(function (action) {
  var attrs;

  switch (action.actionType) {
    case _ProjectConstants2.default.PROJECT_CREATE:
      _create(action.attrs);
      ProjectStore.emitChange();
      break;

    case _ProjectConstants2.default.PROJECT_UPDATE:
      _update(action.id, action.updates);
      ProjectStore.emitChange();
      break;

    case _ProjectConstants2.default.PROJECT_UPDATE_EVENT_COLLECTION:
      _updateEventCollection(action.id, action.collectionName, action.updates);
      ProjectStore.emitChange();
      break;

    default:
    // no op
  }

  return true;
});

exports.default = ProjectStore;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AppDispatcher = __webpack_require__(8);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _events = __webpack_require__(18);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _ExplorerConstants = __webpack_require__(20);

var _ExplorerConstants2 = _interopRequireDefault(_ExplorerConstants);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _FilterUtils = __webpack_require__(7);

var _FilterUtils2 = _interopRequireDefault(_FilterUtils);

var _ProjectUtils = __webpack_require__(4);

var _ProjectUtils2 = _interopRequireDefault(_ProjectUtils);

var _ProjectStore = __webpack_require__(11);

var _ProjectStore2 = _interopRequireDefault(_ProjectStore);

var _RunValidations = __webpack_require__(10);

var _RunValidations2 = _interopRequireDefault(_RunValidations);

var _ExplorerValidations = __webpack_require__(28);

var _ExplorerValidations2 = _interopRequireDefault(_ExplorerValidations);

var _FilterValidations = __webpack_require__(23);

var _FilterValidations2 = _interopRequireDefault(_FilterValidations);

var _StepValidations = __webpack_require__(38);

var _StepValidations2 = _interopRequireDefault(_StepValidations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHANGE_EVENT = 'change'; /* ExplorerStore */

var SHARED_FUNNEL_STEP_PROPERTIES = ['event_collection', 'time', 'timezone', 'filters'];

var _explorers = {};

function _defaultAttrs() {
  return {
    id: _FormatUtils2.default.generateTempId(),
    query_name: null,
    active: false,
    saving: false,
    dataTimestamp: null,
    response: null,
    loading: false,
    isValid: true,
    errors: [],
    refresh_rate: 0,
    query: {
      event_collection: null,
      analysis_type: null,
      target_property: null,
      percentile: null,
      group_by: [],
      interval: null,
      timezone: _ProjectUtils2.default.getLocalTimezone(),
      filters: [],
      steps: [],
      email: null,
      latest: null,
      property_names: [],
      time: {
        relativity: 'this',
        amount: 14,
        sub_timeframe: 'days'
      }
    },
    metadata: _defaultMetadata()
  };
}

function _defaultMetadata() {
  return {
    display_name: null,
    visualization: {
      chart_type: null
    }
  };
}

function _defaultFilter() {
  return {
    property_name: null,
    property_value: null,
    operator: 'eq',
    coercion_type: 'String',
    isValid: true,
    errors: []
  };
}

function _defaultGeoFilter() {
  return {
    coordinates: [],
    max_distance_miles: null
  };
}

function _defaultStep() {
  return {
    event_collection: null,
    actor_property: null,
    time: {
      relativity: 'this',
      amount: 14,
      sub_timeframe: 'days'
    },
    timezone: _ProjectUtils2.default.getLocalTimezone(),
    filters: [],
    optional: false,
    inverted: false,
    with_actors: false,
    active: false,
    isValid: true,
    errors: []
  };
}

function _validate(id) {
  _RunValidations2.default.run(_ExplorerValidations2.default, _explorers[id]);
}

/**
 * Get the default coercion type for this filter based off the filter's property_name's set type
 * in the project schema.
 * @param  {Object} explorer  The explorer model that the filter belongs to
 * @param  {Object} filter    The filter
 * @return {String}           The default coercion type
 */
function _getDefaultFilterCoercionType(explorer, filter) {
  var propertyType = _ProjectUtils2.default.getPropertyType(_ProjectStore2.default.getProject(), explorer.query.event_collection, filter.property_name);
  var targetCoercionType = _FormatUtils2.default.coercionTypeForPropertyType(propertyType);
  return targetCoercionType;
}

/**
 * Runs through the changeset and moves data around if necessary
 * @param {Object} explorer   The explorer model that is being updated
 * @param {Object} updates    The updated explorer model
 * @return {Object}           The new set of updates
 */
function _prepareUpdates(explorer, updates) {
  // TODO: We're assigning the response object directly onto the model so we
  // don't have to loop through the (sometimes) massive response object.
  function customizer(objValue, srcValue, key) {
    if (_lodash2.default.isArray(objValue)) {
      return srcValue;
    } else if (key === 'time' && _lodash2.default.isPlainObject(objValue)) {
      return srcValue;
    }
  }
  var newModel = _lodash2.default.mergeWith({}, explorer, _lodash2.default.omit(updates, 'response'), customizer);
  if (updates.response) newModel.response = updates.response;

  // Check if the event collection has changed. Clear the property names if so.
  if (updates.query && updates.query.event_collection && updates.query.event_collection !== explorer.query.event_collection) {
    newModel.query.property_names = [];
  }

  if (newModel.query.analysis_type === 'funnel' && explorer.query.analysis_type !== 'funnel') {
    newModel = _migrateToFunnel(explorer, newModel);
  } else if (newModel.query.analysis_type !== 'funnel' && explorer.query.analysis_type === 'funnel') {
    newModel = _migrateFromFunnel(explorer, newModel);
  }
  newModel = _removeInvalidFields(newModel);

  return newModel;
}

/**
 * If the query got changed to a funnel, move the step-specific parameters to a steps object.
 * @param {Object} explorer The explorer model that is being updated
 * @param {Object} newModel The updated explorer model
 * @return {Object}         The new set of updates
 */
function _migrateToFunnel(explorer, newModel) {
  var firstStep = _defaultStep();
  firstStep.active = true;

  _lodash2.default.each(SHARED_FUNNEL_STEP_PROPERTIES, function (key) {
    if (!_lodash2.default.isUndefined(explorer.query[key]) && !_lodash2.default.isNull(explorer.query[key])) {
      firstStep[key] = explorer.query[key];
    }

    newModel.query[key] = key === 'filters' ? [] : null;
  });

  if (!_lodash2.default.isUndefined(explorer.query.target_property) && !_lodash2.default.isNull(explorer.query.target_property)) {
    firstStep.actor_property = explorer.query.target_property;
    explorer.query.target_property = null;
  }

  newModel.query.steps = [firstStep];

  return newModel;
}

/**
 * If the query got changed from a funnel, move the applicable parameters out to the root query
 * @param {Object} explorer The explorer model that is being updated
 * @param {Object} newModel The updated explorer model
 * @return {Object}         The new set of updates
 */
function _migrateFromFunnel(explorer, newModel) {
  if (explorer.query.steps.length < 1) return newModel;
  var activeStep = _lodash2.default.find(explorer.query.steps, { active: true }) || explorer.query.steps[0];

  _lodash2.default.each(SHARED_FUNNEL_STEP_PROPERTIES, function (key) {
    if (!_lodash2.default.isUndefined(activeStep[key])) {
      newModel.query[key] = activeStep[key];
    }
  });

  if (!_lodash2.default.isNull(activeStep.actor_property) && _ExplorerUtils2.default.shouldHaveTarget(newModel)) {
    newModel.query.target_property = activeStep.actor_property;
  }

  newModel.query.steps = [];

  return newModel;
}

/**
 * Removes fields from the query that aren't valid given the new analysis type.
 * @param {Object} newModel   The updated explorer model
 * @return {Object}           The new set of updates
 */
function _removeInvalidFields(newModel) {
  if (!_ExplorerUtils2.default.isEmailExtraction(newModel)) {
    newModel.query.latest = null;
    newModel.query.email = null;
  }
  if (newModel.query.analysis_type === 'extraction') {
    newModel.query.group_by = null;
    newModel.query.interval = null;
  }
  if (newModel.query.analysis_type !== 'extraction') {
    newModel.query.latest = null;
  }
  if (newModel.query.analysis_type !== 'percentile') {
    newModel.query.percentile = null;
  }
  if (_lodash2.default.includes(['count', 'extraction', 'funnel'], newModel.query.analysis_type)) {
    newModel.query.target_property = null;
  }
  if (newModel.query.analysis_type !== 'funnel') {
    newModel.query.steps = [];
  }
  if (newModel.query.analysis_type === 'funnel') {
    newModel.query.filters = [];
    newModel.query.time = null;
    newModel.query.timezone = null;
    newModel.query.group_by = null;
    newModel.query.timeframe = null;
    newModel.query.interval = null;
  }
  return newModel;
}

/**
 * Looks at updates about to be made to a filter and performs a series of operations to
 * change the filter values depending on the coercion_type, operator and type of property_value.
 * @param  {Object} explorer  The explorer model that owns the filter to be updated
 * @param  {Object} filter    The filter to be updated
 * @param  {Object} updates   The updates to be made to the filter
 * @return {Object}           The updated version of the filter after the changes have been made to it.
 */
function _prepareFilterUpdates(explorer, filter, updates) {
  if (updates.property_name && updates.property_name !== filter.property_name) {
    if (filter.operator === 'exists') {
      updates.coercion_type = 'Boolean';
    } else {
      // No need to update the operator - we allow any operator for any property type right now.
      updates.coercion_type = _getDefaultFilterCoercionType(explorer, _lodash2.default.merge({}, filter, updates));
    }
  } else if (updates.operator && updates.operator !== filter.operator) {
    var newOp = updates.operator;
    if (newOp === 'in') updates.coercion_type = 'List';
    if (newOp === 'exists') updates.coercion_type = 'Boolean';
    if (newOp === 'within') updates.coercion_type = 'Geo';

    // If it's not any of these operators, we still need to make sure that the current coercion_type is available
    // as an option for this new operator.
    var coercionOptions = _lodash2.default.find(_ProjectUtils2.default.getConstant('FILTER_OPERATORS'), { value: updates.operator }).canBeCoeredTo;
    var coercion_type = updates.coercion_type || filter.coercion_type;
    if (!_lodash2.default.includes(coercionOptions, coercion_type)) {
      updates.coercion_type = coercionOptions[0];
    }
  }

  if (updates.coercion_type === 'Geo' && filter.coercion_type !== 'Geo') {
    updates.property_value = _defaultGeoFilter();
  }

  updates.property_value = _FilterUtils2.default.getCoercedValue(_lodash2.default.merge({}, filter, updates));

  return updates;
}

function _wrapGroupBy(group_by) {
  if (!_lodash2.default.isArray(group_by)) group_by = [group_by];
  return _lodash2.default.pull(group_by, null);
}

function _create(attrs) {
  if (attrs && attrs.active === true) {
    throw new Error('You must use setActive to set a model as active.');
    return;
  }

  attrs = attrs || {};
  var newAttrs = _lodash2.default.merge(_defaultAttrs(), attrs);

  if (newAttrs.query.steps) {
    newAttrs.query.steps = _lodash2.default.map(newAttrs.query.steps, function (step) {
      return _lodash2.default.merge(_defaultStep(), step);
    });
  }
  if (!newAttrs.metadata) newAttrs.metadata = _defaultMetadata();
  newAttrs.query.group_by = _wrapGroupBy(newAttrs.query.group_by);
  newAttrs.query.percentile = parseFloat(newAttrs.query.percentile) || null;

  _explorers[newAttrs.id] = newAttrs;
  return newAttrs.id;
}

function _update(id, updates) {
  if (updates && updates.active === true && !_explorers[id].active) {
    throw new Error('You must use setActive to set a model as active.');
    return;
  }

  var newModel = _prepareUpdates(_explorers[id], updates);
  newModel.query.group_by = _wrapGroupBy(newModel.query.group_by);
  newModel.query.percentile = parseFloat(newModel.query.percentile) || null;

  if (updates.id && updates.id !== id) {
    _explorers[updates.id] = newModel;
    delete _explorers[id];
    return updates.id;
  } else {
    _explorers[id] = newModel;
    return id;
  }
}

function _markFirstInvalidStepActive(id) {
  var explorer = _explorers[id];
  if (explorer.query.analysis_type !== 'funnel') return;
  explorer.query.steps.forEach(function (step, index) {
    if (!step.isValid) _setStepActive(id, index);
  });
}

function _remove(id) {
  delete _explorers[id];
}

function _setActive(id) {
  _lodash2.default.each(_explorers, function (explorer, key) {
    explorer.active = false;
    delete explorer.originalModel;
  });
  _explorers[id].active = true;
  _explorers[id].originalModel = _lodash2.default.cloneDeep(_explorers[id]);
}

function _revertActiveChanges() {
  var active = _lodash2.default.find(_explorers, { active: true });
  var original = _explorers[active.id].originalModel;
  _explorers[active.id] = _lodash2.default.assign({}, original, { originalModel: original, response: active.response });
  return active.id;
}

function _addFilter(id, attrs) {
  attrs = attrs || {};
  _explorers[id].query.filters.push(_lodash2.default.assign(_defaultFilter(), attrs));
}

function _removeFilter(id, index) {
  _explorers[id].query.filters.splice(index, 1);
}

function _updateFilter(id, index, updates) {
  var filter = _explorers[id].query.filters[index];
  var updates = _prepareFilterUpdates(_explorers[id], filter, updates);

  _explorers[id].query.filters[index] = _lodash2.default.assign({}, filter, updates);

  // Hack around the fact that _.assign doesn't assign null values. But we
  // actually WANT a null value if the coercion_type is null.
  if (_explorers[id].query.filters[index].coercion_type === 'Null') {
    _explorers[id].query.filters[index].property_value = null;
  }
}

function _addStep(id, attrs) {
  var explorer = _explorers[id];
  if (explorer.query.analysis_type !== 'funnel') {
    throw new Error('Error: Attempting to add a step to a non-funnel query. Explorer id: ' + explorer.id);
  }
  var step = _lodash2.default.assign(_defaultStep(), attrs || {});
  step.active = true;

  // This is likely always true, but I like being defensive
  if (explorer.query.steps.length > 0) {
    var lastStep = explorer.query.steps[explorer.query.steps.length - 1];

    step.time = lastStep.time;
    step.timezone = lastStep.timezone;
  }

  explorer.query.steps.push(step);
  _setStepActive(id, explorer.query.steps.length - 1);
}

function _removeStep(id, index) {
  _explorers[id].query.steps.splice(index, 1);

  if (index > _explorers[id].query.steps.length - 1) {
    _setStepActive(id, _explorers[id].query.steps.length - 1);
  } else {
    _setStepActive(id, index);
  }
}

function _updateStep(id, index, updates) {
  var step = _explorers[id].query.steps[index];
  _explorers[id].query.steps[index] = _lodash2.default.assign({}, step, updates);
}

function _setStepActive(id, index) {
  _explorers[id].query.steps.forEach(function (step) {
    step.active = false;
  });
  _explorers[id].query.steps[index].active = true;
}

function _moveStep(id, index, direction) {
  var steps = _lodash2.default.cloneDeep(_explorers[id].query.steps);

  if (direction === 'up') {
    if (index === 0) return;

    var stepToDisplace = steps[index - 1];
    var step = steps[index];
    steps[index - 1] = step;
    steps[index] = stepToDisplace;
  }
  if (direction === 'down') {
    if (index === steps.length - 1) return;

    var stepToDisplace = steps[index + 1];
    var step = steps[index];
    steps[index + 1] = step;
    steps[index] = stepToDisplace;
  }

  _explorers[id].query.steps = steps;
}

function _addStepFilter(id, stepIndex, attrs) {
  attrs = attrs || {};
  _explorers[id].query.steps[stepIndex].filters.push(_lodash2.default.assign(_defaultFilter(), attrs));
}

function _removeStepFilter(id, stepIndex, filterIndex) {
  _explorers[id].query.steps[stepIndex].filters.splice(filterIndex, 1);
}

function _updateStepFilter(id, stepIndex, filterIndex, updates) {
  var filter = _explorers[id].query.steps[stepIndex].filters[filterIndex];
  var updates = _prepareFilterUpdates(_explorers[id], filter, updates);
  _explorers[id].query.steps[stepIndex].filters[filterIndex] = _lodash2.default.assign({}, filter, updates);

  // Hack around the fact that _.assign doesn't assign null values. But we
  // actually WANT a null value if the coercion_type is null.
  if (_explorers[id].query.steps[stepIndex].filters[filterIndex].coercion_type === 'Null') {
    _explorers[id].query.steps[stepIndex].filters[filterIndex].property_value = null;
  }
}

function _clear(id) {
  var model = _explorers[id];
  _explorers[id] = _lodash2.default.assign({}, _defaultAttrs(), _lodash2.default.pick(model, ['id', 'query_name', 'active', 'metadata', 'originalModel']));
}

var ExplorerStore = _lodash2.default.assign({}, _events.EventEmitter.prototype, {

  unregisterWithDispatcher: function unregisterWithDispatcher() {
    _AppDispatcher2.default.unregister(this.dispatchToken);
  },

  clearAll: function clearAll() {
    _explorers = {};
  },

  set: function set(explorer) {
    _explorers[explorer.id] = explorer;
  },

  get: function get(id) {
    return _explorers[id];
  },

  getActive: function getActive() {
    return _lodash2.default.find(_explorers, { active: true });
  },

  getAll: function getAll() {
    return _explorers;
  },

  getLast: function getLast() {
    var keys = _lodash2.default.keys(_explorers);
    return _explorers[keys[keys.length - 1]];
  },

  getAllPersisted: function getAllPersisted() {
    return _lodash2.default.filter(_explorers, function (explorer) {
      return _ExplorerUtils2.default.isPersisted(explorer);
    });
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

// Register callback to handle all updates
ExplorerStore.dispatchToken = _AppDispatcher2.default.register(function (action) {

  function finishAction(id) {
    // Validate the model
    if (id) _validate(id);

    // Emit change
    ExplorerStore.emitChange();
  }

  switch (action.actionType) {
    case _ExplorerConstants2.default.EXPLORER_CREATE:
      _create(action.attrs);
      finishAction();
      break;

    case _ExplorerConstants2.default.EXPLORER_CREATE_BATCH:
      action.models.forEach(function (model) {
        _explorers[model.id] ? _update(model.id, model) : _create(model);
      });
      finishAction();
      break;

    case _ExplorerConstants2.default.EXPLORER_CLONE:
      var source = ExplorerStore.get(action.id);
      _create({ query: _lodash2.default.cloneDeep(source.query),
        metadata: {
          display_name: null,
          visualization: {
            chart_type: _lodash2.default.cloneDeep(source.metadata.visualization.chart_type)
          }
        }
      });
      finishAction();
      break;

    case _ExplorerConstants2.default.EXPLORER_UPDATE:
      var id = _update(action.id, action.updates);
      finishAction(id);
      break;

    case _ExplorerConstants2.default.EXPLORER_REMOVE:
      var wasActive = _explorers[action.id].active === true;
      _remove(action.id);
      // Create a new active explorer to replace the previously active one.
      if (wasActive) {
        var id = _create();
        _setActive(id);
      }
      finishAction();
      break;

    case _ExplorerConstants2.default.EXPLORER_SET_ACTIVE:
      _setActive(action.id);
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_REVERT_ACTIVE_CHANGES:
      var id = _revertActiveChanges();
      finishAction(id);
      break;

    case _ExplorerConstants2.default.EXPLORER_CLEAR:
      _clear(action.id);
      finishAction();
      break;

    case _ExplorerConstants2.default.EXPLORER_SAVING:
      _update(action.id, { saving: true });
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_SAVE_SUCCESS:
      _update(action.id, { saving: false });
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_SAVE_FAIL:
      _update(action.id, { saving: false });
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_ADD_FILTER:
      _addFilter(action.id, action.attrs);
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_REMOVE_FILTER:
      _removeFilter(action.id, action.index);
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_UPDATE_FILTER:
      _updateFilter(action.id, action.index, action.attrs);
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_ADD_STEP:
      _addStep(action.id, action.attrs);
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_REMOVE_STEP:
      _removeStep(action.id, action.index);
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_UPDATE_STEP:
      _updateStep(action.id, action.index, action.attrs);
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_SET_STEP_ACTIVE:
      _setStepActive(action.id, action.index);
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_MOVE_STEP:
      _moveStep(action.id, action.index, action.direction);
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_ADD_STEP_FILTER:
      _addStepFilter(action.id, action.stepIndex, action.attrs);
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_REMOVE_STEP_FILTER:
      _removeStepFilter(action.id, action.stepIndex, action.filterIndex);
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_UPDATE_STEP_FILTER:
      _updateStepFilter(action.id, action.stepIndex, action.filterIndex, action.attrs);
      finishAction(action.id);
      break;

    case _ExplorerConstants2.default.EXPLORER_VALIDATE:
      _validate(action.id);
      finishAction();
      break;

    case _ExplorerConstants2.default.EXPLORER_FOUND_INVALID:
      // Find any invalid steps and mark the first one active to display the notice.
      _markFirstInvalidStepActive(action.id);
      finishAction();
      break;

    default:
    // no op
  }

  return true;
});

exports.default = ExplorerStore;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* TODO:
[ ] resting state (selection/empty)
[x] activate component on `up/down` key, or by typing
[x] 'esc' key to close w/out changing selection (webkit pattern)
[~] accessibility
    [x] announce/surface options to screen readers
    [x] input field should instruct further key controls
[x] snag: re-activating w/ prior selection -> only see that selection
    - should we show all on first (re-)focus?
    - only filter list when typing? track interaction states?
[ ] snag: long strings wrap and throw off scroll-sync
    - truncrate at calc'd length? maybe truncate the middle? 'beginning.ah...ok.end'
    - crazy: 'walk' the truncatation of the 'active' li (from right to left) after a 1-2sec 'pause'
    - can we use 'left/right' key actions to change truncation? maybe w/ CSS?
[ ] snag: mobile. perhaps we should revert to native elements, to avoid input+list+keyboard hysteria?
[ ] bug: Escape event listener bubbles up and closes the modal.
[ ] bug: With breaks on selects inside filter manager modal.
*/

var ReactSelect = _react2.default.createClass({
  displayName: 'ReactSelect',


  getDefaultProps: function getDefaultProps() {
    return {
      items: [],
      wrapClasses: '',
      inputClasses: '',
      placeholder: '',
      handleBlur: function handleBlur() {},
      handleChange: function handleChange() {},
      handleSelection: function handleSelection() {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      focusedItem: '',
      limit: 30,
      initialFocus: false,
      selectedItem: 0,
      visible: false,
      visibleItems: 0
    };
  },

  resetState: function resetState() {
    this.setState({
      focusedItem: '',
      limit: 30,
      selectedItem: 0,
      visible: false,
      initialFocus: true
    });
  },

  handleClick: function handleClick(e) {
    this.setState({ visible: true });
    this.handleItemFocus();
  },

  handleChange: function handleChange(e) {
    var newState = {
      initialFocus: false
    };
    if (this.state.visible) {
      newState['limit'] = 30;
      newState['selectedItem'] = 0;
      this.refs.scrollpane.scrollTop = 0;
    } else {
      newState['visible'] = true;
    }
    this.setState(newState);
    this.props.handleChange(this.props.name, this.refs.input.value);
  },

  handleFocus: function handleFocus(e) {
    if (!this.state.visible) {
      this.setState({
        initialFocus: true,
        visible: true
      });
    } else {
      this.resetState();
    }
  },

  handleBlur: function handleBlur(e) {
    if (this.refs.scrollpane && e.relatedTarget !== this.refs.scrollpane) {
      if (!this.state.visible) e.preventDefault();
      this.resetTimeout = setTimeout(this.resetState, 100);
      this.blurTimeout = setTimeout(this.props.handleBlur(e), 100);
    }
  },

  handleItemFocus: function handleItemFocus() {
    clearTimeout(this.resetTimeout);
    clearTimeout(this.blurTimeout);
  },

  handleItemSelection: function handleItemSelection(index) {
    if (_typeof(this.props.items[index])) {
      var selection = String(this.props.items[index]);
      this.setState({ initialFocus: false });
      this.refs.input.focus();
      this.resetState();
      this.props.handleChange(this.props.name, selection);
      this.props.handleSelection(this.props.name, selection);
    }
  },

  handleKeyDown: function handleKeyDown(e) {
    var itemHeight, itemOffset;

    if (e.key === "Tab" || e.key === "Shift") return;

    this.setState({ visible: true });

    if (this.refs.list && this.state.selectedItem) {
      itemHeight = this.refs.list.children[this.state.selectedItem].scrollHeight + 1;
      itemOffset = itemHeight * this.state.selectedItem;
    }

    if (this.keyDownCallbacks[e.key]) {
      this.keyDownCallbacks[e.key].call(this, e, itemHeight, itemOffset);
    }
  },

  keyDownCallbacks: {

    "ArrowUp": function ArrowUp(e, itemHeight, itemOffset) {
      var newState = {};
      var list = this.refs.list;

      if (this.state.selectedItem - 1 >= 0) {
        newState['selectedItem'] = this.state.selectedItem - 1;
        if (list) {
          newState['focusedItem'] = list.children[this.state.selectedItem - 1].innerHTML;
        }
      } else {
        newState['selectedItem'] = 0;
        if (list) {
          newState['focusedItem'] = list.children[0].innerHTML;
        }
      }
      this.setState(newState);

      if (list && itemOffset > itemHeight * 3) {
        this.refs.scrollpane.scrollTop -= itemHeight;
      }
      e.preventDefault();
    },

    "ArrowDown": function ArrowDown(e, itemHeight, itemOffset) {
      var newState = {};
      var list = this.refs.list;

      if (this.state.selectedItem + 1 < this.visibleItems) {
        newState['selectedItem'] = this.state.selectedItem + 1;
        if (list) {
          newState['focusedItem'] = this.refs.list.children[this.state.selectedItem + 1].innerHTML;
        }
      } else {
        newState['selectedItem'] = this.visibleItems - 1;
        if (list) {
          newState['focusedItem'] = list.children[this.visibleItems - 1].innerHTML;
        }
      }
      this.setState(newState);

      if (list && itemOffset > itemHeight * 3) {
        this.refs.scrollpane.scrollTop += itemHeight;
      }
      e.preventDefault();
    },

    "Enter": function Enter(e, itemHeight, itemOffset) {
      var list = this.refs.list;
      if (list) {
        var childNode = list.children[this.state.selectedItem];
        if (childNode) this.handleItemSelection(childNode.getAttribute('data-index'));
      } else {
        this.resetState();
      }
      e.preventDefault();
    },

    "Escape": function Escape(e, itemHeight, itemOffset) {
      this.handleBlur(e);
      e.preventDefault();
    }

  },

  handleScroll: function handleScroll(e) {
    var pane = this.refs.scrollpane;
    var diff = pane.scrollHeight - pane.scrollTop - 200;
    // -200 offset is a hack to account for fixed height
    if (diff < 50) {
      this.setState({ limit: this.state.limit + 30 });
    }
  },

  // Data management

  appendListItems: function appendListItems(arr) {
    var self = this;
    arr.forEach(function (opt, i) {
      self.props.items.push(opt);
    });
    this.forceUpdate();
    return this;
  },

  insertListItems: function insertListItems(index, arr) {
    this.props.items.splice.apply(this.props.items, [index, 0].concat(arr));
    this.forceUpdate();
    return this;
  },

  removeListItems: function removeListItems() {
    this.props.items = [];
    this.forceUpdate();
    return this;
  },

  getItems: function getItems() {
    var self = this;
    var count = 0;
    this.visibleItems = 0;
    var inputString = this.state.initialFocus ? '' : this.props.value || '';
    return this.props.items.map(function (item, index) {
      // If input is present, skip items that don't match
      if (inputString.length > 0 && String(item).toLowerCase().search(_lodash2.default.escapeRegExp(inputString).toLowerCase()) < 0) return;

      // Simple result limiting
      count++;if (count > self.state.limit) return;
      self.visibleItems = self.visibleItems + 1;
      return _react2.default.createElement(
        'li',
        { className: self.state.selectedItem === count - 1 ? "react-select-item active" : "react-select-item",
          key: index,
          'data-index': index,
          onMouseDown: self.handleItemSelection.bind(self, index),
          onFocus: self.handleItemFocus.bind(self, index),
          'aria-live': 'polite',
          role: 'option' },
        item
      );
    });
  },

  getScrollPane: function getScrollPane(items) {
    // Hide scrollpane unless active
    if (this.state.visible) {
      return _react2.default.createElement(
        'div',
        {
          ref: 'scrollpane',
          className: 'react-select-scrollpane',
          onScroll: this.handleScroll,
          tabIndex: '-1',
          'aria-hidden': 'false' },
        _react2.default.createElement(
          'div',
          { className: 'react-select-aria-notice', 'aria-live': 'assertive' },
          this.state.focusedItem || ''
        ),
        _react2.default.createElement(
          'ul',
          { ref: 'list', className: 'react-select-list',
            'aria-atomic': 'false',
            'aria-label': 'Begin typing to filter options, or key up or down to browse available options',
            'aria-live': 'assertive',
            'aria-relevant': 'additions',
            role: 'listbox',
            id: this.props.id + '-scrollpane' },
          items
        )
      );
    }
  },

  // React methods

  render: function render() {
    var items = this.getItems();
    var scrollpane = this.getScrollPane(items);

    var wrapClasses = 'react-select';
    if (this.props.wrapClasses) {
      wrapClasses = wrapClasses + ' ' + this.props.wrapClasses;
    }
    if (this.state.visible) {
      wrapClasses = wrapClasses + ' visible';
    }

    var inputClasses = 'react-select-input';
    if (this.props.inputClasses) {
      inputClasses = inputClasses + ' ' + this.props.inputClasses;
    }

    return _react2.default.createElement(
      'div',
      { ref: 'wrapper', className: wrapClasses },
      _react2.default.createElement('input', { ref: 'input',
        name: this.props.name,
        className: inputClasses,
        value: this.props.value || "",
        placeholder: this.props.placeholder,
        onClick: this.handleClick,
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onKeyDown: this.handleKeyDown,
        'aria-expanded': this.state.visible,
        'aria-owns': this.props.id + '-scrollpane',
        'aria-label': this.props.title || "Select value",
        'aria-selected': this.props.value && this.props.value.length ? true : undefined,
        'aria-live': 'polite',
        autoComplete: 'off' }),
      scrollpane
    );
  }

});

exports.default = ReactSelect;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _ProjectUtils = __webpack_require__(4);

var _ProjectUtils2 = _interopRequireDefault(_ProjectUtils);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeframeUtils = {

  /**
   * Takes a time object and returns a string representing the timeframe type (absolute or relative)
   * @param  {Object} time The time object
   * @return {String} The type of timeframe, 'absolute' or 'relative'
   */
  timeframeType: function timeframeType(time) {
    if (_lodash2.default.isUndefined(time)) {
      return null;
    } else if (!_lodash2.default.isPlainObject(time)) {
      throw new Error('Invalid timeframe type: not a plain object.');
    } else if (_lodash2.default.has(time, 'start') || _lodash2.default.has(time, 'end')) {
      return 'absolute';
    } else if (_lodash2.default.has(time, 'relativity') && _lodash2.default.has(time, 'amount') && _lodash2.default.has(time, 'sub_timeframe')) {
      return 'relative';
    } else {
      throw new Error('Invalid timeframe type: invalid time value.');
    }
  },

  getTimezoneOffset: function getTimezoneOffset(timezone) {
    var zone = _lodash2.default.find(_ProjectUtils2.default.getConstant('TIMEZONES'), { value: timezone });
    return zone ? zone.offset : '+00:00';
  },

  timeframeBuilders: {

    absolute: function absolute(time) {
      if (time && time.start && time.end) {
        return {
          start: _FormatUtils2.default.formatISOTimeNoTimezone(time.start),
          end: _FormatUtils2.default.formatISOTimeNoTimezone(time.end)
        };
      }
    },

    relative: function relative(time) {
      if (time && time.relativity && time.amount && time.sub_timeframe) {
        return [time.relativity, time.amount, time.sub_timeframe].join('_');
      }
    }

  },

  getTimeframe: function getTimeframe(time) {
    var timeframeBuilder = timeframeUtils.timeframeBuilders[timeframeUtils.timeframeType(time)];
    if (typeof timeframeBuilder === 'undefined') return "";
    return timeframeBuilder(time);
  },

  getTimeParameters: function getTimeParameters(timeframe, timezone) {
    return {
      timeframe: timeframe ? timeframeUtils.getTimeframe(timeframe) : null,
      timezone: timezone || _ProjectUtils2.default.getConstant('DEFAULT_TIMEZONE')
    };
  },

  /**
   * Takes a URL encoded timerame string or object and returns a time object that looks how the Explorer store wants
   * it to
   * @param  {String} timeframe
   * @return {Object}
   * Return structure:
   * {
   *  time: {an Object, either containing a deconstructed absolute or relative timeframe}
   * }
   */
  unpackTimeframeParam: function unpackTimeframeParam(timeframe, timezone) {
    if ((typeof timeframe === 'undefined' ? 'undefined' : _typeof(timeframe)) === 'object') {
      return timeframeUtils.unpackAbsoluteTimeframe(timeframe, timezone);
    } else if (typeof timeframe === 'string') {
      return timeframeUtils.unpackRelativeTimeframe(timeframe, timezone);
    }
  },

  unpackAbsoluteTimeframe: function unpackAbsoluteTimeframe(timeframe, timezone) {
    var formattedValue = {
      time: {},
      timezone: null
    };

    if (!timezone || !_ProjectUtils2.default.getConstant('TIMEZONES').filter(function (z) {
      return z.name === timezone;
    }).length) {
      formattedValue.timezone = 'UTC';
    } else {
      formattedValue.timezone = timezone;
    }

    var startVal = timeframe.start ? timeframe.start.substring(0, 19) : "";
    formattedValue.time.start = _FormatUtils2.default.formatISOTimeNoTimezone(startVal);

    var endVal = timeframe.end ? timeframe.end.substring(0, 19) : "";
    formattedValue.time.end = _FormatUtils2.default.formatISOTimeNoTimezone(endVal);

    return formattedValue;
  },

  unpackRelativeTimeframe: function unpackRelativeTimeframe(timeframe, timezone) {
    var split = timeframe.split('_');
    return {
      time: {
        relativity: split[0],
        amount: split[1],
        sub_timeframe: split[2]
      },
      timezone: timezone
    };
  }

};

exports.default = timeframeUtils;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectComponent = _react2.default.createClass({
  displayName: 'SelectComponent',


  buildOptions: function buildOptions() {
    if (this.state.options.length) {

      return this.state.options.map(function (option) {
        return _react2.default.createElement(
          'option',
          { value: option.value, key: option.value, disabled: option.disabled || false },
          option.name
        );
      });
    } else {
      return null;
    }
  },

  wrapValuesInObjects: function wrapValuesInObjects(options) {
    if (!_lodash2.default.isObject(options[0])) {
      return _lodash2.default.map(options, function (option) {
        return { name: option, value: option };
      });
    }
    return options;
  },

  sortOptions: function sortOptions(options) {
    return options.sort(function (a, b) {
      var A = a.name.toLowerCase();
      var B = b.name.toLowerCase();

      if (A < B) {
        return -1;
      } else if (A > B) {
        return 1;
      } else {
        return 0;
      }
    });
  },

  buildEmptyOption: function buildEmptyOption() {
    var emptyOption = this.props.emptyOption;

    if (emptyOption === true) {
      return _react2.default.createElement('option', { value: '' });
    } else if (emptyOption) {
      return _react2.default.createElement(
        'option',
        { value: '' },
        emptyOption
      );
    } else {
      return null;
    }
  },

  setupOptions: function setupOptions(options) {
    var newOptions = this.wrapValuesInObjects(options);
    if (this.props.sort) newOptions = this.sortOptions(newOptions);
    return newOptions;
  },

  // React Methods

  getDefaultProps: function getDefaultProps() {
    return {
      classes: 'form-group',
      sort: true,
      emptyOption: true,
      reference: 'select',
      handleSelection: function handleSelection() {},
      handleBlur: function handleBlur() {},
      options: []
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ options: this.setupOptions(nextProps.options) });
  },

  getInitialState: function getInitialState() {
    return {
      options: this.setupOptions(this.props.options)
    };
  },

  render: function render() {
    var optionNodes = this.buildOptions();
    var label = this.props.label ? _react2.default.createElement(
      'label',
      { htmlFor: this.props.name },
      this.props.label
    ) : null;
    var emptyOption = this.buildEmptyOption();
    var emptyVal = this.props.multiple ? [] : '';
    var selectedValue = this.props.selectedOption ? this.props.selectedOption : emptyVal;

    return _react2.default.createElement(
      'div',
      { className: this.props.classes },
      label,
      _react2.default.createElement(
        'div',
        { className: 'select-element' },
        _react2.default.createElement(
          'select',
          { ref: this.props.reference,
            name: this.props.name,
            value: selectedValue,
            className: 'form-control',
            multiple: this.props.multiple,
            onChange: this.props.handleSelection,
            onBlur: this.props.handleBlur,
            disabled: this.props.disabled },
          emptyOption,
          optionNodes
        )
      )
    );
  }

});

exports.default = SelectComponent;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FieldsToggle = _react2.default.createClass({
  displayName: 'FieldsToggle',


  handleFieldsToggle: function handleFieldsToggle(toggledState) {
    var attrNames = this.props.attrsToStore;
    var updates = {};

    if (!_lodash2.default.isArray(attrNames)) {
      attrNames = [attrNames];
    }
    _lodash2.default.each(attrNames, function (attrName) {
      if (toggledState) {
        if (this._storedAttrs[attrName]) {
          updates[attrName] = this._storedAttrs[attrName];
        }
      } else {
        this._storedAttrs[attrName] = this.props.getFn(attrName);
        var resetVal = this.props.resetValues[attrName] || null;
        updates[attrName] = resetVal;
      }
    }.bind(this));

    this.props.updateFn(updates);
  },

  toggleButtonClick: function toggleButtonClick(event) {
    event.preventDefault();
    this.toggle();
  },

  toggle: function toggle() {
    var openState;
    if (this.props.fieldsCount === null) {
      openState = !this.state.open;
      this.setState({ open: openState });
      this.handleFieldsToggle(openState);
    }
    this.props.toggleCallback(openState || null);
  },

  // React Methods

  componentWillMount: function componentWillMount() {
    this._storedAttrs = {};
  },

  getDefaultProps: function getDefaultProps() {
    return {
      toggleCallback: function toggleCallback() {},
      initialOpenState: false,
      fieldsCount: null,
      resetValues: {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: this.props.initialOpenState ? true : false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!this.props.initialOpenState && nextProps.initialOpenState) {
      this.setState({ open: true });
    }
  },

  render: function render() {
    var fieldsCount = this.props.fieldsCount ? this.props.fieldsCount : null;

    var classes = (0, _classnames2.default)({
      'has-fields-count': fieldsCount,
      'open': this.state.open && fieldsCount === null,
      'fields-toggle': true
    });

    var bodyContent;
    if (this.props.children) {
      bodyContent = _react2.default.createElement(
        'div',
        { className: 'toggle-body' },
        this.props.children
      );
    }

    return _react2.default.createElement(
      'div',
      { className: classes },
      _react2.default.createElement(
        'a',
        { href: '#', className: 'toggle-label', onClick: this.toggleButtonClick, ref: 'toggle-label' },
        _react2.default.createElement(
          'h5',
          { ref: 'name' },
          this.props.name
        ),
        _react2.default.createElement(
          'button',
          { type: 'button', className: 'toggle-button' },
          _react2.default.createElement(
            'span',
            { className: 'icon', ref: 'icon' },
            fieldsCount
          )
        )
      ),
      bodyContent
    );
  }

});

exports.default = FieldsToggle;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputComponent = _react2.default.createClass({
  displayName: 'InputComponent',


  _onChange: function _onChange(event) {
    this.setState({ value: event.target.value });
    this.props.onChange(event);
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classes: 'form-group',
      inputClasses: '',
      type: 'text',
      placeholder: '',
      readonly: false,
      onChange: function onChange() {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.value || ''
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  },

  render: function render() {
    var required = this.props.required ? _react2.default.createElement(
      'small',
      null,
      '(required)'
    ) : null;
    var label = this.props.label ? _react2.default.createElement(
      'label',
      { htmlFor: this.props.name },
      this.props.label,
      ' ',
      required
    ) : null;
    var inputClasses = "form-control";
    if (this.props.inputClasses) inputClasses = inputClasses + " " + this.props.inputClasses;

    return _react2.default.createElement(
      'div',
      { className: this.props.classes },
      label,
      _react2.default.createElement('input', { ref: 'input',
        type: this.props.type,
        name: this.props.name,
        className: inputClasses,
        placeholder: this.props.placeholder,
        onChange: this._onChange,
        onBlur: this.props.onBlur,
        value: this.state.value,
        readOnly: this.props.readonly,
        autoComplete: 'off' })
    );
  }

});

exports.default = InputComponent;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__19__;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keymirror = __webpack_require__(19);

var _keymirror2 = _interopRequireDefault(_keymirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _keymirror2.default)({
  EXPLORER_CREATE: null,
  EXPLORER_CREATE_BATCH: null,
  EXPLORER_CLONE: null,
  EXPLORER_UPDATE: null,
  EXPLORER_REMOVE: null,
  EXPLORER_SET_ACTIVE: null,
  EXPLORER_REVERT_ACTIVE_CHANGES: null,
  EXPLORER_CLEAR: null,
  EXPLORER_VALIDATE: null,
  EXPLORER_FOUND_INVALID: null,
  EXPLORER_QUERY_SUCCESS: null,
  EXPLORER_QUERY_ERROR: null,

  // Filter Actions
  EXPLORER_ADD_FILTER: null,
  EXPLORER_REMOVE_FILTER: null,
  EXPLORER_UPDATE_FILTER: null,
  EXPLORER_ADD_STEP: null,
  EXPLORER_REMOVE_STEP: null,
  EXPLORER_UPDATE_STEP: null,
  EXPLORER_SET_STEP_ACTIVE: null,
  EXPLORER_MOVE_STEP: null,
  EXPLORER_ADD_STEP_FILTER: null,
  EXPLORER_REMOVE_STEP_FILTER: null,
  EXPLORER_UPDATE_STEP_FILTER: null,

  // Saved Query Actions
  EXPLORER_SAVE: null,
  EXPLORER_SAVE_NEW: null,
  EXPLORER_DESTROY: null,
  EXPLORER_SAVING: null,
  EXPLORER_SAVE_SUCCESS: null,
  EXPLORER_SAVE_FAIL: null,
  EXPLORER_DESTROYING: null,
  EXPLORER_DESTROY_SUCCESS: null,
  EXPLORER_DESTROY_FAIL: null
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AppDispatcher = __webpack_require__(8);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _NoticeConstants = __webpack_require__(39);

var _NoticeConstants2 = _interopRequireDefault(_NoticeConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoticeActions = {

  create: function create(attrs) {
    _AppDispatcher2.default.dispatch({
      actionType: _NoticeConstants2.default.NOTICE_CREATE,
      attrs: attrs
    });
  },

  clearAll: function clearAll() {
    _AppDispatcher2.default.dispatch({
      actionType: _NoticeConstants2.default.NOTICE_CLEAR_ALL
    });
  }

};

exports.default = NoticeActions;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AppDispatcher = __webpack_require__(8);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _AppStateConstants = __webpack_require__(35);

var _AppStateConstants2 = _interopRequireDefault(_AppStateConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppStateActions = {

  update: function update(updates) {
    _AppDispatcher2.default.dispatch({
      actionType: _AppStateConstants2.default.APP_STATE_UPDATE,
      updates: updates
    });
  },

  reset: function reset() {
    _AppDispatcher2.default.dispatch({
      actionType: _AppStateConstants2.default.APP_STATE_RESET
    });
  }

};

exports.default = AppStateActions;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isGeoCoercionType(model) {
  return model.coercion_type === 'Geo';
}

exports.default = {

  property_name: {

    msg: 'Choose a property name',

    validate: function validate(model) {
      return typeof model.property_name === 'string' && model.property_name.length > 0;
    }

  },

  operator: {

    msg: 'Choose an operator',

    validate: function validate(model) {
      return typeof model.operator === 'string' && model.operator.length > 0;
    }

  },

  property_value: {

    msg: 'Choose a property value.',

    shouldRun: function shouldRun(model) {
      return !isGeoCoercionType(model);
    },

    validate: function validate(model) {
      var value = model.property_value;
      var coercionType = model.coercion_type;

      if (coercionType == 'List') {
        return _FormatUtils2.default.parseList(value) ? true : false;
      } else if (coercionType === 'Null' || coercionType === 'Boolean') {
        return true;
      } else if (coercionType === 'Number') {
        return _lodash2.default.isNumber(value);
      } else if (coercionType === 'String') {
        return true;
      } else {
        return value ? true : false;
      }
    }

  },

  coercion_type: {

    msg: 'Choose a coercion type',

    validate: function validate(model) {
      return typeof model.coercion_type === 'string' && model.coercion_type.length > 0;
    }

  },

  coordinates: {

    msg: 'Provide all coordinates.',

    shouldRun: isGeoCoercionType,

    validate: function validate(model) {
      var value = model.property_value.coordinates;
      var valid = _lodash2.default.isArray(value) && value.length === 2;
      if (!valid) return valid;

      for (var i = 0; i < value.length; i++) {
        if (!valid) break;
        valid = _lodash2.default.isNumber(value[i]);
      }
      return valid;
    }

  },

  max_distance_miles: {

    msg: 'Provide a max distance in miles.',

    shouldRun: isGeoCoercionType,

    validate: function validate(model) {
      var value = model.property_value.max_distance_miles;
      return value && _lodash2.default.isNumber(value);
    }

  }

};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoaderComponent = _react2.default.createClass({
  displayName: 'LoaderComponent',


  toggle: function toggle(visible) {
    this.props.visible = visible;
    this.forceUpdate();
  },

  // React Methods

  getDefaultProps: function getDefaultProps() {
    return {
      visible: false,
      additionalClasses: false
    };
  },

  render: function render() {
    var classes = "explorer-loader";
    if (!this.props.visible) classes += " hide";
    if (this.props.additionalClasses) classes += " " + this.props.additionalClasses;

    return _react2.default.createElement(
      'div',
      { className: classes },
      _react2.default.createElement(
        'div',
        { className: 'msg' },
        _react2.default.createElement(
          'div',
          { className: 'explorer-spinner' },
          _react2.default.createElement('div', { className: 'rect1' }),
          _react2.default.createElement('div', { className: 'rect2' }),
          _react2.default.createElement('div', { className: 'rect3' }),
          _react2.default.createElement('div', { className: 'rect4' }),
          _react2.default.createElement('div', { className: 'rect5' })
        ),
        'Loading...'
      )
    );
  }

});

exports.default = LoaderComponent;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _AppDispatcher = __webpack_require__(8);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _ProjectConstants = __webpack_require__(33);

var _ProjectConstants2 = _interopRequireDefault(_ProjectConstants);

var _ProjectStore = __webpack_require__(11);

var _ProjectStore2 = _interopRequireDefault(_ProjectStore);

var _ProjectUtils = __webpack_require__(4);

var _ProjectUtils2 = _interopRequireDefault(_ProjectUtils);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProjectActions = {

  create: function create(attrs) {
    _AppDispatcher2.default.dispatch({
      actionType: _ProjectConstants2.default.PROJECT_CREATE,
      attrs: attrs
    });
  },

  update: function update(id, updates) {
    var project = _ProjectStore2.default.getProject();

    _AppDispatcher2.default.dispatch({
      actionType: _ProjectConstants2.default.PROJECT_UPDATE,
      id: project.id,
      updates: updates
    });
  },

  fetchProjectCollections: function fetchProjectCollections(client) {
    var project = _ProjectStore2.default.getProject();
    if (!project) console.error("Cannot fetchProjectCollections: No project model has been created yet.");
    var authKey = client.masterKey() || client.readKey();

    return client.get(client.url('projectId')).auth(authKey).send().then(function (res) {
      var schema = _lodash2.default.assign({}, project.schema);
      _lodash2.default.each(res.events, function (collection) {
        schema[collection.name] = _lodash2.default.assign(collection, {
          properties: {},
          sortedProperties: [],
          loading: false,
          recentEvents: null
        });
      });
      ProjectActions.update(project.id, {
        schema: schema,
        eventCollections: _FormatUtils2.default.sortItems(_lodash2.default.keys(schema)),
        loading: false
      });
    }).catch(function (err) {
      console.error('Error fetching project collections: ', err.stack);
    });
  },

  fetchCollectionSchema: function fetchCollectionSchema(client, collectionName) {
    var project = _ProjectStore2.default.getProject();
    if (project.eventCollections.indexOf(collectionName) < 0) {
      return false;
    }
    ProjectActions.updateEventCollection(collectionName, {
      loading: true
    });
    return client.get(client.url('events', encodeURIComponent(collectionName))).auth(client.masterKey()).send().then(function (res) {
      ProjectActions.updateEventCollection(collectionName, {
        properties: res.properties,
        sortedProperties: _FormatUtils2.default.sortItems(_lodash2.default.keys(res.properties)),
        loading: false
      });
    }).catch(function (err) {
      console.error('Error fetching project collections: ', err.stack);
    });
  },

  updateEventCollection: function updateEventCollection(collectionName, updates) {
    var project = _ProjectStore2.default.getProject();
    _AppDispatcher2.default.dispatch({
      actionType: _ProjectConstants2.default.PROJECT_UPDATE_EVENT_COLLECTION,
      id: project.id,
      collectionName: collectionName,
      updates: updates
    });
  },

  fetchRecentEventsForCollection: function fetchRecentEventsForCollection(client, eventCollection) {
    var project = _ProjectStore2.default.getProject();
    ProjectActions.updateEventCollection(eventCollection, {
      loading: true
    });
    _ExplorerUtils2.default.runQuery({
      client: client,
      query: {
        event_collection: eventCollection,
        analysis_type: 'extraction',
        latest: 10
      },
      success: function success(res) {
        ProjectActions.updateEventCollection(eventCollection, {
          recentEvents: res.result
        });
      },
      error: function error(err) {
        console.error("Error requesting latest events for event collection: " + eventCollection, err.stack);
      },
      complete: function complete() {
        ProjectActions.updateEventCollection(eventCollection, {
          loading: false
        });
      }
    });
  }

};

exports.default = ProjectActions;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noticeExists(notice) {
  return notice && !_lodash2.default.isEmpty(notice);
}

var NoticeComponent = _react2.default.createClass({
  displayName: 'NoticeComponent',


  close: function close(event) {
    event.preventDefault();
    this.setState({ open: false });
    this.props.closeCallback();
  },

  getDefaultProps: function getDefaultProps() {
    return {
      notice: {},
      closeCallback: function closeCallback() {},
      closable: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: noticeExists(this.props.notice)
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ open: noticeExists(nextProps.notice) });
  },

  render: function render() {
    var classes = 'notice-component alert';
    if (!this.state.open) {
      classes += ' hide';
    }
    if (this.props.notice.type) {
      var type = this.props.notice.type;
      if (type === 'error') type = 'danger';
      classes += ' alert-' + type;
    } else {
      classes += ' alert-info';
    }

    var icon;
    if (this.props.notice.icon) {
      icon = _react2.default.createElement('span', { className: "icon glyphicon glyphicon-" + this.props.notice.icon });
    }

    var closeBtn;
    if (this.props.closable) {
      closeBtn = _react2.default.createElement(
        'button',
        { className: 'close', onClick: this.close },
        '\xD7'
      );
    }

    return _react2.default.createElement(
      'div',
      { className: classes, key: 'notice', ref: 'notice' },
      closeBtn,
      _react2.default.createElement(
        'p',
        null,
        icon,
        ' ',
        _react2.default.createElement(
          'strong',
          null,
          this.props.notice.text || ''
        )
      )
    );
  }

});

exports.default = NoticeComponent;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChartTypeUtils = {
  getQueryDataType: function getQueryDataType(query) {
    var isInterval = typeof query.interval === "string";
    var isGroupBy = typeof query.group_by === "string" || query.group_by instanceof Array && query.group_by.length === 1;
    var is2xGroupBy = query.group_by instanceof Array && query.group_by.length === 2;
    var dataType;

    if (query.analysis_type === "funnel") {
      dataType = 'cat-ordinal';
    } else if (query.analysis_type === "extraction") {
      dataType = 'extraction';
    } else if (query.analysis_type === "select_unique") {
      dataType = 'nominal';
    }

    // metric
    else if (!isGroupBy && !isInterval && !is2xGroupBy) {
        dataType = 'singular';
      }

      // group_by, no interval
      else if (isGroupBy && !isInterval) {
          dataType = 'categorical';
        }

        // interval, no group_by
        else if (isInterval && !isGroupBy && !is2xGroupBy) {
            dataType = 'chronological';
          }

          // interval, group_by
          else if (isInterval && (isGroupBy || is2xGroupBy)) {
              dataType = 'cat-chronological';
            }

            // 2x group_by
            // TODO: research possible dataType options
            else if (!isInterval && is2xGroupBy) {
                dataType = 'categorical';
              }

    return dataType;
  },

  getChartTypeOptions: function getChartTypeOptions(query) {
    var dataTypes = {
      'singular': ['metric'],
      'categorical': ['piechart', 'barchart', 'columnchart', 'table'],
      'cat-interval': ['columnchart', 'barchart', 'table'],
      'cat-ordinal': ['barchart', 'columnchart', 'areachart', 'linechart', 'table'],
      'chronological': ['areachart', 'linechart', 'table'],
      'cat-chronological': ['linechart', 'columnchart', 'barchart', 'areachart', 'table'],
      'nominal': ['table'],
      'extraction': ['table']
    };
    var queryDataType = ChartTypeUtils.getQueryDataType(query);
    return dataTypes[queryDataType].concat(['JSON']);
  },

  responseSupportsChartType: function responseSupportsChartType(query, chartType) {
    return _lodash2.default.includes(ChartTypeUtils.getChartTypeOptions(query), chartType);
  },

  isTableChartType: function isTableChartType(chartType) {
    return chartType == 'table';
  }
};

exports.default = ChartTypeUtils;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _SharedValidators = __webpack_require__(37);

var _SharedValidators2 = _interopRequireDefault(_SharedValidators);

var _StepValidations = __webpack_require__(38);

var _StepValidations2 = _interopRequireDefault(_StepValidations);

var _RunValidations = __webpack_require__(10);

var _RunValidations2 = _interopRequireDefault(_RunValidations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNotFunnel(model) {
  return model.query.analysis_type !== 'funnel';
}

exports.default = {

  analysis_type: {

    msg: 'Choose an Analysis Type.',

    validate: function validate(model) {
      return typeof model.query.analysis_type === 'string' && model.query.analysis_type.length > 0;
    }

  },

  event_collection: {

    msg: 'Choose an Event Collection.',

    shouldRun: isNotFunnel,

    validate: function validate(model) {
      return typeof model.query.event_collection === 'string' && model.query.event_collection.length > 0;
    }

  },

  target_property: {

    msg: 'Choose a Target Property.',

    shouldRun: function shouldRun(model) {
      return _ExplorerUtils2.default.shouldHaveTarget(model);
    },

    validate: function validate(model) {
      return typeof model.query.target_property === 'string' && model.query.target_property.length > 0;
    }

  },

  percentile_value: {

    msg: 'Choose a Percentile Value.',

    shouldRun: function shouldRun(model) {
      return model.query.analysis_type === 'percentile';
    },

    validate: function validate(model) {
      return model.query.percentile !== null && model.query.percentile !== '' && typeof model.query.percentile === 'number';
    }

  },

  filters: {

    shouldRun: isNotFunnel,

    msg: 'One of your filters is invalid.',

    validate: function validate(model) {
      return _SharedValidators2.default.filters(model.query.filters);
    }

  },

  steps: {

    msg: 'One of your funnel steps is invalid.',

    shouldRun: function shouldRun(model) {
      return model.query.analysis_type === 'funnel';
    },

    validate: function validate(model) {
      if (!model.query.steps) return false;
      var isValid = true;
      for (var i = 0; i < model.query.steps.length; i++) {
        _RunValidations2.default.run(_StepValidations2.default, model.query.steps[i]);
        if (!model.query.steps[i].isValid) isValid = false;
      }
      return isValid;
    }

  },

  time: {

    shouldRun: isNotFunnel,

    validate: function validate(model) {
      return _SharedValidators2.default.time(model.query.time);
    }

  },

  query_name: {

    msg: 'You must give your saved query a name.',

    shouldRun: function shouldRun(model) {
      return model.saving;
    },

    validate: function validate(model) {
      var name = model.query_name;
      return name !== null && name !== undefined && typeof name === "string" && name.length > 0;
    }

  },

  refresh_rate: {

    msg: 'Refresh rate must be between 4 and 24 hours.',

    validate: function validate(model) {
      var rate = model.refresh_rate;
      return typeof rate !== 'number' || rate >= 1440 && rate <= 86400 || rate == 0;
    }

  },

  email: {

    msg: 'A valid email address is required.',

    shouldRun: _ExplorerUtils2.default.isEmailExtraction,

    validate: function validate(model) {
      return new RegExp(/.+@.+\..+/i).test(model.query.email);
    }

  },

  latest: {

    msg: 'Latest must be a number.',

    shouldRun: _ExplorerUtils2.default.isEmailExtraction,

    validate: function validate(model) {
      var value = model.query.latest;
      if (!value) return true;
      var n = ~~Number(value);
      return String(n) === value && n >= 0;
    }

  }

};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * pickadate.js v3.5.4, 2014/09/11
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */

(function (factory) {

    // AMD.
    if (typeof define == 'function' && define.amd) define('picker', ['jquery'], factory);

    // Node.js/browserify.
    else if (( false ? undefined : _typeof(exports)) == 'object') module.exports = factory(__webpack_require__(30));

        // Browser globals.
        else this.Picker = factory(jQuery);
})(function ($) {

    var $window = $(window);
    var $document = $(document);
    var $html = $(document.documentElement);

    /**
     * The picker constructor that creates a blank picker.
     */
    function PickerConstructor(ELEMENT, NAME, COMPONENT, OPTIONS) {

        // If there’s no element, return the picker constructor.
        if (!ELEMENT) return PickerConstructor;

        var IS_DEFAULT_THEME = false,


        // The state of the picker.
        STATE = {
            id: ELEMENT.id || 'P' + Math.abs(~~(Math.random() * new Date()))
        },


        // Merge the defaults and options passed.
        SETTINGS = COMPONENT ? $.extend(true, {}, COMPONENT.defaults, OPTIONS) : OPTIONS || {},


        // Merge the default classes with the settings classes.
        CLASSES = $.extend({}, PickerConstructor.klasses(), SETTINGS.klass),


        // The element node wrapper into a jQuery object.
        $ELEMENT = $(ELEMENT),


        // Pseudo picker constructor.
        PickerInstance = function PickerInstance() {
            return this.start();
        },


        // The picker prototype.
        P = PickerInstance.prototype = {

            constructor: PickerInstance,

            $node: $ELEMENT,

            /**
             * Initialize everything
             */
            start: function start() {

                // If it’s already started, do nothing.
                if (STATE && STATE.start) return P;

                // Update the picker states.
                STATE.methods = {};
                STATE.start = true;
                STATE.open = false;
                STATE.type = ELEMENT.type;

                // Confirm focus state, convert into text input to remove UA stylings,
                // and set as readonly to prevent keyboard popup.
                ELEMENT.autofocus = ELEMENT == document.activeElement;
                ELEMENT.readOnly = !SETTINGS.editable;
                ELEMENT.id = ELEMENT.id || STATE.id;
                if (ELEMENT.type != 'text') {
                    ELEMENT.type = 'text';
                }

                // Create a new picker component with the settings.
                P.component = new COMPONENT(P, SETTINGS);

                // Create the picker root with a holder and then prepare it.
                P.$root = $(PickerConstructor._.node('div', createWrappedComponent(), CLASSES.picker, 'id="' + ELEMENT.id + '_root"'));
                prepareElementRoot();

                // If there’s a format for the hidden input element, create the element.
                if (SETTINGS.formatSubmit) {
                    prepareElementHidden();
                }

                // Prepare the input element.
                prepareElement();

                // Insert the root as specified in the settings.
                if (SETTINGS.container) $(SETTINGS.container).append(P.$root);else $ELEMENT.after(P.$root);

                // Bind the default component and settings events.
                P.on({
                    start: P.component.onStart,
                    render: P.component.onRender,
                    stop: P.component.onStop,
                    open: P.component.onOpen,
                    close: P.component.onClose,
                    set: P.component.onSet
                }).on({
                    start: SETTINGS.onStart,
                    render: SETTINGS.onRender,
                    stop: SETTINGS.onStop,
                    open: SETTINGS.onOpen,
                    close: SETTINGS.onClose,
                    set: SETTINGS.onSet
                });

                // Once we’re all set, check the theme in use.
                IS_DEFAULT_THEME = isUsingDefaultTheme(P.$root.children()[0]);

                // If the element has autofocus, open the picker.
                if (ELEMENT.autofocus) {
                    P.open();
                }

                // Trigger queued the “start” and “render” events.
                return P.trigger('start').trigger('render');
            }, //start


            /**
             * Render a new picker
             */
            render: function render(entireComponent) {

                // Insert a new component holder in the root or box.
                if (entireComponent) P.$root.html(createWrappedComponent());else P.$root.find('.' + CLASSES.box).html(P.component.nodes(STATE.open));

                // Trigger the queued “render” events.
                return P.trigger('render');
            }, //render


            /**
             * Destroy everything
             */
            stop: function stop() {

                // If it’s already stopped, do nothing.
                if (!STATE.start) return P;

                // Then close the picker.
                P.close();

                // Remove the hidden field.
                if (P._hidden) {
                    P._hidden.parentNode.removeChild(P._hidden);
                }

                // Remove the root.
                P.$root.remove();

                // Remove the input class, remove the stored data, and unbind
                // the events (after a tick for IE - see `P.close`).
                $ELEMENT.removeClass(CLASSES.input).removeData(NAME);
                setTimeout(function () {
                    $ELEMENT.off('.' + STATE.id);
                }, 0);

                // Restore the element state
                ELEMENT.type = STATE.type;
                ELEMENT.readOnly = false;

                // Trigger the queued “stop” events.
                P.trigger('stop');

                // Reset the picker states.
                STATE.methods = {};
                STATE.start = false;

                return P;
            }, //stop


            /**
             * Open up the picker
             */
            open: function open(dontGiveFocus) {

                // If it’s already open, do nothing.
                if (STATE.open) return P;

                // Add the “active” class.
                $ELEMENT.addClass(CLASSES.active);
                aria(ELEMENT, 'expanded', true);

                // * A Firefox bug, when `html` has `overflow:hidden`, results in
                //   killing transitions :(. So add the “opened” state on the next tick.
                //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
                setTimeout(function () {

                    // Add the “opened” class to the picker root.
                    P.$root.addClass(CLASSES.opened);
                    aria(P.$root[0], 'hidden', false);
                }, 0);

                // If we have to give focus, bind the element and doc events.
                if (dontGiveFocus !== false) {

                    // Set it as open.
                    STATE.open = true;

                    // Prevent the page from scrolling.
                    if (IS_DEFAULT_THEME) {
                        $html.css('overflow', 'hidden').css('padding-right', '+=' + getScrollbarWidth());
                    }

                    // Pass focus to the element’s jQuery object.
                    $ELEMENT.trigger('focus');

                    // Bind the document events.
                    $document.on('click.' + STATE.id + ' focusin.' + STATE.id, function (event) {

                        var target = event.target;

                        // If the target of the event is not the element, close the picker picker.
                        // * Don’t worry about clicks or focusins on the root because those don’t bubble up.
                        //   Also, for Firefox, a click on an `option` element bubbles up directly
                        //   to the doc. So make sure the target wasn't the doc.
                        // * In Firefox stopPropagation() doesn’t prevent right-click events from bubbling,
                        //   which causes the picker to unexpectedly close when right-clicking it. So make
                        //   sure the event wasn’t a right-click.
                        if (target != ELEMENT && target != document && event.which != 3) {

                            // If the target was the holder that covers the screen,
                            // keep the element focused to maintain tabindex.
                            P.close(target === P.$root.children()[0]);
                        }
                    }).on('keydown.' + STATE.id, function (event) {

                        var
                        // Get the keycode.
                        keycode = event.keyCode,


                        // Translate that to a selection change.
                        keycodeToMove = P.component.key[keycode],


                        // Grab the target.
                        target = event.target;

                        // On escape, close the picker and give focus.
                        if (keycode == 27) {
                            P.close(true);
                        }

                        // Check if there is a key movement or “enter” keypress on the element.
                        else if (target == ELEMENT && (keycodeToMove || keycode == 13)) {

                                // Prevent the default action to stop page movement.
                                event.preventDefault();

                                // Trigger the key movement action.
                                if (keycodeToMove) {
                                    PickerConstructor._.trigger(P.component.key.go, P, [PickerConstructor._.trigger(keycodeToMove)]);
                                }

                                // On “enter”, if the highlighted item isn’t disabled, set the value and close.
                                else if (!P.$root.find('.' + CLASSES.highlighted).hasClass(CLASSES.disabled)) {
                                        P.set('select', P.component.item.highlight).close();
                                    }
                            }

                            // If the target is within the root and “enter” is pressed,
                            // prevent the default action and trigger a click on the target instead.
                            else if ($.contains(P.$root[0], target) && keycode == 13) {
                                    event.preventDefault();
                                    target.click();
                                }
                    });
                }

                // Trigger the queued “open” events.
                return P.trigger('open');
            }, //open


            /**
             * Close the picker
             */
            close: function close(giveFocus) {

                // If we need to give focus, do it before changing states.
                if (giveFocus) {
                    // ....ah yes! It would’ve been incomplete without a crazy workaround for IE :|
                    // The focus is triggered *after* the close has completed - causing it
                    // to open again. So unbind and rebind the event at the next tick.
                    $ELEMENT.off('focus.' + STATE.id).trigger('focus');
                    setTimeout(function () {
                        $ELEMENT.on('focus.' + STATE.id, focusToOpen);
                    }, 0);
                }

                // Remove the “active” class.
                $ELEMENT.removeClass(CLASSES.active);
                aria(ELEMENT, 'expanded', false);

                // * A Firefox bug, when `html` has `overflow:hidden`, results in
                //   killing transitions :(. So remove the “opened” state on the next tick.
                //   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
                setTimeout(function () {

                    // Remove the “opened” and “focused” class from the picker root.
                    P.$root.removeClass(CLASSES.opened + ' ' + CLASSES.focused);
                    aria(P.$root[0], 'hidden', true);
                }, 0);

                // If it’s already closed, do nothing more.
                if (!STATE.open) return P;

                // Set it as closed.
                STATE.open = false;

                // Allow the page to scroll.
                if (IS_DEFAULT_THEME) {
                    $html.css('overflow', '').css('padding-right', '-=' + getScrollbarWidth());
                }

                // Unbind the document events.
                $document.off('.' + STATE.id);

                // Trigger the queued “close” events.
                return P.trigger('close');
            }, //close


            /**
             * Clear the values
             */
            clear: function clear(options) {
                return P.set('clear', null, options);
            }, //clear


            /**
             * Set something
             */
            set: function set(thing, value, options) {

                var thingItem,
                    thingValue,
                    thingIsObject = $.isPlainObject(thing),
                    thingObject = thingIsObject ? thing : {};

                // Make sure we have usable options.
                options = thingIsObject && $.isPlainObject(value) ? value : options || {};

                if (thing) {

                    // If the thing isn’t an object, make it one.
                    if (!thingIsObject) {
                        thingObject[thing] = value;
                    }

                    // Go through the things of items to set.
                    for (thingItem in thingObject) {

                        // Grab the value of the thing.
                        thingValue = thingObject[thingItem];

                        // First, if the item exists and there’s a value, set it.
                        if (thingItem in P.component.item) {
                            if (thingValue === undefined) thingValue = null;
                            P.component.set(thingItem, thingValue, options);
                        }

                        // Then, check to update the element value and broadcast a change.
                        if (thingItem == 'select' || thingItem == 'clear') {
                            $ELEMENT.val(thingItem == 'clear' ? '' : P.get(thingItem, SETTINGS.format)).trigger('change');
                        }
                    }

                    // Render a new picker.
                    P.render();
                }

                // When the method isn’t muted, trigger queued “set” events and pass the `thingObject`.
                return options.muted ? P : P.trigger('set', thingObject);
            }, //set


            /**
             * Get something
             */
            get: function get(thing, format) {

                // Make sure there’s something to get.
                thing = thing || 'value';

                // If a picker state exists, return that.
                if (STATE[thing] != null) {
                    return STATE[thing];
                }

                // Return the value, if that.
                if (thing == 'value') {
                    return ELEMENT.value;
                }

                // Check if a component item exists, return that.
                if (thing in P.component.item) {
                    if (typeof format == 'string') {
                        var thingValue = P.component.get(thing);
                        return thingValue ? PickerConstructor._.trigger(P.component.formats.toString, P.component, [format, thingValue]) : '';
                    }
                    return P.component.get(thing);
                }
            }, //get


            /**
             * Bind events on the things.
             */
            on: function on(thing, method, internal) {

                var thingName,
                    thingMethod,
                    thingIsObject = $.isPlainObject(thing),
                    thingObject = thingIsObject ? thing : {};

                if (thing) {

                    // If the thing isn’t an object, make it one.
                    if (!thingIsObject) {
                        thingObject[thing] = method;
                    }

                    // Go through the things to bind to.
                    for (thingName in thingObject) {

                        // Grab the method of the thing.
                        thingMethod = thingObject[thingName];

                        // If it was an internal binding, prefix it.
                        if (internal) {
                            thingName = '_' + thingName;
                        }

                        // Make sure the thing methods collection exists.
                        STATE.methods[thingName] = STATE.methods[thingName] || [];

                        // Add the method to the relative method collection.
                        STATE.methods[thingName].push(thingMethod);
                    }
                }

                return P;
            }, //on


            /**
             * Unbind events on the things.
             */
            off: function off() {
                var i,
                    thingName,
                    names = arguments;
                for (i = 0, namesCount = names.length; i < namesCount; i += 1) {
                    thingName = names[i];
                    if (thingName in STATE.methods) {
                        delete STATE.methods[thingName];
                    }
                }
                return P;
            },

            /**
             * Fire off method events.
             */
            trigger: function trigger(name, data) {
                var _trigger = function _trigger(name) {
                    var methodList = STATE.methods[name];
                    if (methodList) {
                        methodList.map(function (method) {
                            PickerConstructor._.trigger(method, P, [data]);
                        });
                    }
                };
                _trigger('_' + name);
                _trigger(name);
                return P;
            } //trigger
            //PickerInstance.prototype


            /**
             * Wrap the picker holder components together.
             */
        };function createWrappedComponent() {

            // Create a picker wrapper holder
            return PickerConstructor._.node('div',

            // Create a picker wrapper node
            PickerConstructor._.node('div',

            // Create a picker frame
            PickerConstructor._.node('div',

            // Create a picker box node
            PickerConstructor._.node('div',

            // Create the components nodes.
            P.component.nodes(STATE.open),

            // The picker box class
            CLASSES.box),

            // Picker wrap class
            CLASSES.wrap),

            // Picker frame class
            CLASSES.frame),

            // Picker holder class
            CLASSES.holder); //endreturn
        } //createWrappedComponent


        /**
         * Prepare the input element with all bindings.
         */
        function prepareElement() {

            $ELEMENT.

            // Store the picker data by component name.
            data(NAME, P).

            // Add the “input” class name.
            addClass(CLASSES.input).

            // If there’s a `data-value`, update the value of the element.
            val($ELEMENT.data('value') ? P.get('select', SETTINGS.format) : ELEMENT.value).

            // On focus/click, open the picker and adjust the root “focused” state.
            on('focus.' + STATE.id + ' click.' + STATE.id, focusToOpen);

            // Only bind keydown events if the element isn’t editable.
            if (!SETTINGS.editable) {

                // Handle keyboard event based on the picker being opened or not.
                $ELEMENT.on('keydown.' + STATE.id, function (event) {

                    var keycode = event.keyCode,


                    // Check if one of the delete keys was pressed.
                    isKeycodeDelete = /^(8|46)$/.test(keycode);

                    // For some reason IE clears the input value on “escape”.
                    if (keycode == 27) {
                        P.close();
                        return false;
                    }

                    // Check if `space` or `delete` was pressed or the picker is closed with a key movement.
                    if (keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode]) {

                        // Prevent it from moving the page and bubbling to doc.
                        event.preventDefault();
                        event.stopPropagation();

                        // If `delete` was pressed, clear the values and close the picker.
                        // Otherwise open the picker.
                        if (isKeycodeDelete) {
                            P.clear().close();
                        } else {
                            P.open();
                        }
                    }
                });
            }

            // Update the aria attributes.
            aria(ELEMENT, {
                haspopup: true,
                expanded: false,
                readonly: false,
                owns: ELEMENT.id + '_root' + (P._hidden ? ' ' + P._hidden.id : '')
            });
        }

        /**
         * Prepare the root picker element with all bindings.
         */
        function prepareElementRoot() {

            P.$root.on({

                // When something within the root is focused, stop from bubbling
                // to the doc and remove the “focused” state from the root.
                focusin: function focusin(event) {
                    P.$root.removeClass(CLASSES.focused);
                    event.stopPropagation();
                },

                // When something within the root holder is clicked, stop it
                // from bubbling to the doc.
                'mousedown click': function mousedownClick(event) {

                    var target = event.target;

                    // Make sure the target isn’t the root holder so it can bubble up.
                    if (target != P.$root.children()[0]) {

                        event.stopPropagation();

                        // * For mousedown events, cancel the default action in order to
                        //   prevent cases where focus is shifted onto external elements
                        //   when using things like jQuery mobile or MagnificPopup (ref: #249 & #120).
                        //   Also, for Firefox, don’t prevent action on the `option` element.
                        if (event.type == 'mousedown' && !$(target).is(':input') && target.nodeName != 'OPTION') {

                            event.preventDefault();

                            // Re-focus onto the element so that users can click away
                            // from elements focused within the picker.
                            ELEMENT.focus();
                        }
                    }
                }
            }).

            // If there’s a click on an actionable element, carry out the actions.
            on('click', '[data-pick], [data-nav], [data-clear], [data-close]', function () {

                var $target = $(this),
                    targetData = $target.data(),
                    targetDisabled = $target.hasClass(CLASSES.navDisabled) || $target.hasClass(CLASSES.disabled),


                // * For IE, non-focusable elements can be active elements as well
                //   (http://stackoverflow.com/a/2684561).
                activeElement = document.activeElement;
                activeElement = activeElement && (activeElement.type || activeElement.href) && activeElement;

                // If it’s disabled or nothing inside is actively focused, re-focus the element.
                if (targetDisabled || activeElement && !$.contains(P.$root[0], activeElement)) {
                    ELEMENT.focus();
                }

                // If something is superficially changed, update the `highlight` based on the `nav`.
                if (!targetDisabled && targetData.nav) {
                    P.set('highlight', P.component.item.highlight, { nav: targetData.nav });
                }

                // If something is picked, set `select` then close with focus.
                else if (!targetDisabled && 'pick' in targetData) {
                        P.set('select', targetData.pick).close(true);
                    }

                    // If a “clear” button is pressed, empty the values and close with focus.
                    else if (targetData.clear) {
                            P.clear().close(true);
                        } else if (targetData.close) {
                            P.close(true);
                        }
            }); //P.$root

            aria(P.$root[0], 'hidden', true);
        }

        /**
         * Prepare the hidden input element along with all bindings.
         */
        function prepareElementHidden() {

            var name;

            if (SETTINGS.hiddenName === true) {
                name = ELEMENT.name;
                ELEMENT.name = '';
            } else {
                name = [typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '', typeof SETTINGS.hiddenSuffix == 'string' ? SETTINGS.hiddenSuffix : '_submit'];
                name = name[0] + ELEMENT.name + name[1];
            }

            P._hidden = $('<input ' + 'type=hidden ' +

            // Create the name using the original input’s with a prefix and suffix.
            'name="' + name + '"' + (

            // If the element has a value, set the hidden value as well.
            $ELEMENT.data('value') || ELEMENT.value ? ' value="' + P.get('select', SETTINGS.formatSubmit) + '"' : '') + '>')[0];

            $ELEMENT.

            // If the value changes, update the hidden input with the correct format.
            on('change.' + STATE.id, function () {
                P._hidden.value = ELEMENT.value ? P.get('select', SETTINGS.formatSubmit) : '';
            }).

            // Insert the hidden input after the element.
            after(P._hidden);
        }

        // Separated for IE
        function focusToOpen(event) {

            // Stop the event from propagating to the doc.
            event.stopPropagation();

            // If it’s a focus event, add the “focused” class to the root.
            if (event.type == 'focus') {
                P.$root.addClass(CLASSES.focused);
            }

            // And then finally open the picker.
            P.open();
        }

        // Return a new picker instance.
        return new PickerInstance();
    } //PickerConstructor


    /**
     * The default classes and prefix to use for the HTML classes.
     */
    PickerConstructor.klasses = function (prefix) {
        prefix = prefix || 'picker';
        return {

            picker: prefix,
            opened: prefix + '--opened',
            focused: prefix + '--focused',

            input: prefix + '__input',
            active: prefix + '__input--active',

            holder: prefix + '__holder',

            frame: prefix + '__frame',
            wrap: prefix + '__wrap',

            box: prefix + '__box'
        };
    }; //PickerConstructor.klasses


    /**
     * Check if the default theme is being used.
     */
    function isUsingDefaultTheme(element) {

        var theme,
            prop = 'position';

        // For IE.
        if (element.currentStyle) {
            theme = element.currentStyle[prop];
        }

        // For normal browsers.
        else if (window.getComputedStyle) {
                theme = getComputedStyle(element)[prop];
            }

        return theme == 'fixed';
    }

    /**
     * Get the width of the browser’s scrollbar.
     * Taken from: https://github.com/VodkaBears/Remodal/blob/master/src/jquery.remodal.js
     */
    function getScrollbarWidth() {

        if ($html.height() <= $window.height()) {
            return 0;
        }

        var $outer = $('<div style="visibility:hidden;width:100px" />').appendTo('body');

        // Get the width without scrollbars.
        var widthWithoutScroll = $outer[0].offsetWidth;

        // Force adding scrollbars.
        $outer.css('overflow', 'scroll');

        // Add the inner div.
        var $inner = $('<div style="width:100%" />').appendTo($outer);

        // Get the width with scrollbars.
        var widthWithScroll = $inner[0].offsetWidth;

        // Remove the divs.
        $outer.remove();

        // Return the difference between the widths.
        return widthWithoutScroll - widthWithScroll;
    }

    /**
     * PickerConstructor helper methods.
     */
    PickerConstructor._ = {

        /**
         * Create a group of nodes. Expects:
         * `
            {
                min:    {Integer},
                max:    {Integer},
                i:      {Integer},
                node:   {String},
                item:   {Function}
            }
         * `
         */
        group: function group(groupObject) {

            var
            // Scope for the looped object
            loopObjectScope,


            // Create the nodes list
            nodesList = '',


            // The counter starts from the `min`
            counter = PickerConstructor._.trigger(groupObject.min, groupObject);

            // Loop from the `min` to `max`, incrementing by `i`
            for (; counter <= PickerConstructor._.trigger(groupObject.max, groupObject, [counter]); counter += groupObject.i) {

                // Trigger the `item` function within scope of the object
                loopObjectScope = PickerConstructor._.trigger(groupObject.item, groupObject, [counter]);

                // Splice the subgroup and create nodes out of the sub nodes
                nodesList += PickerConstructor._.node(groupObject.node, loopObjectScope[0], // the node
                loopObjectScope[1], // the classes
                loopObjectScope[2] // the attributes
                );
            }

            // Return the list of nodes
            return nodesList;
        }, //group


        /**
         * Create a dom node string
         */
        node: function node(wrapper, item, klass, attribute) {

            // If the item is false-y, just return an empty string
            if (!item) return '';

            // If the item is an array, do a join
            item = $.isArray(item) ? item.join('') : item;

            // Check for the class
            klass = klass ? ' class="' + klass + '"' : '';

            // Check for any attributes
            attribute = attribute ? ' ' + attribute : '';

            // Return the wrapped item
            return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>';
        }, //node


        /**
         * Lead numbers below 10 with a zero.
         */
        lead: function lead(number) {
            return (number < 10 ? '0' : '') + number;
        },

        /**
         * Trigger a function otherwise return the value.
         */
        trigger: function trigger(callback, scope, args) {
            return typeof callback == 'function' ? callback.apply(scope, args || []) : callback;
        },

        /**
         * If the second character is a digit, length is 2 otherwise 1.
         */
        digits: function digits(string) {
            return (/\d/.test(string[1]) ? 2 : 1
            );
        },

        /**
         * Tell if something is a date object.
         */
        isDate: function isDate(value) {
            return {}.toString.call(value).indexOf('Date') > -1 && this.isInteger(value.getUTCDate());
        },

        /**
         * Tell if something is an integer.
         */
        isInteger: function isInteger(value) {
            return {}.toString.call(value).indexOf('Number') > -1 && value % 1 === 0;
        },

        /**
         * Create ARIA attribute strings.
         */
        ariaAttr: ariaAttr //PickerConstructor._


        /**
         * Extend the picker with a component and defaults.
         */
    };PickerConstructor.extend = function (name, Component) {

        // Extend jQuery.
        $.fn[name] = function (options, action) {

            // Grab the component data.
            var componentData = this.data(name);

            // If the picker is requested, return the data object.
            if (options == 'picker') {
                return componentData;
            }

            // If the component data exists and `options` is a string, carry out the action.
            if (componentData && typeof options == 'string') {
                return PickerConstructor._.trigger(componentData[options], componentData, [action]);
            }

            // Otherwise go through each matched element and if the component
            // doesn’t exist, create a new picker using `this` element
            // and merging the defaults and options with a deep copy.
            return this.each(function () {
                var $this = $(this);
                if (!$this.data(name)) {
                    new PickerConstructor(this, name, Component, options);
                }
            });
        };

        // Set the defaults.
        $.fn[name].defaults = Component.defaults;
    }; //PickerConstructor.extend


    function aria(element, attribute, value) {
        if ($.isPlainObject(attribute)) {
            for (var key in attribute) {
                ariaSet(element, key, attribute[key]);
            }
        } else {
            ariaSet(element, attribute, value);
        }
    }
    function ariaSet(element, attribute, value) {
        element.setAttribute((attribute == 'role' ? '' : 'aria-') + attribute, value);
    }
    function ariaAttr(attribute, data) {
        if (!$.isPlainObject(attribute)) {
            attribute = { attribute: data };
        }
        data = '';
        for (var key in attribute) {
            var attr = (key == 'role' ? '' : 'aria-') + key,
                attrVal = attribute[key];
            data += attrVal == null ? '' : attr + '="' + attribute[key] + '"';
        }
        return data;
    }

    // Expose the picker constructor.
    return PickerConstructor;
});


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__30__;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__31__;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__32__;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keymirror = __webpack_require__(19);

var _keymirror2 = _interopRequireDefault(_keymirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _keymirror2.default)({
  PROJECT_CREATE: null,
  PROJECT_UPDATE: null,
  PROJECT_UPDATE_EVENT_COLLECTION: null
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _AppDispatcher = __webpack_require__(8);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _events = __webpack_require__(18);

var _AppStateConstants = __webpack_require__(35);

var _AppStateConstants2 = _interopRequireDefault(_AppStateConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHANGE_EVENT = 'change';

function defaultState() {
  return {
    fetchingPersistedExplorers: false,
    codeSampleHidden: true,
    ready: false,
    isLimited: false
  };
}

var _appState = defaultState();

function _update(updates) {
  _appState = _lodash2.default.assign({}, _appState, updates);
}

function _reset() {
  _appState = defaultState();
}

var AppStateStore = _lodash2.default.assign({}, _events.EventEmitter.prototype, {
  unregisterWithDispatcher: function unregisterWithDispatcher() {
    _AppDispatcher2.default.unregister(this.dispatchToken);
  },

  getState: function getState() {
    return _appState;
  },

  getLimit: function getLimit() {
    return _appState.isLimited;
  },

  reset: function reset() {
    _reset();
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppStateStore.dispatchToken = _AppDispatcher2.default.register(function (action) {
  switch (action.actionType) {
    case _AppStateConstants2.default.APP_STATE_UPDATE:
      _update(action.updates);
      AppStateStore.emitChange();
      break;

    case _AppStateConstants2.default.APP_STATE_RESET:
      _reset();
      AppStateStore.emitChange();
      break;

    default:
    // no op
  }

  return true;
});

exports.default = AppStateStore;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keymirror = __webpack_require__(19);

var _keymirror2 = _interopRequireDefault(_keymirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _keymirror2.default)({
  APP_STATE_UPDATE: null,
  APP_STATE_RESET: null
});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = _react2.default.createClass({
  displayName: 'Modal',


  closeClick: function closeClick(event) {
    event.preventDefault();
    this.close();
  },

  backdropClick: function backdropClick(event) {
    if (!$(event.target).closest('.modal-dialog').length) {
      this.close();
    }
  },

  close: function close() {
    if (this.state.open) {
      this.removeBackdrop();
      this.setState({ open: false });
      this.props.onClose();
    }
  },

  open: function open() {
    if (!this.state.open) {
      this.addBackdrop();
      this.setState({ open: true });
      this.props.onOpen();
    }
  },

  setLoading: function setLoading(value) {
    if (typeof value === "boolean") {
      this.setState({ loading: value });
    }
  },

  addBackdrop: function addBackdrop() {
    $('body').addClass('modal-open');

    var backdropEl = document.createElement('div');
    backdropEl.id = 'modal-backdrop';
    backdropEl.className = 'modal-backdrop in';
    document.body.appendChild(backdropEl);
  },

  removeBackdrop: function removeBackdrop() {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  },

  buildFooter: function buildFooter() {
    if (this.props.footerBtns.length) {
      var footerBtns = _lodash2.default.map(this.props.footerBtns, _lodash2.default.bind(function (btnConfig, index) {
        var text = btnConfig.text;

        var classes = 'btn';
        if (btnConfig.classes) {
          classes = classes + ' ' + btnConfig.classes;
        } else {
          classes = classes + ' btn-default';
        }

        var icon;
        if (btnConfig.iconName) {
          var iconClass = 'icon glyphicon glyphicon-' + btnConfig.iconName;
          var icon = _react2.default.createElement('span', { className: iconClass });
        }

        return _react2.default.createElement(
          'button',
          { type: 'button', ref: btnConfig.ref || '', className: classes, onClick: btnConfig.onClick || this.close, key: index },
          icon,
          text
        );
      }, this));

      return _react2.default.createElement(
        'div',
        { className: 'modal-footer' },
        footerBtns
      );
    }
  },

  // Lifecycle hooks

  getInitialState: function getInitialState() {
    return {
      open: false,
      loading: false
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      size: 'small',
      modalClasses: '',
      footerBtns: [],
      onOpen: function onOpen() {},
      onClose: function onClose() {}
    };
  },

  componentDidMount: function componentDidMount() {
    $(document).on('click', '.modal.block', _lodash2.default.bind(this.backdropClick, this));
    $(document).on('keyup', _lodash2.default.bind(function (e) {
      // Escapism?
      if (e.keyCode === 27 && e.target.className.indexOf('react-select-input') < 0) {
        this.close();
      }
    }, this));
  },

  componentWillUnmount: function componentWillUnmount() {
    $(document).off('click', '.modal-backdrop');
  },

  render: function render() {
    var modalClasses = this.props.modalClasses + ' modal';
    if (this.state.open) {
      modalClasses += ' block';
    }
    var modalDialogClasses = (0, _classnames2.default)({
      'modal-dialog': true,
      'modal-lg': this.props.size === 'large'
    });

    var titleIcon;
    if (this.props.titleIcon) {
      var titleIconClasses = "icon glyphicon glyphicon-" + this.props.titleIcon;
      if (!this.props.title) titleIconClasses += " big no-margin";
      if (this.props.iconClasses) titleIconClasses = titleIconClasses + " " + this.props.iconClasses;
      titleIcon = _react2.default.createElement('span', { className: titleIconClasses });
    }

    return _react2.default.createElement(
      'div',
      { className: modalClasses },
      _react2.default.createElement(
        'div',
        { className: modalDialogClasses },
        _react2.default.createElement(
          'div',
          { className: 'modal-content' },
          _react2.default.createElement(
            'div',
            { className: 'modal-header' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'close', onClick: this.closeClick },
              _react2.default.createElement(
                'span',
                { 'aria-hidden': 'true' },
                '\xD7'
              ),
              _react2.default.createElement(
                'span',
                { className: 'sr-only' },
                'Close'
              )
            ),
            _react2.default.createElement(
              'h3',
              { className: 'modal-title' },
              titleIcon,
              this.props.title
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-body' },
            this.props.children
          ),
          this.buildFooter()
        )
      )
    );
  }
});

exports.default = Modal;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _RunValidations = __webpack_require__(10);

var _RunValidations2 = _interopRequireDefault(_RunValidations);

var _FilterValidations = __webpack_require__(23);

var _FilterValidations2 = _interopRequireDefault(_FilterValidations);

var _TimeframeUtils = __webpack_require__(14);

var _TimeframeUtils2 = _interopRequireDefault(_TimeframeUtils);

var _FilterUtils = __webpack_require__(7);

var _FilterUtils2 = _interopRequireDefault(_FilterUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  filters: function filters(_filters) {
    if (!_filters || _lodash2.default.isArray(_filters) && !_filters.length) return true;
    var isValid = true;
    for (var i = 0; i < _filters.length; i++) {
      if (!_FilterUtils2.default.isComplete(_filters[i])) continue;
      _RunValidations2.default.run(_FilterValidations2.default, _filters[i]);
      if (!_filters[i].isValid) isValid = false;
    }
    return isValid;
  },

  time: function time(_time) {
    var defaultError = "You must provide a timeframe.";

    if (!_time) return defaultError;
    if (_TimeframeUtils2.default.timeframeType(_time) === 'relative') {
      if (_time.relativity && _time.amount && _time.sub_timeframe) return true;
      return "You must choose all 3 options for relative timeframes.";
    }
    if (_TimeframeUtils2.default.timeframeType(_time) === 'absolute') {
      if (_time.start && _time.end) return true;
      return "You must provide a start and end time for absolute timeframes.";
    }

    return defaultError;
  }

};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

var _SharedValidators = __webpack_require__(37);

var _SharedValidators2 = _interopRequireDefault(_SharedValidators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  event_collection: {

    msg: 'Choose an Event Collection.',

    validate: function validate(model) {
      return typeof model.event_collection === 'string' && model.event_collection.length > 0;
    }

  },

  actor_property: {

    msg: 'You must select an actor property',

    validate: function validate(model) {
      return typeof model.actor_property === 'string' && model.actor_property.length > 0;
    }

  },

  time: {

    validate: function validate(model) {
      return _SharedValidators2.default.time(model.time);
    }

  },

  filters: {

    msg: 'One of your filters is invalid.',

    validate: function validate(model) {
      return _SharedValidators2.default.filters(model.filters);
    }

  },

  optional: {

    msg: 'You must select whether this step is optional.',

    validate: function validate(model) {
      if (_FormatUtils2.default.isNullOrUndefined(model.optional)) return false;
      return typeof model.optional === 'boolean';
    }

  },

  inverted: {

    msg: 'You must select whether this step is inverted.',

    validate: function validate(model) {
      if (_FormatUtils2.default.isNullOrUndefined(model.inverted)) return false;
      return typeof model.inverted === 'boolean';
    }

  },

  with_actors: {

    msg: '"with_actors" must be set to either true or false',

    validate: function validate(model) {
      if (_FormatUtils2.default.isNullOrUndefined(model.with_actors)) return false;
      return typeof model.with_actors === 'boolean';
    }

  }

};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keymirror = __webpack_require__(19);

var _keymirror2 = _interopRequireDefault(_keymirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _keymirror2.default)({
  NOTICE_CREATE: null,
  NOTICE_CLEAR_ALL: null
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AppStateActions = __webpack_require__(22);

var _AppStateActions2 = _interopRequireDefault(_AppStateActions);

var _ProjectStore = __webpack_require__(11);

var _ProjectStore2 = _interopRequireDefault(_ProjectStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  checkLimits: function checkLimits() {
    var client = _ProjectStore2.default.getProject().client;
    var url = client.url('/3.0/projects/{projectId}/organization-usage', { api_key: client.config.masterKey });
    fetch(url).then(function (resp) {
      return resp.json();
    }).then(function (data) {
      if (data) {
        var _data$cached_queries = data.cached_queries,
            limited = _data$cached_queries.limited,
            limit = _data$cached_queries.limit,
            current_usage = _data$cached_queries.current_usage;

        if (limited, current_usage >= limit) {
          _AppStateActions2.default.update({ isLimited: true });
        } else {
          _AppStateActions2.default.update({ isLimited: false });
        }
      } else {
        throw new Error("Problem with fetching query limits");
      }
    });
  }
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryActions = _react2.default.createClass({
  displayName: 'QueryActions',


  runBtnStates: {
    default: {
      inactive: 'Run Query',
      active: 'Running...'
    },
    immediateExtraction: {
      inactive: 'Run Extraction',
      active: 'Running...'
    },
    emailExtraction: {
      inactive: 'Send Email Extraction',
      active: 'Sending...'
    }
  },

  runButtonText: function runButtonText() {
    var btnStates = this.runBtnStates.default;

    if (_ExplorerUtils2.default.isEmailExtraction(this.props.model)) {
      btnStates = this.runBtnStates.emailExtraction;
    } else if (_ExplorerUtils2.default.isImmediateExtraction(this.props.model)) {
      btnStates = this.runBtnStates.immediateExtraction;
    }

    return this.props.model.loading ? btnStates.active : btnStates.inactive;
  },

  render: function render() {
    var saveMsg,
        saveBtn,
        cloneBtn,
        deleteBtn,
        actionsSupported = true,
        runButtonClasses = (0, _classnames2.default)({
      'disabled': this.props.model.loading,
      'btn btn-primary run-query': true
    }),
        codeSampleBtnClasses = (0, _classnames2.default)({
      'btn btn-default code-sample-toggle pull-right': true,
      'open': !this.props.codeSampleHidden
    });

    var isEmailExtraction = _ExplorerUtils2.default.isEmailExtraction(this.props.model);
    var isPersisted = _ExplorerUtils2.default.isPersisted(this.props.model);
    var isFunnel = this.props.model.query.analysis_type === 'funnel';

    if (this.props.persistence) {
      if (isEmailExtraction) {
        actionsSupported = false;
        saveMsg = _react2.default.createElement(
          'p',
          { className: 'no-margin margin-top-tiny' },
          _react2.default.createElement(
            'small',
            null,
            'The Keen IO API currently does not support saving email extraction.'
          )
        );
      }
      saveBtn = _react2.default.createElement(
        'button',
        { type: 'button', className: 'btn btn-success save-query', onClick: actionsSupported ? this.props.saveQueryClick : function () {}, role: 'save-query', disabled: this.props.model.loading || !actionsSupported },
        isPersisted ? 'Update' : 'Save'
      );
      deleteBtn = _react2.default.createElement(
        'button',
        { type: 'button', role: 'delete-query', className: 'btn btn-link', onClick: actionsSupported ? this.props.removeClick : function () {}, disabled: !actionsSupported },
        'Delete'
      );
      if (isPersisted) {
        cloneBtn = _react2.default.createElement(
          'button',
          { type: 'button', className: 'btn btn-default', onClick: actionsSupported ? this.props.cloneQueryClick : function () {}, role: 'clone-query', disabled: this.props.model.loading || !actionsSupported },
          'Clone'
        );
      }
    }

    return _react2.default.createElement(
      'div',
      { className: 'query-actions clearfix' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-md-10 clearfix' },
          _react2.default.createElement(
            'div',
            { className: 'run-group pull-left' },
            _react2.default.createElement(
              'button',
              { type: 'submit', role: 'run-query', className: runButtonClasses, id: 'run-query', onClick: this.props.handleQuerySubmit },
              this.runButtonText()
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'manage-group pull-left' },
            saveBtn,
            cloneBtn,
            deleteBtn
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-md-2' },
          _react2.default.createElement(
            'button',
            { className: codeSampleBtnClasses, role: 'toggle-code-sample', onClick: this.props.toggleCodeSample },
            _react2.default.createElement(
              'span',
              null,
              '</> Embed'
            )
          )
        )
      ),
      saveMsg
    );
  }

});

exports.default = QueryActions;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _react_select = __webpack_require__(13);

var _react_select2 = _interopRequireDefault(_react_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectField = _react2.default.createClass({
  displayName: 'SelectField',


  getDefaultProps: function getDefaultProps() {
    return {
      sort: false,
      inputClasses: []
    };
  },

  buildBrowseEventsLink: function buildBrowseEventsLink() {
    if (this.props.onBrowseEvents) {
      return _react2.default.createElement(
        'button',
        { className: 'btn btn-link field-secondary-control', title: 'Browse event collections', type: 'button', onClick: this.props.onBrowseEvents, id: 'browse-event-collections' },
        _react2.default.createElement('span', { className: 'icon glyphicon glyphicon-search' }),
        ' Preview collections'
      );
    }
  },

  // React methods

  render: function render() {
    var requiredNote = this.props.requiredLabel ? _react2.default.createElement(
      'small',
      null,
      '(required)'
    ) : null;

    return _react2.default.createElement(
      'div',
      { className: 'field-component' },
      _react2.default.createElement(
        'label',
        { htmlFor: this.props.name },
        this.props.label,
        ' ',
        requiredNote
      ),
      _react2.default.createElement(_react_select2.default, { ref: 'select',
        name: this.props.name,
        inputClasses: this.props.inputClasses.join(' ') + ' form-control',
        items: this.props.options,
        handleChange: this.props.handleChange,
        value: this.props.value,
        sort: this.props.sort }),
      this.buildBrowseEventsLink()
    );
  }

});

// Components
exports.default = SelectField;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = __webpack_require__(6);

var _moment2 = _interopRequireDefault(_moment);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _absolute_picker = __webpack_require__(77);

var _absolute_picker2 = _interopRequireDefault(_absolute_picker);

var _relative_picker = __webpack_require__(80);

var _relative_picker2 = _interopRequireDefault(_relative_picker);

var _fields_toggle = __webpack_require__(16);

var _fields_toggle2 = _interopRequireDefault(_fields_toggle);

var _react_select = __webpack_require__(13);

var _react_select2 = _interopRequireDefault(_react_select);

var _timezone = __webpack_require__(81);

var _timezone2 = _interopRequireDefault(_timezone);

var _ExplorerActions = __webpack_require__(5);

var _ExplorerActions2 = _interopRequireDefault(_ExplorerActions);

var _TimeframeUtils = __webpack_require__(14);

var _TimeframeUtils2 = _interopRequireDefault(_TimeframeUtils);

var _ProjectUtils = __webpack_require__(4);

var _ProjectUtils2 = _interopRequireDefault(_ProjectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function relativeDefaults() {
  return {
    relativity: 'this',
    amount: '14',
    sub_timeframe: 'days'
  };
}

function absoluteDefaults() {
  return {
    start: new Date((0, _moment2.default)().subtract(1, 'days').startOf('day').format()),
    end: new Date((0, _moment2.default)().startOf('day').format())
  };
}

var Timeframe = _react2.default.createClass({
  displayName: 'Timeframe',


  toggleTimeframeType: function toggleTimeframeType(event) {
    event.preventDefault();
    var type = event.currentTarget.dataset.type;

    this.props.handleChange('time', type === 'absolute' ? absoluteDefaults() : relativeDefaults());
  },

  isAbsolute: function isAbsolute() {
    return _TimeframeUtils2.default.timeframeType(this.props.time) === 'absolute';
  },

  isRelative: function isRelative() {
    return _TimeframeUtils2.default.timeframeType(this.props.time) === 'relative';
  },

  // React Methods

  render: function render() {
    var timezone = this.props.timezone || _ProjectUtils2.default.getConstant('DEFAULT_TIMEZONE');

    if (this.isAbsolute()) {
      var timeframePicker = _react2.default.createElement(_absolute_picker2.default, { time: this.props.time,
        handleChange: this.props.handleChange });
    } else {
      var timeframePicker = _react2.default.createElement(_relative_picker2.default, { relativeIntervalTypes: _ProjectUtils2.default.getConstant('RELATIVE_INTERVAL_TYPES'),
        time: this.props.time,
        handleChange: this.props.handleChange });
    }

    return _react2.default.createElement(
      'div',
      { className: 'timeframe' },
      _react2.default.createElement(
        'div',
        { className: 'field-component' },
        _react2.default.createElement(
          'label',
          null,
          'Timeframe'
        ),
        _react2.default.createElement(
          'ul',
          { className: 'nav nav-pills', role: 'tablist' },
          _react2.default.createElement(
            'li',
            { className: this.isRelative() ? 'active' : '' },
            _react2.default.createElement(
              'a',
              { href: '#', className: 'relative-tab', 'data-type': 'relative', onClick: this.toggleTimeframeType },
              'Relative'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: this.isAbsolute() ? 'active' : '' },
            _react2.default.createElement(
              'a',
              { href: '#', className: 'absolute-tab', 'data-type': 'absolute', onClick: this.toggleTimeframeType },
              'Absolute'
            )
          )
        ),
        timeframePicker,
        _react2.default.createElement(_timezone2.default, { timezone: this.props.timezone,
          timeframe_type: _TimeframeUtils2.default.timeframeType(this.props.time),
          handleChange: this.props.handleChange })
      )
    );
  }
});

exports.default = Timeframe;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__(6);

var _moment2 = _interopRequireDefault(_moment);

var _picker = __webpack_require__(29);

var _picker2 = _interopRequireDefault(_picker);

__webpack_require__(78);

__webpack_require__(79);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Datepicker = _react2.default.createClass({
  displayName: 'Datepicker',


  handleOnBlur: function handleOnBlur(event) {
    this.destroyPicker();
    var value = event.target.value;
    var isValid = (0, _moment2.default)(new Date(value)).isValid();

    if (isValid) {
      this.props.onBlur(event);
      this.setState({ errorMsg: false });
    } else if (value && !isValid) {
      this.setState({ errorMsg: 'Invalid' });
    }
  },

  onFocus: function onFocus() {
    var minimum = this.props.minimum;
    $(this.refs[this.props.refValue]).pickadate({
      format: 'mmm d, yyyy',
      editable: true,
      min: minimum,
      onSet: _lodash2.default.bind(function (args) {
        this.props.onSet(this.props.name, new Date(this.refs.datepicker.value));
      }, this)
    });
  },

  destroyPicker: function destroyPicker() {
    var picker = $(this.refs[this.props.refValue]).pickadate('picker');
    if (picker) picker.stop();
  },

  // React methods

  getInitialState: function getInitialState() {
    return {
      errorMsg: false
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      refValue: 'datepicker',
      label: false,
      onChange: function onChange() {},
      placeholder: '',
      classes: 'datepicker-wrapper form-group',
      onSet: function onSet() {}
    };
  },

  render: function render() {
    var label = this.props.label ? _react2.default.createElement(
      'label',
      { htmlFor: this.props.name },
      this.props.label
    ) : null;
    var errorMsg = this.state.errorMsg ? _react2.default.createElement(
      'p',
      null,
      this.state.errorMsg
    ) : '';

    return _react2.default.createElement(
      'div',
      { className: this.props.classes },
      label,
      _react2.default.createElement('input', { type: 'text',
        ref: this.props.refValue,
        name: this.props.name,
        className: 'form-control',
        value: this.props.value,
        onChange: this.props.onChange,
        onBlur: this.handleOnBlur,
        onFocus: this.onFocus,
        placeholder: this.props.placeholder,
        autoComplete: 'off' }),
      errorMsg
    );
  }
});

exports.default = Datepicker;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _react_select = __webpack_require__(13);

var _react_select2 = _interopRequireDefault(_react_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var premadeTimes = ['12:00 AM', '12:15 AM', '12:30 AM', '12:45 AM', '01:00 AM', '01:15 AM', '01:30 AM', '01:45 AM', '02:00 AM', '02:15 AM', '02:30 AM', '02:45 AM', '03:00 AM', '03:15 AM', '03:30 AM', '03:45 AM', '04:00 AM', '04:15 AM', '04:30 AM', '04:45 AM', '05:00 AM', '05:15 AM', '05:30 AM', '05:45 AM', '06:00 AM', '06:15 AM', '06:30 AM', '06:45 AM', '07:00 AM', '07:15 AM', '07:30 AM', '07:45 AM', '08:00 AM', '08:15 AM', '08:30 AM', '08:45 AM', '09:00 AM', '09:15 AM', '09:30 AM', '09:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM', '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM', '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM', '04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM', '05:00 PM', '05:15 PM', '05:30 PM', '05:45 PM', '06:00 PM', '06:15 PM', '06:30 PM', '06:45 PM', '07:00 PM', '07:15 PM', '07:30 PM', '07:45 PM', '08:00 PM', '08:15 PM', '08:30 PM', '08:45 PM', '09:00 PM', '09:15 PM', '09:30 PM', '09:45 PM', '10:00 PM', '10:15 PM', '10:30 PM', '10:45 PM', '11:00 PM', '11:15 PM', '11:30 PM', '11:45 PM'];

function parseTime(timeStr, dt) {
  if (!dt) {
    dt = new Date();
  }

  var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
  if (!time) {
    return NaN;
  }
  var hours = parseInt(time[1], 10);
  if (hours == 12 && !time[3]) {
    hours = 0;
  } else {
    hours += hours < 12 && time[3] ? 12 : 0;
  }

  dt.setHours(hours);
  dt.setMinutes(parseInt(time[2], 10) || 0);
  dt.setSeconds(0, 0);
  return dt;
}

var Timepicker = _react2.default.createClass({
  displayName: 'Timepicker',


  validateTime: function validateTime(value) {
    var parsed = parseTime(value);
    if (parsed instanceof Date) {
      this.setState({ errorMsg: false });
      return true;
    } else {
      this.setState({ errorMsg: 'Invalid time' });
      return false;
    }
  },

  handleBlur: function handleBlur(event) {
    if (this.validateTime(event.target.value)) {
      this.props.handleBlur(event.target.name, parseTime(event.target.value).getTime());
    }
  },

  handleSelection: function handleSelection(name, selection) {
    if (this.validateTime(selection)) {
      this.props.handleSelection(name, parseTime(selection).getTime());
    }
  },

  handleChange: function handleChange(name, value) {
    this.setState({ value: value });
    this.props.handleChange(name, value);
  },

  // React methods

  getInitialState: function getInitialState() {
    return {
      errorMsg: false,
      value: this.props.value
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      refValue: 'timepicker',
      label: false,
      handleBlur: function handleBlur() {},
      handleChange: function handleChange() {},
      handleSelection: function handleSelection() {},
      placeholder: '',
      classes: 'timepicker-wrapper form-group'
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.value) {
      this.setState({ value: nextProps.value });
    }
  },

  render: function render() {
    var label = this.props.label ? _react2.default.createElement(
      'label',
      { htmlFor: this.props.name },
      this.props.label
    ) : null;
    var errorMsg = this.state.errorMsg ? _react2.default.createElement(
      'p',
      null,
      this.state.errorMsg
    ) : null;

    return _react2.default.createElement(
      'div',
      { className: this.props.classes },
      label,
      _react2.default.createElement(_react_select2.default, { ref: this.props.refValue,
        name: this.props.name,
        inputClasses: 'form-control',
        items: premadeTimes,
        handleBlur: this.handleBlur,
        handleChange: this.handleChange,
        handleSelection: this.handleSelection,
        value: this.state.value,
        title: this.props.name,
        sort: true }),
      errorMsg
    );
  }
});

exports.default = Timepicker;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _filter = __webpack_require__(82);

var _filter2 = _interopRequireDefault(_filter);

var _modal = __webpack_require__(36);

var _modal2 = _interopRequireDefault(_modal);

var _ProjectUtils = __webpack_require__(4);

var _ProjectUtils2 = _interopRequireDefault(_ProjectUtils);

var _FilterUtils = __webpack_require__(7);

var _FilterUtils2 = _interopRequireDefault(_FilterUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterManager = _react2.default.createClass({
  displayName: 'FilterManager',


  propTypes: {
    eventCollection: _react2.default.PropTypes.string,
    propertyNames: _react2.default.PropTypes.array,
    filters: _react2.default.PropTypes.array,
    addFilter: _react2.default.PropTypes.func.isRequired,
    removeFilter: _react2.default.PropTypes.func.isRequired,
    handleChange: _react2.default.PropTypes.func.isRequired,
    getPropertyType: _react2.default.PropTypes.func.isRequired
  },

  open: function open() {
    this.refs.modal.open();
  },

  addFilter: function addFilter(e) {
    e.preventDefault();
    this.props.addFilter();
  },

  removeFilter: function removeFilter(index) {
    this.props.removeFilter(index);
  },

  handleChange: function handleChange(index, name, value) {
    var updates = _lodash2.default.cloneDeep(this.props.filters[index]);

    if (!_lodash2.default.isNull(name.match('coordinates'))) {
      var coordinateIndex = parseInt(name.split('.')[1]);
      updates.property_value.coordinates[coordinateIndex] = _FilterUtils2.default.coerceGeoValue(value);
    } else if (name === 'max_distance_miles' && updates.coercion_type === 'Geo') {
      updates.property_value[name] = _FilterUtils2.default.coerceGeoValue(value);
    } else {
      updates[name] = value;
    }

    this.props.handleChange(index, updates);
  },

  buildFilterNodes: function buildFilterNodes() {
    var filterNodes = this.props.filters.map(function (filter, index) {
      return _react2.default.createElement(_filter2.default, { key: index,
        index: index,
        filter: filter,
        propertyType: this.props.getPropertyType(this.props.eventCollection, filter.property_name),
        eventCollection: this.props.eventCollection,
        propertyNames: this.props.propertyNames,
        handleChange: this.handleChange,
        removeFilter: this.removeFilter,
        filterOperators: _ProjectUtils2.default.getConstant('FILTER_OPERATORS') });
    }.bind(this));

    return _react2.default.createElement(
      'div',
      null,
      filterNodes,
      _react2.default.createElement(
        'div',
        { className: 'filter-buttons' },
        _react2.default.createElement(
          'a',
          { href: '#', className: 'add-filter btn btn-primary', onClick: this.addFilter },
          _react2.default.createElement('i', { className: 'icon glyphicon glyphicon-plus margin-right-tiny' }),
          'Add another filter'
        )
      )
    );
  },

  noFiltersMarkup: function noFiltersMarkup() {
    return _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'col-md-10 col-md-offset-1' },
        _react2.default.createElement(
          'div',
          { className: 'no-filters-msg callout' },
          _react2.default.createElement(
            'p',
            { className: 'lead' },
            _react2.default.createElement('i', { className: 'icon glyphicon glyphicon-info-sign margin-right-tiny' }),
            'Please select an Event Collection before making a filter.'
          )
        )
      )
    );
  },

  render: function render() {
    var filterContent = this.props.eventCollection ? this.buildFilterNodes() : this.noFiltersMarkup();

    return _react2.default.createElement(
      _modal2.default,
      { ref: 'modal',
        title: 'Filters',
        size: 'large',
        onClose: this.modalClosed,
        modalClasses: 'filters-modal',
        footerBtns: [{
          text: 'Done',
          classes: 'btn-success',
          iconName: 'ok-circle'
        }] },
      _react2.default.createElement(
        'div',
        { className: 'filters' },
        filterContent
      )
    );
  }
});

exports.default = FilterManager;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _qs = __webpack_require__(31);

var _qs2 = _interopRequireDefault(_qs);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  getSearchString: function getSearchString() {
    return window.location.search;
  },

  updateSearchString: function updateSearchString(queryStringData) {
    var urlPath;
    if (_lodash2.default.keys(queryStringData).length) {
      urlPath = '?' + _qs2.default.stringify(queryStringData);
    } else {
      urlPath = window.location.origin + window.location.pathname;
    }
    window.history.pushState({ model: queryStringData }, "", urlPath);
  },

  getQueryAttributes: function getQueryAttributes() {
    return _qs2.default.parse(this.getSearchString().replace('?', ''), { depth: 7 });
  }

};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(49);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeenExplorer = undefined;

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _keenAnalysis = __webpack_require__(50);

var _keenAnalysis2 = _interopRequireDefault(_keenAnalysis);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(51);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _persistence = __webpack_require__(52);

var _persistence2 = _interopRequireDefault(_persistence);

var _AppDispatcher = __webpack_require__(8);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _app = __webpack_require__(58);

var _app2 = _interopRequireDefault(_app);

var _ProjectActions = __webpack_require__(25);

var _ProjectActions2 = _interopRequireDefault(_ProjectActions);

var _ExplorerActions = __webpack_require__(5);

var _ExplorerActions2 = _interopRequireDefault(_ExplorerActions);

var _AppStateActions = __webpack_require__(22);

var _AppStateActions2 = _interopRequireDefault(_AppStateActions);

var _NoticeActions = __webpack_require__(21);

var _NoticeActions2 = _interopRequireDefault(_NoticeActions);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

var _RunValidations = __webpack_require__(10);

var _RunValidations2 = _interopRequireDefault(_RunValidations);

var _ExplorerValidations = __webpack_require__(28);

var _ExplorerValidations2 = _interopRequireDefault(_ExplorerValidations);

var _ExplorerStore = __webpack_require__(12);

var _ExplorerStore2 = _interopRequireDefault(_ExplorerStore);

var _ProjectStore = __webpack_require__(11);

var _ProjectStore2 = _interopRequireDefault(_ProjectStore);

var _QueryStringUtils = __webpack_require__(47);

var _QueryStringUtils2 = _interopRequireDefault(_QueryStringUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeenExplorer = exports.KeenExplorer = function KeenExplorer(el) {
  var tempId = _FormatUtils2.default.generateTempId();
  this.appDispatcher = _AppDispatcher2.default;
  this.config = {
    params: _QueryStringUtils2.default.getQueryAttributes(),
    persistence: null
  };
  this.el(el);
  if (!this.config.el) {
    console.error("Can't find HTML tag", el);
  }
  _ExplorerActions2.default.create(_lodash2.default.assign(_ExplorerUtils2.default.formatQueryParams(this.config.params) || {}, { 'id': tempId }));
  _ExplorerActions2.default.setActive(tempId);
  _ExplorerActions2.default.validate(tempId);
};

KeenExplorer.prototype.client = function (obj) {
  if (!arguments.length) return this.config.client;
  this.config.client = new _keenAnalysis2.default(obj);
  this.config.client.resources({
    'events': '{protocol}://{host}/3.0/projects/{projectId}/events'
  });
  _ProjectActions2.default.create({ client: this.config.client });
  _ProjectActions2.default.fetchProjectCollections(this.config.client);
  return this;
};

KeenExplorer.prototype.el = function (target) {
  if (!arguments.length) return this.config.el;
  if (target.nodeName) {
    this.config.el = target;
  } else if (document.querySelector) {
    this.config.el = document.querySelector(target);
  } else {
    this.config.el = undefined;
  }
  return this;
};

KeenExplorer.prototype.fetch = function () {
  if (this.config.persistence) {
    _ExplorerActions2.default.fetchAllPersisted(this.config.persistence, function (err) {
      if (err) console.error('There was an error fetching the persisted explorers: ', err.stack);
    });
    // Is this a saved query we want to load?
    if (this.config.params.saved_query) {
      // Once the models come back from the server, mark the right one as active.
      _ExplorerActions2.default.fetchPersisted(this.config.persistence, { id: this.config.params.saved_query }, this.doneFetchingSavedQuery.bind(this, this.config.params.saved_query));
    } else {
      _AppStateActions2.default.update({ ready: true });
      // Run the query for this explorer if it's valid
      var isEmailExtraction = _ExplorerUtils2.default.isEmailExtraction(_ExplorerStore2.default.getActive());
      _RunValidations2.default.run(_ExplorerValidations2.default, _ExplorerStore2.default.getActive());
      if (!isEmailExtraction && _ExplorerStore2.default.getActive().isValid) {
        _ExplorerActions2.default.exec(this.config.client, _ExplorerStore2.default.getActive().id);
      }
    }
  } else {
    _AppStateActions2.default.update({ ready: true });
  }
  this.render();
  return this;
};

KeenExplorer.prototype.persistence = function (bool) {
  if (!arguments.length) return this.config.persistence;
  if (typeof bool === 'boolean' && bool) {
    if (!this.config.client || !this.config.client.masterKey()) {
      console.error('The Persistence feature requires a client instance with a masterKey value');
    }
    this.config.persistence = new _persistence2.default.KeenSavedQueries({
      baseUrl: this.config.client.url('queries', 'saved'),
      client: this.config.client
    });
    this.config.persistence.config.masterKey = this.config.client.masterKey();
  }
  return this;
};

KeenExplorer.prototype.doneFetchingSavedQuery = function (savedQueryName, err) {
  if (!err) {
    _ExplorerActions2.default.setActive(savedQueryName);
    _ExplorerActions2.default.exec(this.config.client, savedQueryName);
    _AppStateActions2.default.update({ ready: true });
  } else {
    if (err.status === 404) {
      // We couldn't find that saved query.
      _NoticeActions2.default.create({
        text: 'The saved query ' + savedQueryName + ' could not be found.',
        type: 'error',
        icon: 'remove-sign'
      });
      var id = _FormatUtils2.default.generateTempId();
      _ExplorerActions2.default.create({ id: id });
      _ExplorerActions2.default.setActive(id);
      _AppStateActions2.default.update({ ready: true });
    } else {
      console.error("There was a problem fetching a saved query: ", err.stack);
    }
  }
};

KeenExplorer.prototype.render = function () {
  var Component = _react2.default.createFactory(_app2.default);
  _reactDom2.default.render(Component({
    persistence: this.config.persistence,
    client: this.config.client
  }), this.config.el);
};

KeenExplorer.Persistence = _persistence2.default;
exports.default = KeenExplorer;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__50__;

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__51__;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _KeenSavedQueries = __webpack_require__(53);

var _KeenSavedQueries2 = _interopRequireDefault(_KeenSavedQueries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  KeenSavedQueries: _KeenSavedQueries2.default
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function KeenSavedQueries(config) {
  this.config = config;
}

KeenSavedQueries.prototype.create = function (model, callback) {
  var body = _lodash2.default.omit(model, ['id']);
  this.config.client.put(this.config.client.url('queries', 'saved', model.query_name)).auth(this.config.client.masterKey()).send(body).then(function (res) {
    callback(null, res);
  }).catch(callback);
};

KeenSavedQueries.prototype.update = function (model, callback) {
  var body = _lodash2.default.omit(model, ['id']);
  this.config.client.put(this.config.client.url('queries', 'saved', model.id)).auth(this.config.client.masterKey()).send(body).then(function (res) {
    callback(null, res);
  }).catch(callback);
};

KeenSavedQueries.prototype.destroy = function (model, callback) {
  this.config.client.del(this.config.client.url('queries', 'saved', model.id)).auth(this.config.client.masterKey()).send().then(function (res) {
    callback(null, res);
  }).catch(function (err) {
    if (err.status === 204) {
      callback(null, undefined);
    } else {
      callback(err, null);
    }
  });
};

KeenSavedQueries.prototype.get = function (model, callback) {
  if (model) {
    this.config.client.get(this.config.client.url('queries', 'saved', model.id)).auth(this.config.client.masterKey()).send().then(function (res) {
      callback(null, res);
    }).catch(callback);
  } else {
    this.config.client.get(this.config.client.url('queries', 'saved')).auth(this.config.client.masterKey()).send().then(function (res) {
      callback(null, res);
    }).catch(callback);
  }
};

exports.default = KeenSavedQueries;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__54__;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

var _FilterUtils = __webpack_require__(7);

var _FilterUtils2 = _interopRequireDefault(_FilterUtils);

var _TimeframeUtils = __webpack_require__(14);

var _TimeframeUtils2 = _interopRequireDefault(_TimeframeUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STEP_PARAMS = ['event_collection', 'actor_property', 'timeframe', 'interval', 'timezone', 'filters', 'optional', 'inverted', 'with_actors'];
exports.default = {

  stepJSON: function stepJSON(step) {
    var params = _lodash2.default.cloneDeep(step);

    _lodash2.default.assign(params, _TimeframeUtils2.default.getTimeParameters(step.time, step.timezone));

    if (params.filters) {
      params.filters = _lodash2.default.map(params.filters, function (filter) {
        return _FilterUtils2.default.queryJSON(filter, _TimeframeUtils2.default.getTimezoneOffset(params.timezone));
      });

      _lodash2.default.remove(params.filters, _lodash2.default.isEmpty);
    }

    // Remove empty, null, or unnecessary properties
    _lodash2.default.each(params, function (value, key) {
      if (!_FormatUtils2.default.isValidQueryValue(value) || !_lodash2.default.includes(STEP_PARAMS, key)) {
        delete params[key];
      }
    });

    return params;
  },

  formatQueryParams: function formatQueryParams(step) {
    if (step.timeframe) {
      var unpackedTime = _TimeframeUtils2.default.unpackTimeframeParam(step.timeframe, step.timezone);
      step.time = unpackedTime.time;
      step.timezone = unpackedTime.timezone;
    }

    if (step.filters) {
      step.filters = _lodash2.default.compact(_lodash2.default.map(step.filters, _FilterUtils2.default.formatFilterParams));
    }

    step.inverted = step.inverted === true || step.inverted === "true";
    step.optional = step.optional === true || step.optional === "true";
    step.with_actors = step.with_actors === true || step.with_actors === "true";

    return step;
  }

};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  isDST: function isDST() {
    var date = new Date();
    var jan = new Date(date.getFullYear(), 0, 1);
    var jul = new Date(date.getFullYear(), 6, 1);
    var stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    return date.getTimezoneOffset() < stdOffset;
  }
};

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__57__;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _loader = __webpack_require__(24);

var _loader2 = _interopRequireDefault(_loader);

var _ProjectStore = __webpack_require__(11);

var _ProjectStore2 = _interopRequireDefault(_ProjectStore);

var _AppStateStore = __webpack_require__(34);

var _AppStateStore2 = _interopRequireDefault(_AppStateStore);

var _index = __webpack_require__(59);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProjectState() {
  return {
    project: _ProjectStore2.default.getProject(),
    app: _AppStateStore2.default.getState()
  };
}

var App = _react2.default.createClass({
  displayName: 'App',


  componentDidMount: function componentDidMount() {
    _ProjectStore2.default.addChangeListener(this._onChange);
    _AppStateStore2.default.addChangeListener(this._onChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    _ProjectStore2.default.removeChangeListener(this._onChange);
    _AppStateStore2.default.addChangeListener(this._onChange);
  },

  getInitialState: function getInitialState() {
    return getProjectState();
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { id: 'keen-explorer' },
      _react2.default.createElement(_loader2.default, { visible: this.state.project.loading || !this.state.app.ready, additionalClasses: 'app-loader' }),
      _react2.default.createElement(_index2.default, { project: this.state.project,
        client: this.props.client,
        persistence: this.props.persistence })
    );
  },

  _onChange: function _onChange() {
    this.setState(getProjectState());
  }

});

exports.default = App;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React$createClass;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _event_browser = __webpack_require__(60);

var _event_browser2 = _interopRequireDefault(_event_browser);

var _index = __webpack_require__(61);

var _index2 = _interopRequireDefault(_index);

var _query_pane_tabs = __webpack_require__(68);

var _query_pane_tabs2 = _interopRequireDefault(_query_pane_tabs);

var _index3 = __webpack_require__(69);

var _index4 = _interopRequireDefault(_index3);

var _browse_queries = __webpack_require__(87);

var _browse_queries2 = _interopRequireDefault(_browse_queries);

var _cache_toggle = __webpack_require__(88);

var _cache_toggle2 = _interopRequireDefault(_cache_toggle);

var _query_actions = __webpack_require__(41);

var _query_actions2 = _interopRequireDefault(_query_actions);

var _notice = __webpack_require__(26);

var _notice2 = _interopRequireDefault(_notice);

var _filter_manager = __webpack_require__(46);

var _filter_manager2 = _interopRequireDefault(_filter_manager);

var _ExplorerStore = __webpack_require__(12);

var _ExplorerStore2 = _interopRequireDefault(_ExplorerStore);

var _ExplorerActions = __webpack_require__(5);

var _ExplorerActions2 = _interopRequireDefault(_ExplorerActions);

var _NoticeActions = __webpack_require__(21);

var _NoticeActions2 = _interopRequireDefault(_NoticeActions);

var _AppStateActions = __webpack_require__(22);

var _AppStateActions2 = _interopRequireDefault(_AppStateActions);

var _NoticeStore = __webpack_require__(90);

var _NoticeStore2 = _interopRequireDefault(_NoticeStore);

var _AppStateStore = __webpack_require__(34);

var _AppStateStore2 = _interopRequireDefault(_AppStateStore);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _FilterUtils = __webpack_require__(7);

var _FilterUtils2 = _interopRequireDefault(_FilterUtils);

var _ProjectUtils = __webpack_require__(4);

var _ProjectUtils2 = _interopRequireDefault(_ProjectUtils);

var _CashedQueryUtils = __webpack_require__(40);

var _CashedQueryUtils2 = _interopRequireDefault(_CashedQueryUtils);

var _QueryStringUtils = __webpack_require__(47);

var _QueryStringUtils2 = _interopRequireDefault(_QueryStringUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getStoresState() {
  return {
    allPersistedExplorers: _ExplorerStore2.default.getAllPersisted(),
    activeExplorer: _ExplorerStore2.default.getActive(),
    notice: _NoticeStore2.default.getGlobalNotice(),
    stepNotices: _NoticeStore2.default.getStepNotices(),
    appState: _AppStateStore2.default.getState()
  };
}

var Explorer = _react2.default.createClass((_React$createClass = {
  displayName: 'Explorer',


  toggleFields: function toggleFields() {
    _lodash2.default.each(this.getFieldsToggleComponents(), function (toggleObj) {
      if (toggleObj.component) {
        var hasValue = !_lodash2.default.isUndefined(toggleObj.value) && !_lodash2.default.isNull(toggleObj.value) ? true : false;
        toggleObj.component.setState({ open: hasValue });
      }
    });
  },

  // ********************************
  // Callbacks for child components
  // ********************************

  selectEventCollection: function selectEventCollection(collectionName) {
    var updates = {
      query: {
        event_collection: collectionName
      }
    };
    _ExplorerActions2.default.update(this.state.activeExplorer.id, updates);
    this.refs['event-browser'].refs.modal.close();
  },

  savedQueryClicked: function savedQueryClicked(event) {
    event.preventDefault();
    if (this.state.activeExplorer.loading) {
      _NoticeActions2.default.create({
        icon: 'info-sign',
        type: 'warning',
        text: "There is already a query in progress. Wait for it to finish loading before selecting a query."
      });
    } else {
      _ExplorerActions2.default.revertActiveChanges();
      var modelId = event.currentTarget.dataset.id;
      _ExplorerActions2.default.setActive(modelId);
      _ExplorerActions2.default.exec(this.props.client, modelId);
    }
  },

  removeSavedQueryClicked: function removeSavedQueryClicked() {
    if (confirm('Are you sure you want to delete this saved query?')) {
      _ExplorerActions2.default.destroy(this.props.persistence, this.state.activeExplorer.id);
    }
  },

  saveQueryClick: function saveQueryClick(event) {
    event.preventDefault();
    _ExplorerActions2.default.save(this.props.persistence, this.state.activeExplorer.id);
  },

  cloneQueryClick: function cloneQueryClick(event) {
    event.preventDefault();
    _ExplorerActions2.default.clone(this.state.activeExplorer.id);
    var newExplorer = _ExplorerStore2.default.getLast();
    _ExplorerActions2.default.setActive(newExplorer.id);
    this.setState({ activeQueryPane: 'build' });
  },

  createNewQuery: function createNewQuery(event) {
    event.preventDefault();
    _ExplorerActions2.default.create();
    var newExplorer = _ExplorerStore2.default.getLast();
    _ExplorerActions2.default.setActive(newExplorer.id);
    this.setState({ activeQueryPane: 'build' });
    _CashedQueryUtils2.default.checkLimits();
  },

  onBrowseEvents: function onBrowseEvents(event) {
    event.preventDefault();
    this.refs['event-browser'].refs.modal.open();
  },

  handleFiltersToggle: function handleFiltersToggle() {
    this.refs['filter-manager'].open();
  },

  onDisplayNameChange: function onDisplayNameChange(event) {
    var updates = {
      query_name: _ExplorerUtils2.default.slugify(event.target.value),
      metadata: {
        display_name: event.target.value
      }
    };
    _ExplorerActions2.default.update(this.state.activeExplorer.id, updates);
  },

  onQueryNameChange: function onQueryNameChange(event) {
    var name = event.target.value.replace(/[^\w-]/g, '');
    _ExplorerActions2.default.update(this.state.activeExplorer.id, { query_name: name });
  },

  handleRevertChanges: function handleRevertChanges(event) {
    event.preventDefault();
    _ExplorerActions2.default.revertActiveChanges();
  },

  handleQuerySubmit: function handleQuerySubmit(event) {
    event.preventDefault();
    if (_ExplorerUtils2.default.isEmailExtraction(this.state.activeExplorer)) {
      _ExplorerActions2.default.runEmailExtraction(this.props.client, this.state.activeExplorer.id);
    } else {
      _ExplorerActions2.default.exec(this.props.client, this.state.activeExplorer.id);
    }
  },

  setExtractionType: function setExtractionType(event) {
    var updates = {
      query: {
        email: event.target.value === 'email' ? "" : null
      }
    };
    _ExplorerActions2.default.update(this.state.activeExplorer.id, updates);
  },

  handleClearQuery: function handleClearQuery() {
    // NOTE: (Eric Anderson, Aug 19, 2015): Awful terrible hack to
    // ensure that the components properly display the values of the cleared
    // model.
    var self = this;
    setTimeout(function () {
      _ExplorerActions2.default.clear(self.state.activeExplorer.id);
    }, 0);
  },

  handleAddFilter: function handleAddFilter() {
    _ExplorerActions2.default.addFilter(this.state.activeExplorer.id);
  },

  handleRemoveFilter: function handleRemoveFilter(index) {
    _ExplorerActions2.default.removeFilter(this.state.activeExplorer.id, index);
  },

  handleFilterChange: function handleFilterChange(index, updates) {
    _ExplorerActions2.default.updateFilter(this.state.activeExplorer.id, index, updates);
  },

  // ********************************
  // Convenience functions
  // ********************************

  setVizWrapTop: function setVizWrapTop(top) {
    this.refs['viz-area'].style.top = top + 'px';
  },

  getSelectedIndex: function getSelectedIndex() {
    if (!this.state.activeExplorer || !_ExplorerUtils2.default.isPersisted(this.state.activeExplorer)) {
      return null;
    }
    return _lodash2.default.findIndex(this.state.allPersistedExplorers, { id: this.state.activeExplorer.id });
  },

  toggleQueryPane: function toggleQueryPane(pane) {
    this.setState({ activeQueryPane: pane });
  }

}, _defineProperty(_React$createClass, 'getSelectedIndex', function getSelectedIndex() {
  var index;
  for (var i = 0; i < this.state.allPersistedExplorers.length; i++) {
    if (this.state.allPersistedExplorers[i].active) {
      index = i;
      break;
    }
  }
  return index;
}), _defineProperty(_React$createClass, 'toggleCodeSample', function toggleCodeSample(event) {
  event.preventDefault();
  _AppStateActions2.default.update({
    codeSampleHidden: !this.state.appState.codeSampleHidden
  });
}), _defineProperty(_React$createClass, 'getEventPropertyNames', function getEventPropertyNames(collection) {
  return _ProjectUtils2.default.getEventCollectionPropertyNames(this.props.project, collection);
}), _defineProperty(_React$createClass, 'getPropertyType', function getPropertyType(eventCollection, property_name) {
  return _ProjectUtils2.default.getPropertyType(this.props.project, eventCollection, property_name);
}), _defineProperty(_React$createClass, 'componentDidMount', function componentDidMount() {
  _ExplorerStore2.default.addChangeListener(this._onChange);
  _NoticeStore2.default.addChangeListener(this._onChange);
  _AppStateStore2.default.addChangeListener(this._onChange);
}), _defineProperty(_React$createClass, 'componentWillUnmount', function componentWillUnmount() {
  _ExplorerStore2.default.removeChangeListener(this._onChange);
  _NoticeStore2.default.removeChangeListener(this._onChange);
  _AppStateStore2.default.removeChangeListener(this._onChange);
  // Create a default filter if there are no filters already on this model
  if (!this.state.activeExplorer.query.filters.length) {
    _ExplorerActions2.default.addFilter(this.state.activeExplorer.id);
  }
}), _defineProperty(_React$createClass, 'getInitialState', function getInitialState() {
  return _lodash2.default.assign(getStoresState(), {
    activeQueryPane: 'build'
  });
}), _defineProperty(_React$createClass, 'render', function render() {
  var cacheToggle, queryPane, queryPaneTabs, browseListNotice, browseEmptyContent;

  if (this.props.persistence) {
    queryPaneTabs = _react2.default.createElement(_query_pane_tabs2.default, { ref: 'query-pane-tabs',
      activePane: this.state.activeQueryPane,
      toggleCallback: this.toggleQueryPane,
      createNewQuery: this.createNewQuery,
      persisted: _ExplorerUtils2.default.isPersisted(this.state.activeExplorer) });
    if (['extraction'].indexOf(this.state.activeExplorer.query.analysis_type) === -1) {
      cacheToggle = _react2.default.createElement(_cache_toggle2.default, { model: this.state.activeExplorer, isLimited: this.state.appState.isLimited });
    }
    if (this.state.appState.fetchingPersistedExplorers) {
      browseListNotice = _react2.default.createElement(_notice2.default, { notice: { icon: 'info-sign', text: 'Loading saved queries...', type: 'info' }, closable: false });
    } else {
      browseEmptyContent = _react2.default.createElement(
        'h4',
        { className: 'text-center' },
        'You don\'t have any saved queries yet.'
      );
    }
  }

  if (!this.props.persistence || this.state.activeQueryPane === 'build') {
    queryPane = _react2.default.createElement(_index4.default, { ref: 'query-builder',
      model: this.state.activeExplorer,
      originalModel: this.state.activeExplorerOriginal,
      client: this.props.client,
      project: this.props.project,
      onBrowseEvents: this.onBrowseEvents,
      handleFiltersToggle: this.handleFiltersToggle,
      handleRevertChanges: this.handleRevertChanges,
      handleQuerySubmit: this.handleQuerySubmit,
      setExtractionType: this.setExtractionType,
      handleClearQuery: this.handleClearQuery,
      getEventPropertyNames: this.getEventPropertyNames,
      getPropertyType: this.getPropertyType,
      analysisTypes: _ProjectUtils2.default.getConstant('ANALYSIS_TYPES'),
      stepNotices: this.state.stepNotices });
  } else {
    queryPane = _react2.default.createElement(_browse_queries2.default, { ref: 'query-browser',
      listItems: this.state.allPersistedExplorers,
      emptyContent: browseEmptyContent,
      notice: browseListNotice,
      clickCallback: this.savedQueryClicked,
      selectedIndex: this.getSelectedIndex() });
  }

  return _react2.default.createElement(
    'div',
    { ref: 'root' },
    _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'col-sm-5 col-md-4 explorer-query-builder' },
        queryPaneTabs,
        queryPane
      ),
      _react2.default.createElement(
        'div',
        { ref: 'viz-area', className: 'col-sm-7 col-md-8 explorer-visualization' },
        _react2.default.createElement(_index2.default, { notice: this.state.notice,
          model: this.state.activeExplorer,
          client: this.props.client,
          project: this.props.project,
          persistence: this.props.persistence,
          onNameChange: this.onNameChange,
          appState: this.state.appState,
          toggleCodeSample: this.toggleCodeSample,
          onQueryNameChange: this.onQueryNameChange,
          onDisplayNameChange: this.onDisplayNameChange }),
        cacheToggle,
        _react2.default.createElement(_query_actions2.default, { model: this.state.activeExplorer,
          handleRevertChanges: this.handleRevertChanges,
          handleQuerySubmit: this.handleQuerySubmit,
          saveQueryClick: this.saveQueryClick,
          removeClick: this.removeSavedQueryClicked,
          cloneQueryClick: this.cloneQueryClick,
          persistence: this.props.persistence,
          codeSampleHidden: this.state.appState.codeSampleHidden,
          toggleCodeSample: this.toggleCodeSample })
      )
    ),
    _react2.default.createElement(_event_browser2.default, { ref: 'event-browser',
      client: this.props.client,
      project: this.props.project,
      currentEventCollection: this.state.activeExplorer.query.event_collection,
      selectEventCollection: this.selectEventCollection }),
    _react2.default.createElement(_filter_manager2.default, { ref: 'filter-manager',
      eventCollection: this.state.activeExplorer.query.event_collection,
      filters: this.state.activeExplorer.query.filters,
      handleChange: this.handleFilterChange,
      removeFilter: this.handleRemoveFilter,
      addFilter: this.handleAddFilter,
      getPropertyType: this.getPropertyType,
      propertyNames: this.getEventPropertyNames(this.state.activeExplorer.query.event_collection) })
  );
}), _defineProperty(_React$createClass, '_onChange', function _onChange() {
  var newState = getStoresState();
  this.setState(newState);
  if (_ExplorerUtils2.default.isPersisted(newState.activeExplorer)) {
    window.history.pushState({ model: newState.activeExplorer }, "", '?saved_query=' + newState.activeExplorer.id);
  } else {
    _QueryStringUtils2.default.updateSearchString(_ExplorerUtils2.default.paramsForURL(newState.activeExplorer));
  }
}), _React$createClass));

exports.default = Explorer;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _loader = __webpack_require__(24);

var _loader2 = _interopRequireDefault(_loader);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

var _ProjectUtils = __webpack_require__(4);

var _ProjectUtils2 = _interopRequireDefault(_ProjectUtils);

var _ProjectActions = __webpack_require__(25);

var _ProjectActions2 = _interopRequireDefault(_ProjectActions);

var _modal = __webpack_require__(36);

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventBrowser = _react2.default.createClass({
  displayName: 'EventBrowser',


  onKeyUp: function onKeyUp(event) {
    var enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) this.selectEventCollection();
  },

  shouldFetchCollectionSchema: function shouldFetchCollectionSchema(collection) {
    if (!this.props.project.schema[collection]) return false;
    return _lodash2.default.keys(this.props.project.schema[collection].properties).length < 1;
  },

  selectEventCollectionClick: function selectEventCollectionClick(event) {
    event.preventDefault();
    this.props.selectEventCollection(this.state.activeEventCollection);
  },

  setActiveEventCollectionClick: function setActiveEventCollectionClick(event) {
    this.setActiveEventCollection(event.target.innerText);
  },

  setActiveEventCollection: function setActiveEventCollection(collection) {
    if (collection === this.state.activeEventCollection) return;
    this.setState({ activeEventCollection: collection });
    if (this.state.activeView === 'recentEvents') {
      this.fetchRecentEvents(collection);
    } else if (this.shouldFetchCollectionSchema(collection)) {
      _ProjectActions2.default.fetchCollectionSchema(this.props.client, collection);
    }
  },

  modalOpened: function modalOpened() {
    if (this.state.activeView === 'recentEvents') {
      this.fetchRecentEvents();
    } else if (this.shouldFetchCollectionSchema(this.state.activeEventCollection)) {
      _ProjectActions2.default.fetchCollectionSchema(this.props.client, this.state.activeEventCollection);
    }
  },

  fetchRecentEvents: function fetchRecentEvents(collectionToUse) {
    var collection = collectionToUse ? collectionToUse : this.state.activeEventCollection;
    var schema = this.props.project.schema;
    if (!_lodash2.default.isEmpty(schema) && schema[collection] && !schema[collection].recentEvents && !schema[collection].loading) {
      _ProjectActions2.default.fetchRecentEventsForCollection(this.props.client, collection);
    }
  },

  setSearchText: function setSearchText(event) {
    this.setState({ searchtext: event.target.value });
  },

  // Builders

  buildEventCollectionNodes: function buildEventCollectionNodes() {
    return _lodash2.default.map(this.props.project.eventCollections, _lodash2.default.bind(function (eventCollection) {
      var re = new RegExp(this.state.searchtext, 'i');
      var classes = (0, _classnames2.default)({
        'active': this.state.activeEventCollection === eventCollection,
        'hide': re.test(eventCollection) ? false : true
      });
      return _react2.default.createElement(
        'li',
        { className: classes, key: eventCollection },
        _react2.default.createElement(
          'a',
          { href: '#', onClick: this.setActiveEventCollectionClick },
          eventCollection
        )
      );
    }, this));
  },

  // Convenience functions

  getNavClasses: function getNavClasses(name) {
    return this.state.activeView === name ? 'active' : '';
  },

  shouldShowLoader: function shouldShowLoader() {
    if (this.props.project.schema[this.state.activeEventCollection]) {
      return this.props.project.schema[this.state.activeEventCollection].loading;
    }
    return false;
  },

  getRecentEvents: function getRecentEvents() {
    if (!this.props.project.schema[this.state.activeEventCollection]) return "";
    var recentEvents = this.props.project.schema[this.state.activeEventCollection].recentEvents;
    return recentEvents ? _FormatUtils2.default.prettyPrintJSON(recentEvents) : "";
  },

  getSchema: function getSchema() {
    var schema = this.props.project.schema;
    var collection = this.state.activeEventCollection;
    var properties = schema[collection] ? schema[collection].properties : {};
    var ordered = {};
    if (properties) {
      _lodash2.default.each(Object.keys(properties).sort(), function (key, i) {
        ordered[key] = properties[key];
      });
    }
    return _FormatUtils2.default.prettyPrintJSON(ordered) || '';
  },

  changeActiveView: function changeActiveView(event) {
    event.preventDefault();
    var tabName = event.target.name;
    this.setState({ activeView: tabName });
    if (tabName === 'recentEvents') this.fetchRecentEvents();
  },

  // Lifecycle hooks

  getInitialState: function getInitialState() {
    return {
      activeView: 'schema',
      activeEventCollection: null,
      searchtext: ''
    };
  },

  componentDidMount: function componentDidMount() {
    if (!this.state.activeEventCollection && !_lodash2.default.isEmpty(this.props.project.schema)) {
      this.setActiveEventCollection(this.props.currentEventCollection || this.props.project.eventCollections[0]);
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!_lodash2.default.isEmpty(nextProps.project.schema) && !this.state.activeEventCollection) {
      this.setState({ activeEventCollection: nextProps.project.eventCollections[0] });
    }
    if (nextProps.currentEventCollection && nextProps.currentEventCollection != this.props.currentEventCollection) {
      this.setState({ activeEventCollection: nextProps.currentEventCollection });
    }
  },

  render: function render() {
    var previewData;
    if (this.state.activeView === 'recentEvents') {
      previewData = this.getRecentEvents();
    } else {
      previewData = this.getSchema();
    }

    var browseContent = _react2.default.createElement(
      'div',
      { className: 'event-browser', onKeyUp: this.handleKeyUp },
      _react2.default.createElement(
        'div',
        { className: 'event-names' },
        _react2.default.createElement(
          'div',
          { className: 'search-box' },
          _react2.default.createElement('input', { type: 'text', name: 'search', ref: 'search-box', placeholder: 'Search...', onChange: this.setSearchText, autoComplete: 'off' }),
          _react2.default.createElement('span', { className: 'glyphicon glyphicon-search icon' })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'nav nav-pills nav-stacked event-names-list', ref: 'event-names-list' },
          this.buildEventCollectionNodes()
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'event-browser-content' },
        _react2.default.createElement(
          'ul',
          { className: 'nav nav-tabs view-options' },
          _react2.default.createElement(
            'li',
            { className: this.getNavClasses('schema') },
            _react2.default.createElement(
              'a',
              { href: '#', name: 'schema', onClick: this.changeActiveView },
              'Schema'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: this.getNavClasses('recentEvents') },
            _react2.default.createElement(
              'a',
              { href: '#', name: 'recentEvents', onClick: this.changeActiveView },
              'Recent Events'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { ref: 'event-data-wrapper', className: 'event-data-wrapper' },
          _react2.default.createElement(_loader2.default, { ref: 'loader', visible: this.shouldShowLoader() }),
          _react2.default.createElement('textarea', { className: 'json-view', value: previewData, readOnly: true })
        )
      )
    );

    var alertContent = _react2.default.createElement(
      'div',
      { className: 'alert alert-info no-margin no-collections-alert' },
      'There is no data to preview. This project does not have any event collections.'
    );

    var footerBtns = [{ text: 'Close' }];

    var modalClasses = this.props.project.eventCollections.length > 0 ? "event-browser-modal" : "";

    if (this.props.project.eventCollections.length > 0) {
      footerBtns.push({
        text: 'Use this Event Collection',
        iconName: 'ok',
        classes: 'btn-primary',
        onClick: this.selectEventCollectionClick
      });
    }

    return _react2.default.createElement(
      _modal2.default,
      { ref: 'modal',
        title: 'Project Event Collections',
        size: 'large',
        modalClasses: modalClasses,
        onOpen: this.modalOpened,
        footerBtns: footerBtns },
      this.props.project.eventCollections.length > 0 ? browseContent : alertContent
    );
  }
});

exports.default = EventBrowser;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _keenDataviz = __webpack_require__(62);

var _keenDataviz2 = _interopRequireDefault(_keenDataviz);

var _select = __webpack_require__(15);

var _select2 = _interopRequireDefault(_select);

var _notice = __webpack_require__(26);

var _notice2 = _interopRequireDefault(_notice);

var _chart = __webpack_require__(63);

var _chart2 = _interopRequireDefault(_chart);

var _code_sample = __webpack_require__(65);

var _code_sample2 = _interopRequireDefault(_code_sample);

var _AppDispatcher = __webpack_require__(8);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _ExplorerConstants = __webpack_require__(20);

var _ExplorerConstants2 = _interopRequireDefault(_ExplorerConstants);

var _ExplorerActions = __webpack_require__(5);

var _ExplorerActions2 = _interopRequireDefault(_ExplorerActions);

var _ExplorerStore = __webpack_require__(12);

var _ExplorerStore2 = _interopRequireDefault(_ExplorerStore);

var _NoticeActions = __webpack_require__(21);

var _NoticeActions2 = _interopRequireDefault(_NoticeActions);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _ChartTypeUtils = __webpack_require__(27);

var _ChartTypeUtils2 = _interopRequireDefault(_ChartTypeUtils);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

var _DataUtils = __webpack_require__(67);

var _DataUtils2 = _interopRequireDefault(_DataUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Visualization = _react2.default.createClass({
  displayName: 'Visualization',


  getInitialState: function getInitialState() {
    return {
      focusDisplayName: false,
      focusQueryName: false,
      blurTimeout: 100
    };
  },

  handleDisplayNameFocus: function handleDisplayNameFocus() {
    this.setState({ focusDisplayName: true });
  },

  handleDisplayNameBlur: function handleDisplayNameBlur() {
    setTimeout(function () {
      this.setState({ focusDisplayName: false });
    }.bind(this), this.state.blurTimeout);
  },

  handleQueryNameFocus: function handleQueryNameFocus() {
    this.setState({ focusQueryName: true });
  },

  handleQueryNameBlur: function handleQueryNameBlur() {
    setTimeout(function () {
      this.setState({ focusQueryName: false });
    }.bind(this), this.state.blurTimeout);
  },

  noticeClosed: function noticeClosed() {
    _NoticeActions2.default.clearAll();
  },

  changeChartType: function changeChartType(event) {
    var chartType = _lodash2.default.find(this.formatChartTypes(), function (type) {
      return type.value === event.target.value;
    });
    var updates = {
      metadata: {
        visualization: { chart_type: chartType.value }
      }
    };
    _ExplorerActions2.default.update(this.props.model.id, updates);
  },

  formatChartTypes: function formatChartTypes() {
    return _lodash2.default.map(_ChartTypeUtils2.default.getChartTypeOptions(this.props.model.query), function (type) {
      return {
        name: type !== 'JSON' ? _FormatUtils2.default.toTitleCase(type).replace('chart', '') : type,
        value: type
      };
    });
  },

  chartType: function chartType() {
    if (this.props.model.metadata.visualization && this.props.model.metadata.visualization.chart_type) {
      return this.props.model.metadata.visualization.chart_type;
    } else {
      return _lodash2.default.first(_ChartTypeUtils2.default.getChartTypeOptions(this.props.model.query));
    }
  },

  componentWillMount: function componentWillMount() {
    this.dataviz = new _keenDataviz2.default();
  },

  componentWillUnmount: function componentWillUnmount() {
    _AppDispatcher2.default.unregister(this.dispatcherToken);
  },

  exportToCsv: function exportToCsv() {
    var data = this.dataviz.dataset.matrix;
    var filename = this.props.model.query_name || 'untitled-query';
    _DataUtils2.default.exportToCsv(data, filename);
  },

  render: function render() {
    var chartTitle, codeSample;

    var chartDetailBarClasses = (0, _classnames2.default)({
      'chart-detail-bar': true,
      'chart-detail-bar-focus': (this.state.focusDisplayName || this.state.focusQueryName) && this.props.model.response !== null && !this.props.model.loading,
      'chart-detail-active': this.props.model.response !== null && !this.props.model.loading
    });

    if (this.props.model.isValid) {
      codeSample = _ExplorerUtils2.default.getSdkExample(this.props.model, this.props.client);
    }

    if (this.props.persistence) {
      chartTitle = _react2.default.createElement(
        'div',
        { className: 'chart-title-component' },
        _react2.default.createElement('input', { className: 'chart-display-name',
          type: 'text',
          onChange: this.props.onDisplayNameChange,
          onBlur: this.handleDisplayNameBlur,
          onFocus: this.handleDisplayNameFocus,
          spellCheck: 'false',
          value: this.props.model.metadata.display_name,
          placeholder: 'Give your query a name...' }),
        _react2.default.createElement(
          'div',
          { className: 'chart-query-name' },
          _react2.default.createElement(
            'label',
            null,
            'Saved Query Resource Name \xA0',
            _react2.default.createElement(
              'a',
              { href: 'https://keen.io/docs/api/#saved-queries', target: '_blank' },
              _react2.default.createElement('i', { className: 'icon glyphicon glyphicon-question-sign' })
            )
          ),
          _react2.default.createElement('input', { className: 'chart-query-name',
            type: 'text',
            onChange: this.props.onQueryNameChange,
            onBlur: this.handleQueryNameBlur,
            onFocus: this.handleQueryNameFocus,
            spellCheck: 'false',
            value: this.props.model.query_name })
        )
      );
    }

    return _react2.default.createElement(
      'div',
      { className: 'visualization' },
      _react2.default.createElement(_notice2.default, { notice: this.props.notice, closeCallback: this.noticeClosed }),
      _react2.default.createElement(
        'div',
        { className: 'visualization-wrapper' },
        _react2.default.createElement(
          'div',
          { className: chartDetailBarClasses },
          chartTitle,
          _react2.default.createElement(
            'div',
            { className: 'chart-type-component' },
            _react2.default.createElement(_select2.default, { label: false,
              ref: 'chart-type',
              name: 'chart_type',
              classes: 'chart-type',
              options: this.formatChartTypes(),
              handleSelection: this.changeChartType,
              selectedOption: this.chartType(),
              emptyOption: false,
              disabled: this.props.model.loading })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'chart-component' },
          _react2.default.createElement(_chart2.default, { model: this.props.model,
            dataviz: this.dataviz,
            exportToCsv: this.exportToCsv })
        ),
        _react2.default.createElement(_code_sample2.default, { ref: 'codesample',
          codeSample: codeSample,
          hidden: this.props.appState.codeSampleHidden,
          onCloseClick: this.props.toggleCodeSample,
          isValid: this.props.model.isValid })
      )
    );
  }
});

exports.default = Visualization;

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__62__;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _loader = __webpack_require__(24);

var _loader2 = _interopRequireDefault(_loader);

var _keen_viz = __webpack_require__(64);

var _keen_viz2 = _interopRequireDefault(_keen_viz);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _FormatUtils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chart = _react2.default.createClass({
  displayName: 'Chart',


  // ***********************
  // Content building
  // ***********************

  buildVizContent: function buildVizContent() {
    if (!this.props.model.response) {
      return _react2.default.createElement(
        'div',
        { ref: 'notice', className: 'big-notice' },
        _react2.default.createElement(
          'div',
          { className: 'alert alert-info' },
          'Let\'s go exploring!'
        )
      );
    }

    if (_ExplorerUtils2.default.isEmailExtraction(this.props.model)) {
      return _react2.default.createElement(
        'div',
        { ref: 'notice', className: 'big-notice' },
        _react2.default.createElement(
          'div',
          { className: 'alert alert-info' },
          'Email extractions don\'t have visualizations.'
        )
      );
    }

    if (!_ExplorerUtils2.default.resultCanBeVisualized(this.props.model)) {
      return _react2.default.createElement(
        'div',
        { ref: 'notice', className: 'big-notice' },
        _react2.default.createElement(
          'div',
          { className: 'alert alert-danger' },
          _react2.default.createElement('span', { className: 'icon glyphicon glyphicon-info-sign error' }),
          'Your query returned no results.'
        )
      );
    }

    if (_ExplorerUtils2.default.resultCanBeVisualized(this.props.model)) {
      return this.buildViz();
    } else {
      this.props.dataviz.destroy();
    }
  },

  buildViz: function buildViz() {
    var chartContent;
    var msgContent;
    var analysisType = this.props.model.query.analysis_type;
    var wrapClasses = analysisType + '-viz';

    if (_ExplorerUtils2.default.isJSONViz(this.props.model)) {
      var content = {
        result: this.props.model.response.result
      };
      if (this.props.model.response.actors) {
        content.actors = this.props.model.response.actors;
      }
      chartContent = _react2.default.createElement('textarea', { ref: 'jsonViz',
        className: 'json-view',
        value: (0, _FormatUtils.prettyPrintJSON)(content),
        readOnly: true });
    } else {
      chartContent = _react2.default.createElement(_keen_viz2.default, { model: this.props.model, dataviz: this.props.dataviz,
        exportToCsv: this.props.exportToCsv });
    }

    return _react2.default.createElement(
      'div',
      { className: wrapClasses },
      chartContent
    );
  },

  // ***********************
  // Lifecycle hooks
  // ***********************

  render: function render() {
    var vizContent = this.buildVizContent();

    return _react2.default.createElement(
      'div',
      { className: 'chart-area' },
      _react2.default.createElement(_loader2.default, { visible: this.props.model.loading }),
      vizContent
    );
  }
});

exports.default = Chart;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _ChartTypeUtils = __webpack_require__(27);

var _ChartTypeUtils2 = _interopRequireDefault(_ChartTypeUtils);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeenViz = _react2.default.createClass({
  displayName: 'KeenViz',


  lastDataTimestamp: null,
  lastChartType: null,

  // ***********************
  // Convenience functions
  // ***********************

  showVisualization: function showVisualization() {
    this.props.dataviz.destroy();

    this.props.dataviz.data(this.props.model.response).el(this.refs['keen-viz']).height(300).title(null).type(this.props.model.metadata.visualization.chart_type);

    if (this.props.model.query.analysis_type !== "funnel") {
      this.props.dataviz.sortGroups('desc');
    }

    this.props.dataviz.render();

    this.lastDataTimestamp = this.props.model.dataTimestamp;
    this.lastChartType = this.props.model.metadata.visualization.chart_type;
  },

  // ***********************
  // Lifecycle hooks
  // ***********************

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (this.lastChartType !== nextProps.model.metadata.visualization.chart_type) {
      return true;
    }
    if (!this.lastDataTimestamp || this.lastDataTimestamp !== nextProps.model.dataTimestamp) {
      return true;
    }
    return false;
  },

  componentDidUpdate: function componentDidUpdate() {
    this.showVisualization();
  },

  componentDidMount: function componentDidMount() {
    this.showVisualization();
  },

  render: function render() {
    var exportBtn;
    if (_ChartTypeUtils2.default.isTableChartType(this.props.model.metadata.visualization.chart_type)) {
      exportBtn = _react2.default.createElement(
        'button',
        { className: 'btn btn-default btn-download-csv',
          role: 'export-table',
          type: 'button',
          onClick: this.props.exportToCsv },
        'Download CSV'
      );
    }

    return _react2.default.createElement(
      'div',
      { ref: 'keen-viz-wrapper' },
      _react2.default.createElement('div', { ref: 'keen-viz' }),
      exportBtn
    );
  }
});

exports.default = KeenViz;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactHighlight = __webpack_require__(66);

var _reactHighlight2 = _interopRequireDefault(_reactHighlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeSample = _react2.default.createClass({
  displayName: 'CodeSample',

  render: function render() {
    var panelClasses = (0, _classnames2.default)({
      'code-sample-panel': true,
      'hide': this.props.hidden
    });

    var text;
    if (this.props.isValid) {
      text = this.props.codeSample;
    } else {
      text = "Your query is not valid right now, so we can't show you a code sample.";
    }

    return _react2.default.createElement(
      'div',
      { className: panelClasses },
      _react2.default.createElement(
        'a',
        { href: '#', className: 'close-btn', onClick: this.props.onCloseClick },
        _react2.default.createElement('span', { className: 'icon glyphicon glyphicon glyphicon-remove-circle no-margin' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'sample' },
        _react2.default.createElement(
          _reactHighlight2.default,
          { className: 'html' },
          text
        )
      )
    );
  }
});

exports.default = CodeSample;

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__66__;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  exportToCsv: function exportToCsv(data, filename) {
    var csvContent = '';
    var htmlElement;

    data.forEach(function (row, i) {
      row.forEach(function (cell, j) {
        csvContent += String(cell).replace(/,/g, '');
        if (row.length > j + 1) {
          csvContent += ',';
        }
      });
      if (data.length > i + 1) {
        csvContent += '\n';
      }
    });

    var encodedData = '';
    if (typeof window !== 'undefined' && window.URL) {
      var blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv; charset=utf-8' });
      encodedData = window.URL.createObjectURL(blob);
    } else {
      encodedData = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    }

    htmlElement = document.createElement('a');
    htmlElement.setAttribute('href', encodedData);

    if (filename.indexOf('.csv') === -1) {
      filename += '.csv';
    }
    htmlElement.setAttribute('download', filename);
    document.body.appendChild(htmlElement);
    htmlElement.click();
  }
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryPaneTabs = _react2.default.createClass({
  displayName: 'QueryPaneTabs',


  toggled: function toggled(tab) {
    this.props.toggleCallback(tab);
  },

  render: function render() {
    var btnNewQuery;
    var queryPaneClasses = (0, _classnames2.default)({
      'query-pane-tabs clearfix': true,
      'query-pane-persisted': this.props.persisted,
      'query-pane-new': !this.props.persisted
    });

    if (this.props.persisted) {
      btnNewQuery = _react2.default.createElement(
        'li',
        { role: 'presentation', className: 'tab-new-query' },
        _react2.default.createElement(
          'a',
          { ref: 'new-query', href: '#',
            title: 'Create a new query',
            onClick: this.props.createNewQuery },
          _react2.default.createElement('span', { className: 'icon glyphicon icon-plus glyphicon-plus' })
        )
      );
    }

    return _react2.default.createElement(
      'div',
      { className: queryPaneClasses },
      _react2.default.createElement(
        'ul',
        { className: 'nav nav-tabs' },
        btnNewQuery,
        _react2.default.createElement(
          'li',
          { role: 'presentation', className: this.props.activePane === 'build' ? 'tab-build-query active' : 'tab-build-query' },
          _react2.default.createElement(
            'a',
            { ref: 'build-tab', href: '#',
              id: 'build-query',
              title: this.props.persisted ? "Edit query" : "Create a new query",
              onClick: this.toggled.bind(this, 'build') },
            this.props.persisted ? "Edit query" : "Create a new query"
          )
        ),
        _react2.default.createElement(
          'li',
          { role: 'presentation', className: this.props.activePane === 'browse' ? 'tab-browse-queries active' : 'tab-browse-queries' },
          _react2.default.createElement(
            'a',
            { ref: 'browse-tab', href: '#',
              id: 'browse',
              title: 'Browse saved queries',
              onClick: this.toggled.bind(this, 'browse') },
            _react2.default.createElement('span', { className: 'icon glyphicon icon-th-list glyphicon-th-list' }),
            'Browse'
          )
        )
      )
    );
  }

});

exports.default = QueryPaneTabs;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _fields_toggle = __webpack_require__(16);

var _fields_toggle2 = _interopRequireDefault(_fields_toggle);

var _select_field = __webpack_require__(42);

var _select_field2 = _interopRequireDefault(_select_field);

var _percentile_field = __webpack_require__(70);

var _percentile_field2 = _interopRequireDefault(_percentile_field);

var _group_by_field = __webpack_require__(71);

var _group_by_field2 = _interopRequireDefault(_group_by_field);

var _extraction_options = __webpack_require__(72);

var _extraction_options2 = _interopRequireDefault(_extraction_options);

var _funnel_builder = __webpack_require__(75);

var _funnel_builder2 = _interopRequireDefault(_funnel_builder);

var _timeframe = __webpack_require__(43);

var _timeframe2 = _interopRequireDefault(_timeframe);

var _interval = __webpack_require__(85);

var _interval2 = _interopRequireDefault(_interval);

var _input = __webpack_require__(17);

var _input2 = _interopRequireDefault(_input);

var _api_url = __webpack_require__(86);

var _api_url2 = _interopRequireDefault(_api_url);

var _ExplorerStore = __webpack_require__(12);

var _ExplorerStore2 = _interopRequireDefault(_ExplorerStore);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _FilterUtils = __webpack_require__(7);

var _FilterUtils2 = _interopRequireDefault(_FilterUtils);

var _ExplorerActions = __webpack_require__(5);

var _ExplorerActions2 = _interopRequireDefault(_ExplorerActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Components
var QueryBuilder = _react2.default.createClass({
  displayName: 'QueryBuilder',


  // Event callbacks

  handleSelectionWithEvent: function handleSelectionWithEvent(event) {
    this.handleChange(event.target.name, event.target.value);
  },

  handleChange: function handleChange(update, value) {
    var updates = { query: {} };

    if (_lodash2.default.isPlainObject(update)) {
      for (key in update) {
        updates.query[key] = update[key];
      }
    } else {
      updates.query[update] = value;
    }

    _ExplorerActions2.default.update(this.props.model.id, updates);
  },

  // Convenience Methods

  updateGroupBy: function updateGroupBy(updates) {
    _ExplorerActions2.default.update(this.props.model.id, { query: updates });
  },

  handleRevertChanges: function handleRevertChanges(event) {
    event.preventDefault();
    _ExplorerActions2.default.revertActiveChanges();
  },

  shouldShowRevertButton: function shouldShowRevertButton() {
    return _ExplorerUtils2.default.isPersisted(this.props.model) && this.props.model.originalModel && this.props.model.originalModel.query && !_lodash2.default.isEqual(this.props.model.query, this.props.model.originalModel.query);
  },

  // Fields Builders

  buildEventCollectionField: function buildEventCollectionField() {
    if (this.props.model.query.analysis_type !== 'funnel') {
      return _react2.default.createElement(_select_field2.default, { name: 'event_collection',
        label: 'Event Collection',
        value: this.props.model.query.event_collection,
        requiredLabel: true,
        onBrowseEvents: this.props.onBrowseEvents,
        handleChange: this.handleChange,
        options: this.props.project.eventCollections });
    }
  },

  buildExtractionOptions: function buildExtractionOptions() {
    if (this.props.model.query.analysis_type === 'extraction') {
      return _react2.default.createElement(_extraction_options2.default, { latest: this.props.model.query.latest,
        email: this.props.model.query.email,
        property_names: this.props.model.query.property_names,
        event_collection: this.props.model.query.event_collection,
        projectSchema: this.props.project.schema,
        isEmail: _ExplorerUtils2.default.isEmailExtraction(this.props.model),
        handleChangeWithEvent: this.handleSelectionWithEvent,
        handleChange: this.handleChange,
        setExtractionType: this.props.setExtractionType });
    }
  },

  buildGroupByField: function buildGroupByField() {
    if (['extraction', 'funnel'].indexOf(this.props.model.query.analysis_type) === -1) {
      return _react2.default.createElement(_group_by_field2.default, { ref: 'group-by-field',
        value: this.props.model.query.group_by,
        updateGroupBy: this.updateGroupBy,
        options: this.props.getEventPropertyNames(this.props.model.query.event_collection),
        handleChange: this.handleChange });
    }
  },

  buildTargetPropertyField: function buildTargetPropertyField() {
    var type = this.props.model.query.analysis_type;
    if (type !== null && _ExplorerUtils2.default.shouldHaveTarget(this.props.model)) {
      return _react2.default.createElement(_select_field2.default, { name: 'target_property',
        label: 'Target Property',
        inputClasses: ['target-property'],
        requiredLabel: true,
        handleChange: this.handleChange,
        options: this.props.getEventPropertyNames(this.props.model.query.event_collection),
        value: this.props.model.query.target_property,
        sort: true });
    }
  },

  buildPercentileField: function buildPercentileField() {
    if (this.props.model.query.analysis_type === 'percentile') {
      return _react2.default.createElement(_percentile_field2.default, { ref: 'percentile-field',
        value: this.props.model.query.percentile,
        onChange: this.handleSelectionWithEvent });
    }
  },

  buildIntervalField: function buildIntervalField() {
    if (['extraction', 'funnel'].indexOf(this.props.model.query.analysis_type) === -1) {
      return _react2.default.createElement(_interval2.default, { interval: this.props.model.query.interval,
        handleChange: this.handleChange });
    }
  },

  buildFilters: function buildFilters() {
    if (this.props.model.query.analysis_type !== 'funnel') {
      return _react2.default.createElement(
        'div',
        { className: 'field-component' },
        _react2.default.createElement(_fields_toggle2.default, { ref: 'filters-fields-toggle',
          name: 'Filters',
          toggleCallback: this.props.handleFiltersToggle,
          fieldsCount: _FilterUtils2.default.validFilters(this.props.model.query.filters).length })
      );
    }
  },

  buildGlobalTimeframePicker: function buildGlobalTimeframePicker() {
    if (this.props.model.query.analysis_type !== 'funnel') {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_timeframe2.default, { ref: 'timeframe',
          time: this.props.model.query.time,
          timezone: this.props.model.query.timezone,
          handleChange: this.handleChange }),
        _react2.default.createElement('hr', { className: 'fieldset-divider' })
      );
    }
  },

  buildFunnelBuilder: function buildFunnelBuilder() {
    if (this.props.model.query.analysis_type === 'funnel') {
      return _react2.default.createElement(_funnel_builder2.default, { modelId: this.props.model.id,
        steps: this.props.model.query.steps,
        stepNotices: this.props.stepNotices || [],
        onBrowseEvents: this.props.onBrowseEvents,
        eventCollections: this.props.project.eventCollections,
        getEventPropertyNames: this.props.getEventPropertyNames,
        getPropertyType: this.props.getPropertyType });
    }
  },

  buildClearButton: function buildClearButton() {
    if (!this.shouldShowRevertButton()) {
      return _react2.default.createElement(
        'button',
        { type: 'reset', role: 'clear-query',
          className: 'btn btn-default btn-block',
          id: 'clear-explorer-query',
          onClick: this.props.handleClearQuery },
        'Clear'
      );
    } else {
      return _react2.default.createElement(
        'button',
        {
          className: 'btn btn-default btn-block',
          onClick: this.handleRevertChanges,
          role: 'revert-query' },
        'Revert to original'
      );
    }
  },

  // React methods

  render: function render() {
    var apiQueryUrl;
    if (this.props.model.isValid) {
      apiQueryUrl = _ExplorerUtils2.default.getApiQueryUrl(this.props.client, this.props.model);
    }

    return _react2.default.createElement(
      'section',
      { className: 'query-pane-section query-builder' },
      _react2.default.createElement(
        'form',
        { className: 'form query-builder-form', onSubmit: this.props.handleQuerySubmit },
        _react2.default.createElement(_select_field2.default, { name: 'analysis_type',
          label: 'Analysis Type',
          inputClasses: ['analysis-type'],
          options: this.props.analysisTypes,
          value: this.props.model.query.analysis_type,
          handleChange: this.handleChange,
          requiredLabel: true }),
        this.buildEventCollectionField(),
        this.buildFunnelBuilder(),
        this.buildExtractionOptions(),
        this.buildTargetPropertyField(),
        this.buildPercentileField(),
        this.buildGlobalTimeframePicker(),
        this.buildGroupByField(),
        this.buildFilters(),
        this.buildIntervalField(),
        _react2.default.createElement(
          'div',
          { className: 'button-set-clear-toggle' },
          this.buildClearButton()
        ),
        _react2.default.createElement(_api_url2.default, { url: apiQueryUrl,
          isValid: this.props.model.isValid })
      )
    );
  }
});

exports.default = QueryBuilder;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _input = __webpack_require__(17);

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PercentileField = _react2.default.createClass({
  displayName: 'PercentileField',


  // React methods

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'field-component' },
      _react2.default.createElement(_input2.default, { ref: 'input',
        label: 'Percentile Value',
        classes: 'percentile',
        name: 'percentile',
        required: 'true',
        placeholder: 'Ex: 50',
        onChange: this.props.onChange,
        value: this.props.value || "" })
    );
  }

});

// Components
exports.default = PercentileField;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _fields_toggle = __webpack_require__(16);

var _fields_toggle2 = _interopRequireDefault(_fields_toggle);

var _react_select = __webpack_require__(13);

var _react_select2 = _interopRequireDefault(_react_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupByField = _react2.default.createClass({
  displayName: 'GroupByField',


  focusOnReactSelect: function focusOnReactSelect(toggled) {
    if (toggled && !this.props.value) {
      var self = this;
      setTimeout(function () {
        self.refs.select.refs.input.focus();
      }, 100);
    }
  },

  multiGroupToggle: function multiGroupToggle() {
    var icon = this.props.value.length > 1 ? 'remove' : 'plus';
    var text = this.props.value.length > 1 ? 'Remove second property' : 'Group by a second property';
    return _react2.default.createElement(
      'a',
      { className: 'double-groupby-toggle', href: '#', onClick: this.toggleMultiGroupBy },
      _react2.default.createElement('i', { className: "margin-right-bump icon glyphicon glyphicon-" + icon }),
      text
    );
  },

  secondField: function secondField() {
    if (this.props.value.length > 1) {
      return _react2.default.createElement(_react_select2.default, { ref: 'select',
        inputClasses: 'group-by form-control margin-bottom-tiny',
        wrapClasses: 'margin-top-tiny',
        name: 'group_by.1',
        items: this.props.options,
        handleChange: this.handleChange,
        value: this.props.value[1] || '',
        sort: true });
    }
  },

  getGroupBy: function getGroupBy() {
    return this.props.value;
  },

  handleChange: function handleChange(name, value) {
    var newVal = this.props.value.slice();
    newVal[name.split('.')[1]] = value;
    this.props.handleChange('group_by', newVal);
  },

  toggleMultiGroupBy: function toggleMultiGroupBy(event) {
    event.preventDefault();
    var newVal;
    switch (this.props.value.length) {
      case 0:
        newVal = ['', ''];
        break;
      case 1:
        newVal = this.props.value.concat(['']);
        break;
      case 2:
        newVal = this.props.value.slice(0, 1);
        break;
    }
    this.props.handleChange('group_by', newVal);
  },

  shouldBeOpen: function shouldBeOpen() {
    return this.props.value && this.props.value[0];
  },

  // React methods

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'field-component' },
      _react2.default.createElement(
        _fields_toggle2.default,
        { ref: 'toggle',
          name: 'Group By',
          initialOpenState: this.shouldBeOpen(),
          updateFn: this.props.updateGroupBy,
          getFn: this.getGroupBy,
          attrsToStore: 'group_by',
          resetValues: {
            group_by: []
          },
          toggleCallback: this.focusOnReactSelect },
        _react2.default.createElement(_react_select2.default, { ref: 'select',
          inputClasses: 'group-by form-control margin-bottom-tiny',
          name: 'group_by.0',
          items: this.props.options,
          handleChange: this.handleChange,
          value: this.props.value[0] || '',
          sort: true }),
        this.secondField(),
        this.multiGroupToggle()
      )
    );
  }

});

// Components
exports.default = GroupByField;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _input = __webpack_require__(17);

var _input2 = _interopRequireDefault(_input);

var _react_multi_select = __webpack_require__(73);

var _react_multi_select2 = _interopRequireDefault(_react_multi_select);

var _latest_field = __webpack_require__(74);

var _latest_field2 = _interopRequireDefault(_latest_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtractionOptions = function (_React$Component) {
  _inherits(ExtractionOptions, _React$Component);

  function ExtractionOptions() {
    _classCallCheck(this, ExtractionOptions);

    return _possibleConstructorReturn(this, (ExtractionOptions.__proto__ || Object.getPrototypeOf(ExtractionOptions)).apply(this, arguments));
  }

  _createClass(ExtractionOptions, [{
    key: '_getExtractionKeys',
    value: function _getExtractionKeys() {
      var _this2 = this;

      if (typeof this.props.projectSchema === "undefined") {
        return false;
      }

      var schema = this.props.projectSchema[this.props.event_collection];
      if (typeof schema === "undefined") {
        return false;
      }

      if (!schema.sortedProperties || !schema.sortedProperties.length) {
        return false;
      }

      return schema.sortedProperties.map(function (property) {
        return {
          value: property,
          selected: _this2.props.property_names && _this2.props.property_names.indexOf(property) > -1
        };
      });
    }
  }, {
    key: '_handlePropertyNamesChange',
    value: function _handlePropertyNamesChange(name, propertyName, shouldBeSelected) {
      var newPropertyNames = this.props.property_names.slice(0);
      if (shouldBeSelected) {
        newPropertyNames.push(propertyName);
      } else {
        newPropertyNames = newPropertyNames.filter(function (name) {
          return name !== propertyName;
        });
      }
      this.props.handleChange(name, newPropertyNames);
    }
  }, {
    key: 'render',
    value: function render() {
      var emailField = void 0;
      var latestField = void 0;
      var extractionPropertiesFilter = void 0;

      if (this.props.isEmail) {
        emailField = _react2.default.createElement(_input2.default, { type: 'text',
          name: 'email',
          label: 'Recipient email address',
          placeholder: 'your@email.com',
          required: 'true',
          value: this.props.email,
          onChange: this.props.handleChangeWithEvent });
        latestField = _react2.default.createElement(_latest_field2.default, { latest: this.props.latest, handleChange: this.props.handleChangeWithEvent });
      }

      if (this._getExtractionKeys()) {
        extractionPropertiesFilter = _react2.default.createElement(_react_multi_select2.default, {
          name: 'property_names',
          label: 'Filter extraction properties',
          handleChange: this._handlePropertyNamesChange.bind(this),
          items: this._getExtractionKeys()
        });
      }

      return _react2.default.createElement(
        'div',
        { className: 'field-component' },
        _react2.default.createElement(
          'div',
          { className: 'extraction-options' },
          _react2.default.createElement(
            'label',
            null,
            _react2.default.createElement('input', { type: 'radio', name: 'extraction_type', value: 'immediate', onChange: this.props.setExtractionType, checked: !this.props.isEmail }),
            ' Preview latest ',
            _ExplorerUtils2.default.EXRACTION_EVENT_LIMIT,
            ' events now'
          ),
          _react2.default.createElement(
            'label',
            null,
            _react2.default.createElement('input', { type: 'radio', name: 'extraction_type', value: 'email', onChange: this.props.setExtractionType, checked: this.props.isEmail }),
            ' Bulk CSV extraction by email'
          ),
          emailField,
          latestField,
          extractionPropertiesFilter
        )
      );
    }
  }]);

  return ExtractionOptions;
}(_react2.default.Component);

exports.default = ExtractionOptions;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactMultiSelect = function (_React$Component) {
  _inherits(ReactMultiSelect, _React$Component);

  function ReactMultiSelect(props) {
    _classCallCheck(this, ReactMultiSelect);

    var _this = _possibleConstructorReturn(this, (ReactMultiSelect.__proto__ || Object.getPrototypeOf(ReactMultiSelect)).call(this, props));

    _this.state = {
      open: false,
      id: 'react-multi-select',
      focusedIndex: 0
    };
    return _this;
  }

  _createClass(ReactMultiSelect, [{
    key: 'interceptEvent',
    value: function interceptEvent(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    // Private Event Handler Methods

  }, {
    key: '_toggleOpenClose',
    value: function _toggleOpenClose(event) {
      this.interceptEvent(event);

      if (this.state.open) {
        return this.setState({ open: false });
      } else {
        this.setState({ open: true });
      }
    }
  }, {
    key: '_isSelected',
    value: function _isSelected(itemVal) {
      return this.props.items.filter(function (item) {
        if (item.value === itemVal && item.selected) return true;
        return false;
      }).length > 0;
    }
  }, {
    key: '_handleOptionChange',
    value: function _handleOptionChange(event) {
      this.interceptEvent(event);
      this.props.handleChange(this.props.name, event.target.text, !this._isSelected(event.target.text));
    }
  }, {
    key: '_renderOption',
    value: function _renderOption(option, i) {
      var className = 'react-select-box-option';
      if (i === this.state.focusedIndex) {
        className += ' react-select-box-option-focused';
      }
      if (option.selected) {
        className += ' react-select-box-option-selected';
      }

      return _react2.default.createElement(
        'a',
        {
          id: this.state.id + '-' + i,
          className: className,
          href: '#',
          onClick: this._handleOptionChange.bind(this),
          title: option.label,
          key: i + '_' + option.label
        },
        option.label
      );
    }

    // Private HTML Element methods

  }, {
    key: '_renderOptionMenu',
    value: function _renderOptionMenu() {
      var _this2 = this;

      var className = 'react-select-box-options';
      if (!this.state.open) {
        className += ' react-select-box-hidden';
      }

      var options = this.props.items.map(function (item, i) {
        return _this2._renderOption({ value: item.value, selected: item.selected, label: item.value }, i);
      });

      return _react2.default.createElement(
        'div',
        { className: className, ref: 'menu' },
        options
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var selectedItems = this.props.items.filter(function (i) {
        return i.selected;
      });
      var label = selectedItems.length > 0 ? selectedItems.map(function (i) {
        return i.value;
      }).join(', ') : this.props.label;

      return _react2.default.createElement(
        'div',
        { className: 'react-select-box-container react-select-box-multi' },
        _react2.default.createElement(
          'button',
          { id: this.state.id, onClick: this._toggleOpenClose.bind(this), className: 'react-select-box' },
          _react2.default.createElement(
            'div',
            { className: 'react-select-box-label' },
            label
          )
        ),
        this._renderOptionMenu()
      );
    }
  }]);

  return ReactMultiSelect;
}(_react2.default.Component);

exports.default = ReactMultiSelect;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _input = __webpack_require__(17);

var _input2 = _interopRequireDefault(_input);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LatestField = _react2.default.createClass({
  displayName: 'LatestField',


  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'form-group' },
      _react2.default.createElement(_input2.default, { type: 'text',
        name: 'latest',
        label: 'Limit number of events to extract',
        value: this.props.latest,
        placeholder: 'Eg: 1000',
        onChange: this.props.handleChange }),
      _react2.default.createElement(
        'small',
        { className: 'text-muted' },
        _react2.default.createElement('span', { className: 'icon glyphicon glyphicon-info-sign' }),
        _react2.default.createElement(
          'span',
          null,
          'Results are limited to 10 million events'
        )
      )
    );
  }

});

exports.default = LatestField;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _funnel_step = __webpack_require__(76);

var _funnel_step2 = _interopRequireDefault(_funnel_step);

var _ExplorerActions = __webpack_require__(5);

var _ExplorerActions2 = _interopRequireDefault(_ExplorerActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FunnelsBuilder = _react2.default.createClass({
  displayName: 'FunnelsBuilder',


  propTypes: {
    modelId: _react2.default.PropTypes.string.isRequired,
    eventCollections: _react2.default.PropTypes.array.isRequired,
    steps: _react2.default.PropTypes.array.isRequired,
    stepNotices: _react2.default.PropTypes.array.isRequired,
    onBrowseEvents: _react2.default.PropTypes.func.isRequired,
    getEventPropertyNames: _react2.default.PropTypes.func.isRequired,
    getPropertyType: _react2.default.PropTypes.func.isRequired
  },

  handleChange: function handleChange(index, name, value) {
    var updates = {};
    updates[name] = value;
    _ExplorerActions2.default.updateStep(this.props.modelId, index, updates);
  },

  addStep: function addStep(e) {
    e.preventDefault();
    _ExplorerActions2.default.addStep(this.props.modelId);
  },

  removeStep: function removeStep(index) {
    _ExplorerActions2.default.removeStep(this.props.modelId, index);
  },

  handleAddFilter: function handleAddFilter(index) {
    _ExplorerActions2.default.addStepFilter(this.props.modelId, index);
  },

  handleRemoveFilter: function handleRemoveFilter(stepIndex, filterIndex) {
    _ExplorerActions2.default.removeStepFilter(this.props.modelId, stepIndex, filterIndex);
  },

  handleFilterChange: function handleFilterChange(stepIndex, filterIndex, updates) {
    _ExplorerActions2.default.updateStepFilter(this.props.modelId, stepIndex, filterIndex, updates);
  },

  toggleStepActive: function toggleStepActive(index, active) {
    if (active) {
      _ExplorerActions2.default.setStepActive(this.props.modelId, index);
    } else {
      _ExplorerActions2.default.updateStep(this.props.modelId, index, { active: false });
    }
  },

  moveStep: function moveStep(index, direction) {
    _ExplorerActions2.default.moveStep(this.props.modelId, index, direction);
  },

  buildSteps: function buildSteps() {
    return this.props.steps.map(function (step, index) {
      var notice = _lodash2.default.find(this.props.stepNotices, { stepIndex: index });
      return _react2.default.createElement(
        'li',
        { key: index },
        _react2.default.createElement(_funnel_step2.default, { index: index,
          step: step,
          notice: notice,
          removeStep: this.removeStep,
          canRemove: this.props.steps.length > 1,
          eventCollections: this.props.eventCollections,
          propertyNames: this.props.getEventPropertyNames(step.event_collection),
          onBrowseEvents: this.props.onBrowseEvents,
          toggleStepActive: this.toggleStepActive,
          handleChange: this.handleChange,
          handleAddFilter: this.handleAddFilter,
          handleRemoveFilter: this.handleRemoveFilter,
          handleFilterChange: this.handleFilterChange,
          getPropertyType: this.props.getPropertyType,
          handleFiltersToggle: this.handleFiltersToggle,
          moveStep: this.moveStep })
      );
    }.bind(this));
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'funnel-builder margin-top-small' },
      _react2.default.createElement(
        'h4',
        null,
        'Steps'
      ),
      _react2.default.createElement(
        'ul',
        { className: 'steps' },
        this.buildSteps()
      ),
      _react2.default.createElement(
        'a',
        { href: '#', className: 'add-step', onClick: this.addStep },
        _react2.default.createElement('i', { className: 'icon glyphicon glyphicon-plus-sign margin-right-tiny' }),
        'Add a step'
      )
    );
  }

});

exports.default = FunnelsBuilder;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _select_field = __webpack_require__(42);

var _select_field2 = _interopRequireDefault(_select_field);

var _timeframe = __webpack_require__(43);

var _timeframe2 = _interopRequireDefault(_timeframe);

var _fields_toggle = __webpack_require__(16);

var _fields_toggle2 = _interopRequireDefault(_fields_toggle);

var _notice = __webpack_require__(26);

var _notice2 = _interopRequireDefault(_notice);

var _filter_manager = __webpack_require__(46);

var _filter_manager2 = _interopRequireDefault(_filter_manager);

var _FilterUtils = __webpack_require__(7);

var _FilterUtils2 = _interopRequireDefault(_FilterUtils);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FunnelStep = _react2.default.createClass({
  displayName: 'FunnelStep',


  propTypes: {
    index: _react2.default.PropTypes.number.isRequired,
    step: _react2.default.PropTypes.object.isRequired,
    eventCollections: _react2.default.PropTypes.array.isRequired,
    propertyNames: _react2.default.PropTypes.array.isRequired,
    onBrowseEvents: _react2.default.PropTypes.func.isRequired,
    getPropertyType: _react2.default.PropTypes.func.isRequired,
    moveStep: _react2.default.PropTypes.func.isRequired,
    removeStep: _react2.default.PropTypes.func.isRequired,
    handleChange: _react2.default.PropTypes.func.isRequired,
    toggleStepActive: _react2.default.PropTypes.func.isRequired,
    handleFilterChange: _react2.default.PropTypes.func.isRequired,
    handleAddFilter: _react2.default.PropTypes.func.isRequired,
    handleRemoveFilter: _react2.default.PropTypes.func.isRequired
  },

  removeStep: function removeStep(e) {
    e.preventDefault();
    if (this.props.canRemove && confirm("Are you sure you want to delete this funnel step?")) {
      this.props.removeStep(this.props.index);
    }
  },

  handleChange: function handleChange(name, value) {
    this.props.handleChange(this.props.index, name, value);
  },

  handleChangeWithEvent: function handleChangeWithEvent(e) {
    e.preventDefault();
    this.props.handleChange(this.props.index, e.target.name, e.target.value);
  },

  handleCheckboxChange: function handleCheckboxChange(e) {
    this.props.handleChange(this.props.index, e.target.name, e.target.checked);
  },

  toggleStepActive: function toggleStepActive(e) {
    this.props.toggleStepActive(this.props.index, !this.props.step.active);
  },

  handleFiltersToggle: function handleFiltersToggle() {
    this.refs['filter-manager'].open();
  },

  handleAddFilter: function handleAddFilter() {
    this.props.handleAddFilter(this.props.index);
  },

  handleRemoveFilter: function handleRemoveFilter(filterIndex) {
    this.props.handleRemoveFilter(this.props.index, filterIndex);
  },

  handleFilterChange: function handleFilterChange(filterIndex, updates) {
    this.props.handleFilterChange(this.props.index, filterIndex, updates);
  },

  moveStepUp: function moveStepUp(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.moveStep(this.props.index, 'up');
  },

  moveStepDown: function moveStepDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.moveStep(this.props.index, 'down');
  },

  buildStepBody: function buildStepBody() {
    var remove, notice;

    if (this.props.canRemove) {
      remove = _react2.default.createElement(
        'a',
        { href: '#', className: 'remove-step', onClick: this.removeStep },
        _react2.default.createElement('i', { className: 'icon glyphicon glyphicon-remove-circle margin-right-tiny' }),
        'Remove Step'
      );
    }
    if (this.props.notice) {
      notice = _react2.default.createElement(_notice2.default, { notice: this.props.notice, closable: false });
    }

    if (this.props.step.active === true) {
      return _react2.default.createElement(
        'div',
        { className: 'step-body margin-top-small margin-bottom-small' },
        notice,
        _react2.default.createElement(_select_field2.default, { name: 'event_collection',
          label: 'Event Collection',
          value: this.props.step.event_collection,
          options: this.props.eventCollections,
          requiredLabel: true,
          onBrowseEvents: this.props.onBrowseEvents,
          handleChange: this.handleChange }),
        _react2.default.createElement(_select_field2.default, { name: 'actor_property',
          label: 'Actor Property',
          value: this.props.step.actor_property,
          options: this.props.propertyNames,
          requiredLabel: true,
          handleChange: this.handleChange }),
        _react2.default.createElement(_timeframe2.default, { ref: 'timeframe',
          time: this.props.step.time,
          timezone: this.props.step.timezone,
          handleChange: this.handleChange }),
        _react2.default.createElement(
          'div',
          { className: 'field-component' },
          _react2.default.createElement(_fields_toggle2.default, { ref: 'filters-fields-toggle',
            name: 'Filters',
            toggleCallback: this.handleFiltersToggle,
            fieldsCount: _FilterUtils2.default.validFilters(this.props.step.filters).length })
        ),
        _react2.default.createElement(_filter_manager2.default, { ref: 'filter-manager',
          eventCollection: this.props.step.event_collection,
          filters: this.props.step.filters,
          handleChange: this.handleFilterChange,
          removeFilter: this.handleRemoveFilter,
          addFilter: this.handleAddFilter,
          getPropertyType: this.props.getPropertyType,
          propertyNames: this.props.propertyNames }),
        _react2.default.createElement(
          'label',
          { className: 'block-label margin-top-small' },
          _react2.default.createElement('input', { name: 'optional', type: 'checkbox', checked: this.props.step.optional, onChange: this.handleCheckboxChange }),
          ' Optional Step'
        ),
        _react2.default.createElement(
          'label',
          { className: 'block-label' },
          _react2.default.createElement('input', { name: 'inverted', type: 'checkbox', checked: this.props.step.inverted, onChange: this.handleCheckboxChange }),
          ' Inverted Step'
        ),
        _react2.default.createElement(
          'label',
          { className: 'block-label' },
          _react2.default.createElement('input', { name: 'with_actors', type: 'checkbox', checked: this.props.step.with_actors, onChange: this.handleCheckboxChange }),
          ' With Actors'
        ),
        _react2.default.createElement('hr', null),
        remove
      );
    }
  },

  render: function render() {
    var stepWrapperClasses = (0, _classnames2.default)({
      'funnel-step': true,
      'active': this.props.step.active
    });
    return _react2.default.createElement(
      'div',
      { className: stepWrapperClasses },
      _react2.default.createElement(
        'div',
        { className: 'step-header clearfix', onClick: this.toggleStepActive, role: 'step-header' },
        _react2.default.createElement(
          'div',
          { className: 'step-move-btns' },
          _react2.default.createElement(
            'a',
            { href: '#', className: 'up', onClick: this.moveStepUp, role: 'move-step' },
            _react2.default.createElement('span', { className: 'arrow' })
          ),
          _react2.default.createElement(
            'a',
            { href: '#', className: 'down', onClick: this.moveStepDown, role: 'move-step' },
            _react2.default.createElement('span', { className: 'arrow' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'step-number' },
          this.props.index + 1
        ),
        _react2.default.createElement(
          'div',
          { className: 'step-name' },
          'Step ',
          this.props.index + 1
        )
      ),
      this.buildStepBody()
    );
  }

});

exports.default = FunnelStep;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = __webpack_require__(6);

var _moment2 = _interopRequireDefault(_moment);

var _datepicker = __webpack_require__(44);

var _datepicker2 = _interopRequireDefault(_datepicker);

var _timepicker = __webpack_require__(45);

var _timepicker2 = _interopRequireDefault(_timepicker);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _ExplorerActions = __webpack_require__(5);

var _ExplorerActions2 = _interopRequireDefault(_ExplorerActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateFormat = 'll';
var timeFormat = 'h:mm A';

var AbsolutePicker = _react2.default.createClass({
  displayName: 'AbsolutePicker',


  setDate: function setDate(name, value) {
    var time = this.props.time;
    var endValue = new Date(time.end);

    var updates = _lodash2.default.cloneDeep(time);
    if (name === 'start_date' && value > endValue) {
      updates.end = '';
    }
    updates[name] = new Date((0, _moment2.default)(new Date(value)).format(dateFormat) + " " + (0, _moment2.default)(time[name]).format(timeFormat));
    this.props.handleChange('time', updates);
  },

  handleDateBlur: function handleDateBlur(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setDate(name, value);
  },

  setTime: function setTime(name, value) {
    var time = this.props.time;
    var updates = _lodash2.default.cloneDeep(time);
    updates[name] = new Date((0, _moment2.default)(time[name]).format(dateFormat) + " " + (0, _moment2.default)(new Date(value)).format(timeFormat));
    this.props.handleChange('time', updates);
  },

  // React methods

  render: function render() {
    var time = this.props.time;

    return _react2.default.createElement(
      'div',
      { className: 'absolute-timeframe-picker' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-2' },
          _react2.default.createElement(
            'label',
            null,
            'Start'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-5 form-collapse-right' },
          _react2.default.createElement(_datepicker2.default, { ref: 'start-date',
            value: (0, _moment2.default)(time.start).format(dateFormat),
            name: 'start',
            placeholder: 'Date',
            onBlur: this.handleDateBlur,
            onSet: this.setDate })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-5 form-collapse-left' },
          _react2.default.createElement(_timepicker2.default, { ref: 'start-time',
            value: (0, _moment2.default)(time.start).format(timeFormat),
            name: 'start',
            placeholder: 'Time',
            handleBlur: this.setTime,
            handleSelection: this.setTime })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-2' },
          _react2.default.createElement(
            'label',
            null,
            'End'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-5 form-collapse-right' },
          _react2.default.createElement(_datepicker2.default, { ref: 'end-date',
            value: (0, _moment2.default)(time.end).format(dateFormat),
            minimum: (0, _moment2.default)(time.start).format(dateFormat),
            name: 'end',
            placeholder: 'Date',
            onBlur: this.handleDateBlur,
            onSet: this.setDate })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-5 form-collapse-left' },
          _react2.default.createElement(_timepicker2.default, { ref: 'end-time',
            value: (0, _moment2.default)(time.end).format(timeFormat),
            name: 'end',
            placeholder: 'Time',
            handleBlur: this.setTime,
            handleSelection: this.setTime })
        )
      )
    );
  }

});

exports.default = AbsolutePicker;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Date picker for pickadate.js v3.5.4
 * http://amsul.github.io/pickadate.js/date.htm
 */

(function (factory) {

    // AMD.
    if (typeof define == 'function' && define.amd) define(['picker', 'jquery'], factory);

    // Node.js/browserify.
    else if (( false ? undefined : _typeof(exports)) == 'object') module.exports = factory(__webpack_require__(29), __webpack_require__(30));

        // Browser globals.
        else factory(Picker, jQuery);
})(function (Picker, $) {

    /**
     * Globals and constants
     */
    var DAYS_IN_WEEK = 7,
        WEEKS_IN_CALENDAR = 6,
        _ = Picker._;

    /**
     * The date picker constructor
     */
    function DatePicker(picker, settings) {

        var calendar = this,
            element = picker.$node[0],
            elementValue = element.value,
            elementDataValue = picker.$node.data('value'),
            valueString = elementDataValue || elementValue,
            formatString = elementDataValue ? settings.formatSubmit : settings.format,
            isRTL = function isRTL() {

            return element.currentStyle ?

            // For IE.
            element.currentStyle.direction == 'rtl' :

            // For normal browsers.
            getComputedStyle(picker.$root[0]).direction == 'rtl';
        };

        calendar.settings = settings;
        calendar.$node = picker.$node;

        // The queue of methods that will be used to build item objects.
        calendar.queue = {
            min: 'measure create',
            max: 'measure create',
            now: 'now create',
            select: 'parse create validate',
            highlight: 'parse navigate create validate',
            view: 'parse create validate viewset',
            disable: 'deactivate',
            enable: 'activate'

            // The component's item object.
        };calendar.item = {};

        calendar.item.clear = null;
        calendar.item.disable = (settings.disable || []).slice(0);
        calendar.item.enable = -function (collectionDisabled) {
            return collectionDisabled[0] === true ? collectionDisabled.shift() : -1;
        }(calendar.item.disable);

        calendar.set('min', settings.min).set('max', settings.max).set('now');

        // When there’s a value, set the `select`, which in turn
        // also sets the `highlight` and `view`.
        if (valueString) {
            calendar.set('select', valueString, { format: formatString });
        }

        // If there’s no value, default to highlighting “today”.
        else {
                calendar.set('select', null).set('highlight', calendar.item.now);
            }

        // The keycode to movement mapping.
        calendar.key = {
            40: 7, // Down
            38: -7, // Up
            39: function _() {
                return isRTL() ? -1 : 1;
            }, // Right
            37: function _() {
                return isRTL() ? 1 : -1;
            }, // Left
            go: function go(timeChange) {
                var highlightedObject = calendar.item.highlight,
                    targetDate = new Date(Date.UTC(highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange));
                calendar.set('highlight', targetDate, { interval: timeChange });
                this.render();
            }

            // Bind some picker events.
        };picker.on('render', function () {
            picker.$root.find('.' + settings.klass.selectMonth).on('change', function () {
                var value = this.value;
                if (value) {
                    picker.set('highlight', [picker.get('view').year, value, picker.get('highlight').date]);
                    picker.$root.find('.' + settings.klass.selectMonth).trigger('focus');
                }
            });
            picker.$root.find('.' + settings.klass.selectYear).on('change', function () {
                var value = this.value;
                if (value) {
                    picker.set('highlight', [value, picker.get('view').month, picker.get('highlight').date]);
                    picker.$root.find('.' + settings.klass.selectYear).trigger('focus');
                }
            });
        }, 1).on('open', function () {
            var includeToday = '';
            if (calendar.disabled(calendar.get('now'))) {
                includeToday = ':not(.' + settings.klass.buttonToday + ')';
            }
            picker.$root.find('button' + includeToday + ', select').attr('disabled', false);
        }, 1).on('close', function () {
            picker.$root.find('button, select').attr('disabled', true);
        }, 1);
    } //DatePicker


    /**
     * Set a datepicker item object.
     */
    DatePicker.prototype.set = function (type, value, options) {

        var calendar = this,
            calendarItem = calendar.item;

        // If the value is `null` just set it immediately.
        if (value === null) {
            if (type == 'clear') type = 'select';
            calendarItem[type] = value;
            return calendar;
        }

        // Otherwise go through the queue of methods, and invoke the functions.
        // Update this as the time unit, and set the final value as this item.
        // * In the case of `enable`, keep the queue but set `disable` instead.
        //   And in the case of `flip`, keep the queue but set `enable` instead.
        calendarItem[type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type] = calendar.queue[type].split(' ').map(function (method) {
            value = calendar[method](type, value, options);
            return value;
        }).pop();

        // Check if we need to cascade through more updates.
        if (type == 'select') {
            calendar.set('highlight', calendarItem.select, options);
        } else if (type == 'highlight') {
            calendar.set('view', calendarItem.highlight, options);
        } else if (type.match(/^(flip|min|max|disable|enable)$/)) {
            if (calendarItem.select && calendar.disabled(calendarItem.select)) {
                calendar.set('select', calendarItem.select, options);
            }
            if (calendarItem.highlight && calendar.disabled(calendarItem.highlight)) {
                calendar.set('highlight', calendarItem.highlight, options);
            }
        }

        return calendar;
    }; //DatePicker.prototype.set


    /**
     * Get a datepicker item object.
     */
    DatePicker.prototype.get = function (type) {
        return this.item[type];
    }; //DatePicker.prototype.get


    /**
     * Create a picker date object.
     */
    DatePicker.prototype.create = function (type, value, options) {

        var isInfiniteValue,
            calendar = this;

        // If there’s no value, use the type as the value.
        value = value === undefined ? type : value;

        // If it’s infinity, update the value.
        if (value == -Infinity || value == Infinity) {
            isInfiniteValue = value;
        }

        // If it’s an object, use the native date object.
        else if ($.isPlainObject(value) && _.isInteger(value.pick)) {
                value = value.obj;
            }

            // If it’s an array, convert it into a date and make sure
            // that it’s a valid date – otherwise default to today.
            else if ($.isArray(value)) {
                    value = new Date(Date.UTC(value[0], value[1], value[2]));
                    value = _.isDate(value) ? value : calendar.create().obj;
                }

                // If it’s a number, make a normalized date.
                else if (_.isInteger(value)) {
                        value = calendar.normalize(new Date(value), options);
                    }

                    // If it’s a date object, make a normalized date.
                    else if (_.isDate(value)) {
                            value = calendar.normalize(value, options);
                        }

                        // If it’s a literal true or any other case, set it to now.
                        else /*if ( value === true )*/{
                                value = calendar.now(type, value, options);
                            }

        // Return the compiled object.
        return {
            year: isInfiniteValue || value.getUTCFullYear(),
            month: isInfiniteValue || value.getUTCMonth(),
            date: isInfiniteValue || value.getUTCDate(),
            day: isInfiniteValue || value.getUTCDay(),
            obj: isInfiniteValue || value,
            pick: isInfiniteValue || value.getTime()
        };
    }; //DatePicker.prototype.create


    /**
     * Create a range limit object using an array, date object,
     * literal “true”, or integer relative to another time.
     */
    DatePicker.prototype.createRange = function (from, to) {

        var calendar = this,
            createDate = function createDate(date) {
            if (date === true || $.isArray(date) || _.isDate(date)) {
                return calendar.create(date);
            }
            return date;
        };

        // Create objects if possible.
        if (!_.isInteger(from)) {
            from = createDate(from);
        }
        if (!_.isInteger(to)) {
            to = createDate(to);
        }

        // Create relative dates.
        if (_.isInteger(from) && $.isPlainObject(to)) {
            from = [to.year, to.month, to.date + from];
        } else if (_.isInteger(to) && $.isPlainObject(from)) {
            to = [from.year, from.month, from.date + to];
        }

        return {
            from: createDate(from),
            to: createDate(to)
        };
    }; //DatePicker.prototype.createRange


    /**
     * Check if a date unit falls within a date range object.
     */
    DatePicker.prototype.withinRange = function (range, dateUnit) {
        range = this.createRange(range.from, range.to);
        return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick;
    };

    /**
     * Check if two date range objects overlap.
     */
    DatePicker.prototype.overlapRanges = function (one, two) {

        var calendar = this;

        // Convert the ranges into comparable dates.
        one = calendar.createRange(one.from, one.to);
        two = calendar.createRange(two.from, two.to);

        return calendar.withinRange(one, two.from) || calendar.withinRange(one, two.to) || calendar.withinRange(two, one.from) || calendar.withinRange(two, one.to);
    };

    /**
     * Get the date today.
     */
    DatePicker.prototype.now = function (type, value, options) {
        value = new Date();
        if (options && options.rel) {
            value.setUTCDate(value.getUTCDate() + options.rel);
        }
        return this.normalize(value, options);
    };

    /**
     * Navigate to next/prev month.
     */
    DatePicker.prototype.navigate = function (type, value, options) {

        var targetDateObject,
            targetYear,
            targetMonth,
            targetDate,
            isTargetArray = $.isArray(value),
            isTargetObject = $.isPlainObject(value),
            viewsetObject = this.item.view; /*,
                                            safety = 100*/

        if (isTargetArray || isTargetObject) {

            if (isTargetObject) {
                targetYear = value.year;
                targetMonth = value.month;
                targetDate = value.date;
            } else {
                targetYear = +value[0];
                targetMonth = +value[1];
                targetDate = +value[2];
            }

            // If we’re navigating months but the view is in a different
            // month, navigate to the view’s year and month.
            if (options && options.nav && viewsetObject && viewsetObject.month !== targetMonth) {
                targetYear = viewsetObject.year;
                targetMonth = viewsetObject.month;
            }

            // Figure out the expected target year and month.
            targetDateObject = new Date(Date.UTC(targetYear, targetMonth + (options && options.nav ? options.nav : 0), 1));
            targetYear = targetDateObject.getUTCFullYear();
            targetMonth = targetDateObject.getUTCMonth();

            // If the month we’re going to doesn’t have enough days,
            // keep decreasing the date until we reach the month’s last date.
            while ( /*safety &&*/new Date(Date.UTC(targetYear, targetMonth, targetDate)).getUTCMonth() !== targetMonth) {
                targetDate -= 1;
                /*safety -= 1
                if ( !safety ) {
                    throw 'Fell into an infinite loop while navigating to ' + new Date( targetYear, targetMonth, targetDate ) + '.'
                }*/
            }

            value = [targetYear, targetMonth, targetDate];
        }

        return value;
    }; //DatePicker.prototype.navigate


    /**
     * Normalize a date by setting the hours to midnight.
     */
    DatePicker.prototype.normalize = function (value /*, options*/) {
        value.setUTCHours(0, 0, 0, 0);
        return value;
    };

    /**
     * Measure the range of dates.
     */
    DatePicker.prototype.measure = function (type, value /*, options*/) {

        var calendar = this;

        // If it’s anything false-y, remove the limits.
        if (!value) {
            value = type == 'min' ? -Infinity : Infinity;
        }

        // If it’s a string, parse it.
        else if (typeof value == 'string') {
                value = calendar.parse(type, value);
            }

            // If it's an integer, get a date relative to today.
            else if (_.isInteger(value)) {
                    value = calendar.now(type, value, { rel: value });
                }

        return value;
    }; ///DatePicker.prototype.measure


    /**
     * Create a viewset object based on navigation.
     */
    DatePicker.prototype.viewset = function (type, dateObject /*, options*/) {
        return this.create([dateObject.year, dateObject.month, 1]);
    };

    /**
     * Validate a date as enabled and shift if needed.
     */
    DatePicker.prototype.validate = function (type, dateObject, options) {

        var calendar = this,


        // Keep a reference to the original date.
        originalDateObject = dateObject,


        // Make sure we have an interval.
        interval = options && options.interval ? options.interval : 1,


        // Check if the calendar enabled dates are inverted.
        isFlippedBase = calendar.item.enable === -1,


        // Check if we have any enabled dates after/before now.
        hasEnabledBeforeTarget,
            hasEnabledAfterTarget,


        // The min & max limits.
        minLimitObject = calendar.item.min,
            maxLimitObject = calendar.item.max,


        // Check if we’ve reached the limit during shifting.
        reachedMin,
            reachedMax,


        // Check if the calendar is inverted and at least one weekday is enabled.
        hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter(function (value) {

            // If there’s a date, check where it is relative to the target.
            if ($.isArray(value)) {
                var dateTime = calendar.create(value).pick;
                if (dateTime < dateObject.pick) hasEnabledBeforeTarget = true;else if (dateTime > dateObject.pick) hasEnabledAfterTarget = true;
            }

            // Return only integers for enabled weekdays.
            return _.isInteger(value);
        }).length; /*,
                   safety = 100*/

        // Cases to validate for:
        // [1] Not inverted and date disabled.
        // [2] Inverted and some dates enabled.
        // [3] Not inverted and out of range.
        //
        // Cases to **not** validate for:
        // • Navigating months.
        // • Not inverted and date enabled.
        // • Inverted and all dates disabled.
        // • ..and anything else.
        if (!options || !options.nav) if (
        /* 1 */!isFlippedBase && calendar.disabled(dateObject) ||
        /* 2 */isFlippedBase && calendar.disabled(dateObject) && (hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget) ||
        /* 3 */!isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick)) {

            // When inverted, flip the direction if there aren’t any enabled weekdays
            // and there are no enabled dates in the direction of the interval.
            if (isFlippedBase && !hasEnabledWeekdays && (!hasEnabledAfterTarget && interval > 0 || !hasEnabledBeforeTarget && interval < 0)) {
                interval *= -1;
            }

            // Keep looping until we reach an enabled date.
            while ( /*safety &&*/calendar.disabled(dateObject)) {

                /*safety -= 1
                if ( !safety ) {
                    throw 'Fell into an infinite loop while validating ' + dateObject.obj + '.'
                }*/

                // If we’ve looped into the next/prev month with a large interval, return to the original date and flatten the interval.
                if (Math.abs(interval) > 1 && (dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month)) {
                    dateObject = originalDateObject;
                    interval = interval > 0 ? 1 : -1;
                }

                // If we’ve reached the min/max limit, reverse the direction, flatten the interval and set it to the limit.
                if (dateObject.pick <= minLimitObject.pick) {
                    reachedMin = true;
                    interval = 1;
                    dateObject = calendar.create([minLimitObject.year, minLimitObject.month, minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)]);
                } else if (dateObject.pick >= maxLimitObject.pick) {
                    reachedMax = true;
                    interval = -1;
                    dateObject = calendar.create([maxLimitObject.year, maxLimitObject.month, maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)]);
                }

                // If we’ve reached both limits, just break out of the loop.
                if (reachedMin && reachedMax) {
                    break;
                }

                // Finally, create the shifted date using the interval and keep looping.
                dateObject = calendar.create([dateObject.year, dateObject.month, dateObject.date + interval]);
            }
        } //endif


        // Return the date object settled on.
        return dateObject;
    }; //DatePicker.prototype.validate


    /**
     * Check if a date is disabled.
     */
    DatePicker.prototype.disabled = function (dateToVerify) {

        var calendar = this,


        // Filter through the disabled dates to check if this is one.
        isDisabledMatch = calendar.item.disable.filter(function (dateToDisable) {

            // If the date is a number, match the weekday with 0index and `firstDay` check.
            if (_.isInteger(dateToDisable)) {
                return dateToVerify.day === (calendar.settings.firstDay ? dateToDisable : dateToDisable - 1) % 7;
            }

            // If it’s an array or a native JS date, create and match the exact date.
            if ($.isArray(dateToDisable) || _.isDate(dateToDisable)) {
                return dateToVerify.pick === calendar.create(dateToDisable).pick;
            }

            // If it’s an object, match a date within the “from” and “to” range.
            if ($.isPlainObject(dateToDisable)) {
                return calendar.withinRange(dateToDisable, dateToVerify);
            }
        });

        // If this date matches a disabled date, confirm it’s not inverted.
        isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function (dateToDisable) {
            return $.isArray(dateToDisable) && dateToDisable[3] == 'inverted' || $.isPlainObject(dateToDisable) && dateToDisable.inverted;
        }).length;

        // Check the calendar “enabled” flag and respectively flip the
        // disabled state. Then also check if it’s beyond the min/max limits.
        return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch || dateToVerify.pick < calendar.item.min.pick || dateToVerify.pick > calendar.item.max.pick;
    }; //DatePicker.prototype.disabled


    /**
     * Parse a string into a usable type.
     */
    DatePicker.prototype.parse = function (type, value, options) {

        var calendar = this,
            parsingObject = {};

        // If it’s already parsed, we’re good.
        if (!value || typeof value != 'string') {
            return value;
        }

        // We need a `.format` to parse the value with.
        if (!(options && options.format)) {
            options = options || {};
            options.format = calendar.settings.format;
        }

        // Convert the format into an array and then map through it.
        calendar.formats.toArray(options.format).map(function (label) {

            var
            // Grab the formatting label.
            formattingLabel = calendar.formats[label],


            // The format length is from the formatting label function or the
            // label length without the escaping exclamation (!) mark.
            formatLength = formattingLabel ? _.trigger(formattingLabel, calendar, [value, parsingObject]) : label.replace(/^!/, '').length;

            // If there's a format label, split the value up to the format length.
            // Then add it to the parsing object with appropriate label.
            if (formattingLabel) {
                parsingObject[label] = value.substr(0, formatLength);
            }

            // Update the value as the substring from format length to end.
            value = value.substr(formatLength);
        });

        // Compensate for month 0index.
        return [parsingObject.yyyy || parsingObject.yy, +(parsingObject.mm || parsingObject.m) - 1, parsingObject.dd || parsingObject.d];
    }; //DatePicker.prototype.parse


    /**
     * Various formats to display the object in.
     */
    DatePicker.prototype.formats = function () {

        // Return the length of the first word in a collection.
        function getWordLengthFromCollection(string, collection, dateObject) {

            // Grab the first word from the string.
            var word = string.match(/\w+/)[0];

            // If there's no month index, add it to the date object
            if (!dateObject.mm && !dateObject.m) {
                dateObject.m = collection.indexOf(word) + 1;
            }

            // Return the length of the word.
            return word.length;
        }

        // Get the length of the first word in a string.
        function getFirstWordLength(string) {
            return string.match(/\w+/)[0].length;
        }

        return {

            d: function d(string, dateObject) {

                // If there's string, then get the digits length.
                // Otherwise return the selected date.
                return string ? _.digits(string) : dateObject.date;
            },
            dd: function dd(string, dateObject) {

                // If there's a string, then the length is always 2.
                // Otherwise return the selected date with a leading zero.
                return string ? 2 : _.lead(dateObject.date);
            },
            ddd: function ddd(string, dateObject) {

                // If there's a string, then get the length of the first word.
                // Otherwise return the short selected weekday.
                return string ? getFirstWordLength(string) : this.settings.weekdaysShort[dateObject.day];
            },
            dddd: function dddd(string, dateObject) {

                // If there's a string, then get the length of the first word.
                // Otherwise return the full selected weekday.
                return string ? getFirstWordLength(string) : this.settings.weekdaysFull[dateObject.day];
            },
            m: function m(string, dateObject) {

                // If there's a string, then get the length of the digits
                // Otherwise return the selected month with 0index compensation.
                return string ? _.digits(string) : dateObject.month + 1;
            },
            mm: function mm(string, dateObject) {

                // If there's a string, then the length is always 2.
                // Otherwise return the selected month with 0index and leading zero.
                return string ? 2 : _.lead(dateObject.month + 1);
            },
            mmm: function mmm(string, dateObject) {

                var collection = this.settings.monthsShort;

                // If there's a string, get length of the relevant month from the short
                // months collection. Otherwise return the selected month from that collection.
                return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
            },
            mmmm: function mmmm(string, dateObject) {

                var collection = this.settings.monthsFull;

                // If there's a string, get length of the relevant month from the full
                // months collection. Otherwise return the selected month from that collection.
                return string ? getWordLengthFromCollection(string, collection, dateObject) : collection[dateObject.month];
            },
            yy: function yy(string, dateObject) {

                // If there's a string, then the length is always 2.
                // Otherwise return the selected year by slicing out the first 2 digits.
                return string ? 2 : ('' + dateObject.year).slice(2);
            },
            yyyy: function yyyy(string, dateObject) {

                // If there's a string, then the length is always 4.
                // Otherwise return the selected year.
                return string ? 4 : dateObject.year;
            },

            // Create an array by splitting the formatting string passed.
            toArray: function toArray(formatString) {
                return formatString.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
            },

            // Format an object into a string using the formatting options.
            toString: function toString(formatString, itemObject) {
                var calendar = this;
                return calendar.formats.toArray(formatString).map(function (label) {
                    return _.trigger(calendar.formats[label], calendar, [0, itemObject]) || label.replace(/^!/, '');
                }).join('');
            }
        };
    }(); //DatePicker.prototype.formats


    /**
     * Check if two date units are the exact.
     */
    DatePicker.prototype.isDateExact = function (one, two) {

        var calendar = this;

        // When we’re working with weekdays, do a direct comparison.
        if (_.isInteger(one) && _.isInteger(two) || typeof one == 'boolean' && typeof two == 'boolean') {
            return one === two;
        }

        // When we’re working with date representations, compare the “pick” value.
        if ((_.isDate(one) || $.isArray(one)) && (_.isDate(two) || $.isArray(two))) {
            return calendar.create(one).pick === calendar.create(two).pick;
        }

        // When we’re working with range objects, compare the “from” and “to”.
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
            return calendar.isDateExact(one.from, two.from) && calendar.isDateExact(one.to, two.to);
        }

        return false;
    };

    /**
     * Check if two date units overlap.
     */
    DatePicker.prototype.isDateOverlap = function (one, two) {

        var calendar = this,
            firstDay = calendar.settings.firstDay ? 1 : 0;

        // When we’re working with a weekday index, compare the days.
        if (_.isInteger(one) && (_.isDate(two) || $.isArray(two))) {
            one = one % 7 + firstDay;
            return one === calendar.create(two).day + 1;
        }
        if (_.isInteger(two) && (_.isDate(one) || $.isArray(one))) {
            two = two % 7 + firstDay;
            return two === calendar.create(one).day + 1;
        }

        // When we’re working with range objects, check if the ranges overlap.
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
            return calendar.overlapRanges(one, two);
        }

        return false;
    };

    /**
     * Flip the “enabled” state.
     */
    DatePicker.prototype.flipEnable = function (val) {
        var itemObject = this.item;
        itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1);
    };

    /**
     * Mark a collection of dates as “disabled”.
     */
    DatePicker.prototype.deactivate = function (type, datesToDisable) {

        var calendar = this,
            disabledItems = calendar.item.disable.slice(0);

        // If we’re flipping, that’s all we need to do.
        if (datesToDisable == 'flip') {
            calendar.flipEnable();
        } else if (datesToDisable === false) {
            calendar.flipEnable(1);
            disabledItems = [];
        } else if (datesToDisable === true) {
            calendar.flipEnable(-1);
            disabledItems = [];
        }

        // Otherwise go through the dates to disable.
        else {

                datesToDisable.map(function (unitToDisable) {

                    var matchFound;

                    // When we have disabled items, check for matches.
                    // If something is matched, immediately break out.
                    for (var index = 0; index < disabledItems.length; index += 1) {
                        if (calendar.isDateExact(unitToDisable, disabledItems[index])) {
                            matchFound = true;
                            break;
                        }
                    }

                    // If nothing was found, add the validated unit to the collection.
                    if (!matchFound) {
                        if (_.isInteger(unitToDisable) || _.isDate(unitToDisable) || $.isArray(unitToDisable) || $.isPlainObject(unitToDisable) && unitToDisable.from && unitToDisable.to) {
                            disabledItems.push(unitToDisable);
                        }
                    }
                });
            }

        // Return the updated collection.
        return disabledItems;
    }; //DatePicker.prototype.deactivate


    /**
     * Mark a collection of dates as “enabled”.
     */
    DatePicker.prototype.activate = function (type, datesToEnable) {

        var calendar = this,
            disabledItems = calendar.item.disable,
            disabledItemsCount = disabledItems.length;

        // If we’re flipping, that’s all we need to do.
        if (datesToEnable == 'flip') {
            calendar.flipEnable();
        } else if (datesToEnable === true) {
            calendar.flipEnable(1);
            disabledItems = [];
        } else if (datesToEnable === false) {
            calendar.flipEnable(-1);
            disabledItems = [];
        }

        // Otherwise go through the disabled dates.
        else {

                datesToEnable.map(function (unitToEnable) {

                    var matchFound, disabledUnit, index, isExactRange;

                    // Go through the disabled items and try to find a match.
                    for (index = 0; index < disabledItemsCount; index += 1) {

                        disabledUnit = disabledItems[index];

                        // When an exact match is found, remove it from the collection.
                        if (calendar.isDateExact(disabledUnit, unitToEnable)) {
                            matchFound = disabledItems[index] = null;
                            isExactRange = true;
                            break;
                        }

                        // When an overlapped match is found, add the “inverted” state to it.
                        else if (calendar.isDateOverlap(disabledUnit, unitToEnable)) {
                                if ($.isPlainObject(unitToEnable)) {
                                    unitToEnable.inverted = true;
                                    matchFound = unitToEnable;
                                } else if ($.isArray(unitToEnable)) {
                                    matchFound = unitToEnable;
                                    if (!matchFound[3]) matchFound.push('inverted');
                                } else if (_.isDate(unitToEnable)) {
                                    matchFound = [unitToEnable.getUTCFullYear(), unitToEnable.getUTCMonth(), unitToEnable.getUTCDate(), 'inverted'];
                                }
                                break;
                            }
                    }

                    // If a match was found, remove a previous duplicate entry.
                    if (matchFound) for (index = 0; index < disabledItemsCount; index += 1) {
                        if (calendar.isDateExact(disabledItems[index], unitToEnable)) {
                            disabledItems[index] = null;
                            break;
                        }
                    }

                    // In the event that we’re dealing with an exact range of dates,
                    // make sure there are no “inverted” dates because of it.
                    if (isExactRange) for (index = 0; index < disabledItemsCount; index += 1) {
                        if (calendar.isDateOverlap(disabledItems[index], unitToEnable)) {
                            disabledItems[index] = null;
                            break;
                        }
                    }

                    // If something is still matched, add it into the collection.
                    if (matchFound) {
                        disabledItems.push(matchFound);
                    }
                });
            }

        // Return the updated collection.
        return disabledItems.filter(function (val) {
            return val != null;
        });
    }; //DatePicker.prototype.activate


    /**
     * Create a string for the nodes in the picker.
     */
    DatePicker.prototype.nodes = function (isOpen) {

        var calendar = this,
            settings = calendar.settings,
            calendarItem = calendar.item,
            nowObject = calendarItem.now,
            selectedObject = calendarItem.select,
            highlightedObject = calendarItem.highlight,
            viewsetObject = calendarItem.view,
            disabledCollection = calendarItem.disable,
            minLimitObject = calendarItem.min,
            maxLimitObject = calendarItem.max,


        // Create the calendar table head using a copy of weekday labels collection.
        // * We do a copy so we don't mutate the original array.
        tableHead = function (collection, fullCollection) {

            // If the first day should be Monday, move Sunday to the end.
            if (settings.firstDay) {
                collection.push(collection.shift());
                fullCollection.push(fullCollection.shift());
            }

            // Create and return the table head group.
            return _.node('thead', _.node('tr', _.group({
                min: 0,
                max: DAYS_IN_WEEK - 1,
                i: 1,
                node: 'th',
                item: function item(counter) {
                    return [collection[counter], settings.klass.weekdays, 'scope=col title="' + fullCollection[counter] + '"'];
                }
            }))); //endreturn
        }((settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysShort).slice(0), settings.weekdaysFull.slice(0)),
            //tableHead


        // Create the nav for next/prev month.
        createMonthNav = function createMonthNav(next) {

            // Otherwise, return the created month tag.
            return _.node('div', ' ', settings.klass['nav' + (next ? 'Next' : 'Prev')] + (

            // If the focused month is outside the range, disabled the button.
            next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month || !next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month ? ' ' + settings.klass.navDisabled : ''), 'data-nav=' + (next || -1) + ' ' + _.ariaAttr({
                role: 'button',
                controls: calendar.$node[0].id + '_table'
            }) + ' ' + 'title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev) + '"'); //endreturn
        },
            //createMonthNav


        // Create the month label.
        createMonthLabel = function createMonthLabel() {

            var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull;

            // If there are months to select, add a dropdown menu.
            if (settings.selectMonths) {

                return _.node('select', _.group({
                    min: 0,
                    max: 11,
                    i: 1,
                    node: 'option',
                    item: function item(loopedMonth) {

                        return [

                        // The looped month and no classes.
                        monthsCollection[loopedMonth], 0,

                        // Set the value and selected index.
                        'value=' + loopedMonth + (viewsetObject.month == loopedMonth ? ' selected' : '') + (viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month || viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month ? ' disabled' : '')];
                    }
                }), settings.klass.selectMonth, (isOpen ? '' : 'disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' + 'title="' + settings.labelMonthSelect + '"');
            }

            // If there's a need for a month selector
            return _.node('div', monthsCollection[viewsetObject.month], settings.klass.month);
        },
            //createMonthLabel


        // Create the year label.
        createYearLabel = function createYearLabel() {

            var focusedYear = viewsetObject.year,


            // If years selector is set to a literal "true", set it to 5. Otherwise
            // divide in half to get half before and half after focused year.
            numberYears = settings.selectYears === true ? 5 : ~~(settings.selectYears / 2);

            // If there are years to select, add a dropdown menu.
            if (numberYears) {

                var minYear = minLimitObject.year,
                    maxYear = maxLimitObject.year,
                    lowestYear = focusedYear - numberYears,
                    highestYear = focusedYear + numberYears;

                // If the min year is greater than the lowest year, increase the highest year
                // by the difference and set the lowest year to the min year.
                if (minYear > lowestYear) {
                    highestYear += minYear - lowestYear;
                    lowestYear = minYear;
                }

                // If the max year is less than the highest year, decrease the lowest year
                // by the lower of the two: available and needed years. Then set the
                // highest year to the max year.
                if (maxYear < highestYear) {

                    var availableYears = lowestYear - minYear,
                        neededYears = highestYear - maxYear;

                    lowestYear -= availableYears > neededYears ? neededYears : availableYears;
                    highestYear = maxYear;
                }

                return _.node('select', _.group({
                    min: lowestYear,
                    max: highestYear,
                    i: 1,
                    node: 'option',
                    item: function item(loopedYear) {
                        return [

                        // The looped year and no classes.
                        loopedYear, 0,

                        // Set the value and selected index.
                        'value=' + loopedYear + (focusedYear == loopedYear ? ' selected' : '')];
                    }
                }), settings.klass.selectYear, (isOpen ? '' : 'disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' + 'title="' + settings.labelYearSelect + '"');
            }

            // Otherwise just return the year focused
            return _.node('div', focusedYear, settings.klass.year);
        }; //createYearLabel


        // Create and return the entire calendar.
        return _.node('div', (settings.selectYears ? createYearLabel() + createMonthLabel() : createMonthLabel() + createYearLabel()) + createMonthNav() + createMonthNav(1), settings.klass.header) + _.node('table', tableHead + _.node('tbody', _.group({
            min: 0,
            max: WEEKS_IN_CALENDAR - 1,
            i: 1,
            node: 'tr',
            item: function item(rowCounter) {

                // If Monday is the first day and the month starts on Sunday, shift the date back a week.
                var shiftDateBy = settings.firstDay && calendar.create([viewsetObject.year, viewsetObject.month, 1]).day === 0 ? -7 : 0;

                return [_.group({
                    min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1, // Add 1 for weekday 0index
                    max: function max() {
                        return this.min + DAYS_IN_WEEK - 1;
                    },
                    i: 1,
                    node: 'td',
                    item: function item(targetDate) {

                        // Convert the time date from a relative date to a target date.
                        targetDate = calendar.create([viewsetObject.year, viewsetObject.month, targetDate + (settings.firstDay ? 1 : 0)]);

                        var isSelected = selectedObject && selectedObject.pick == targetDate.pick,
                            isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick,
                            isDisabled = disabledCollection && calendar.disabled(targetDate) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick;

                        return [_.node('div', targetDate.date, function (klasses) {

                            // Add the `infocus` or `outfocus` classes based on month in view.
                            klasses.push(viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus);

                            // Add the `today` class if needed.
                            if (nowObject.pick == targetDate.pick) {
                                klasses.push(settings.klass.now);
                            }

                            // Add the `selected` class if something's selected and the time matches.
                            if (isSelected) {
                                klasses.push(settings.klass.selected);
                            }

                            // Add the `highlighted` class if something's highlighted and the time matches.
                            if (isHighlighted) {
                                klasses.push(settings.klass.highlighted);
                            }

                            // Add the `disabled` class if something's disabled and the object matches.
                            if (isDisabled) {
                                klasses.push(settings.klass.disabled);
                            }

                            return klasses.join(' ');
                        }([settings.klass.day]), 'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
                            role: 'gridcell',
                            selected: isSelected && calendar.$node.val() === _.trigger(calendar.formats.toString, calendar, [settings.format, targetDate]) ? true : null,
                            activedescendant: isHighlighted ? true : null,
                            disabled: isDisabled ? true : null
                        })), '', _.ariaAttr({ role: 'presentation' })]; //endreturn
                    }
                })]; //endreturn
            }
        })), settings.klass.table, 'id="' + calendar.$node[0].id + '_table' + '" ' + _.ariaAttr({
            role: 'grid',
            controls: calendar.$node[0].id,
            readonly: true
        })) +

        // * For Firefox forms to submit, make sure to set the buttons’ `type` attributes as “button”.
        _.node('div', _.node('button', settings.today, settings.klass.buttonToday, 'type=button data-pick=' + nowObject.pick + (isOpen && !calendar.disabled(nowObject) ? '' : ' disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id })) + _.node('button', settings.clear, settings.klass.buttonClear, 'type=button data-clear=1' + (isOpen ? '' : ' disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id })) + _.node('button', settings.close, settings.klass.buttonClose, 'type=button data-close=true ' + (isOpen ? '' : ' disabled') + ' ' + _.ariaAttr({ controls: calendar.$node[0].id })), settings.klass.footer); //endreturn
    }; //DatePicker.prototype.nodes


    /**
     * The date picker defaults.
     */
    DatePicker.defaults = function (prefix) {

        return {

            // The title label to use for the month nav buttons
            labelMonthNext: 'Next month',
            labelMonthPrev: 'Previous month',

            // The title label to use for the dropdown selectors
            labelMonthSelect: 'Select a month',
            labelYearSelect: 'Select a year',

            // Months and weekdays
            monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

            // Today and clear
            today: 'Today',
            clear: 'Clear',
            close: 'Close',

            // The format to show on the `input` element
            format: 'd mmmm, yyyy',

            // Classes
            klass: {

                table: prefix + 'table',

                header: prefix + 'header',

                navPrev: prefix + 'nav--prev',
                navNext: prefix + 'nav--next',
                navDisabled: prefix + 'nav--disabled',

                month: prefix + 'month',
                year: prefix + 'year',

                selectMonth: prefix + 'select--month',
                selectYear: prefix + 'select--year',

                weekdays: prefix + 'weekday',

                day: prefix + 'day',
                disabled: prefix + 'day--disabled',
                selected: prefix + 'day--selected',
                highlighted: prefix + 'day--highlighted',
                now: prefix + 'day--today',
                infocus: prefix + 'day--infocus',
                outfocus: prefix + 'day--outfocus',

                footer: prefix + 'footer',

                buttonClear: prefix + 'button--clear',
                buttonToday: prefix + 'button--today',
                buttonClose: prefix + 'button--close'
            }
        };
    }(Picker.klasses().picker + '__');

    /**
     * Extend the picker to add the date picker.
     */
    Picker.extend('pickadate', DatePicker);
});


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Time picker for pickadate.js v3.5.4
 * http://amsul.github.io/pickadate.js/time.htm
 */

(function (factory) {

    // AMD.
    if (typeof define == 'function' && define.amd) define(['picker', 'jquery'], factory);

    // Node.js/browserify.
    else if (( false ? undefined : _typeof(exports)) == 'object') module.exports = factory(__webpack_require__(29), __webpack_require__(30));

        // Browser globals.
        else factory(Picker, jQuery);
})(function (Picker, $) {

    /**
     * Globals and constants
     */
    var HOURS_IN_DAY = 24,
        MINUTES_IN_HOUR = 60,
        HOURS_TO_NOON = 12,
        MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR,
        _ = Picker._;

    /**
     * The time picker constructor
     */
    function TimePicker(picker, settings) {

        var clock = this,
            elementValue = picker.$node[0].value,
            elementDataValue = picker.$node.data('value'),
            valueString = elementDataValue || elementValue,
            formatString = elementDataValue ? settings.formatSubmit : settings.format;

        clock.settings = settings;
        clock.$node = picker.$node;

        // The queue of methods that will be used to build item objects.
        clock.queue = {
            interval: 'i',
            min: 'measure create',
            max: 'measure create',
            now: 'now create',
            select: 'parse create validate',
            highlight: 'parse create validate',
            view: 'parse create validate',
            disable: 'deactivate',
            enable: 'activate'

            // The component's item object.
        };clock.item = {};

        clock.item.clear = null;
        clock.item.interval = settings.interval || 30;
        clock.item.disable = (settings.disable || []).slice(0);
        clock.item.enable = -function (collectionDisabled) {
            return collectionDisabled[0] === true ? collectionDisabled.shift() : -1;
        }(clock.item.disable);

        clock.set('min', settings.min).set('max', settings.max).set('now');

        // When there’s a value, set the `select`, which in turn
        // also sets the `highlight` and `view`.
        if (valueString) {
            clock.set('select', valueString, {
                format: formatString,
                fromValue: !!elementValue
            });
        }

        // If there’s no value, default to highlighting “today”.
        else {
                clock.set('select', null).set('highlight', clock.item.now);
            }

        // The keycode to movement mapping.
        clock.key = {
            40: 1, // Down
            38: -1, // Up
            39: 1, // Right
            37: -1, // Left
            go: function go(timeChange) {
                clock.set('highlight', clock.item.highlight.pick + timeChange * clock.item.interval, { interval: timeChange * clock.item.interval });
                this.render();
            }

            // Bind some picker events.
        };picker.on('render', function () {
            var $pickerHolder = picker.$root.children(),
                $viewset = $pickerHolder.find('.' + settings.klass.viewset),
                vendors = function vendors(prop) {
                return ['webkit', 'moz', 'ms', 'o', ''].map(function (vendor) {
                    return (vendor ? '-' + vendor + '-' : '') + prop;
                });
            },
                animations = function animations($el, state) {
                vendors('transform').map(function (prop) {
                    $el.css(prop, state);
                });
                vendors('transition').map(function (prop) {
                    $el.css(prop, state);
                });
            };
            if ($viewset.length) {
                animations($pickerHolder, 'none');
                $pickerHolder[0].scrollTop = ~~$viewset.position().top - $viewset[0].clientHeight * 2;
                animations($pickerHolder, '');
            }
        }, 1).on('open', function () {
            picker.$root.find('button').attr('disabled', false);
        }, 1).on('close', function () {
            picker.$root.find('button').attr('disabled', true);
        }, 1);
    } //TimePicker


    /**
     * Set a timepicker item object.
     */
    TimePicker.prototype.set = function (type, value, options) {

        var clock = this,
            clockItem = clock.item;

        // If the value is `null` just set it immediately.
        if (value === null) {
            if (type == 'clear') type = 'select';
            clockItem[type] = value;
            return clock;
        }

        // Otherwise go through the queue of methods, and invoke the functions.
        // Update this as the time unit, and set the final value as this item.
        // * In the case of `enable`, keep the queue but set `disable` instead.
        //   And in the case of `flip`, keep the queue but set `enable` instead.
        clockItem[type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type] = clock.queue[type].split(' ').map(function (method) {
            value = clock[method](type, value, options);
            return value;
        }).pop();

        // Check if we need to cascade through more updates.
        if (type == 'select') {
            clock.set('highlight', clockItem.select, options);
        } else if (type == 'highlight') {
            clock.set('view', clockItem.highlight, options);
        } else if (type == 'interval') {
            clock.set('min', clockItem.min, options).set('max', clockItem.max, options);
        } else if (type.match(/^(flip|min|max|disable|enable)$/)) {
            if (type == 'min') {
                clock.set('max', clockItem.max, options);
            }
            if (clockItem.select && clock.disabled(clockItem.select)) {
                clock.set('select', clockItem.select, options);
            }
            if (clockItem.highlight && clock.disabled(clockItem.highlight)) {
                clock.set('highlight', clockItem.highlight, options);
            }
        }

        return clock;
    }; //TimePicker.prototype.set


    /**
     * Get a timepicker item object.
     */
    TimePicker.prototype.get = function (type) {
        return this.item[type];
    }; //TimePicker.prototype.get


    /**
     * Create a picker time object.
     */
    TimePicker.prototype.create = function (type, value, options) {

        var clock = this;

        // If there’s no value, use the type as the value.
        value = value === undefined ? type : value;

        // If it’s a date object, convert it into an array.
        if (_.isDate(value)) {
            value = [value.getHours(), value.getMinutes()];
        }

        // If it’s an object, use the “pick” value.
        if ($.isPlainObject(value) && _.isInteger(value.pick)) {
            value = value.pick;
        }

        // If it’s an array, convert it into minutes.
        else if ($.isArray(value)) {
                value = +value[0] * MINUTES_IN_HOUR + +value[1];
            }

            // If no valid value is passed, set it to “now”.
            else if (!_.isInteger(value)) {
                    value = clock.now(type, value, options);
                }

        // If we’re setting the max, make sure it’s greater than the min.
        if (type == 'max' && value < clock.item.min.pick) {
            value += MINUTES_IN_DAY;
        }

        // If the value doesn’t fall directly on the interval,
        // add one interval to indicate it as “passed”.
        if (type != 'min' && type != 'max' && (value - clock.item.min.pick) % clock.item.interval !== 0) {
            value += clock.item.interval;
        }

        // Normalize it into a “reachable” interval.
        value = clock.normalize(type, value, options);

        // Return the compiled object.
        return {

            // Divide to get hours from minutes.
            hour: ~~(HOURS_IN_DAY + value / MINUTES_IN_HOUR) % HOURS_IN_DAY,

            // The remainder is the minutes.
            mins: (MINUTES_IN_HOUR + value % MINUTES_IN_HOUR) % MINUTES_IN_HOUR,

            // The time in total minutes.
            time: (MINUTES_IN_DAY + value) % MINUTES_IN_DAY,

            // Reference to the “relative” value to pick.
            pick: value
        };
    }; //TimePicker.prototype.create


    /**
     * Create a range limit object using an array, date object,
     * literal “true”, or integer relative to another time.
     */
    TimePicker.prototype.createRange = function (from, to) {

        var clock = this,
            createTime = function createTime(time) {
            if (time === true || $.isArray(time) || _.isDate(time)) {
                return clock.create(time);
            }
            return time;
        };

        // Create objects if possible.
        if (!_.isInteger(from)) {
            from = createTime(from);
        }
        if (!_.isInteger(to)) {
            to = createTime(to);
        }

        // Create relative times.
        if (_.isInteger(from) && $.isPlainObject(to)) {
            from = [to.hour, to.mins + from * clock.settings.interval];
        } else if (_.isInteger(to) && $.isPlainObject(from)) {
            to = [from.hour, from.mins + to * clock.settings.interval];
        }

        return {
            from: createTime(from),
            to: createTime(to)
        };
    }; //TimePicker.prototype.createRange


    /**
     * Check if a time unit falls within a time range object.
     */
    TimePicker.prototype.withinRange = function (range, timeUnit) {
        range = this.createRange(range.from, range.to);
        return timeUnit.pick >= range.from.pick && timeUnit.pick <= range.to.pick;
    };

    /**
     * Check if two time range objects overlap.
     */
    TimePicker.prototype.overlapRanges = function (one, two) {

        var clock = this;

        // Convert the ranges into comparable times.
        one = clock.createRange(one.from, one.to);
        two = clock.createRange(two.from, two.to);

        return clock.withinRange(one, two.from) || clock.withinRange(one, two.to) || clock.withinRange(two, one.from) || clock.withinRange(two, one.to);
    };

    /**
     * Get the time relative to now.
     */
    TimePicker.prototype.now = function (type, value /*, options*/) {

        var interval = this.item.interval,
            date = new Date(),
            nowMinutes = date.getHours() * MINUTES_IN_HOUR + date.getMinutes(),
            isValueInteger = _.isInteger(value),
            isBelowInterval;

        // Make sure “now” falls within the interval range.
        nowMinutes -= nowMinutes % interval;

        // Check if the difference is less than the interval itself.
        isBelowInterval = value < 0 && interval * value + nowMinutes <= -interval;

        // Add an interval because the time has “passed”.
        nowMinutes += type == 'min' && isBelowInterval ? 0 : interval;

        // If the value is a number, adjust by that many intervals.
        if (isValueInteger) {
            nowMinutes += interval * (isBelowInterval && type != 'max' ? value + 1 : value);
        }

        // Return the final calculation.
        return nowMinutes;
    }; //TimePicker.prototype.now


    /**
     * Normalize minutes to be “reachable” based on the min and interval.
     */
    TimePicker.prototype.normalize = function (type, value /*, options*/) {

        var interval = this.item.interval,
            minTime = this.item.min && this.item.min.pick || 0;

        // If setting min time, don’t shift anything.
        // Otherwise get the value and min difference and then
        // normalize the difference with the interval.
        value -= type == 'min' ? 0 : (value - minTime) % interval;

        // Return the adjusted value.
        return value;
    }; //TimePicker.prototype.normalize


    /**
     * Measure the range of minutes.
     */
    TimePicker.prototype.measure = function (type, value, options) {

        var clock = this;

        // If it’s anything false-y, set it to the default.
        if (!value) {
            value = type == 'min' ? [0, 0] : [HOURS_IN_DAY - 1, MINUTES_IN_HOUR - 1];
        }

        // If it’s a string, parse it.
        if (typeof value == 'string') {
            value = clock.parse(type, value);
        }

        // If it’s a literal true, or an integer, make it relative to now.
        else if (value === true || _.isInteger(value)) {
                value = clock.now(type, value, options);
            }

            // If it’s an object already, just normalize it.
            else if ($.isPlainObject(value) && _.isInteger(value.pick)) {
                    value = clock.normalize(type, value.pick, options);
                }

        return value;
    }; ///TimePicker.prototype.measure


    /**
     * Validate an object as enabled.
     */
    TimePicker.prototype.validate = function (type, timeObject, options) {

        var clock = this,
            interval = options && options.interval ? options.interval : clock.item.interval;

        // Check if the object is disabled.
        if (clock.disabled(timeObject)) {

            // Shift with the interval until we reach an enabled time.
            timeObject = clock.shift(timeObject, interval);
        }

        // Scope the object into range.
        timeObject = clock.scope(timeObject);

        // Do a second check to see if we landed on a disabled min/max.
        // In that case, shift using the opposite interval as before.
        if (clock.disabled(timeObject)) {
            timeObject = clock.shift(timeObject, interval * -1);
        }

        // Return the final object.
        return timeObject;
    }; //TimePicker.prototype.validate


    /**
     * Check if an object is disabled.
     */
    TimePicker.prototype.disabled = function (timeToVerify) {

        var clock = this,


        // Filter through the disabled times to check if this is one.
        isDisabledMatch = clock.item.disable.filter(function (timeToDisable) {

            // If the time is a number, match the hours.
            if (_.isInteger(timeToDisable)) {
                return timeToVerify.hour == timeToDisable;
            }

            // If it’s an array, create the object and match the times.
            if ($.isArray(timeToDisable) || _.isDate(timeToDisable)) {
                return timeToVerify.pick == clock.create(timeToDisable).pick;
            }

            // If it’s an object, match a time within the “from” and “to” range.
            if ($.isPlainObject(timeToDisable)) {
                return clock.withinRange(timeToDisable, timeToVerify);
            }
        });

        // If this time matches a disabled time, confirm it’s not inverted.
        isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function (timeToDisable) {
            return $.isArray(timeToDisable) && timeToDisable[2] == 'inverted' || $.isPlainObject(timeToDisable) && timeToDisable.inverted;
        }).length;

        // If the clock is "enabled" flag is flipped, flip the condition.
        return clock.item.enable === -1 ? !isDisabledMatch : isDisabledMatch || timeToVerify.pick < clock.item.min.pick || timeToVerify.pick > clock.item.max.pick;
    }; //TimePicker.prototype.disabled


    /**
     * Shift an object by an interval until we reach an enabled object.
     */
    TimePicker.prototype.shift = function (timeObject, interval) {

        var clock = this,
            minLimit = clock.item.min.pick,
            maxLimit = clock.item.max.pick; /*,
                                            safety = 1000*/

        interval = interval || clock.item.interval;

        // Keep looping as long as the time is disabled.
        while ( /*safety &&*/clock.disabled(timeObject)) {

            /*safety -= 1
            if ( !safety ) {
                throw 'Fell into an infinite loop while shifting to ' + timeObject.hour + ':' + timeObject.mins + '.'
            }*/

            // Increase/decrease the time by the interval and keep looping.
            timeObject = clock.create(timeObject.pick += interval);

            // If we've looped beyond the limits, break out of the loop.
            if (timeObject.pick <= minLimit || timeObject.pick >= maxLimit) {
                break;
            }
        }

        // Return the final object.
        return timeObject;
    }; //TimePicker.prototype.shift


    /**
     * Scope an object to be within range of min and max.
     */
    TimePicker.prototype.scope = function (timeObject) {
        var minLimit = this.item.min.pick,
            maxLimit = this.item.max.pick;
        return this.create(timeObject.pick > maxLimit ? maxLimit : timeObject.pick < minLimit ? minLimit : timeObject);
    }; //TimePicker.prototype.scope


    /**
     * Parse a string into a usable type.
     */
    TimePicker.prototype.parse = function (type, value, options) {

        var hour,
            minutes,
            isPM,
            item,
            parseValue,
            clock = this,
            parsingObject = {};

        // If it’s already parsed, we’re good.
        if (!value || typeof value != 'string') {
            return value;
        }

        // We need a `.format` to parse the value with.
        if (!(options && options.format)) {
            options = options || {};
            options.format = clock.settings.format;
        }

        // Convert the format into an array and then map through it.
        clock.formats.toArray(options.format).map(function (label) {

            var substring,


            // Grab the formatting label.
            formattingLabel = clock.formats[label],


            // The format length is from the formatting label function or the
            // label length without the escaping exclamation (!) mark.
            formatLength = formattingLabel ? _.trigger(formattingLabel, clock, [value, parsingObject]) : label.replace(/^!/, '').length;

            // If there's a format label, split the value up to the format length.
            // Then add it to the parsing object with appropriate label.
            if (formattingLabel) {
                substring = value.substr(0, formatLength);
                parsingObject[label] = substring.match(/^\d+$/) ? +substring : substring;
            }

            // Update the time value as the substring from format length to end.
            value = value.substr(formatLength);
        });

        // Grab the hour and minutes from the parsing object.
        for (item in parsingObject) {
            parseValue = parsingObject[item];
            if (_.isInteger(parseValue)) {
                if (item.match(/^(h|hh)$/i)) {
                    hour = parseValue;
                    if (item == 'h' || item == 'hh') {
                        hour %= 12;
                    }
                } else if (item == 'i') {
                    minutes = parseValue;
                }
            } else if (item.match(/^a$/i) && parseValue.match(/^p/i) && ('h' in parsingObject || 'hh' in parsingObject)) {
                isPM = true;
            }
        }

        // Calculate it in minutes and return.
        return (isPM ? hour + 12 : hour) * MINUTES_IN_HOUR + minutes;
    }; //TimePicker.prototype.parse


    /**
     * Various formats to display the object in.
     */
    TimePicker.prototype.formats = {

        h: function h(string, timeObject) {

            // If there's string, then get the digits length.
            // Otherwise return the selected hour in "standard" format.
            return string ? _.digits(string) : timeObject.hour % HOURS_TO_NOON || HOURS_TO_NOON;
        },
        hh: function hh(string, timeObject) {

            // If there's a string, then the length is always 2.
            // Otherwise return the selected hour in "standard" format with a leading zero.
            return string ? 2 : _.lead(timeObject.hour % HOURS_TO_NOON || HOURS_TO_NOON);
        },
        H: function H(string, timeObject) {

            // If there's string, then get the digits length.
            // Otherwise return the selected hour in "military" format as a string.
            return string ? _.digits(string) : '' + timeObject.hour % 24;
        },
        HH: function HH(string, timeObject) {

            // If there's string, then get the digits length.
            // Otherwise return the selected hour in "military" format with a leading zero.
            return string ? _.digits(string) : _.lead(timeObject.hour % 24);
        },
        i: function i(string, timeObject) {

            // If there's a string, then the length is always 2.
            // Otherwise return the selected minutes.
            return string ? 2 : _.lead(timeObject.mins);
        },
        a: function a(string, timeObject) {

            // If there's a string, then the length is always 4.
            // Otherwise check if it's more than "noon" and return either am/pm.
            return string ? 4 : MINUTES_IN_DAY / 2 > timeObject.time % MINUTES_IN_DAY ? 'a.m.' : 'p.m.';
        },
        A: function A(string, timeObject) {

            // If there's a string, then the length is always 2.
            // Otherwise check if it's more than "noon" and return either am/pm.
            return string ? 2 : MINUTES_IN_DAY / 2 > timeObject.time % MINUTES_IN_DAY ? 'AM' : 'PM';
        },

        // Create an array by splitting the formatting string passed.
        toArray: function toArray(formatString) {
            return formatString.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g);
        },

        // Format an object into a string using the formatting options.
        toString: function toString(formatString, itemObject) {
            var clock = this;
            return clock.formats.toArray(formatString).map(function (label) {
                return _.trigger(clock.formats[label], clock, [0, itemObject]) || label.replace(/^!/, '');
            }).join('');
        } //TimePicker.prototype.formats


        /**
         * Check if two time units are the exact.
         */
    };TimePicker.prototype.isTimeExact = function (one, two) {

        var clock = this;

        // When we’re working with minutes, do a direct comparison.
        if (_.isInteger(one) && _.isInteger(two) || typeof one == 'boolean' && typeof two == 'boolean') {
            return one === two;
        }

        // When we’re working with time representations, compare the “pick” value.
        if ((_.isDate(one) || $.isArray(one)) && (_.isDate(two) || $.isArray(two))) {
            return clock.create(one).pick === clock.create(two).pick;
        }

        // When we’re working with range objects, compare the “from” and “to”.
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
            return clock.isTimeExact(one.from, two.from) && clock.isTimeExact(one.to, two.to);
        }

        return false;
    };

    /**
     * Check if two time units overlap.
     */
    TimePicker.prototype.isTimeOverlap = function (one, two) {

        var clock = this;

        // When we’re working with an integer, compare the hours.
        if (_.isInteger(one) && (_.isDate(two) || $.isArray(two))) {
            return one === clock.create(two).hour;
        }
        if (_.isInteger(two) && (_.isDate(one) || $.isArray(one))) {
            return two === clock.create(one).hour;
        }

        // When we’re working with range objects, check if the ranges overlap.
        if ($.isPlainObject(one) && $.isPlainObject(two)) {
            return clock.overlapRanges(one, two);
        }

        return false;
    };

    /**
     * Flip the “enabled” state.
     */
    TimePicker.prototype.flipEnable = function (val) {
        var itemObject = this.item;
        itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1);
    };

    /**
     * Mark a collection of times as “disabled”.
     */
    TimePicker.prototype.deactivate = function (type, timesToDisable) {

        var clock = this,
            disabledItems = clock.item.disable.slice(0);

        // If we’re flipping, that’s all we need to do.
        if (timesToDisable == 'flip') {
            clock.flipEnable();
        } else if (timesToDisable === false) {
            clock.flipEnable(1);
            disabledItems = [];
        } else if (timesToDisable === true) {
            clock.flipEnable(-1);
            disabledItems = [];
        }

        // Otherwise go through the times to disable.
        else {

                timesToDisable.map(function (unitToDisable) {

                    var matchFound;

                    // When we have disabled items, check for matches.
                    // If something is matched, immediately break out.
                    for (var index = 0; index < disabledItems.length; index += 1) {
                        if (clock.isTimeExact(unitToDisable, disabledItems[index])) {
                            matchFound = true;
                            break;
                        }
                    }

                    // If nothing was found, add the validated unit to the collection.
                    if (!matchFound) {
                        if (_.isInteger(unitToDisable) || _.isDate(unitToDisable) || $.isArray(unitToDisable) || $.isPlainObject(unitToDisable) && unitToDisable.from && unitToDisable.to) {
                            disabledItems.push(unitToDisable);
                        }
                    }
                });
            }

        // Return the updated collection.
        return disabledItems;
    }; //TimePicker.prototype.deactivate


    /**
     * Mark a collection of times as “enabled”.
     */
    TimePicker.prototype.activate = function (type, timesToEnable) {

        var clock = this,
            disabledItems = clock.item.disable,
            disabledItemsCount = disabledItems.length;

        // If we’re flipping, that’s all we need to do.
        if (timesToEnable == 'flip') {
            clock.flipEnable();
        } else if (timesToEnable === true) {
            clock.flipEnable(1);
            disabledItems = [];
        } else if (timesToEnable === false) {
            clock.flipEnable(-1);
            disabledItems = [];
        }

        // Otherwise go through the disabled times.
        else {

                timesToEnable.map(function (unitToEnable) {

                    var matchFound, disabledUnit, index, isRangeMatched;

                    // Go through the disabled items and try to find a match.
                    for (index = 0; index < disabledItemsCount; index += 1) {

                        disabledUnit = disabledItems[index];

                        // When an exact match is found, remove it from the collection.
                        if (clock.isTimeExact(disabledUnit, unitToEnable)) {
                            matchFound = disabledItems[index] = null;
                            isRangeMatched = true;
                            break;
                        }

                        // When an overlapped match is found, add the “inverted” state to it.
                        else if (clock.isTimeOverlap(disabledUnit, unitToEnable)) {
                                if ($.isPlainObject(unitToEnable)) {
                                    unitToEnable.inverted = true;
                                    matchFound = unitToEnable;
                                } else if ($.isArray(unitToEnable)) {
                                    matchFound = unitToEnable;
                                    if (!matchFound[2]) matchFound.push('inverted');
                                } else if (_.isDate(unitToEnable)) {
                                    matchFound = [unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted'];
                                }
                                break;
                            }
                    }

                    // If a match was found, remove a previous duplicate entry.
                    if (matchFound) for (index = 0; index < disabledItemsCount; index += 1) {
                        if (clock.isTimeExact(disabledItems[index], unitToEnable)) {
                            disabledItems[index] = null;
                            break;
                        }
                    }

                    // In the event that we’re dealing with an overlap of range times,
                    // make sure there are no “inverted” times because of it.
                    if (isRangeMatched) for (index = 0; index < disabledItemsCount; index += 1) {
                        if (clock.isTimeOverlap(disabledItems[index], unitToEnable)) {
                            disabledItems[index] = null;
                            break;
                        }
                    }

                    // If something is still matched, add it into the collection.
                    if (matchFound) {
                        disabledItems.push(matchFound);
                    }
                });
            }

        // Return the updated collection.
        return disabledItems.filter(function (val) {
            return val != null;
        });
    }; //TimePicker.prototype.activate


    /**
     * The division to use for the range intervals.
     */
    TimePicker.prototype.i = function (type, value /*, options*/) {
        return _.isInteger(value) && value > 0 ? value : this.item.interval;
    };

    /**
     * Create a string for the nodes in the picker.
     */
    TimePicker.prototype.nodes = function (isOpen) {

        var clock = this,
            settings = clock.settings,
            selectedObject = clock.item.select,
            highlightedObject = clock.item.highlight,
            viewsetObject = clock.item.view,
            disabledCollection = clock.item.disable;

        return _.node('ul', _.group({
            min: clock.item.min.pick,
            max: clock.item.max.pick,
            i: clock.item.interval,
            node: 'li',
            item: function item(loopedTime) {
                loopedTime = clock.create(loopedTime);
                var timeMinutes = loopedTime.pick,
                    isSelected = selectedObject && selectedObject.pick == timeMinutes,
                    isHighlighted = highlightedObject && highlightedObject.pick == timeMinutes,
                    isDisabled = disabledCollection && clock.disabled(loopedTime);
                return [_.trigger(clock.formats.toString, clock, [_.trigger(settings.formatLabel, clock, [loopedTime]) || settings.format, loopedTime]), function (klasses) {

                    if (isSelected) {
                        klasses.push(settings.klass.selected);
                    }

                    if (isHighlighted) {
                        klasses.push(settings.klass.highlighted);
                    }

                    if (viewsetObject && viewsetObject.pick == timeMinutes) {
                        klasses.push(settings.klass.viewset);
                    }

                    if (isDisabled) {
                        klasses.push(settings.klass.disabled);
                    }

                    return klasses.join(' ');
                }([settings.klass.listItem]), 'data-pick=' + loopedTime.pick + ' ' + _.ariaAttr({
                    role: 'option',
                    selected: isSelected && clock.$node.val() === _.trigger(clock.formats.toString, clock, [settings.format, loopedTime]) ? true : null,
                    activedescendant: isHighlighted ? true : null,
                    disabled: isDisabled ? true : null
                })];
            }
        }) +

        // * For Firefox forms to submit, make sure to set the button’s `type` attribute as “button”.
        _.node('li', _.node('button', settings.clear, settings.klass.buttonClear, 'type=button data-clear=1' + (isOpen ? '' : ' disabled') + ' ' + _.ariaAttr({ controls: clock.$node[0].id })), '', _.ariaAttr({ role: 'presentation' })), settings.klass.list, _.ariaAttr({ role: 'listbox', controls: clock.$node[0].id }));
    }; //TimePicker.prototype.nodes


    /* ==========================================================================
       Extend the picker to add the component with the defaults.
       ========================================================================== */

    TimePicker.defaults = function (prefix) {

        return {

            // Clear
            clear: 'Clear',

            // The format to show on the `input` element
            format: 'h:i A',

            // The interval between each time
            interval: 30,

            // Classes
            klass: {

                picker: prefix + ' ' + prefix + '--time',
                holder: prefix + '__holder',

                list: prefix + '__list',
                listItem: prefix + '__list-item',

                disabled: prefix + '__list-item--disabled',
                selected: prefix + '__list-item--selected',
                highlighted: prefix + '__list-item--highlighted',
                viewset: prefix + '__list-item--viewset',
                now: prefix + '__list-item--now',

                buttonClear: prefix + '__button--clear'
            }
        };
    }(Picker.klasses().picker);

    /**
     * Extend the picker to add the time picker.
     */
    Picker.extend('pickatime', TimePicker);
});


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _input = __webpack_require__(17);

var _input2 = _interopRequireDefault(_input);

var _select = __webpack_require__(15);

var _select2 = _interopRequireDefault(_select);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _ExplorerActions = __webpack_require__(5);

var _ExplorerActions2 = _interopRequireDefault(_ExplorerActions);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RELATIVE_TIMEFRAMES = ['this', 'previous'];

function hasRelativeTimeframe(time) {
  time = time || {};
  return time.relativity && time.amount && time.sub_timeframe;
}

var RelativePicker = _react2.default.createClass({
  displayName: 'RelativePicker',


  setRelativeTime: function setRelativeTime(event) {
    var name = event.target.name;
    var value = event.target.value;

    var updates = _lodash2.default.cloneDeep(this.props.time);
    updates[name] = value;
    this.props.handleChange('time', updates);
  },

  buildDescriptionCopy: function buildDescriptionCopy() {
    var time = this.props.time;

    if (hasRelativeTimeframe(this.props.time)) {
      var subIntervalCopy = _FormatUtils2.default.singularize(time.sub_timeframe, time.amount);
      var timeAmountPluralSuffix = time.amount > 1 ? 's' : '';
      var relativityCopy = time.relativity == 'this' ? 'including' : 'excluding';
      var singularCurrentInterval = _FormatUtils2.default.singularize(subIntervalCopy);

      return _react2.default.createElement(
        'p',
        { className: 'help-block' },
        'The last ',
        time.amount,
        ' ',
        subIntervalCopy,
        timeAmountPluralSuffix,
        ' ',
        _react2.default.createElement(
          'b',
          null,
          relativityCopy
        ),
        ' the current ',
        singularCurrentInterval,
        '.'
      );
    }
  },

  // React Methods

  render: function render() {
    var descriptionCopy = this.buildDescriptionCopy();

    return _react2.default.createElement(
      'div',
      { className: 'relative-timeframe-picker' },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-4 form-collapse-right', id: 'relative-type' },
          _react2.default.createElement(
            'div',
            { className: 'btn-group' },
            _react2.default.createElement(_select2.default, { label: false,
              name: 'relativity',
              classes: 'relativity',
              options: RELATIVE_TIMEFRAMES,
              emptyOption: false,
              handleSelection: this.setRelativeTime,
              selectedOption: this.props.time.relativity })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-3 form-collapse-left form-collapse-right', id: 'interval-amount' },
          _react2.default.createElement(_input2.default, { label: false,
            name: 'amount',
            classes: 'amount',
            onChange: this.setRelativeTime,
            placeholder: 'e.g. 1',
            value: this.props.time.amount || "",
            autoComplete: 'off' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-5 form-collapse-left', id: 'sub-interval-type' },
          _react2.default.createElement(_select2.default, { label: false,
            name: 'sub_timeframe',
            classes: 'sub-timeframe',
            options: this.props.relativeIntervalTypes,
            emptyOption: false,
            handleSelection: this.setRelativeTime,
            selectedOption: this.props.time.sub_timeframe,
            sort: false })
        )
      ),
      descriptionCopy
    );
  }
});

exports.default = RelativePicker;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _react_select = __webpack_require__(13);

var _react_select2 = _interopRequireDefault(_react_select);

var _ProjectUtils = __webpack_require__(4);

var _ProjectUtils2 = _interopRequireDefault(_ProjectUtils);

var _ExplorerActions = __webpack_require__(5);

var _ExplorerActions2 = _interopRequireDefault(_ExplorerActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Timezone = _react2.default.createClass({
  displayName: 'Timezone',


  handleTimezoneBlur: function handleTimezoneBlur() {
    this.setState({ active: false });
    this.refs['timezone-display'].focus();
  },

  handleTimezoneActivated: function handleTimezoneActivated() {
    var self = this;
    this.setState({ active: true });
    setTimeout(function () {
      self.refs['timezone'].refs['input'].focus();
      self.refs['timezone'].setState({ visible: true });
    }, 100);
  },

  handleTimezoneChange: function handleTimezoneChange(name, value) {
    var timezones = _ProjectUtils2.default.getConstant('TIMEZONES');
    var timezone = timezones.filter(function (z) {
      return z.name === value;
    })[0];
    this.props.handleChange('timezone', timezone ? timezone.name : value);
  },

  // React methods

  getInitialState: function getInitialState() {
    return { active: false };
  },

  componentDidMount: function componentDidMount() {
    if (!this.props.timezone) {
      this.props.handleChange('timezone', _ProjectUtils2.default.getConstant('DEFAULT_TIMEZONE'));
    }
    this.refs['timezone'].setState({ visible: false });
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: "timezone-toggle" + (this.state.active ? " active" : "") },
      _react2.default.createElement(
        'div',
        { className: 'toggle-display' },
        _react2.default.createElement(
          'button',
          { ref: 'timezone-display',
            className: 'btn btn-link field-secondary-control',
            title: "Selectd timezone: " + this.props.timezone,
            type: 'button',
            onClick: this.handleTimezoneActivated },
          _react2.default.createElement('span', { className: 'icon glyphicon glyphicon-globe' }),
          ' Timezone: ',
          this.props.timezone
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'toggle-options' },
        _react2.default.createElement(_react_select2.default, { ref: 'timezone',
          name: 'timezone',
          classes: 'timezone form-control',
          value: this.props.timezone,
          items: _ProjectUtils2.default.getConstant('TIMEZONES').map(function (z) {
            return z.name;
          }),
          handleChange: this.handleTimezoneChange,
          handleBlur: this.handleTimezoneBlur })
      )
    );
  }

});

exports.default = Timezone;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _select = __webpack_require__(15);

var _select2 = _interopRequireDefault(_select);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _react_select = __webpack_require__(13);

var _react_select2 = _interopRequireDefault(_react_select);

var _filter_value_fields = __webpack_require__(83);

var _filter_value_fields2 = _interopRequireDefault(_filter_value_fields);

var _FilterUtils = __webpack_require__(7);

var _FilterUtils2 = _interopRequireDefault(_FilterUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Filter = _react2.default.createClass({
  displayName: 'Filter',


  removeFilter: function removeFilter(e) {
    e.preventDefault();
    this.props.removeFilter(this.props.index);
  },

  handleChange: function handleChange(name, value) {
    this.props.handleChange(this.props.index, name, value);
  },

  handleChangeWithEvent: function handleChangeWithEvent(e) {
    this.props.handleChange(this.props.index, e.target.name, e.target.value);
  },

  buildValueFormGroup: function buildValueFormGroup() {
    return _react2.default.createElement(_filter_value_fields2.default, { filter: this.props.filter,
      filterOperators: this.props.filterOperators,
      handleChange: this.handleChange });
  },

  buildOperatorSelect: function buildOperatorSelect() {
    return _react2.default.createElement(_select2.default, { label: false,
      name: 'operator',
      classes: 'operator',
      options: this.props.filterOperators,
      emptyOption: false,
      sort: false,
      handleSelection: this.handleChangeWithEvent,
      selectedOption: this.props.filter.operator });
  },

  buildPropertyNameSelect: function buildPropertyNameSelect() {
    return _react2.default.createElement(_react_select2.default, { name: 'property_name',
      inputClasses: 'property-name form-control',
      items: this.props.propertyNames,
      handleChange: this.handleChange,
      placeholder: 'Select a property name',
      value: this.props.filter.property_name,
      sort: true });
  },

  getListSyntaxInfo: function getListSyntaxInfo() {
    if (this.props.filter.coercion_type === 'List') {
      return _react2.default.createElement(
        'p',
        { className: 'filter-instructions help-block' },
        'Wrap strings in ',
        _react2.default.createElement(
          'b',
          null,
          'double'
        ),
        ' quotes & numbers in ',
        _react2.default.createElement(
          'b',
          null,
          'single'
        ),
        ' quotes.'
      );
    }
  },

  buildValidationError: function buildValidationError() {
    if (this.filterCompleteAndInvalid()) {
      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-md-12' },
          _react2.default.createElement(
            'p',
            { className: 'invalid' },
            'Invalid: ',
            this.props.filter.errors[0].msg
          )
        )
      );
    }
  },

  filterCompleteAndInvalid: function filterCompleteAndInvalid() {
    var complete = _FilterUtils2.default.isComplete(this.props.filter);
    var valid = this.props.filter.isValid;
    return complete && !valid;
  },

  // React functions

  render: function render() {
    var filterClasses = (0, _classnames2.default)({
      'filter-row': true,
      'filter-complete': !_FilterUtils2.default.isComplete(this.props.filter) || this.props.filter.isValid,
      'filter-incomplete': this.filterCompleteAndInvalid()
    });

    return _react2.default.createElement(
      'div',
      { className: filterClasses },
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-md-4 filter-property-col' },
          this.buildPropertyNameSelect()
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-md-2 filter-operator-col' },
          this.buildOperatorSelect()
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-md-5 filter-value-col' },
          this.buildValueFormGroup(),
          this.getListSyntaxInfo()
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-md-1 filter-close-col' },
          _react2.default.createElement(
            'a',
            { href: '#', className: 'remove-filter', onClick: this.removeFilter, 'data-index': this.props.index },
            _react2.default.createElement(
              'span',
              { className: 'icon no-margin' },
              '\xD7'
            )
          )
        )
      ),
      this.buildValidationError()
    );
  }
});

exports.default = Filter;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = __webpack_require__(6);

var _moment2 = _interopRequireDefault(_moment);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _select = __webpack_require__(15);

var _select2 = _interopRequireDefault(_select);

var _datepicker = __webpack_require__(44);

var _datepicker2 = _interopRequireDefault(_datepicker);

var _timepicker = __webpack_require__(45);

var _timepicker2 = _interopRequireDefault(_timepicker);

var _geo = __webpack_require__(84);

var _geo2 = _interopRequireDefault(_geo);

var _FormatUtils = __webpack_require__(2);

var _FormatUtils2 = _interopRequireDefault(_FormatUtils);

var _FilterUtils = __webpack_require__(7);

var _FilterUtils2 = _interopRequireDefault(_FilterUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateFormat = 'll';
var timeFormat = 'h:mm A';

function pasrseIntoDate(dateString, timeString) {
  var date = (0, _moment2.default)(new Date(dateString)).format(dateFormat);
  var time = (0, _moment2.default)(new Date(timeString)).format(timeFormat);
  return new Date(date + " " + time).toString();
}

var FilterValueFields = _react2.default.createClass({
  displayName: 'FilterValueFields',


  handleChangeWithEvent: function handleChangeWithEvent(event) {
    this.props.handleChange(event.target.name, event.target.value);
  },

  setValueState: function setValueState(event) {
    var updates = {};
    updates[event.target.name] = event.target.value;
    this.setState(updates);
  },

  setDate: function setDate(name, value) {
    this.props.handleChange(name, pasrseIntoDate(value, this.props.filter.property_value));
  },

  setTime: function setTime(name, value) {
    this.props.handleChange(name, pasrseIntoDate(this.props.filter.property_value, value));
  },

  handleDateBlur: function handleDateBlur(event) {
    this.setDate(event.target.name, event.target.value);
  },

  handleChange: function handleChange(event) {
    this.props.handleChange(event.target.name, event.target.value);
  },

  getCoercionOptions: function getCoercionOptions() {
    var operator = this.props.filter.operator;
    return operator ? _lodash2.default.find(this.props.filterOperators, { value: operator }).canBeCoeredTo : [];
  },

  getInputPlaceholder: function getInputPlaceholder() {
    var type = this.props.filter.coercion_type;
    return type === 'List' ? 'Comma sep list' : type;
  },

  // React methods

  getInitialState: function getInitialState() {
    return {
      property_value: this.props.filter.property_value
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState({ property_value: newProps.filter.property_value });
  },

  render: function render() {
    var valueInput;
    if (this.propertyType === 'geo' || this.props.filter.operator === 'within') {
      valueInput = _react2.default.createElement(_geo2.default, { handleChange: this.handleChangeWithEvent,
        filter: this.props.filter });
    } else if (this.props.filter.operator === 'exists' || this.props.filter.coercion_type === 'Boolean') {
      valueInput = _react2.default.createElement(_select2.default, { name: 'property_value',
        classes: 'property-value',
        ref: 'boolean-value-set',
        options: ['true', 'false'],
        handleBlur: this.handleChangeWithEvent,
        handleSelection: this.setValueState,
        selectedOption: _FormatUtils2.default.booleanMap(this.state.property_value) || 'true',
        emptyOption: false });
    } else if (this.props.filter.coercion_type === 'Datetime') {
      valueInput = _react2.default.createElement(
        'div',
        { className: 'row property-value' },
        _react2.default.createElement(
          'div',
          { className: 'col-md-6 form-collapse-right' },
          _react2.default.createElement(_datepicker2.default, { ref: 'date-value-input',
            value: (0, _moment2.default)(new Date(this.state.property_value)).format(dateFormat),
            label: false,
            name: 'property_value',
            placeholder: 'Date',
            classes: 'datepicker-wrapper',
            onSet: this.setDate,
            onBlur: this.handleDateBlur })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-md-6 form-collapse-left' },
          _react2.default.createElement(_timepicker2.default, { ref: 'time-value-input',
            value: (0, _moment2.default)(new Date(this.state.property_value)).format(timeFormat),
            label: false,
            name: 'property_value',
            placeholder: 'Time',
            classes: 'timepicker-wrapper',
            handleSelection: this.setTime,
            handleBlur: this.setTime })
        )
      );
    } else {
      valueInput = _react2.default.createElement('input', { type: 'text',
        ref: 'value-input',
        name: 'property_value',
        className: 'form-control property-value',
        value: this.state.property_value,
        onChange: this.setValueState,
        onBlur: this.handleChangeWithEvent,
        placeholder: this.getInputPlaceholder(),
        readOnly: this.props.filter.coercion_type === 'Null',
        autoComplete: 'off' });
    }

    return _react2.default.createElement(
      'div',
      { className: 'row' },
      _react2.default.createElement(
        'div',
        { className: 'col-md-3 form-collapse-right' },
        _react2.default.createElement(_select2.default, { label: false,
          ref: 'type-set',
          name: 'coercion_type',
          classes: 'coercion-type',
          sort: false,
          options: this.getCoercionOptions(),
          handleSelection: this.handleChangeWithEvent,
          selectedOption: this.props.filter.coercion_type,
          emptyOption: false })
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-md-9 form-collapse-left' },
        valueInput
      )
    );
  }
});

exports.default = FilterValueFields;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Geo = _react2.default.createClass({
  displayName: 'Geo',


  // Note: Keen API standard is Longitude followed by Latitude.
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'col-md-12' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'amount' },
          'Longitude'
        ),
        _react2.default.createElement('input', { type: 'text',
          name: 'coordinates.0',
          className: 'form-control',
          value: this.props.filter.property_value.coordinates[0] || "",
          onChange: this.props.handleChange,
          autoComplete: 'off' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-md-12' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'amount' },
          'Latitude'
        ),
        _react2.default.createElement('input', { type: 'text',
          name: 'coordinates.1',
          className: 'form-control',
          value: this.props.filter.property_value.coordinates[1] || "",
          onChange: this.props.handleChange,
          autoComplete: 'off' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'col-md-12' },
        _react2.default.createElement(
          'label',
          { htmlFor: 'amount' },
          'Radius in Miles'
        ),
        _react2.default.createElement('input', { type: 'text',
          name: 'max_distance_miles',
          className: 'form-control',
          value: this.props.filter.property_value.max_distance_miles || "",
          onChange: this.props.handleChange,
          autoComplete: 'off' })
      )
    );
  }
});

exports.default = Geo;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = __webpack_require__(6);

var _moment2 = _interopRequireDefault(_moment);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _select = __webpack_require__(15);

var _select2 = _interopRequireDefault(_select);

var _fields_toggle = __webpack_require__(16);

var _fields_toggle2 = _interopRequireDefault(_fields_toggle);

var _ExplorerActions = __webpack_require__(5);

var _ExplorerActions2 = _interopRequireDefault(_ExplorerActions);

var _ExplorerUtils = __webpack_require__(3);

var _ExplorerUtils2 = _interopRequireDefault(_ExplorerUtils);

var _ProjectUtils = __webpack_require__(4);

var _ProjectUtils2 = _interopRequireDefault(_ProjectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Interval = _react2.default.createClass({
  displayName: 'Interval',


  setInterval: function setInterval(event) {
    this.props.handleChange('interval', event.target.value);
  },

  intervalFieldsToggled: function intervalFieldsToggled(toggleState) {
    if (toggleState && !this.props.interval) {
      this.props.handleChange('interval', 'daily');
    }
  },

  intervalUpdateFn: function intervalUpdateFn(updates) {
    this.props.handleChange('interval', updates['interval']);
  },

  intervalGetFn: function intervalGetFn(attr) {
    if (attr === 'interval') {
      return this.props.interval;
    } else {
      throw new Error("Interval component is only aware of interval attributes");
    }
  },

  // React Methods

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'field-component' },
      _react2.default.createElement(
        _fields_toggle2.default,
        { ref: 'interval-toggle',
          name: 'Interval',
          initialOpenState: this.props.interval,
          attrsToStore: 'interval',
          getFn: this.intervalGetFn,
          updateFn: this.intervalUpdateFn,
          toggleCallback: this.intervalFieldsToggled },
        _react2.default.createElement(_select2.default, { label: false,
          name: 'interval',
          classes: 'interval-type',
          options: _ProjectUtils2.default.getConstant('ABSOLUTE_INTERVAL_TYPES'),
          emptyOption: false,
          handleSelection: this.setInterval,
          selectedOption: this.props.interval,
          sort: false })
      )
    );
  }
});

exports.default = Interval;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ApiUrl = _react2.default.createClass({
  displayName: 'ApiUrl',


  getInitialState: function getInitialState() {
    return {
      active: false
    };
  },

  handleClick: function handleClick() {
    var self = this;
    self.setState({ active: !self.state.active });
    if (!self.state.active) {
      setTimeout(function () {
        self.refs['input'].focus();
      }, 50);
    }
  },

  handleInputSelect: function handleInputSelect(e) {
    e.target.setSelectionRange(0, 9999);
  },

  handleInputChange: function handleInputChange(e) {
    e.preventDefault();
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'explorer-api-url' },
      _react2.default.createElement(
        'button',
        { className: 'btn btn-link field-secondary-control', title: 'API URL', type: 'button', onClick: this.handleClick },
        _react2.default.createElement('span', { className: "icon glyphicon glyphicon-chevron-" + (this.state.active ? "down" : "right") + " icon-chevron-" + (this.state.active ? "down" : "right") }),
        ' API Query URL'
      ),
      _react2.default.createElement(
        'div',
        { className: this.state.active ? "show" : "hide" },
        _react2.default.createElement('input', {
          ref: 'input',
          name: 'api-query',
          className: 'form-control input-sm',
          placeholder: 'API Query URL will appear here...',
          value: this.props.isValid ? this.props.url : "",
          onClick: this.handleInputSelect,
          onFocus: this.handleInputSelect,
          onChange: this.handleInputChange })
      )
    );
  }

});

exports.default = ApiUrl;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = __webpack_require__(6);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dateForItem(item) {
  if (item.created_date) {
    var datetime = (0, _moment2.default)(new Date(item.created_date.replace(' ', 'T')));
    return datetime.isValid() ? datetime.format('ll h:mm A') : null;
  }
}

var BrowseQueries = _react2.default.createClass({
  displayName: 'BrowseQueries',


  clickCallback: function clickCallback(event) {
    this.props.clickCallback(event);
  },

  buildList: function buildList() {
    var listElements = this.props.listItems.map(_lodash2.default.bind(function (listItem, index) {
      var isSelected = this.props.selectedIndex === index ? true : false;
      var classes;
      if (isSelected) classes = 'active';
      var createdAt;
      var datetime = dateForItem(listItem);
      if (datetime) {
        createdAt = _react2.default.createElement(
          'p',
          { className: 'date pull-right' },
          _react2.default.createElement('span', { className: 'icon glyphicon glyphicon-time' }),
          datetime
        );
      }
      var isCachedText = listItem.refresh_rate > 0 ? 'Cached' : '';

      var displayName = null;
      if (listItem.metadata && listItem.metadata.display_name) {
        displayName = listItem.metadata.display_name;
      } else if (listItem.query_name) {
        displayName = listItem.query_name;
      } else {
        displayName = 'Query not named';
      }

      return _react2.default.createElement(
        'li',
        { className: classes, key: index, 'data-id': listItem.id, onClick: this.clickCallback },
        _react2.default.createElement(
          'h5',
          { className: 'name' },
          displayName
        ),
        _react2.default.createElement(
          'div',
          { className: 'metadata clearfix' },
          _react2.default.createElement(
            'p',
            { className: 'date pull-left' },
            isCachedText
          ),
          createdAt
        )
      );
    }, this));
    return _react2.default.createElement(
      'ul',
      { ref: 'list', className: 'interactive-list' },
      listElements
    );
  },

  fieldChanged: function fieldChanged(event) {
    var newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  },

  getDefaultProps: function getDefaultProps() {
    return {
      listItems: [],
      clickCallback: null,
      selectedIndex: null,
      notice: null,
      emptyContent: null
    };
  },

  render: function render() {
    var emptyContent = this.props.listItems.length ? null : this.props.emptyContent;
    var listItems = this.buildList();

    return _react2.default.createElement(
      'section',
      { className: 'query-pane-section browse-queries' },
      this.props.notice,
      listItems,
      emptyContent
    );
  }

});

exports.default = BrowseQueries;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = __webpack_require__(9);

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = __webpack_require__(6);

var _moment2 = _interopRequireDefault(_moment);

var _info_icon = __webpack_require__(89);

var _info_icon2 = _interopRequireDefault(_info_icon);

var _ExplorerActions = __webpack_require__(5);

var _ExplorerActions2 = _interopRequireDefault(_ExplorerActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var refreshRateMultiplier = 60 * 60;

var CacheToggle = _react2.default.createClass({
  displayName: 'CacheToggle',


  setCached: function setCached(event) {
    var updates = _lodash2.default.clone(this.props.model);
    if (this._isCached()) {
      updates.refresh_rate = 0;
    } else {
      updates.refresh_rate = 14400;
    }

    _ExplorerActions2.default.update(this.props.model.id, updates);
    this.setState({
      settingsOpen: updates.refresh_rate == 0 ? false : this.state.settingsOpen
    });
  },

  setSettingsOpen: function setSettingsOpen(event) {
    event.preventDefault();
    this.setState({ settingsOpen: !this.state.settingsOpen });
  },

  setRefreshRate: function setRefreshRate(event) {
    this.setState({ refresh_rate: event.target.value });
  },

  setRefreshRateBlur: function setRefreshRateBlur(event) {
    var refresh_rate = Math.round(event.target.value * refreshRateMultiplier);
    var updates = _lodash2.default.clone(this.props.model);
    updates.refresh_rate = refresh_rate;

    _ExplorerActions2.default.update(this.props.model.id, updates);
    this.forceUpdate();
  },

  getInitialState: function getInitialState() {
    return {
      refresh_rate: this._refreshRateInHours(this.props.model),
      cached: false,
      settingsOpen: false,
      tooltip: false
    };
  },

  tooltip: function tooltip(value) {
    this.setState({ tooltip: value });
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ refresh_rate: this._refreshRateInHours(nextProps.model) });
  },

  render: function render() {
    var _this = this;

    var isCached = this._isCached();
    var parentClasses = (0, _classnames2.default)({
      'cache-toggle': true,
      'inactive': !isCached
    });
    var cacheDetailsClasses = (0, _classnames2.default)({
      "cache-details": true,
      "hide": !isCached
    });
    var cacheSettingsClasses = (0, _classnames2.default)({
      "cache-settings": true,
      "hide": !this.state.settingsOpen
    });

    var cacheToggleLabel = isCached ? 'Caching enabled' : 'Enable caching';

    return _react2.default.createElement(
      'div',
      { className: parentClasses },
      _react2.default.createElement(
        'label',
        { htmlFor: 'cache' },
        _react2.default.createElement('input', { type: 'checkbox', name: 'cache', id: 'cache',
          disabled: this.props.isLimited && !isCached,
          onChange: this.setCached, checked: isCached }),
        cacheToggleLabel
      ),
      this.props.isLimited && _react2.default.createElement(
        'div',
        { className: 'cache-limit' },
        _react2.default.createElement(
          'span',
          null,
          'Cached queries limit'
        ),
        _react2.default.createElement(
          'div',
          { onMouseOver: function onMouseOver() {
              return _this.tooltip(true);
            }, onFocus: function onFocus() {
              return 0;
            }, onMouseLeave: function onMouseLeave() {
              return _this.tooltip(false);
            } },
          _react2.default.createElement(_info_icon2.default, { width: '15px', height: '15px', fill: '#27566D' }),
          this.state.tooltip && _react2.default.createElement(
            'div',
            { className: 'tooltip' },
            _react2.default.createElement(
              'p',
              null,
              'You have reached the limit of cached queries for your organization (5 cached queries).'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Disable caching for other queries or contact us to extend the plan at ',
              _react2.default.createElement(
                'b',
                null,
                'team@keen.io'
              )
            )
          )
        )
      ),
      _react2.default.createElement(
        'span',
        { className: cacheDetailsClasses },
        this._minutesAgo(),
        _react2.default.createElement(
          'a',
          { href: '#', onClick: this.setSettingsOpen, className: 'margin-left-tiny' },
          _react2.default.createElement('span', { className: 'icon icon-cog glyphicon-cog glyphicon' })
        )
      ),
      _react2.default.createElement(
        'span',
        { className: cacheSettingsClasses },
        'Refresh every ',
        _react2.default.createElement('input', { type: 'text',
          name: 'refresh_rate',
          value: this.state.refresh_rate,
          className: 'form-control',
          onChange: this.setRefreshRate,
          onBlur: this.setRefreshRateBlur }),
        ' hours (',
        "min 4 / max 24",
        ')'
      )
    );
  },

  _isCached: function _isCached() {
    return this.props.model.refresh_rate != 0;
  },

  _minutesAgo: function _minutesAgo() {
    var runInformation = this.props.model.run_information;

    if (runInformation != null && runInformation.last_run_status == 200) {
      var lastRun = (0, _moment2.default)(runInformation.last_run_date).utcOffset(0);
      var duration = _moment2.default.duration(lastRun.diff((0, _moment2.default)())).humanize();
      return 'Last updated ' + duration + ' ago.';
    }
  },

  _refreshRateInHours: function _refreshRateInHours(model) {
    return model.refresh_rate / refreshRateMultiplier * 100 / 100;
  }

});

exports.default = CacheToggle;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoIcon = undefined;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InfoIcon = exports.InfoIcon = function InfoIcon(_ref) {
  var width = _ref.width,
      height = _ref.height,
      fill = _ref.fill;

  return _react2.default.createElement(
    'svg',
    { width: width, height: height, viewBox: '0 0 30 30' },
    _react2.default.createElement('path', { fill: fill, d: 'M15,0 C23.2842712,0 30,6.71572875 30,15 C30,23.2842712 23.2842712,30 15,30 C6.71572875,30 0,23.2842712 0,15 C0,6.71572875 6.71572875,0 15,0 Z M15,3.33333333 C8.55667792,3.33333333 3.33333333,8.55667792 3.33333333,15 C3.33333333,21.4433221 8.55667792,26.6666667 15,26.6666667 C21.4433221,26.6666667 26.6666667,21.4433221 26.6666667,15 C26.6666667,8.55667792 21.4433221,3.33333333 15,3.33333333 Z M16.6666667,13.8333333 L16.6666667,22.9672147 L13.3333333,22.9672147 L13.3333333,13.8333333 L16.6666667,13.8333333 Z M14.959893,7 C15.3074866,7 15.6350267,7.06445672 15.9425134,7.19337017 C16.25,7.32228361 16.5196078,7.50184162 16.7513369,7.7320442 C16.983066,7.96224678 17.1657754,8.22928177 17.2994652,8.53314917 C17.4331551,8.83701657 17.5,9.16390424 17.5,9.51381215 C17.5,9.85451197 17.4331551,10.1744936 17.2994652,10.4737569 C17.1657754,10.7730203 16.983066,11.0354512 16.7513369,11.2610497 C16.5196078,11.4866483 16.25,11.6662063 15.9425134,11.7997238 C15.6350267,11.9332413 15.3074866,12 14.959893,12 C14.6212121,12 14.3048128,11.9332413 14.0106952,11.7997238 C13.7165775,11.6662063 13.4558824,11.4866483 13.2286096,11.2610497 C13.0013369,11.0354512 12.8230838,10.7730203 12.6938503,10.4737569 C12.5646168,10.1744936 12.5,9.85451197 12.5,9.51381215 C12.5,9.16390424 12.5646168,8.83701657 12.6938503,8.53314917 C12.8230838,8.22928177 13.0013369,7.96224678 13.2286096,7.7320442 C13.4558824,7.50184162 13.7165775,7.32228361 14.0106952,7.19337017 C14.3048128,7.06445672 14.6212121,7 14.959893,7 Z' })
  );
};

exports.default = InfoIcon;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _AppDispatcher = __webpack_require__(8);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _events = __webpack_require__(18);

var _NoticeConstants = __webpack_require__(39);

var _NoticeConstants2 = _interopRequireDefault(_NoticeConstants);

var _ExplorerConstants = __webpack_require__(20);

var _ExplorerConstants2 = _interopRequireDefault(_ExplorerConstants);

var _ExplorerStore = __webpack_require__(12);

var _ExplorerStore2 = _interopRequireDefault(_ExplorerStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CHANGE_EVENT = 'change';

var _notices = {};

function defaultAttrs() {
  return {
    location: 'global',
    text: null,
    type: null
  };
}

function _removeGlobalNotices() {
  _lodash2.default.each(_notices, function (val, key) {
    if (val.location === 'global') delete _notices[key];
  });
}

function _removeStepNotices() {
  _lodash2.default.each(_notices, function (val, key) {
    if (val.location === 'step') delete _notices[key];
  });
}

function _create(attrs) {
  if (!attrs.location || attrs.location === 'global') {
    _removeGlobalNotices();
  }
  var tempId = "TEMP-" + (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _notices[tempId] = _lodash2.default.assign(defaultAttrs(), attrs);
}

function _clearAll() {
  _notices = {};
}

var NoticeStore = _lodash2.default.assign({}, _events.EventEmitter.prototype, {
  unregisterWithDispatcher: function unregisterWithDispatcher() {
    _AppDispatcher2.default.unregister(this.dispatchToken);
  },

  getGlobalNotice: function getGlobalNotice() {
    return _lodash2.default.find(_notices, { location: 'global' });
  },

  getStepNotices: function getStepNotices() {
    return _lodash2.default.filter(_notices, function (notice) {
      if (notice.location === 'step') return notice;
    });
  },

  clearAll: function clearAll() {
    _clearAll();
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
NoticeStore.dispatchToken = _AppDispatcher2.default.register(function (action) {
  _AppDispatcher2.default.waitFor([_ExplorerStore2.default.dispatchToken]);

  switch (action.actionType) {
    case _NoticeConstants2.default.NOTICE_CREATE:
      _create(action.attrs);
      NoticeStore.emitChange();
      break;

    case _NoticeConstants2.default.NOTICE_CLEAR_ALL:
      _clearAll();
      NoticeStore.emitChange();
      break;

    case _ExplorerConstants2.default.EXPLORER_SAVING:
      var text = action.saveType === 'save' ? 'Saving query...' : 'Updating query...';
      _create({
        type: 'info',
        text: text,
        icon: 'info-sign'
      });
      NoticeStore.emitChange();
      break;

    case _ExplorerConstants2.default.EXPLORER_SAVE_SUCCESS:
      var text = action.saveType === 'save' ? 'Query saved' : 'Query updated';
      _create({
        type: 'success',
        text: text + '.',
        icon: 'ok'
      });
      NoticeStore.emitChange();
      break;

    case _ExplorerConstants2.default.EXPLORER_SAVE_FAIL:
      var msg;
      var text = action.saveType === 'save' ? 'saving' : 'updating';
      if (action.errorMsg) {
        msg = 'Problem ' + text + ': ' + action.errorMsg;
      } else if (action.errorResp && action.errorResp.error_code === "OverCachedQueryLimitError") {
        msg = 'Oops! Looks like you’ve reached your caching limit. Need more cached queries? Contact us at team@keen.io';
      } else if (action.errorResp) {
        msg = 'Problem ' + text + ': ' + JSON.parse(action.errorResp.text).message;
      }
      _create({
        type: 'error',
        text: msg,
        icon: 'remove-sign'
      });
      NoticeStore.emitChange();
      break;

    case _ExplorerConstants2.default.EXPLORER_DESTROYING:
      _create({
        type: 'info',
        text: 'Deleting query...',
        icon: 'info-sign'
      });
      NoticeStore.emitChange();
      break;

    case _ExplorerConstants2.default.EXPLORER_DESTROY_SUCCESS:
      _create({
        type: 'success',
        text: 'Query deleted.',
        icon: 'ok'
      });
      NoticeStore.emitChange();
      break;

    case _ExplorerConstants2.default.EXPLORER_DESTROY_FAIL:
      _create({
        type: 'error',
        text: 'There was a problem deleting your query: ' + action.errorMsg,
        icon: 'remove-sign'
      });
      NoticeStore.emitChange();
      break;

    case _ExplorerConstants2.default.EXPLORER_FOUND_INVALID:
      var explorer = _ExplorerStore2.default.get(action.id);
      _create({
        text: 'There was a problem: ' + explorer.errors[0].msg,
        type: 'error',
        icon: 'remove-sign'
      });
      if (explorer.query.analysis_type === 'funnel') {
        _removeStepNotices();
        explorer.query.steps.forEach(function (step, index) {
          if (!step.isValid) {
            _create({
              id: explorer.id,
              location: 'step',
              stepIndex: index,
              text: step.errors[0].msg,
              type: 'error',
              icon: 'remove-sign'
            });
          }
        });
      }
      NoticeStore.emitChange();
      break;

    default:
    // no op
  }

  return true;
});

exports.default = NoticeStore;

/***/ })
/******/ ]);
});
//# sourceMappingURL=keen-explorer.umd.js.map