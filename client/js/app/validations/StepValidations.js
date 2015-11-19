var _ = require('lodash');
var SharedValidations = require('./SharedValidations');

module.exports = {

  event_collection: SharedValidations.event_collection,

  actor_property: {

    msg: 'You must select an actor property',

    validate: function(model) {
      return (model.actor_property) ? true : false;
    },

  },

  time: _.assign({},

    SharedValidations.time,

    {
      validate: function(model) {
        return SharedValidations.time.validate(model.time);
      }
    }

  ),

  filters: _.assign({},

    SharedValidations.filters,

    {
      validate: function(model) {
        return SharedValidations.filters.validate(model.filters);
      }
    }

  ),


  optional: {

    msg: 'You must select whether this step is optional.',

    validate: function(model) {
      return model.optional ? true : false;
    }

  },

  inverted: {

    msg: 'You must select whether this step is inverted.',

    validate: function(model) {
      return model.inverted ? true : false;
    }

  },

};