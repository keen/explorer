var _ = require('lodash');
var RunValidations = require('../utils/RunValidations').run;
var FormatUtils = require('../utils/FormatUtils');

function isGeoCoercionType(model) {
  return model.coercion_type === 'Geo';
}

module.exports = {

  property_name: {

    msg: 'Choose a property name',

    validate: function(model) {
      return (typeof model.property_name === 'string' && model.property_name.length > 0);
    }

  },

  operator: {

    msg: 'Choose an operator',

    validate: function(model) {
      return (typeof model.operator === 'string' && model.operator.length > 0);
    }

  },

  property_value: {

    msg: 'Choose a property value.',

    shouldRun: function(model) {
      return !isGeoCoercionType(model);
    },

    validate: function(model) {
      var value = model.property_value;
      var coercionType = model.coercion_type;

      if (coercionType == 'List') {
        return FormatUtils.parseList(value) ? true : false;
      } else if (coercionType === 'Null' || coercionType === 'Boolean') {
        return true;
      } else if (coercionType === 'Number') {
        return _.isNumber(value);
      } else if (coercionType === 'String') {
        return true;
      } else {
        return value ? true : false;
      }
    }

  },

  coercion_type: {

    msg: 'Choose a coercion type',

    validate: function(model) {
      return (typeof model.coercion_type ==='string' && model.coercion_type.length > 0);
    }

  },

  coordinates: {

    msg: 'Provide all coordinates.',

    shouldRun: isGeoCoercionType,

    validate: function(model) {
      var value = model.property_value.coordinates;
      var valid = _.isArray(value) && value.length === 2;
      if (!valid) return valid;

      for(var i=0; i<value.length; i++) {
        if (!valid) break;
        valid = _.isNumber(value[i]);
      }
      return valid;
    }

  },

  max_distance_miles: {

    msg: 'Provide a max distance in miles.',

    shouldRun: isGeoCoercionType,

    validate: function(model) {
      var value = model.property_value.max_distance_miles;
      return value && _.isNumber(value);
    }

  }

};
