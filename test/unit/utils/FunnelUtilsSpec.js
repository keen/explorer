
let sinon from 'sinon/pkg/sinon.js');
var FilterUtils from '../../../lib/js/app/utils/FilterUtils');
var FunnelUtils from '../../../lib/js/app/utils/FunnelUtils');
var TimeframeUtils from '../../../lib/js/app/utils/TimeframeUtils');

describe('utils/FunnelUtils', () => {
  describe('stepJSON', () => {
    it('should remove unnecessary properties', () => {
      var step = {
        cool: 'dudes',
        timezone: 'UTC'
      }

      var json = FunnelUtils.stepJSON(step);
      assert.deepEqual(json, { timezone: 'UTC' });
    });
    it('should remove invalid query values', () => {
      var step = {
        event_collection: null,
        actor_property: 'user',
        timezone: 'UTC'
      };

      var json = FunnelUtils.stepJSON(step);
      assert.deepEqual(json, { actor_property: 'user', timezone: 'UTC' });
    });
    it('should call FilterUtils.queryJSON for every filter', () => {
      var step = { filters: [{}, {}, {}] };
      var stub = sinon.stub(FilterUtils, 'queryJSON');

      FunnelUtils.stepJSON(step);

      assert.lengthOf(stub.getCalls(), 3);
      FilterUtils.queryJSON.restore();
    });
  });

  describe('formatQueryParams', () => {
    it('should call unpackTimeframeParam if there is a timeframe', () => {
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

    it('should call FilterUtils.formatFilterParams for each filter', () => {
      var stub = sinon.stub(FilterUtils, 'formatFilterParams').returns({
       property_name: 'user',
       operator: 'eq',
       property_value: 'John Doe'
      });

      FunnelUtils.formatQueryParams({filters: [{}, {}, {}]});

      assert.lengthOf(stub.getCalls(), 3);

      FilterUtils.formatFilterParams.restore();
    });

    describe('boolean value handling', () => {
      it('should properly format true boolean values from API for the "inverted" property', () => {
        var result = FunnelUtils.formatQueryParams({
          inverted: true
        });
        assert.strictEqual(result.inverted, true);
      });

      it('should properly format string true as boolean values from API for the "inverted" property', () => {
        var result = FunnelUtils.formatQueryParams({
          inverted: "true"
        });
        assert.strictEqual(result.inverted, true);
      });

      it('should properly format false boolean values from API for the "inverted" property', () => {
        var result = FunnelUtils.formatQueryParams({
          inverted: false
        });
        assert.strictEqual(result.inverted, false);
      });

      it('should properly format string false as boolean values from API for the "inverted" property', () => {
        var result = FunnelUtils.formatQueryParams({
          inverted: "false"
        });
        assert.strictEqual(result.inverted, false);
      });

      it('should properly format true boolean values from API for the "optional" property', () => {
        var result = FunnelUtils.formatQueryParams({
          optional: true
        });
        assert.strictEqual(result.optional, true);
      });

      it('should properly format string true as boolean values from API for the "optional" property', () => {
        var result = FunnelUtils.formatQueryParams({
          optional: "true"
        });
        assert.strictEqual(result.optional, true);
      });

      it('should properly format false boolean values from API for the "optional" property', () => {
        var result = FunnelUtils.formatQueryParams({
          optional: false
        });
        assert.strictEqual(result.optional, false);
      });

      it('should properly format string false as boolean values from API for the "optional" property', () => {
        var result = FunnelUtils.formatQueryParams({
          optional: "false"
        });
        assert.strictEqual(result.optional, false);
      });

      it('should properly format true boolean values from API for the "with_actors" property', () => {
        var result = FunnelUtils.formatQueryParams({
          with_actors: true
        });
        assert.strictEqual(result.with_actors, true);
      });

      it('should properly format string true as boolean values from API for the "with_actors" property', () => {
        var result = FunnelUtils.formatQueryParams({
          with_actors: "true"
        });
        assert.strictEqual(result.with_actors, true);
      });

      it('should properly format false boolean values from API for the "with_actors" property', () => {
        var result = FunnelUtils.formatQueryParams({
          with_actors: false
        });
        assert.strictEqual(result.with_actors, false);
      });

      it('should properly format string false as boolean values from API for the "with_actors" property', () => {
        var result = FunnelUtils.formatQueryParams({
          with_actors: "false"
        });
        assert.strictEqual(result.with_actors, false);
      });
    });
  });
});
