var assert = require('chai').assert;
var TestHelpers = require('../../support/TestHelpers');
var _ = require('lodash');
var ApiQueryUrl = require('../../../client/js/app/modules/api_query_url.js');

describe('ApiQueryUrl', function() {
  beforeEach(function(){
    this.explorer = _.assign({}, TestHelpers.createExplorerModel(), {
      query: {
        analysis_type: 'count',
        event_collection: 'clicks',
        filters: [
        {
          property_name: 'author.id',
          operator: 'eq',
          property_value: 'abc123',
          coercion_type: 'String'
        },
        {
          property_name: 'org_project_count',
          operator: 'gte',
          property_value: 10,
          coercion_type: 'Number'
        },
        ],
        time: {
          relativity: 'this',
          amount: '1',
          sub_timeframe: 'days'
        }
      },
      visualization: {
        chart_type: 'metric'
      }
    });
    this.client = TestHelpers.createClient();
  });

  describe('URL string', function(){
    it('does not have analysis_type attribute', function(){
      var url = ApiQueryUrl(this.client, this.explorer);
      var found = url.match('analysis_type=');

      assert.isNull(found);
    });

    it('does not have chart_type attribute', function(){
      var url = ApiQueryUrl(this.client, this.explorer);
      var found = url.match('chart_type=');

      assert.isNull(found);
    });

    it('has the timeframe attribute', function(){
      var url = ApiQueryUrl(this.client, this.explorer);
      var found = url.match('timeframe=this_1_days');

      assert.lengthOf(found, 1);
    });

    it('should properly JSON stringify the group_by property if it is a multiple item array', function () {
      var explorer = TestHelpers.createExplorerModel();
      explorer.query.group_by = ['user.name', 'product.id'];
      var url = ApiQueryUrl(this.client, explorer);
      var encodedValue = encodeURIComponent(JSON.stringify(['user.name', 'product.id']));

      assert.isTrue(url.match(encodedValue).length === 1);
    });

    it('should not JSON stringify the group_by property if it is a single item array', function () {
      var explorer = TestHelpers.createExplorerModel();
      explorer.query.group_by = ['user.name'];
      var url = ApiQueryUrl(this.client, explorer);
      var arrayEncodedValue = encodeURIComponent(JSON.stringify(['user.name']));
      var encodedValue = encodeURIComponent('user.name');

      assert.strictEqual(url.match(arrayEncodedValue), null);
      assert.isTrue(url.match(encodedValue).length === 1);
    });

    describe('filters', function () {
      beforeEach(function() {
        this.url = ApiQueryUrl(this.client, this.explorer);
      });

      it('has the expected filters attribute', function () {
        assert.include(this.url, "filters=%5B%7B%22property_name%22%3A%22author.id%22%2C%22operator%22%3A%22eq%22%2C%22property_value%22%3A%22abc123%22%7D%2C%7B%22property_name%22%3A%22org_project_count%22%2C%22operator%22%3A%22gte%22%2C%22property_value%22%3A10%7D%5D");
      });

      it('does not have the coercion_type property', function () {
        assert.notInclude(this.url, "coercion_type");
      });
    });

    describe('steps', function () {
      var explorer = {
        query: {
          analysis_type: 'funnel',
          steps: [{
            event_collection: 'signups',
            actor_property: 'user',
            time: {
              relativity: 'this',
              amount: 1,
              sub_timeframe: 'days'
            },
            timezone: 'US/Hawaii'
          }]
        }
      };

      it('has the expected steps attribute', function () {
        var url = ApiQueryUrl(this.client, explorer);

        assert.include(url, "&steps=%5B%7B%22")
      })

      it('does not have a separate query param for each steop', function () {
        var apiQueryUrl = ApiQueryUrl(this.client, explorer);

        assert.notInclude(apiQueryUrl, encodeURIComponent("steps[0]"));
      })
    });
  });
});
