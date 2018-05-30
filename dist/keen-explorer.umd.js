(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("react"), require("classnames"), require("moment"), require("keymirror"), require("jQuery"), require("string"), require("qs"), require("react-highlight"), require("keen-dataviz"), require("flux"), require("json-stable-stringify"), require("react-dom"), require("keen-analysis"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "react", "classnames", "moment", "keymirror", "jQuery", "string", "qs", "react-highlight", "keen-dataviz", "flux", "json-stable-stringify", "react-dom", "keen-analysis"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("lodash"), require("react"), require("classnames"), require("moment"), require("keymirror"), require("jQuery"), require("string"), require("qs"), require("react-highlight"), require("keen-dataviz"), require("flux"), require("json-stable-stringify"), require("react-dom"), require("keen-analysis")) : factory(root["lodash"], root["react"], root["classnames"], root["moment"], root["keymirror"], root["jQuery"], root["string"], root["qs"], root["react-highlight"], root["keen-dataviz"], root["flux"], root["json-stable-stringify"], root["react-dom"], root["keen-analysis"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__20__, __WEBPACK_EXTERNAL_MODULE__22__, __WEBPACK_EXTERNAL_MODULE__44__, __WEBPACK_EXTERNAL_MODULE__45__, __WEBPACK_EXTERNAL_MODULE__70__, __WEBPACK_EXTERNAL_MODULE__74__, __WEBPACK_EXTERNAL_MODULE__79__, __WEBPACK_EXTERNAL_MODULE__82__, __WEBPACK_EXTERNAL_MODULE__85__, __WEBPACK_EXTERNAL_MODULE__86__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 88);
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


var _ = __webpack_require__(0);
var S = __webpack_require__(44);
var moment = __webpack_require__(9);
var ISO_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS';

function _isWrappedInSingleQuotes(value) {
  return value.substring(0, 1) === "'" && value.substring(value.length - 1) === "'";
}

function _isWrappedInDoubleQuotes(value) {
  return value.substring(0, 1) === '"' && value.substring(value.length - 1) === '"';
}

module.exports = {

  toTitleCase: function toTitleCase(text) {
    return text.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },

  singularize: function singularize(text) {
    return text.replace(/s+$/, '');
  },

  prettyPrintJSON: function prettyPrintJSON(json) {
    return JSON.stringify(json, undefined, 2);
  },

  coercionTypeForPropertyType: function coercionTypeForPropertyType(type) {
    var coercionTypeMap = {
      'string': 'String',
      'num': 'Number',
      'datetime': 'Datetime',
      'list': 'List',
      'null': 'Null',
      'bool': 'Boolean'
    };
    return coercionTypeMap[type];
  },

  booleanMap: function booleanMap(value) {
    if (value === null || value === '') {
      return '';
    } else if (value === 'false') {
      return 'false';
    } else if (value === 'true') {
      return 'true';
    } else {
      return value ? 'true' : 'false';
    }
  },

  sortItems: function sortItems(items, keyFunc) {
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
  },

  /**
   * Checks whether the given string is in a date format, as defined by:
   * 'YYYY-MM-DDTHH:mm:ss.SSS'
   * @return {Boolean} Whether or not the string is in the expected format.
   */
  isDateInStrictFormat: function isDateInStrictFormat(dateString) {
    return moment(dateString, ISO_DATE_FORMAT, true).isValid();
  },

  convertDateToUTC: function convertDateToUTC(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  },

  formatISOTimeNoTimezone: function formatISOTimeNoTimezone(time) {
    return moment(time).format('YYYY-MM-DDTHH:mm:ss.SSS');
  },

  generateRandomId: function generateRandomId(prefix) {
    return (prefix || '') + (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  },

  generateTempId: function generateTempId() {
    return module.exports.generateRandomId('TEMP-');
  },

  isValidQueryValue: function isValidQueryValue(value) {
    if (_.isArray(value)) return value.length > 0;
    if (value === false) return true;
    if (value === 0) return true;
    if (_.isPlainObject(value)) return !_.isEmpty(value);
    return !module.exports.isNullOrUndefined(value);
  },

  parseList: function parseList(value) {
    if (value) {
      if (!module.exports.isList(value)) return '';
      var parsedList = S(value).parseCSV();

      parsedList = _.map(parsedList, function (val) {
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
  },

  isList: function isList(str) {
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
  },

  isNullOrUndefined: function isNullOrUndefined(value) {
    return _.isNull(value) || _.isUndefined(value);
  },

  padLeft: function padLeft(value) {
    return value < 10 ? '0' + value : value;
  }

};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var Qs = __webpack_require__(45);
var stringify = __webpack_require__(82);
var moment = __webpack_require__(9);
var FormatUtils = __webpack_require__(2);
var FunnelUtils = __webpack_require__(81);
var ProjectUtils = __webpack_require__(5);
var FilterUtils = __webpack_require__(8);
var TimeframeUtils = __webpack_require__(17);

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
  return _.without(_.map(collection, fn), SKIP);
}

function echoIf(valueMaybe, append) {
  if (valueMaybe) {
    return append;
  }
  return '';
}

module.exports = {

  EXRACTION_EVENT_LIMIT: EXRACTION_EVENT_LIMIT,

  isPersisted: function isPersisted(explorer) {
    return explorer.id && !explorer.id.toString().match('TEMP');
  },

  saveType: function saveType(explorer) {
    return module.exports.isPersisted(explorer) ? 'update' : 'save';
  },

  shouldHaveTarget: function shouldHaveTarget(explorer) {
    return !FormatUtils.isNullOrUndefined(explorer.query.analysis_type) && ANALYSIS_TYPES_WITHOUT_TARGET.indexOf(explorer.query.analysis_type) === -1;
  },

  isEmailExtraction: function isEmailExtraction(explorer) {
    return explorer.query.analysis_type === 'extraction' && !_.isNull(explorer.query.email);
  },

  isImmediateExtraction: function isImmediateExtraction(explorer) {
    return explorer.query.analysis_type === 'extraction' && _.isNull(explorer.query.email);
  },

  mergeResponseWithExplorer: function mergeResponseWithExplorer(explorer, response) {
    var newModel = _.defaultsDeep(module.exports.formatQueryParams(response), explorer);
    delete newModel.originalModel; // Remove the original model.
    newModel.id = response.query_name; // Set the ID to the query_name (it's now persisted.)
    newModel.originalModel = _.cloneDeep(newModel);
    return newModel;
  },

  queryJSON: function queryJSON(explorer) {
    if (!explorer || !explorer.query) return;
    var params = _.cloneDeep(explorer.query);

    if (params.analysis_type === 'extraction') {
      if (FormatUtils.isNullOrUndefined(params.email)) {
        params.latest = EXRACTION_EVENT_LIMIT;
      }
    } else {
      delete params.latest;
      delete params.email;
      delete params.property_names;
    }

    if (params.analysis_type !== 'funnel') {
      _.assign(params, TimeframeUtils.getTimeParameters(params.time, params.timezone));
    }

    // Add filters
    if (params.filters) {
      params.filters = _.map(params.filters, function (filter) {
        return FilterUtils.queryJSON(filter);
      });
    }

    if (params.steps) {
      params.steps = _.map(params.steps, FunnelUtils.stepJSON);
    }

    _.each(params, function (value, key) {
      // If it's an array, clean out any empty elements
      if (_.isArray(value)) {
        _.remove(value, function (element) {
          return !_.isNumber(element) && _.isEmpty(element);
        });
      }

      // Remove any empty properties or ones that shouldn't be
      // part of the query request.
      if (!FormatUtils.isValidQueryValue(value) || !_.includes(QUERY_PARAMS, key)) {
        delete params[key];
      }
    });

    return params;
  },

  toJSON: function toJSON(explorer) {
    var json = _.pick(explorer, ['id', 'query_name', 'refresh_rate', 'metadata']);
    json.query = module.exports.queryJSON(explorer);
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
    var attrs = module.exports.toJSON(explorer);
    return _.omit(attrs, ['id', 'query_name', 'refresh_rate', 'metadata']);
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
    config.client.query(config.query.analysis_type, _.omit(config.query, 'analysis_type')).then(function (res, err) {
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
      var unpackedTime = TimeframeUtils.unpackTimeframeParam(params.query.timeframe, params.query.timezone);
      params.query.time = unpackedTime.time;
      params.query.timezone = unpackedTime.timezone;
    }
    if (params.query.group_by && !_.isArray(params.query.group_by)) {
      params.query.group_by = [params.query.group_by];
    }
    if (params.query.filters) {
      params.query.filters = _.compact(_.map(params.query.filters, FilterUtils.formatFilterParams));
    }
    if (params.query.steps) {
      params.query.steps = _.compact(_.map(params.query.steps, FunnelUtils.formatQueryParams));
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
    var attrs = module.exports.queryJSON(explorer);
    var url = client.url('queries', attrs.analysis_type);

    var analysisType = attrs.analysis_type;
    delete attrs.analysis_type;

    var timeframe = _.cloneDeep(attrs.timeframe);
    delete attrs.timeframe;

    var filters = _.map(attrs.filters, function (filter) {
      return _.omit(_.cloneDeep(filter), 'coercion_type');
    });
    delete attrs.filters;

    var steps;
    if (attrs.steps && attrs.steps.length) {
      steps = module.exports.encodeAttribute(attrs.steps);
      delete attrs.steps;
    }

    if (attrs.group_by && _.isArray(attrs.group_by) && attrs.group_by.length) {
      attrs.group_by = attrs.group_by.length > 1 ? JSON.stringify(attrs.group_by) : attrs.group_by[0];
    }

    var queryAttrs = Qs.stringify(attrs);

    if (timeframe && TimeframeUtils.timeframeType(explorer.query.time) === 'relative') {
      queryAttrs += '&timeframe=' + timeframe;
    } else if (timeframe && TimeframeUtils.timeframeType(explorer.query.time) === 'absolute') {
      // This is an absolute timeframe, so we need to encode the object in a specific way before sending it, as per keen docs => https://keen.io/docs/data-analysis/timeframe/#absolute-timeframes
      timeframe = module.exports.encodeAttribute(timeframe);
      queryAttrs += '&timeframe=' + timeframe;
    }

    // We need to encode the filters the same way as we encode the absolute timeframe.
    if (filters) {
      filters = module.exports.encodeAttribute(filters);
      queryAttrs += '&filters=' + filters;
    }

    if (steps) {
      queryAttrs += '&steps=' + steps;
    }

    url += '?api_key=' + client.readKey() + '&' + queryAttrs;
    return url;
  },

  resultCanBeVisualized: function resultCanBeVisualized(explorer) {
    return explorer.response && !FormatUtils.isNullOrUndefined(explorer.response.result) && (_.isNumber(explorer.response.result) || _.isArray(explorer.response.result) && explorer.response.result.length);
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
        params = module.exports.queryJSON(explorer),
        s = stringify,
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
      params.steps = _.map(params.steps, function (step) {
        return _.omit(step, 'active');
      });
    }

    dynamicConstructorValues = mapSkip(dynamicConstructorNames, function (name) {
      if (client.config[name] == defaultKeenAnalysisOpts[name]) {
        return SKIP;
      }
      return '  ' + name + ': ' + s(client.config[name]);
    }).join(',\n');
    // remove coercion from example; it's already been handled elsewhere.
    _.each(params['filters'], function (filter) {
      delete filter['coercion_type'];
    });

    dynamicCriteria = mapSkip(paramNames, function (param) {
      if (!params[param]) {
        return SKIP;
      }
      return '        ' + param + ': ' + s(params[param], { space: 0 });
    }).join(',\n');

    var value = ['<!DOCTYPE html>', '<html>', '<head>', '  <meta charset="utf-8">', '  <link href="https://d26b395fwzu5fz.cloudfront.net/keen-dataviz-1.1.3.css" rel="stylesheet" />', '</head>', '<body>', '  <!-- Target DOM Node -->', '  <div id="keen-example-chart"></div>', '  ', '  <script src="https://d26b395fwzu5fz.cloudfront.net/keen-analysis-1.2.2.js" type="text/javascript"></script>', '  <script src="https://d26b395fwzu5fz.cloudfront.net/keen-dataviz-1.1.3.js" type="text/javascript"></script>', '  <script type="text/javascript">', '    var client = new Keen({', '      projectId: ' + s(client.config.projectId) + ',', '      readKey: ' + s(client.config.readKey) + echoIf(dynamicConstructorValues, ','), dynamicConstructorValues, '    });', '    ', '    var chart = new Keen.Dataviz()', '      .el("#keen-example-chart")', '      .height(240)', '      .title("' + chartTitle + '")', '' + chartType ? '      .type("' + chartType + '")' : '', '      .prepare();', '    ', '    client', '      .query(' + s(params.analysis_type) + ', {', dynamicCriteria, '      })', '      .then(function(res) {', '        chart.data(res).render();', '      })', '      .catch(function(err) {', '        chart.message(err.message);', '      });', '    ', '  </script>', '</body>', '</html>'];
    return _.filter(value, function (val) {
      return val !== "";
    }).join('\n');
  },

  slugify: function slugify(name) {
    return name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/ /g, '-');
  }

};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var AppDispatcher = __webpack_require__(7);
var ExplorerConstants = __webpack_require__(19);
var ExplorerStore = __webpack_require__(12);
var ExplorerValidations = __webpack_require__(25);
var NoticeActions = __webpack_require__(18);
var AppStateActions = __webpack_require__(24);
var ProjectActions = __webpack_require__(28);
var ProjectStore = __webpack_require__(16);
var RunValidations = __webpack_require__(10);
var ExplorerUtils = __webpack_require__(3);
var ChartTypeUtils = __webpack_require__(26);

var ExplorerActions = {

  create: function create(attrs) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_CREATE,
      attrs: attrs
    });
  },

  createBatch: function createBatch(models) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_CREATE_BATCH,
      models: models
    });
  },

  clone: function clone(sourceId) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_CLONE,
      id: sourceId
    });
    NoticeActions.create({
      text: "Query cloned! Add a name for this cloned query and save it.",
      type: 'success',
      icon: 'check'
    });
  },

  update: function update(id, updates) {
    var updated_query,
        project = ProjectStore.getProject();
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE,
      id: id,
      updates: updates
    });
    // Fetch schema for selected event collection
    updated_query = updates.query ? updates.query : updates.response && updates.response.query ? updates.response.query : {};
    if (updated_query.event_collection) {
      ProjectActions.fetchCollectionSchema(project.client, updated_query.event_collection);
    }
    if (updated_query.steps && updated_query.steps.length) {
      _.each(updated_query.steps, function (step, i) {
        ProjectActions.fetchCollectionSchema(project.client, step.event_collection);
      });
    }
  },

  remove: function remove(id) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_REMOVE,
      id: id
    });
  },

  setActive: function setActive(id) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_SET_ACTIVE,
      id: id
    });
  },

  revertActiveChanges: function revertActiveChanges() {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_REVERT_ACTIVE_CHANGES
    });
  },

  clear: function clear(id) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_CLEAR,
      id: id
    });
  },

  validate: function validate(id) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_VALIDATE,
      id: id
    });
  },

  addFilter: function addFilter(id, attrs) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_ADD_FILTER,
      id: id,
      attrs: attrs
    });
  },

  removeFilter: function removeFilter(id, index) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_REMOVE_FILTER,
      id: id,
      index: index
    });
  },

  updateFilter: function updateFilter(id, index, attrs) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE_FILTER,
      id: id,
      index: index,
      attrs: attrs
    });
  },

  addStep: function addStep(id, attrs) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_ADD_STEP,
      id: id,
      attrs: attrs
    });
  },

  removeStep: function removeStep(id, index) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_REMOVE_STEP,
      id: id,
      index: index
    });
  },

  setStepActive: function setStepActive(id, index) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_SET_STEP_ACTIVE,
      id: id,
      index: index
    });
  },

  updateStep: function updateStep(id, index, attrs) {
    var project = ProjectStore.getProject();
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE_STEP,
      id: id,
      index: index,
      attrs: attrs
    });

    // Fetch schema for selected event collection
    if (attrs.event_collection) {
      ProjectActions.fetchCollectionSchema(project.client, attrs.event_collection);
    }
  },

  moveStep: function moveStep(id, index, direction) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_MOVE_STEP,
      id: id,
      index: index,
      direction: direction
    });
  },

  addStepFilter: function addStepFilter(id, stepIndex, attrs) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_ADD_STEP_FILTER,
      id: id,
      stepIndex: stepIndex,
      attrs: attrs
    });
  },

  removeStepFilter: function removeStepFilter(id, stepIndex, filterIndex) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_REMOVE_STEP_FILTER,
      id: id,
      stepIndex: stepIndex,
      filterIndex: filterIndex
    });
  },

  updateStepFilter: function updateStepFilter(id, stepIndex, filterIndex, attrs) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE_STEP_FILTER,
      id: id,
      stepIndex: stepIndex,
      filterIndex: filterIndex,
      attrs: attrs
    });
  },

  exec: function exec(client, id) {
    var explorer = ExplorerStore.get(id);
    if (explorer.loading) {
      throw new Error("Warning: calling exec when model loading is true. Explorer id: " + explorer.id);
    }
    ExplorerActions.validate(explorer.id);
    explorer = ExplorerStore.get(id);
    if (!explorer.isValid) {
      AppDispatcher.dispatch({
        actionType: ExplorerConstants.EXPLORER_FOUND_INVALID,
        id: explorer.id
      });
      return;
    }
    NoticeActions.clearAll();

    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE,
      id: explorer.id,
      updates: { loading: true }
    });

    ExplorerUtils.runQuery({
      client: client,
      query: ExplorerUtils.queryJSON(explorer),
      error: module.exports.execError.bind(this, explorer),
      success: module.exports.execSuccess.bind(this, explorer)
    });
  },

  execError: function execError(explorer, err) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_QUERY_ERROR,
      query: explorer.query,
      error: err.message
    });
    ExplorerActions.update(explorer.id, { loading: false });
    NoticeActions.create({ text: err.message, type: 'error' });
  },

  execSuccess: function execSuccess(explorer, response) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_QUERY_SUCCESS,
      query: explorer.query,
      isSaved: ExplorerUtils.isPersisted(explorer)
    });
    NoticeActions.clearAll();

    var updates = {};
    updates.response = response;
    // If there is no query object on the response, add one. This is required for Dataviz to properly auto-parse
    // the result + the query to correctly choose a chart type.
    if (!response.query) response.query = ExplorerUtils.queryJSON(explorer);
    updates.loading = false;

    if (!ChartTypeUtils.responseSupportsChartType(response.query, explorer.metadata.visualization.chart_type)) {
      updates.metadata = _.cloneDeep(explorer.metadata);
      updates.metadata.visualization.chart_type = ChartTypeUtils.getChartTypeOptions(response.query)[0];
    }

    updates.dataTimestamp = Date.now();
    ExplorerActions.update(explorer.id, updates);
  },

  runEmailExtraction: function runEmailExtraction(client, id) {
    ExplorerActions.validate(id);
    var explorer = ExplorerStore.get(id);

    if (!explorer.isValid) {
      AppDispatcher.dispatch({
        actionType: ExplorerConstants.EXPLORER_FOUND_INVALID,
        id: explorer.id
      });
      return;
    }
    NoticeActions.clearAll();

    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE,
      id: explorer.id,
      updates: { loading: true }
    });

    ExplorerUtils.runQuery({
      client: client,
      query: ExplorerUtils.queryJSON(explorer),
      success: module.exports.runEmailExtractionSuccess.bind(this, explorer),
      error: module.exports.runEmailExtractionError
    });
  },

  runEmailExtractionSuccess: function runEmailExtractionSuccess(explorer, res) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_QUERY_SUCCESS,
      query: explorer.query,
      isSaved: ExplorerUtils.isPersisted(explorer)
    });
    NoticeActions.clearAll();
    NoticeActions.create({
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
    NoticeActions.create({ text: err.message, type: 'error', icon: 'remove-sign' });
  },

  fetchAllPersisted: function fetchAllPersisted(persistence, callback) {
    AppStateActions.update({ fetchingPersistedExplorers: true });
    persistence.get(null, function (err, resp) {
      if (err) {
        callback(err);
        return;
      }
      var models = [];
      resp.forEach(function (model) {
        var formattedModel = ExplorerUtils.formatQueryParams(model);
        RunValidations.run(ExplorerValidations, formattedModel);
        if (!formattedModel.isValid) {
          console.warn('A persisted explorer model is invalid: ', formattedModel);
          console.log('Errors: ', formattedModel.errors);
        }
        models.push(formattedModel);
      });
      ExplorerActions.createBatch(models);
      AppStateActions.update({ fetchingPersistedExplorers: false });
      callback(null);
    });
  },

  fetchPersisted: function fetchPersisted(persistence, id, callback) {
    persistence.get(id, function (err, resp) {
      if (err) {
        callback(err);
        return;
      }
      var model = ExplorerUtils.formatQueryParams(resp);
      RunValidations.run(ExplorerValidations, model);
      if (!model.isValid) {
        console.warn('A persisted explorer model is invalid: ', model);
      }
      ExplorerActions.create(model);
      callback(null);
    });
  },

  save: function save(persistence, sourceId) {
    var saveType = ExplorerUtils.saveType(ExplorerStore.get(sourceId));
    var persistenceFunction = saveType === 'save' ? 'create' : 'update';
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_SAVING,
      id: sourceId,
      saveType: saveType
    });

    var explorer = ExplorerStore.get(sourceId);
    if (!explorer.isValid) {
      AppDispatcher.dispatch({
        actionType: ExplorerConstants.EXPLORER_FOUND_INVALID,
        id: explorer.id
      });
      module.exports.update(sourceId, { saving: false });
      return;
    }
    NoticeActions.clearAll();

    var explorerJSON = ExplorerUtils.cleanJSONforSave(ExplorerUtils.toJSON(ExplorerStore.get(sourceId)));
    persistence[persistenceFunction](explorerJSON, function (err, res) {
      if (err) {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_FAIL,
          saveType: saveType,
          id: sourceId,
          errorResp: err,
          query: ExplorerStore.get(sourceId).query
        });
        return;
      }
      module.exports.saveSuccess(sourceId, res);
    });
  },

  saveSuccess: function saveSuccess(sourceId, res) {
    var saveType = ExplorerUtils.saveType(ExplorerStore.get(sourceId));
    var updatedModel = ExplorerUtils.mergeResponseWithExplorer(ExplorerStore.get(sourceId), res);
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE,
      id: sourceId,
      updates: updatedModel
    });
    // We need to use the new model id below, not the old sourceId passed in.
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_SAVE_SUCCESS,
      id: updatedModel.id,
      saveType: saveType,
      query: updatedModel.query
    });
  },

  destroy: function destroy(persistence, sourceId) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_DESTROYING
    });
    var attrs = _.clone(ExplorerUtils.toJSON(ExplorerStore.get(sourceId)));
    persistence.destroy(attrs, function (err, res) {
      if (err) {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROY_FAIL,
          errorMsg: err,
          query: ExplorerStore.get(sourceId).query
        });
      } else {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_REMOVE,
          id: sourceId
        });
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROY_SUCCESS,
          query: attrs.query
        });
      }
    });
  }

};

module.exports = ExplorerActions;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var DateUtils = __webpack_require__(80);
var FormatUtils = __webpack_require__(2);

// ***********************
// ** Project Constants
// ***********************

var CONSTANTS = {

  DEFAULT_TIMEZONE: 'UTC',

  ANALYSIS_TYPES: ['sum', 'count', 'count_unique', 'minimum', 'maximum', 'average', 'select_unique', 'extraction', 'percentile', 'median', 'funnel'],

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

module.exports = {

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
    var isDST = DateUtils.isDST();
    var localOffset = module.exports.getLocalTimezoneOffset();
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

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Dispatcher = __webpack_require__(79).Dispatcher;

module.exports = new Dispatcher();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var moment = __webpack_require__(9);
var S = __webpack_require__(44);
var TimeframeUtils = __webpack_require__(17);
var FormatUtils = __webpack_require__(2);
var FilterValidations = __webpack_require__(30);
var RunValidations = __webpack_require__(10);

function exists(value) {
  return !_.isNull(value) && !_.isUndefined(value);
}

function toType(obj) {
  return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function isNumeric(num) {
  return !isNaN(num);
}

module.exports = {

  coercionFunctions: {

    'Datetime': function Datetime(filter) {
      if (typeof filter.property_value === 'string') {
        var coercedDate = new Date(filter.property_value);
        if (coercedDate !== null && coercedDate.toString() !== 'Invalid Date') return coercedDate.toString();
      }
      return module.exports.defaultDate();
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
    var yesterday = moment().subtract(1, 'days').startOf('day').format('x');
    return new Date(Number(yesterday));
  },

  getCoercedValue: function getCoercedValue(filter) {
    if (!module.exports.coercionFunctions[filter.coercion_type]) return null;
    return module.exports.coercionFunctions[filter.coercion_type](filter);
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
        if (FormatUtils.isDateInStrictFormat(filter.property_value.substring(0, filter.property_value.length - 6))) return 'Datetime';
        if (FormatUtils.isList(filter.property_value)) return 'List';
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
      complete = !_.isUndefined(val) && !_.isNull(val);
      if (_.isObject(val)) complete = !_.isEmpty(val);
      if (!complete) break;
    }
    return complete;
  },

  queryJSON: function queryJSON(filter) {
    RunValidations.run(FilterValidations, filter);
    if (!filter.isValid) return {};

    var attrs = _.cloneDeep(filter);
    attrs.property_value = module.exports.getCoercedValue(filter);

    if (attrs.coercion_type === 'Datetime') {
      attrs.property_value = FormatUtils.formatISOTimeNoTimezone(attrs.property_value);
    }
    if (attrs.coercion_type === 'List') {
      attrs.property_value = FormatUtils.parseList(attrs.property_value);
    }

    return _.pick(attrs, ['property_name', 'operator', 'property_value']);
  },

  initList: function initList(filter) {
    var newVal = "";
    _.each(filter.property_value, function (item, index) {
      if (_.isString(item)) newVal += '"' + item + '"';
      if (_.isNumber(item)) newVal += "'" + item + "'";
      if (index !== filter.property_value.length - 1) newVal += ', ';
    });
    filter.property_value = newVal;
    return filter;
  },

  formatFilterParams: function formatFilterParams(filter) {
    filter.coercion_type = module.exports.getCoercionType(filter);
    if (filter.coercion_type === 'List') {
      filter = _.assign({}, filter, module.exports.initList(filter));
    }
    filter.property_value = module.exports.getCoercedValue(filter);
    if (filter.coercion_type === 'Datetime') {
      filter.property_value = FormatUtils.convertDateToUTC(new Date(filter.property_value));
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
    return _.filter(filters, function (filter) {
      RunValidations.run(FilterValidations, filter);
      return filter.isValid;
    });
  }

};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {

  run: function run(validatorSet, model) {
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
  }

};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var React = __webpack_require__(1);

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

var ReactSelect = React.createClass({
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
      if (inputString.length > 0 && String(item).toLowerCase().search(_.escapeRegExp(inputString).toLowerCase()) < 0) return;

      // Simple result limiting
      count++;if (count > self.state.limit) return;
      self.visibleItems = self.visibleItems + 1;
      return React.createElement(
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
      return React.createElement(
        'div',
        {
          ref: 'scrollpane',
          className: 'react-select-scrollpane',
          onScroll: this.handleScroll,
          tabIndex: '-1',
          'aria-hidden': 'false' },
        React.createElement(
          'div',
          { className: 'react-select-aria-notice', 'aria-live': 'assertive' },
          this.state.focusedItem || ''
        ),
        React.createElement(
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

    return React.createElement(
      'div',
      { ref: 'wrapper', className: wrapClasses },
      React.createElement('input', { ref: 'input',
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

module.exports = ReactSelect;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* ExplorerStore */

var AppDispatcher = __webpack_require__(7);
var EventEmitter = __webpack_require__(21).EventEmitter;
var _ = __webpack_require__(0);
var ExplorerConstants = __webpack_require__(19);
var FormatUtils = __webpack_require__(2);
var ExplorerUtils = __webpack_require__(3);
var FilterUtils = __webpack_require__(8);
var ProjectUtils = __webpack_require__(5);
var ProjectStore = __webpack_require__(16);

var RunValidations = __webpack_require__(10).run;
var ExplorerValidations = __webpack_require__(25);
var FilterValidations = __webpack_require__(30);
var StepValidations = __webpack_require__(38);

var CHANGE_EVENT = 'change';
var SHARED_FUNNEL_STEP_PROPERTIES = ['event_collection', 'time', 'timezone', 'filters'];

var _explorers = {};

function _defaultAttrs() {
  return {
    id: FormatUtils.generateTempId(),
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
      timezone: ProjectUtils.getLocalTimezone(),
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
    timezone: ProjectUtils.getLocalTimezone(),
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
  RunValidations(ExplorerValidations, _explorers[id]);
}

/**
 * Get the default coercion type for this filter based off the filter's property_name's set type
 * in the project schema.
 * @param  {Object} explorer  The explorer model that the filter belongs to
 * @param  {Object} filter    The filter
 * @return {String}           The default coercion type
 */
function _getDefaultFilterCoercionType(explorer, filter) {
  var propertyType = ProjectUtils.getPropertyType(ProjectStore.getProject(), explorer.query.event_collection, filter.property_name);
  var targetCoercionType = FormatUtils.coercionTypeForPropertyType(propertyType);
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
    if (_.isArray(objValue)) {
      return srcValue;
    } else if (key === 'time' && _.isPlainObject(objValue)) {
      return srcValue;
    }
  }
  var newModel = _.mergeWith({}, explorer, _.omit(updates, 'response'), customizer);
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

  _.each(SHARED_FUNNEL_STEP_PROPERTIES, function (key) {
    if (!_.isUndefined(explorer.query[key]) && !_.isNull(explorer.query[key])) {
      firstStep[key] = explorer.query[key];
    }

    newModel.query[key] = key === 'filters' ? [] : null;
  });

  if (!_.isUndefined(explorer.query.target_property) && !_.isNull(explorer.query.target_property)) {
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
  var activeStep = _.find(explorer.query.steps, { active: true }) || explorer.query.steps[0];

  _.each(SHARED_FUNNEL_STEP_PROPERTIES, function (key) {
    if (!_.isUndefined(activeStep[key])) {
      newModel.query[key] = activeStep[key];
    }
  });

  if (!_.isNull(activeStep.actor_property) && ExplorerUtils.shouldHaveTarget(newModel)) {
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
  if (!ExplorerUtils.isEmailExtraction(newModel)) {
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
  if (_.includes(['count', 'extraction', 'funnel'], newModel.query.analysis_type)) {
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
      updates.coercion_type = _getDefaultFilterCoercionType(explorer, _.merge({}, filter, updates));
    }
  } else if (updates.operator && updates.operator !== filter.operator) {
    var newOp = updates.operator;
    if (newOp === 'in') updates.coercion_type = 'List';
    if (newOp === 'exists') updates.coercion_type = 'Boolean';
    if (newOp === 'within') updates.coercion_type = 'Geo';

    // If it's not any of these operators, we still need to make sure that the current coercion_type is available
    // as an option for this new operator.
    var coercionOptions = _.find(ProjectUtils.getConstant('FILTER_OPERATORS'), { value: updates.operator }).canBeCoeredTo;
    var coercion_type = updates.coercion_type || filter.coercion_type;
    if (!_.includes(coercionOptions, coercion_type)) {
      updates.coercion_type = coercionOptions[0];
    }
  }

  if (updates.coercion_type === 'Geo' && filter.coercion_type !== 'Geo') {
    updates.property_value = _defaultGeoFilter();
  }

  updates.property_value = FilterUtils.getCoercedValue(_.merge({}, filter, updates));

  return updates;
}

function _wrapGroupBy(group_by) {
  if (!_.isArray(group_by)) group_by = [group_by];
  return _.pull(group_by, null);
}

function _create(attrs) {
  if (attrs && attrs.active === true) {
    throw new Error('You must use setActive to set a model as active.');
    return;
  }

  attrs = attrs || {};
  var newAttrs = _.merge(_defaultAttrs(), attrs);

  if (newAttrs.query.steps) {
    newAttrs.query.steps = _.map(newAttrs.query.steps, function (step) {
      return _.merge(_defaultStep(), step);
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
  _.each(_explorers, function (explorer, key) {
    explorer.active = false;
    delete explorer.originalModel;
  });
  _explorers[id].active = true;
  _explorers[id].originalModel = _.cloneDeep(_explorers[id]);
}

function _revertActiveChanges() {
  var active = _.find(_explorers, { active: true });
  var original = _explorers[active.id].originalModel;
  _explorers[active.id] = _.assign({}, original, { originalModel: original, response: active.response });
  return active.id;
}

function _addFilter(id, attrs) {
  attrs = attrs || {};
  _explorers[id].query.filters.push(_.assign(_defaultFilter(), attrs));
}

function _removeFilter(id, index) {
  _explorers[id].query.filters.splice(index, 1);
}

function _updateFilter(id, index, updates) {
  var filter = _explorers[id].query.filters[index];
  var updates = _prepareFilterUpdates(_explorers[id], filter, updates);

  _explorers[id].query.filters[index] = _.assign({}, filter, updates);

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
  var step = _.assign(_defaultStep(), attrs || {});
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
  _explorers[id].query.steps[index] = _.assign({}, step, updates);
}

function _setStepActive(id, index) {
  _explorers[id].query.steps.forEach(function (step) {
    step.active = false;
  });
  _explorers[id].query.steps[index].active = true;
}

function _moveStep(id, index, direction) {
  var steps = _.cloneDeep(_explorers[id].query.steps);

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
  _explorers[id].query.steps[stepIndex].filters.push(_.assign(_defaultFilter(), attrs));
}

function _removeStepFilter(id, stepIndex, filterIndex) {
  _explorers[id].query.steps[stepIndex].filters.splice(filterIndex, 1);
}

function _updateStepFilter(id, stepIndex, filterIndex, updates) {
  var filter = _explorers[id].query.steps[stepIndex].filters[filterIndex];
  var updates = _prepareFilterUpdates(_explorers[id], filter, updates);
  _explorers[id].query.steps[stepIndex].filters[filterIndex] = _.assign({}, filter, updates);

  // Hack around the fact that _.assign doesn't assign null values. But we
  // actually WANT a null value if the coercion_type is null.
  if (_explorers[id].query.steps[stepIndex].filters[filterIndex].coercion_type === 'Null') {
    _explorers[id].query.steps[stepIndex].filters[filterIndex].property_value = null;
  }
}

function _clear(id) {
  var model = _explorers[id];
  _explorers[id] = _.assign({}, _defaultAttrs(), _.pick(model, ['id', 'query_name', 'active', 'metadata', 'originalModel']));
}

var ExplorerStore = _.assign({}, EventEmitter.prototype, {

  unregisterWithDispatcher: function unregisterWithDispatcher() {
    AppDispatcher.unregister(this.dispatchToken);
  },

  clearAll: function clearAll() {
    _explorers = {};
  },

  get: function get(id) {
    return _explorers[id];
  },

  getActive: function getActive() {
    return _.find(_explorers, { active: true });
  },

  getAll: function getAll() {
    return _explorers;
  },

  getLast: function getLast() {
    var keys = _.keys(_explorers);
    return _explorers[keys[keys.length - 1]];
  },

  getAllPersisted: function getAllPersisted() {
    return _.filter(_explorers, function (explorer) {
      return ExplorerUtils.isPersisted(explorer);
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
ExplorerStore.dispatchToken = AppDispatcher.register(function (action) {

  function finishAction(id) {
    // Validate the model
    if (id) _validate(id);

    // Emit change
    ExplorerStore.emitChange();
  }

  switch (action.actionType) {
    case ExplorerConstants.EXPLORER_CREATE:
      _create(action.attrs);
      finishAction();
      break;

    case ExplorerConstants.EXPLORER_CREATE_BATCH:
      action.models.forEach(function (model) {
        _explorers[model.id] ? _update(model.id, model) : _create(model);
      });
      finishAction();
      break;

    case ExplorerConstants.EXPLORER_CLONE:
      var source = ExplorerStore.get(action.id);
      _create({ query: _.cloneDeep(source.query),
        metadata: {
          display_name: null,
          visualization: {
            chart_type: _.cloneDeep(source.metadata.visualization.chart_type)
          }
        }
      });
      finishAction();
      break;

    case ExplorerConstants.EXPLORER_UPDATE:
      var id = _update(action.id, action.updates);
      finishAction(id);
      break;

    case ExplorerConstants.EXPLORER_REMOVE:
      var wasActive = _explorers[action.id].active === true;
      _remove(action.id);
      // Create a new active explorer to replace the previously active one.
      if (wasActive) {
        var id = _create();
        _setActive(id);
      }
      finishAction();
      break;

    case ExplorerConstants.EXPLORER_SET_ACTIVE:
      _setActive(action.id);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_REVERT_ACTIVE_CHANGES:
      var id = _revertActiveChanges();
      finishAction(id);
      break;

    case ExplorerConstants.EXPLORER_CLEAR:
      _clear(action.id);
      finishAction();
      break;

    case ExplorerConstants.EXPLORER_SAVING:
      _update(action.id, { saving: true });
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_SAVE_SUCCESS:
      _update(action.id, { saving: false });
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_SAVE_FAIL:
      _update(action.id, { saving: false });
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_ADD_FILTER:
      _addFilter(action.id, action.attrs);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_REMOVE_FILTER:
      _removeFilter(action.id, action.index);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_UPDATE_FILTER:
      _updateFilter(action.id, action.index, action.attrs);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_ADD_STEP:
      _addStep(action.id, action.attrs);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_REMOVE_STEP:
      _removeStep(action.id, action.index);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_UPDATE_STEP:
      _updateStep(action.id, action.index, action.attrs);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_SET_STEP_ACTIVE:
      _setStepActive(action.id, action.index);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_MOVE_STEP:
      _moveStep(action.id, action.index, action.direction);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_ADD_STEP_FILTER:
      _addStepFilter(action.id, action.stepIndex, action.attrs);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_REMOVE_STEP_FILTER:
      _removeStepFilter(action.id, action.stepIndex, action.filterIndex);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_UPDATE_STEP_FILTER:
      _updateStepFilter(action.id, action.stepIndex, action.filterIndex, action.attrs);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_VALIDATE:
      _validate(action.id);
      finishAction();
      break;

    case ExplorerConstants.EXPLORER_FOUND_INVALID:
      // Find any invalid steps and mark the first one active to display the notice.
      _markFirstInvalidStepActive(action.id);
      finishAction();
      break;

    default:
    // no op
  }

  return true;
});

module.exports = ExplorerStore;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);

var InputComponent = React.createClass({
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
    var required = this.props.required ? React.createElement(
      'small',
      null,
      '(required)'
    ) : null;
    var label = this.props.label ? React.createElement(
      'label',
      { htmlFor: this.props.name },
      this.props.label,
      ' ',
      required
    ) : null;
    var inputClasses = "form-control";
    if (this.props.inputClasses) inputClasses = inputClasses + " " + this.props.inputClasses;

    return React.createElement(
      'div',
      { className: this.props.classes },
      label,
      React.createElement('input', { ref: 'input',
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

module.exports = InputComponent;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var classNames = __webpack_require__(6);
var _ = __webpack_require__(0);

var FieldsToggle = React.createClass({
  displayName: 'FieldsToggle',


  handleFieldsToggle: function handleFieldsToggle(toggledState) {
    var attrNames = this.props.attrsToStore;
    var updates = {};

    if (!_.isArray(attrNames)) {
      attrNames = [attrNames];
    }
    _.each(attrNames, function (attrName) {
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

    var classes = classNames({
      'has-fields-count': fieldsCount,
      'open': this.state.open && fieldsCount === null,
      'fields-toggle': true
    });

    var bodyContent;
    if (this.props.children) {
      bodyContent = React.createElement(
        'div',
        { className: 'toggle-body' },
        this.props.children
      );
    }

    return React.createElement(
      'div',
      { className: classes },
      React.createElement(
        'a',
        { href: '#', className: 'toggle-label', onClick: this.toggleButtonClick, ref: 'toggle-label' },
        React.createElement(
          'h5',
          { ref: 'name' },
          this.props.name
        ),
        React.createElement(
          'button',
          { type: 'button', className: 'toggle-button' },
          React.createElement(
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

module.exports = FieldsToggle;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);

var SelectComponent = React.createClass({
  displayName: 'SelectComponent',


  buildOptions: function buildOptions() {
    if (this.state.options.length) {

      return this.state.options.map(function (option) {
        return React.createElement(
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
    if (!_.isObject(options[0])) {
      return _.map(options, function (option) {
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
      return React.createElement('option', { value: '' });
    } else if (emptyOption) {
      return React.createElement(
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
    var label = this.props.label ? React.createElement(
      'label',
      { htmlFor: this.props.name },
      this.props.label
    ) : null;
    var emptyOption = this.buildEmptyOption();
    var emptyVal = this.props.multiple ? [] : '';
    var selectedValue = this.props.selectedOption ? this.props.selectedOption : emptyVal;

    return React.createElement(
      'div',
      { className: this.props.classes },
      label,
      React.createElement(
        'div',
        { className: 'select-element' },
        React.createElement(
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

module.exports = SelectComponent;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* ExplorerStore */

var AppDispatcher = __webpack_require__(7);
var EventEmitter = __webpack_require__(21).EventEmitter;
var _ = __webpack_require__(0);
var ProjectConstants = __webpack_require__(43);
var ProjectUtils = __webpack_require__(5);
var FormatUtils = __webpack_require__(2);

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
  var id = FormatUtils.generateTempId();
  _projects[id] = _.assign(defaultAttrs(), { id: id }, attrs);
}

function _update(id, updates) {
  _projects[id] = _.assign({}, _projects[id], updates);
}

function _updateEventCollection(id, collectionName, updates) {
  var newCollection = _.assign({}, _projects[id].schema[collectionName], updates);
  _projects[id].schema[collectionName] = newCollection;
}

var ProjectStore = _.assign({}, EventEmitter.prototype, {
  unregisterWithDispatcher: function unregisterWithDispatcher() {
    AppDispatcher.unregister(_dispatcherToken);
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
var _dispatcherToken = AppDispatcher.register(function (action) {
  var attrs;

  switch (action.actionType) {
    case ProjectConstants.PROJECT_CREATE:
      _create(action.attrs);
      ProjectStore.emitChange();
      break;

    case ProjectConstants.PROJECT_UPDATE:
      _update(action.id, action.updates);
      ProjectStore.emitChange();
      break;

    case ProjectConstants.PROJECT_UPDATE_EVENT_COLLECTION:
      _updateEventCollection(action.id, action.collectionName, action.updates);
      ProjectStore.emitChange();
      break;

    default:
    // no op
  }

  return true;
});

module.exports = ProjectStore;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = __webpack_require__(0);
var ProjectUtils = __webpack_require__(5);
var FormatUtils = __webpack_require__(2);

module.exports = {

  /**
   * Takes a time object and returns a string representing the timeframe type (absolute or relative)
   * @param  {Object} time The time object
   * @return {String} The type of timeframe, 'absolute' or 'relative'
   */
  timeframeType: function timeframeType(time) {
    if (_.isUndefined(time)) {
      return null;
    } else if (!_.isPlainObject(time)) {
      throw new Error('Invalid timeframe type: not a plain object.');
    } else if (_.has(time, 'start') || _.has(time, 'end')) {
      return 'absolute';
    } else if (_.has(time, 'relativity') && _.has(time, 'amount') && _.has(time, 'sub_timeframe')) {
      return 'relative';
    } else {
      throw new Error('Invalid timeframe type: invalid time value.');
    }
  },

  getTimezoneOffset: function getTimezoneOffset(timezone) {
    var zone = _.find(ProjectUtils.getConstant('TIMEZONES'), { value: timezone });
    return zone ? zone.offset : '+00:00';
  },

  timeframeBuilders: {

    absolute: function absolute(time) {
      if (time && time.start && time.end) {
        return {
          start: FormatUtils.formatISOTimeNoTimezone(time.start),
          end: FormatUtils.formatISOTimeNoTimezone(time.end)
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
    var timeframeBuilder = module.exports.timeframeBuilders[module.exports.timeframeType(time)];
    if (typeof timeframeBuilder === 'undefined') return "";
    return timeframeBuilder(time);
  },

  getTimeParameters: function getTimeParameters(timeframe, timezone) {
    return {
      timeframe: timeframe ? module.exports.getTimeframe(timeframe) : null,
      timezone: timezone || ProjectUtils.getConstant('DEFAULT_TIMEZONE')
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
      return module.exports.unpackAbsoluteTimeframe(timeframe, timezone);
    } else if (typeof timeframe === 'string') {
      return module.exports.unpackRelativeTimeframe(timeframe, timezone);
    }
  },

  unpackAbsoluteTimeframe: function unpackAbsoluteTimeframe(timeframe, timezone) {
    var formattedValue = {
      time: {},
      timezone: null
    };

    if (!timezone || !ProjectUtils.getConstant('TIMEZONES').filter(function (z) {
      return z.name === timezone;
    }).length) {
      formattedValue.timezone = 'UTC';
    } else {
      formattedValue.timezone = timezone;
    }

    var startVal = timeframe.start ? timeframe.start.substring(0, 19) : "";
    formattedValue.time.start = FormatUtils.formatISOTimeNoTimezone(startVal);

    var endVal = timeframe.end ? timeframe.end.substring(0, 19) : "";
    formattedValue.time.end = FormatUtils.formatISOTimeNoTimezone(endVal);

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

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AppDispatcher = __webpack_require__(7);
var NoticeConstants = __webpack_require__(37);

var NoticeActions = {

  create: function create(attrs) {
    AppDispatcher.dispatch({
      actionType: NoticeConstants.NOTICE_CREATE,
      attrs: attrs
    });
  },

  clearAll: function clearAll() {
    AppDispatcher.dispatch({
      actionType: NoticeConstants.NOTICE_CLEAR_ALL
    });
  }

};

module.exports = NoticeActions;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keyMirror = __webpack_require__(20);

module.exports = keyMirror({
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
/* 20 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__20__;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

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

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__22__;

/***/ }),
/* 23 */
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
    else if (( false ? undefined : _typeof(exports)) == 'object') module.exports = factory(__webpack_require__(22));

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AppDispatcher = __webpack_require__(7);
var AppStateConstants = __webpack_require__(41);

var AppStateActions = {

  update: function update(updates) {
    AppDispatcher.dispatch({
      actionType: AppStateConstants.APP_STATE_UPDATE,
      updates: updates
    });
  },

  reset: function reset() {
    AppDispatcher.dispatch({
      actionType: AppStateConstants.APP_STATE_RESET
    });
  }

};

module.exports = AppStateActions;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var ExplorerUtils = __webpack_require__(3);
var SharedValidators = __webpack_require__(39);
var StepValidations = __webpack_require__(38);
var RunValidations = __webpack_require__(10).run;

function isNotFunnel(model) {
  return model.query.analysis_type !== 'funnel';
}

module.exports = {

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
      return ExplorerUtils.shouldHaveTarget(model);
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
      return SharedValidators.filters(model.query.filters);
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
        RunValidations(StepValidations, model.query.steps[i]);
        if (!model.query.steps[i].isValid) isValid = false;
      }
      return isValid;
    }

  },

  time: {

    shouldRun: isNotFunnel,

    validate: function validate(model) {
      return SharedValidators.time(model.query.time);
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

    shouldRun: ExplorerUtils.isEmailExtraction,

    validate: function validate(model) {
      return new RegExp(/.+@.+\..+/i).test(model.query.email);
    }

  },

  latest: {

    msg: 'Latest must be a number.',

    shouldRun: ExplorerUtils.isEmailExtraction,

    validate: function validate(model) {
      var value = model.query.latest;
      if (!value) return true;
      var n = ~~Number(value);
      return String(n) === value && n >= 0;
    }

  }

};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);

module.exports = {
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
    var queryDataType = module.exports.getQueryDataType(query);
    return dataTypes[queryDataType].concat(['JSON']);
  },

  responseSupportsChartType: function responseSupportsChartType(query, chartType) {
    return _.includes(module.exports.getChartTypeOptions(query), chartType);
  },

  isTableChartType: function isTableChartType(chartType) {
    return chartType == 'table';
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);

function noticeExists(notice) {
  return notice && !_.isEmpty(notice);
}

var NoticeComponent = React.createClass({
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
      icon = React.createElement('span', { className: "icon glyphicon glyphicon-" + this.props.notice.icon });
    }

    var closeBtn;
    if (this.props.closable) {
      closeBtn = React.createElement(
        'button',
        { className: 'close', onClick: this.close },
        '\xD7'
      );
    }

    return React.createElement(
      'div',
      { className: classes, key: 'notice', ref: 'notice' },
      closeBtn,
      React.createElement(
        'p',
        null,
        icon,
        ' ',
        React.createElement(
          'strong',
          null,
          this.props.notice.text || ''
        )
      )
    );
  }

});

module.exports = NoticeComponent;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var AppDispatcher = __webpack_require__(7);
var ProjectConstants = __webpack_require__(43);
var ProjectStore = __webpack_require__(16);
var ProjectUtils = __webpack_require__(5);
var ExplorerUtils = __webpack_require__(3);
var FormatUtils = __webpack_require__(2);

var ProjectActions = {

  create: function create(attrs) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_CREATE,
      attrs: attrs
    });
  },

  update: function update(id, updates) {
    var project = ProjectStore.getProject();

    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_UPDATE,
      id: project.id,
      updates: updates
    });
  },

  fetchProjectCollections: function fetchProjectCollections(client) {
    var project = ProjectStore.getProject();
    if (!project) console.error("Cannot fetchProjectCollections: No project model has been created yet.");

    return client.get(client.url('projectId')).auth(client.masterKey()).send().then(function (res) {
      var schema = _.assign({}, project.schema);
      _.each(res.events, function (collection) {
        schema[collection.name] = _.assign(collection, {
          properties: {},
          sortedProperties: [],
          loading: false,
          recentEvents: null
        });
      });
      ProjectActions.update(project.id, {
        schema: schema,
        eventCollections: FormatUtils.sortItems(_.keys(schema)),
        loading: false
      });
    }).catch(function (err) {
      console.error('Error fetching project collections: ', err.stack);
    });
  },

  fetchCollectionSchema: function fetchCollectionSchema(client, collectionName) {
    var project = ProjectStore.getProject();
    if (project.eventCollections.indexOf(collectionName) < 0) {
      return false;
    }
    ProjectActions.updateEventCollection(collectionName, {
      loading: true
    });
    return client.get(client.url('events', encodeURIComponent(collectionName))).auth(client.masterKey()).send().then(function (res) {
      ProjectActions.updateEventCollection(collectionName, {
        properties: res.properties,
        sortedProperties: FormatUtils.sortItems(_.keys(res.properties)),
        loading: false
      });
    }).catch(function (err) {
      console.error('Error fetching project collections: ', err.stack);
    });
  },

  updateEventCollection: function updateEventCollection(collectionName, updates) {
    var project = ProjectStore.getProject();
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_UPDATE_EVENT_COLLECTION,
      id: project.id,
      collectionName: collectionName,
      updates: updates
    });
  },

  fetchRecentEventsForCollection: function fetchRecentEventsForCollection(client, eventCollection) {
    var project = ProjectStore.getProject();
    ProjectActions.updateEventCollection(eventCollection, {
      loading: true
    });
    ExplorerUtils.runQuery({
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

module.exports = ProjectActions;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);

var LoaderComponent = React.createClass({
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

    return React.createElement(
      'div',
      { className: classes },
      React.createElement(
        'div',
        { className: 'msg' },
        React.createElement(
          'div',
          { className: 'explorer-spinner' },
          React.createElement('div', { className: 'rect1' }),
          React.createElement('div', { className: 'rect2' }),
          React.createElement('div', { className: 'rect3' }),
          React.createElement('div', { className: 'rect4' }),
          React.createElement('div', { className: 'rect5' })
        ),
        'Loading...'
      )
    );
  }

});

module.exports = LoaderComponent;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var RunValidations = __webpack_require__(10).run;
var FormatUtils = __webpack_require__(2);

function isGeoCoercionType(model) {
  return model.coercion_type === 'Geo';
}

module.exports = {

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
        return FormatUtils.parseList(value) ? true : false;
      } else if (coercionType === 'Null' || coercionType === 'Boolean') {
        return true;
      } else if (coercionType === 'Number') {
        return _.isNumber(value);
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
      var valid = _.isArray(value) && value.length === 2;
      if (!valid) return valid;

      for (var i = 0; i < value.length; i++) {
        if (!valid) break;
        valid = _.isNumber(value[i]);
      }
      return valid;
    }

  },

  max_distance_miles: {

    msg: 'Provide a max distance in miles.',

    shouldRun: isGeoCoercionType,

    validate: function validate(model) {
      var value = model.property_value.max_distance_miles;
      return value && _.isNumber(value);
    }

  }

};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Qs = __webpack_require__(45);
var _ = __webpack_require__(0);

module.exports = {

  getSearchString: function getSearchString() {
    return window.location.search;
  },

  updateSearchString: function updateSearchString(queryStringData) {
    var urlPath;
    if (_.keys(queryStringData).length) {
      urlPath = '?' + Qs.stringify(queryStringData);
    } else {
      urlPath = window.location.origin + window.location.pathname;
    }
    window.history.pushState({ model: queryStringData }, "", urlPath);
  },

  getQueryAttributes: function getQueryAttributes() {
    return Qs.parse(this.getSearchString().replace('?', ''), { depth: 7 });
  }

};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var React = __webpack_require__(1);
var Filter = __webpack_require__(54);
var Modal = __webpack_require__(40);
var ProjectUtils = __webpack_require__(5);
var FilterUtils = __webpack_require__(8);

var FilterManager = React.createClass({
  displayName: 'FilterManager',


  propTypes: {
    eventCollection: React.PropTypes.string,
    propertyNames: React.PropTypes.array,
    filters: React.PropTypes.array,
    addFilter: React.PropTypes.func.isRequired,
    removeFilter: React.PropTypes.func.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    getPropertyType: React.PropTypes.func.isRequired
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
    var updates = _.cloneDeep(this.props.filters[index]);

    if (!_.isNull(name.match('coordinates'))) {
      var coordinateIndex = parseInt(name.split('.')[1]);
      updates.property_value.coordinates[coordinateIndex] = FilterUtils.coerceGeoValue(value);
    } else if (name === 'max_distance_miles' && updates.coercion_type === 'Geo') {
      updates.property_value[name] = FilterUtils.coerceGeoValue(value);
    } else {
      updates[name] = value;
    }

    this.props.handleChange(index, updates);
  },

  buildFilterNodes: function buildFilterNodes() {
    var filterNodes = this.props.filters.map(function (filter, index) {
      return React.createElement(Filter, { key: index,
        index: index,
        filter: filter,
        propertyType: this.props.getPropertyType(this.props.eventCollection, filter.property_name),
        eventCollection: this.props.eventCollection,
        propertyNames: this.props.propertyNames,
        handleChange: this.handleChange,
        removeFilter: this.removeFilter,
        filterOperators: ProjectUtils.getConstant('FILTER_OPERATORS') });
    }.bind(this));

    return React.createElement(
      'div',
      null,
      filterNodes,
      React.createElement(
        'div',
        { className: 'filter-buttons' },
        React.createElement(
          'a',
          { href: '#', className: 'add-filter btn btn-primary', onClick: this.addFilter },
          React.createElement('i', { className: 'icon glyphicon glyphicon-plus margin-right-tiny' }),
          'Add another filter'
        )
      )
    );
  },

  noFiltersMarkup: function noFiltersMarkup() {
    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-md-10 col-md-offset-1' },
        React.createElement(
          'div',
          { className: 'no-filters-msg callout' },
          React.createElement(
            'p',
            { className: 'lead' },
            React.createElement('i', { className: 'icon glyphicon glyphicon-info-sign margin-right-tiny' }),
            'Please select an Event Collection before making a filter.'
          )
        )
      )
    );
  },

  render: function render() {
    var filterContent = this.props.eventCollection ? this.buildFilterNodes() : this.noFiltersMarkup();

    return React.createElement(
      Modal,
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
      React.createElement(
        'div',
        { className: 'filters' },
        filterContent
      )
    );
  }
});

module.exports = FilterManager;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

'use strict';

var _ = __webpack_require__(0);
var React = __webpack_require__(1);
var ReactSelect = __webpack_require__(11);

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

var Timepicker = React.createClass({
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
    var label = this.props.label ? React.createElement(
      'label',
      { htmlFor: this.props.name },
      this.props.label
    ) : null;
    var errorMsg = this.state.errorMsg ? React.createElement(
      'p',
      null,
      this.state.errorMsg
    ) : null;

    return React.createElement(
      'div',
      { className: this.props.classes },
      label,
      React.createElement(ReactSelect, { ref: this.props.refValue,
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

module.exports = Timepicker;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

'use strict';

var _ = __webpack_require__(0);
var React = __webpack_require__(1);
var moment = __webpack_require__(9);

var pickadate = __webpack_require__(23);
var pickadate = __webpack_require__(58);
var pickadate = __webpack_require__(57);

var Datepicker = React.createClass({
  displayName: 'Datepicker',


  handleOnBlur: function handleOnBlur(event) {
    this.destroyPicker();
    var value = event.target.value;
    var isValid = moment(new Date(value)).isValid();

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
      onSet: _.bind(function (args) {
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
    var label = this.props.label ? React.createElement(
      'label',
      { htmlFor: this.props.name },
      this.props.label
    ) : null;
    var errorMsg = this.state.errorMsg ? React.createElement(
      'p',
      null,
      this.state.errorMsg
    ) : '';

    return React.createElement(
      'div',
      { className: this.props.classes },
      label,
      React.createElement('input', { type: 'text',
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

module.exports = Datepicker;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var moment = __webpack_require__(9);
var React = __webpack_require__(1);
var AbsolutePicker = __webpack_require__(59);
var RelativePicker = __webpack_require__(56);
var FieldsToggle = __webpack_require__(14);
var ReactSelect = __webpack_require__(11);
var Timezone = __webpack_require__(55);
var ExplorerActions = __webpack_require__(4);
var TimeframeUtils = __webpack_require__(17);
var ProjectUtils = __webpack_require__(5);

function relativeDefaults() {
  return {
    relativity: 'this',
    amount: '14',
    sub_timeframe: 'days'
  };
}

function absoluteDefaults() {
  return {
    start: new Date(moment().subtract(1, 'days').startOf('day').format()),
    end: new Date(moment().startOf('day').format())
  };
}

var Timeframe = React.createClass({
  displayName: 'Timeframe',


  toggleTimeframeType: function toggleTimeframeType(event) {
    event.preventDefault();
    var type = event.currentTarget.dataset.type;

    this.props.handleChange('time', type === 'absolute' ? absoluteDefaults() : relativeDefaults());
  },

  isAbsolute: function isAbsolute() {
    return TimeframeUtils.timeframeType(this.props.time) === 'absolute';
  },

  isRelative: function isRelative() {
    return TimeframeUtils.timeframeType(this.props.time) === 'relative';
  },

  // React Methods

  render: function render() {
    var timezone = this.props.timezone || ProjectUtils.getConstant('DEFAULT_TIMEZONE');

    if (this.isAbsolute()) {
      var timeframePicker = React.createElement(AbsolutePicker, { time: this.props.time,
        handleChange: this.props.handleChange });
    } else {
      var timeframePicker = React.createElement(RelativePicker, { relativeIntervalTypes: ProjectUtils.getConstant('RELATIVE_INTERVAL_TYPES'),
        time: this.props.time,
        handleChange: this.props.handleChange });
    }

    return React.createElement(
      'div',
      { className: 'timeframe' },
      React.createElement(
        'div',
        { className: 'field-component' },
        React.createElement(
          'label',
          null,
          'Timeframe'
        ),
        React.createElement(
          'ul',
          { className: 'nav nav-pills', role: 'tablist' },
          React.createElement(
            'li',
            { className: this.isRelative() ? 'active' : '' },
            React.createElement(
              'a',
              { href: '#', className: 'relative-tab', 'data-type': 'relative', onClick: this.toggleTimeframeType },
              'Relative'
            )
          ),
          React.createElement(
            'li',
            { className: this.isAbsolute() ? 'active' : '' },
            React.createElement(
              'a',
              { href: '#', className: 'absolute-tab', 'data-type': 'absolute', onClick: this.toggleTimeframeType },
              'Absolute'
            )
          )
        ),
        timeframePicker,
        React.createElement(Timezone, { timezone: this.props.timezone,
          timeframe_type: TimeframeUtils.timeframeType(this.props.time),
          handleChange: this.props.handleChange })
      )
    );
  }
});

module.exports = Timeframe;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);

// Components
var ReactSelect = __webpack_require__(11);

var SelectField = React.createClass({
  displayName: 'SelectField',


  getDefaultProps: function getDefaultProps() {
    return {
      sort: false,
      inputClasses: []
    };
  },

  buildBrowseEventsLink: function buildBrowseEventsLink() {
    if (this.props.onBrowseEvents) {
      return React.createElement(
        'button',
        { className: 'btn btn-link field-secondary-control', title: 'Browse event collections', type: 'button', onClick: this.props.onBrowseEvents, id: 'browse-event-collections' },
        React.createElement('span', { className: 'icon glyphicon glyphicon-search' }),
        ' Preview collections'
      );
    }
  },

  // React methods

  render: function render() {
    var requiredNote = this.props.requiredLabel ? React.createElement(
      'small',
      null,
      '(required)'
    ) : null;

    return React.createElement(
      'div',
      { className: 'field-component' },
      React.createElement(
        'label',
        { htmlFor: this.props.name },
        this.props.label,
        ' ',
        requiredNote
      ),
      React.createElement(ReactSelect, { ref: 'select',
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

module.exports = SelectField;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keyMirror = __webpack_require__(20);

module.exports = keyMirror({
  NOTICE_CREATE: null,
  NOTICE_CLEAR_ALL: null
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var FormatUtils = __webpack_require__(2);
var SharedValidators = __webpack_require__(39);

module.exports = {

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
      return SharedValidators.time(model.time);
    }

  },

  filters: {

    msg: 'One of your filters is invalid.',

    validate: function validate(model) {
      return SharedValidators.filters(model.filters);
    }

  },

  optional: {

    msg: 'You must select whether this step is optional.',

    validate: function validate(model) {
      if (FormatUtils.isNullOrUndefined(model.optional)) return false;
      return typeof model.optional === 'boolean';
    }

  },

  inverted: {

    msg: 'You must select whether this step is inverted.',

    validate: function validate(model) {
      if (FormatUtils.isNullOrUndefined(model.inverted)) return false;
      return typeof model.inverted === 'boolean';
    }

  },

  with_actors: {

    msg: '"with_actors" must be set to either true or false',

    validate: function validate(model) {
      if (FormatUtils.isNullOrUndefined(model.with_actors)) return false;
      return typeof model.with_actors === 'boolean';
    }

  }

};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var RunValidations = __webpack_require__(10).run;
var FilterValidations = __webpack_require__(30);
var TimeframeUtils = __webpack_require__(17);
var FilterUtils = __webpack_require__(8);

module.exports = {

  filters: function filters(_filters) {
    if (!_filters || _.isArray(_filters) && !_filters.length) return true;
    var isValid = true;
    for (var i = 0; i < _filters.length; i++) {
      if (!FilterUtils.isComplete(_filters[i])) continue;
      RunValidations(FilterValidations, _filters[i]);
      if (!_filters[i].isValid) isValid = false;
    }
    return isValid;
  },

  time: function time(_time) {
    var defaultError = "You must provide a timeframe.";

    if (!_time) return defaultError;
    if (TimeframeUtils.timeframeType(_time) === 'relative') {
      if (_time.relativity && _time.amount && _time.sub_timeframe) return true;
      return "You must choose all 3 options for relative timeframes.";
    }
    if (TimeframeUtils.timeframeType(_time) === 'absolute') {
      if (_time.start && _time.end) return true;
      return "You must provide a start and end time for absolute timeframes.";
    }

    return defaultError;
  }

};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);
var classNames = __webpack_require__(6);

var Modal = React.createClass({
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
      var footerBtns = _.map(this.props.footerBtns, _.bind(function (btnConfig, index) {
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
          var icon = React.createElement('span', { className: iconClass });
        }

        return React.createElement(
          'button',
          { type: 'button', ref: btnConfig.ref || '', className: classes, onClick: btnConfig.onClick || this.close, key: index },
          icon,
          text
        );
      }, this));

      return React.createElement(
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
    $(document).on('click', '.modal.block', _.bind(this.backdropClick, this));
    $(document).on('keyup', _.bind(function (e) {
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
    var modalDialogClasses = classNames({
      'modal-dialog': true,
      'modal-lg': this.props.size === 'large'
    });

    var titleIcon;
    if (this.props.titleIcon) {
      var titleIconClasses = "icon glyphicon glyphicon-" + this.props.titleIcon;
      if (!this.props.title) titleIconClasses += " big no-margin";
      if (this.props.iconClasses) titleIconClasses = titleIconClasses + " " + this.props.iconClasses;
      titleIcon = React.createElement('span', { className: titleIconClasses });
    }

    return React.createElement(
      'div',
      { className: modalClasses },
      React.createElement(
        'div',
        { className: modalDialogClasses },
        React.createElement(
          'div',
          { className: 'modal-content' },
          React.createElement(
            'div',
            { className: 'modal-header' },
            React.createElement(
              'button',
              { type: 'button', className: 'close', onClick: this.closeClick },
              React.createElement(
                'span',
                { 'aria-hidden': 'true' },
                '\xD7'
              ),
              React.createElement(
                'span',
                { className: 'sr-only' },
                'Close'
              )
            ),
            React.createElement(
              'h3',
              { className: 'modal-title' },
              titleIcon,
              this.props.title
            )
          ),
          React.createElement(
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

module.exports = Modal;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keyMirror = __webpack_require__(20);

module.exports = keyMirror({
  APP_STATE_UPDATE: null,
  APP_STATE_RESET: null
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var AppDispatcher = __webpack_require__(7);
var EventEmitter = __webpack_require__(21).EventEmitter;
var AppStateConstants = __webpack_require__(41);

var CHANGE_EVENT = 'change';

function defaultState() {
  return {
    fetchingPersistedExplorers: false,
    codeSampleHidden: true,
    ready: false
  };
}

var _appState = defaultState();

function _update(updates) {
  _appState = _.assign({}, _appState, updates);
}

function _reset() {
  _appState = defaultState();
}

var AppStateStore = _.assign({}, EventEmitter.prototype, {
  unregisterWithDispatcher: function unregisterWithDispatcher() {
    AppDispatcher.unregister(this.dispatchToken);
  },

  getState: function getState() {
    return _appState;
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
AppStateStore.dispatchToken = AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case AppStateConstants.APP_STATE_UPDATE:
      _update(action.updates);
      AppStateStore.emitChange();
      break;

    case AppStateConstants.APP_STATE_RESET:
      _reset();
      AppStateStore.emitChange();
      break;

    default:
    // no op
  }

  return true;
});

module.exports = AppStateStore;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keyMirror = __webpack_require__(20);

module.exports = keyMirror({
  PROJECT_CREATE: null,
  PROJECT_UPDATE: null,
  PROJECT_UPDATE_EVENT_COLLECTION: null
});

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__44__;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__45__;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var AppDispatcher = __webpack_require__(7);
var EventEmitter = __webpack_require__(21).EventEmitter;
var NoticeConstants = __webpack_require__(37);
var ExplorerConstants = __webpack_require__(19);
var ExplorerStore = __webpack_require__(12);

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
  _.each(_notices, function (val, key) {
    if (val.location === 'global') delete _notices[key];
  });
}

function _removeStepNotices() {
  _.each(_notices, function (val, key) {
    if (val.location === 'step') delete _notices[key];
  });
}

function _create(attrs) {
  if (!attrs.location || attrs.location === 'global') {
    _removeGlobalNotices();
  }
  var tempId = "TEMP-" + (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _notices[tempId] = _.assign(defaultAttrs(), attrs);
}

function _clearAll() {
  _notices = {};
}

var NoticeStore = _.assign({}, EventEmitter.prototype, {
  unregisterWithDispatcher: function unregisterWithDispatcher() {
    AppDispatcher.unregister(this.dispatchToken);
  },

  getGlobalNotice: function getGlobalNotice() {
    return _.find(_notices, { location: 'global' });
  },

  getStepNotices: function getStepNotices() {
    return _.filter(_notices, function (notice) {
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
NoticeStore.dispatchToken = AppDispatcher.register(function (action) {
  AppDispatcher.waitFor([ExplorerStore.dispatchToken]);

  switch (action.actionType) {
    case NoticeConstants.NOTICE_CREATE:
      _create(action.attrs);
      NoticeStore.emitChange();
      break;

    case NoticeConstants.NOTICE_CLEAR_ALL:
      _clearAll();
      NoticeStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_SAVING:
      var text = action.saveType === 'save' ? 'Saving query...' : 'Updating query...';
      _create({
        type: 'info',
        text: text,
        icon: 'info-sign'
      });
      NoticeStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_SAVE_SUCCESS:
      var text = action.saveType === 'save' ? 'Query saved' : 'Query updated';
      _create({
        type: 'success',
        text: text + '.',
        icon: 'ok'
      });
      NoticeStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_SAVE_FAIL:
      var msg;
      var text = action.saveType === 'save' ? 'saving' : 'updating';
      if (action.errorMsg) {
        msg = 'Problem ' + text + ': ' + action.errorMsg;
      } else if (action.errorResp && JSON.parse(action.errorResp.text).error_code === "OverCachedQueryLimitError") {
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

    case ExplorerConstants.EXPLORER_DESTROYING:
      _create({
        type: 'info',
        text: 'Deleting query...',
        icon: 'info-sign'
      });
      NoticeStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_DESTROY_SUCCESS:
      _create({
        type: 'success',
        text: 'Query deleted.',
        icon: 'ok'
      });
      NoticeStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_DESTROY_FAIL:
      _create({
        type: 'error',
        text: 'There was a problem deleting your query: ' + action.errorMsg,
        icon: 'remove-sign'
      });
      NoticeStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_FOUND_INVALID:
      var explorer = ExplorerStore.get(action.id);
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

module.exports = NoticeStore;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var classNames = __webpack_require__(6);
var _ = __webpack_require__(0);
var ExplorerUtils = __webpack_require__(3);

var QueryActions = React.createClass({
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

    if (ExplorerUtils.isEmailExtraction(this.props.model)) {
      btnStates = this.runBtnStates.emailExtraction;
    } else if (ExplorerUtils.isImmediateExtraction(this.props.model)) {
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
        runButtonClasses = classNames({
      'disabled': this.props.model.loading,
      'btn btn-primary run-query': true
    }),
        codeSampleBtnClasses = classNames({
      'btn btn-default code-sample-toggle pull-right': true,
      'open': !this.props.codeSampleHidden
    });

    var isEmailExtraction = ExplorerUtils.isEmailExtraction(this.props.model);
    var isPersisted = ExplorerUtils.isPersisted(this.props.model);
    var isFunnel = this.props.model.query.analysis_type === 'funnel';

    if (this.props.persistence) {
      if (isEmailExtraction) {
        actionsSupported = false;
        saveMsg = React.createElement(
          'p',
          { className: 'no-margin margin-top-tiny' },
          React.createElement(
            'small',
            null,
            'The Keen IO API currently does not support saving email extraction.'
          )
        );
      }
      saveBtn = React.createElement(
        'button',
        { type: 'button', className: 'btn btn-success save-query', onClick: actionsSupported ? this.props.saveQueryClick : function () {}, role: 'save-query', disabled: this.props.model.loading || !actionsSupported },
        isPersisted ? 'Update' : 'Save'
      );
      deleteBtn = React.createElement(
        'button',
        { type: 'button', role: 'delete-query', className: 'btn btn-link', onClick: actionsSupported ? this.props.removeClick : function () {}, disabled: !actionsSupported },
        'Delete'
      );
      if (isPersisted) {
        cloneBtn = React.createElement(
          'button',
          { type: 'button', className: 'btn btn-default', onClick: actionsSupported ? this.props.cloneQueryClick : function () {}, role: 'clone-query', disabled: this.props.model.loading || !actionsSupported },
          'Clone'
        );
      }
    }

    return React.createElement(
      'div',
      { className: 'query-actions clearfix' },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-md-10 clearfix' },
          React.createElement(
            'div',
            { className: 'run-group pull-left' },
            React.createElement(
              'button',
              { type: 'submit', role: 'run-query', className: runButtonClasses, id: 'run-query', onClick: this.props.handleQuerySubmit },
              this.runButtonText()
            )
          ),
          React.createElement(
            'div',
            { className: 'manage-group pull-left' },
            saveBtn,
            cloneBtn,
            deleteBtn
          )
        ),
        React.createElement(
          'div',
          { className: 'col-md-2' },
          React.createElement(
            'button',
            { className: codeSampleBtnClasses, role: 'toggle-code-sample', onClick: this.props.toggleCodeSample },
            React.createElement(
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

module.exports = QueryActions;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);
var classNames = __webpack_require__(6);
var moment = __webpack_require__(9);

var ExplorerActions = __webpack_require__(4);
var refreshRateMultiplier = 60 * 60;

var CacheToggle = React.createClass({
  displayName: 'CacheToggle',


  setCached: function setCached(event) {
    var updates = _.clone(this.props.model);
    if (this._isCached()) {
      updates.refresh_rate = 0;
    } else {
      updates.refresh_rate = 14400;
    }

    ExplorerActions.update(this.props.model.id, updates);
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
    var updates = _.clone(this.props.model);
    updates.refresh_rate = refresh_rate;

    ExplorerActions.update(this.props.model.id, updates);
    this.forceUpdate();
  },

  getInitialState: function getInitialState() {
    return {
      refresh_rate: this._refreshRateInHours(this.props.model),
      cached: false,
      settingsOpen: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({ refresh_rate: this._refreshRateInHours(nextProps.model) });
  },

  render: function render() {
    var isCached = this._isCached();
    var parentClasses = classNames({
      'cache-toggle': true,
      'inactive': !isCached
    });
    var cacheDetailsClasses = classNames({
      "cache-details": true,
      "hide": !isCached
    });
    var cacheSettingsClasses = classNames({
      "cache-settings": true,
      "hide": !this.state.settingsOpen
    });

    var cacheToggleLabel = isCached ? 'Caching enabled' : 'Enable caching';

    return React.createElement(
      'div',
      { className: parentClasses },
      React.createElement(
        'label',
        { htmlFor: 'cache' },
        React.createElement('input', { type: 'checkbox', name: 'cache', id: 'cache',
          onChange: this.setCached, checked: isCached }),
        cacheToggleLabel,
        React.createElement(
          'a',
          { href: 'https://keen.io/docs/api/#saved-queries', target: '_blank' },
          React.createElement('i', { className: 'icon glyphicon glyphicon-question-sign' })
        )
      ),
      React.createElement(
        'span',
        { className: cacheDetailsClasses },
        this._minutesAgo(),
        React.createElement(
          'a',
          { href: '#', onClick: this.setSettingsOpen, className: 'margin-left-tiny' },
          React.createElement('span', { className: 'icon icon-cog glyphicon-cog glyphicon' })
        )
      ),
      React.createElement(
        'span',
        { className: cacheSettingsClasses },
        'Refresh every ',
        React.createElement('input', { type: 'text',
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
      var lastRun = moment(runInformation.last_run_date).utcOffset(0);
      var duration = moment.duration(lastRun.diff(moment())).humanize();
      return 'Last updated ' + duration + ' ago.';
    }
  },

  _refreshRateInHours: function _refreshRateInHours(model) {
    return model.refresh_rate / refreshRateMultiplier * 100 / 100;
  }

});

module.exports = CacheToggle;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);
var moment = __webpack_require__(9);

function dateForItem(item) {
  if (item.created_date) {
    var datetime = moment(new Date(item.created_date.replace(' ', 'T')));
    return datetime.isValid() ? datetime.format('ll h:mm A') : null;
  }
}

var BrowseQueries = React.createClass({
  displayName: 'BrowseQueries',


  clickCallback: function clickCallback(event) {
    this.props.clickCallback(event);
  },

  buildList: function buildList() {
    var listElements = this.props.listItems.map(_.bind(function (listItem, index) {
      var isSelected = this.props.selectedIndex === index ? true : false;
      var classes;
      if (isSelected) classes = 'active';
      var createdAt;
      var datetime = dateForItem(listItem);
      if (datetime) {
        createdAt = React.createElement(
          'p',
          { className: 'date pull-right' },
          React.createElement('span', { className: 'icon glyphicon glyphicon-time' }),
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

      return React.createElement(
        'li',
        { className: classes, key: index, 'data-id': listItem.id, onClick: this.clickCallback },
        React.createElement(
          'h5',
          { className: 'name' },
          displayName
        ),
        React.createElement(
          'div',
          { className: 'metadata clearfix' },
          React.createElement(
            'p',
            { className: 'date pull-left' },
            isCachedText
          ),
          createdAt
        )
      );
    }, this));
    return React.createElement(
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

    return React.createElement(
      'section',
      { className: 'query-pane-section browse-queries' },
      this.props.notice,
      listItems,
      emptyContent
    );
  }

});

module.exports = BrowseQueries;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);

var ApiUrl = React.createClass({
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
    return React.createElement(
      'div',
      { className: 'explorer-api-url' },
      React.createElement(
        'button',
        { className: 'btn btn-link field-secondary-control', title: 'API URL', type: 'button', onClick: this.handleClick },
        React.createElement('span', { className: "icon glyphicon glyphicon-chevron-" + (this.state.active ? "down" : "right") + " icon-chevron-" + (this.state.active ? "down" : "right") }),
        ' API Query URL'
      ),
      React.createElement(
        'div',
        { className: this.state.active ? "show" : "hide" },
        React.createElement('input', {
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

module.exports = ApiUrl;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var moment = __webpack_require__(9);
var React = __webpack_require__(1);
var Select = __webpack_require__(15);
var FieldsToggle = __webpack_require__(14);
var ExplorerActions = __webpack_require__(4);
var ExplorerUtils = __webpack_require__(3);
var ProjectUtils = __webpack_require__(5);

var Interval = React.createClass({
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
    return React.createElement(
      'div',
      { className: 'field-component' },
      React.createElement(
        FieldsToggle,
        { ref: 'interval-toggle',
          name: 'Interval',
          initialOpenState: this.props.interval,
          attrsToStore: 'interval',
          getFn: this.intervalGetFn,
          updateFn: this.intervalUpdateFn,
          toggleCallback: this.intervalFieldsToggled },
        React.createElement(Select, { label: false,
          name: 'interval',
          classes: 'interval-type',
          options: ProjectUtils.getConstant('ABSOLUTE_INTERVAL_TYPES'),
          emptyOption: false,
          handleSelection: this.setInterval,
          selectedOption: this.props.interval,
          sort: false })
      )
    );
  }
});

module.exports = Interval;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var React = __webpack_require__(1);

var Geo = React.createClass({
  displayName: 'Geo',


  // Note: Keen API standard is Longitude followed by Latitude.
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'col-md-12' },
        React.createElement(
          'label',
          { htmlFor: 'amount' },
          'Longitude'
        ),
        React.createElement('input', { type: 'text',
          name: 'coordinates.0',
          className: 'form-control',
          value: this.props.filter.property_value.coordinates[0] || "",
          onChange: this.props.handleChange,
          autoComplete: 'off' })
      ),
      React.createElement(
        'div',
        { className: 'col-md-12' },
        React.createElement(
          'label',
          { htmlFor: 'amount' },
          'Latitude'
        ),
        React.createElement('input', { type: 'text',
          name: 'coordinates.1',
          className: 'form-control',
          value: this.props.filter.property_value.coordinates[1] || "",
          onChange: this.props.handleChange,
          autoComplete: 'off' })
      ),
      React.createElement(
        'div',
        { className: 'col-md-12' },
        React.createElement(
          'label',
          { htmlFor: 'amount' },
          'Radius in Miles'
        ),
        React.createElement('input', { type: 'text',
          name: 'max_distance_miles',
          className: 'form-control',
          value: this.props.filter.property_value.max_distance_miles || "",
          onChange: this.props.handleChange,
          autoComplete: 'off' })
      )
    );
  }
});

module.exports = Geo;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var moment = __webpack_require__(9);
var React = __webpack_require__(1);
var Select = __webpack_require__(15);
var Datepicker = __webpack_require__(34);
var Timepicker = __webpack_require__(33);
var Geo = __webpack_require__(52);
var FormatUtils = __webpack_require__(2);
var FilterUtils = __webpack_require__(8);

var dateFormat = 'll';
var timeFormat = 'h:mm A';

function pasrseIntoDate(dateString, timeString) {
  var date = moment(new Date(dateString)).format(dateFormat);
  var time = moment(new Date(timeString)).format(timeFormat);
  return new Date(date + " " + time).toString();
}

var FilterValueFields = React.createClass({
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
    return operator ? _.find(this.props.filterOperators, { value: operator }).canBeCoeredTo : [];
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
      valueInput = React.createElement(Geo, { handleChange: this.handleChangeWithEvent,
        filter: this.props.filter });
    } else if (this.props.filter.operator === 'exists' || this.props.filter.coercion_type === 'Boolean') {
      valueInput = React.createElement(Select, { name: 'property_value',
        classes: 'property-value',
        ref: 'boolean-value-set',
        options: ['true', 'false'],
        handleBlur: this.handleChangeWithEvent,
        handleSelection: this.setValueState,
        selectedOption: FormatUtils.booleanMap(this.state.property_value) || 'true',
        emptyOption: false });
    } else if (this.props.filter.coercion_type === 'Datetime') {
      valueInput = React.createElement(
        'div',
        { className: 'row property-value' },
        React.createElement(
          'div',
          { className: 'col-md-6 form-collapse-right' },
          React.createElement(Datepicker, { ref: 'date-value-input',
            value: moment(new Date(this.state.property_value)).format(dateFormat),
            label: false,
            name: 'property_value',
            placeholder: 'Date',
            classes: 'datepicker-wrapper',
            onSet: this.setDate,
            onBlur: this.handleDateBlur })
        ),
        React.createElement(
          'div',
          { className: 'col-md-6 form-collapse-left' },
          React.createElement(Timepicker, { ref: 'time-value-input',
            value: moment(new Date(this.state.property_value)).format(timeFormat),
            label: false,
            name: 'property_value',
            placeholder: 'Time',
            classes: 'timepicker-wrapper',
            handleSelection: this.setTime,
            handleBlur: this.setTime })
        )
      );
    } else {
      valueInput = React.createElement('input', { type: 'text',
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

    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-md-3 form-collapse-right' },
        React.createElement(Select, { label: false,
          ref: 'type-set',
          name: 'coercion_type',
          classes: 'coercion-type',
          sort: false,
          options: this.getCoercionOptions(),
          handleSelection: this.handleChangeWithEvent,
          selectedOption: this.props.filter.coercion_type,
          emptyOption: false })
      ),
      React.createElement(
        'div',
        { className: 'col-md-9 form-collapse-left' },
        valueInput
      )
    );
  }
});

module.exports = FilterValueFields;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var React = __webpack_require__(1);
var Select = __webpack_require__(15);
var classNames = __webpack_require__(6);
var ReactSelect = __webpack_require__(11);
var FilterValueFields = __webpack_require__(53);
var FilterUtils = __webpack_require__(8);

var Filter = React.createClass({
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
    return React.createElement(FilterValueFields, { filter: this.props.filter,
      filterOperators: this.props.filterOperators,
      handleChange: this.handleChange });
  },

  buildOperatorSelect: function buildOperatorSelect() {
    return React.createElement(Select, { label: false,
      name: 'operator',
      classes: 'operator',
      options: this.props.filterOperators,
      emptyOption: false,
      sort: false,
      handleSelection: this.handleChangeWithEvent,
      selectedOption: this.props.filter.operator });
  },

  buildPropertyNameSelect: function buildPropertyNameSelect() {
    return React.createElement(ReactSelect, { name: 'property_name',
      inputClasses: 'property-name form-control',
      items: this.props.propertyNames,
      handleChange: this.handleChange,
      placeholder: 'Select a property name',
      value: this.props.filter.property_name,
      sort: true });
  },

  getListSyntaxInfo: function getListSyntaxInfo() {
    if (this.props.filter.coercion_type === 'List') {
      return React.createElement(
        'p',
        { className: 'filter-instructions help-block' },
        'Wrap strings in ',
        React.createElement(
          'b',
          null,
          'double'
        ),
        ' quotes & numbers in ',
        React.createElement(
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
      return React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-md-12' },
          React.createElement(
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
    var complete = FilterUtils.isComplete(this.props.filter);
    var valid = this.props.filter.isValid;
    return complete && !valid;
  },

  // React functions

  render: function render() {
    var filterClasses = classNames({
      'filter-row': true,
      'filter-complete': !FilterUtils.isComplete(this.props.filter) || this.props.filter.isValid,
      'filter-incomplete': this.filterCompleteAndInvalid()
    });

    return React.createElement(
      'div',
      { className: filterClasses },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-md-4 filter-property-col' },
          this.buildPropertyNameSelect()
        ),
        React.createElement(
          'div',
          { className: 'col-md-2 filter-operator-col' },
          this.buildOperatorSelect()
        ),
        React.createElement(
          'div',
          { className: 'col-md-5 filter-value-col' },
          this.buildValueFormGroup(),
          this.getListSyntaxInfo()
        ),
        React.createElement(
          'div',
          { className: 'col-md-1 filter-close-col' },
          React.createElement(
            'a',
            { href: '#', className: 'remove-filter', onClick: this.removeFilter, 'data-index': this.props.index },
            React.createElement(
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

module.exports = Filter;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var React = __webpack_require__(1);
var ReactSelect = __webpack_require__(11);
var ProjectUtils = __webpack_require__(5);
var ExplorerActions = __webpack_require__(4);

var Timezone = React.createClass({
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
    var timezones = ProjectUtils.getConstant('TIMEZONES');
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
      this.props.handleChange('timezone', ProjectUtils.getConstant('DEFAULT_TIMEZONE'));
    }
    this.refs['timezone'].setState({ visible: false });
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: "timezone-toggle" + (this.state.active ? " active" : "") },
      React.createElement(
        'div',
        { className: 'toggle-display' },
        React.createElement(
          'button',
          { ref: 'timezone-display',
            className: 'btn btn-link field-secondary-control',
            title: "Selectd timezone: " + this.props.timezone,
            type: 'button',
            onClick: this.handleTimezoneActivated },
          React.createElement('span', { className: 'icon glyphicon glyphicon-globe' }),
          ' Timezone: ',
          this.props.timezone
        )
      ),
      React.createElement(
        'div',
        { className: 'toggle-options' },
        React.createElement(ReactSelect, { ref: 'timezone',
          name: 'timezone',
          classes: 'timezone form-control',
          value: this.props.timezone,
          items: ProjectUtils.getConstant('TIMEZONES').map(function (z) {
            return z.name;
          }),
          handleChange: this.handleTimezoneChange,
          handleBlur: this.handleTimezoneBlur })
      )
    );
  }

});

module.exports = Timezone;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

'use strict';

var React = __webpack_require__(1);
var _ = __webpack_require__(0);
var Input = __webpack_require__(13);
var Select = __webpack_require__(15);

var RELATIVE_TIMEFRAMES = ['this', 'previous'];

var ExplorerUtils = __webpack_require__(3);
var ExplorerActions = __webpack_require__(4);
var FormatUtils = __webpack_require__(2);

function hasRelativeTimeframe(time) {
  time = time || {};
  return time.relativity && time.amount && time.sub_timeframe;
}

var RelativePicker = React.createClass({
  displayName: 'RelativePicker',


  setRelativeTime: function setRelativeTime(event) {
    var name = event.target.name;
    var value = event.target.value;

    var updates = _.cloneDeep(this.props.time);
    updates[name] = value;
    this.props.handleChange('time', updates);
  },

  buildDescriptionCopy: function buildDescriptionCopy() {
    var time = this.props.time;

    if (hasRelativeTimeframe(this.props.time)) {
      var subIntervalCopy = FormatUtils.singularize(time.sub_timeframe, time.amount);
      var timeAmountPluralSuffix = time.amount > 1 ? 's' : '';
      var relativityCopy = time.relativity == 'this' ? 'including' : 'excluding';
      var singularCurrentInterval = FormatUtils.singularize(subIntervalCopy);

      return React.createElement(
        'p',
        { className: 'help-block' },
        'The last ',
        time.amount,
        ' ',
        subIntervalCopy,
        timeAmountPluralSuffix,
        ' ',
        React.createElement(
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

    return React.createElement(
      'div',
      { className: 'relative-timeframe-picker' },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-xs-4 form-collapse-right', id: 'relative-type' },
          React.createElement(
            'div',
            { className: 'btn-group' },
            React.createElement(Select, { label: false,
              name: 'relativity',
              classes: 'relativity',
              options: RELATIVE_TIMEFRAMES,
              emptyOption: false,
              handleSelection: this.setRelativeTime,
              selectedOption: this.props.time.relativity })
          )
        ),
        React.createElement(
          'div',
          { className: 'col-xs-3 form-collapse-left form-collapse-right', id: 'interval-amount' },
          React.createElement(Input, { label: false,
            name: 'amount',
            classes: 'amount',
            onChange: this.setRelativeTime,
            placeholder: 'e.g. 1',
            value: this.props.time.amount || "",
            autoComplete: 'off' })
        ),
        React.createElement(
          'div',
          { className: 'col-xs-5 form-collapse-left', id: 'sub-interval-type' },
          React.createElement(Select, { label: false,
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

module.exports = RelativePicker;


/***/ }),
/* 57 */
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
    else if (( false ? undefined : _typeof(exports)) == 'object') module.exports = factory(__webpack_require__(23), __webpack_require__(22));

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
/* 58 */
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
    else if (( false ? undefined : _typeof(exports)) == 'object') module.exports = factory(__webpack_require__(23), __webpack_require__(22));

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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;

'use strict';

var React = __webpack_require__(1);
var _ = __webpack_require__(0);
var moment = __webpack_require__(9);
var Datepicker = __webpack_require__(34);
var Timepicker = __webpack_require__(33);

var ExplorerUtils = __webpack_require__(3);
var ExplorerActions = __webpack_require__(4);

var dateFormat = 'll';
var timeFormat = 'h:mm A';

var AbsolutePicker = React.createClass({
  displayName: 'AbsolutePicker',


  setDate: function setDate(name, value) {
    var time = this.props.time;
    var endValue = new Date(time.end);

    var updates = _.cloneDeep(time);
    if (name === 'start_date' && value > endValue) {
      updates.end = '';
    }
    updates[name] = new Date(moment(new Date(value)).format(dateFormat) + " " + moment(time[name]).format(timeFormat));
    this.props.handleChange('time', updates);
  },

  handleDateBlur: function handleDateBlur(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setDate(name, value);
  },

  setTime: function setTime(name, value) {
    var time = this.props.time;
    var updates = _.cloneDeep(time);
    updates[name] = new Date(moment(time[name]).format(dateFormat) + " " + moment(new Date(value)).format(timeFormat));
    this.props.handleChange('time', updates);
  },

  // React methods

  render: function render() {
    var time = this.props.time;

    return React.createElement(
      'div',
      { className: 'absolute-timeframe-picker' },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-xs-2' },
          React.createElement(
            'label',
            null,
            'Start'
          )
        ),
        React.createElement(
          'div',
          { className: 'col-xs-5 form-collapse-right' },
          React.createElement(Datepicker, { ref: 'start-date',
            value: moment(time.start).format(dateFormat),
            name: 'start',
            placeholder: 'Date',
            onBlur: this.handleDateBlur,
            onSet: this.setDate })
        ),
        React.createElement(
          'div',
          { className: 'col-xs-5 form-collapse-left' },
          React.createElement(Timepicker, { ref: 'start-time',
            value: moment(time.start).format(timeFormat),
            name: 'start',
            placeholder: 'Time',
            handleBlur: this.setTime,
            handleSelection: this.setTime })
        )
      ),
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-xs-2' },
          React.createElement(
            'label',
            null,
            'End'
          )
        ),
        React.createElement(
          'div',
          { className: 'col-xs-5 form-collapse-right' },
          React.createElement(Datepicker, { ref: 'end-date',
            value: moment(time.end).format(dateFormat),
            minimum: moment(time.start).format(dateFormat),
            name: 'end',
            placeholder: 'Date',
            onBlur: this.handleDateBlur,
            onSet: this.setDate })
        ),
        React.createElement(
          'div',
          { className: 'col-xs-5 form-collapse-left' },
          React.createElement(Timepicker, { ref: 'end-time',
            value: moment(time.end).format(timeFormat),
            name: 'end',
            placeholder: 'Time',
            handleBlur: this.setTime,
            handleSelection: this.setTime })
        )
      )
    );
  }

});

module.exports = AbsolutePicker;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);
var SelectField = __webpack_require__(36);
var Timeframe = __webpack_require__(35);
var FieldsToggle = __webpack_require__(14);
var Notice = __webpack_require__(27);
var FilterManager = __webpack_require__(32);
var FilterUtils = __webpack_require__(8);
var classNames = __webpack_require__(6);

var FunnelStep = React.createClass({
  displayName: 'FunnelStep',


  propTypes: {
    index: React.PropTypes.number.isRequired,
    step: React.PropTypes.object.isRequired,
    eventCollections: React.PropTypes.array.isRequired,
    propertyNames: React.PropTypes.array.isRequired,
    onBrowseEvents: React.PropTypes.func.isRequired,
    getPropertyType: React.PropTypes.func.isRequired,
    moveStep: React.PropTypes.func.isRequired,
    removeStep: React.PropTypes.func.isRequired,
    handleChange: React.PropTypes.func.isRequired,
    toggleStepActive: React.PropTypes.func.isRequired,
    handleFilterChange: React.PropTypes.func.isRequired,
    handleAddFilter: React.PropTypes.func.isRequired,
    handleRemoveFilter: React.PropTypes.func.isRequired
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
      remove = React.createElement(
        'a',
        { href: '#', className: 'remove-step', onClick: this.removeStep },
        React.createElement('i', { className: 'icon glyphicon glyphicon-remove-circle margin-right-tiny' }),
        'Remove Step'
      );
    }
    if (this.props.notice) {
      notice = React.createElement(Notice, { notice: this.props.notice, closable: false });
    }

    if (this.props.step.active === true) {
      return React.createElement(
        'div',
        { className: 'step-body margin-top-small margin-bottom-small' },
        notice,
        React.createElement(SelectField, { name: 'event_collection',
          label: 'Event Collection',
          value: this.props.step.event_collection,
          options: this.props.eventCollections,
          requiredLabel: true,
          onBrowseEvents: this.props.onBrowseEvents,
          handleChange: this.handleChange }),
        React.createElement(SelectField, { name: 'actor_property',
          label: 'Actor Property',
          value: this.props.step.actor_property,
          options: this.props.propertyNames,
          requiredLabel: true,
          handleChange: this.handleChange }),
        React.createElement(Timeframe, { ref: 'timeframe',
          time: this.props.step.time,
          timezone: this.props.step.timezone,
          handleChange: this.handleChange }),
        React.createElement(
          'div',
          { className: 'field-component' },
          React.createElement(FieldsToggle, { ref: 'filters-fields-toggle',
            name: 'Filters',
            toggleCallback: this.handleFiltersToggle,
            fieldsCount: FilterUtils.validFilters(this.props.step.filters).length })
        ),
        React.createElement(FilterManager, { ref: 'filter-manager',
          eventCollection: this.props.step.event_collection,
          filters: this.props.step.filters,
          handleChange: this.handleFilterChange,
          removeFilter: this.handleRemoveFilter,
          addFilter: this.handleAddFilter,
          getPropertyType: this.props.getPropertyType,
          propertyNames: this.props.propertyNames }),
        React.createElement(
          'label',
          { className: 'block-label margin-top-small' },
          React.createElement('input', { name: 'optional', type: 'checkbox', checked: this.props.step.optional, onChange: this.handleCheckboxChange }),
          ' Optional Step'
        ),
        React.createElement(
          'label',
          { className: 'block-label' },
          React.createElement('input', { name: 'inverted', type: 'checkbox', checked: this.props.step.inverted, onChange: this.handleCheckboxChange }),
          ' Inverted Step'
        ),
        React.createElement(
          'label',
          { className: 'block-label' },
          React.createElement('input', { name: 'with_actors', type: 'checkbox', checked: this.props.step.with_actors, onChange: this.handleCheckboxChange }),
          ' With Actors'
        ),
        React.createElement('hr', null),
        remove
      );
    }
  },

  render: function render() {
    var stepWrapperClasses = classNames({
      'funnel-step': true,
      'active': this.props.step.active
    });
    return React.createElement(
      'div',
      { className: stepWrapperClasses },
      React.createElement(
        'div',
        { className: 'step-header clearfix', onClick: this.toggleStepActive, role: 'step-header' },
        React.createElement(
          'div',
          { className: 'step-move-btns' },
          React.createElement(
            'a',
            { href: '#', className: 'up', onClick: this.moveStepUp, role: 'move-step' },
            React.createElement('span', { className: 'arrow' })
          ),
          React.createElement(
            'a',
            { href: '#', className: 'down', onClick: this.moveStepDown, role: 'move-step' },
            React.createElement('span', { className: 'arrow' })
          )
        ),
        React.createElement(
          'div',
          { className: 'step-number' },
          this.props.index + 1
        ),
        React.createElement(
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

module.exports = FunnelStep;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);
var FunnelStep = __webpack_require__(60);
var ExplorerActions = __webpack_require__(4);

var FunnelsBuilder = React.createClass({
  displayName: 'FunnelsBuilder',


  propTypes: {
    modelId: React.PropTypes.string.isRequired,
    eventCollections: React.PropTypes.array.isRequired,
    steps: React.PropTypes.array.isRequired,
    stepNotices: React.PropTypes.array.isRequired,
    onBrowseEvents: React.PropTypes.func.isRequired,
    getEventPropertyNames: React.PropTypes.func.isRequired,
    getPropertyType: React.PropTypes.func.isRequired
  },

  handleChange: function handleChange(index, name, value) {
    var updates = {};
    updates[name] = value;
    ExplorerActions.updateStep(this.props.modelId, index, updates);
  },

  addStep: function addStep(e) {
    e.preventDefault();
    ExplorerActions.addStep(this.props.modelId);
  },

  removeStep: function removeStep(index) {
    ExplorerActions.removeStep(this.props.modelId, index);
  },

  handleAddFilter: function handleAddFilter(index) {
    ExplorerActions.addStepFilter(this.props.modelId, index);
  },

  handleRemoveFilter: function handleRemoveFilter(stepIndex, filterIndex) {
    ExplorerActions.removeStepFilter(this.props.modelId, stepIndex, filterIndex);
  },

  handleFilterChange: function handleFilterChange(stepIndex, filterIndex, updates) {
    ExplorerActions.updateStepFilter(this.props.modelId, stepIndex, filterIndex, updates);
  },

  toggleStepActive: function toggleStepActive(index, active) {
    if (active) {
      ExplorerActions.setStepActive(this.props.modelId, index);
    } else {
      ExplorerActions.updateStep(this.props.modelId, index, { active: false });
    }
  },

  moveStep: function moveStep(index, direction) {
    ExplorerActions.moveStep(this.props.modelId, index, direction);
  },

  buildSteps: function buildSteps() {
    return this.props.steps.map(function (step, index) {
      var notice = _.find(this.props.stepNotices, { stepIndex: index });
      return React.createElement(
        'li',
        { key: index },
        React.createElement(FunnelStep, { index: index,
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
    return React.createElement(
      'div',
      { className: 'funnel-builder margin-top-small' },
      React.createElement(
        'h4',
        null,
        'Steps'
      ),
      React.createElement(
        'ul',
        { className: 'steps' },
        this.buildSteps()
      ),
      React.createElement(
        'a',
        { href: '#', className: 'add-step', onClick: this.addStep },
        React.createElement('i', { className: 'icon glyphicon glyphicon-plus-sign margin-right-tiny' }),
        'Add a step'
      )
    );
  }

});

module.exports = FunnelsBuilder;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var Input = __webpack_require__(13);
var ExplorerUtils = __webpack_require__(3);

var LatestField = React.createClass({
  displayName: 'LatestField',


  render: function render() {
    return React.createElement(
      'div',
      { className: 'form-group' },
      React.createElement(Input, { type: 'text',
        name: 'latest',
        label: 'Limit number of events to extract',
        value: this.props.latest,
        placeholder: 'Eg: 1000',
        onChange: this.props.handleChange }),
      React.createElement(
        'small',
        { className: 'text-muted' },
        React.createElement('span', { className: 'icon glyphicon glyphicon-info-sign' }),
        React.createElement(
          'span',
          null,
          'Results are limited to 10 million events'
        )
      )
    );
  }

});

module.exports = LatestField;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(1);

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

      return React.createElement(
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

      return React.createElement(
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

      return React.createElement(
        'div',
        { className: 'react-select-box-container react-select-box-multi' },
        React.createElement(
          'button',
          { id: this.state.id, onClick: this._toggleOpenClose.bind(this), className: 'react-select-box' },
          React.createElement(
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
}(React.Component);

module.exports = ReactMultiSelect;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(1);
var ExplorerUtils = __webpack_require__(3);
var Input = __webpack_require__(13);
var ReactMultiSelect = __webpack_require__(63);
var LatestField = __webpack_require__(62);

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
          selected: _this2.props.property_names.indexOf(property) > -1
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
        emailField = React.createElement(Input, { type: 'text',
          name: 'email',
          label: 'Recipient email address',
          placeholder: 'your@email.com',
          required: 'true',
          value: this.props.email,
          onChange: this.props.handleChangeWithEvent });
        latestField = React.createElement(LatestField, { latest: this.props.latest, handleChange: this.props.handleChangeWithEvent });
      }

      if (this._getExtractionKeys()) {
        extractionPropertiesFilter = React.createElement(ReactMultiSelect, {
          name: 'property_names',
          label: 'Filter extraction properties',
          handleChange: this._handlePropertyNamesChange.bind(this),
          items: this._getExtractionKeys()
        });
      }

      return React.createElement(
        'div',
        { className: 'field-component' },
        React.createElement(
          'div',
          { className: 'extraction-options' },
          React.createElement(
            'label',
            null,
            React.createElement('input', { type: 'radio', name: 'extraction_type', value: 'immediate', onChange: this.props.setExtractionType, checked: !this.props.isEmail }),
            ' Preview latest ',
            ExplorerUtils.EXRACTION_EVENT_LIMIT,
            ' events now'
          ),
          React.createElement(
            'label',
            null,
            React.createElement('input', { type: 'radio', name: 'extraction_type', value: 'email', onChange: this.props.setExtractionType, checked: this.props.isEmail }),
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
}(React.Component);

module.exports = ExtractionOptions;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);
var FieldsToggle = __webpack_require__(14);

// Components
var ReactSelect = __webpack_require__(11);

var GroupByField = React.createClass({
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
    return React.createElement(
      'a',
      { className: 'double-groupby-toggle', href: '#', onClick: this.toggleMultiGroupBy },
      React.createElement('i', { className: "margin-right-bump icon glyphicon glyphicon-" + icon }),
      text
    );
  },

  secondField: function secondField() {
    if (this.props.value.length > 1) {
      return React.createElement(ReactSelect, { ref: 'select',
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
    return React.createElement(
      'div',
      { className: 'field-component' },
      React.createElement(
        FieldsToggle,
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
        React.createElement(ReactSelect, { ref: 'select',
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

module.exports = GroupByField;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);

// Components
var Input = __webpack_require__(13);

var PercentileField = React.createClass({
  displayName: 'PercentileField',


  // React methods

  render: function render() {
    return React.createElement(
      'div',
      { className: 'field-component' },
      React.createElement(Input, { ref: 'input',
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

module.exports = PercentileField;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var React = __webpack_require__(1);

// Components
var FieldsToggle = __webpack_require__(14);
var SelectField = __webpack_require__(36);
var PercentileField = __webpack_require__(66);
var GroupByField = __webpack_require__(65);
var ExtractionOptions = __webpack_require__(64);
var FunnelBuilder = __webpack_require__(61);
var Timeframe = __webpack_require__(35);
var Interval = __webpack_require__(51);
var Input = __webpack_require__(13);
var ApiUrl = __webpack_require__(50);
var ExplorerStore = __webpack_require__(12);
var ExplorerUtils = __webpack_require__(3);
var FilterUtils = __webpack_require__(8);
var ExplorerActions = __webpack_require__(4);

var QueryBuilder = React.createClass({
  displayName: 'QueryBuilder',


  // Event callbacks

  handleSelectionWithEvent: function handleSelectionWithEvent(event) {
    this.handleChange(event.target.name, event.target.value);
  },

  handleChange: function handleChange(update, value) {
    var updates = { query: {} };

    if (_.isPlainObject(update)) {
      for (key in update) {
        updates.query[key] = update[key];
      }
    } else {
      updates.query[update] = value;
    }

    ExplorerActions.update(this.props.model.id, updates);
  },

  // Convenience Methods

  updateGroupBy: function updateGroupBy(updates) {
    ExplorerActions.update(this.props.model.id, { query: updates });
  },

  handleRevertChanges: function handleRevertChanges(event) {
    event.preventDefault();
    ExplorerActions.revertActiveChanges();
  },

  shouldShowRevertButton: function shouldShowRevertButton() {
    return ExplorerUtils.isPersisted(this.props.model) && this.props.model.originalModel && this.props.model.originalModel.query && !_.isEqual(this.props.model.query, this.props.model.originalModel.query);
  },

  // Fields Builders

  buildEventCollectionField: function buildEventCollectionField() {
    if (this.props.model.query.analysis_type !== 'funnel') {
      return React.createElement(SelectField, { name: 'event_collection',
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
      return React.createElement(ExtractionOptions, { latest: this.props.model.query.latest,
        email: this.props.model.query.email,
        property_names: this.props.model.query.property_names,
        event_collection: this.props.model.query.event_collection,
        projectSchema: this.props.project.schema,
        isEmail: ExplorerUtils.isEmailExtraction(this.props.model),
        handleChangeWithEvent: this.handleSelectionWithEvent,
        handleChange: this.handleChange,
        setExtractionType: this.props.setExtractionType });
    }
  },

  buildGroupByField: function buildGroupByField() {
    if (['extraction', 'funnel'].indexOf(this.props.model.query.analysis_type) === -1) {
      return React.createElement(GroupByField, { ref: 'group-by-field',
        value: this.props.model.query.group_by,
        updateGroupBy: this.updateGroupBy,
        options: this.props.getEventPropertyNames(this.props.model.query.event_collection),
        handleChange: this.handleChange });
    }
  },

  buildTargetPropertyField: function buildTargetPropertyField() {
    var type = this.props.model.query.analysis_type;
    if (type !== null && ExplorerUtils.shouldHaveTarget(this.props.model)) {
      return React.createElement(SelectField, { name: 'target_property',
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
      return React.createElement(PercentileField, { ref: 'percentile-field',
        value: this.props.model.query.percentile,
        onChange: this.handleSelectionWithEvent });
    }
  },

  buildIntervalField: function buildIntervalField() {
    if (['extraction', 'funnel'].indexOf(this.props.model.query.analysis_type) === -1) {
      return React.createElement(Interval, { interval: this.props.model.query.interval,
        handleChange: this.handleChange });
    }
  },

  buildFilters: function buildFilters() {
    if (this.props.model.query.analysis_type !== 'funnel') {
      return React.createElement(
        'div',
        { className: 'field-component' },
        React.createElement(FieldsToggle, { ref: 'filters-fields-toggle',
          name: 'Filters',
          toggleCallback: this.props.handleFiltersToggle,
          fieldsCount: FilterUtils.validFilters(this.props.model.query.filters).length })
      );
    }
  },

  buildGlobalTimeframePicker: function buildGlobalTimeframePicker() {
    if (this.props.model.query.analysis_type !== 'funnel') {
      return React.createElement(
        'div',
        null,
        React.createElement(Timeframe, { ref: 'timeframe',
          time: this.props.model.query.time,
          timezone: this.props.model.query.timezone,
          handleChange: this.handleChange }),
        React.createElement('hr', { className: 'fieldset-divider' })
      );
    }
  },

  buildFunnelBuilder: function buildFunnelBuilder() {
    if (this.props.model.query.analysis_type === 'funnel') {
      return React.createElement(FunnelBuilder, { modelId: this.props.model.id,
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
      return React.createElement(
        'button',
        { type: 'reset', role: 'clear-query',
          className: 'btn btn-default btn-block',
          id: 'clear-explorer-query',
          onClick: this.props.handleClearQuery },
        'Clear'
      );
    } else {
      return React.createElement(
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
      apiQueryUrl = ExplorerUtils.getApiQueryUrl(this.props.client, this.props.model);
    }

    return React.createElement(
      'section',
      { className: 'query-pane-section query-builder' },
      React.createElement(
        'form',
        { className: 'form query-builder-form', onSubmit: this.props.handleQuerySubmit },
        React.createElement(SelectField, { name: 'analysis_type',
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
        React.createElement(
          'div',
          { className: 'button-set-clear-toggle' },
          this.buildClearButton()
        ),
        React.createElement(ApiUrl, { url: apiQueryUrl,
          isValid: this.props.model.isValid })
      )
    );
  }
});

module.exports = QueryBuilder;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var classNames = __webpack_require__(6);

var QueryPaneTabs = React.createClass({
  displayName: 'QueryPaneTabs',


  toggled: function toggled(tab) {
    this.props.toggleCallback(tab);
  },

  render: function render() {
    var btnNewQuery;
    var queryPaneClasses = classNames({
      'query-pane-tabs clearfix': true,
      'query-pane-persisted': this.props.persisted,
      'query-pane-new': !this.props.persisted
    });

    if (this.props.persisted) {
      btnNewQuery = React.createElement(
        'li',
        { role: 'presentation', className: 'tab-new-query' },
        React.createElement(
          'a',
          { ref: 'new-query', href: '#',
            title: 'Create a new query',
            onClick: this.props.createNewQuery },
          React.createElement('span', { className: 'icon glyphicon icon-plus glyphicon-plus' })
        )
      );
    }

    return React.createElement(
      'div',
      { className: queryPaneClasses },
      React.createElement(
        'ul',
        { className: 'nav nav-tabs' },
        btnNewQuery,
        React.createElement(
          'li',
          { role: 'presentation', className: this.props.activePane === 'build' ? 'tab-build-query active' : 'tab-build-query' },
          React.createElement(
            'a',
            { ref: 'build-tab', href: '#',
              id: 'build-query',
              title: this.props.persisted ? "Edit query" : "Create a new query",
              onClick: this.toggled.bind(this, 'build') },
            this.props.persisted ? "Edit query" : "Create a new query"
          )
        ),
        React.createElement(
          'li',
          { role: 'presentation', className: this.props.activePane === 'browse' ? 'tab-browse-queries active' : 'tab-browse-queries' },
          React.createElement(
            'a',
            { ref: 'browse-tab', href: '#',
              id: 'browse',
              title: 'Browse saved queries',
              onClick: this.toggled.bind(this, 'browse') },
            React.createElement('span', { className: 'icon glyphicon icon-th-list glyphicon-th-list' }),
            'Browse'
          )
        )
      )
    );
  }

});

module.exports = QueryPaneTabs;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  exportToCsv: function exportToCsv(data, filename) {
    var csvContent = 'data:text/csv;charset=utf-8,';
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

    htmlElement = document.createElement('a');
    htmlElement.setAttribute('href', encodeURI(csvContent));
    htmlElement.setAttribute('download', filename);
    document.body.appendChild(htmlElement);
    htmlElement.click();
  }
};

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__70__;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var React = __webpack_require__(1);
var classNames = __webpack_require__(6);
var Highlight = __webpack_require__(70);

var CodeSample = React.createClass({
  displayName: 'CodeSample',

  render: function render() {
    var panelClasses = classNames({
      'code-sample-panel': true,
      'hide': this.props.hidden
    });

    var text;
    if (this.props.isValid) {
      text = this.props.codeSample;
    } else {
      text = "Your query is not valid right now, so we can't show you a code sample.";
    }

    return React.createElement(
      'div',
      { className: panelClasses },
      React.createElement(
        'a',
        { href: '#', className: 'close-btn', onClick: this.props.onCloseClick },
        React.createElement('span', { className: 'icon glyphicon glyphicon glyphicon-remove-circle no-margin' })
      ),
      React.createElement(
        'div',
        { className: 'sample' },
        React.createElement(
          Highlight,
          { className: 'html' },
          text
        )
      )
    );
  }
});

module.exports = CodeSample;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var ChartTypeUtils = __webpack_require__(26);
var FormatUtils = __webpack_require__(2);

var KeenViz = React.createClass({
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
    if (ChartTypeUtils.isTableChartType(this.props.model.metadata.visualization.chart_type)) {
      exportBtn = React.createElement(
        'button',
        { className: 'btn btn-default btn-download-csv',
          role: 'export-table',
          type: 'button',
          onClick: this.props.exportToCsv },
        'Download CSV'
      );
    }

    return React.createElement(
      'div',
      { ref: 'keen-viz-wrapper' },
      React.createElement('div', { ref: 'keen-viz' }),
      exportBtn
    );
  }
});

module.exports = KeenViz;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var React = __webpack_require__(1);
var Loader = __webpack_require__(29);
var KeenViz = __webpack_require__(72);
var ExplorerUtils = __webpack_require__(3);
var prettyPrintJSON = __webpack_require__(2).prettyPrintJSON;

var Chart = React.createClass({
  displayName: 'Chart',


  // ***********************
  // Content building
  // ***********************

  buildVizContent: function buildVizContent() {
    if (!this.props.model.response) {
      return React.createElement(
        'div',
        { ref: 'notice', className: 'big-notice' },
        React.createElement(
          'div',
          { className: 'alert alert-info' },
          'Let\'s go exploring!'
        )
      );
    }

    if (ExplorerUtils.isEmailExtraction(this.props.model)) {
      return React.createElement(
        'div',
        { ref: 'notice', className: 'big-notice' },
        React.createElement(
          'div',
          { className: 'alert alert-info' },
          'Email extractions don\'t have visualizations.'
        )
      );
    }

    if (!ExplorerUtils.resultCanBeVisualized(this.props.model)) {
      return React.createElement(
        'div',
        { ref: 'notice', className: 'big-notice' },
        React.createElement(
          'div',
          { className: 'alert alert-danger' },
          React.createElement('span', { className: 'icon glyphicon glyphicon-info-sign error' }),
          'Your query returned no results.'
        )
      );
    }

    if (ExplorerUtils.resultCanBeVisualized(this.props.model)) {
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

    if (ExplorerUtils.isJSONViz(this.props.model)) {
      var content = {
        result: this.props.model.response.result
      };
      if (this.props.model.response.actors) {
        content.actors = this.props.model.response.actors;
      }
      chartContent = React.createElement('textarea', { ref: 'jsonViz',
        className: 'json-view',
        value: prettyPrintJSON(content),
        readOnly: true });
    } else {
      chartContent = React.createElement(KeenViz, { model: this.props.model, dataviz: this.props.dataviz,
        exportToCsv: this.props.exportToCsv });
    }

    return React.createElement(
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

    return React.createElement(
      'div',
      { className: 'chart-area' },
      React.createElement(Loader, { visible: this.props.model.loading }),
      vizContent
    );
  }
});

module.exports = Chart;

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__74__;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var React = __webpack_require__(1);
var classNames = __webpack_require__(6);
var KeenDataviz = __webpack_require__(74);
var Select = __webpack_require__(15);
var Notice = __webpack_require__(27);
var Chart = __webpack_require__(73);
var CodeSample = __webpack_require__(71);
var AppDispatcher = __webpack_require__(7);
var ExplorerConstants = __webpack_require__(19);
var ExplorerActions = __webpack_require__(4);
var ExplorerStore = __webpack_require__(12);
var NoticeActions = __webpack_require__(18);
var ExplorerUtils = __webpack_require__(3);
var ChartTypeUtils = __webpack_require__(26);
var FormatUtils = __webpack_require__(2);
var DataUtils = __webpack_require__(69);

var Visualization = React.createClass({
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
    NoticeActions.clearAll();
  },

  changeChartType: function changeChartType(event) {
    var chartType = _.find(this.formatChartTypes(), function (type) {
      return type.value === event.target.value;
    });
    var updates = {
      metadata: {
        visualization: { chart_type: chartType.value }
      }
    };
    ExplorerActions.update(this.props.model.id, updates);
  },

  formatChartTypes: function formatChartTypes() {
    return _.map(ChartTypeUtils.getChartTypeOptions(this.props.model.query), function (type) {
      return {
        name: type !== 'JSON' ? FormatUtils.toTitleCase(type).replace('chart', '') : type,
        value: type
      };
    });
  },

  chartType: function chartType() {
    if (this.props.model.metadata.visualization && this.props.model.metadata.visualization.chart_type) {
      return this.props.model.metadata.visualization.chart_type;
    } else {
      return _.first(ChartTypeUtils.getChartTypeOptions(this.props.model.query));
    }
  },

  componentWillMount: function componentWillMount() {
    this.dataviz = new KeenDataviz();
  },

  componentWillUnmount: function componentWillUnmount() {
    AppDispatcher.unregister(this.dispatcherToken);
  },

  exportToCsv: function exportToCsv() {
    var data = this.dataviz.dataset.matrix;
    var filename = this.props.model.query_name || 'untitled-query';
    DataUtils.exportToCsv(data, filename);
  },

  render: function render() {
    var chartTitle, codeSample;

    var chartDetailBarClasses = classNames({
      'chart-detail-bar': true,
      'chart-detail-bar-focus': (this.state.focusDisplayName || this.state.focusQueryName) && this.props.model.response !== null && !this.props.model.loading,
      'chart-detail-active': this.props.model.response !== null && !this.props.model.loading
    });

    if (this.props.model.isValid) {
      codeSample = ExplorerUtils.getSdkExample(this.props.model, this.props.client);
    }

    if (this.props.persistence) {
      chartTitle = React.createElement(
        'div',
        { className: 'chart-title-component' },
        React.createElement('input', { className: 'chart-display-name',
          type: 'text',
          onChange: this.props.onDisplayNameChange,
          onBlur: this.handleDisplayNameBlur,
          onFocus: this.handleDisplayNameFocus,
          spellCheck: 'false',
          value: this.props.model.metadata.display_name,
          placeholder: 'Give your query a name...' }),
        React.createElement(
          'div',
          { className: 'chart-query-name' },
          React.createElement(
            'label',
            null,
            'Saved Query Resource Name \xA0',
            React.createElement(
              'a',
              { href: 'https://keen.io/docs/api/#saved-queries', target: '_blank' },
              React.createElement('i', { className: 'icon glyphicon glyphicon-question-sign' })
            )
          ),
          React.createElement('input', { className: 'chart-query-name',
            type: 'text',
            onChange: this.props.onQueryNameChange,
            onBlur: this.handleQueryNameBlur,
            onFocus: this.handleQueryNameFocus,
            spellCheck: 'false',
            value: this.props.model.query_name })
        )
      );
    }

    return React.createElement(
      'div',
      { className: 'visualization' },
      React.createElement(Notice, { notice: this.props.notice, closeCallback: this.noticeClosed }),
      React.createElement(
        'div',
        { className: 'visualization-wrapper' },
        React.createElement(
          'div',
          { className: chartDetailBarClasses },
          chartTitle,
          React.createElement(
            'div',
            { className: 'chart-type-component' },
            React.createElement(Select, { label: false,
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
        React.createElement(
          'div',
          { className: 'chart-component' },
          React.createElement(Chart, { model: this.props.model,
            dataviz: this.dataviz,
            exportToCsv: this.exportToCsv })
        ),
        React.createElement(CodeSample, { ref: 'codesample',
          codeSample: codeSample,
          hidden: this.props.appState.codeSampleHidden,
          onCloseClick: this.props.toggleCodeSample,
          isValid: this.props.model.isValid })
      )
    );
  }
});

module.exports = Visualization;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var _ = __webpack_require__(0);
var classNames = __webpack_require__(6);
var Loader = __webpack_require__(29);
var FormatUtils = __webpack_require__(2);
var ProjectUtils = __webpack_require__(5);
var ProjectActions = __webpack_require__(28);
var Modal = __webpack_require__(40);

var EventBrowser = React.createClass({
  displayName: 'EventBrowser',


  onKeyUp: function onKeyUp(event) {
    var enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) this.selectEventCollection();
  },

  shouldFetchCollectionSchema: function shouldFetchCollectionSchema(collection) {
    if (!this.props.project.schema[collection]) return false;
    return _.keys(this.props.project.schema[collection].properties).length < 1;
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
      ProjectActions.fetchCollectionSchema(this.props.client, collection);
    }
  },

  modalOpened: function modalOpened() {
    if (this.state.activeView === 'recentEvents') {
      this.fetchRecentEvents();
    } else if (this.shouldFetchCollectionSchema(this.state.activeEventCollection)) {
      ProjectActions.fetchCollectionSchema(this.props.client, this.state.activeEventCollection);
    }
  },

  fetchRecentEvents: function fetchRecentEvents(collectionToUse) {
    var collection = collectionToUse ? collectionToUse : this.state.activeEventCollection;
    var schema = this.props.project.schema;
    if (!_.isEmpty(schema) && schema[collection] && !schema[collection].recentEvents && !schema[collection].loading) {
      ProjectActions.fetchRecentEventsForCollection(this.props.client, collection);
    }
  },

  setSearchText: function setSearchText(event) {
    this.setState({ searchtext: event.target.value });
  },

  // Builders

  buildEventCollectionNodes: function buildEventCollectionNodes() {
    return _.map(this.props.project.eventCollections, _.bind(function (eventCollection) {
      var re = new RegExp(this.state.searchtext, 'i');
      var classes = classNames({
        'active': this.state.activeEventCollection === eventCollection,
        'hide': re.test(eventCollection) ? false : true
      });
      return React.createElement(
        'li',
        { className: classes, key: eventCollection },
        React.createElement(
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
    return recentEvents ? FormatUtils.prettyPrintJSON(recentEvents) : "";
  },

  getSchema: function getSchema() {
    var schema = this.props.project.schema;
    var collection = this.state.activeEventCollection;
    var properties = schema[collection] ? schema[collection].properties : {};
    var ordered = {};
    if (properties) {
      _.each(Object.keys(properties).sort(), function (key, i) {
        ordered[key] = properties[key];
      });
    }
    return FormatUtils.prettyPrintJSON(ordered) || '';
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
    if (!this.state.activeEventCollection && !_.isEmpty(this.props.project.schema)) {
      this.setActiveEventCollection(this.props.currentEventCollection || this.props.project.eventCollections[0]);
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.project.schema) && !this.state.activeEventCollection) {
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

    var browseContent = React.createElement(
      'div',
      { className: 'event-browser', onKeyUp: this.handleKeyUp },
      React.createElement(
        'div',
        { className: 'event-names' },
        React.createElement(
          'div',
          { className: 'search-box' },
          React.createElement('input', { type: 'text', name: 'search', ref: 'search-box', placeholder: 'Search...', onChange: this.setSearchText, autoComplete: 'off' }),
          React.createElement('span', { className: 'glyphicon glyphicon-search icon' })
        ),
        React.createElement(
          'ul',
          { className: 'nav nav-pills nav-stacked event-names-list', ref: 'event-names-list' },
          this.buildEventCollectionNodes()
        )
      ),
      React.createElement(
        'div',
        { className: 'event-browser-content' },
        React.createElement(
          'ul',
          { className: 'nav nav-tabs view-options' },
          React.createElement(
            'li',
            { className: this.getNavClasses('schema') },
            React.createElement(
              'a',
              { href: '#', name: 'schema', onClick: this.changeActiveView },
              'Schema'
            )
          ),
          React.createElement(
            'li',
            { className: this.getNavClasses('recentEvents') },
            React.createElement(
              'a',
              { href: '#', name: 'recentEvents', onClick: this.changeActiveView },
              'Recent Events'
            )
          )
        ),
        React.createElement(
          'div',
          { ref: 'event-data-wrapper', className: 'event-data-wrapper' },
          React.createElement(Loader, { ref: 'loader', visible: this.shouldShowLoader() }),
          React.createElement('textarea', { className: 'json-view', value: previewData, readOnly: true })
        )
      )
    );

    var alertContent = React.createElement(
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

    return React.createElement(
      Modal,
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

module.exports = EventBrowser;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _React$createClass;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = __webpack_require__(1);
var _ = __webpack_require__(0);
var EventBrowser = __webpack_require__(76);
var Visualization = __webpack_require__(75);
var QueryPaneTabs = __webpack_require__(68);
var QueryBuilder = __webpack_require__(67);
var BrowseQueries = __webpack_require__(49);
var CacheToggle = __webpack_require__(48);
var QueryActions = __webpack_require__(47);
var Notice = __webpack_require__(27);
var FilterManager = __webpack_require__(32);
var ExplorerStore = __webpack_require__(12);
var ExplorerActions = __webpack_require__(4);
var NoticeActions = __webpack_require__(18);
var AppStateActions = __webpack_require__(24);
var NoticeStore = __webpack_require__(46);
var AppStateStore = __webpack_require__(42);
var ExplorerUtils = __webpack_require__(3);
var FilterUtils = __webpack_require__(8);
var ProjectUtils = __webpack_require__(5);
var ExplorerActions = __webpack_require__(4);
var QueryStringUtils = __webpack_require__(31);

function getStoresState() {
  return {
    allPersistedExplorers: ExplorerStore.getAllPersisted(),
    activeExplorer: ExplorerStore.getActive(),
    notice: NoticeStore.getGlobalNotice(),
    stepNotices: NoticeStore.getStepNotices(),
    appState: AppStateStore.getState()
  };
}

var Explorer = React.createClass((_React$createClass = {
  displayName: 'Explorer',


  toggleFields: function toggleFields() {
    _.each(this.getFieldsToggleComponents(), function (toggleObj) {
      if (toggleObj.component) {
        var hasValue = !_.isUndefined(toggleObj.value) && !_.isNull(toggleObj.value) ? true : false;
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
    ExplorerActions.update(this.state.activeExplorer.id, updates);
    this.refs['event-browser'].refs.modal.close();
  },

  savedQueryClicked: function savedQueryClicked(event) {
    event.preventDefault();
    if (this.state.activeExplorer.loading) {
      NoticeActions.create({
        icon: 'info-sign',
        type: 'warning',
        text: "There is already a query in progress. Wait for it to finish loading before selecting a query."
      });
    } else {
      ExplorerActions.revertActiveChanges();
      var modelId = event.currentTarget.dataset.id;
      ExplorerActions.setActive(modelId);
      ExplorerActions.exec(this.props.client, modelId);
    }
  },

  removeSavedQueryClicked: function removeSavedQueryClicked() {
    if (confirm('Are you sure you want to delete this saved query?')) {
      ExplorerActions.destroy(this.props.persistence, this.state.activeExplorer.id);
    }
  },

  saveQueryClick: function saveQueryClick(event) {
    event.preventDefault();
    ExplorerActions.save(this.props.persistence, this.state.activeExplorer.id);
  },

  cloneQueryClick: function cloneQueryClick(event) {
    event.preventDefault();
    ExplorerActions.clone(this.state.activeExplorer.id);
    var newExplorer = ExplorerStore.getLast();
    ExplorerActions.setActive(newExplorer.id);
    this.setState({ activeQueryPane: 'build' });
  },

  createNewQuery: function createNewQuery(event) {
    event.preventDefault();
    ExplorerActions.create();
    var newExplorer = ExplorerStore.getLast();
    ExplorerActions.setActive(newExplorer.id);
    this.setState({ activeQueryPane: 'build' });
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
      query_name: ExplorerUtils.slugify(event.target.value),
      metadata: {
        display_name: event.target.value
      }
    };
    ExplorerActions.update(this.state.activeExplorer.id, updates);
  },

  onQueryNameChange: function onQueryNameChange(event) {
    var name = event.target.value.replace(/[^\w-]/g, '');
    ExplorerActions.update(this.state.activeExplorer.id, { query_name: name });
  },

  handleRevertChanges: function handleRevertChanges(event) {
    event.preventDefault();
    ExplorerActions.revertActiveChanges();
  },

  handleQuerySubmit: function handleQuerySubmit(event) {
    event.preventDefault();
    if (ExplorerUtils.isEmailExtraction(this.state.activeExplorer)) {
      ExplorerActions.runEmailExtraction(this.props.client, this.state.activeExplorer.id);
    } else {
      ExplorerActions.exec(this.props.client, this.state.activeExplorer.id);
    }
  },

  setExtractionType: function setExtractionType(event) {
    var updates = {
      query: {
        email: event.target.value === 'email' ? "" : null
      }
    };
    ExplorerActions.update(this.state.activeExplorer.id, updates);
  },

  handleClearQuery: function handleClearQuery() {
    // NOTE: (Eric Anderson, Aug 19, 2015): Awful terrible hack to
    // ensure that the components properly display the values of the cleared
    // model.
    var self = this;
    setTimeout(function () {
      ExplorerActions.clear(self.state.activeExplorer.id);
    }, 0);
  },

  handleAddFilter: function handleAddFilter() {
    ExplorerActions.addFilter(this.state.activeExplorer.id);
  },

  handleRemoveFilter: function handleRemoveFilter(index) {
    ExplorerActions.removeFilter(this.state.activeExplorer.id, index);
  },

  handleFilterChange: function handleFilterChange(index, updates) {
    ExplorerActions.updateFilter(this.state.activeExplorer.id, index, updates);
  },

  // ********************************
  // Convenience functions
  // ********************************

  setVizWrapTop: function setVizWrapTop(top) {
    this.refs['viz-area'].style.top = top + 'px';
  },

  getSelectedIndex: function getSelectedIndex() {
    if (!this.state.activeExplorer || !ExplorerUtils.isPersisted(this.state.activeExplorer)) {
      return null;
    }
    return _.findIndex(this.state.allPersistedExplorers, { id: this.state.activeExplorer.id });
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
  AppStateActions.update({
    codeSampleHidden: !this.state.appState.codeSampleHidden
  });
}), _defineProperty(_React$createClass, 'getEventPropertyNames', function getEventPropertyNames(collection) {
  return ProjectUtils.getEventCollectionPropertyNames(this.props.project, collection);
}), _defineProperty(_React$createClass, 'getPropertyType', function getPropertyType(eventCollection, property_name) {
  return ProjectUtils.getPropertyType(this.props.project, eventCollection, property_name);
}), _defineProperty(_React$createClass, 'componentDidMount', function componentDidMount() {
  ExplorerStore.addChangeListener(this._onChange);
  NoticeStore.addChangeListener(this._onChange);
  AppStateStore.addChangeListener(this._onChange);
}), _defineProperty(_React$createClass, 'componentWillUnmount', function componentWillUnmount() {
  ExplorerStore.removeChangeListener(this._onChange);
  NoticeStore.removeChangeListener(this._onChange);
  AppStateStore.removeChangeListener(this._onChange);
  // Create a default filter if there are no filters already on this model
  if (!this.state.activeExplorer.query.filters.length) {
    ExplorerActions.addFilter(this.state.activeExplorer.id);
  }
}), _defineProperty(_React$createClass, 'getInitialState', function getInitialState() {
  return _.assign(getStoresState(), {
    activeQueryPane: 'build'
  });
}), _defineProperty(_React$createClass, 'render', function render() {
  var cacheToggle, queryPane, queryPaneTabs, browseListNotice, browseEmptyContent;

  if (this.props.persistence) {
    queryPaneTabs = React.createElement(QueryPaneTabs, { ref: 'query-pane-tabs',
      activePane: this.state.activeQueryPane,
      toggleCallback: this.toggleQueryPane,
      createNewQuery: this.createNewQuery,
      persisted: ExplorerUtils.isPersisted(this.state.activeExplorer) });
    if (['extraction'].indexOf(this.state.activeExplorer.query.analysis_type) === -1) {
      cacheToggle = React.createElement(CacheToggle, { model: this.state.activeExplorer });
    }
    if (this.state.appState.fetchingPersistedExplorers) {
      browseListNotice = React.createElement(Notice, { notice: { icon: 'info-sign', text: 'Loading saved queries...', type: 'info' }, closable: false });
    } else {
      browseEmptyContent = React.createElement(
        'h4',
        { className: 'text-center' },
        'You don\'t have any saved queries yet.'
      );
    }
  }

  if (!this.props.persistence || this.state.activeQueryPane === 'build') {
    queryPane = React.createElement(QueryBuilder, { ref: 'query-builder',
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
      analysisTypes: ProjectUtils.getConstant('ANALYSIS_TYPES'),
      stepNotices: this.state.stepNotices });
  } else {
    queryPane = React.createElement(BrowseQueries, { ref: 'query-browser',
      listItems: this.state.allPersistedExplorers,
      emptyContent: browseEmptyContent,
      notice: browseListNotice,
      clickCallback: this.savedQueryClicked,
      selectedIndex: this.getSelectedIndex() });
  }

  return React.createElement(
    'div',
    { ref: 'root' },
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-sm-5 col-md-4 explorer-query-builder' },
        queryPaneTabs,
        queryPane
      ),
      React.createElement(
        'div',
        { ref: 'viz-area', className: 'col-sm-7 col-md-8 explorer-visualization' },
        React.createElement(Visualization, { notice: this.state.notice,
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
        React.createElement(QueryActions, { model: this.state.activeExplorer,
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
    React.createElement(EventBrowser, { ref: 'event-browser',
      client: this.props.client,
      project: this.props.project,
      currentEventCollection: this.state.activeExplorer.query.event_collection,
      selectEventCollection: this.selectEventCollection }),
    React.createElement(FilterManager, { ref: 'filter-manager',
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
  if (ExplorerUtils.isPersisted(newState.activeExplorer)) {
    window.history.pushState({ model: newState.activeExplorer }, "", '?saved_query=' + newState.activeExplorer.id);
  } else {
    QueryStringUtils.updateSearchString(ExplorerUtils.paramsForURL(newState.activeExplorer));
  }
}), _React$createClass));

module.exports = Explorer;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(1);
var Loader = __webpack_require__(29);
var ProjectStore = __webpack_require__(16);
var AppStateStore = __webpack_require__(42);
var Explorer = __webpack_require__(77);

function getProjectState() {
  return {
    project: ProjectStore.getProject(),
    app: AppStateStore.getState()
  };
}

var App = React.createClass({
  displayName: 'App',


  componentDidMount: function componentDidMount() {
    ProjectStore.addChangeListener(this._onChange);
    AppStateStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    ProjectStore.removeChangeListener(this._onChange);
    AppStateStore.addChangeListener(this._onChange);
  },

  getInitialState: function getInitialState() {
    return getProjectState();
  },

  render: function render() {
    return React.createElement(
      'div',
      { id: 'keen-explorer' },
      React.createElement(Loader, { visible: this.state.project.loading || !this.state.app.ready, additionalClasses: 'app-loader' }),
      React.createElement(Explorer, { project: this.state.project,
        client: this.props.client,
        persistence: this.props.persistence })
    );
  },

  _onChange: function _onChange() {
    this.setState(getProjectState());
  }

});

module.exports = App;

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__79__;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isDST: function isDST() {
    var date = new Date();
    var jan = new Date(date.getFullYear(), 0, 1);
    var jul = new Date(date.getFullYear(), 6, 1);
    var stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    return date.getTimezoneOffset() < stdOffset;
  }
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var FormatUtils = __webpack_require__(2);
var FilterUtils = __webpack_require__(8);
var TimeframeUtils = __webpack_require__(17);

var STEP_PARAMS = ['event_collection', 'actor_property', 'timeframe', 'interval', 'timezone', 'filters', 'optional', 'inverted', 'with_actors'];
module.exports = {

  stepJSON: function stepJSON(step) {
    var params = _.cloneDeep(step);

    _.assign(params, TimeframeUtils.getTimeParameters(step.time, step.timezone));

    if (params.filters) {
      params.filters = _.map(params.filters, function (filter) {
        return FilterUtils.queryJSON(filter, TimeframeUtils.getTimezoneOffset(params.timezone));
      });

      _.remove(params.filters, _.isEmpty);
    }

    // Remove empty, null, or unnecessary properties
    _.each(params, function (value, key) {
      if (!FormatUtils.isValidQueryValue(value) || !_.includes(STEP_PARAMS, key)) {
        delete params[key];
      }
    });

    return params;
  },

  formatQueryParams: function formatQueryParams(step) {
    if (step.timeframe) {
      var unpackedTime = TimeframeUtils.unpackTimeframeParam(step.timeframe, step.timezone);
      step.time = unpackedTime.time;
      step.timezone = unpackedTime.timezone;
    }

    if (step.filters) {
      step.filters = _.compact(_.map(step.filters, FilterUtils.formatFilterParams));
    }

    step.inverted = step.inverted === true || step.inverted === "true";
    step.optional = step.optional === true || step.optional === "true";
    step.with_actors = step.with_actors === true || step.with_actors === "true";

    return step;
  }

};

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__82__;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ = __webpack_require__(0);
var ExplorerUtils = __webpack_require__(3);

function KeenSavedQueries(config) {
  this.config = config;
}

KeenSavedQueries.prototype.create = function (model, callback) {
  var body = _.omit(model, ['id']);
  this.config.client.put(this.config.client.url('queries', 'saved', model.query_name)).auth(this.config.client.masterKey()).send(body).then(function (res) {
    callback(null, res);
  }).catch(callback);
};

KeenSavedQueries.prototype.update = function (model, callback) {
  var body = _.omit(model, ['id']);
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

module.exports = KeenSavedQueries;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {

  KeenSavedQueries: __webpack_require__(83)

};

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__85__;

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__86__;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ = __webpack_require__(0);
var KeenAnalysis = __webpack_require__(86);
var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(85);

var Persistence = __webpack_require__(84);
var AppDispatcher = __webpack_require__(7);
var AppComponent = __webpack_require__(78);
var ProjectActions = __webpack_require__(28);
var ExplorerActions = __webpack_require__(4);
var AppStateActions = __webpack_require__(24);
var NoticeActions = __webpack_require__(18);
var ExplorerUtils = __webpack_require__(3);
var FormatUtils = __webpack_require__(2);
var RunValidations = __webpack_require__(10).run;
var ExplorerValidations = __webpack_require__(25);
var ExplorerStore = __webpack_require__(12);
var ProjectStore = __webpack_require__(16);
var QueryStringUtils = __webpack_require__(31);

var KeenExplorer = exports.KeenExplorer = function KeenExplorer(el) {
  var tempId = FormatUtils.generateTempId();
  this.appDispatcher = AppDispatcher;
  this.config = {
    params: QueryStringUtils.getQueryAttributes(),
    persistence: null
  };
  this.el(el);
  ExplorerActions.create(_.assign(ExplorerUtils.formatQueryParams(this.config.params) || {}, { 'id': tempId }));
  ExplorerActions.setActive(tempId);
  ExplorerActions.validate(tempId);
};

KeenExplorer.prototype.client = function (obj) {
  if (!arguments.length) return this.config.client;
  this.config.client = new KeenAnalysis(obj);
  this.config.client.resources({
    'events': '{protocol}://{host}/3.0/projects/{projectId}/events'
  });
  ProjectActions.create({ client: this.config.client });
  ProjectActions.fetchProjectCollections(this.config.client);
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
    ExplorerActions.fetchAllPersisted(this.config.persistence, function (err) {
      if (err) console.error('There was an error fetching the persisted explorers: ', err.stack);
    });
    // Is this a saved query we want to load?
    if (this.config.params.saved_query) {
      // Once the models come back from the server, mark the right one as active.
      ExplorerActions.fetchPersisted(this.config.persistence, { id: this.config.params.saved_query }, this.doneFetchingSavedQuery.bind(this, this.config.params.saved_query));
    } else {
      AppStateActions.update({ ready: true });
      // Run the query for this explorer if it's valid
      var isEmailExtraction = ExplorerUtils.isEmailExtraction(ExplorerStore.getActive());
      RunValidations(ExplorerValidations, ExplorerStore.getActive());
      if (!isEmailExtraction && ExplorerStore.getActive().isValid) {
        ExplorerActions.exec(this.config.client, ExplorerStore.getActive().id);
      }
    }
  }
  this.render();
  return this;
};

KeenExplorer.prototype.persistence = function (bool) {
  if (!arguments.length) return this.config.persistence;
  if (typeof bool === 'boolean' && bool) {
    if (!this.config.client || !this.config.client.masterKey()) {
      console.error('This feature requires a client instance with a masterKey value');
    }
    this.config.persistence = new Persistence.KeenSavedQueries({
      baseUrl: this.config.client.url('queries', 'saved'),
      client: this.config.client
    });
    this.config.persistence.config.masterKey = this.config.client.masterKey();
  }
  return this;
};

KeenExplorer.prototype.doneFetchingSavedQuery = function (savedQueryName, err) {
  if (!err) {
    ExplorerActions.setActive(savedQueryName);
    ExplorerActions.exec(this.config.client, savedQueryName);
    AppStateActions.update({ ready: true });
  } else {
    if (err.status === 404) {
      // We couldn't find that saved query.
      NoticeActions.create({
        text: 'The saved query ' + savedQueryName + ' could not be found.',
        type: 'error',
        icon: 'remove-sign'
      });
      var id = FormatUtils.generateTempId();
      ExplorerActions.create({ id: id });
      ExplorerActions.setActive(id);
      AppStateActions.update({ ready: true });
    } else {
      console.error("There was a problem fetching a saved query: ", err.stack);
    }
  }
};

KeenExplorer.prototype.render = function () {
  var Component = React.createFactory(AppComponent);
  ReactDOM.render(Component({
    persistence: this.config.persistence,
    client: this.config.client
  }), this.config.el);
};

KeenExplorer.Persistence = Persistence;
exports.default = KeenExplorer;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(87);


/***/ })
/******/ ]);
});
//# sourceMappingURL=keen-explorer.umd.js.map