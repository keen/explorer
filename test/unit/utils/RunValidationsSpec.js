var assert = require('chai').assert;
var _ = require('lodash');
var sinon = require('sinon');
var moment = require('moment');
var TestHelpers = require('../../support/TestHelpers');
var RunValidations = require('../../../client/js/app/utils/RunValidations');

describe('utils/RunValidations', function() {
  it('should run each validator', function () {
    var spyOne = sinon.spy();
    var spyTwo = sinon.spy();

    var validations = {
      one: {
        msg: 'validator one',
        validate: spyOne
      },
      two: {
        msg: 'validator two',
        validate: spyTwo
      }
    };
    var model = TestHelpers.createExplorerModel();
    RunValidations.run(validations, model);
    assert.isTrue(spyOne.calledWith(model));
    assert.isTrue(spyTwo.calledWith(model));
  });

  it('should properly return an array of error objects if a validator fails', function () {
    validations = {
      arrayVal: {
        msg: 'is not array',
        validate: function(model, value) {
          return _.isArray(value);
        }
      },
      stringVal: {
        msg: 'is not string',
        validate: function(model, value) {
          return _.isString(value);
        }
      }
    };
    model = {
      arrayVal: 'not an array',
      stringVal: ['not', 'a', 'string']
    };
    var result = RunValidations.run(validations, model);
    assert.deepEqual(result, [
      {
        attribute: 'arrayVal',
        msg: 'is not array'
      },
      {
        attribute: 'stringVal',
        msg: 'is not string'
      }
    ]);
  });

  it('should not run validations if the shouldRun function returns false', function () {
    validations = {
      arrayVal: {
        msg: 'is not array',
        shouldRun: function() { return false; },
        validate: function(model, value) {
          return _.isArray(value);
        }
      }
    };
    model = {
      arrayVal: 'not an array',
    };
    var result = RunValidations.run(validations, model);
    assert.deepEqual(result, []);
  });

  it('should run validations if the shouldRun function returns true', function () {
    validations = {
      arrayVal: {
        msg: 'is not array',
        shouldRun: function() { return true; },
        validate: function(model, value) {
          return _.isArray(value);
        }
      }
    };
    model = {
      arrayVal: 'not an array',
    };
    var result = RunValidations.run(validations, model);
    assert.deepEqual(result, [{
      attribute: 'arrayVal',
      msg: 'is not array'
    }]);
  });
});