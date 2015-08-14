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
    it('should create a explorer with the right default attributes', function () {
      ExplorerActions.create();
      var defaults = {
        active: false,
        error: null,
        result: null,
        loading: false,
        saving: false,
        isValid: true,
        timeframe_type: 'relative',
        name: 'Untitled',
        query: {
          event_collection: null,
          analysis_type: null,
          target_property: null,
          percentile: null,
          group_by: null,
          interval: null,
          timezone: ProjectUtils.getConstant('DEFAULT_TIMEZONE'),
          filters: null,
          email: null,
          latest: null,
          filters: [],
          time: {
            relativity: 'this',
            amount: 14,
            sub_timeframe: 'days'
          }
        },
        visualization: {
          chart_type: null
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
        visualization: {
          chart_type: 'metric'
        }
      });
      var keys = Object.keys(ExplorerStore.getAll());
      assert.deepPropertyVal(ExplorerStore.getAll()[keys[0]], 'query.event_collection', 'clicks');
      assert.deepPropertyVal(ExplorerStore.getAll()[keys[0]], 'query.analysis_type', 'count');
      assert.deepPropertyVal(ExplorerStore.getAll()[keys[0]], 'visualization.chart_type', 'metric');
    });
    it('should set the store object key to the id is one is passed in', function () {
      ExplorerActions.create({
        id: 'abc123'
      });
      var keys = Object.keys(ExplorerStore.getAll());
      assert.deepPropertyVal(ExplorerStore.getAll()[keys[0]], 'id', 'abc123');
    });
  });

  describe('crateBatch', function () {
    it('should create a model for every object in the array under the key "models"', function () {
      ExplorerActions.createBatch([
        {
          query: {
            event_collection: 'clicks',
            analysis_type: 'count'
          },
          visualization: {
            chart_type: 'metric'
          }
        },
        {
          id: 'with_an_id',
          query: {
            event_collection: 'signups',
            analysis_type: 'count'
          },
          visualization: {
            chart_type: 'metric'
          }
        },
        {
          id: 'also_with_an_id',
          query: {
            event_collection: 'downloads',
            analysis_type: 'count'
          },
          visualization: {
            chart_type: 'json'
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
    it('should properly upadte the correct explorer', function () {
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
      ExplorerActions.update('SOME_ID', {
        timeframe_type: 'absolute',
        query: {
          event_collection: 'not_clicks',
          analysis_type: 'not_count'
        },
        visualization: {
          chart_type: 'not_metric'
        }
      });
      var explorer = ExplorerStore.getAll()['SOME_ID'];
      assert.deepPropertyVal(explorer, 'timeframe_type', 'absolute');
      assert.deepPropertyVal(explorer, 'query.event_collection', 'not_clicks');
      assert.deepPropertyVal(explorer, 'query.analysis_type', 'not_count');
      assert.deepPropertyVal(explorer, 'visualization.chart_type', 'not_metric');
    });
    it('should replace the store object key with the new ID if one is passed in via updates', function () {
      ExplorerActions.create({
        id: 'SOME_ID',
        name: 'A saved query',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count'
        },
        visualization: {
          chart_type: 'metric'
        }
      });
      ExplorerActions.update('SOME_ID', {
        id: 'abc123',
        query: {
          event_collection: 'clicks',
          analysis_type: 'count'
        },
        visualization: {
          chart_type: 'metric'
        }
      });
      var explorers = ExplorerStore.getAll();
      assert.lengthOf(Object.keys(explorers), 1);
      assert.propertyVal(explorers, 'abc123');
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
          coercion_type: 'String'
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
          coercion_type: 'String'
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
          property_name: 'one'
        });
        ExplorerActions.addFilter(secondExplorer.id, {
          property_name: 'two'
        });
        ExplorerActions.addFilter(secondExplorer.id, {
          property_name: 'three'
        });
        ExplorerActions.removeFilter(secondExplorer.id, 1);
        assert.lengthOf(secondExplorer.query.filters, 2);
        assert.sameDeepMembers(secondExplorer.query.filters, [
          {
            property_name: 'one',
            property_value: null,
            operator: 'eq',
            coercion_type: 'String'
          },
          {
            property_name: 'three',
            property_value: null,
            operator: 'eq',
            coercion_type: 'String'
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
        assert.deepPropertyVal(this.explorer.query.filters[0], 'property_name', 'some_other_name');
      });

      describe('preparing updates before updating the filter', function () {
        
        describe('property_name', function () {
          it('should set the coercion type to the default for that type when the property name is changed', function () {
            this.coercionTypeForPropertyTypeStub.returns('Datetime');
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_name: 'some_other_name'
            });
            assert.deepPropertyVal(this.explorer.query.filters[0], 'property_name', 'some_other_name');
            assert.deepPropertyVal(this.explorer.query.filters[0], 'coercion_type', 'Datetime');
          });
          it('should NOT change the coercion_type if the property_name is the same', function () {
            this.coercionTypeForPropertyTypeStub.returns('Datetime');
            this.explorer.query.filters[0].property_name = 'name';
            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_name: 'name',
              coercion_type: 'String'
            });
            assert.deepPropertyVal(this.explorer.query.filters[0], 'property_name', 'name');
            assert.deepPropertyVal(this.explorer.query.filters[0], 'coercion_type', 'String');
          });
        });
        
        describe('operator', function () {
          it('should NOT change coercion_type if the operator is the same', function () {
            this.explorer.query.filters[0] = {
              property_name: 'name',
              operator: 'eq',
              coercion_type: 'List'
            };

            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_name: 'name',
              operator: 'eq'
            });
            assert.deepPropertyVal(this.explorer.query.filters[0], 'property_name', 'name');
            assert.deepPropertyVal(this.explorer.query.filters[0], 'coercion_type', 'List');
          });

          describe('updating the coercion_type based on the operator', function () {
            beforeEach(function () {
              this.explorer.query.filters[0] = {
                property_name: 'name',
                operator: 'eq',
                coercion_type: 'String'
              };
            });
            
            it('should change the coercion_type to List for operator "in"', function () {
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                operator: 'in'
              });
              assert.deepPropertyVal(this.explorer.query.filters[0], 'coercion_type', 'List');
            });
            it('should change the coercion_type to Boolean for operator "exists"', function () {
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                operator: 'exists'
              });
              assert.deepPropertyVal(this.explorer.query.filters[0], 'coercion_type', 'Boolean');
            });
            it('should change the coercion_type to Geo for operator "within"', function () {
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                operator: 'within'
              });
              assert.deepPropertyVal(this.explorer.query.filters[0], 'coercion_type', 'Geo');
            });
            it('should update to the right coercion_type for that operator if the current type is not supported', function () {
              this.explorer.query.filters[0].coercion_type = 'Boolean';
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                operator: 'gt'
              });
              assert.deepPropertyVal(this.explorer.query.filters[0], 'coercion_type', 'Number');
            });
            it('should NOT update to the right coercion_type for that operator if the current type IS supported', function () {
              this.explorer.query.filters[0].coercion_type = 'String';
              ExplorerActions.updateFilter(this.explorer.id, 0, {
                operator: 'gt'
              });
              assert.deepPropertyVal(this.explorer.query.filters[0], 'coercion_type', 'String');
            });
          });
        });

        describe('Geo coercion_type', function () {
          it('should set up a default geo filter if the coercion_type is changed to Geo', function () {
            this.explorer.query.filters[0] = {
              property_name: 'name',
              operator: 'eq',
              coercion_type: 'String'
            };

            ExplorerActions.updateFilter(this.explorer.id, 0, {
              operator: 'within'
            });
            assert.deepPropertyVal(this.explorer.query.filters[0], 'coercion_type', 'Geo');
            assert.deepEqual(this.explorer.query.filters[0].property_value, {
              coordinates: [],
              max_distance_miles: null
            });
          });
        });

        describe('coercion of the propety value', function () {
          it('should coerce the property value (Number)', function () {
            this.explorer.query.filters[0] = {
              property_name: 'name',
              operator: 'eq',
              coercion_type: 'Number'
            };

            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_value: '10'
            });
            assert.deepPropertyVal(this.explorer.query.filters[0], 'property_value', 10);
          });

          it('should coerce the property value (Boolean)', function () {
            this.explorer.query.filters[0] = {
              property_name: 'name',
              operator: 'eq',
              coercion_type: 'Boolean'
            };

            ExplorerActions.updateFilter(this.explorer.id, 0, {
              property_value: 'true'
            });
            assert.deepPropertyVal(this.explorer.query.filters[0], 'property_value', true);
          });
        });
      });
    });

    describe('clear', function () {
      it('should reset the given explorer to defaults but keeps the same active and name attributes', function () {
        ExplorerStore.clearAll();
        ExplorerActions.create(_.assign({}, TestHelpers.createExplorerModel(), {
          id: 'ABC-SOME-ID',
          active: true,
          query: {
            event_collection: 'clicks',
            analysis_type: 'count'
          },
          visualization: {
            chart_type: 'metric'
          }
        }));
        ExplorerActions.clear('ABC-SOME-ID');
        assert.deepEqual(ExplorerStore.get('ABC-SOME-ID'), {
          id: 'ABC-SOME-ID',
          active: true,
          error: null,
          result: null,
          loading: false,
          saving: false,
          isValid: true,
          timeframe_type: 'relative',
          name: 'Untitled',
          query: {
            event_collection: null,
            analysis_type: null,
            target_property: null,
            percentile: null,
            group_by: null,
            interval: null,
            timezone: ProjectUtils.getConstant('DEFAULT_TIMEZONE'),
            filters: null,
            email: null,
            latest: null,
            filters: [],
            time: {
              relativity: 'this',
              amount: 14,
              sub_timeframe: 'days'
            }
          },
          visualization: {
            chart_type: null
          }
        });
      });
    });
  });

  describe('getActive', function () {
    it('should return the active explorer', function () {
      ExplorerActions.create();
      ExplorerActions.create();
      ExplorerActions.create({ active: true });
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
});