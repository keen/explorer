var _ = require('lodash');
var moment = require('moment');
var S = require('string');
var FormatUtils = require('./FormatUtils');
var FilterValidations = require('../validations/FilterValidations');
var ValidationUtils = require('./ValidationUtils');

function exists(value) {
  return !_.isNull(value) && !_.isUndefined(value);
}

module.exports = {

  coercionFunctions: {

    'Datetime': function(filter) {
      if (!exists(filter.property_value_date) || !exists(filter.property_value_time)) {
        return '';
      }
      return module.exports.formatDatetimePropertyValue(filter);
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

  formatDatetimePropertyValue: function(filter) {
    var formattedDatetime = moment(filter.property_value_date + ' ' + filter.property_value_time);
    if (formattedDatetime.isValid()) {
      return FormatUtils.formatISOTimeNoTimezone(formattedDatetime);
    }
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

    return _.pick(attrs, ['property_name', 'operator', 'property_value', 'coercion_type']);
  },

  initDatetime: function(filter) {
    var inputFormat = "YYYY-MM-DDTh:mm:ss";
    filter.property_value_date = moment(filter.property_value).format('MMM D, YYYY', inputFormat);
    filter.property_value_time = moment(filter.property_value).format('h:mm A', inputFormat);
    return filter;
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