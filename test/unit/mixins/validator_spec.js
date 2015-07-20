var assert = require('chai').assert;
var _ = require('lodash');
var sinon = require('sinon');
var Validator = require('../../../client/js/app/mixins/validator.js');

describe('models/filter', function(){
  beforeEach(function () {
    this.object = {};

    Validator(this.object);
  });
  it('exists', function(){
    assert.isDefined(Validator);
  });
  describe('mixin', function () {
    it('extends Validator\'s isValid', function () {
      assert.isDefined(this.object.isValid);
    });
    it('extends Validator\'s runValidations()', function () {
      assert.isFunction(this.object.runValidations);
    });
  });
  describe('isValid', function () {
    it('returns true by default', function () {
      assert.isTrue(this.object.isValid);
    });
  });
  describe('runValidations', function () {
    beforeEach(function () {
      this.emitSpy = sinon.spy(this.object, 'emit');
    });
    afterEach(function () {
      this.emitSpy.restore();
    });

    describe('isValid', function () {
      beforeEach(function () {
        this.object.validations = [];
      });

      it('returns true', function () {
        assert.isTrue(this.object.runValidations());
      });
      it('emits a validation:valid event', function () {
        this.object.runValidations();

        assert.isTrue(this.emitSpy.calledWith('validation:valid'));
      });
    });
    describe('isInvalid', function () {
      beforeEach(function () {
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
      it('sets isValid to false', function () {
        assert.isFalse(this.object.runValidations());
      });
      it('emits a validation:invalid event with error message', function () {
        this.object.runValidations();

        assert.isTrue(this.emitSpy.calledWith('validation:invalid', 'Error Message'));
      });
    });
  });
});