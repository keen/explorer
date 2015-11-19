var assert = require('chai').assert;
var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var moment = require('moment');
var TestHelpers = require('../../support/TestHelpers');
var ExplorerValidations = require('../../../client/js/app/validations/SharedValidations');

describe('validations/SharedValidations', function() {

  describe('event_collection', function () {
    it('has an error message', function () {
      var errorMessage = ExplorerValidations.event_collection.msg;
      assert.equal(errorMessage, 'Choose an Event Collection.');
    });

    it('returns true when event_collection is present', function () {
      assert.isTrue(ExplorerValidations.event_collection.validate('value'));
    });

    it('returns false when event_collection is falsy', function () {
      assert.isFalse(ExplorerValidations.event_collection.validate(''));
    });
  });

});
