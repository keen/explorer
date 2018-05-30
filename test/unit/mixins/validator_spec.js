
var _ from 'lodash');
let sinon from 'sinon/pkg/sinon.js');
var Validator from '../../../lib/js/app/mixins/validator.js');

describe('models/filter', () => {
  beforeEach(() => {
    this.object = {};

    Validator(this.object);
  });
  it('exists', () => {
    assert.isDefined(Validator);
  });
  describe('mixin', () => {
    it('extends Validator\'s isValid', () => {
      assert.isDefined(this.object.isValid);
    });
    it('extends Validator\'s runValidations()', () => {
      assert.isFunction(this.object.runValidations);
    });
  });
  describe('isValid', () => {
    it('returns true by default', () => {
      assert.isTrue(this.object.isValid);
    });
  });
  describe('runValidations', () => {
    beforeEach(() => {
      this.emitSpy = sinon.spy(this.object, 'emit');
    });
    afterEach(() => {
      this.emitSpy.restore();
    });

    describe('isValid', () => {
      beforeEach(() => {
        this.object.validations = [];
      });

      it('returns true', () => {
        assert.isTrue(this.object.runValidations());
      });
      it('emits a validation:valid event', () => {
        this.object.runValidations();

        assert.isTrue(this.emitSpy.calledWith('validation:valid'));
      });
    });
    describe('isInvalid', () => {
      beforeEach(() => {
        this.object.validations = {
          property_name: {
            msg: 'Error Message',
            validator: function(value) {
              return value;
            }
          }
        };
        this.object.get = function(val) {
          return false;
        };
      });
      it('sets isValid to false', () => {
        assert.isFalse(this.object.runValidations());
      });
      it('emits a validation:invalid event with error message', () => {
        this.object.runValidations();

        assert.isTrue(this.emitSpy.calledWith('validation:invalid', 'Error Message'));
      });
    });
  });
});