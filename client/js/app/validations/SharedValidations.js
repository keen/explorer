var RunValidations = require('../utils/RunValidations');
var FilterValidations = require('../validations/FilterValidations');
var ExplorerUtils = require('../utils/ExplorerUtils');
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
      var time = time || {};
      if (ExplorerUtils.timeframeType(time) === 'relative') {
        if (time.relativity && time.amount && time.sub_timeframe) {
          return true;
        } else {
          return "You must choose all 3 options for relative timeframes.";
        }
      } else if (ExplorerUtils.timeframeType(time) === 'absolute') {
        if (time.start && time.end) {
          return true;
        } else {
          return "You must provide a start and end time for absolute timeframes.";
        }
      } else {
        return "You must provide a timeframe.";
      }
      return true;
    }

  }

};