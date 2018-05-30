
var _ from 'lodash');
let sinon from 'sinon/pkg/sinon.js');
var moment from 'moment');
var TestHelpers from '../../support/TestHelpers');
var StepValidations from '../../../lib/js/app/validations/StepValidations');

describe('validations/StepValidations', () => {

  describe('optional', () => {
    it('has an error message', () => {
      var errorMessage = StepValidations.optional.msg;
      assert.equal(errorMessage, 'You must select whether this step is optional.');
    });

    it('returns true when the value is true', () => {
      assert.isTrue(StepValidations.optional.validate({ optional: true }));
    });

    it('returns true when the value is false', () => {
      assert.isTrue(StepValidations.optional.validate({ optional: false }));
    });

    it('returns false when the value is null', () => {
      assert.isFalse(StepValidations.optional.validate({ optional: null }));
    });

    it('returns false when the value is undefined', () => {
      assert.isFalse(StepValidations.optional.validate({ optional: undefined }));
    });

    it('returns false when the value is not a boolean', () => {
      assert.isFalse(StepValidations.optional.validate({ optional: 'nope' }));
    });
  });

  describe('inverted', () => {
    it('has an error message', () => {
      var errorMessage = StepValidations.inverted.msg;
      assert.equal(errorMessage, 'You must select whether this step is inverted.');
    });

    it('returns true when the value is true', () => {
      assert.isTrue(StepValidations.inverted.validate({ inverted: true }));
    });

    it('returns true when the value is false', () => {
      assert.isTrue(StepValidations.inverted.validate({ inverted: false }));
    });

    it('returns false when the value is null', () => {
      assert.isFalse(StepValidations.inverted.validate({ inverted: null }));
    });

    it('returns false when the value is undefined', () => {
      assert.isFalse(StepValidations.inverted.validate({ inverted: undefined }));
    });

    it('returns false when the value is not a boolean', () => {
      assert.isFalse(StepValidations.inverted.validate({ inverted: 'nope' }));
    });
  });

  describe('with_actors', () => {
    it('has an error message', () => {
      var errorMessage = StepValidations.with_actors.msg;
      assert.equal(errorMessage, '"with_actors" must be set to either true or false');
    });

    it('returns true when the value is true', () => {
      assert.isTrue(StepValidations.with_actors.validate({ with_actors: true }));
    });

    it('returns true when the value is false', () => {
      assert.isTrue(StepValidations.with_actors.validate({ with_actors: false }));
    });

    it('returns false when the value is null', () => {
      assert.isFalse(StepValidations.with_actors.validate({ with_actors: null }));
    });

    it('returns false when the value is undefined', () => {
      assert.isFalse(StepValidations.with_actors.validate({ with_actors: undefined }));
    });

    it('returns false when the value is not a boolean', () => {
      assert.isFalse(StepValidations.with_actors.validate({ with_actors: 'nope' }));
    });
  });


});
