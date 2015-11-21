var _ = require('lodash');
var FormatUtils = require('../utils/FormatUtils');
var SharedValidators = require('./SharedValidators');

module.exports = {

  event_collection: {
    
    msg: 'Choose an Event Collection.',
    
    validate: function(model) {
      return (typeof model.event_collection ==='string' && model.event_collection.length > 0);
    }

  },

  actor_property: {

    msg: 'You must select an actor property',

    validate: function(model) {
      return (typeof model.actor_property ==='string' && model.actor_property.length > 0);
    },

  },

  time: {

    validate: function(model) {
      return SharedValidators.time(model.time);
    }

  },

  filters: {

    msg: 'One of your filters is invalid.',

    validate: function(model) {
      return SharedValidators.filters(model.filters);
    }

  },


  optional: {

    msg: 'You must select whether this step is optional.',

    validate: function(model) {
      if (FormatUtils.isNullOrUndefined(model.optional)) return false;
      return typeof model.optional === 'boolean';
    }

  },

  inverted: {

    msg: 'You must select whether this step is inverted.',

    validate: function(model) {
      if (FormatUtils.isNullOrUndefined(model.inverted)) return false;
      return typeof model.inverted === 'boolean';
    }

  },

};