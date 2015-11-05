var _ = require('lodash');
var Qs = require('qs');
var stringify = require('json-stable-stringify');
var moment = require('moment');
var ValidationUtils = require('./ValidationUtils');
var FormatUtils = require('./FormatUtils');
var ProjectUtils = require('./ProjectUtils');
var FilterUtils = require('./FilterUtils');

var QUERY_PARAMS = [
  'event_collection',
  'analysis_type',
  'target_property',
  'percentile',
  'group_by',
  'timeframe',
  'interval',
  'timezone',
  'filters',
  'email',
  'latest',
  'property_names'
];

function toCamelcaseName(name) {
  return name.replace(/_(.)/, function(match, p1) {
    return p1.toUpperCase();
  })
}

function toUnderscoreName(name) {
  return name.replace(/([A-Z])/, function(match, p1) {
    return '_' + p1.toLowerCase();
  })
}

SKIP = {}
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

  EXRACTION_EVENT_LIMIT: 100,

  isPersisted: function (explorer) {
    return explorer.id && !explorer.id.toString().match('TEMP');
  },

  isEmailExtraction: function(explorer) {
    return (explorer.query.analysis_type === 'extraction' && !_.isNull(explorer.query.email));
  },

  isImmediateExtraction: function(explorer) {
    return (explorer.query.analysis_type === 'extraction' && _.isNull(explorer.query.email));
  },

  mergeResponseWithExplorer: function(explorer, response) {
    var newModel = _.defaultsDeep(
      module.exports.formatQueryParams(response),
      _.cloneDeep(explorer)
    );
    delete newModel.originalModel; // Remove the original model.
    newModel.id = response.query_name; // Set the ID to the query_name (it's now persisted.)
    newModel.originalModel = _.cloneDeep(newModel);
    return newModel;
  },

  queryJSON: function(explorer) {
    if (!explorer || !explorer.query) {
      return;
    }
    var params = _.cloneDeep(explorer.query);

    // Set the timeframe (will get removed if it's null o undefined)
    params.timeframe = module.exports.getTimeframe(explorer);
    if (module.exports.timeframeType(explorer.query.time) === 'absolute') {
      delete params.timezone;
    }

    // Remove any empty properties or ones that shouldn't be
    // part of the query request.
    _.each(params, function(value, key) {
      if (!FormatUtils.isValidQueryValue(value)) {
        delete params[key];
      }
      if (!_.contains(QUERY_PARAMS, key)) {
        delete params[key];
      }
    });

    // Add filters
    if (params.filters) {
      params.filters = _.map(params.filters, function(filter){
        return FilterUtils.queryJSON(filter);
      });
      params.filters = _.filter(params.filters, function(filter){
        return !_.isEmpty(filter);
      });
      if (!params.filters.length) {
        delete params.filters;
      }
    }

    return params;
  },

  toJSON: function(explorer) {
    var json = _.pick(explorer, [
      'id',
      'query_name',
      'refresh_rate',
      'metadata'
    ]);
    json.query = module.exports.queryJSON(explorer);
    if (json.query.analysis_type === 'extraction') json.refresh_rate = 0;
    return json;
  },

  paramsForURL: function(explorer) {
    var attrs = module.exports.toJSON(explorer);
    return _.omit(attrs, [
      'id',
      'query_name',
      'refresh_rate',
      'metadata'
    ]);
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
  runQuery: function(config) {
    config.client.run(
      new Keen.Query(config.query.analysis_type, _.omit(config.query, 'analysis_type')),
      function(err, response) {
        if (err) {
          config.error(err);
        }
        else {
          config.success(response);
        }
        if (config.complete) config.complete(err, response);
      }
    );
  },

  timeframeBuilders: {

    absolute_timeframe: function(explorer) {
      if (explorer.query && explorer.query.time && explorer.query.time.start && explorer.query.time.end) {
        var zone = _.find(ProjectUtils.getConstant('TIMEZONES'), { value: explorer.query.timezone });
        var offset = zone.offset || '+00:00';

        return {
          start: FormatUtils.formatUTCTimezoneIntoISO(explorer.query.time.start) + offset,
          end: FormatUtils.formatUTCTimezoneIntoISO(explorer.query.time.end) + offset
        };
      }
    },

    relative_timeframe: function(explorer) {
      var query = explorer.query;
      if (query && query.time && query.time.relativity && query.time.amount && query.time.sub_timeframe) {
        return [query.time.relativity, query.time.amount, query.time.sub_timeframe].join('_');
      }
    }

  },

  getTimeframe: function(explorer) {
    var timeframeType = module.exports.timeframeType(explorer.query.time);
    var timeframeBuilder = module.exports.timeframeBuilders[timeframeType + '_timeframe'];

    if(typeof(timeframeBuilder) === 'undefined') {
      return "";
    } else {
      return timeframeBuilder(explorer);
    }
  },

  convertDateToUTC: function(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
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
  unpackTimeframeParam: function(query) {
    var timeframe = query.timeframe;
    var timeFormat = 'h:mm A';
    var dateFormat = 'MMM D, YYYY';

    if (typeof timeframe === 'object') {
      var offset = timeframe.start.substring(timeframe.start.length, timeframe.start.length-6);

      timeframe.start = timeframe.start.substring(0, timeframe.start.length-6);
      timeframe.end = timeframe.end.substring(0, timeframe.end.length-6);

      var timezone;
      var zone = _.find(ProjectUtils.getConstant('TIMEZONES'), { offset: offset });
      if (zone) {
        timezone = zone.value;
      } else if (!zone && query.timezone) {
        timezone = query.timezone;
      } else if (!zone && !query.timezone) {
        throw new Error("A timezone was not part of the datestring for the timeframe with a start of: " + timeframe.start + ". There also was no timezone parameter found in the query. You must provide one or the other.");
      }
      return {
        time: {
          start: module.exports.convertDateToUTC(new Date(timeframe.start)),
          end: module.exports.convertDateToUTC(new Date(timeframe.end))
        },
        timezone: timezone
      };
    } else if (typeof timeframe === 'string') {
      var split = timeframe.split('_');
      return {
        time: {
          relativity: split[0],
          amount: split[1],
          sub_timeframe: split[2]
        },
        timezone: query.timezone
      };
    }
  },



  /**
   * Takes a time object and returns a string representing the timeframe type (absolute or relative)
   * @param  {Object} time The time object
   * @return {String} The type of timeframe, 'absolute' or 'relative'
   */
   timeframeType: function(time) {
      var badTimeTypeError = new Error('Invalid time value');

      if(_.isUndefined(time)) {
        return "";
      } else if(!_.isPlainObject(time)) {
        throw badTimeTypeError;
      } else if(_.has(time, 'start') && _.has(time, 'end')) {
        return 'absolute';
      } else if(_.has(time, 'relativity') && _.has(time, 'amount') && _.has(time, 'sub_timeframe')) {
        return 'relative'
      } else {
        throw badTimeTypeError;
      }
   },

  /**
   * Takes in an object of query params directly taken from the URL and formats/decomnstructs them appropriately to work well
   * with our data model.
   * @param  {Object} the raw params from the URL
   * @return {Object} formatted attributes to be used for creating a new Explorer model.
   */
  formatQueryParams: function(params) {
    if (!params || !params.query) return;

    if (params.query && params.query.timeframe) {
      var unpackedTime = module.exports.unpackTimeframeParam(params.query);
      params.query.time = unpackedTime.time;
      params.query.timezone = unpackedTime.timezone;
    }
    if (params.query.filters) {
      params.query.filters = _.map(params.query.filters, function(filter) {
        filter.coercion_type = FilterUtils.getCoercionType(filter);
        
        if (filter.coercion_type === 'List') {
          filter = _.assign({}, filter, FilterUtils.initList(filter));
        }
        filter.property_value = FilterUtils.getCoercedValue(filter);
        return filter;
      });
      params.query.filters = _.compact(params.query.filters);
    }
    if (!params.id && params.query_name) {
      params.id = params.query_name;
    }
    return params;
  },

  getChartTypeOptions: function(result, analysisType) {
    var chartTypes = [];

    if (result) {
      var dataviz = new Keen.Dataviz();
      dataviz.data({ result: result });
      var dataType = dataviz.dataType();

      if (dataType && Keen.Dataviz.dataTypeMap[dataType]) {
        var library = Keen.Dataviz.dataTypeMap[dataType].library;
        var libraryDefaults = Keen.Dataviz.libraries[library]._defaults;
        chartTypes = _.clone(libraryDefaults[dataType]);

        if (!_.contains(chartTypes, 'json')) {
          chartTypes.push('JSON');
        }
      } else if (result && _.contains(['extraction', 'select_unique'], analysisType)) {
        chartTypes = ['JSON', 'table'];
      }
    }

    return chartTypes;
  },

  resultSupportsChartType: function(result, chartType, analysisType) {
    return _.contains(module.exports.getChartTypeOptions(result, analysisType), chartType);
  },

  encodeAttribute: function(attr) {
    return encodeURIComponent(JSON.stringify(attr));
  },

  getApiQueryUrl: function(client, explorer) {
    var endpoint = client.config.protocol + "://" + client.config.host;
    var projectId = client.config.projectId;
    var masterKey = client.config.masterKey;

    var attrs = module.exports.queryJSON(explorer);

    var analysisType = attrs.analysis_type;
    delete attrs['analysis_type'];

    var timeframe = _.cloneDeep(attrs['timeframe']);

    var filters = _.map(attrs['filters'], function(filter) {
      return _.omit(_.cloneDeep(filter), 'coercion_type');
    });
    delete attrs['filters'];

    var queryAttrs = Qs.stringify(attrs);

    if (attrs.timeframe && module.exports.timeframeType(explorer.query.time) === 'absolute') {
      delete attrs['timeframe'];
      // This is an absolute timeframe, so we need to encode the object in a specific way before sending it, as per keen docs => https://keen.io/docs/data-analysis/timeframe/#absolute-timeframes
      timeframe = module.exports.encodeAttribute(timeframe);
      queryAttrs += '&timeframe='+ timeframe;
    }

    // We need to encode the filters the same way as we encode the absolute timeframe.
    if (filters) {
      filters = module.exports.encodeAttribute(filters);
      queryAttrs += '&filters='+ filters;
    }

    var url = endpoint + '/projects/'+projectId+'/queries/'
                       + analysisType
                       + '?api_key='
                       + client.readKey()
                       + '&'
                       + queryAttrs;
    return url;
  },

  resultCanBeVisualized: function(explorer) {
    if (explorer.result) {
      var result = explorer.result;

      if (_.isNumber(result) || (_.isArray(result) && result.length)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

  isJSONViz: function(explorer) {
    return explorer.metadata.visualization.chart_type && explorer.metadata.visualization.chart_type.toLowerCase() === 'json';
  },

  isTableViz: function(explorer) {
    return explorer.metadata.visualization.chart_type && explorer.metadata.visualization.chart_type.toLowerCase() === 'table';
  },

  getSdkExample: function(explorer, client) {

    var defaultKeenJsOpts = {
          requestType: 'jsonp',
          host: 'api.keen.io/3.0',
          protocol: 'https',
        },
        params = module.exports.queryJSON(explorer),
        s = stringify,
        dynamicCriteria,
        dynamicParamNames = [
          'filters', 'group_by', 'interval', 'target_property', 'timeframe', 'timezone'
        ],
        dynamicConstructorNames = [
          'host', 'protocol', 'requestType'
        ],
        dynamicContructorValues;

    dynamicContructorValues = mapSkip(dynamicConstructorNames, function(name) {
      if (client.config[name] == defaultKeenJsOpts[name]) {
        return SKIP
      }
      return '  ' + name + ': ' + s(client.config[name])
    }).join(',\n');
    // remove coercion from example; it's already been handled elsewhere.
    _.each(params['filters'], function(filter) { delete filter['coercion_type'] })

    dynamicCriteria = mapSkip(dynamicParamNames, function(param) {
      if (!params[param]) {
        return SKIP
      }
      return '    ' + toCamelcaseName(param) + ': ' + s(params[param])
    }).join(',\n');

    value = [
      'var client = new Keen({',
      '  projectId: ' + s(client.config.projectId) + ',',
      '  readKey: ' + s(client.config.readKey) + echoIf(dynamicContructorValues, ','),
      dynamicContructorValues,
      '});',
      '',
      'Keen.ready(function(){',
      '  ',
      '  var query = new Keen.Query(' + s(params.analysis_type) + ', {',
      '    eventCollection: ' + s(params.event_collection) + echoIf(dynamicCriteria, ','),
      dynamicCriteria,
      '  });',
      '  ',
      '  client.draw(query, document.getElementById("my_chart"), {',
      '    // Custom configuration here',
      '  });',
      '  ',
      '});'
    ]

    return value.join('\n');
  },

  slugify: function(name) {
    return name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/ /g, '-');
  }
  
};
