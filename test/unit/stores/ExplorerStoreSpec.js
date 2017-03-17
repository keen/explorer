var assert = require('chai').assert;
var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var moment = require('moment');
var TestHelpers = require('../../support/TestHelpers');
var ProjectStore = require('../../../client/js/app/stores/ProjectStore');
var ProjectUtils = require('../../../client/js/app/utils/ProjectUtils');
var FormatUtils = require('../../../client/js/app/utils/FormatUtils');
var ExplorerStore = require('../../../client/js/app/stores/ExplorerStore');
var ExplorerActions = require('../../../client/js/app/actions/ExplorerActions');

describe('stores/ExplorerStore', function() {
  beforeEach(function () {
    ExplorerStore.clearAll();
  });

  describe('create', function () {
    it('should create a single', function () {
      ExplorerActions.create();
      assert.lengthOf(Object.keys(ExplorerStore.getAll()), 1)
    });
    it('should not allow creating with active set to true', function () {
      expect(ExplorerActions.create.bind(null, { active: true })).to.throw("You must use setActive to set a model as active.");
    });
    it('should create a explorer with the right default attributes', function () {
      ExplorerActions.create();
      var defaults = {
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
          timezone: ProjectUtils.getLocalTimezoneOffset(),
          filters: null,
          email: null,
          latest: null,
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

      var keys = Object.keys(ExplorerStore.getAll());
      assert.deepEqual(_.omit(ExplorerStore.getAll()[keys[0]], 'id'),
                       defaults);
    });
    it('should assign attributes passed in to the new explorer', function () {
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
      var keys = Object.keys(ExplorerStore.getAll());
      assert.deepPropertyVal(ExplorerStore.getAll()[keys[0]], 'query.event_collection', 'clicks');
      assert.deepPropertyVal(ExplorerStore.getAll()[keys[0]], 'query.analysis_type', 'count');
      assert.deepPropertyVal(ExplorerStore.getAll()[keys[0]], 'metadata.visualization.chart_type', 'metric');
    });
    it('should translate a null group_by to an empty array', function () {
      ExplorerActions.create({
        query: {
          group_by: null
        }
      });
      var keys = Object.keys(ExplorerStore.getAll());
      assert.equal(ExplorerStore.getAll()[keys[0]].query.group_by.length, 0);
    });
    it('should wrap non-null group_by values in an array', function () {
      ExplorerActions.create({
        query: {
          group_by: 'thing'
        }
      });
      var keys = Object.keys(ExplorerStore.getAll());
      assert.equal(ExplorerStore.getAll()[keys[0]].query.group_by.length, 1);
      assert.equal(ExplorerStore.getAll()[keys[0]].query.group_by[0], 'thing');
    });
    it('should set the store object key to the id is one is passed in', function () {
      ExplorerActions.create({
        id: 'abc123'
      });
      var keys = Object.keys(ExplorerStore.getAll());
      assert.deepPropertyVal(ExplorerStore.getAll()[keys[0]], 'id', 'abc123');
    });
    it('should create default metadata if metadata is null', function () {
      ExplorerActions.create({
        id: 'abc123',
        metadata: null
      });
      assert.deepEqual(ExplorerStore.get('abc123').metadata, {
        display_name: null,
        visualization: {
          chart_type: null
        }
      });
    });
    it('should turn query.group_by into an array if it is not one already', function () {
      ExplorerActions.create({
        id: 'abc123',
        query: {
          group_by: 'thing'
        }
      });
      assert.sameMembers(ExplorerStore.get('abc123').query.group_by, ['thing']);
    });
    it('should turn percentile value into a number if it was originally a string', function () {
      ExplorerActions.create({
        id: 'abc123',
        query: {
          percentile: '50'
        }
      });
      assert.typeOf(ExplorerStore.get('abc123').query.percentile, 'number');
    });
  });

  describe('clone', function() {
    it('should only clone query data and metadata.visualization.chart_type', function() {
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

      var source = ExplorerStore.get('abc123');
      ExplorerActions.clone(source.id);
      var clone = ExplorerStore.getLast();
      var keys = Object.keys(ExplorerStore.getAll());

      assert.lengthOf(keys, 2);
      assert.isTrue(clone.id !== source.id);
      assert.deepPropertyNotVal(clone, 'id', 'abc123');
      assert.deepPropertyNotVal(clone, 'query_name', 'Test Query');
      assert.deepPropertyVal(clone, 'query_name', null);
      assert.deepPropertyVal(clone, 'query.event_collection', 'signups');
      assert.deepPropertyVal(clone, 'query.analysis_type', 'count');
      assert.deepPropertyVal(clone, 'metadata.display_name', null);
      assert.deepPropertyVal(clone, 'metadata.visualization.chart_type', 'metric');
    });

    it('should clone query into a new object and not modify original object', function() {
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

      var source = ExplorerStore.get('abc456');
      ExplorerActions.clone(source.id);
      var clone = ExplorerStore.getLast();
      var keys = Object.keys(ExplorerStore.getAll());

      assert.lengthOf(keys, 2);
      assert.notStrictEqual(source.query, clone.query);
      assert.notStrictEqual(source.metadata.visualization, clone.metadata.visualization);
      assert.deepPropertyVal(source, 'id','abc456');
      assert.deepPropertyVal(source, 'query_name', 'Another Test Query');
      assert.deepPropertyVal(source, 'query.event_collection', 'signups');
      assert.deepPropertyVal(source, 'query.analysis_type', 'count');
      assert.deepPropertyVal(source, 'metadata.display_name', 'Another Test');
      assert.deepPropertyVal(source, 'metadata.visualization.chart_type', 'metric');
    });
  });

  describe('createBatch', function () {
    it('should create a model for every object in the array under the key "models"', function () {
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
      var keys = Object.keys(ExplorerStore.getAll());
      assert.lengthOf(keys, 3);
      assert.strictEqual(keys[1], 'with_an_id');
      assert.strictEqual(keys[2], 'also_with_an_id');
    });
  });

  describe('getLast', function () {
    it('should get the last explorer in the store', function () {
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
      assert.strictEqual(ExplorerStore.getLast().id, 'THREE');
    });
  });

  describe('update', function () {
    it('should properly update the correct explorer', function () {
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
      var explorer = ExplorerStore.get('SOME_ID');
      var updates = _.cloneDeep(explorer);
      updates.query.event_collection = 'not_clicks';
      updates.query.analysis_type = 'not_count';
      updates.visualization.chart_type = 'not_metric';

      ExplorerActions.update('SOME_ID', updates);

      explorer = ExplorerStore.get('SOME_ID');

      assert.deepPropertyVal(explorer, 'query.event_collection', 'not_clicks');
      assert.deepPropertyVal(explorer, 'query.analysis_type', 'not_count');
      assert.deepPropertyVal(explorer, 'visualization.chart_type', 'not_metric');
    });

    it('should properly merge array values', function () {
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
      var explorer = ExplorerStore.get('SOME_ID');
      var updates = { query: { group_by: ['name'] } }
      ExplorerActions.update('SOME_ID', updates);

      explorer = ExplorerStore.get('SOME_ID');

      assert.sameMembers(explorer.query.group_by, ['name']);
    });

    it('should properly merge the time object', function () {
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
      var explorer = ExplorerStore.get('SOME_ID');
      var updates = {
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
      assert.deepEqual(explorer.query.time, {
        amount: "14",
        relativity: "this",
        sub_timeframe: "days"
      });
    });

    it('should replace the store object key with the new ID if one is passed in via updates', function () {
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
      var explorers = ExplorerStore.getAll();
      assert.lengthOf(Object.keys(explorers), 1);
      assert.propertyVal(explorers, 'abc123');
    });
    it('should wrap the group_by property in an array if it is not already', function () {
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
      var newQuery = _.cloneDeep(ExplorerStore.get('SOME_ID').query);
      newQuery.group_by = 'not_wrapped';
      ExplorerActions.update('SOME_ID', { query: newQuery });
      assert.sameMembers(ExplorerStore.get('SOME_ID').query.group_by, ['not_wrapped']);
    });

    it('should turn percentile value into a number if it was originally a string', function () {
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
      var newQuery = _.cloneDeep(ExplorerStore.get('SOME_ID').query);
      newQuery.percentile = '75';
      ExplorerActions.update('SOME_ID', { query: newQuery });
      assert.typeOf(ExplorerStore.get('SOME_ID').query.percentile, 'number');
    });

    describe('clearing values', function () {
      it('should set email to null if updating analysis type to something that is not extraction', function () {
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

        var explorer = ExplorerStore.get('SOME_ID');
        var updates = _.cloneDeep(explorer);
        updates.query.analysis_type = 'count';
        ExplorerActions.update('SOME_ID', updates);

        assert.deepPropertyVal(ExplorerStore.get('SOME_ID'), 'query.email', null);
      });
      it('should set latest to null if updating analysis type to something that is not extraction', function () {
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

        var explorer = ExplorerStore.get('SOME_ID');
        var updates = _.cloneDeep(explorer);
        updates.query.analysis_type = 'count';
        ExplorerActions.update('SOME_ID', updates);

        assert.deepPropertyVal(ExplorerStore.get('SOME_ID'), 'query.latest', null);
      });
      it('does not clear the email field if the analysis type is extraction', function () {
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

        var explorer = ExplorerStore.get('SOME_ID');
        var updates = _.cloneDeep(explorer);
        updates.query.analysis_type = 'extraction';
        updates.query.email = 'someone@keen.io';
        ExplorerActions.update('SOME_ID', updates);

        assert.deepPropertyVal(ExplorerStore.get('SOME_ID'), 'query.email', 'someone@keen.io');
      });
      it('does not clear the latest field if the analysis type is extraction and email is present', function () {
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

        var explorer = ExplorerStore.get('SOME_ID');
        var updates = _.cloneDeep(explorer);
        updates.query.analysis_type = 'extraction';
        updates.query.email = 'person@keen.io';
        updates.query.latest = '1000';
        ExplorerActions.update('SOME_ID', updates);

        assert.deepPropertyVal(ExplorerStore.get('SOME_ID'), 'query.latest', '1000');
      });
      it('should set group_by to empty array and interval to null if the analysis type is extraction', function () {
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

        var explorer = ExplorerStore.get('SOME_ID');
        var updates = _.cloneDeep(explorer);
        updates.query.analysis_type = 'extraction';
        updates.query.latest = 1000;
        ExplorerActions.update('SOME_ID', updates);

        assert.deepPropertyVal(ExplorerStore.get('SOME_ID'), 'query.interval', null);
        assert.sameMembers(ExplorerStore.get('SOME_ID').query.group_by, []);
      });
      it('should set percentile to null if the analysis type is not percentile', function () {
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

        var explorer = ExplorerStore.get('SOME_ID');
        var updates = _.cloneDeep(explorer);
        updates.query.analysis_type = 'count';
        ExplorerActions.update('SOME_ID', updates);

        assert.deepPropertyVal(ExplorerStore.get('SOME_ID'), 'query.percentile', null);
        assert.deepPropertyVal(ExplorerStore.get('SOME_ID'), 'query.target_property', null);
      });
      it('should set target_property to null if the analysis type is count', function () {
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

        var explorer = ExplorerStore.get('SOME_ID');
        var updates = _.cloneDeep(explorer);
        updates.query.analysis_type = 'count';
        ExplorerActions.update('SOME_ID', updates);

        assert.deepPropertyVal(ExplorerStore.get('SOME_ID'), 'query.target_property', null);
      });
      it('should set target_property to null if the analysis type is extraction', function () {
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

        var explorer = ExplorerStore.get('SOME_ID');
        var updates = _.cloneDeep(explorer);
        updates.query.analysis_type = 'extraction';
        ExplorerActions.update('SOME_ID', updates);

        assert.deepPropertyVal(ExplorerStore.get('SOME_ID'), 'query.target_property', null);
      });
    });
  });

  describe('remove', function () {
    it('should remove an explorer', function () {
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
      assert.deepProperty(ExplorerStore.getAll(), 'SOME_ID');
      ExplorerActions.remove('SOME_ID');
      assert.notDeepProperty(this.store, 'SOME_ID');
    });
    describe('creating a new active model after removal of the currently active one', function () {
      beforeEach(function() {
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
      it('should have an active model after', function () {
        assert.isTrue(ExplorerStore.getActive().active);
      });
      it('should create the new model, not select an existing persisted model', function () {
        assert.strictEqual(ExplorerStore.getActive().id.match('TEMP-').length, 1);
      });
      it('should only have a single active model', function () {
        assert.strictEqual(_.filter(ExplorerStore.getAll(), { active: true  }).length, 1);
      });
      it('should create the new active model and then set it active to ensure it has an originalModel property', function () {
        assert.isTrue(!_.isUndefined(ExplorerStore.getActive().originalModel));
      });
    });
  });

  describe('set active', function () {
    beforeEach(function () {
      ExplorerActions.create();
      ExplorerActions.create();
      ExplorerActions.create();
    });
    it('should set the given explorer active', function () {
      var keys = Object.keys(ExplorerStore.getAll());
      ExplorerActions.setActive(keys[1]);
      assert.isTrue(ExplorerStore.getAll()[keys[1]].active);
    });
    it('should set the rest of the explorers as not active', function () {
      var keys = Object.keys(ExplorerStore.getAll());
      ExplorerActions.setActive(keys[0]);
      ExplorerActions.setActive(keys[2]);

      assert.isFalse(ExplorerStore.getAll()[keys[0]].active);
      assert.isFalse(ExplorerStore.getAll()[keys[1]].active);
      assert.isTrue(ExplorerStore.getAll()[keys[2]].active);
    });
  });

  describe('filters', function () {
    beforeEach(function () {
      ExplorerActions.create();
      this.explorer = ExplorerStore.getAll()[Object.keys(ExplorerStore.getAll())[0]];
    });
    describe('add filter', function () {
      it('should add a new filter to the query', function () {
        assert.lengthOf(this.explorer.query.filters, 0);
        ExplorerActions.addFilter(this.explorer.id);
        assert.lengthOf(this.explorer.query.filters, 1);
      });
      it('should add a new filter to the query with the expected default values', function () {
        ExplorerActions.addFilter(this.explorer.id);
        assert.deepEqual(this.explorer.query.filters[0], {
          property_name: null,
          property_value: null,
          operator: 'eq',
          coercion_type: 'String',
          errors: [],
          isValid: true
        });
      });
      it('should add a new filter to the query with the provided attributes', function () {
        ExplorerActions.addFilter(this.explorer.id, {
          property_name: 'some_name',
          operator: 'gte',
          property_value: 'some_value',
          coercion_type: 'String'
        });
        assert.deepEqual(this.explorer.query.filters[0], {
          property_name: 'some_name',
          operator: 'gte',
          property_value: 'some_value',
          coercion_type: 'String',
          errors: [],
          isValid: true
        });
      });
    });

    describe('remove filter', function () {
      beforeEach(function () {
        ExplorerStore.clearAll();
        ExplorerActions.create();
        ExplorerActions.create();
        ExplorerActions.create();
      });
      it('should remove the correct filter from the explorer with the provided ID', function () {
        var secondExplorer = ExplorerStore.getAll()[Object.keys(ExplorerStore.getAll())[1]];
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
        assert.lengthOf(ExplorerStore.get(secondExplorer.id).query.filters, 2);
        assert.sameDeepMembers(ExplorerStore.get(secondExplorer.id).query.filters, [
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
        ]);
      });
    });

    describe('update filter', function () {
      before(function () {
        this.getPropertyTypeStub = sinon.stub(ProjectUtils, 'getPropertyType');
        this.coercionTypeForPropertyTypeStub = sinon.stub(FormatUtils, 'coercionTypeForPropertyType');
        this.getProjectStub = sinon.stub(ProjectStore, 'getProject');
      });

      after(function () {
        ProjectUtils.getPropertyType.restore();
        FormatUtils.coercionTypeForPropertyType.restore();
        ProjectStore.getProject.restore();
      });

      beforeEach(function () {
        ExplorerActions.create();
        this.explorer = ExplorerStore.getAll()[Object.keys(ExplorerStore.getAll())[0]];
        ExplorerActions.addFilter(this.explorer.id);
      });

      it('should apply the provided updates', function () {
        this.coercionTypeForPropertyTypeStub.returns('String');
        ExplorerActions.updateFilter(this.explorer.id, 0, {
          property_name: 'some_other_name'
        });
        assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'property_name', 'some_other_name');
      });

      describe('preparing updates before updating the filter', function () {

        describe('property_name', function () {
          it('should set the coercion type to the default for that type when the property name is changed', function () {
            this.coercionTypeForPropertyTypeStub.returns('Datetime');
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_name: 'some_other_name'
            });
            assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'property_name', 'some_other_name');
            assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'coercion_type', 'Datetime');
          });
          it('should NOT change the coercion_type if the property_name is the same', function () {
            this.coercionTypeForPropertyTypeStub.returns('List');
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_name: 'name',
              property_value: 'something',
              operator: 'eq'
            });
            this.coercionTypeForPropertyTypeStub.returns('String');
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_value: 'something else'
            });
            assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'property_name', 'name');
            assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'coercion_type', 'List');
          });
          describe('with exists operator', function() {
            it('should keep the coercion_type as Boolean', function () {
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                property_name: 'name',
                operator: 'exists',
                coercion_type: 'Boolean',
                property_value: true
              });
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                property_name: 'new value'
              });
              assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'coercion_type', 'Boolean');
            });
            it('should keep the property_value as the Boolean value (true)', function () {
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                property_name: 'name',
                operator: 'exists',
                coercion_type: 'Boolean',
                property_value: true
              });
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                property_name: 'new value'
              });
              assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'property_value', true);
            });
            it('should keep the property_value as the Boolean value (false)', function () {
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                property_name: 'name',
                operator: 'exists',
                coercion_type: 'Boolean',
                property_value: false
              });
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                property_name: 'new value'
              });
              assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'property_value', false);
            });
          });
        });

        describe('operator', function () {
          it('should NOT change coercion_type if the operator is the same', function () {
            this.coercionTypeForPropertyTypeStub.returns('List');
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_name: 'name',
              operator: 'eq'
            });
            this.coercionTypeForPropertyTypeStub.returns('String');
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_value: 'some value'
            });
            assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'property_name', 'name');
            assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'coercion_type', 'List');
          });

          describe('updating the coercion_type based on the operator', function () {
            beforeEach(function () {
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                property_name: 'name',
                operator: 'eq',
                coercion_type: 'String'
              });
            });

            it('should change the coercion_type to List for operator "in"', function () {
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                operator: 'in'
              });
              assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'coercion_type', 'List');
            });
            it('should change the coercion_type to Boolean for operator "exists"', function () {
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                operator: 'exists'
              });
              assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'coercion_type', 'Boolean');
            });
            it('should change the coercion_type to Geo for operator "within"', function () {
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                operator: 'within'
              });
              assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'coercion_type', 'Geo');
            });
            it('should update to the right coercion_type for that operator if the current type is not supported', function () {
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                coercion_type: 'Boolean'
              });
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                operator: 'gt'
              });
              assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'coercion_type', 'Number');
            });
            it('should NOT update to the right coercion_type for that operator if the current type IS supported', function () {
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                coercion_type: 'String'
              });
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                operator: 'gt'
              });
              assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'coercion_type', 'String');
            });
          });
        });

        describe('Geo coercion_type', function () {
          it('should set up a default geo filter if the coercion_type is changed to Geo', function () {
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_name: 'name',
              operator: 'eq',
              coercion_type: 'String'
            });
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              operator: 'within'
            });
            assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'coercion_type', 'Geo');
            assert.deepEqual(ExplorerStore.get(this.explorer.id).query.filters[0].property_value, {
              coordinates: [],
              max_distance_miles: null
            });
          });
        });

        describe('coercion of the propety value', function () {
          it('should coerce the property value (Number)', function () {
            this.coercionTypeForPropertyTypeStub.returns('Number');
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_name: 'name',
              operator: 'eq',
              coercion_type: 'Number'
            });
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_value: '10'
            });
            assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'property_value', 10);
          });

          it('should coerce the property value (Boolean)', function () {
            this.coercionTypeForPropertyTypeStub.returns('Boolean');
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_name: 'name',
              operator: 'eq',
              coercion_type: 'Boolean'
            });
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_value: 'true'
            });
            assert.deepPropertyVal(ExplorerStore.get(this.explorer.id).query.filters[0], 'property_value', true);
          });
        });
      });
    });

    describe('clear', function () {
      it('should reset the given explorer to defaults but keeps the same active, name, originalModel and metadata attributes', function () {
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
        var updates = _.cloneDeep(ExplorerStore.get('ABC-SOME-ID'));
        var originalModel = _.cloneDeep(ExplorerStore.get('ABC-SOME-ID'));
        updates.originalModel = originalModel;
        ExplorerActions.update('ABC-SOME-ID', updates);

        ExplorerActions.clear('ABC-SOME-ID');

        var expectedModel = {
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
            timezone: ProjectUtils.getLocalTimezoneOffset(),
            filters: null,
            email: null,
            latest: null,
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

        assert.deepEqual(ExplorerStore.get('ABC-SOME-ID'), expectedModel);
      });
    });
  });

  describe('getActive', function () {
    it('should return the active explorer', function () {
      ExplorerActions.create();
      ExplorerActions.create();
      ExplorerActions.create({ id: 'some_id' });
      ExplorerActions.setActive('some_id');
      var keys = Object.keys(ExplorerStore.getAll());
      assert.strictEqual(ExplorerStore.getActive().id, ExplorerStore.getAll()[keys[2]].id);
    });
  });

  describe('getAll', function () {
    it('should return all the explorers', function () {
      ExplorerActions.create();
      ExplorerActions.create();
      assert.lengthOf(Object.keys(ExplorerStore.getAll()), 2);
    });
  });

  describe('funnels', function () {
    describe('changing TO funnels', function () {

      beforeEach(function () {
        ExplorerActions.create({id: 'abc123'});
      });

      it('should set root query properties to null or empty arrays', function () {
        ExplorerActions.update('abc123', { query: { analysis_type: 'funnel' } });

        var explorer = ExplorerStore.get('abc123');
        assert.deepPropertyVal(explorer, 'query.event_collection', null);
        assert.deepPropertyVal(explorer, 'query.target_property', null);
        assert.deepPropertyVal(explorer, 'query.time', null);
        assert.deepPropertyVal(explorer, 'query.timezone', null);
        assert.sameMembers(explorer.query.filters, []);
      });

      it('should create a first active step', function () {
        ExplorerActions.update('abc123', { query: { analysis_type: 'funnel' } });

        var explorer = ExplorerStore.get('abc123');
        assert.deepProperty(explorer, 'query.steps');
        assert.strictEqual(explorer.query.steps.length, 1);
        assert.strictEqual(explorer.query.steps[0].active, true);
      });

      it('should move root properties over to the first step', function () {
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
        var explorer = ExplorerStore.get('abc123');

        assert.strictEqual(explorer.query.steps[0].event_collection, 'pageviews');
        assert.strictEqual(explorer.query.steps[0].actor_property, 'user');
        assert.deepEqual(explorer.query.steps[0].time, {
         relativity: 'this',
         amount: 1,
         sub_timeframe: 'hours'
        });
      });

      it('should remove the root group_by property', function () {
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
        var explorer = ExplorerStore.get('abc123');
        assert.sameMembers(explorer.query.group_by, []);
      });

      it('should set unsupported interval property value to null', function () {
        ExplorerActions.update('abc123', {
          query: {
            analysis_type: 'count',
            event_collection: 'pageviews',
            interval: 'interval_value',
            filters: []
          }
        });
        ExplorerActions.update('abc123', { query: { analysis_type: 'funnel' } });
        var explorer = ExplorerStore.get('abc123');
        assert.equal(explorer.query.interval, null);
      });

      it('should set the global timeframe property to null', function () {
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
        var explorer = ExplorerStore.get('abc123');
        assert.strictEqual(explorer.query.timeframe, null);
      });

    });

    describe('changing FROM funnels', function () {
      beforeEach(function () {
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

      it('removes the steps property', function() {
        var updates = _.cloneDeep(ExplorerStore.get('abc123'));
        updates.query.analysis_type = 'count';
        ExplorerActions.update('abc123', updates);
        assert.sameMembers(ExplorerStore.get('abc123').query.steps, []);
      });

      it('moves active step properties to the root query', function () {
        var updates = _.cloneDeep(ExplorerStore.get('abc123'));
        updates.query.analysis_type = 'count_unique';
        ExplorerActions.update('abc123', updates);

        var newExplorer = ExplorerStore.get('abc123');

        assert.strictEqual(newExplorer.query.event_collection, 'signups');
        assert.strictEqual(newExplorer.query.target_property, 'user');
        assert.strictEqual(newExplorer.query.timezone, 'PDT');
        assert.deepEqual(newExplorer.query.time, {
          relativity: 'this',
          amount: 7,
          sub_timeframe: 'days'
        });
      });

      it('returns the unchanged model if there are no steps', function () {
        ExplorerActions.create({ id: 'def456',
          query: {
            event_collection: 'collection',
            analysis_type: 'funnel',
          }
        });
        var updates = _.cloneDeep(ExplorerStore.get('def456'));
        updates.query.analysis_type = 'count';
        ExplorerActions.update('def456', updates);
        assert.strictEqual(ExplorerStore.get('def456').query.event_collection, 'collection');
        assert.strictEqual(ExplorerStore.get('def456').query.analysis_type, 'count');
      });
    });

    describe('Funnel step management', function () {
      beforeEach(function() {
        ExplorerStore.clearAll();
        ExplorerActions.create({ id: 'abc123', query: { analysis_type: 'funnel' } });
      });
      it('should properly add a step when addStep is called', function () {
        var oldStepsLength = ExplorerStore.get('abc123').query.steps.length;
        ExplorerActions.addStep('abc123');
        assert.equal(ExplorerStore.get('abc123').query.steps.length, oldStepsLength+1);
      });
      it('should make the first step active when added', function () {
        assert.equal(ExplorerStore.get('abc123').query.steps.length, 0);
        ExplorerActions.addStep('abc123');
        assert.equal(ExplorerStore.get('abc123').query.steps.length, 1);
        assert.deepEqual(ExplorerStore.get('abc123').query.steps[0], {
          event_collection: null,
          actor_property: null,
          time: {
            relativity: 'this',
            amount: 14,
            sub_timeframe: 'days'
          },
          timezone: ProjectUtils.getLocalTimezoneOffset(),
          filters: [],
          optional: false,
          inverted: false,
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
      it('should throw an error if a step is attempted to be added without the explorer having a funnel analysis type', function () {
        var updates = _.cloneDeep(ExplorerStore.get('abc123'));
        updates.query.analysis_type = 'count';
        ExplorerActions.update('abc123', updates);
        expect(ExplorerActions.addStep.bind(null, 'abc123')).to.throw("Error: Attempting to add a step to a non-funnel query. Explorer id: abc123");
      });
      it('should properly remove a step at the given index', function () {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });
        assert.equal(ExplorerStore.get('abc123').query.steps.length, 4);
        ExplorerActions.removeStep('abc123', 2);
        assert.equal(ExplorerStore.get('abc123').query.steps.length, 3);

        assert.equal(ExplorerStore.get('abc123').query.steps[0].event_collection, 'one');
        assert.equal(ExplorerStore.get('abc123').query.steps[1].event_collection, 'two');
        assert.equal(ExplorerStore.get('abc123').query.steps[2].event_collection, 'four');
      });
      it('should properly update a step at the given index and not change any others', function () {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });

        ExplorerActions.updateStep('abc123', 1, { event_collection: 'something else' });

        assert.equal(ExplorerStore.get('abc123').query.steps[0].event_collection, 'one');
        assert.equal(ExplorerStore.get('abc123').query.steps[1].event_collection, 'something else');
        assert.equal(ExplorerStore.get('abc123').query.steps[2].event_collection, 'three');
        assert.equal(ExplorerStore.get('abc123').query.steps[3].event_collection, 'four');
      });
      it('should properly set a step active and all others inactive', function () {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });

        assert.isFalse(ExplorerStore.get('abc123').query.steps[0].active, 'step 1');
        assert.isFalse(ExplorerStore.get('abc123').query.steps[1].active, 'step 2');
        assert.isFalse(ExplorerStore.get('abc123').query.steps[2].active, 'step 3');
        assert.isTrue(ExplorerStore.get('abc123').query.steps[3].active, 'step 4');

        ExplorerActions.setStepActive('abc123', 2);

        assert.isFalse(ExplorerStore.get('abc123').query.steps[0].active, 'step 1');
        assert.isFalse(ExplorerStore.get('abc123').query.steps[1].active, 'step 2');
        assert.isTrue(ExplorerStore.get('abc123').query.steps[2].active, 'step 3');
        assert.isFalse(ExplorerStore.get('abc123').query.steps[3].active, 'step 4');
      });

      it('should properly move the step up', function () {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });

        ExplorerActions.moveStep('abc123', 2, 'up');

        assert.equal(ExplorerStore.get('abc123').query.steps[0].event_collection, 'one');
        assert.equal(ExplorerStore.get('abc123').query.steps[1].event_collection, 'three');
        assert.equal(ExplorerStore.get('abc123').query.steps[2].event_collection, 'two');
        assert.equal(ExplorerStore.get('abc123').query.steps[3].event_collection, 'four');
      });

      it('should properly move the step down', function () {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });

        ExplorerActions.moveStep('abc123', 2, 'down');

        assert.equal(ExplorerStore.get('abc123').query.steps[0].event_collection, 'one');
        assert.equal(ExplorerStore.get('abc123').query.steps[1].event_collection, 'two');
        assert.equal(ExplorerStore.get('abc123').query.steps[2].event_collection, 'four');
        assert.equal(ExplorerStore.get('abc123').query.steps[3].event_collection, 'three');
      });

      it('should be a no op if you try to move the first step up', function () {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });

        ExplorerActions.moveStep('abc123', 0, 'up');

        assert.equal(ExplorerStore.get('abc123').query.steps[0].event_collection, 'one');
        assert.equal(ExplorerStore.get('abc123').query.steps[1].event_collection, 'two');
        assert.equal(ExplorerStore.get('abc123').query.steps[2].event_collection, 'three');
        assert.equal(ExplorerStore.get('abc123').query.steps[3].event_collection, 'four');
      });

      it('should be a no op if you try to move the last step down', function () {
        ExplorerActions.addStep('abc123', { event_collection: 'one' });
        ExplorerActions.addStep('abc123', { event_collection: 'two' });
        ExplorerActions.addStep('abc123', { event_collection: 'three' });
        ExplorerActions.addStep('abc123', { event_collection: 'four' });

        ExplorerActions.moveStep('abc123', 3, 'down');

        assert.equal(ExplorerStore.get('abc123').query.steps[0].event_collection, 'one');
        assert.equal(ExplorerStore.get('abc123').query.steps[1].event_collection, 'two');
        assert.equal(ExplorerStore.get('abc123').query.steps[2].event_collection, 'three');
        assert.equal(ExplorerStore.get('abc123').query.steps[3].event_collection, 'four');
      });

      describe('Funnel Step Filters', function () {
        it('should add a filter to a step', function () {
          ExplorerActions.addStep('abc123', { event_collection: 'one' });
          ExplorerActions.addStep('abc123', { event_collection: 'two' });
          ExplorerActions.addStepFilter('abc123', 1, { property_name: 'name' });

          assert.equal(ExplorerStore.get('abc123').query.steps[1].filters.length, 1);
          assert.equal(ExplorerStore.get('abc123').query.steps[1].filters[0].property_name, 'name');
        });
        it('should remove a filter from the correct step', function () {
          ExplorerActions.addStep('abc123', { event_collection: 'one' });
          ExplorerActions.addStep('abc123', { event_collection: 'two' });
          ExplorerActions.addStepFilter('abc123', 0, { property_name: 'one' });
          ExplorerActions.addStepFilter('abc123', 1, { property_name: 'two' });
          ExplorerActions.addStepFilter('abc123', 1, { property_name: 'three' });
          ExplorerActions.removeStepFilter('abc123', 1, 0);

          assert.equal(ExplorerStore.get('abc123').query.steps[1].filters.length, 1);
          assert.equal(ExplorerStore.get('abc123').query.steps[1].filters[0].property_name, 'three');
        });
        it('should update a filter at the correct step', function () {
          sinon.stub(ProjectUtils, 'getPropertyType').returns('String');

          ExplorerActions.addStep('abc123', { event_collection: 'one' });
          ExplorerActions.addStep('abc123', { event_collection: 'two' });
          ExplorerActions.addStepFilter('abc123', 0, { property_name: 'one' });
          ExplorerActions.addStepFilter('abc123', 1, { property_name: 'two' });
          ExplorerActions.addStepFilter('abc123', 1, { property_name: 'three' });
          ExplorerActions.updateStepFilter('abc123', 1, 0, { property_name: 'something else' });

          assert.equal(ExplorerStore.get('abc123').query.steps[1].filters.length, 2);
          assert.equal(ExplorerStore.get('abc123').query.steps[1].filters[0].property_name, 'something else');

          ProjectUtils.getPropertyType.restore();
        });
      });
    });
  });
});
