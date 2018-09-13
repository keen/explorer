import _ from 'lodash';
import moment from 'moment';
import XHRmock from 'xhr-mock';

import TestHelpers from '../../support/TestHelpers';
import ProjectStore from '../../../lib/js/app/stores/ProjectStore';
import ProjectUtils from '../../../lib/js/app/utils/ProjectUtils';
import FormatUtils from '../../../lib/js/app/utils/FormatUtils';
import ExplorerStore from '../../../lib/js/app/stores/ExplorerStore';
import ExplorerActions from '../../../lib/js/app/actions/ExplorerActions';

jest.mock('../../../lib/js/app/actions/ProjectActions');

describe('stores/ExplorerStore', () => {
  let getProjectSpy;
  beforeAll(()=>{
    XHRmock.setup();
    getProjectSpy = jest.spyOn(ProjectStore, 'getProject').mockReturnValue({ client: {}});
  });

  afterAll(()=>{
    XHRmock.teardown();
  });
  beforeEach(() => {
    ExplorerStore.clearAll();
  });

  describe('create', () => {
    it('should create a single', () => {
      ExplorerActions.create();
      expect(Object.keys(ExplorerStore.getAll())).toHaveLength(1)
    });
    it('should not allow creating with active set to true', () => {
      expect(ExplorerActions.create.bind(null, { active: true })).toThrow("You must use setActive to set a model as active.");
    });
    it('should create a explorer with the right default attributes', () => {
      ExplorerActions.create();
      const defaults = {
        active: false,
        response: null,
        dataTimestamp: null,
        loading: false,
        saving: false,
        isValid: true,
        errors: [],
        query_name: null,
        refresh_rate: 0,
        query: {
          event_collection: null,
          analysis_type: null,
          target_property: null,
          percentile: null,
          group_by: [],
          interval: null,
          timezone: ProjectUtils.getLocalTimezone(),
          filters: null,
          email: null,
          latest: null,
          limit: null,
          order_by: null,
          property_names: [],
          filters: [],
          steps: [],
          time: {
            relativity: 'this',
            amount: 14,
            sub_timeframe: 'days'
          }
        },
        metadata: {
          display_name: null,
          visualization: {
            chart_type: null
          }
        }
      };

      const keys = Object.keys(ExplorerStore.getAll());
      expect(_.omit(ExplorerStore.getAll()[keys[0]], 'id')).toEqual(defaults);
    });
    it('should assign attributes passed in to the new explorer', () => {
      ExplorerActions.create({
        query: {
          event_collection: 'clicks',
          analysis_type: 'count'
        },
        metadata: {
          visualization: {
            chart_type: 'metric'
          }
        }
      });
      const keys = Object.keys(ExplorerStore.getAll());
      expect(ExplorerStore.getAll()[keys[0]].query.event_collection).toEqual('clicks');
      expect(ExplorerStore.getAll()[keys[0]].query.analysis_type).toEqual('count');
      expect(ExplorerStore.getAll()[keys[0]].metadata.visualization.chart_type).toEqual('metric');
    });
    it('should translate a null group_by to an empty array', () => {
      ExplorerActions.create({
        query: {
          group_by: null
        }
      });
      const keys = Object.keys(ExplorerStore.getAll());
      expect(ExplorerStore.getAll()[keys[0]].query.group_by).toHaveLength(0);
    });
    it('should wrap non-null group_by values in an array', () => {
      ExplorerActions.create({
        query: {
          group_by: 'thing'
        }
      });
      const keys = Object.keys(ExplorerStore.getAll());
      expect(ExplorerStore.getAll()[keys[0]].query.group_by).toHaveLength(1);
      expect(ExplorerStore.getAll()[keys[0]].query.group_by[0]).toEqual('thing');
    });
    it('should set the store object key to the id is one is passed in', () => {
      ExplorerActions.create({
        id: 'abc123'
      });
      const keys = Object.keys(ExplorerStore.getAll());
      expect(ExplorerStore.getAll()[keys[0]].id).toEqual('abc123');
    });
    it('should create default metadata if metadata is null', () => {
      ExplorerActions.create({
        id: 'abc123',
        metadata: null
      });
      expect(ExplorerStore.get('abc123').metadata).toEqual({
        display_name: null,
        visualization: {
          chart_type: null
        }
      });
    });
    it('should turn query.group_by into an array if it is not one already', () => {
      ExplorerActions.create({
        id: 'abc123',
        query: {
          group_by: 'thing'
        }
      });
      expect(ExplorerStore.get('abc123').query.group_by).toEqual(expect.arrayContaining(['thing']));
    });
    it('should turn percentile value into a number if it was originally a string', () => {
      ExplorerActions.create({
        id: 'abc123',
        query: {
          percentile: '50'
        }
      });
      expect(ExplorerStore.get('abc123').query.percentile).toBeGreaterThan(0);
    });
  });

  describe('clone', () => {
    it('should only clone query data and metadata.visualization.chart_type', () => {
      ExplorerActions.create({
        id: 'abc123',
        query_name: 'Test Query',
        query: {
        event_collection: 'signups',
          analysis_type: 'count'
        },
        metadata: {
          display_name: 'Test',
          visualization: {
            chart_type: 'metric'
          }
        }
      });

      const source = ExplorerStore.get('abc123');
      ExplorerActions.clone(source.id);
      const clone = ExplorerStore.getLast();
      const keys = Object.keys(ExplorerStore.getAll());

      expect(keys).toHaveLength(2);
      expect(clone.id).not.toBe(source.id);
      expect(clone.query_name).toBe(null);
      expect(clone.query.event_collection).toBe('signups');
      expect(clone.query.analysis_type).toBe('count');
      expect(clone.metadata.display_name).toBe(null);
      expect(clone.metadata.visualization.chart_type).toBe('metric');
    });

    it('should clone query into a new object and not modify original object', () => {
      ExplorerActions.create({
        id: 'abc456',
        query_name: 'Another Test Query',
        query: {
          event_collection: 'signups',
          analysis_type: 'count'
        },
        metadata: {
          display_name: 'Another Test',
          visualization: {
            chart_type: 'metric'
          }
        }
      });

      const source = ExplorerStore.get('abc456');
      ExplorerActions.clone(source.id);
      const clone = ExplorerStore.getLast();
      const keys = Object.keys(ExplorerStore.getAll());

      expect(keys).toHaveLength(2);
      expect(source.query === clone.query).toBe(false);
      expect(source.metadata.visualization === clone.metadata.visualization).toBe(false);
      expect(source.id).toBe('abc456');
      expect(source.query_name).toBe('Another Test Query');
      expect(source.query.event_collection).toBe('signups');
      expect(source.query.analysis_type).toBe('count');
      expect(source.metadata.display_name).toBe('Another Test');
      expect(source.metadata.visualization.chart_type).toBe('metric');
    });
  });

  describe('createBatch', () => {
    it('should create a model for every object in the array under the key "models"', () => {
      ExplorerActions.createBatch([
        {
          query: {
            event_collection: 'clicks',
            analysis_type: 'count'
          },
          metadata: {
            visualization: {
              chart_type: 'metric'
            }
          }
        },
        {
          id: 'with_an_id',
          query: {
            event_collection: 'signups',
            analysis_type: 'count'
          },
          metadata: {
            visualization: {
              chart_type: 'metric'
            }
          }
        },
        {
          id: 'also_with_an_id',
          query: {
            event_collection: 'downloads',
            analysis_type: 'count'
          },
          metadata: {
            visualization: {
              chart_type: 'json'
            }
          }
        }
      ]);
      const keys = Object.keys(ExplorerStore.getAll());
      expect(keys).toHaveLength(3);
      expect(keys[1]).toBe('with_an_id');
      expect(keys[2]).toBe('also_with_an_id');
    });
  });

  describe('getLast', () => {
    it('should get the last explorer in the store', () => {
      ExplorerActions.create({
        id: 'ONE',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count'
        },
        visualization: {
          chart_type: 'metric'
        }
      });
      ExplorerActions.create({
        id: 'TWO',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count'
        },
        visualization: {
          chart_type: 'metric'
        }
      });
      ExplorerActions.create({
        id: 'THREE',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count'
        },
        visualization: {
          chart_type: 'metric'
        }
      });
      expect(ExplorerStore.getLast().id).toEqual('THREE');
    });
  });

  describe('update', () => {
    it('should properly update the correct explorer', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count'
        },
        visualization: {
          chart_type: 'metric'
        }
      });
      let explorer = ExplorerStore.get('SOME_ID');
      let updates = _.cloneDeep(explorer);
      updates.query.event_collection = 'not_clicks';
      updates.query.analysis_type = 'not_count';
      updates.visualization.chart_type = 'not_metric';

      ExplorerActions.update('SOME_ID', updates);

      explorer = ExplorerStore.get('SOME_ID');

      expect(explorer.query.event_collection).toBe('not_clicks');
      expect(explorer.query.analysis_type).toBe('not_count');
      expect(explorer.visualization.chart_type).toBe('not_metric');
    });

    it('should properly merge array values', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count',
          group_by: ['name', 'name-two']
        },
        visualization: {
          chart_type: 'metric'
        }
      });
      let explorer = ExplorerStore.get('SOME_ID');
      let updates = { query: { group_by: ['name'] } }
      ExplorerActions.update('SOME_ID', updates);

      explorer = ExplorerStore.get('SOME_ID');

      expect(explorer.query.group_by).toEqual(expect.arrayContaining(['name']));
    });

    it('should properly merge the time object', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count',
          time: {
            start: 'start date',
            end: 'end date'
          }
        },
        visualization: {
          chart_type: 'metric'
        }
      });
      let explorer = ExplorerStore.get('SOME_ID');
      let updates = {
        query: {
          time: {
            amount: "14",
            relativity: "this",
            sub_timeframe: "days"
          }
        }
      }
      ExplorerActions.update('SOME_ID', updates);
      explorer = ExplorerStore.get('SOME_ID');
      expect(explorer.query.time).toEqual({
        amount: "14",
        relativity: "this",
        sub_timeframe: "days"
      });
    });

    it('should replace the store object key with the new ID if one is passed in via updates', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        query_name: 'A saved query',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count'
        },
        visualization: {
          chart_type: 'metric'
        }
      });

      ExplorerActions.update('SOME_ID', { id: 'abc123' });
      const explorers = ExplorerStore.getAll();
      expect(Object.keys(explorers)).toHaveLength(1);
      expect(Object.keys(explorers)[0]).toBe('abc123');
    });

    it('should wrap the group_by property in an array if it is not already', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        query_name: 'A saved query',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count'
        },
        visualization: {
          chart_type: 'metric'
        }
      });
      const newQuery = _.cloneDeep(ExplorerStore.get('SOME_ID').query);
      newQuery.group_by = 'not_wrapped';
      ExplorerActions.update('SOME_ID', { query: newQuery });
      expect(ExplorerStore.get('SOME_ID').query.group_by).toEqual(expect.arrayContaining(['not_wrapped']));
    });

    it('should turn percentile value into a number if it was originally a string', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        query_name: 'A saved query',
        query: {
          event_collection: 'purchases',
          analysis_type: 'percentile',
          target_property: 'price',
          percentile: '50'
        },
        visualization: {
          chart_type: 'metric'
        }
      });
      const newQuery = _.cloneDeep(ExplorerStore.get('SOME_ID').query);
      newQuery.percentile = '75';
      ExplorerActions.update('SOME_ID', { query: newQuery });
      expect(ExplorerStore.get('SOME_ID').query.percentile).toBeGreaterThan(0);
    });

  });

  describe('clearing values', () => {
    it('should set email to null if updating analysis type to something that is not extraction', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        name: 'A saved query',
        query: {
          email: 'someone@keen.io',
          latest: '1000',
          analysis_type: 'extraction',
          event_collection: 'clicks',
          timeframe: 'this_1_days'
        },
        visualization: {
          chart_type: 'metric'
        }
      });

      const explorer = ExplorerStore.get('SOME_ID');
      const updates = _.cloneDeep(explorer);
      updates.query.analysis_type = 'count';
      ExplorerActions.update('SOME_ID', updates);

      expect(ExplorerStore.get('SOME_ID').query.email).toBe(null);
    });

    it('should set latest to null if updating analysis type to something that is not extraction', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        name: 'A saved query',
        query: {
          email: 'someone@keen.io',
          latest: '1000',
          analysis_type: 'extraction',
          event_collection: 'clicks',
          timeframe: 'this_1_days'
        },
        visualization: {
          chart_type: 'metric'
        }
      });

      const explorer = ExplorerStore.get('SOME_ID');
      const updates = _.cloneDeep(explorer);
      updates.query.analysis_type = 'count';
      ExplorerActions.update('SOME_ID', updates);

      expect(ExplorerStore.get('SOME_ID').query.latest).toBe(null);
    });

    it('does not clear the email field if the analysis type is extraction', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        name: 'A saved query',
        query: {
          analysis_type: 'count',
          event_collection: 'clicks',
          timeframe: 'this_1_days'
        },
        visualization: {
          chart_type: 'metric'
        }
      });

      const explorer = ExplorerStore.get('SOME_ID');
      const updates = _.cloneDeep(explorer);
      updates.query.analysis_type = 'extraction';
      updates.query.email = 'someone@keen.io';
      ExplorerActions.update('SOME_ID', updates);

      expect(ExplorerStore.get('SOME_ID').query.email).toEqual('someone@keen.io');
    });

    it('does not clear the latest field if the analysis type is extraction and email is present', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        name: 'A saved query',
        query: {
          analysis_type: 'count',
          event_collection: 'clicks',
          timeframe: 'this_1_days'
        },
        visualization: {
          chart_type: 'metric'
        }
      });

      const explorer = ExplorerStore.get('SOME_ID');
      const updates = _.cloneDeep(explorer);
      updates.query.analysis_type = 'extraction';
      updates.query.email = 'person@keen.io';
      updates.query.latest = '1000';
      ExplorerActions.update('SOME_ID', updates);

      expect(ExplorerStore.get('SOME_ID').query.latest).toEqual('1000');
    });


    it('should set group_by to empty array and interval to null if the analysis type is extraction', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        name: 'A saved query',
        query: {
          analysis_type: 'count',
          event_collection: 'clicks',
          timeframe: 'this_1_days'
        },
        visualization: {
          chart_type: 'metric'
        }
      });

      const explorer = ExplorerStore.get('SOME_ID');
      const updates = _.cloneDeep(explorer);
      updates.query.analysis_type = 'extraction';
      updates.query.latest = 1000;
      ExplorerActions.update('SOME_ID', updates);

      expect(ExplorerStore.get('SOME_ID').query.interval).toEqual(null);
      expect(ExplorerStore.get('SOME_ID').query.group_by).toEqual(expect.arrayContaining([]));
    });

    it('should set percentile to null if the analysis type is not percentile', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        name: 'A saved query',
        query: {
          event_collection: 'clicks',
          analysis_type: 'percentile',
          target_property: 'response.time',
          percentile: '99',
          timeframe: 'this_1_days'
        },
        visualization: {
          chart_type: 'metric'
        }
      });

      const explorer = ExplorerStore.get('SOME_ID');
      const updates = _.cloneDeep(explorer);
      updates.query.analysis_type = 'count';
      ExplorerActions.update('SOME_ID', updates);

      expect(ExplorerStore.get('SOME_ID').query.percentile).toBe(null);
      expect(ExplorerStore.get('SOME_ID').query.target_property).toBe(null);
    });

    it('should set target_property to null if the analysis type is count', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        name: 'A saved query',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count_unique',
          target_property: 'response.time',
          timeframe: 'this_1_days'
        },
        visualization: {
          chart_type: 'metric'
        }
      });

      const explorer = ExplorerStore.get('SOME_ID');
      const updates = _.cloneDeep(explorer);
      updates.query.analysis_type = 'count';
      ExplorerActions.update('SOME_ID', updates);

      expect(ExplorerStore.get('SOME_ID').query.target_property).toBe(null);
    });

    it('should set target_property to null if the analysis type is extraction', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        name: 'A saved query',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count_unique',
          target_property: 'response.time',
          timeframe: 'this_1_days'
        },
        visualization: {
          chart_type: 'metric'
        }
      });

      const explorer = ExplorerStore.get('SOME_ID');
      const updates = _.cloneDeep(explorer);
      updates.query.analysis_type = 'extraction';
      ExplorerActions.update('SOME_ID', updates);

      expect(ExplorerStore.get('SOME_ID').query.target_property).toBe(null);
    });
  });

  describe('remove', () => {
    it('should remove an explorer', () => {
      ExplorerActions.create({
        id: 'SOME_ID',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count'
        },
        visualization: {
          chart_type: 'metric'
        }
      });
      expect(ExplorerStore.getAll().SOME_ID).not.toBe(undefined);
      ExplorerActions.remove('SOME_ID');
      expect(ExplorerStore.getAll().SOME_ID).toBe(undefined);
    });

    describe('creating a new active model after removal of the currently active one', () => {
      beforeEach(() => {
        ExplorerActions.create({
          id: 'abc',
          query: {
            event_collection: 'clicks',
            analysis_type: 'count'
          },
          metadata: {
            visualization: {
              chart_type: 'metric'
            }
          }
        });
        ExplorerActions.create({
          id: '123',
          query: {
            event_collection: 'signups',
            analysis_type: 'count'
          },
          metadata: {
            visualization: {
              chart_type: 'metric'
            }
          }
        });
        ExplorerActions.setActive('abc');
        ExplorerActions.remove('abc');
      });
      it('should have an active model after', () => {
        expect(ExplorerStore.getActive().active).toBe(true);
      });
      it('should create the new model, not select an existing persisted model', () => {
        expect(ExplorerStore.getActive().id.match('TEMP-')).toHaveLength(1);
      });
      it('should only have a single active model', () => {
        expect(_.filter(ExplorerStore.getAll(), { active: true  })).toHaveLength(1);
      });
      it('should create the new active model and then set it active to ensure it has an originalModel property', () => {
        expect(!_.isUndefined(ExplorerStore.getActive().originalModel)).toBe(true);
      });
    });

  });

  describe('set active', () => {
    beforeEach(() => {
      ExplorerActions.create();
      ExplorerActions.create();
      ExplorerActions.create();
    });
    it('should set the given explorer active', () => {
      const keys = Object.keys(ExplorerStore.getAll());
      ExplorerActions.setActive(keys[1]);
      expect(ExplorerStore.getAll()[keys[1]].active).toBe(true);
    });
    it('should set the rest of the explorers as not active', () => {
      const keys = Object.keys(ExplorerStore.getAll());
      ExplorerActions.setActive(keys[0]);
      ExplorerActions.setActive(keys[2]);

      expect(ExplorerStore.getAll()[keys[0]].active).toBe(false);
      expect(ExplorerStore.getAll()[keys[1]].active).toBe(false);
      expect(ExplorerStore.getAll()[keys[2]].active).toBe(true);
    });
  });


  describe('filters', () => {
    let explorer;
    beforeEach(() => {
      ExplorerActions.create();
      explorer = ExplorerStore.getAll()[Object.keys(ExplorerStore.getAll())[0]];
    });
    describe('add filter', () => {
      it('should add a new filter to the query', () => {
        expect(explorer.query.filters).toHaveLength(0);
        ExplorerActions.addFilter(explorer.id);
        expect(explorer.query.filters).toHaveLength(1);
      });
      it('should add a new filter to the query with the expected default values', () => {
        ExplorerActions.addFilter(explorer.id);
        expect(explorer.query.filters[0]).toEqual({
          property_name: null,
          property_value: null,
          operator: 'eq',
          coercion_type: 'String',
          errors: [],
          isValid: true
        });
      });
      it('should add a new filter to the query with the provided attributes', () => {
        ExplorerActions.addFilter(explorer.id, {
          property_name: 'some_name',
          operator: 'gte',
          property_value: 'some_value',
          coercion_type: 'String'
        });
        expect(explorer.query.filters[0]).toEqual({
          property_name: 'some_name',
          operator: 'gte',
          property_value: 'some_value',
          coercion_type: 'String',
          errors: [],
          isValid: true
        });
      });
    });

    describe('remove filter', () => {
      beforeEach(() => {
        ExplorerStore.clearAll();
        ExplorerActions.create();
        ExplorerActions.create();
        ExplorerActions.create();
      });
      it('should remove the correct filter from the explorer with the provided ID', () => {
        const secondExplorer = ExplorerStore.getAll()[Object.keys(ExplorerStore.getAll())[1]];
        // Add three filters
        ExplorerActions.addFilter(secondExplorer.id, {
          property_name: 'one',
          property_value: 'value',
          coercion_type: 'String',
          operator: 'eq'
        });
        ExplorerActions.addFilter(secondExplorer.id, {
          property_name: 'two',
          property_value: 'value',
          coercion_type: 'String',
          operator: 'eq'
        });
        ExplorerActions.addFilter(secondExplorer.id, {
          property_name: 'three',
          property_value: 'value',
          coercion_type: 'String',
          operator: 'eq'
        });
        ExplorerActions.removeFilter(secondExplorer.id, 1);
        expect(ExplorerStore.get(secondExplorer.id).query.filters).toHaveLength(2);
        expect(ExplorerStore.get(secondExplorer.id).query.filters).toEqual(expect.arrayContaining([
          {
            property_name: 'one',
            property_value: 'value',
            operator: 'eq',
            coercion_type: 'String',
            errors: [],
            isValid: true
          },
          {
            property_name: 'three',
            property_value: 'value',
            operator: 'eq',
            coercion_type: 'String',
            errors: [],
            isValid: true
          }
        ]));
      });
    });

    describe('update filter', () => {
      let getPropertyTypeStub;
      let coercionTypeForPropertyTypeStub;
      let getProjectStub;
      beforeAll(() => {
        getPropertyTypeStub = jest.spyOn(ProjectUtils, 'getPropertyType').mockImplementation(()=>{});
        coercionTypeForPropertyTypeStub = jest.spyOn(FormatUtils, 'coercionTypeForPropertyType').mockImplementation(()=>{});
        getProjectStub = jest.spyOn(ProjectStore, 'getProject').mockImplementation(()=>{});
      });

      afterAll(() => {
        getPropertyTypeStub.mockRestore();
        coercionTypeForPropertyTypeStub.mockRestore();
        getProjectStub.mockRestore();
      });

      beforeEach(() => {
        ExplorerActions.create();
        explorer = ExplorerStore.getAll()[Object.keys(ExplorerStore.getAll())[0]];
        ExplorerActions.addFilter(explorer.id);
      });

      it('should apply the provided updates', () => {
        coercionTypeForPropertyTypeStub.mockReturnValue('String');
        ExplorerActions.updateFilter(explorer.id, 0, {
          property_name: 'some_other_name'
        });
        expect(ExplorerStore.get(explorer.id).query.filters[0].property_name).toBe('some_other_name');
      });


      describe('preparing updates before updating the filter', () => {

        describe('property_name', () => {
          it('should set the coercion type to the default for that type when the property name is changed', () => {
            coercionTypeForPropertyTypeStub.mockReturnValue('Datetime');
            ExplorerActions.updateFilter(explorer.id, 0, {
              property_name: 'some_other_name'
            });
            expect(ExplorerStore.get(explorer.id).query.filters[0].property_name).toBe('some_other_name');
            expect(ExplorerStore.get(explorer.id).query.filters[0].coercion_type).toBe('Datetime');
          });
          it('should NOT change the coercion_type if the property_name is the same', () => {
            coercionTypeForPropertyTypeStub.mockReturnValue('List');
            ExplorerActions.updateFilter(explorer.id, 0, {
              property_name: 'name',
              property_value: 'something',
              operator: 'eq'
            });
            coercionTypeForPropertyTypeStub.mockReturnValue('String');
            ExplorerActions.updateFilter(explorer.id, 0, {
              property_value: 'something else'
            });
            expect(ExplorerStore.get(explorer.id).query.filters[0].property_name).toBe('name');
            expect(ExplorerStore.get(explorer.id).query.filters[0].coercion_type).toBe('List');
          });
          describe('with exists operator', () => {
            it('should keep the coercion_type as Boolean', () => {
              ExplorerActions.updateFilter(explorer.id, 0, {
                property_name: 'name',
                operator: 'exists',
                coercion_type: 'Boolean',
                property_value: true
              });
              ExplorerActions.updateFilter(explorer.id, 0, {
                property_name: 'new value'
              });
              expect(ExplorerStore.get(explorer.id).query.filters[0].coercion_type).toBe('Boolean');
            });
            it('should keep the property_value as the Boolean value (true)', () => {
              ExplorerActions.updateFilter(explorer.id, 0, {
                property_name: 'name',
                operator: 'exists',
                coercion_type: 'Boolean',
                property_value: true
              });
              ExplorerActions.updateFilter(explorer.id, 0, {
                property_name: 'new value'
              });
              expect(ExplorerStore.get(explorer.id).query.filters[0].property_value).toBe(true);
            });
            it('should keep the property_value as the Boolean value (false)', () => {
              ExplorerActions.updateFilter(explorer.id, 0, {
                property_name: 'name',
                operator: 'exists',
                coercion_type: 'Boolean',
                property_value: false
              });
              ExplorerActions.updateFilter(explorer.id, 0, {
                property_name: 'new value'
              });
              expect(ExplorerStore.get(explorer.id).query.filters[0].property_value).toBe(false);
            });
          });
        });
      });

    describe('operator', () => {
        it('should NOT change coercion_type if the operator is the same', () => {
          coercionTypeForPropertyTypeStub.mockReturnValue('List');
          ExplorerActions.updateFilter(explorer.id, 0, {
            property_name: 'name',
            operator: 'eq'
          });
          coercionTypeForPropertyTypeStub.mockReturnValue('String');
          ExplorerActions.updateFilter(explorer.id, 0, {
            property_value: 'some value'
          });
          expect(ExplorerStore.get(explorer.id).query.filters[0].property_name).toBe('name');
          expect(ExplorerStore.get(explorer.id).query.filters[0].coercion_type).toBe('List');
        });

        describe('updating the coercion_type based on the operator', () => {
          beforeEach(() => {
            ExplorerActions.updateFilter(explorer.id, 0, {
              property_name: 'name',
              operator: 'eq',
              coercion_type: 'String'
            });
          });

          it('should change the coercion_type to List for operator "in"', () => {
            ExplorerActions.updateFilter(explorer.id, 0, {
              operator: 'in'
            });
            expect(ExplorerStore.get(explorer.id).query.filters[0].coercion_type).toBe('List');
          });
          it('should change the coercion_type to Boolean for operator "exists"', () => {
            ExplorerActions.updateFilter(explorer.id, 0, {
              operator: 'exists'
            });
            expect(ExplorerStore.get(explorer.id).query.filters[0].coercion_type).toBe('Boolean');
          });
          it('should change the coercion_type to Geo for operator "within"', () => {
            ExplorerActions.updateFilter(explorer.id, 0, {
              operator: 'within'
            });
            expect(ExplorerStore.get(explorer.id).query.filters[0].coercion_type).toBe('Geo');
          });
          it('should update to the right coercion_type for that operator if the current type is not supported', () => {
            ExplorerActions.updateFilter(explorer.id, 0, {
              coercion_type: 'Boolean'
            });
            ExplorerActions.updateFilter(explorer.id, 0, {
              operator: 'gt'
            });
            expect(ExplorerStore.get(explorer.id).query.filters[0].coercion_type).toBe('Number');
          });
          it('should NOT update to the right coercion_type for that operator if the current type IS supported', () => {
            ExplorerActions.updateFilter(explorer.id, 0, {
              coercion_type: 'String'
            });
            ExplorerActions.updateFilter(explorer.id, 0, {
              operator: 'gt'
            });
            expect(ExplorerStore.get(explorer.id).query.filters[0].coercion_type).toBe('String');
          });
        });
      });

      describe('Geo coercion_type', () => {
        it('should set up a default geo filter if the coercion_type is changed to Geo', () => {
          ExplorerActions.updateFilter(explorer.id, 0, {
            property_name: 'name',
            operator: 'eq',
            coercion_type: 'String'
          });
          ExplorerActions.updateFilter(explorer.id, 0, {
            operator: 'within'
          });
          expect(ExplorerStore.get(explorer.id).query.filters[0].coercion_type).toBe('Geo');
          expect(ExplorerStore.get(explorer.id).query.filters[0].property_value).toEqual({
            coordinates: [],
            max_distance_miles: null
          });
        });
      });

      describe('clear', () => {
        beforeAll(()=>{
          getProjectSpy = jest.spyOn(ProjectStore, 'getProject').mockReturnValue({ client: {}});
        });

        it('should reset the given explorer to defaults but keeps the same active, name, originalModel and metadata attributes', () => {
          ExplorerStore.clearAll();
          ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), {
            id: 'ABC-SOME-ID',
            query_name: 'some name',
            query: {
              event_collection: 'clicks',
              analysis_type: 'count'
            },
            metadata: {
              display_name: 'some name',
              visualization: {
                chart_type: 'metric'
              }
            }
          }));
          ExplorerActions.setActive('ABC-SOME-ID');
          const updates = _.cloneDeep(ExplorerStore.get('ABC-SOME-ID'));
          const originalModel = _.cloneDeep(ExplorerStore.get('ABC-SOME-ID'));
          updates.originalModel = originalModel;
          ExplorerActions.update('ABC-SOME-ID', updates);

          ExplorerActions.clear('ABC-SOME-ID');

          const expectedModel = {
            id: 'ABC-SOME-ID',
            active: true,
            response: null,
            dataTimestamp: null,
            loading: false,
            saving: false,
            isValid: true,
            errors: [],
            query_name: 'some name',
            refresh_rate: 0,
            query: {
              event_collection: null,
              analysis_type: null,
              target_property: null,
              percentile: null,
              group_by: [],
              interval: null,
              timezone: ProjectUtils.getLocalTimezone(),
              filters: null,
              email: null,
              latest: null,
              limit: null,
              order_by: null,
              property_names: [],
              filters: [],
              steps: [],
              time: {
                relativity: 'this',
                amount: 14,
                sub_timeframe: 'days'
              }
            },
            metadata: {
              display_name: 'some name',
              visualization: {
                chart_type: 'metric'
              }
            },
            originalModel: originalModel
          };

          expect(ExplorerStore.get('ABC-SOME-ID')).toEqual(expectedModel);
        });
      });
    });
  });


  describe('getActive', () => {
    it('should return the active explorer', () => {
      ExplorerActions.create();
      ExplorerActions.create();
      ExplorerActions.create({ id: 'some_id' });
      ExplorerActions.setActive('some_id');
      const keys = Object.keys(ExplorerStore.getAll());
      expect(ExplorerStore.getActive().id).toEqual(ExplorerStore.getAll()[keys[2]].id);
    });
  });

  describe('getAll', () => {
    it('should return all the explorers', () => {
      ExplorerActions.create();
      ExplorerActions.create();
      expect(Object.keys(ExplorerStore.getAll())).toHaveLength(2);
    });
  });

  describe('funnels', () => {
    beforeAll(()=>{
      getProjectSpy = jest.spyOn(ProjectStore, 'getProject').mockReturnValue({ client: {}});
    });

    describe('changing TO funnels', () => {

      beforeEach(() => {
        ExplorerActions.create({id: 'abc123'});
      });

      it('should set root query properties to null or empty arrays', () => {
        ExplorerActions.update('abc123', { query: { analysis_type: 'funnel' } });

        const explorer = ExplorerStore.get('abc123');
        expect(explorer.query.event_collection).toBe(null);
        expect(explorer.query.target_property).toBe(null);
        expect(explorer.query.time).toBe(null);
        expect(explorer.query.timezone).toBe(null);
        expect(explorer.query.filters).toEqual([]);
      });

      it('should create a first active step', () => {
        ExplorerActions.update('abc123', { query: { analysis_type: 'funnel' } });

        const explorer = ExplorerStore.get('abc123');
        expect(explorer.query.steps).not.toBe(undefined);
        expect(explorer.query.steps).toHaveLength(1);
        expect(explorer.query.steps[0].active).toBe(true);
      });

      it('should move root properties over to the first step', () => {
        ExplorerActions.update('abc123', {
          query: {
            filters: [],
            event_collection: 'pageviews',
            target_property: 'user',
            time: {
             relativity: 'this',
             amount: 1,
             sub_timeframe: 'hours'
            }
          }
        });
        ExplorerActions.update('abc123', { query: { analysis_type: 'funnel' } });
        const explorer = ExplorerStore.get('abc123');

        expect(explorer.query.steps[0].event_collection).toBe('pageviews');
        expect(explorer.query.steps[0].actor_property).toBe('user');
        expect(explorer.query.steps[0].time).toEqual({
         relativity: 'this',
         amount: 1,
         sub_timeframe: 'hours'
        });
      });

      it('should remove the root group_by property', () => {
        ExplorerActions.update('abc123', {
          query: {
            analysis_type: 'count',
            event_collection: 'pageviews',
            group_by: 'grouping_property',
            filters: [],
            group_by: 'some_group_by_property'
          }
        });
        ExplorerActions.update('abc123', { query: { analysis_type: 'funnel' } });
        const explorer = ExplorerStore.get('abc123');
        expect(explorer.query.group_by).toEqual([]);
      });

      it('should set unsupported interval property value to null', () => {
        ExplorerActions.update('abc123', {
          query: {
            analysis_type: 'count',
            event_collection: 'pageviews',
            interval: 'interval_value',
            filters: []
          }
        });
        ExplorerActions.update('abc123', { query: { analysis_type: 'funnel' } });
        const explorer = ExplorerStore.get('abc123');
        expect(explorer.query.interval).toEqual(null);
      });

      it('should set the global timeframe property to null', () => {
        ExplorerActions.update('abc123', {
          query: {
            filters: [],
            event_collection: 'pageviews',
            target_property: 'user',
            time: {
             relativity: 'this',
             amount: 1,
             sub_timeframe: 'hours'
            },
            timeframe: 'this_1_hours'
          }
        });
        ExplorerActions.update('abc123', { query: { analysis_type: 'funnel' } });
        const explorer = ExplorerStore.get('abc123');
        expect(explorer.query.timeframe).toEqual(null);
      });
    });

    describe('changing FROM funnels', () => {
      beforeEach(() => {
        ExplorerActions.create({
          id: 'abc123',
          query: {
            analysis_type: 'funnel',
            steps: [
              {
                event_collection: 'pageviews',
                actor_property: 'user',
                time: {
                  relativity: 'this',
                  amount: 32,
                  sub_timeframe: 'days'
                },
                timezone: 'PDT',
                active: false
              },
              {
                event_collection: 'signups',
                actor_property: 'user',
                time: {
                  relativity: 'this',
                  amount: 7,
                  sub_timeframe: 'days'
                },
                timezone: 'PDT',
                active: true
              }
            ]
          }
        });
      });

      it('removes the steps property', () => {
        const updates = _.cloneDeep(ExplorerStore.get('abc123'));
        updates.query.analysis_type = 'count';
        ExplorerActions.update('abc123', updates);
        expect(ExplorerStore.get('abc123').query.steps).toEqual([]);
      });

      it('moves active step properties to the root query', () => {
        const updates = _.cloneDeep(ExplorerStore.get('abc123'));
        updates.query.analysis_type = 'count_unique';
        ExplorerActions.update('abc123', updates);

        const newExplorer = ExplorerStore.get('abc123');

        expect(newExplorer.query.event_collection).toEqual('signups');
        expect(newExplorer.query.target_property).toEqual('user');
        expect(newExplorer.query.timezone).toEqual('PDT');
        expect(newExplorer.query.time).toEqual({
          relativity: 'this',
          amount: 7,
          sub_timeframe: 'days'
        });
      });

      it('returns the unchanged model if there are no steps', () => {
        ExplorerActions.create({ id: 'def456',
          query: {
            event_collection: 'collection',
            analysis_type: 'funnel',
          }
        });
        const updates = _.cloneDeep(ExplorerStore.get('def456'));
        updates.query.analysis_type = 'count';
        ExplorerActions.update('def456', updates);
        expect(ExplorerStore.get('def456').query.event_collection).toEqual('collection');
        expect(ExplorerStore.get('def456').query.analysis_type).toEqual('count');
      });
    });

    describe('Funnel step management', () => {
      beforeEach(() => {
        ExplorerStore.clearAll();
        ExplorerActions.create({ id: 'abc123', query: { analysis_type: 'funnel' } });
      });
      it('should properly add a step when addStep is called', () => {
        const oldStepsLength = ExplorerStore.get('abc123').query.steps.length;
        ExplorerActions.addStep('abc123');
        expect(ExplorerStore.get('abc123').query.steps).toHaveLength(oldStepsLength+1);
      });
      it('should make the first step active when added', () => {
        expect(ExplorerStore.get('abc123').query.steps).toHaveLength(0);
        ExplorerActions.addStep('abc123');
        expect(ExplorerStore.get('abc123').query.steps).toHaveLength(1);
        expect(ExplorerStore.get('abc123').query.steps[0]).toEqual({
          event_collection: null,
          actor_property: null,
          time: {
            relativity: 'this',
            amount: 14,
            sub_timeframe: 'days'
          },
          timezone: ProjectUtils.getLocalTimezone(),
          filters: [],
          optional: false,
          inverted: false,
          with_actors: false,
          active: true,
          isValid: false,
          errors: [
            {
              "attribute": "event_collection",
              "msg": "Choose an Event Collection."
            },
            {
              "attribute": "actor_property",
              "msg": "You must select an actor property"
            }
          ]
        });
      });
      it('should throw an error if a step is attempted to be added without the explorer having a funnel analysis type', () => {
        const updates = _.cloneDeep(ExplorerStore.get('abc123'));
        updates.query.analysis_type = 'count';
        ExplorerActions.update('abc123', updates);
        expect(ExplorerActions.addStep.bind(null, 'abc123')).toThrow("Error: Attempting to add a step to a non-funnel query. Explorer id: abc123");
      });
      it('should properly remove a step at the given index', () => {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });
        expect(ExplorerStore.get('abc123').query.steps).toHaveLength(4);
        ExplorerActions.removeStep('abc123', 2);
        expect(ExplorerStore.get('abc123').query.steps).toHaveLength(3);

        expect(ExplorerStore.get('abc123').query.steps[0].event_collection).toEqual('one');
        expect(ExplorerStore.get('abc123').query.steps[1].event_collection).toEqual('two');
        expect(ExplorerStore.get('abc123').query.steps[2].event_collection).toEqual('four');
      });
      it('should properly update a step at the given index and not change any others', () => {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });

        ExplorerActions.updateStep('abc123', 1, { event_collection: 'something else' });

        expect(ExplorerStore.get('abc123').query.steps[0].event_collection).toEqual('one');
        expect(ExplorerStore.get('abc123').query.steps[1].event_collection).toEqual('something else');
        expect(ExplorerStore.get('abc123').query.steps[2].event_collection).toEqual('three');
        expect(ExplorerStore.get('abc123').query.steps[3].event_collection).toEqual('four');
      });
      it('should properly set a step active and all others inactive', () => {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });

        expect(ExplorerStore.get('abc123').query.steps[0].active).not.toBe(true);
        expect(ExplorerStore.get('abc123').query.steps[1].active).not.toBe(true);
        expect(ExplorerStore.get('abc123').query.steps[2].active).not.toBe(true);
        expect(ExplorerStore.get('abc123').query.steps[3].active).toBe(true);

        ExplorerActions.setStepActive('abc123', 2);

        expect(ExplorerStore.get('abc123').query.steps[0].active).not.toBe(true);
        expect(ExplorerStore.get('abc123').query.steps[1].active).not.toBe(true);
        expect(ExplorerStore.get('abc123').query.steps[2].active).toBe(true);
        expect(ExplorerStore.get('abc123').query.steps[3].active).not.toBe(true);
      });

      it('should properly move the step up', () => {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });

        ExplorerActions.moveStep('abc123', 2, 'up');

        expect(ExplorerStore.get('abc123').query.steps[0].event_collection).toEqual('one');
        expect(ExplorerStore.get('abc123').query.steps[1].event_collection).toEqual('three');
        expect(ExplorerStore.get('abc123').query.steps[2].event_collection).toEqual('two');
        expect(ExplorerStore.get('abc123').query.steps[3].event_collection).toEqual('four');
      });

      it('should properly move the step down', () => {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });

        ExplorerActions.moveStep('abc123', 2, 'down');

        expect(ExplorerStore.get('abc123').query.steps[0].event_collection).toEqual('one');
        expect(ExplorerStore.get('abc123').query.steps[1].event_collection).toEqual('two');
        expect(ExplorerStore.get('abc123').query.steps[2].event_collection).toEqual('four');
        expect(ExplorerStore.get('abc123').query.steps[3].event_collection).toEqual('three');
      });

      it('should be a no op if you try to move the first step up', () => {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });

        ExplorerActions.moveStep('abc123', 0, 'up');

        expect(ExplorerStore.get('abc123').query.steps[0].event_collection).toEqual( 'one');
        expect(ExplorerStore.get('abc123').query.steps[1].event_collection).toEqual('two');
        expect(ExplorerStore.get('abc123').query.steps[2].event_collection).toEqual('three');
        expect(ExplorerStore.get('abc123').query.steps[3].event_collection).toEqual('four');
      });

      it('should be a no op if you try to move the last step down', () => {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });

        ExplorerActions.moveStep('abc123', 3, 'down');

        expect(ExplorerStore.get('abc123').query.steps[0].event_collection).toEqual('one');
        expect(ExplorerStore.get('abc123').query.steps[1].event_collection).toEqual('two');
        expect(ExplorerStore.get('abc123').query.steps[2].event_collection).toEqual('three');
        expect(ExplorerStore.get('abc123').query.steps[3].event_collection).toEqual('four');
      });

      describe('Funnel Step Filters', () => {
        it('should add a filter to a step', () => {
          ExplorerActions.addStep('abc123', { event_collection: 'one' });
          ExplorerActions.addStep('abc123', { event_collection: 'two' });
          ExplorerActions.addStepFilter('abc123', 1, { property_name: 'name' });

          expect(ExplorerStore.get('abc123').query.steps[1].filters).toHaveLength(1);
          expect(ExplorerStore.get('abc123').query.steps[1].filters[0].property_name).toEqual('name');
        });
        it('should remove a filter from the correct step', () => {
          ExplorerActions.addStep('abc123', { event_collection: 'one' });
          ExplorerActions.addStep('abc123', { event_collection: 'two' });
          ExplorerActions.addStepFilter('abc123', 0, { property_name: 'one' });
          ExplorerActions.addStepFilter('abc123', 1, { property_name: 'two' });
          ExplorerActions.addStepFilter('abc123', 1, { property_name: 'three' });
          ExplorerActions.removeStepFilter('abc123', 1, 0);

          expect(ExplorerStore.get('abc123').query.steps[1].filters).toHaveLength(1);
          expect(ExplorerStore.get('abc123').query.steps[1].filters[0].property_name).toEqual('three');
        });
        it('should update a filter at the correct step', () => {
          const spy = jest.spyOn(ProjectUtils, 'getPropertyType').mockReturnValue('String');

          ExplorerActions.addStep('abc123', { event_collection: 'one' });
          ExplorerActions.addStep('abc123', { event_collection: 'two' });
          ExplorerActions.addStepFilter('abc123', 0, { property_name: 'one' });
          ExplorerActions.addStepFilter('abc123', 1, { property_name: 'two' });
          ExplorerActions.addStepFilter('abc123', 1, { property_name: 'three' });
          ExplorerActions.updateStepFilter('abc123', 1, 0, { property_name: 'something else' });

          expect(ExplorerStore.get('abc123').query.steps[1].filters).toHaveLength(2);
          expect(ExplorerStore.get('abc123').query.steps[1].filters[0].property_name).toEqual('something else');

          spy.mockRestore();
        });
      });
    });
  });

});
