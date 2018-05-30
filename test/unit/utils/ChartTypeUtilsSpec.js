
var ChartTypeUtils from '../../../lib/js/app/utils/ChartTypeUtils');

describe('utils/ChartTypeUtils', () => {
  describe('getQueryDataType', () => {
    it('returns "categorical" if there is a single item group_by array and no interval', () => {
      var query = {
        analysis_type: 'count',
        group_by: ['single.group_by']
      };
      assert.strictEqual(ChartTypeUtils.getQueryDataType(query), 'categorical');
    });

    it('returns "extraction" if query.analysis_type is extraction', () => {
      var query = {
        analysis_type: 'extraction'
      };

      assert.strictEqual(ChartTypeUtils.getQueryDataType(query), 'extraction');
    });

    it('returns "categorical" if is 2xGroupBy and no interval', () => {
      var query = {
        analysis_type: 'count',
        group_by: [
          'one',
          'two'
        ]
      };

      assert.strictEqual(ChartTypeUtils.getQueryDataType(query), 'categorical');
    });

    it('returns "cat-chronological" if is 2xGroupBy and there is an interval', () => {
      var query = {
        analysis_type: 'count',
        interval: 'daily',
        group_by: [
          'one',
          'two'
        ]
      };

      assert.strictEqual(ChartTypeUtils.getQueryDataType(query), 'cat-chronological');
    });
  });

  describe('getChartTypeOptions', () => {
    it('returns table as an option for cat-chronological types', () => {
      var query = {
        analysis_type: 'count',
        interval: 'daily'
      };

      assert.isTrue(ChartTypeUtils.getChartTypeOptions(query).indexOf('table') > -1);
    });
  });
});
