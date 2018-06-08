import _ from 'lodash';
import TestHelpers from '../../support/TestHelpers';
import ExplorerActions from '../../../lib/js/app/actions/ExplorerActions';
import FilterValidations from '../../../lib/js/app/validations/FilterValidations';
import RunValidations from '../../../lib/js/app/utils/RunValidations';
import FormatUtils from '../../../lib/js/app/utils/FormatUtils';
import FilterUtils from '../../../lib/js/app/utils/FilterUtils';

describe('utils/FilterUtils', () => {

  describe('getCoercionType', () => {
    describe('properly determining coercion types when none is set', () => {
      it('String when the property_value is a numeric string but operator is "contains"', () => {
        const filter = {
          property_name: "some_name",
          operator: "contains",
          property_value: "1",
          coercion_type: null
        };
        expect(FilterUtils.getCoercionType(filter)).toEqual("String");
      });
      it('String type when property_value can be parsed into a date', () => {
        const filter = {
          property_name: "created_at",
          operator: "gt",
          property_value: "query-string-1",
          coercion_type: null
        };
        expect(FilterUtils.getCoercionType(filter)).toEqual("String");
      });

      it('Boolean type when operator is exists', () => {
        const filter = {
          property_name: "created_at",
          operator: "exists",
          property_value: "false"
        };
        expect(FilterUtils.getCoercionType(filter)).toEqual("Boolean");
      });

      it('Boolean type when string is "true"', () => {
        const filter = {
          property_name: "created_at",
          operator: "equals",
          property_value: "true"
        };
        expect(FilterUtils.getCoercionType(filter)).toEqual("Boolean");
      });

      it('Boolean type when string is "false"', () => {
        const filter = {
          property_name: "created_at",
          operator: "equals",
          property_value: "false"
        };
        expect(FilterUtils.getCoercionType(filter)).toEqual("Boolean");
      });

      describe('Number property_values', () => {
        it('Number type when property_value is a string that can be parsed into an Int number', () => {
          const filter = {
            property_name: "num_projects",
            operator: "eq",
            property_value: "4"
          };
          expect(FilterUtils.getCoercionType(filter)).toEqual("Number");
        });
        it('Number type when property_value is a string that can be parsed into the number 0', () => {
          const filter = {
            property_name: "num_projects",
            operator: "eq",
            property_value: "0"
          };
          expect(FilterUtils.getCoercionType(filter)).toEqual("Number");
        });
        it('Number type when property_value is a string that can be parsed into a double number', () => {
          const filter = {
            property_name: "num_projects",
            operator: "eq",
            property_value: "4.4"
          };
          expect(FilterUtils.getCoercionType(filter)).toEqual("Number");
        });
      });
    });
  });

  describe('coercionFunctions', () => {
    it('should have coercion functions for all the types', () => {
      expect(_.keys(FilterUtils.coercionFunctions)).toEqual([
        'Datetime',
        'String',
        'Number',
        'Boolean',
        'Null',
        'Geo',
        'List'
      ]);
    });

    describe('Datetime', () => {
      it('should coerce a properly formatted set of date and time values into a formatted date', () => {
        const filter = {
          property_name: "created_at",
          property_value: "",
          operator: "eq",
          coercion_type: "Datetime",
          property_value: "May 3, 2015 10:00 AM"
        };
        expect(FilterUtils.getCoercedValue(filter)).toEqual(new Date(filter.property_value).toString());
      });
      it('should return a datetime for yesterday if the value is not parsable into a date time: true as a boolean', () => {
        const filter = {
          property_name: "created_at",
          property_value: "",
          operator: "eq",
          coercion_type: "Datetime",
          property_value: true
        };
        expect(FilterUtils.getCoercedValue(filter).toString()).toEqual(FilterUtils.defaultDate().toString());
      });
      it('should return a datetime for yesterday if the value is not parsable into a date time: true as a string', () => {
        const filter = {
          property_name: "created_at",
          property_value: "",
          operator: "eq",
          coercion_type: "Datetime",
          property_value: "true"
        };
        expect(FilterUtils.getCoercedValue(filter).toString()).toEqual(FilterUtils.defaultDate().toString());
      });
    });

    describe('String', () => {
      it('coerces a number to a string', () => {
        const filter = {
          property_name: 'propType1',
          operator: 'eq',
          coercion_type: 'String',
          property_value: 123
        };
        const coerced = FilterUtils.coercionFunctions['String'](filter);
        expect(coerced).toEqual('123');
      });
    });

    describe('Number', () => {
      let filter;
      beforeAll(() => {
        filter = {
          property_name: 'propType1',
          operator: 'eq',
          coercion_type: 'Number',
          property_value: "123"
        };
      });
      it('coerces a string to a number', () => {
        filter.property_value = "123";
        const coerced = FilterUtils.coercionFunctions['Number'](filter);
        expect(coerced).toEqual(123);
      });
      it('does not coerce a mixed type string to a number', () => {
        filter.property_value = "asdas123asd";
        const coerced = FilterUtils.coercionFunctions['Number'](filter);
        expect(coerced).toEqual('');
      });
      it('coerces a parseable string into a number', () => {
        filter.property_value = "123asd";
        const coerced = FilterUtils.coercionFunctions['Number'](filter);
        expect(coerced).toEqual(123);
      });
      it('coerces a 0 correctly', () => {
        filter.property_value = "0";
        const coerced = FilterUtils.coercionFunctions['Number'](filter);
        expect(coerced).toEqual(0);
      });
    });

    describe('Boolean', () => {
      let filter;
      beforeAll(() => {
        filter = {
          property_name: 'propType1',
          operator: 'eq',
          coercion_type: 'Boolean'
        };
      });
      it('coerces a "false" string to a false boolean', () => {
        filter.property_value = 'false';
        const coerced = FilterUtils.coercionFunctions['Boolean'](filter);
        expect(coerced).toEqual(false);
      });
      it('coerces any string other than "false" to a true boolean', () => {
        filter.property_value = "pizza";
        const coerced = FilterUtils.coercionFunctions['Boolean'](filter);
        expect(coerced).toEqual(true);
      });
    });
  });

  describe('getCoercedValue', () => {
    it('should properly coerce a boolean value', () => {
      const filter = {
        property_name: 'boolean filter',
        operator: 'eq',
        property_value: null,
        coercion_type: 'Boolean'
      };
      expect(FilterUtils.getCoercedValue(filter)).toEqual(true);
    });
  });

  describe('isComplete', () => {
    it('returns true when all of the attributes have values', () => {
      const filter = {
        property_name: 'test',
        property_value: 'test',
        operator: 'eq',
        coercion_type: 'String'
      };
      expect(FilterUtils.isComplete(filter)).toBe(true);
    });
    it('returns false when any one of the attributes does not have a value', () => {
      const filter = {
        property_name: 'test',
        property_value: 'test',
        operator: null,
        coercion_type: 'String'
      };
      expect(FilterUtils.isComplete(filter)).toBe(false);
    });
  });

  describe('initList', () => {
    it('properly creates a string with the right structure', () => {
      let filter = {
        property_value: [
          "Keen",
          2,
          "some other org",
          "John",
          3,
          4
        ],
        coercion_type: 'List'
      };
      filter = FilterUtils.initList(filter);
      expect(filter.property_value).toEqual("\"Keen\", '2', \"some other org\", \"John\", '3', '4'");
    });
  });

  describe('queryJSON', () => {
    it('should return an empty object if the filter is not valid', () => {
       const filter = {
         property_name: null,
         operator: 'eq',
         property_value: 'value',
         coercion_type: 'String'
       };
       const json = FilterUtils.queryJSON(filter);
       expect(json).toEqual({});
    });
    it('should run the right validations', () => {
      const filter = {
        property_name: 'name',
        operator: 'eq',
        property_value: 'value',
        coercion_type: 'String'
      };
      const spy = jest.spyOn(RunValidations, 'run');
      const json = FilterUtils.queryJSON(filter);
      expect(spy).toHaveBeenCalledWith(FilterValidations, filter);
      spy.mockRestore();
    });
    it('should parse the list if the coercion type is List', () => {
      const filter = {
        property_name: 'list',
        operator: 'eq',
        property_value: ['a', 'list'],
        coercion_type: 'List'
      };
      const spy = jest.spyOn(FormatUtils, 'parseList');
      FilterUtils.queryJSON(filter);
      expect(spy).toBeCalled();
      spy.mockRestore();
    });
    it('should only return the right attributes form the query request', () => {
      const filter = {
        property_name: 'name',
        operator: 'eq',
        property_value: 'Earthworm Jim',
        coercion_type: 'String',
        some_other_property: 'value'
      };
      const json = FilterUtils.queryJSON(filter);
      expect(json).toEqual({
        property_name: 'name',
        operator: 'eq',
        property_value: 'Earthworm Jim'
      });
    });
  });
});
