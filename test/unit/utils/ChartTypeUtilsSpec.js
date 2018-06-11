import ChartTypeUtils from '../../../lib/js/app/utils/ChartTypeUtils';

describe('utils/ChartTypeUtils', () => {
  describe('getQueryDataType', () => {
    it('returns "categorical" if there is a single item group_by array and no interval', () => {
      const query = {
        analysis_type: 'count',
        group_by: ['single.group_by']
      };
      expect(ChartTypeUtils.getQueryDataType(query)).toEqual('categorical');
    });

    it('returns "extraction" if query.analysis_type is extraction', () => {
      const query = {
        analysis_type: 'extraction'
      };

      expect(ChartTypeUtils.getQueryDataType(query)).toEqual('extraction');
    });

    it('returns "categorical" if is 2xGroupBy and no interval', () => {
      const query = {
        analysis_type: 'count',
        group_by: [
          'one',
          'two'
        ]
      };

      expect(ChartTypeUtils.getQueryDataType(query)).toEqual('categorical');
    });

    it('returns "cat-chronological" if is 2xGroupBy and there is an interval', () => {
      const query = {
        analysis_type: 'count',
        interval: 'daily',
        group_by: [
          'one',
          'two'
        ]
      };

      expect(ChartTypeUtils.getQueryDataType(query)).toEqual('cat-chronological');
    });
  });

  describe('getChartTypeOptions', () => {
    it('returns table as an option for cat-chronological types', () => {
      const query = {
        analysis_type: 'count',
        interval: 'daily'
      };

      expect(ChartTypeUtils.getChartTypeOptions(query).indexOf('table') > -1).toBe(true);
    });
  });
});
