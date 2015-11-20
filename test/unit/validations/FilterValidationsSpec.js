var assert = require('chai').assert;
var _ = require('lodash');
var sinon = require('sinon');
var moment = require('moment');
var TestHelpers = require('../../support/TestHelpers');
var FormatUtils = require('../../../client/js/app/utils/FormatUtils');
var RunValidations = require('../../../client/js/app/utils/RunValidations');
var FilterValidations = require('../../../client/js/app/validations/FilterValidations');

describe('validations/FilterValidations', function() {

  describe('filter (non-geo) validations', function () {
    describe('property_name', function () {
      it('should have the proper error message', function () {
        assert.strictEqual(FilterValidations.property_name.msg, 'Choose a property name');
      });
      it('should return true if the value is present', function () {
        assert.isTrue(FilterValidations.property_name.validate({ property_name: 'value is here' }));
      });
      it('should return false if the value is not present', function () {
        assert.isFalse(FilterValidations.property_name.validate({ property_name: null }));
      });
    });
    describe('property_value', function () {
      it('should call parseList if the coercion_type is List', function () {
        var filter = {
          coercion_type: 'List',
          property_value: ['a list']
        };
        var stub = sinon.stub(FormatUtils, 'parseList');
        FilterValidations.property_value.validate(filter);
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
        var coordinatesSpy = sinon.spy(FilterValidations.coordinates, 'validate');
        var maxDistanceSpy = sinon.spy(FilterValidations.max_distance_miles, 'validate');
        RunValidations.run(FilterValidations, filter);

        assert.isTrue(coordinatesSpy.calledOnce);
        assert.isTrue(maxDistanceSpy.calledOnce);

        FilterValidations.coordinates.validate.restore();
        FilterValidations.max_distance_miles.validate.restore();
      });
    });
    describe('operator', function () {
      it('should have the proper error message', function () {
        assert.strictEqual(FilterValidations.operator.msg, 'Choose an operator');
      });
      it('should return false if the value is not present', function () {
        assert.isFalse(FilterValidations.operator.validate({ operator: null }));
      });
    });
    describe('coercion_type', function () {
      it('should have the proper error message', function () {
        assert.strictEqual(FilterValidations.coercion_type.msg, 'Choose a coercion type');
      });
      it('should return false if the value is not present', function () {
        assert.isFalse(FilterValidations.coercion_type.validate({ coercion_type: null }));
      });
    });
  });

});