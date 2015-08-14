var assert = require('chai').assert;
var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var moment = require('moment');
var TestHelpers = require('../../support/TestHelpers');
var ValidationUtils = require('../../../client/js/app/utils/ValidationUtils');

describe('utils/ValidationUtils', function() {

  describe('runValidations', function () {
    it('should run each validator', function () {
      var spyOne = sinon.spy();
      var spyTwo = sinon.spy();

      var validations = {
        one: {
          msg: 'validator one',
          validator: spyOne
        },
        two: {
          msg: 'validator two',
          validator: spyTwo
        }
      };
      var model = TestHelpers.createExplorerModel();
      ValidationUtils.runValidations(validations, model);
      assert.isTrue(spyOne.calledWith(model));
      assert.isTrue(spyTwo.calledWith(model));
    });
  });
  describe('return value', function () {
    it('should properly return an invalid object if a validator fails', function () {
      validations = {
        arrayVal: {
          msg: 'is not array',
          validator: function(model, value) {
            return _.isArray(value);
          }
        },
        stringVal: {
          msg: 'is not string',
          validator: function(model, value) {
            return _.isString(value);
          }
        }
      };
      model = {
        one: 'not an array',
        two: ['not', 'a', 'string']
      };
      var result = ValidationUtils.runValidations(validations, model);
      assert.deepEqual(result, {
        isValid: false,
        lastError: 'is not string'
      })
    });
  });
});