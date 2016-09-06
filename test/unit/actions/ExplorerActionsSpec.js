var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');
var moment = require('moment');
var _ = require('lodash');
var KeenAnalysis = require('keen-analysis');
var Qs = require('qs');
var TestHelpers = require('../../support/TestHelpers');
var AppDispatcher = require('../../../client/js/app/dispatcher/AppDispatcher');
var ExplorerActions = require('../../../client/js/app/actions/ExplorerActions');
var AppStateActions = require('../../../client/js/app/actions/AppStateActions');
var FilterUtils = require('../../../client/js/app/utils/FilterUtils');
var RunValidations = require('../../../client/js/app/utils/RunValidations');
var ExplorerValidations = require('../../../client/js/app/validations/ExplorerValidations');
var ExplorerUtils = require('../../../client/js/app/utils/ExplorerUtils');
var ChartTypeUtils = require('../../../client/js/app/utils/ChartTypeUtils');
var ExplorerStore = require('../../../client/js/app/stores/ExplorerStore');

describe('actions/ExplorerActions', function() {
  before(function () {
    this.dispatchStub = sinon.stub(AppDispatcher, 'dispatch');
  });

  after(function () {
    AppDispatcher.dispatch.restore();
  });

  beforeEach(function () {
    this.dispatchStub.reset();
  });

  describe('exec', function () {
    before(function () {
      this.client = new KeenAnalysis(TestHelpers.createClient());
      this.getStub = sinon.stub(ExplorerStore, 'get');
      this.runQueryStub = sinon.stub(ExplorerUtils, 'runQuery');
    });
  
    after(function () {
      ExplorerStore.get.restore();
      ExplorerUtils.runQuery.restore();
    });

    beforeEach(function () {
      this.runQueryStub.reset();
    });
  
    it('should throw an error if the model is currently loading', function () {
      var explorer = { id: 5, loading: true };
      this.getStub.returns(explorer);
      expect(ExplorerActions.exec.bind(null, this.client, explorer.id)).to.throw("Warning: calling exec when model loading is true. Explorer id: 5");
    });
    it('should run the validations with the right arguments', function () {
      var explorer = TestHelpers.createExplorerModel();
      explorer.query.analysis_type = 'count';
      this.getStub.returns(explorer);
      var stub = sinon.stub(ExplorerActions, 'validate');
      ExplorerActions.exec(this.client, explorer.id);
      assert.isTrue(stub.calledOnce);
      ExplorerActions.validate.restore();
    });
    it('should call the dispatcher to update the store and set loading to true', function () {
      var explorer = {
        id: 5,
        loading: false,
        query: {},
        isValid: true
      };
      this.getStub.returns(explorer);
      ExplorerActions.exec(this.client, explorer.id);
      assert.isTrue(this.dispatchStub.calledWith({
        actionType: 'EXPLORER_UPDATE',
        id: 5,
        updates: { loading: true }
      }));
    });
    it('should add the latest attribute with a limit for extractions', function () {
      var explorer = {
        id: 5,
        loading: false,
        isValid: true,
        query: {
          event_collection: 'click',
          analysis_type: 'extraction'
        }
      };
      this.getStub.returns(explorer);
      ExplorerActions.exec(this.client, explorer.id);
      assert.strictEqual(
        this.runQueryStub.getCall(0).args[0].query.latest,
        100
      );
    });
  });

  describe('runEmailExtraction', function () {
    beforeEach(function () {
      this.validateStub = sinon.stub(ExplorerActions, 'validate');
      this.runQueryStub = sinon.stub(ExplorerUtils, 'runQuery');
      this.client = { run: sinon.stub() };
      this.explorer = {
        isValid: false,
        errors: [{
          msg: 'invalid'
        }],
        query: {
          analysis_type: 'count',
          event_collection: 'click',
          email: 'contact@keen.io',
          latest: '100'
        }
      };
      this.getStub = sinon.stub(ExplorerStore, 'get').returns(this.explorer);
    });
  
    afterEach(function () {
      ExplorerActions.validate.restore();
      ExplorerUtils.runQuery.restore();
      ExplorerStore.get.restore();
    });
  
    it('should run validations', function () {
      ExplorerActions.runEmailExtraction(this.client, this.explorer.id);
      assert.isTrue(this.validateStub.calledOnce);
    });
    it('should NOT run the query if validaton fails', function () {
      this.validateStub.returns([{ msg: 'invalid' }]);
      ExplorerActions.runEmailExtraction(this.client, this.explorer.id);
      assert.isFalse(this.runQueryStub.called);
    });
  });

  describe('fetchAllPersisted', function () {
    beforeEach(function () {
      this.models = [
        {
          id: '1',
          name: 'favorite 1',
          query: {
            event_collection: 'clicks',
            analysis_type: 'count',
            time: {
              relativity: 'this',
              amount: 1,
              sub_timeframe: 'weeks'
            }
          },
          refresh_rate: 0,
          metadata: {
            visualization: {
              chart_type: 'metric'
            }
          }
        },
        {
          id: '2',
          name: 'favorite 2',
          refresh_rate: 0,
          query: {
            event_collection: 'clicks',
            analysis_type: 'sum',
            target_property: 'size',
            time: {
              relativity: 'this',
              amount: 1,
              sub_timeframe: 'weeks'
            }
          },
          metadata: {
            visualization: {
              chart_type: 'metric'
            }
          }
        },
        {
          id: '3',
          name: 'favorite 3',
          refresh_rate: 0,
          query: {
            event_collection: 'clicks',
            analysis_type: 'max',
            target_property: 'amount',
            time: {
              relativity: 'this',
              amount: 1,
              sub_timeframe: 'weeks'
            }
          },
          metadata: {
            visualization: {
              chart_type: 'metric'
            }
          }
        }
      ];
      function getFn(id, callback) {
        callback(null, this.models);
      }
      this.persistence = {
        get: getFn.bind(this)
      };
      this.callback = sinon.stub();
    });

    it('should format the params for each model', function () {
      var spy = sinon.spy(ExplorerUtils, 'formatQueryParams');
      ExplorerActions.fetchAllPersisted(this.persistence, this.callback);
      assert.strictEqual(spy.getCalls().length, 3);
      ExplorerUtils.formatQueryParams.restore();
    });
    it('should run validations for each model', function () {
      var stub = sinon.stub(RunValidations, 'run').returns([]);
      ExplorerActions.fetchAllPersisted(this.persistence, this.callback);
      assert.strictEqual(stub.getCalls().length, 3);
      RunValidations.run.restore();
    });
    it('should include invalid models', function () {
      this.models[2].query = {};
      var stub = sinon.stub(ExplorerActions, 'createBatch');
      ExplorerActions.fetchAllPersisted(this.persistence, this.callback);
      assert.strictEqual(stub.getCall(0).args[0].length, 3);
      ExplorerActions.createBatch.restore();
    });
    it('should log a warning for invalid models', function () {
      this.models[2].query = {};
      var stub = sinon.stub(window.console, 'warn');
      ExplorerActions.fetchAllPersisted(this.persistence, this.callback);
      assert.strictEqual(stub.getCall(0).args[0], 'A persisted explorer model is invalid: ');
      assert.deepPropertyVal(stub.getCall(0).args[1], 'id', '3');
      window.console.warn.restore();
    });
    it('should call update app state when done and set fetchingPersistedExplorers to false', function () {
      var stub = sinon.stub(AppStateActions, 'update');
      ExplorerActions.fetchAllPersisted(this.persistence, this.callback);
      assert.isTrue(stub.calledWith({ fetchingPersistedExplorers: false }));
      AppStateActions.update.restore();
    });
  });

  describe('execError', function () {
    beforeEach(function () {
      var explorer = { id: 5 };
      ExplorerActions.execError(explorer, { message: 'NOPE' });
    });

    it('should call the dispatcher to update with the right argments', function () {
      assert.isTrue(this.dispatchStub.calledWith({
        actionType: 'EXPLORER_UPDATE',
        id: 5,
        updates: { loading: false }
      }));
    });
    it('should create a notice with the error message', function () {
      assert.isTrue(this.dispatchStub.calledWith({
        actionType: 'NOTICE_CREATE',
        attrs: {
          text: 'NOPE',
          type: 'error'
        }
      }));
    });
  });

  describe('execSuccess', function () {
    beforeEach(function () {
      this.explorer = {
        id: 5,
        query: {
          analysis_type: 'count'
        },
        metadata: {
          visualization: {
            chart_type: null
          }
        }
      };
      this.response = { result: 100 };
      sinon.stub(ChartTypeUtils, 'getChartTypeOptions').returns(['metric']);
      this.responseSupportsChartTypeStub = sinon.stub(ChartTypeUtils, 'responseSupportsChartType').returns(false);
    });
    afterEach(function () {
      ChartTypeUtils.getChartTypeOptions.restore();
      ChartTypeUtils.responseSupportsChartType.restore();
    });

    it('should call the dispatcher to update with the right arguments', function () {
      // var expectedUpdates = _.cloneDeep(this.explorer);
      expectedUpdates = {
        loading: false,
        response: this.response,
        metadata: _.cloneDeep(this.explorer.metadata)
      };
      expectedUpdates.metadata.visualization.chart_type = 'metric';

      ExplorerActions.execSuccess(this.explorer, this.response);

      assert.strictEqual(this.dispatchStub.getCall(2).args[0].actionType, 'EXPLORER_UPDATE');
      assert.strictEqual(this.dispatchStub.getCall(2).args[0].id, 5);

      // We need to check the dataTimestamp separately because we cannot get Date.now()'s to match
      // as they will be off by a few milliseconds.
      assert.deepEqual(_.omit(this.dispatchStub.getCall(2).args[0].updates, 'dataTimestamp'), expectedUpdates);

      var actualTimestamp = this.dispatchStub.getCall(2).args[0].updates.dataTimestamp;
      actualTimestamp = actualTimestamp.toString().substring(0, actualTimestamp.length-5);

      var expectedTimestamp = Date.now();
      expectedTimestamp = expectedTimestamp.toString().substring(0, expectedTimestamp.length-5);

      assert.strictEqual(actualTimestamp, expectedTimestamp);
    });
    it('should clear all notices', function () {
      ExplorerActions.execSuccess(this.explorer, this.response);
      assert.isTrue(this.dispatchStub.calledWith({
        actionType: 'NOTICE_CLEAR_ALL'
      }));
    });
    it('should add a query object on the response if one is not there', function () {
      ExplorerActions.execSuccess(this.explorer, this.response);
      assert.deepPropertyVal(this.dispatchStub.getCall(2).args[0].updates.response, 'query');
      assert.deepEqual(this.dispatchStub.getCall(2).args[0].updates.response.query, { analysis_type: 'count' });
    });
    it('should not add a query object on the response if one is not there', function () {
      ExplorerActions.execSuccess(this.explorer, _.assign({}, this.response, { query: { analysis_type: 'not_count' } }));
      assert.deepPropertyVal(this.dispatchStub.getCall(2).args[0].updates.response, 'query');
      assert.deepEqual(this.dispatchStub.getCall(2).args[0].updates.response.query, { analysis_type: 'not_count' });
    });
    it('should call ExplorerUtils.responseSupportsChartType with the right arguments', function () {
      var response = _.assign({}, this.response, { query: { analysis_type: 'not_count' } });
      ExplorerActions.execSuccess(this.explorer, response);
      assert.isTrue(this.responseSupportsChartTypeStub.calledWith(response.query, this.explorer.metadata.visualization.chart_type));
    });
  });

  describe('async functions', function () {
    before(function () {
      this.getStub = sinon.stub(ExplorerStore, 'get')
    });
    after(function () {
      ExplorerStore.get.restore();
    });

    describe('save with unpersisted explorer', function () {
      beforeEach(function () {
        this.persistence = {
          create: function(model, callback) {
            callback(null, _.assign({}, ExplorerUtils.formatQueryParams(ExplorerUtils.toJSON(model)), { query_name: 'abc123' }));
          }
        };
        this.explorer = TestHelpers.createExplorerModel();
        this.explorer.id = 'TEMP-ABC';
        this.explorer.query_name = 'some name';
        this.explorer.query.event_collection = 'clicks';
        this.explorer.query.analysis_type = 'count';
        this.getStub.returns(this.explorer);
        sinon.stub(ExplorerUtils, 'mergeResponseWithExplorer').returns({ testKey: 'some updates' });
      });

      afterEach(function(){
        ExplorerUtils.mergeResponseWithExplorer.restore();
      });

      it('should dispatch an EXPLORER_SAVING event', function () {
        ExplorerActions.save(this.persistence, 'TEMP-ABC');
        assert.isTrue(this.dispatchStub.calledWith({
          actionType: 'EXPLORER_SAVING',
          id: 'TEMP-ABC',
          saveType: 'save'
        }));
      });
      it('should dispatch to update the right model with params from mergeResponseWithExplorer if successful', function () {
        ExplorerActions.save(this.persistence, 'TEMP-ABC');
        assert.isTrue(this.dispatchStub.calledWith({
          actionType: 'EXPLORER_UPDATE',
          id: 'TEMP-ABC',
          updates: { testKey: 'some updates' }
        }));
      });
      it('should dispatch a fail event if there is a failure', function () {
        var errorResp = { text: 'an error' };
        this.persistence.create = function(model, callback) {
          callback(errorResp);
        };
        ExplorerActions.save(this.persistence, 'TEMP-ABC');
        assert.isTrue(this.dispatchStub.calledWith({
          actionType: 'EXPLORER_SAVE_FAIL',
          saveType: 'save',
          id: 'TEMP-ABC',
          errorResp: errorResp,
          query: this.explorer.query
        }));
      });
      it('should set the "saving" property back to false if found invalid', function () {
        this.explorer.query.query_name = '';
        this.explorer.isValid = false;
        ExplorerActions.save(this.persistence, 'TEMP-ABC');
        assert.isTrue(this.dispatchStub.calledWith({
          actionType: 'EXPLORER_UPDATE',
          id: 'TEMP-ABC',
          updates: { saving: false }
        }));
      });
    });

    describe('save with an already persisted explorer', function () {
      beforeEach(function () {
        this.persistence = {
          update: function(model, callback) {
            callback(null, _.assign({}, ExplorerUtils.formatQueryParams(ExplorerUtils.toJSON(model)), { query_name: 'abc123' }));
          }
        };
        this.explorer = TestHelpers.createExplorerModel();
        this.explorer.id = 'abc123';
        this.explorer.query_name = 'anb123';
        this.explorer.query.event_collection = 'clicks';
        this.explorer.query.analysis_type = 'count';
        this.getStub.returns(this.explorer);
        sinon.stub(ExplorerUtils, 'mergeResponseWithExplorer').returns({ testKey: 'some updates' });
      });

      afterEach(function(){
        ExplorerUtils.mergeResponseWithExplorer.restore();
      });

      it('should dispatch an EXPLORER_SAVING event', function () {
        ExplorerActions.save(this.persistence, 'ABC');
        assert.isTrue(this.dispatchStub.calledWith({
          actionType: 'EXPLORER_SAVING',
          id: 'ABC',
          saveType: 'update'
        }));
      });
      it('should dispatch to update the right model with params from mergeResponseWithExplorer if successful', function () {
        ExplorerActions.save(this.persistence, 'ABC');
        assert.isTrue(this.dispatchStub.calledWith({
          actionType: 'EXPLORER_UPDATE',
          id: 'ABC',
          updates: { testKey: 'some updates' }
        }));
      });
      it('should dispatch a fail event if there is a failure', function () {
        var errorResp = { text: 'an error' };
        this.persistence.update = function(model, callback) {
          callback(errorResp);
        };
        ExplorerActions.save(this.persistence, 'ABC');
        assert.isTrue(this.dispatchStub.calledWith({
          actionType: 'EXPLORER_SAVE_FAIL',
          saveType: 'update',
          id: 'ABC',
          errorResp: errorResp,
          query: this.explorer.query
        }));
      });
    });

    describe('destroy', function () {
      xit('should dispatch a EXPLORER_DESTROYING message', function () {

      });
      xit('should dispatch a EXPLORER_DESTROY_FAIL message if destroy call fails', function () {

      });
      xit('should dispatch a EXPLORER_DESTROY_SUCCESS message if destroy call succeeds', function () {

      });
      xit('should remove the model if destroy call succeeds', function () {

      });
    });
    
    describe('clone a saved query', function () {
        it('should dispatch an EXPLORER_CLONE event', function () {
          ExplorerActions.clone('ABC');
          assert.isTrue(this.dispatchStub.calledWith({
            actionType: 'EXPLORER_CLONE',
            id: 'ABC'
          }));
        });
    });
  });
});
