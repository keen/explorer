import FilterUtils from '../../../lib/js/app/utils/FilterUtils';
import FunnelUtils from '../../../lib/js/app/utils/FunnelUtils';
import TimeframeUtils from '../../../lib/js/app/utils/TimeframeUtils';

describe('utils/FunnelUtils', () => {
  describe('stepJSON', () => {
    it('should remove unnecessary properties', () => {
      const step = {
        cool: 'dudes',
        timezone: 'UTC'
      }

      const json = FunnelUtils.stepJSON(step);
      expect(json).toEqual({ timezone: 'UTC' });
    });
    it('should remove invalid query values', () => {
      const step = {
        event_collection: null,
        actor_property: 'user',
        timezone: 'UTC'
      };

      const json = FunnelUtils.stepJSON(step);
      expect(json).toEqual({ actor_property: 'user', timezone: 'UTC' });
    });
    it('should call FilterUtils.queryJSON for every filter', () => {
      const step = { filters: [{}, {}, {}] };
      const stub = jest.spyOn(FilterUtils, 'queryJSON');

      FunnelUtils.stepJSON(step);

      expect(stub).toHaveBeenCalledTimes(3);
      stub.mockRestore();
    });
  });

  describe('formatQueryParams', () => {
    it('should call unpackTimeframeParam if there is a timeframe', () => {
      const stub = jest.spyOn(TimeframeUtils, 'unpackTimeframeParam').mockReturnValue({
        time: {
          relativity: 'this',
          amount: '1',
          sub_timeframe: 'days'
        }
      });

      const formatted = FunnelUtils.formatQueryParams({timeframe: 'this_1_days'});

      expect(stub).toHaveBeenCalledTimes(1);
      stub.mockRestore();
    });

    it('should call FilterUtils.formatFilterParams for each filter', () => {
      const stub = jest.spyOn(FilterUtils, 'formatFilterParams').mockReturnValue({
       property_name: 'user',
       operator: 'eq',
       property_value: 'John Doe'
      });

      FunnelUtils.formatQueryParams({filters: [{}, {}, {}]});

      expect(stub).toHaveBeenCalledTimes(3);

      stub.mockRestore();
    });

    describe('boolean value handling', () => {
      it('should properly format true boolean values from API for the "inverted" property', () => {
        const result = FunnelUtils.formatQueryParams({
          inverted: true
        });
        expect(result.inverted).toEqual(true);
      });

      it('should properly format string true as boolean values from API for the "inverted" property', () => {
        const result = FunnelUtils.formatQueryParams({
          inverted: "true"
        });
        expect(result.inverted).toEqual(true);
      });

      it('should properly format false boolean values from API for the "inverted" property', () => {
        const result = FunnelUtils.formatQueryParams({
          inverted: false
        });
        expect(result.inverted).toEqual(false);
      });

      it('should properly format string false as boolean values from API for the "inverted" property', () => {
        const result = FunnelUtils.formatQueryParams({
          inverted: "false"
        });
        expect(result.inverted).toEqual(false);
      });

      it('should properly format true boolean values from API for the "optional" property', () => {
        const result = FunnelUtils.formatQueryParams({
          optional: true
        });
        expect(result.optional).toEqual(true);
      });

      it('should properly format string true as boolean values from API for the "optional" property', () => {
        const result = FunnelUtils.formatQueryParams({
          optional: "true"
        });
        expect(result.optional).toEqual(true);
      });

      it('should properly format false boolean values from API for the "optional" property', () => {
        const result = FunnelUtils.formatQueryParams({
          optional: false
        });
        expect(result.optional).toEqual(false);
      });

      it('should properly format string false as boolean values from API for the "optional" property', () => {
        const result = FunnelUtils.formatQueryParams({
          optional: "false"
        });
        expect(result.optional).toEqual(false);
      });

      it('should properly format true boolean values from API for the "with_actors" property', () => {
        const result = FunnelUtils.formatQueryParams({
          with_actors: true
        });
        expect(result.with_actors).toEqual(true);
      });

      it('should properly format string true as boolean values from API for the "with_actors" property', () => {
        const result = FunnelUtils.formatQueryParams({
          with_actors: "true"
        });
        expect(result.with_actors).toEqual(true);
      });

      it('should properly format false boolean values from API for the "with_actors" property', () => {
        const result = FunnelUtils.formatQueryParams({
          with_actors: false
        });
        expect(result.with_actors).toEqual(false);
      });

      it('should properly format string false as boolean values from API for the "with_actors" property', () => {
        const result = FunnelUtils.formatQueryParams({
          with_actors: "false"
        });
        expect(result.with_actors).toEqual(false);
      });
    });
  });
});
