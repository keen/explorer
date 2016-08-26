var _ = require('lodash');
var ExplorerUtils = require('../utils/ExplorerUtils');
var SharedValidators = require('./SharedValidators');
var StepValidations = require('./StepValidations');
var RunValidations = require('../utils/RunValidations').run;

function isNotFunnel(model) {
  return model.query.analysis_type !== 'funnel';
}

module.exports = {

  analysis_type: {
    
    msg: 'Choose an Analysis Type.',
    
    validate: function(model) {
      return (typeof model.query.analysis_type ==='string' && model.query.analysis_type.length > 0);
    }

  },

  event_collection: {
    
    msg: 'Choose an Event Collection.',

    shouldRun: isNotFunnel,
    
    validate: function(model) {
      return (typeof model.query.event_collection ==='string' && model.query.event_collection.length > 0);
    }

  },

  target_property: {
    
    msg: 'Choose a Target Property.',

    shouldRun: function(model) {
      return ExplorerUtils.shouldHaveTarget(model);
    },
    
    validate: function(model) {
      return (typeof model.query.target_property ==='string' && model.query.target_property.length > 0);
    }

  },

  percentile_value: {
    
    msg: 'Choose a Percentile Value.',

    shouldRun: function(model) {
      return model.query.analysis_type === 'percentile';
    },
    
    validate: function(model) {
      return model.query.percentile !== null && model.query.percentile !== '' && typeof model.query.percentile === 'number';
    }

  },

  filters: {

    shouldRun: isNotFunnel,

    msg: 'One of your filters is invalid.',

    validate: function(model) {
      return SharedValidators.filters(model.query.filters);
    }

  },

  steps: {

    msg: 'One of your funnel steps is invalid.',

    shouldRun: function(model) {
      return model.query.analysis_type === 'funnel';
    },

    validate: function(model) {
      if (!model.query.steps) return false;
      var isValid = true;
      for (var i=0; i<model.query.steps.length; i++) {
        RunValidations(StepValidations, model.query.steps[i]);
        if (!model.query.steps[i].isValid) isValid = false;
      }
      return isValid;
    },

  },

  time: { 

    shouldRun: isNotFunnel,

    validate: function(model) {
      return SharedValidators.time(model.query.time);
    }

  },

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
