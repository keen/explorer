var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');
var moment = require('moment');
var _ = require('lodash');
var Qs = require('qs');
var TestHelpers = require('../../support/TestHelpers');
var ExplorerActions = require('../../../client/js/app/actions/ExplorerActions');
var FilterUtils = require('../../../client/js/app/utils/FilterUtils');
var ValidationUtils = require('../../../client/js/app/utils/ValidationUtils');
var ExplorerValidations = require('../../../client/js/app/validations/ExplorerValidations');
var ExplorerUtils = require('../../../client/js/app/utils/ExplorerUtils');

describe('utils/ExplorerUtils', function() {
  describe('extraction event limit', function () {
    it('should be 100', function () {
      assert.strictEqual(ExplorerUtils.EXRACTION_EVENT_LIMIT, 100);
    });
  });

  describe('queryJSON', function () {
    it('should remove values that are not part of the query params that get sent to Keen', function () {
      var explorer = {
        query: {
          someVal: 'shouldBeRemoved',
          someOtherVal: 'shouldAlsoBeRemoved',
          event_collection: 'sholdRemain',
          analysis_type: 'shouldRemain'
        }
      };
      assert.deepEqual(ExplorerUtils.queryJSON(explorer), {
        event_collection: 'sholdRemain',
        analysis_type: 'shouldRemain'
      });
    });
    it('should remove the timezone if the timeframe_type is absolute', function () {
      var explorer = {
        timeframe_type: 'absolute',
        query: {
          timezone: 'US/Mountain',
          time: {
            start: new Date("Jan 1, 2015 1:00 PM"),
            end: new Date("Jan 2, 2015 1:00 PM")
          }
        }
      };
      assert.notDeepProperty(ExplorerUtils.queryJSON(explorer), 'timezone');
    });
    it('should remove values that are not valid query values', function () {
      var explorer = {
        query: {
          event_collection: undefined,
          analysis_type: 'shouldRemain',
          filters: []
        }
      };
      assert.deepEqual(ExplorerUtils.queryJSON(explorer), {
        analysis_type: 'shouldRemain'
      });
    });
    it('should call FilterUtils.queryJSON for every filter', function () {
      var explorer = { query: { filters: [{}, {}, {}] } };
      var stub = sinon.stub(FilterUtils, 'queryJSON');
      ExplorerUtils.queryJSON(explorer);
      assert.lengthOf(stub.getCalls(), 3);
      FilterUtils.queryJSON.restore();
    });
    it('should remove empty filters', function () {
      var explorer = { 
        query: { 
          filters: [
            { 
              property_name: 'click',
              operator: 'eq',
              property_value: 'button',
              coercion_type: 'String'
            },
            {},
            {}
          ]
        }
      };
      var json = ExplorerUtils.queryJSON(explorer);
      assert.lengthOf(json.filters, 1);
    });
    it('should remove the fitlers key if it is empty after getting their queryJSON verisons', function () {
      var explorer = { 
        query: { 
          event_collection: 'click',
          analysis_type: 'count',
          filters: [
            {  property_name: 'click' },
            {},
            {}
          ]
        }
      };
      var json = ExplorerUtils.queryJSON(explorer);
      assert.isUndefined(json.filters);
    });
    it('should set the timeframe if there is one', function () {
      var explorer = { 
        timeframe_type: 'relative',
        query: { 
          event_collection: 'click',
          analysis_type: 'count',
          time: {
            relativity: 'this',
            amount: '1',
            sub_timeframe: 'days'
          }
        }
      };
      var json = ExplorerUtils.queryJSON(explorer);
      assert.deepEqual(json, {
        event_collection: 'click',
        analysis_type: 'count',
        timeframe: 'this_1_days'
      });
    });
  });

  describe('runQuery', function () {
    it('should create a Keen.Query', function () {
      var client = { run: sinon.spy() };
      var query = {
        analysis_type: 'count',
        event_collection: 'click'
      };
      ExplorerUtils.runQuery({
        client: client,
        query: query,
        success: function(){},
        error: function(){},
        complete: function(){}
      });
      assert.strictEqual(client.run.getCall(0).args[0].analysis, 'count');
      assert.deepEqual(client.run.getCall(0).args[0].params, {
        event_collection: 'click',
        timezone: (((new Date().getTimezoneOffset())/60)*60*60)*-1
      });
    });
  });

  describe('mergeResponseWithExplorer', function () {
    it('should keep all explorer attributes', function () {
      var explorer = {
        id: 'TEMP-ABC',
        name: 'SOME NAME',
        active: false,
        saving: false,
        error: null,
        result: null,
        loading: false,
        isValid: true,
        timeframe_type: 'relative',
        query: {
          event_collection: null,
          analysis_type: null,
          target_property: null,
          percentile: null,
          group_by: null,
          interval: null,
          timezone: 'UTC',
          filters: null,
          email: null,
          latest: null,
          filters: [],
          time: {
            relativity: 'this',
            amount: 1,
            sub_timeframe: 'weeks'
          }
        },
        visualization: {
          chart_type: null
        }
      };
      var response = {
        id: 'ACTUAL-ID',
        project_id: '10',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count',
        },
        visualization: {
          chart_type: 'metric'
        }
      };
      assert.deepEqual(ExplorerUtils.mergeResponseWithExplorer(explorer, response), {
        id: 'ACTUAL-ID',
        project_id: '10',
        name: 'SOME NAME',
        active: false,
        saving: false,
        error: null,
        result: null,
        loading: false,
        isValid: true,
        timeframe_type: 'relative',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count',
          target_property: null,
          percentile: null,
          group_by: null,
          interval: null,
          timezone: 'UTC',
          filters: null,
          email: null,
          latest: null,
          filters: [],
          time: {
            relativity: 'this',
            amount: 1,
            sub_timeframe: 'weeks'
          }
        },
        visualization: {
          chart_type: 'metric'
        }
      });
    });
  });

  describe('getTimeframe', function () {
    it('should call the right timeframe builder for absolute timeframes', function () {
      var explorer = {
        timeframe_type: 'absolute'
      };
      var stub = sinon.stub(ExplorerUtils.timeframeBuilders, 'absolute_timeframe');
      ExplorerUtils.getTimeframe(explorer);
      assert.isTrue(stub.calledOnce);
      ExplorerUtils.timeframeBuilders.absolute_timeframe.restore();
    });
    it('should call the right timeframe builder for relative timeframes', function () {
      var explorer = {
        timeframe_type: 'relative'
      };
      var stub = sinon.stub(ExplorerUtils.timeframeBuilders, 'relative_timeframe');
      ExplorerUtils.getTimeframe(explorer);
      assert.isTrue(stub.calledOnce);
      ExplorerUtils.timeframeBuilders.relative_timeframe.restore();
    });
  });

  describe('timeframeBuilders', function () {
    describe('absolute_timeframe', function () {
      it('should properly build a timeframe object', function () {
        var explorer = {
          timeframe_type: 'absolute',
          query: {
            timezone: 'US/Hawaii',
            time: {
              start: new Date(moment().subtract(1, 'days').startOf('day').format()),
              end: new Date(moment().startOf('day').format())
            }
          }
        };
        var timeframe = ExplorerUtils.getTimeframe(explorer);
        var expectedFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
        var expectedTimezone = '-10:00'
        var expectedStart = moment(new Date(explorer.query.time.start)).format(expectedFormat) + expectedTimezone;
        var expectedEnd = moment(new Date(explorer.query.time.end)).format(expectedFormat) + expectedTimezone;
        
        assert.deepEqual(timeframe, {
          start: expectedStart,
          end: expectedEnd
        });
      });
    });
    describe('relative_timeframe', function () {
      var explorer = {
        timeframe_type: 'relative',
        query: {
          time: {
            relativity: 'this',
            amount: '1',
            sub_timeframe: 'days'
          }
        }
      };
      var timeframe = ExplorerUtils.getTimeframe(explorer);
      assert.deepEqual(timeframe, 'this_1_days');
    });
  });

  describe('unpackTimeframeParam', function () {
    it('properly unpacks an absolute timeframe', function () {
      var query = {
        timeframe: {
          start: moment(new Date("June 7, 2015 1:00 PM")).format('YYYY-MM-DDTHH:mm:ss.SSS')+"-10:00",
          end: moment(new Date("June 8, 2015 2:00 PM")).format('YYYY-MM-DDTHH:mm:ss.SSS')+"-10:00"
        }
      };
      assert.deepEqual(ExplorerUtils.unpackTimeframeParam(query), {
        timeframe_type: 'absolute',
        timezone: 'US/Hawaii',
        time: {
          start: ExplorerUtils.convertDateToUTC(new Date(moment(new Date("June 7, 2015 1:00 PM")).format('YYYY-MM-DDTHH:mm:ss.SSS'))),
          end: ExplorerUtils.convertDateToUTC(new Date(moment(new Date("June 8, 2015 2:00 PM")).format('YYYY-MM-DDTHH:mm:ss.SSS')))
        }
      });
    });
    it('properly unpacks a relative timeframe', function () {
      var query = { timeframe: 'this_8_days' };
      var unpacked = ExplorerUtils.unpackTimeframeParam(query);
      assert.deepEqual(unpacked, {
        timeframe_type: 'relative',
        time: {
          relativity: 'this',
          amount: '8',
          sub_timeframe: 'days'
        }
      });
    });
  });
  describe('formatQueryParams', function () {
    it('should call unpackTimeframeParam if there is a timeframe', function () {
      var params = {
        query: {
          timeframe: 'this_1_days'
        }
      };
      var stub = sinon.stub(ExplorerUtils, 'unpackTimeframeParam').returns({
        time: {
          relativity: 'this',
          amount: '1',
          sub_timeframe: 'days'
        },
        timeframe_type: 'relative'
      });
      var formatted = ExplorerUtils.formatQueryParams(params);
      assert.isTrue(stub.calledOnce);
      ExplorerUtils.unpackTimeframeParam.restore();
    });
    it('should call FilterUtils.initList for list filters', function () {
      var stub = sinon.stub(FilterUtils, 'initList');
      var params = {
        query: {
          filters: [
            {
              coercion_type: 'List',
              property_name: 'items',
              operator: 'eq',
              property_value: 'a list of items'
            }
          ]
        }
      };
      ExplorerUtils.formatQueryParams(params);
      assert.isTrue(stub.calledOnce);
      FilterUtils.initList.restore();
    });
    it('should call FilterUtils.getCoercedValue for every filter', function () {
      var stub = sinon.stub(FilterUtils, 'getCoercedValue');
      var params = {
        query: {
          filters: [{}, {}, {}]
        }
      };
      ExplorerUtils.formatQueryParams(params);
      assert.strictEqual(stub.callCount, 3);
      FilterUtils.getCoercedValue.restore();
    });
  });

  describe('getApiQueryUrl', function(){
    beforeEach(function(){
      this.explorer = _.assign({}, TestHelpers.createExplorerModel(), {
        timeframe_type: 'relative',
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

    describe('removes unneeded attributes from the URL string', function(){
      it('analysis_type', function(){
        var found = ExplorerUtils.getApiQueryUrl(this.client, this.explorer).match('analysis_type=');
        assert.isNull(found);
      });
      it('chart_type', function(){
        var found = ExplorerUtils.getApiQueryUrl(this.client, this.explorer).match('chart_type=');
        assert.isNull(found);
      });
    });

    describe('it constructs the URL correctly', function(){
      it('has the timeframe attribute', function(){
        var found = ExplorerUtils.getApiQueryUrl(this.client, this.explorer).match('timeframe=this_1_days');
        assert.lengthOf(found, 1);
      });

      describe('filters', function () {
        it('has the expected filters attribute', function () {
          assert.include(ExplorerUtils.getApiQueryUrl(this.client, this.explorer), "filters=%5B%7B%22property_name%22%3A%22author.id%22%2C%22operator%22%3A%22eq%22%2C%22property_value%22%3A%22abc123%22%7D%2C%7B%22property_name%22%3A%22org_project_count%22%2C%22operator%22%3A%22gte%22%2C%22property_value%22%3A10%7D%5D");
        });
        it('does not have the coercion_type property', function () {
          assert.notInclude(ExplorerUtils.getApiQueryUrl(this.client, this.explorer), "coercion_type");
        });
      });
    });
  });

  describe('getSdkExample', function(){

    beforeEach(function () {
      this.explorer = TestHelpers.createExplorerModel();
      this.client = TestHelpers.createClient();
    });

    describe('removes unneeded attributes from the URL string', function(){
      beforeEach(function(){
        this.explorer.query = {
          analysis_type: 'count',
          event_collection: 'clicks',
          timeframe: 'this_1_days',
          visualization: {
            chart_type: 'metric'
          }
        };
      });

      it('analysis_type', function(){
        var found = ExplorerUtils.getSdkExample(this.explorer, this.client).match('analysis_type');
        assert.isNull(found)
      });

      it('chart_type', function(){
        var found = ExplorerUtils.getSdkExample(this.explorer, this.client).match('chart_type');
        assert.isNull(found)
      });

    });

    describe('it constructs the example correctly', function(){

      it('has the timeframe attribute', function(){
        this.explorer = {
          timeframe_type: 'relative',
          query: {
            analysis_type: 'count',
            event_collection: 'clicks',
            timeframe: 'this_1_days',
            time: {
              relativity: 'this',
              amount: '1',
              sub_timeframe: 'days'
            }
          },
          visualization: {
            chart_type: 'metric'
          }
        };
        var found = ExplorerUtils.getSdkExample(this.explorer, this.client).match('timeframe: "this_1_days"');
        assert.lengthOf(found, 1);
      });

    })

  });
});