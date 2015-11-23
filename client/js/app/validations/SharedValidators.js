var _ = require('lodash');
var RunValidations = require('../utils/RunValidations').run;
var FilterValidations = require('../validations/FilterValidations');
var TimeframeUtils = require('../utils/TimeframeUtils');
var FilterUtils = require('../utils/FilterUtils');

module.exports = {

  filters: function(filters) {
    if (!filters || (_.isArray(filters) && !filters.length)) return true;
    var isValid = true
    for (var i=0; i<filters.length; i++) {
      if (!FilterUtils.isComplete(filters[i])) continue;
      RunValidations(FilterValidations, filters[i]);
      if (!filters[i].isValid) isValid = false
    }
    return isValid;
  },
    
  time: function(time) {
    var defaultError = "You must provide a timeframe.";
    
    if (!time) return defaultError;
    if (TimeframeUtils.timeframeType(time) === 'relative') {
      if (time.relativity && time.amount && time.sub_timeframe) return true;
      return "You must choose all 3 options for relative timeframes.";
    }
    if (TimeframeUtils.timeframeType(time) === 'absolute') {
      if (time.start && time.end) return true;
      return "You must provide a start and end time for absolute timeframes.";
    }

    return defaultError;
  }

};