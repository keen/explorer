var _ = require('lodash');
var RunValidations = require('../utils/RunValidations');
var FormatUtils = require('../utils/FormatUtils');

function isGeoCoercionType(model) {
  return model.coercionType === 'Geo';
}

module.exports = {

  filter: {

    property_name: {

      msg: 'Choose a property name',
      
      validate: function(model) {
        return model.property_name ? true : false;
      }

    },

    operator: {
      
      msg: 'Choose an operator',
      
      validate: function(model) {
        return model.operator ? true : false;
      }

    },

    property_value: {
      
      msg: 'Choose a property value.',
      
      validate: function(model) {
        var value = model.property_value;
        var coercionType = model.coercion_type;

        if (coercionType == 'List') {
          return FormatUtils.parseList(value) ? true : false;
         else if (coercionType === 'Null' || coercionType === 'Boolean') {
          return true;
        } else if (coercionType === 'Number') {
          return _.isNumber(value);
        } else if (String(value) === "0") {
          return true;
        } else {
          return value ? true : false;
        }
      }

    },

    coercion_type: {
      
      msg: 'Choose a coercion type',
      
      validate: function(model) {
        return model.coercion_type ? true : false;
      }

    }

  },

  coordinates: {
    
    msg: 'Provide all coordinates.',

    shouldRun: isGeoCoercionType,
    
    validate: function(geoObj) {
      var value = geoObj.coordinates;
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
    
    validate: function(geoObj) {
      var value = geoObj.max_distance_miles;
      return value && _.isNumber(value);
    }
    
  }

};