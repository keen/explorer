var assert = require('chai').assert;
var _ = require('lodash');
var sinon = require('sinon');
var moment = require('moment');
var TestHelpers = require('../../support/TestHelpers');
var StepValidations = require('../../../client/js/app/validations/StepValidations');

describe('validations/StepValidations', function() {

  describe('optional', function () {
    it('has an error message', function () {
      var errorMessage = StepValidations.optional.msg;
      assert.equal(errorMessage, 'You must select whether this step is optional.');
    });

    it('returns true when the value is true', function () {
      assert.isTrue(StepValidations.optional.validate({ optional: true }));
    });

    it('returns true when the value is false', function () {
      assert.isTrue(StepValidations.optional.validate({ optional: false }));
    });

    it('returns false when the value is null', function () {
      assert.isFalse(StepValidations.optional.validate({ optional: null }));
    });

    it('returns false when the value is undefined', function () {
      assert.isFalse(StepValidations.optional.validate({ optional: undefined }));
    });

    it('returns false when the value is not a boolean', function () {
      assert.isFalse(StepValidations.optional.validate({ optional: 'nope' }));
    });
  });

  describe('inverted', function () {
    it('has an error message', function () {
      var errorMessage = StepValidations.inverted.msg;
      assert.equal(errorMessage, 'You must select whether this step is inverted.');
    });

    it('returns true when the value is true', function () {
      assert.isTrue(StepValidations.inverted.validate({ inverted: true }));
    });

    it('returns true when the value is false', function () {
      assert.isTrue(StepValidations.inverted.validate({ inverted: false }));
    });

    it('returns false when the value is null', function () {
      assert.isFalse(StepValidations.inverted.validate({ inverted: null }));
    });

    it('returns false when the value is undefined', function () {
      assert.isFalse(StepValidations.inverted.validate({ inverted: undefined }));
    });

    it('returns false when the value is not a boolean', function () {
      assert.isFalse(StepValidations.inverted.validate({ inverted: 'nope' }));
    });
  });

});
