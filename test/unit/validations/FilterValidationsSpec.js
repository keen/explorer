var assert = require('chai').assert;
var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var moment = require('moment');
var TestHelpers = require('../../support/TestHelpers');
var FormatUtils = require('../../../client/js/app/utils/FormatUtils');
var ValidationUtils = require('../../../client/js/app/utils/ValidationUtils');
var FilterValidations = require('../../../client/js/app/validations/FilterValidations');

describe('validations/FilterValidations', function() {

  describe('filter (non-geo) validations', function () {
    describe('property_name', function () {
      it('should have the proper error message', function () {
        assert.strictEqual(FilterValidations.filter.property_name.msg, 'Choose a property name');
      });
      it('should return true if the value is present', function () {
        assert.isTrue(FilterValidations.filter.property_name.validator({ property_name: 'value is here' }));
      });
      it('should return false if the value is not present', function () {
        assert.isFalse(FilterValidations.filter.property_name.validator({ property_name: null }));
      });
    });
    describe('property_value', function () {
      it('should call parseList if the coercion_type is List', function () {
        var filter = {
          coercion_type: 'List',
          property_value: ['a list']
        };
        var stub = sinon.stub(FormatUtils, 'parseList');
        FilterValidations.filter.property_value.validator(filter);
        assert.isTrue(stub.calledWith(filter.property_value));
        FormatUtils.parseList.restore();
      });
      it('should run the geo validations if the coercion_type is Geo', function () {
        var filter = {
          coercion_type: 'Geo',
          property_value: {
            coordinates: [1,0],
            max_distance_miles: '10'
          }
        };
        var stub = sinon.stub(ValidationUtils, 'runValidations').returns({
          isValid: false,
          lastError: 'error'
        });
        FilterValidations.filter.property_value.validator(filter);
        assert.isTrue(stub.calledWith(FilterValidations.geo));
        ValidationUtils.runValidations.restore();
      });
    });
    describe('operator', function () {
      it('should have the proper error message', function () {
        assert.strictEqual(FilterValidations.filter.operator.msg, 'Choose an operator');
      });
      it('should return false if the value is not present', function () {
        assert.isFalse(FilterValidations.filter.operator.validator({ operator: null }));
      });
    });
    describe('coercion_type', function () {
      it('should have the proper error message', function () {
        assert.strictEqual(FilterValidations.filter.coercion_type.msg, 'Choose a coercion type');
      });
      it('should return false if the value is not present', function () {
        assert.isFalse(FilterValidations.filter.coercion_type.validator({ coercion_type: null }));
      });
    });
  });

});