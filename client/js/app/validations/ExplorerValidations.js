var _ = require('lodash');
var filterValidations = require('../validations/FilterValidations').filter;
var runValidations = require('../utils/ValidationUtils').runValidations;
var FilterUtils = require('../utils/FilterUtils');

module.exports = {

  shouldValidateRelativeTimeframe: function(query) {
    if (query.time && (query.time.relativity || query.time.amount || query.time.sub_timeframe)) {
      return true;
    }
    return false;
  },

  explorer: {

    analysis_type: {
      msg: 'Choose an Analysis Type.',
      validator: function(query, value) {
        return value ? true : false;
      }
    },

    event_collection: {
      msg: 'Choose an Event Collection.',
      validator: function(query, value) {
        return value ? true : false;
      }
    },

    filters: {

      msg: 'One of your filters is invalid.',
      validator: function(query, filters) {
        var isValid = true;

        _.each(filters, function(filter) {
          if (FilterUtils.isComplete(filter) && !runValidations(filterValidations, filter).isValid) {
            isValid = false;
          }
        });

        return isValid;
      }
    },

    time: {
      msg: 'You must choose all 3 relative timeframe options.',
      validator: function(query, value) {
        if (!module.exports.shouldValidateRelativeTimeframe(query)) {
          return true;
        }
        return value.relativity && value.amount && value.sub_timeframe;
      }
    }

  },

  emailExtractionExplorer: {
    
    email: {
      msg: 'A valid email address is required.',
      validator: function(query, value) {
        return new RegExp(/.+@.+\..+/i).test(value);
      }
    },

    latest: {
      msg: 'Latest must be a number.',
      validator: function(query, value) {
        if (!value) return true;
        var n = ~~Number(value);
        return String(n) === value && n >= 0;
      }
    }

  }
  
};