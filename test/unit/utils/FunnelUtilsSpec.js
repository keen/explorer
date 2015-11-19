var assert = require('chai').assert;
var sinon = require('sinon');
var FilterUtils = require('../../../client/js/app/utils/FilterUtils');
var FunnelUtils = require('../../../client/js/app/utils/FunnelUtils');
var TimeframeUtils = require('../../../client/js/app/utils/TimeframeUtils');

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

  describe('formatQueryParams', function () {
    it('should call unpackTimeframeParam if there is a timeframe', function () {
      var stub = sinon.stub(TimeframeUtils, 'unpackTimeframeParam').returns({
        time: {
          relativity: 'this',
          amount: '1',
          sub_timeframe: 'days'
        }
      });

      var formatted = FunnelUtils.formatQueryParams({timeframe: 'this_1_days'});

      assert.isTrue(stub.calledOnce);
      TimeframeUtils.unpackTimeframeParam.restore();
    });

    it('should call FilterUtils.formatFilterParams for each filter', function () {
      var stub = sinon.stub(FilterUtils, 'formatFilterParams').returns({
       property_name: 'user',
       operator: 'eq',
       property_value: 'John Doe'
      });

      FunnelUtils.formatQueryParams({filters: [{}, {}, {}]});

      assert.lengthOf(stub.getCalls(), 3);

      FilterUtils.formatFilterParams.restore(); 
    });
  });
});
