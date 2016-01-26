var _ = require('lodash');
var Qs = require('qs');
var stringify = require('json-stable-stringify');
var moment = require('moment');
var FormatUtils = require('./FormatUtils');
var FunnelUtils = require('./FunnelUtils');
var ProjectUtils = require('./ProjectUtils');
var FilterUtils = require('./FilterUtils');
var TimeframeUtils = require('./TimeframeUtils');

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
  'steps',
  'email',
  'latest',
  'property_names'
];

var EXRACTION_EVENT_LIMIT = 100;

var ANALYSIS_TYPES_WITHOUT_TARGET = [
  'extraction',
  'count',
  'funnel'
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

  EXRACTION_EVENT_LIMIT: EXRACTION_EVENT_LIMIT,

  isPersisted: function(explorer) {
    return explorer.id && !explorer.id.toString().match('TEMP');
  },

  saveType: function(explorer) {
    return module.exports.isPersisted(explorer) ? 'update' : 'save';
  },

  shouldHaveTarget: function(explorer) {
    return !FormatUtils.isNullOrUndefined(explorer.query.analysis_type) && ANALYSIS_TYPES_WITHOUT_TARGET.indexOf(explorer.query.analysis_type) === -1;
  },

  isEmailExtraction: function(explorer) {
    return (explorer.query.analysis_type === 'extraction' && !_.isNull(explorer.query.email));
  },

  isImmediateExtraction: function(explorer) {
    return (explorer.query.analysis_type === 'extraction' && _.isNull(explorer.query.email));
  },

  mergeResponseWithExplorer: function(explorer, response) {
    var newModel = _.defaultsDeep(module.exports.formatQueryParams(response), explorer);
    delete newModel.originalModel; // Remove the original model.
    newModel.id = response.query_name; // Set the ID to the query_name (it's now persisted.)
    newModel.originalModel = _.cloneDeep(newModel);
    return newModel;
  },

  queryJSON: function(explorer) {
    if (!explorer || !explorer.query) return;
    var params = _.cloneDeep(explorer.query);

    if (params.analysis_type === 'extraction' && FormatUtils.isNullOrUndefined(params.email)) {
      params.latest = EXRACTION_EVENT_LIMIT;
    }

    if (params.analysis_type !== 'funnel') {
      _.assign(params, TimeframeUtils.getTimeParameters(params.time, params.timezone));
    }

    // Add filters
    if (params.filters) {
      params.filters = _.map(params.filters, function(filter){
        return FilterUtils.queryJSON(filter, TimeframeUtils.getTimezoneOffset(params.timezone));
      });
    }

    if (params.steps) {
      params.steps = _.map(params.steps, FunnelUtils.stepJSON); 
    }

    _.each(params, function(value, key) {
      // If it's an array, clean out any empty elements
      if (_.isArray(value)) {
        _.remove(value, function(element) {
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

  /**
   * Takes in an object of query params directly taken from the URL and formats/deconstructs them appropriately to work well
   * with our data model.
   * @param  {Object} the raw params from the URL
   * @return {Object} formatted attributes to be used for creating a new Explorer model.
   */
  formatQueryParams: function(params) {
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
      params.query.steps[params.query.steps.length - 1].active = true
    }
    if (!params.id && params.query_name) params.id = params.query_name;
    return params;
  },

  getQueryDataType: function(query){
    var isInterval = typeof query.interval === "string",
    isGroupBy = typeof query.group_by === "string" || (query.group_by instanceof Array && query.group_by.length === 1),
    is2xGroupBy = query.group_by instanceof Array,
    dataType;

    if (query.analysis_type === "funnel") {
      dataType = 'cat-ordinal';
    }

    // metric
    else if (!isGroupBy && !isInterval) {
      dataType = 'singular';
    }

    // group_by, no interval
    else if (isGroupBy && !isInterval) {
      dataType = 'categorical';
    }

    // interval, no group_by
    else if (isInterval && !isGroupBy) {
      dataType = 'chronological';
    }

    // interval, group_by
    else if (isInterval && isGroupBy) {
      dataType = 'cat-chronological';
    }

    // 2x group_by
    // TODO: research possible dataType options
    else if (!isInterval && is2xGroupBy) {
      dataType = 'categorical';
    }

    // interval, 2x group_by
    // TODO: research possible dataType options
    else if (isInterval && is2xGroupBy) {
      dataType = 'cat-chronological';
    }

    else if (query.analysis_type === "extraction") {
      dataType = 'extraction';
    }
    else if (query.analysis_type === "select_unique") {
      dataType = 'nominal';
    }

    return dataType;
  },

  getChartTypeOptions: function(query) {
    var dataTypes = {
      'singular':           ['metric'],
      'categorical':        ['piechart', 'barchart', 'columnchart', 'table'],
      'cat-interval':       ['columnchart', 'barchart', 'table'],
      'cat-ordinal':        ['barchart', 'columnchart', 'areachart', 'linechart', 'table'],
      'chronological':      ['areachart', 'linechart', 'table'],
      'cat-chronological':  ['linechart', 'columnchart', 'barchart', 'areachart'],
      'nominal':            ['table'],
      'extraction':         ['table']
    };
    var queryDataType = module.exports.getQueryDataType(query);
    return dataTypes[queryDataType].concat(['JSON']);
  },

  responseSupportsChartType: function(query, chartType) {
    return _.includes(module.exports.getChartTypeOptions(query), chartType);
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
        paramNames,
        dynamicConstructorNames = [
          'host', 'protocol', 'requestType'
        ],
        funnelRootParams = [
          'event_collection', 'steps'
        ],
        dynamicContructorValues;

    switch(params.analysis_type) {
      case 'funnel':
        paramNames = ['steps'];
        break;

      default:
        paramNames = ['event_collection', 'filters', 'group_by', 'interval', 'target_property', 'timeframe', 'timezone'];
        break;
    }

    if(params.steps) {
      params.steps = _.map(params.steps, function(step) { return _.omit(step, 'active'); });
    }

    dynamicContructorValues = mapSkip(dynamicConstructorNames, function(name) {
      if (client.config[name] == defaultKeenJsOpts[name]) {
        return SKIP
      }
      return '  ' + name + ': ' + s(client.config[name])
    }).join(',\n');
    // remove coercion from example; it's already been handled elsewhere.
    _.each(params['filters'], function(filter) { delete filter['coercion_type'] })

    dynamicCriteria = mapSkip(paramNames, function(param) {
      if (!params[param]) {
        return SKIP
      }
      return '    ' + toCamelcaseName(param) + ': ' + s(params[param], {space: 4})
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
