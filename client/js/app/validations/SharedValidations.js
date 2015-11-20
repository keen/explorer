var _ = require('lodash');
var RunValidations = require('../utils/RunValidations').run;
var FilterValidations = require('../validations/FilterValidations');
var TimeframeUtils = require('../utils/TimeframeUtils');
var FilterUtils = require('../utils/FilterUtils');

module.exports = {

  event_collection: {
    
    msg: 'Choose an Event Collection.',
    
    validate: function(value) {
      return value ? true : false;
    }

  },

  filters: {
    
    msg: 'One of your filters is invalid.',
    
    validate: function(filters) {
      if (!filters || (_.isArray(filters) && !filters.length)) return true;
      for (var i=0; i<filters.length; i++) {
        var complete = FilterUtils.isComplete(filters[i]);
        var valid = RunValidations(FilterValidations, filters[i]).length === 0;
        if (complete && !valid) return false;
      }
      return true;
    }

  },

  time: {
    
    validate: function(time) {
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

  }

};