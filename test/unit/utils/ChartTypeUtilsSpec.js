var assert = require('chai').assert;
var ChartTypeUtils = require('../../../client/js/app/utils/ChartTypeUtils');

describe('utils/ChartTypeUtils', function() {
  describe('getQueryDataType', function () {
    it('returns "categorical" if there is a single item group_by array and no interval', function () {
      var query = {
        analysis_type: 'count',
        group_by: ['single.group_by']
      };
      assert.strictEqual(ChartTypeUtils.getQueryDataType(query), 'categorical');
    });

    it('returns "extraction" if query.analysis_type is extraction', function() {
      var query = {
        analysis_type: 'extraction'
      };

      assert.strictEqual(ChartTypeUtils.getQueryDataType(query), 'extraction');
    });

    it('returns "categorical" if is 2xGroupBy and no interval', function() {
      var query = {
        analysis_type: 'count',
        group_by: [
          'one',
          'two'
        ]
      };

      assert.strictEqual(ChartTypeUtils.getQueryDataType(query), 'categorical');
    });

    it('returns "cat-chronological" if is 2xGroupBy and there is an interval', function() {
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

  describe('getChartTypeOptions', function () {
    it('returns table as an option for cat-chronological types', function () {
      var query = {
        analysis_type: 'count',
        interval: 'daily'
      };

      assert.isTrue(ChartTypeUtils.getChartTypeOptions(query).indexOf('table') > -1);
    });
  });
});
