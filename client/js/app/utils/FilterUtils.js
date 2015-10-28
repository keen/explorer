var _ = require('lodash');
var moment = require('moment');
var S = require('string');
var FormatUtils = require('./FormatUtils');
var FilterValidations = require('../validations/FilterValidations');
var ValidationUtils = require('./ValidationUtils');

function exists(value) {
  return !_.isNull(value) && !_.isUndefined(value);
}

function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

module.exports = {

  coercionFunctions: {

    'Datetime': function(filter) {
      var coercedDate = module.exports.formatDatetimePropertyValue(filter);
      if (coercedDate !== null) return coercedDate;

      var yesterday = new Date(moment().subtract(1, 'days').startOf('day').format());
      return FormatUtils.formatISOTimeNoTimezone(yesterday);
    },

    'String': function(filter) {
      if (!exists(filter.property_value)) return null;
      return filter.property_value.toString();
    },

    'Number': function(filter) {
      if (!exists(filter.property_value)) return null;
      var newVal = parseFloat(filter.property_value);
      if (typeof newVal === 'undefined' || newVal === null || isNaN(newVal)) {
        newVal = '';
      }
      return newVal;
    },

    'Boolean': function(filter) {
      var isFalse = filter.property_value === 'false' || filter.property_value === false;
      return isFalse ? false : true;
    },

    'Null': function(filter) {
      return null;
    },

    'Geo': function(filter) {
      return filter.property_value;
    },

    'List': function(filter) {
      return filter.property_value;
    }

  },

  getCoercedValue: function(filter) {
    if (!module.exports.coercionFunctions[filter.coercion_type]) return null;
    return module.exports.coercionFunctions[filter.coercion_type](filter);
  },

  /**
   * Gets the type for the given filter's property_value. This value should be raw, as in it should not have
   * been put through getCoercedValue yet. So for example, if it's a list type, it should be a string with the
   * expected list format: "\a word\"", '1', '56', \""another word\"" 
   * @param  {Object} filter The filter to get the property value coercion type for.
   * @return {String}        The determined type for the given property value.
   */
  getCoercionType: function(filter) {
    switch (toType(filter.property_value)) {
      case 'object':
        return 'Geo';
        break;
      case 'string':
        if (module.exports.formatDatetimePropertyValue(filter) !== null) return 'Datetime';
        if (FormatUtils.isList(filter.property_value)) return 'List';
        return 'String';
        break;
      case 'array':
        return 'List';
        break;
      case 'boolean':
        return 'Boolean';
        break;
      case 'number':
        return 'Number';
        break;
      case 'null':
        return 'Null';
        break;
    }
  },

  formatDatetimePropertyValue: function(filter) {
    if (!isNaN(Date.parse(filter.property_value))) {
      return FormatUtils.formatISOTimeNoTimezone(filter.property_value);
    }
    return null;
  },

  isComplete: function(filter) {
    var attrs = [
      'property_name',
      'property_value',
      'operator',
      'coercion_type'
    ];
    var complete = true;
    for(var i=0; i<attrs.length; i++) {
      var val = filter[attrs[i]];
      complete = !_.isUndefined(val) && !_.isNull(val);
      if (_.isObject(val)) complete = !_.isEmpty(val);
      if (!complete) break;
    }
    return complete;
  },

  queryJSON: function(filter) {
    var valid = ValidationUtils.runValidations(FilterValidations.filter, filter);
    if (!valid.isValid) {
      return {};
    }

    var attrs = _.cloneDeep(filter);
    attrs.property_value = module.exports.getCoercedValue(filter);

    if (attrs.coercion_type === 'Datetime') {
      attrs.property_value = FormatUtils.formatISOTimeNoTimezone(moment(new Date(attrs.property_value)));
    }
    if (attrs.coercion_type === 'List') {
      attrs.property_value = FormatUtils.parseList(attrs.property_value);
    }

    return _.pick(attrs, ['property_name', 'operator', 'property_value']);
  },

  initList: function(filter) {
    var newVal = "";
    _.each(filter.property_value, function(item, index){
      if (_.isString(item)) newVal += '"' + item + '"';
      if (_.isNumber(item)) newVal += "'" + item + "'";
      if (index !== filter.property_value.length - 1) newVal += ', ';
    }, this);
    filter.property_value = newVal;
    return filter;
  }

};