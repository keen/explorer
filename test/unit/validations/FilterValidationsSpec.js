
var _ from 'lodash');
let sinon from 'sinon/pkg/sinon.js');
var moment from 'moment');
var TestHelpers from '../../support/TestHelpers');
var FormatUtils from '../../../lib/js/app/utils/FormatUtils');
var RunValidations from '../../../lib/js/app/utils/RunValidations');
var FilterValidations from '../../../lib/js/app/validations/FilterValidations');

describe('validations/FilterValidations', () => {

  describe('filter (non-geo) validations', () => {
    describe('property_name', () => {
      it('should have the proper error message', () => {
        assert.strictEqual(FilterValidations.property_name.msg, 'Choose a property name');
      });
      it('should return true if the value is present', () => {
        assert.isTrue(FilterValidations.property_name.validate({ property_name: 'value is here' }));
      });
      it('should return false if the value is not present', () => {
        assert.isFalse(FilterValidations.property_name.validate({ property_name: null }));
      });
    });
    describe('property_value', () => {
      it('should call parseList if the coercion_type is List', () => {
        var filter = {
          coercion_type: 'List',
          property_value: ['a list']
        };
        var stub = sinon.stub(FormatUtils, 'parseList');
        FilterValidations.property_value.validate(filter);
        assert.isTrue(stub.calledWith(filter.property_value));
        FormatUtils.parseList.restore();
      });
      it('should run the geo validations if the coercion_type is Geo', () => {
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
    describe('operator', () => {
      it('should have the proper error message', () => {
        assert.strictEqual(FilterValidations.operator.msg, 'Choose an operator');
      });
      it('should return false if the value is not present', () => {
        assert.isFalse(FilterValidations.operator.validate({ operator: null }));
      });
    });
    describe('coercion_type', () => {
      it('should have the proper error message', () => {
        assert.strictEqual(FilterValidations.coercion_type.msg, 'Choose a coercion type');
      });
      it('should return false if the value is not present', () => {
        assert.isFalse(FilterValidations.coercion_type.validate({ coercion_type: null }));
      });
    });
  });

});