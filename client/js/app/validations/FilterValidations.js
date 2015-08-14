var ValidationUtils = require('../utils/ValidationUtils');
var FormatUtils = require('../utils/FormatUtils');
var _ = require('lodash');

module.exports = {

  filter: {

    property_name: {
      msg: 'Choose a property name',
      validator: function(filter) {
        return filter.property_name ? true : false;
      }
    },

    operator: {
      msg: 'Choose an operator',
      validator: function(filter) {
        return filter.operator ? true : false;
      }
    },

    property_value: {
      msg: 'Choose a property value.',
      validator: function(filter) {
        var value = filter.property_value;
        var coercionType = filter.coercion_type;

        if (coercionType == 'List') {
          return FormatUtils.parseList(value) ? true : false;
        } else if (coercionType === 'Geo') {
          return filter.property_value && ValidationUtils.runValidations(module.exports.geo, filter.property_value).isValid;
        } else if (coercionType === 'Null' || coercionType === 'Boolean') {
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
      validator: function(filter) {
        return filter.coercion_type ? true : false;
      }
    }

  },

  geo: {

    coordinates: {
      msg: 'Provide all coordinates.',
      validator: function(geoObj) {
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
      validator: function(geoObj) {
        var value = geoObj.max_distance_miles;
        return value && _.isNumber(value);
      }
    }

  }

};