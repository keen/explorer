var _ = require('lodash');
var ExplorerUtils = require('../utils/ExplorerUtils');
var SharedValidations = require('./SharedValidations');
var StepValidations = require('./StepValidations');
var RunValidations = require('../utils/RunValidations');

function isNotFunnel(model) {
  return model.query.analysis_type !== 'funnel';
}

module.exports = {

  analysis_type: {
    
    msg: 'Choose an Analysis Type.',
    
    validate: function(model) {
      return model.query.analysis_type ? true : false;
    }

  },

  target_property: {
    
    msg: 'Choose an Target Property.',

    shouldRun: function(model) {
      return ExplorerUtils.shouldHaveTarget(model);
    },
    
    validate: function(model) {
      return model.query.target_property ? true : false;
    }

  },

  event_collection: _.assign({}, 
    
    SharedValidations.event_collection, 

    { shouldRun: isNotFunnel }

  ),

  filters: _.assign({},

    SharedValidations.filters,

    { 
      shouldRun: isNotFunnel,
      validate: function(model) {
        return SharedValidations.filters.validate(model.query.filters);
      }
    }

  ),

  steps: {

    msg: 'One of your funnel steps is invalid.',

    shouldRun: function(model) {
      return model.query.analysis_type === 'funnel';
    },

    validate: function(model) {
      for (var i=0; i<model.query.steps.length; i++) {
        var valid = RunValidations(StepValidations, model.query.steps[i]).length === 0;
        if (!valid) return false;
      }
      return true;
    },

  },

  time: _.assign({}, 

    SharedValidations.time,

    {
      shouldRun: isNotFunnel,
      validate: function(model) {
        return SharedValidations.time.validate(model.query.time)
      }
    }

  ),

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
