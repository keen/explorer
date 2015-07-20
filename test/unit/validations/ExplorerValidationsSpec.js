var assert = require('chai').assert;
var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var moment = require('moment');
var TestHelpers = require('../../support/TestHelpers');
var ExplorerValidations = require('../../../client/js/app/validations/ExplorerValidations');

describe('validations/ExplorerValidations', function() {
  
  describe('validation helpers', function(){  
    describe('shouldValidateRelativeTimeframe', function(){
      it('returns true when relativity is set', function(){
        var query = {
          time: {
            relativity: 'this',
            amount: null,
            sub_timeframe: null
          }
        };
        assert.isTrue(ExplorerValidations.shouldValidateRelativeTimeframe(query));
      });
      it('returns true when amount is set', function(){
        var query = {
          time: {
            relativity: null,
            amount: '10',
            sub_timeframe: null
          }
        };
        assert.isTrue(ExplorerValidations.shouldValidateRelativeTimeframe(query));
      });
      it('returns true when sub_timeframe is set', function(){
        var query = {
          time: {
            relativity: null,
            amount: null,
            sub_timeframe: 'days'
          }
        };
        assert.isTrue(ExplorerValidations.shouldValidateRelativeTimeframe(query));
      });
      it('returns false when none are set', function(){
        var query = {
          time: {
            relativity: null,
            amount: null,
            sub_timeframe: null
          }
        };
        assert.isFalse(ExplorerValidations.shouldValidateRelativeTimeframe(query));
      });

    });
  });

  describe('explorer query validations', function () {
    describe('event_collection', function () {
      it('has an error message', function () {
        var errorMessage = ExplorerValidations.explorer.event_collection.msg;
        assert.equal(errorMessage, 'Choose an Event Collection.');
      });
      it('returns true when event_collection is present', function () {
        assert.isTrue(ExplorerValidations.explorer.event_collection.validator({}, 'value'));
      });
      it('returns false when event_collection is falsy', function () {
        assert.isFalse(ExplorerValidations.explorer.event_collection.validator({}, ''));
      });
    });

    describe('analysis_type', function () {
      it('has an error message', function () {
        var errorMessage = ExplorerValidations.explorer.analysis_type.msg;
        assert.equal(errorMessage, 'Choose an Analysis Type.');
      });
      it('returns true when analysis_type is present', function () {
        assert.isTrue(ExplorerValidations.explorer.analysis_type.validator({}, 'value'));
      });
      it('returns false when analysis_type is falsy', function () {
        assert.isFalse(ExplorerValidations.explorer.analysis_type.validator({}, ''));
      });
    });

    describe('filters', function () {
      it('has an error message', function () {
        var errorMessage = ExplorerValidations.explorer.filters.msg;
        assert.equal(errorMessage, 'One of your filters is invalid.');
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
          assert.isTrue(ExplorerValidations.explorer.filters.validator({}, filters));
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
          assert.isFalse(ExplorerValidations.explorer.filters.validator({}, filters));
        });
      });
      describe('when query has no filters', function () {
        it('returns true', function () {
          assert.isTrue(ExplorerValidations.explorer.filters.validator({}, []));
        });
      });
    });
  });

  describe('emailExtractionExplorer valdiations', function () {
    describe('email', function(){
      it("returns true when email has @ and .", function(){
        assert.isTrue(ExplorerValidations.emailExtractionExplorer.email.validator({}, "keen@example.com"));
      });

      it('returns false when email is missing @ or .', function(){
        assert.isFalse(ExplorerValidations.emailExtractionExplorer.email.validator({}, "keen@examplecom"));
        assert.isFalse(ExplorerValidations.emailExtractionExplorer.email.validator({}, "keen!example.com"));
        assert.isFalse(ExplorerValidations.emailExtractionExplorer.email.validator({}, "keen#example.com"));
        assert.isFalse(ExplorerValidations.emailExtractionExplorer.email.validator({}, "keen$example.com"));
      });
    });
    describe('latest', function () {
      describe('evaluates strings correctly', function () {
        it('should return true for 10', function () {
          assert.isTrue(ExplorerValidations.emailExtractionExplorer.latest.validator({}, '10'));  
        });
        it('should return false for 10.1', function () {
          assert.isFalse(ExplorerValidations.emailExtractionExplorer.latest.validator({}, '10.1'));
        });
        it('should return false for 10.00', function () {
          assert.isFalse(ExplorerValidations.emailExtractionExplorer.latest.validator({}, '10.00'));
        });
      });
    });
  });
});