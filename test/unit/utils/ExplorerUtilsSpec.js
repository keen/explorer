import KeenAnalysis from 'keen-analysis';
import _ from 'lodash';
import Qs from 'qs';
import TestHelpers from '../../support/TestHelpers';
import ExplorerActions from '../../../lib/js/app/actions/ExplorerActions';
import ExplorerUtils from '../../../lib/js/app/utils/ExplorerUtils';
import FilterUtils from '../../../lib/js/app/utils/FilterUtils';
import FunnelUtils from '../../../lib/js/app/utils/FunnelUtils';
import TimeframeUtils from '../../../lib/js/app/utils/TimeframeUtils';
import RunValidations from '../../../lib/js/app/utils/RunValidations';
import ExplorerValidations from '../../../lib/js/app/validations/ExplorerValidations';

describe('utils/ExplorerUtils', () => {
  describe('extraction event limit', () => {
    it('should be 100', () => {
      expect(ExplorerUtils.EXRACTION_EVENT_LIMIT).toEqual(100);
    });
  });

  describe('shouldHaveTarget', () => {
    it('should return false if the analysis_type is null', () => {
      const explorer = { query: { analysis_type: null } };
      expect(ExplorerUtils.shouldHaveTarget(explorer)).toBe(false);
    });
    it('should return false if the analysis_type is undefined', () => {
      const explorer = { query: {} };
      expect(ExplorerUtils.shouldHaveTarget(explorer)).toBe(false);
    });
    it('should return false if the analysis_type is not in the required types', () => {
      const explorer = { query: { analysis_type: 'count' } };
      expect(ExplorerUtils.shouldHaveTarget(explorer)).toBe(false);
    });
    it('should return false if the analysis_type in the required types', () => {
      const explorer = { query: { analysis_type: 'count_unique' } };
      expect(ExplorerUtils.shouldHaveTarget(explorer)).toBe(true);
    });
  });

  describe('queryJSON', () => {
    it('should remove values that are not part of the query params that get sent to Keen', () => {
      const explorer = {
        query: {
          someVal: 'shouldBeRemoved',
          someOtherVal: 'shouldAlsoBeRemoved',
          event_collection: 'sholdRemain',
          analysis_type: 'shouldRemain',
          timezone: 'US/Pacific'
        }
      };
      expect(ExplorerUtils.queryJSON(explorer)).toEqual({
        event_collection: 'sholdRemain',
        analysis_type: 'shouldRemain',
        timezone: 'US/Pacific'
      });
    });
    it('should keep the timezone even if the timeframe type is absolute', () => {
      const explorer = {
        query: {
          timezone: 'US/Mountain',
          time: {
            start: new Date("Jan 1, 2015 1:00 PM"),
            end: new Date("Jan 2, 2015 1:00 PM")
          }
        }
      };
      expect(ExplorerUtils.queryJSON(explorer).timezone).toEqual('US/Mountain');
    });
    it('should remove values that are not valid query values', () => {
      const explorer = {
        query: {
          event_collection: undefined,
          analysis_type: 'shouldRemain',
          timezone: 'UTC',
          filters: []
        }
      };
      expect(ExplorerUtils.queryJSON(explorer)).toEqual({
        analysis_type: 'shouldRemain',
        timezone: 'UTC'
      });
    });
    it('should call FilterUtils.queryJSON for every filter', () => {
      const explorer = { query: { filters: [{}, {}, {}] } };
      const stub = jest.spyOn(FilterUtils, 'queryJSON');
      ExplorerUtils.queryJSON(explorer);
      expect(stub).toHaveBeenCalledTimes(3);
      stub.mockRestore();
    });
    it('should call FunnelUtils.stepJSON for every step', () => {
      const explorer = { query: { steps: [{}, {}, {}] } };
      const stub = jest.spyOn(FunnelUtils, 'stepJSON');
      ExplorerUtils.queryJSON(explorer);
      expect(stub).toHaveBeenCalledTimes(3);
      stub.mockRestore();
    });
    it('should remove empty filters', () => {
      const explorer = {
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
      const json = ExplorerUtils.queryJSON(explorer);
      expect(json.filters).toHaveLength(1);
    });
    it('should remove the fitlers key if it is empty after getting their queryJSON verisons', () => {
      const explorer = {
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
      const json = ExplorerUtils.queryJSON(explorer);
      expect(json.filters).toBe(undefined);
    });
    it('should set the timeframe if there is one', () => {
      const explorer = {
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
      const json = ExplorerUtils.queryJSON(explorer);
      expect(json).toEqual({
        event_collection: 'click',
        analysis_type: 'count',
        timeframe: 'this_1_days',
        timezone: 'UTC'
      });
    });
    it('should set the latest property to the EXRACTION_EVENT_LIMIT constant if the query is a synchronous extraction', () => {
      const explorer = {
        query: {
          analysis_type: 'extraction',
          event_collection: 'click',
          timezone: 'UTC'
        }
      };
      const json = ExplorerUtils.queryJSON(explorer);
      expect(json).toEqual({
        event_collection: 'click',
        analysis_type: 'extraction',
        latest: ExplorerUtils.EXRACTION_EVENT_LIMIT,
        timezone: 'UTC'
      });
    });
    it('should not call getTimeParameters on the root query if the analysis type is funnel', () => {
      const stub = jest.spyOn(TimeframeUtils, 'getTimeParameters');
      const explorer = {
        query: {
          analysis_type: 'funnel'
        }
      };
      const json = ExplorerUtils.queryJSON(explorer);
      expect(stub).not.toBeCalled();
      stub.mockRestore();
    });
  });

  describe('toJSON', () => {
    it('should set the refresh_rate to 0 if the analysis_type is extraction', () => {
      const explorer = {
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
      expect(ExplorerUtils.toJSON(explorer)).toEqual({
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
      const explorer = {
        query: {
          analysis_type: 'extraction',
          property_names: ['a', 'b', 'c'],
          latest: 500,
          email: 'eric@keen.io'
        }
      };
      const result = ExplorerUtils.cleanJSONforSave(explorer);
      expect(result.query.email).toEqual(undefined);
    });
    it('should remove the property_names field from extraction queries', () => {
      const explorer = {
        query: {
          analysis_type: 'extraction',
          property_names: ['a', 'b', 'c'],
          latest: 500,
          email: 'eric@keen.io'
        }
      };
      const result = ExplorerUtils.cleanJSONforSave(explorer);
      expect(result.query.property_names).toEqual(undefined);
    });
    it('should set the latest field to the right value for extraction queries', () => {
      const explorer = {
        query: {
          analysis_type: 'extraction',
          property_names: ['a', 'b', 'c'],
          latest: 500,
          email: 'eric@keen.io'
        }
      };
      const result = ExplorerUtils.cleanJSONforSave(explorer);
      expect(result.query.latest).toEqual(100);
    });
  });

  describe('resultCanBeVisualized', () => {
    it('should return true if the value is the number 0', () => {
      const explorer = {
        response: {
          result: 0
        }
      };
      expect(ExplorerUtils.resultCanBeVisualized(explorer)).toBe(true);
    });
  });

  describe('mergeResponseWithExplorer', () => {
    it('should keep all explorer attributes', () => {
      const explorer = {
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
      const response = {
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
      const expectedExplorer = {
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
      expect(ExplorerUtils.mergeResponseWithExplorer(explorer, response)).toEqual(expectedExplorer);
    });
  });

  describe('formatQueryParams', () => {
    it('should call FunnelUtils.formatQueryParams for each step', () => {
      const stub = jest.spyOn(FunnelUtils, 'formatQueryParams').mockReturnValue({});

      ExplorerUtils.formatQueryParams({query: { steps: [{}, {}, {}]} });

      expect(stub).toHaveBeenCalledTimes(3);

      stub.mockRestore();
    });
    it('should call unpackTimeframeParam if there is a timeframe', () => {
      const params = {
        query: {
          timeframe: 'this_1_days'
        }
      };
      const stub = jest.spyOn(TimeframeUtils, 'unpackTimeframeParam').mockReturnValue({
        time: {
          relativity: 'this',
          amount: '1',
          sub_timeframe: 'days'
        }
      });
      const formatted = ExplorerUtils.formatQueryParams(params);
      expect(stub).toBeCalled();
      stub.mockRestore();
    });
    it('should call FilterUtils.initList for list filters', () => {
      const stub = jest.spyOn(FilterUtils, 'initList');
      const params = {
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
      expect(stub).toHaveBeenCalled();
      stub.mockRestore();
    });
    it('should call FilterUtils.getCoercedValue for every filter', () => {
      const stub = jest.spyOn(FilterUtils, 'getCoercedValue');
      const params = {
        query: {
          filters: [{}, {}, {}]
        }
      };
      ExplorerUtils.formatQueryParams(params);
      expect(stub).toHaveBeenCalledTimes(3);
      stub.mockRestore();
    });
    describe('unpacking filters', () => {
      it('should properly unpack Boolean filters', () => {
        const params = {
          query: {
            filters: [{
              property_name: 'is_admin',
              operator: 'eq',
              property_value: true
            }]
          }
        };
        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.query.filters[0].property_value).toEqual(true);
      });
      it('should properly unpack List filters', () => {
        const params = {
          query: {
            filters: [{
              property_name: 'is_admin',
              operator: 'eq',
              property_value: [1, 2, 3]
            }]
          }
        };
        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.query.filters[0].property_value).toEqual("'1', '2', '3'");
      });
      it('should properly unpack String filters', () => {
        const params = {
          query: {
            filters: [{
              property_name: 'is_admin',
              operator: 'eq',
              property_value: 'a name'
            }]
          }
        };
        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.query.filters[0].property_value).toEqual("a name");
      });
      it('should properly unpack List filters', () => {
        const params = {
          query: {
            filters: [{
              property_name: 'is_admin',
              operator: 'eq',
              property_value: ["this, right here", "is", "a", "list", 1, 2, 3, 4]
            }]
          }
        };
        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.query.filters[0].property_value).toEqual('"this, right here", "is", "a", "list", \'1\', \'2\', \'3\', \'4\'');
      });
      it('should properly unpack Datetime filters', () => {
        const params = {
          query: {
            filters: [{
              property_name: 'is_admin',
              operator: 'eq',
              property_value: "2015-05-03T10:00:00.000"
            }]
          }
        };
        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.query.filters[0].property_value).toEqual("2015-05-03T10:00:00.000");
      });
      it('should create arrays out of string group_by properties', () => {
        const params = {
          query: {
            group_by: 'string value'
          }
        };
        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.query.group_by).toEqual(['string value']);
      });
    });
    describe('opening a query created via API', () => {
      it('should create a metadata object if it is null', () => {
        const params = {
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

        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.metadata).toBeInstanceOf(Object);
      });
      it('should create a display name if it does not exist', () => {
        const params = {
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

        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.metadata.display_name).toEqual(params.query_name);
      });
      it('should create a display name if it is null', () => {
        const params = {
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

        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.metadata.display_name).toEqual(params.query_name);
      });
      it('should not overwrite the display name if it already exists', () => {
        const params = {
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

        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.metadata.display_name).toEqual('Actually I need 11');
      });
      it('should create a chart_type property toEqual metric if one does not exist and interval is not defined', () => {
        const params = {
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

        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.metadata.visualization.chart_type).toEqual('metric');
      });
      it('should create a chart_type property toEqual area if one does not exist and interval is defined', () => {
        const params = {
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

        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.metadata.visualization.chart_type).toEqual('area');
      });
      it('should not overwrite a chart_type that already exists', () => {
        const params = {
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

        const formattedParams = ExplorerUtils.formatQueryParams(params);
        expect(formattedParams.metadata.visualization.chart_type).toEqual('line');
      });
    });
  });

  describe('getApiQueryUrl', () => {
    let client;
    let explorer;
    beforeEach(() => {
      explorer = _.assign({}, TestHelpers.createExplorerModel(), {
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
      client = new KeenAnalysis(TestHelpers.createClient());
    });

    describe('removes unneeded attributes from the URL string', () => {
      it('analysis_type', () => {
        const found = ExplorerUtils.getApiQueryUrl(client, explorer).match('analysis_type=');
        expect(found).toBe(null);
      });
      it('chart_type', () => {
        const found = ExplorerUtils.getApiQueryUrl(client, explorer).match('chart_type=');
        expect(found).toBe(null);
      });
    });

    describe('it constructs the URL correctly', () => {
      it('properly constructs a URL with an absolute timeframe', () => {
        explorer.query.time = {
          start: new Date(),
          end: new Date()
        }
        const found = ExplorerUtils.getApiQueryUrl(client, explorer).match(/timeframe/ig);
        expect(found).toHaveLength(1);
      });

      it('has the timeframe attribute', () => {
        const found = ExplorerUtils.getApiQueryUrl(client, explorer).match(/timeframe=this_1_days/ig);
        expect(found).toHaveLength(1);
      });

      it('should properly JSON stringify the group_by property if it is a multiple item array', () => {
        explorer.query.group_by = ['user.name', 'product.id'];
        const url = ExplorerUtils.getApiQueryUrl(client, explorer);
        const encodedValue = encodeURIComponent(JSON.stringify(['user.name', 'product.id']));
        expect(url.match(encodedValue)).toHaveLength(1);
      });

      it('should not JSON stringify the group_by property if it is a single item array', () => {
        explorer.query.group_by = ['user.name'];
        const url = ExplorerUtils.getApiQueryUrl(client, explorer);
        const arrayEncodedValue = encodeURIComponent(JSON.stringify(['user.name']));
        const encodedValue = encodeURIComponent('user.name');
        expect(url.match(arrayEncodedValue)).toEqual(null);
        expect(url.match(encodedValue)).toHaveLength(1);
      });

      describe('filters', () => {
        it('has the expected filters attribute', () => {
          expect(ExplorerUtils.getApiQueryUrl(client, explorer)).toContain("filters=%5B%7B%22property_name%22%3A%22author.id%22%2C%22operator%22%3A%22eq%22%2C%22property_value%22%3A%22abc123%22%7D%2C%7B%22property_name%22%3A%22org_project_count%22%2C%22operator%22%3A%22gte%22%2C%22property_value%22%3A10%7D%5D");
        });
        it('does not have the coercion_type property', () => {
          expect(ExplorerUtils.getApiQueryUrl(client, explorer)).not.toContain("coercion_type");
        });
      });

      describe('steps', () => {

        beforeEach(() => {
          explorer.query = {
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
          expect(ExplorerUtils.getApiQueryUrl(client, explorer)).toContain("&steps=%5B%7B%22")
        });

        it('does not have a separate query param for each step', () => {
          expect(ExplorerUtils.getApiQueryUrl(client, explorer)).not.toContain(encodeURIComponent("steps[0]"));
        });

        it('has the expected steps attribute', () => {
          const explorer = {
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
          const expectedURLcomponent = 'steps=' + encodeURIComponent(JSON.stringify([{
            event_collection: 'signups',
            actor_property: 'user',
            timezone: 'US/Hawaii',
            timeframe: 'this_1_days'
          }]));
          expect(ExplorerUtils.getApiQueryUrl(client, explorer)).toContain(expectedURLcomponent);
        });

        it('does not have a separate query param for each step', () => {
          const explorer = {
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
          expect(ExplorerUtils.getApiQueryUrl(client, explorer)).not.toContain(encodeURIComponent("steps[0]"));
        });

      });

    });
  });

  describe('getSdkExample', () => {
    let explorer;
    let client;

    beforeEach(() => {
      explorer = TestHelpers.createExplorerModel();
      client = new KeenAnalysis(TestHelpers.createClient());
    });

    describe('removes unneeded attributes from the URL string', () => {
      beforeEach(() => {
        explorer.query = {
          analysis_type: 'count',
          event_collection: 'clicks',
          timeframe: 'this_1_days',
          visualization: {
            chart_type: 'metric'
          }
        };
      });

      it('analysis_type', () => {
        const found = ExplorerUtils.getSdkExample(explorer, client).match('analysis_type');
        expect(found).toBe(null);
      });

      it('chart_type', () => {
        const found = ExplorerUtils.getSdkExample(explorer, client).match('chart_type');
        expect(found).toBe(null);
      });

    });

    describe('it constructs the example correctly', () => {

      it('has the timeframe attribute', () => {
        explorer = {
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

        const found = ExplorerUtils.getSdkExample(explorer, client).match('timeframe: "this_1_days"');
        expect(found).toHaveLength(1);
      });

    })

  });

  describe('slugify', () => {
    it('it creates a slug using query name', () => {
      const newName = ExplorerUtils.slugify('Saved Query name!*');
      expect(newName).toEqual('saved-query-name');
    });
  });
});
