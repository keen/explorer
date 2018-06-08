import _ from 'lodash';
import TestHelpers from '../../support/TestHelpers';
import FormatUtils from '../../../lib/js/app/utils/FormatUtils';
import RunValidations from '../../../lib/js/app/utils/RunValidations';
import FilterValidations from '../../../lib/js/app/validations/FilterValidations';

describe('validations/FilterValidations', () => {

  describe('filter (non-geo) validations', () => {
    describe('property_name', () => {
      it('should have the proper error message', () => {
        expect(FilterValidations.property_name.msg).toEqual('Choose a property name');
      });
      it('should return true if the value is present', () => {
        expect(FilterValidations.property_name.validate({ property_name: 'value is here' })).toBe(true);
      });
      it('should return false if the value is not present', () => {
        expect(FilterValidations.property_name.validate({ property_name: null })).toBe(false);
      });
    });
    describe('property_value', () => {
      it('should call parseList if the coercion_type is List', () => {
        const filter = {
          coercion_type: 'List',
          property_value: ['a list']
        };
        const stub = jest.spyOn(FormatUtils, 'parseList').mockImplementation(()=>{});
        FilterValidations.property_value.validate(filter);
        expect(stub).toBeCalledWith(filter.property_value);
        stub.mockRestore();
      });
      it('should run the geo validations if the coercion_type is Geo', () => {
        const filter = {
          coercion_type: 'Geo',
          property_value: {
            coordinates: [1,0],
            max_distance_miles: '10'
          }
        };
        const coordinatesSpy = jest.spyOn(FilterValidations.coordinates, 'validate');
        const maxDistanceSpy = jest.spyOn(FilterValidations.max_distance_miles, 'validate');
        RunValidations.run(FilterValidations, filter);

        expect(coordinatesSpy).toHaveBeenCalledTimes(1);
        expect(maxDistanceSpy).toHaveBeenCalledTimes(1);

        coordinatesSpy.mockRestore();
        maxDistanceSpy.mockRestore();
      });
    });
    describe('operator', () => {
      it('should have the proper error message', () => {
        expect(FilterValidations.operator.msg).toEqual('Choose an operator');
      });
      it('should return false if the value is not present', () => {
        expect(FilterValidations.operator.validate({ operator: null })).toBe(false);
      });
    });
    describe('coercion_type', () => {
      it('should have the proper error message', () => {
        expect(FilterValidations.coercion_type.msg).toEqual('Choose a coercion type');
      });
      it('should return false if the value is not present', () => {
        expect(FilterValidations.coercion_type.validate({ coercion_type: null })).toBe(false);
      });
    });
  });

});
