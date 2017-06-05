const assert = require('chai').assert;
const _ = require('lodash');
const sinon = require('sinon/pkg/sinon.js');
const moment = require('moment');
const TestHelpers = require('../../support/TestHelpers');
const RunValidations = require('../../../client/js/app/utils/RunValidations');

describe('utils/RunValidations', function() {
  it('should run each validator', function () {
    const spyOne = sinon.spy();
    const spyTwo = sinon.spy();

    const validations = {
      one: {
        msg: 'validator one',
        validate: spyOne
      },
      two: {
        msg: 'validator two',
        validate: spyTwo
      }
    };
    const model = TestHelpers.createExplorerModel();
    RunValidations.run(validations, model);
    assert.isTrue(spyOne.calledWith(model));
    assert.isTrue(spyTwo.calledWith(model));
  });

  it('should properly set the errors on the model if a validator fails', function () {
    const validations = {
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
    const model = {
      arrayVal: 'not an array',
      stringVal: ['not', 'a', 'string']
    };
    RunValidations.run(validations, model);
    assert.deepEqual(model.errors, [
      {
        attribute: 'arrayVal',
        msg: 'is not array'
      },
      {
        attribute: 'stringVal',
        msg: 'is not string'
      }
    ]);
    assert.strictEqual(model.isValid, false);
  });

  it('should not run validations if the shouldRun function returns false', function () {
    const stub = sinon.stub();
    const validations = {
      attribute: {
        msg: 'is not valid',
        shouldRun: function() { return false; },
        validate: stub
      }
    };
    const model = { attribute: 'not valid' };
    RunValidations.run(validations, model);
    assert.isFalse(stub.getCalls().length > 0);
  });

  it('should run validations if the shouldRun function returns true', function () {
    const stub = sinon.stub().returns(false);
    const validations = {
      arrayVal: {
        msg: 'is not array',
        shouldRun: function() { return true; },
        validate: stub
      }
    };
    const model = {
      arrayVal: 'not an array',
    };
    RunValidations.run(validations, model);
    assert.isTrue(stub.calledOnce);
  });
});
