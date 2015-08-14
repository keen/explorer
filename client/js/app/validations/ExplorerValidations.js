var _ = require('lodash');
var filterValidations = require('../validations/FilterValidations').filter;
var runValidations = require('../utils/ValidationUtils').runValidations;
var FilterUtils = require('../utils/FilterUtils');

module.exports = {

  explorer: {

    name: {
      msg: 'You must give your saved query a name.',
      validator: function(explorer) {
        if (!explorer.saving) return true;
        return (explorer.name !== null && explorer.name !== undefined && typeof explorer.name === "string" && explorer.name.length > 0);
      }
    },

    analysis_type: {
      msg: 'Choose an Analysis Type.',
      validator: function(explorer) {
        return explorer.query.analysis_type ? true : false;
      }
    },

    event_collection: {
      msg: 'Choose an Event Collection.',
      validator: function(explorer) {
        return explorer.query.event_collection ? true : false;
      }
    },

    filters: {

      msg: 'One of your filters is invalid.',
      validator: function(explorer) {
        var isValid = true;

        _.each(explorer.query.filters, function(filter) {
          if (FilterUtils.isComplete(filter) && !runValidations(filterValidations, filter).isValid) {
            isValid = false;
          }
        });

        return isValid;
      }
    },

    time: {
      validator: function(explorer) {
        var time = explorer.query.time || {};
        if (explorer.timeframe_type === 'relative') {
          if (time.relativity && time.amount && time.sub_timeframe) {
            return true;
          } else {
            return "You must choose all 3 options for relative timeframes.";
          }
        } else if (explorer.timeframe_type === 'absolute') {
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

  },

  emailExtractionExplorer: {
    
    email: {
      msg: 'A valid email address is required.',
      validator: function(explorer) {
        return new RegExp(/.+@.+\..+/i).test(explorer.query.email);
      }
    },

    latest: {
      msg: 'Latest must be a number.',
      validator: function(explorer) {
        var value = explorer.query.latest;
        if (!value) return true;
        var n = ~~Number(value);
        return String(n) === value && n >= 0;
      }
    }

  }
  
};