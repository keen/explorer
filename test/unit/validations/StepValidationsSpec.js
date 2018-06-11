import _ from 'lodash';
import TestHelpers from '../../support/TestHelpers';
import StepValidations from '../../../lib/js/app/validations/StepValidations';

describe('validations/StepValidations', () => {

  describe('optional', () => {
    it('has an error message', () => {
      const errorMessage = StepValidations.optional.msg;
      expect(errorMessage).toEqual('You must select whether this step is optional.');
    });

    it('returns true when the value is true', () => {
      expect(StepValidations.optional.validate({ optional: true })).toBe(true);
    });

    it('returns true when the value is false', () => {
      expect(StepValidations.optional.validate({ optional: false })).toBe(true);
    });

    it('returns false when the value is null', () => {
      expect(StepValidations.optional.validate({ optional: null })).toBe(false);
    });

    it('returns false when the value is undefined', () => {
      expect(StepValidations.optional.validate({ optional: undefined })).toBe(false);
    });

    it('returns false when the value is not a boolean', () => {
      expect(StepValidations.optional.validate({ optional: 'nope' })).toBe(false);
    });
  });

  describe('inverted', () => {
    it('has an error message', () => {
      const errorMessage = StepValidations.inverted.msg;
      expect(errorMessage).toEqual('You must select whether this step is inverted.');
    });

    it('returns true when the value is true', () => {
      expect(StepValidations.inverted.validate({ inverted: true })).toBe(true);
    });

    it('returns true when the value is false', () => {
      expect(StepValidations.inverted.validate({ inverted: false })).toBe(true);
    });

    it('returns false when the value is null', () => {
      expect(StepValidations.inverted.validate({ inverted: null })).toBe(false);
    });

    it('returns false when the value is undefined', () => {
      expect(StepValidations.inverted.validate({ inverted: undefined })).toBe(false);
    });

    it('returns false when the value is not a boolean', () => {
      expect(StepValidations.inverted.validate({ inverted: 'nope' })).toBe(false);
    });
  });

  describe('with_actors', () => {
    it('has an error message', () => {
      const errorMessage = StepValidations.with_actors.msg;
      expect(errorMessage).toEqual('"with_actors" must be set to either true or false');
    });

    it('returns true when the value is true', () => {
      expect(StepValidations.with_actors.validate({ with_actors: true })).toBe(true);
    });

    it('returns true when the value is false', () => {
      expect(StepValidations.with_actors.validate({ with_actors: false })).toBe(true);
    });

    it('returns false when the value is null', () => {
      expect(StepValidations.with_actors.validate({ with_actors: null })).toBe(false);
    });

    it('returns false when the value is undefined', () => {
      expect(StepValidations.with_actors.validate({ with_actors: undefined })).toBe(false);
    });

    it('returns false when the value is not a boolean', () => {
      expect(StepValidations.with_actors.validate({ with_actors: 'nope' })).toBe(false);
    });
  });


});
