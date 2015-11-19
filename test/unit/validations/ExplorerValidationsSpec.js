var assert = require('chai').assert;
var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var moment = require('moment');
var TestHelpers = require('../../support/TestHelpers');
var RunValidations = require('../../../client/js/app/utils/RunValidations');
var ExplorerValidations = require('../../../client/js/app/validations/ExplorerValidations');

describe('validations/ExplorerValidations', function() {

  describe('explorer query validations', function () {

    describe('refresh_rate validations', function() {
      it('has an error message', function () {
        var errorMessage = ExplorerValidations.refresh_rate.msg;
        assert.equal(errorMessage, 'Refresh rate must be between 4 and 24 hours.');
      });

      it('returns true when refresh rate is between 4 and 24 hours or 0', function() {
        assert.isTrue(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 0
        }));
        assert.isTrue(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 1440
        }));
        assert.isTrue(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 2000
        }));
      });

      it('returns false when refresh_rate is out of range', function() {
        assert.isFalse(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 1000
        }));
        assert.isFalse(ExplorerValidations.refresh_rate.validate({
          refresh_rate: 90000
        }));
      });
    });

    describe('query name', function () {
      it('has an error message', function () {
        var errorMessage = ExplorerValidations.query_name.msg;
        assert.equal(errorMessage, 'You must give your saved query a name.');
      });

      it('returns true even when the value is not valid when saving is false', function () {
        var explorer = TestHelpers.createExplorerModel();
        explorer.saving = false;
        explorer.query_name = '';
        assert.strictEqual(RunValidations.run({ 
          query_name: ExplorerValidations.query_name
        }, explorer).length, 0);
      });

      it('returns false when the value is not valid when saving is true', function () {
        var explorer = TestHelpers.createExplorerModel();
        explorer.saving = true;
        explorer.query_name = '';
        assert.strictEqual(RunValidations.run({ 
          query_name: ExplorerValidations.query_name
        }, explorer).length, 1);
      });

      it('returns true when name is present', function () {
        assert.isTrue(ExplorerValidations.query_name.validate({ saving: true, query_name: 'a satisfactory value' }));
      });

      it('returns false when name is an empty string', function () {
        assert.isFalse(ExplorerValidations.query_name.validate({ saving: true, query_name: '' }));
      });

      it('returns false when name is a null', function () {
        assert.isFalse(ExplorerValidations.query_name.validate({ saving: true, query_name: null }));
      });

      it('returns false when name is a undefined', function () {
        assert.isFalse(ExplorerValidations.query_name.validate({ saving: true, query_name: undefined }));
      });
    });

    describe('analysis_type', function () {
      it('has an error message', function () {
        var errorMessage = ExplorerValidations.analysis_type.msg;
        assert.equal(errorMessage, 'Choose an Analysis Type.');
      });

      it('returns true when analysis_type is present', function () {
        assert.isTrue(ExplorerValidations.analysis_type.validate({ query: { analysis_type: 'value' } }));
      });

      it('returns false when analysis_type is falsy', function () {
        assert.isFalse(ExplorerValidations.analysis_type.validate({ query: { analysis_type: '' } }));
      });
    });

    describe('filters', function () {
      describe('when query has invalid filters', function () {
        it('has an error message', function () {
          var errorMessage = ExplorerValidations.filters.msg;
          assert.equal(errorMessage, 'One of your filters is invalid.');
        });
      });

      describe('when query has valid filters', function () {
        it('returns true', function () {
          var filters = [
            {
              property_name: 'click',
              operator: 'eq',
              coercion_type: 'String',
              property_value: 'test string'
            }
          ];
          assert.isTrue(ExplorerValidations.filters.validate({ query: { filters: filters } }));
        });
      });

      describe('when the query has an invalid filter', function () {
        it('returns false', function () {
          var filters = [
            {
              property_name: 'click',
              operator: 'eq',
              coercion_type: 'Number',
              property_value: 'yoyoyo'
            }
          ];
          assert.isFalse(ExplorerValidations.filters.validate({ query: { filters: filters } }));
        });
      });

      describe('when query has no filters', function () {
        it('returns true', function () {
          assert.isTrue(ExplorerValidations.filters.validate({ query: { filters: [] } }));
        });
      });
    });
  });

  describe('email extraction field validations', function () {

    describe('email', function() {
      it("returns true when email has @ and .", function(){
        assert.isTrue(ExplorerValidations.email.validate({ query: { email: "keen@example.com" } }));
      });

      it('returns false when email is missing @ or .', function(){
        assert.isFalse(ExplorerValidations.email.validate({ query: { email: "keen@examplecom" } }));
        assert.isFalse(ExplorerValidations.email.validate({ query: { email: "keen!example.com" } }));
        assert.isFalse(ExplorerValidations.email.validate({ query: { email: "keen#example.com" } }));
        assert.isFalse(ExplorerValidations.email.validate({ query: { email: "keen$example.com" } }));
      });
    });

    describe('latest', function () {
      describe('evaluates strings correctly', function () {
        it('should return true for 10', function () {
          assert.isTrue(ExplorerValidations.latest.validate({ query: { latest: '10' } }));  
        });

        it('should return false for 10.1', function () {
          assert.isFalse(ExplorerValidations.latest.validate({ query: { latest: '10.1' } }));
        });

        it('should return false for 10.00', function () {
          assert.isFalse(ExplorerValidations.latest.validate({ query: { latest: '10.00' } }));
        });
      });
    });
  });
});
