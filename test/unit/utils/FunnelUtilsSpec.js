var assert = require('chai').assert;
var sinon = require('sinon');
var FilterUtils = require('../../../client/js/app/utils/FilterUtils');
var FunnelUtils = require('../../../client/js/app/utils/FunnelUtils');

describe('utils/FunnelUtils', function() {
  describe('stepJSON', function() {
    it('should remove unnecessary properties', function () {
      var step = {
        cool: 'dudes'
      }

      var json = FunnelUtils.stepJSON(step);
      assert.deepEqual(json, {});
    });
    it('should remove invalid query values', function () {
      var step = {
        event_collection: null,
        actor_property: 'user'
      };

      var json = FunnelUtils.stepJSON(step);
      assert.deepEqual(json, {actor_property: 'user'});
    });
    it('should call FilterUtils.queryJSON for every filter', function () {
      var step = { filters: [{}, {}, {}] };
      var stub = sinon.stub(FilterUtils, 'queryJSON');

      FunnelUtils.stepJSON(step);

      assert.lengthOf(stub.getCalls(), 3);
      FilterUtils.queryJSON.restore();
    });
  });
});
