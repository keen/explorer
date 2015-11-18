var RunValidations = require('../utils/RunValidations');
var FilterValidations = require('../validations/FilterValidations');
var ExplorerUtils = require('../utils/ExplorerUtils');
var FilterUtils = require('../utils/FilterUtils');

module.exports = {  

  query_name: {
    
    msg: 'You must give your saved query a name.',
    
    shouldRun: function(model) {
      return model.saving;
    },
    
    validate: function(model) {
      var name = model.query_name;
      return (name !== null && name !== undefined && typeof name === "string" && name.length > 0);
    }

  },

  refresh_rate: {
    
    msg: 'Refresh rate must be between 4 and 24 hours.',
    
    validate: function(model) {
      var rate = model.refresh_rate;
      return (typeof rate !== 'number' || (rate >= 1440 && rate <= 86400) || rate == 0);
    }

  },

  analysis_type: {
    
    msg: 'Choose an Analysis Type.',
    
    validate: function(model) {
      return model.query.analysis_type ? true : false;
    }

  },

  event_collection: {
    
    msg: 'Choose an Event Collection.',
    
    validate: function(model) {
      return model.query.event_collection ? true : false;
    }

  },

  filters: {
    
    msg: 'One of your filters is invalid.',
    
    validate: function(model) {
      for (var i=0; i<model.query.filters.length; i++) {
        var complete = FilterUtils.isComplete(filter);
        var valid = RunValidations(FilterValidations, filter).length === 0;
        if (complete && !valid) return false;
      }
    }

  },

  time: {
    
    validate: function(model) {
      var time = model.query.time || {};
      if (ExplorerUtils.timeframeType(model.query.time) === 'relative') {
        if (time.relativity && time.amount && time.sub_timeframe) {
          return true;
        } else {
          return "You must choose all 3 options for relative timeframes.";
        }
      } else if (ExplorerUtils.timeframeType(model.query.time) === 'absolute') {
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

  },

  email: {
    
    msg: 'A valid email address is required.',
    
    shouldRun: ExplorerUtils.isEmailExtraction,
    
    validate: function(model) {
      return new RegExp(/.+@.+\..+/i).test(model.query.email);
    }

  },

  latest: {
    
    msg: 'Latest must be a number.',
    
    shouldRun: ExplorerUtils.isEmailExtraction,

    validate: function(model) {
      var value = model.query.latest;
      if (!value) return true;
      var n = ~~Number(value);
      return String(n) === value && n >= 0;
    }

  }
  
};
