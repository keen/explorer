import _ from 'lodash';
import TestHelpers from '../../support/TestHelpers';
import RunValidations from '../../../lib/js/app/utils/RunValidations';

describe('utils/RunValidations', () => {
  it('should run each validator', () => {
    const spyOne = jest.fn();
    const spyTwo = jest.fn();

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
    RunValidations(validations, model);
    expect(spyOne).toHaveBeenCalledWith(model);
    expect(spyTwo).toHaveBeenCalledWith(model);
  });

  it('should properly set the errors on the model if a validator fails', () => {
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
    RunValidations(validations, model);
    expect(model.errors).toEqual([
      {
        attribute: 'arrayVal',
        msg: 'is not array'
      },
      {
        attribute: 'stringVal',
        msg: 'is not string'
      }
    ]);
    expect(model.isValid).toEqual(false);
  });

  it('should not run validations if the shouldRun function returns false', () => {
    const stub = jest.fn();
    const validations = {
      attribute: {
        msg: 'is not valid',
        shouldRun: () => { return false; },
        validate: stub
      }
    };
    const model = { attribute: 'not valid' };
    RunValidations(validations, model);
    expect(stub).not.toHaveBeenCalled();
  });

  it('should run validations if the shouldRun function returns true', () => {
    const stub = jest.fn().mockReturnValue(false);
    const validations = {
      arrayVal: {
        msg: 'is not array',
        shouldRun: () => { return true; },
        validate: stub
      }
    };
    const model = {
      arrayVal: 'not an array',
    };
    RunValidations(validations, model);
    expect(stub).toHaveBeenCalledTimes(1);
  });
});
