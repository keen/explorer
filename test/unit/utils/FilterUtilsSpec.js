var assert = require('chai').assert;
var sinon = require('sinon');
var moment = require('moment');
var _ = require('lodash');
var TestHelpers = require('../../support/TestHelpers');
var ExplorerActions = require('../../../client/js/app/actions/ExplorerActions');
var FilterValidations = require('../../../client/js/app/validations/FilterValidations');
var RunValidations = require('../../../client/js/app/utils/RunValidations');
var FormatUtils = require('../../../client/js/app/utils/FormatUtils');
var FilterUtils = require('../../../client/js/app/utils/FilterUtils');

describe('utils/FilterUtils', function() {

  describe('getCoercionType', function () {
    describe('properly determining coercion types when none is set', function () {
      it('String when the property_value is a numeric string but operator is "contains"', function () {
        var filter = {
          property_name: "some_name",
          operator: "contains",
          property_value: "1",
          coercion_type: null
        };
        assert.strictEqual(FilterUtils.getCoercionType(filter), "String");
      });
      it('String type when property_value can be parsed into a date', function () {
        var filter = {
          property_name: "created_at",
          operator: "gt",
          property_value: "query-string-1",
          coercion_type: null
        };
        assert.strictEqual(FilterUtils.getCoercionType(filter), "String");
      });

      it('Boolean type when operator is exists', function () {
        var filter = {
          property_name: "created_at",
          operator: "exists",
          property_value: "false"
        };
        assert.strictEqual(FilterUtils.getCoercionType(filter), "Boolean");
      });

      it('Boolean type when string is "true"', function () {
        var filter = {
          property_name: "created_at",
          operator: "equals",
          property_value: "true"
        };
        assert.strictEqual(FilterUtils.getCoercionType(filter), "Boolean");
      });

      it('Boolean type when string is "false"', function () {
        var filter = {
          property_name: "created_at",
          operator: "equals",
          property_value: "false"
        };
        assert.strictEqual(FilterUtils.getCoercionType(filter), "Boolean");
      });

      describe('Number property_values', function () {
        it('Number type when property_value is a string that can be parsed into an Int number', function () {
          var filter = {
            property_name: "num_projects",
            operator: "eq",
            property_value: "4"
          };
          assert.strictEqual(FilterUtils.getCoercionType(filter), "Number");
        });
        it('Number type when property_value is a string that can be parsed into the number 0', function () {
          var filter = {
            property_name: "num_projects",
            operator: "eq",
            property_value: "0"
          };
          assert.strictEqual(FilterUtils.getCoercionType(filter), "Number");
        });
        it('Number type when property_value is a string that can be parsed into a double number', function () {
          var filter = {
            property_name: "num_projects",
            operator: "eq",
            property_value: "4.4"
          };
          assert.strictEqual(FilterUtils.getCoercionType(filter), "Number");
        });
      });
    });
  });

  describe('coercionFunctions', function () {
    it('should have coercion functions for all the types', function () {
      assert.sameMembers(_.keys(FilterUtils.coercionFunctions), [
        'Datetime',
        'String',
        'Number',
        'Boolean',
        'Null',
        'Geo',
        'List'
      ]);
    });

    describe('Datetime', function () {
      it('should coerce a properly formatted set of date and time values into a formatted date', function () {
        var filter = {
          property_name: "created_at",
          property_value: "",
          operator: "eq",
          coercion_type: "Datetime",
          property_value: "May 3, 2015 10:00 AM"
        };
        assert.strictEqual(FilterUtils.getCoercedValue(filter), new Date(filter.property_value).toString());
      });
      it('should return a datetime for yesterday if the value is not parsable into a date time: true as a boolean', function () {
        var filter = {
          property_name: "created_at",
          property_value: "",
          operator: "eq",
          coercion_type: "Datetime",
          property_value: true
        };
        assert.strictEqual(FilterUtils.getCoercedValue(filter).toString(), FilterUtils.defaultDate().toString());
      });
      it('should return a datetime for yesterday if the value is not parsable into a date time: true as a string', function () {
        var filter = {
          property_name: "created_at",
          property_value: "",
          operator: "eq",
          coercion_type: "Datetime",
          property_value: "true"
        };
        assert.strictEqual(FilterUtils.getCoercedValue(filter).toString(), FilterUtils.defaultDate().toString());
      });
    });

    describe('String', function () {
      it('coerces a number to a string', function () {
        var filter = {
          property_name: 'propType1',
          operator: 'eq',
          coercion_type: 'String',
          property_value: 123
        };
        var coerced = FilterUtils.coercionFunctions['String'](filter);
        assert.strictEqual(coerced, '123');
      });
    });

    describe('Number', function () {
      before(function () {
        this.filter = {
          property_name: 'propType1',
          operator: 'eq',
          coercion_type: 'Number',
          property_value: "123"
        };
      });
      it('coerces a string to a number', function () {
        this.filter.property_value = "123";
        var coerced = FilterUtils.coercionFunctions['Number'](this.filter);
        assert.strictEqual(coerced, 123);
      });
      it('does not coerce a mixed type string to a number', function () {
        this.filter.property_value = "asdas123asd";
        var coerced = FilterUtils.coercionFunctions['Number'](this.filter);
        assert.strictEqual(coerced, '');
      });
      it('coerces a parseable string into a number', function () {
        this.filter.property_value = "123asd";
        var coerced = FilterUtils.coercionFunctions['Number'](this.filter);
        assert.strictEqual(coerced, 123);
      });
      it('coerces a 0 correctly', function () {
        this.filter.property_value = "0";
        var coerced = FilterUtils.coercionFunctions['Number'](this.filter);
        assert.strictEqual(coerced, 0);
      });
    });

    describe('Boolean', function () {
      before(function () {
        this.filter = {
          property_name: 'propType1',
          operator: 'eq',
          coercion_type: 'Boolean'
        };
      });
      it('coerces a "false" string to a false boolean', function () {
        this.filter.property_value = 'false';
        var coerced = FilterUtils.coercionFunctions['Boolean'](this.filter);
        assert.strictEqual(coerced, false);
      });
      it('coerces any string other than "false" to a true boolean', function () {
        this.filter.property_value = "pizza";
        var coerced = FilterUtils.coercionFunctions['Boolean'](this.filter);
        assert.strictEqual(coerced, true);
      });
    });
  });

  describe('getCoercedValue', function () {
    it('should properly coerce a boolean value', function () {
      var filter = {
        property_name: 'boolean filter',
        operator: 'eq',
        property_value: null,
        coercion_type: 'Boolean'
      };
      assert.strictEqual(FilterUtils.getCoercedValue(filter), true);
    });
  });

  describe('isComplete', function(){
    it('returns true when all of the attributes have values', function(){
      var filter = {
        property_name: 'test',
        property_value: 'test',
        operator: 'eq',
        coercion_type: 'String'
      };
      assert.isTrue(FilterUtils.isComplete(filter));
    });
    it('returns false when any one of the attributes does not have a value', function(){
      var filter = {
        property_name: 'test',
        property_value: 'test',
        operator: null,
        coercion_type: 'String'
      };
      assert.isFalse(FilterUtils.isComplete(filter));
    });
  });

  describe('initList', function () {
    it('properly creates a string with the right structure', function(){
      var filter = {
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
      var filter = FilterUtils.initList(filter);
      assert.deepEqual(filter.property_value, "\"Keen\", '2', \"some other org\", \"John\", '3', '4'");
    });
  });

  describe('queryJSON', function () {
    it('should return an empty object if the filter is not valid', function () {
       var filter = {
         property_name: null,
         operator: 'eq',
         property_value: 'value',
         coercion_type: 'String'
       };
       var json = FilterUtils.queryJSON(filter);
       assert.deepEqual(json, {});
    });
    it('should run the right validations', function () {
      var filter = {
        property_name: 'name',
        operator: 'eq',
        property_value: 'value',
        coercion_type: 'String'
      };
      var spy = sinon.spy(RunValidations, 'run');
      var json = FilterUtils.queryJSON(filter);
      assert.isTrue(spy.calledWith(FilterValidations, filter));
      RunValidations.run.restore();
    });
    it('should parse the list if the coercion type is List', function () {
      var filter = {
        property_name: 'list',
        operator: 'eq',
        property_value: ['a', 'list'],
        coercion_type: 'List'
      };
      var stub = sinon.stub(FormatUtils, 'parseList');
      FilterUtils.queryJSON(filter);
      assert.isTrue(stub.calledOnce);
      FormatUtils.parseList.restore();
    });
    it('should only return the right attributes form the query request', function () {
      var filter = {
        property_name: 'name',
        operator: 'eq',
        property_value: 'Earthworm Jim',
        coercion_type: 'String',
        some_other_property: 'value'
      };
      var json = FilterUtils.queryJSON(filter);
      assert.deepEqual(json, {
        property_name: 'name',
        operator: 'eq',
        property_value: 'Earthworm Jim'
      });
    });
  });
});
