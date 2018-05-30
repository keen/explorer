
let sinon from 'sinon/pkg/sinon.js');
var moment from 'moment');
var KeenAnalysis from 'keen-analysis');
var _ from 'lodash');
var Qs from 'qs');
var TestHelpers from '../../support/TestHelpers');
var ExplorerActions from '../../../lib/js/app/actions/ExplorerActions');
var ExplorerUtils from '../../../lib/js/app/utils/ExplorerUtils');
var FilterUtils from '../../../lib/js/app/utils/FilterUtils');
var FunnelUtils from '../../../lib/js/app/utils/FunnelUtils');
var TimeframeUtils from '../../../lib/js/app/utils/TimeframeUtils');
var RunValidations from '../../../lib/js/app/utils/RunValidations');
var ExplorerValidations from '../../../lib/js/app/validations/ExplorerValidations')

describe('utils/ExplorerUtils', () => {
  describe('extraction event limit', () => {
    it('should be 100', () => {
      assert.strictEqual(ExplorerUtils.EXRACTION_EVENT_LIMIT, 100);
    });
  });

  describe('shouldHaveTarget', () => {
    it('should return false if the analysis_type is null', () => {
      var explorer = { query: { analysis_type: null } };
      assert.isFalse(ExplorerUtils.shouldHaveTarget(explorer));
    });
    it('should return false if the analysis_type is undefined', () => {
      var explorer = { query: {} };
      assert.isFalse(ExplorerUtils.shouldHaveTarget(explorer));
    });
    it('should return false if the analysis_type is not in the required types', () => {
      var explorer = { query: { analysis_type: 'count' } };
      assert.isFalse(ExplorerUtils.shouldHaveTarget(explorer));
    });
    it('should return false if the analysis_type in the required types', () => {
      var explorer = { query: { analysis_type: 'count_unique' } };
      assert.isTrue(ExplorerUtils.shouldHaveTarget(explorer));
    });
  });

  describe('queryJSON', () => {
    it('should remove values that are not part of the query params that get sent to Keen', () => {
      var explorer = {
        query: {
          someVal: 'shouldBeRemoved',
          someOtherVal: 'shouldAlsoBeRemoved',
          event_collection: 'sholdRemain',
          analysis_type: 'shouldRemain',
          timezone: 'US/Pacific'
        }
      };
      assert.deepEqual(ExplorerUtils.queryJSON(explorer), {
        event_collection: 'sholdRemain',
        analysis_type: 'shouldRemain',
        timezone: 'US/Pacific'
      });
    });
    it('should keep the timezone even if the timeframe type is absolute', () => {
      var explorer = {
        query: {
          timezone: 'US/Mountain',
          time: {
            start: new Date("Jan 1, 2015 1:00 PM"),
            end: new Date("Jan 2, 2015 1:00 PM")
          }
        }
      };
      assert.deepPropertyVal(ExplorerUtils.queryJSON(explorer), 'timezone', 'US/Mountain');
    });
    it('should remove values that are not valid query values', () => {
      var explorer = {
        query: {
          event_collection: undefined,
          analysis_type: 'shouldRemain',
          timezone: 'UTC',
          filters: []
        }
      };
      assert.deepEqual(ExplorerUtils.queryJSON(explorer), {
        analysis_type: 'shouldRemain',
        timezone: 'UTC'
      });
    });
    it('should call FilterUtils.queryJSON for every filter', () => {
      var explorer = { query: { filters: [{}, {}, {}] } };
      var stub = sinon.stub(FilterUtils, 'queryJSON');
      ExplorerUtils.queryJSON(explorer);
      assert.lengthOf(stub.getCalls(), 3);
      FilterUtils.queryJSON.restore();
    });
    it('should call FunnelUtils.stepJSON for every step', () => {
      var explorer = { query: { steps: [{}, {}, {}] } };
      var stub = sinon.stub(FunnelUtils, 'stepJSON');
      ExplorerUtils.queryJSON(explorer);
      assert.lengthOf(stub.getCalls(), 3);
      FunnelUtils.stepJSON.restore();
    });
    it('should remove empty filters', () => {
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
    it('should remove the fitlers key if it is empty after getting their queryJSON verisons', () => {
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
    it('should set the timeframe if there is one', () => {
      var explorer = {
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
        timeframe: 'this_1_days',
        timezone: 'UTC'
      });
    });
    it('should set the latest property to the EXRACTION_EVENT_LIMIT constant if the query is a synchronous extraction', () => {
      var explorer = {
        query: {
          analysis_type: 'extraction',
          event_collection: 'click',
          timezone: 'UTC'
        }
      };
      var json = ExplorerUtils.queryJSON(explorer);
      assert.deepEqual(json, {
        event_collection: 'click',
        analysis_type: 'extraction',
        latest: ExplorerUtils.EXRACTION_EVENT_LIMIT,
        timezone: 'UTC'
      });
    });
    it('should not call getTimeParameters on the root query if the analysis type is funnel', () => {
      var stub = sinon.stub(TimeframeUtils, 'getTimeParameters');
      var explorer = {
        query: {
          analysis_type: 'funnel'
        }
      };
      var json = ExplorerUtils.queryJSON(explorer);
      assert.isFalse(stub.called);
      TimeframeUtils.getTimeParameters.restore();
    });
  });

  describe('toJSON', () => {
    it('should set the refresh_rate to 0 if the analysis_type is extraction', () => {
      var explorer = {
        refresh_rate: 1440,
        query: {
          event_collection: 'click',
          analysis_type: 'extraction',
          time: {
            relativity: 'this',
            amount: '1',
            sub_timeframe: 'days'
          },
          timezone: 'UTC'
        }
      };
      assert.deepEqual(ExplorerUtils.toJSON(explorer), {
        query: {
          event_collection: 'click',
          analysis_type: 'extraction',
          timeframe: 'this_1_days',
          timezone: 'UTC',
          latest: 100
        },
        refresh_rate: 0
      });
    });
  });

  describe('cleanJSONforSave', () => {
    it('should remove the email field from extraction queries', () => {
      var explorer = {
        query: {
          analysis_type: 'extraction',
          property_names: ['a', 'b', 'c'],
          latest: 500,
          email: 'eric@keen.io'
        }
      };
      var result = ExplorerUtils.cleanJSONforSave(explorer);
      assert.strictEqual(result.query.email, undefined);
    });
    it('should remove the property_names field from extraction queries', () => {
      var explorer = {
        query: {
          analysis_type: 'extraction',
          property_names: ['a', 'b', 'c'],
          latest: 500,
          email: 'eric@keen.io'
        }
      };
      var result = ExplorerUtils.cleanJSONforSave(explorer);
      assert.strictEqual(result.query.property_names, undefined);
    });
    it('should set the latest field to the right value for extraction queries', () => {
      var explorer = {
        query: {
          analysis_type: 'extraction',
          property_names: ['a', 'b', 'c'],
          latest: 500,
          email: 'eric@keen.io'
        }
      };
      var result = ExplorerUtils.cleanJSONforSave(explorer);
      assert.strictEqual(result.query.latest, 100);
    });
  });

  describe('resultCanBeVisualized', () => {
    it('should return true if the value is the number 0', () => {
      var explorer = {
        response: {
          result: 0
        }
      };
      assert.isTrue(ExplorerUtils.resultCanBeVisualized(explorer));
    });
  });

  describe('mergeResponseWithExplorer', () => {
    it('should keep all explorer attributes', () => {
      var explorer = {
        id: 'TEMP-ABC',
        query_name: 'some-query-name',
        active: false,
        saving: false,
        isValid: true,
        errors: [],
        result: null,
        loading: false,
        query: {
          event_collection: null,
          analysis_type: null,
          target_property: null,
          percentile: null,
          group_by: null,
          interval: null,
          timezone: 'UTC',
          email: null,
          latest: null,
          filters: [],
          steps: [],
          time: {
            relativity: 'this',
            amount: 1,
            sub_timeframe: 'weeks'
          }
        },
        metadata: {
          display_name: null,
          visualization: {
            chart_type: null
          }
        }
      };
      var response = {
        query_name: 'some-query-name',
        project_id: '10',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count',
        },
        metadata: {
          visualization: {
            chart_type: 'metric'
          }
        }
      };
      var expectedExplorer = {
        id: 'some-query-name',
        project_id: '10',
        query_name: 'some-query-name',
        active: false,
        saving: false,
        result: null,
        loading: false,
        isValid: true,
        errors: [],
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
          steps: [],
          time: {
            relativity: 'this',
            amount: 1,
            sub_timeframe: 'weeks'
          }
        },
        metadata: {
          display_name: 'some-query-name',
          visualization: {
            chart_type: 'metric'
          }
        }
      };
      expectedExplorer.originalModel = _.cloneDeep(expectedExplorer);
      assert.deepEqual(ExplorerUtils.mergeResponseWithExplorer(explorer, response), expectedExplorer);
    });
  });

  describe('formatQueryParams', () => {
    it('should call FunnelUtils.formatQueryParams for each step', () => {
      var stub = sinon.stub(FunnelUtils, 'formatQueryParams').returns({});

      ExplorerUtils.formatQueryParams({query: { steps: [{}, {}, {}]} });

      assert.lengthOf(stub.getCalls(), 3);

      FunnelUtils.formatQueryParams.restore();
    });
    it('should call unpackTimeframeParam if there is a timeframe', () => {
      var params = {
        query: {
          timeframe: 'this_1_days'
        }
      };
      var stub = sinon.stub(TimeframeUtils, 'unpackTimeframeParam').returns({
        time: {
          relativity: 'this',
          amount: '1',
          sub_timeframe: 'days'
        }
      });
      var formatted = ExplorerUtils.formatQueryParams(params);
      assert.isTrue(stub.calledOnce);
      TimeframeUtils.unpackTimeframeParam.restore();
    });
    it('should call FilterUtils.initList for list filters', () => {
      var stub = sinon.stub(FilterUtils, 'initList');
      var params = {
        query: {
          filters: [
            {
              property_name: 'items',
              operator: 'eq',
              property_value: '"a", "list", "of", "items"'
            }
          ]
        }
      };
      ExplorerUtils.formatQueryParams(params);
      assert.isTrue(stub.calledOnce);
      FilterUtils.initList.restore();
    });
    it('should call FilterUtils.getCoercedValue for every filter', () => {
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
    describe('unpacking filters', () => {
      it('should properly unpack Boolean filters', () => {
        var params = {
          query: {
            filters: [{
              property_name: 'is_admin',
              operator: 'eq',
              property_value: true
            }]
          }
        };
        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.strictEqual(formattedParams.query.filters[0].property_value, true);
      });
      it('should properly unpack List filters', () => {
        var params = {
          query: {
            filters: [{
              property_name: 'is_admin',
              operator: 'eq',
              property_value: [1, 2, 3]
            }]
          }
        };
        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.strictEqual(formattedParams.query.filters[0].property_value, "'1', '2', '3'");
      });
      it('should properly unpack String filters', () => {
        var params = {
          query: {
            filters: [{
              property_name: 'is_admin',
              operator: 'eq',
              property_value: 'a name'
            }]
          }
        };
        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.strictEqual(formattedParams.query.filters[0].property_value, "a name");
      });
      it('should properly unpack List filters', () => {
        var params = {
          query: {
            filters: [{
              property_name: 'is_admin',
              operator: 'eq',
              property_value: ["this, right here", "is", "a", "list", 1, 2, 3, 4]
            }]
          }
        };
        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.strictEqual(formattedParams.query.filters[0].property_value, '"this, right here", "is", "a", "list", \'1\', \'2\', \'3\', \'4\'');
      });
      it('should properly unpack Datetime filters', () => {
        var params = {
          query: {
            filters: [{
              property_name: 'is_admin',
              operator: 'eq',
              property_value: "2015-05-03T10:00:00.000"
            }]
          }
        };
        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.strictEqual(formattedParams.query.filters[0].property_value, "2015-05-03T10:00:00.000");
      });
      it('should create arrays out of string group_by properties', () => {
        var params = {
          query: {
            group_by: 'string value'
          }
        };
        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.sameMembers(formattedParams.query.group_by, ['string value']);
      });
    });
    describe('opening a query created via API', () => {
      it('should create a metadata object if it is null', () => {
        var params = {
          "refresh_rate": 28800,
          "query_name": "actually-i-need-11",
          "query": {
            "target_property": "price",
            "event_collection": "purchases",
            "filters": [],
            "interval": null,
            "group_by": null,
            "analysis_type": "sum",
            "timezone": "US/Pacific",
            "timeframe": "this_14_days"
          },
          "metadata": null
        };

        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.isObject(formattedParams.metadata, 'Metadata object is missing');
      });
      it('should create a display name if it does not exist', () => {
        var params = {
          "refresh_rate": 28800,
          "query_name": "actually-i-need-11",
          "urls": {
            "cached_query_url": "/3.0/projects/593ffe1ac9e77c0001ee3719/queries/saved/actually-i-need-11",
            "cached_query_results_url": "/3.0/projects/593ffe1ac9e77c0001ee3719/queries/saved/actually-i-need-11/result"
          },
          "query": {
            "target_property": "price",
            "event_collection": "purchases",
            "filters": [],
            "interval": null,
            "group_by": null,
            "analysis_type": "sum",
            "timezone": "US/Pacific",
            "timeframe": "this_14_days"
          },
          "metadata": {
          }
        };

        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.equal(formattedParams.metadata.display_name, params.query_name, 'Display name not set');
      });
      it('should create a display name if it is null', () => {
        var params = {
          "refresh_rate": 28800,
          "query_name": "actually-i-need-11",
          "urls": {
            "cached_query_url": "/3.0/projects/593ffe1ac9e77c0001ee3719/queries/saved/actually-i-need-11",
            "cached_query_results_url": "/3.0/projects/593ffe1ac9e77c0001ee3719/queries/saved/actually-i-need-11/result"
          },
          "query": {
            "target_property": "price",
            "event_collection": "purchases",
            "filters": [],
            "interval": null,
            "group_by": null,
            "analysis_type": "sum",
            "timezone": "US/Pacific",
            "timeframe": "this_14_days"
          },
          "metadata": {
            "display_name": null
          }
        };

        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.equal(formattedParams.metadata.display_name, params.query_name, 'Display name not set');
      });
      it('should not overwrite the display name if it already exists', () => {
        var params = {
          "refresh_rate": 28800,
          "query_name": "actually-i-need-11",
          "urls": {
            "cached_query_url": "/3.0/projects/593ffe1ac9e77c0001ee3719/queries/saved/actually-i-need-11",
            "cached_query_results_url": "/3.0/projects/593ffe1ac9e77c0001ee3719/queries/saved/actually-i-need-11/result"
          },
          "query": {
            "target_property": "price",
            "event_collection": "purchases",
            "filters": [],
            "interval": null,
            "group_by": null,
            "analysis_type": "sum",
            "timezone": "US/Pacific",
            "timeframe": "this_14_days"
          },
          "metadata": {
            "display_name": "Actually I need 11"
          }
        };

        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.equal(formattedParams.metadata.display_name, 'Actually I need 11', 'Display name was overwritten');
      });
      it('should create a chart_type property equal metric if one does not exist and interval is not defined', () => {
        var params = {
          "refresh_rate": 28800,
          "query_name": "actually-i-need-11",
          "urls": {
            "cached_query_url": "/3.0/projects/593ffe1ac9e77c0001ee3719/queries/saved/actually-i-need-11",
            "cached_query_results_url": "/3.0/projects/593ffe1ac9e77c0001ee3719/queries/saved/actually-i-need-11/result"
          },
          "query": {
            "target_property": "price",
            "event_collection": "purchases",
            "filters": [],
            "interval": null,
            "group_by": null,
            "analysis_type": "sum",
            "timezone": "US/Pacific",
            "timeframe": "this_14_days"
          },
          "metadata": {
            "visualization": {
            },
            "display_name": "Actually I need 11"
          }
        };

        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.equal(formattedParams.metadata.visualization.chart_type, 'metric', 'Chart type not set');
      });
      it('should create a chart_type property equal area if one does not exist and interval is defined', () => {
        var params = {
          "refresh_rate": 28800,
          "query_name": "actually-i-need-11",
          "urls": {
            "cached_query_url": "/3.0/projects/593ffe1ac9e77c0001ee3719/queries/saved/actually-i-need-11",
            "cached_query_results_url": "/3.0/projects/593ffe1ac9e77c0001ee3719/queries/saved/actually-i-need-11/result"
          },
          "query": {
            "target_property": "price",
            "event_collection": "purchases",
            "filters": [],
            "interval": "daily",
            "group_by": null,
            "analysis_type": "sum",
            "timezone": "US/Pacific",
            "timeframe": "this_14_days"
          },
          "metadata": {
            "visualization": {
            },
            "display_name": "Actually I need 11"
          }
        };

        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.equal(formattedParams.metadata.visualization.chart_type, 'area', 'Chart type not set');
      });
      it('should not overwrite a chart_type that already exists', () => {
        var params = {
          "refresh_rate": 28800,
          "query_name": "actually-i-need-11",
          "urls": {
            "cached_query_url": "/3.0/projects/593ffe1ac9e77c0001ee3719/queries/saved/actually-i-need-11",
            "cached_query_results_url": "/3.0/projects/593ffe1ac9e77c0001ee3719/queries/saved/actually-i-need-11/result"
          },
          "query": {
            "target_property": "price",
            "event_collection": "purchases",
            "filters": [],
            "interval": null,
            "group_by": null,
            "analysis_type": "sum",
            "timezone": "US/Pacific",
            "timeframe": "this_14_days"
          },
          "metadata": {
            "visualization": {
              "chart_type": "line"
            },
            "display_name": "Actually I need 11"
          }
        };

        var formattedParams = ExplorerUtils.formatQueryParams(params);
        assert.equal(formattedParams.metadata.visualization.chart_type, 'line', 'Chart type was overwritten');
      });
    });
  });

  describe('getApiQueryUrl', () => {
    beforeEach(() => {
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
      this.client = new KeenAnalysis(TestHelpers.createClient());
    });

    describe('removes unneeded attributes from the URL string', () => {
      it('analysis_type', () => {
        var found = ExplorerUtils.getApiQueryUrl(this.client, this.explorer).match('analysis_type=');
        assert.isNull(found);
      });
      it('chart_type', () => {
        var found = ExplorerUtils.getApiQueryUrl(this.client, this.explorer).match('chart_type=');
        assert.isNull(found);
      });
    });

    describe('it constructs the URL correctly', () => {
      it('properly constructs a URL with an absolute timeframe', () => {
        this.explorer.query.time = {
          start: new Date(),
          end: new Date()
        }
        var found = ExplorerUtils.getApiQueryUrl(this.client, this.explorer).match(/timeframe/ig);
        assert.lengthOf(found, 1);
      });

      it('has the timeframe attribute', () => {
        var found = ExplorerUtils.getApiQueryUrl(this.client, this.explorer).match(/timeframe=this_1_days/ig);
        assert.lengthOf(found, 1);
      });

      it('should properly JSON stringify the group_by property if it is a multiple item array', () => {
        this.explorer.query.group_by = ['user.name', 'product.id'];
        var url = ExplorerUtils.getApiQueryUrl(this.client, this.explorer);
        var encodedValue = encodeURIComponent(JSON.stringify(['user.name', 'product.id']));
        assert.isTrue(url.match(encodedValue).length === 1);
      });

      it('should not JSON stringify the group_by property if it is a single item array', () => {
        this.explorer.query.group_by = ['user.name'];
        var url = ExplorerUtils.getApiQueryUrl(this.client, this.explorer);
        var arrayEncodedValue = encodeURIComponent(JSON.stringify(['user.name']));
        var encodedValue = encodeURIComponent('user.name');
        assert.strictEqual(url.match(arrayEncodedValue), null);
        assert.isTrue(url.match(encodedValue).length === 1);
      });

      describe('filters', () => {
        it('has the expected filters attribute', () => {
          assert.include(ExplorerUtils.getApiQueryUrl(this.client, this.explorer), "filters=%5B%7B%22property_name%22%3A%22author.id%22%2C%22operator%22%3A%22eq%22%2C%22property_value%22%3A%22abc123%22%7D%2C%7B%22property_name%22%3A%22org_project_count%22%2C%22operator%22%3A%22gte%22%2C%22property_value%22%3A10%7D%5D");
        });
        it('does not have the coercion_type property', () => {
          assert.notInclude(ExplorerUtils.getApiQueryUrl(this.client, this.explorer), "coercion_type");
        });
      });

      describe('steps', () => {

        beforeEach(() => {
          this.explorer.query = {
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
          };
        });

        it('has the expected steps attribute', () => {
          assert.include(ExplorerUtils.getApiQueryUrl(this.client, this.explorer), "&steps=%5B%7B%22")
        });

        it('does not have a separate query param for each step', () => {
          assert.notInclude(ExplorerUtils.getApiQueryUrl(this.client, this.explorer), encodeURIComponent("steps[0]"));
        });

        it('has the expected steps attribute', () => {
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
          var expectedURLcomponent = 'steps=' + encodeURIComponent(JSON.stringify([{
            event_collection: 'signups',
            actor_property: 'user',
            timezone: 'US/Hawaii',
            timeframe: 'this_1_days'
          }]));
          assert.include(ExplorerUtils.getApiQueryUrl(this.client, explorer), expectedURLcomponent);
        });

        it('does not have a separate query param for each step', () => {
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
          assert.notInclude(ExplorerUtils.getApiQueryUrl(this.client, explorer), encodeURIComponent("steps[0]"));
        });

      });

    });
  });

  describe('getSdkExample', () => {

    beforeEach(() => {
      this.explorer = TestHelpers.createExplorerModel();
      this.client = new KeenAnalysis(TestHelpers.createClient());
    });

    describe('removes unneeded attributes from the URL string', () => {
      beforeEach(() => {
        this.explorer.query = {
          analysis_type: 'count',
          event_collection: 'clicks',
          timeframe: 'this_1_days',
          visualization: {
            chart_type: 'metric'
          }
        };
      });

      it('analysis_type', () => {
        var found = ExplorerUtils.getSdkExample(this.explorer, this.client).match('analysis_type');
        assert.isNull(found)
      });

      it('chart_type', () => {
        var found = ExplorerUtils.getSdkExample(this.explorer, this.client).match('chart_type');
        assert.isNull(found)
      });

    });

    describe('it constructs the example correctly', () => {

      it('has the timeframe attribute', () => {
        this.explorer = {
          refresh_rate: 0,
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

  describe('slugify', () => {
    it('it creates a slug using query name', () => {
      var newName = ExplorerUtils.slugify('Saved Query name!*');

      assert.equal(newName, 'saved-query-name');
    });
  });
});
