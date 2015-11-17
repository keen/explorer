var _ = require('lodash');
var FormatUtils = require('./FormatUtils');
var FilterUtils = require('./FilterUtils');
var TimeframeUtils = require('./TimeframeUtils');

var STEP_PARAMS = [
  'event_collection',
  'actor_property',
  'timeframe',
  'interval',
  'timezone',
  'filters',
  'optional',
  'inverted'
];
module.exports = {
  stepJSON: function (step) {
    var params = _.cloneDeep(step);

    _.assign(params, TimeframeUtils.getTimeParameters(step.time, step.timezone));

    if(params.filters) {
      params.filters = _.map(params.filters, function(filter) {
        FilterUtils.queryJSON(Filter, TimeframeUtils.getTimezoneOffset(params.timezone)); 
      });
      
      _.remove(params.filters, _.isEmpty);
    }

    // Remove empty, null, or unnecessary properties
    _.each(params, function(value, key) {
      if(!FormatUtils.isValidQueryValue(value) || !_.contains(STEP_PARAMS, key)) {
        delete params[key];
      }
    });

    return params;
  }
};
