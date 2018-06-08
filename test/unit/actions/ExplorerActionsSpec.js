import moment from 'moment';
import _ from 'lodash';
import KeenAnalysis from 'keen-analysis';
import Qs from 'qs';
import XHRmock from 'xhr-mock';

import TestHelpers from '../../support/TestHelpers';
import AppDispatcher from '../../../lib/js/app/dispatcher/AppDispatcher';
import ExplorerActions from '../../../lib/js/app/actions/ExplorerActions';
import AppStateActions from '../../../lib/js/app/actions/AppStateActions';
import FilterUtils from '../../../lib/js/app/utils/FilterUtils';
// import RunValidations from '../../../lib/js/app/utils/RunValidations';
import ExplorerValidations from '../../../lib/js/app/validations/ExplorerValidations';
import ExplorerUtils from '../../../lib/js/app/utils/ExplorerUtils';
import ChartTypeUtils from '../../../lib/js/app/utils/ChartTypeUtils';
import ExplorerStore from '../../../lib/js/app/stores/ExplorerStore';

jest.mock('../../../lib/js/app/utils/RunValidations');

describe('actions/ExplorerActions', () => {
  const analysisClient = new KeenAnalysis(TestHelpers.createClient());
  const mockDispatch = jest.fn();
  let spyGet;
  let client;
  let spyRunQuery;

  beforeAll(() => {
    XHRmock.setup();
  });

  afterAll(() => {
    spyDispatch.mockRestore();
    XHRmock.teardown();
  });

  beforeEach(() => {
    client = new KeenAnalysis(TestHelpers.createClient());
    // spyDispatch.mockClear();
  });

  describe('exec', () => {
    let spyDispatch;

    beforeAll(() => {
      spyGet = jest.spyOn(ExplorerStore, 'get');
      spyRunQuery = jest.spyOn(ExplorerUtils, 'runQuery').mockImplementation(() => {});
    });

    afterAll(() => {
     spyRunQuery.mockRestore();
     spyGet.mockRestore();
     spyDispatch.mockRestore();
    });

    beforeEach(() => {
      spyDispatch = jest.spyOn(AppDispatcher, 'dispatch').mockImplementation(() => {});
      spyGet.mockClear();
      spyRunQuery.mockClear();
    });

    afterEach(() => {
      spyDispatch.mockRestore();
    })

    it('should throw an error if the model is currently loading', () => {
      const explorer = { id: 5, loading: true };
      ExplorerStore.set(explorer);
      expect(ExplorerActions.exec.bind(null, client, explorer.id)).toThrow("Warning: calling exec when model loading is true. Explorer id: 5");
    });

    it('should run the validations with the right arguments', () => {
      const explorer = TestHelpers.createExplorerModel();
      explorer.query.analysis_type = 'count';
      ExplorerStore.set(explorer);
      const spyValidate = jest.spyOn(ExplorerActions, 'validate');
      ExplorerActions.exec(client, explorer.id);
      expect(spyValidate).toHaveBeenCalledTimes(1);
      spyValidate.mockRestore();
    });

    it('should call the dispatcher to update the store and set loading to true', () => {
      const explorer = {
        id: 5,
        loading: false,
        query: {},
        isValid: true
      };
      ExplorerStore.set(explorer);
      ExplorerActions.exec(client, explorer.id);
      expect(spyDispatch).toBeCalledWith({
        actionType: 'EXPLORER_UPDATE',
        id: 5,
        updates: { loading: true }
      });
    });

    it('should add the latest attribute with a limit for extractions', () => {
      var explorer = {
        id: 5,
        loading: false,
        isValid: true,
        query: {
          event_collection: 'click',
          analysis_type: 'extraction'
        }
      };
      ExplorerStore.set(explorer);
      ExplorerActions.exec(client, explorer.id);
      expect(spyRunQuery.mock.calls[0][0].query.latest)
        .toEqual(100);
    });

  });

  describe('runEmailExtraction', () => {
    let spyValidate;
    let spyGet;
    let spyRunQuery;
    let explorer;
    let client;

    beforeEach(() => {
      spyValidate = jest.spyOn(ExplorerActions, 'validate').mockImplementation(() => {});
      spyRunQuery = jest.spyOn(ExplorerUtils, 'runQuery').mockImplementation(() => {});
      client = { run: jest.fn() };
      explorer = {
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

      spyGet = jest.spyOn(ExplorerStore, 'get').mockReturnValue(explorer);
      ExplorerStore.set(explorer);
    });

    afterEach(() => {
      spyValidate.mockRestore();
      spyRunQuery.mockRestore();
      spyGet.mockRestore();
    });

    it('should run validations', () => {
      ExplorerActions.runEmailExtraction(client, explorer.id);
      expect(spyValidate).toHaveBeenCalledTimes(1);
    });

    it('should NOT run the query if validaton fails', () => {
      spyValidate.mockReturnValue([{ msg: 'invalid' }]);
      ExplorerActions.runEmailExtraction(client, explorer.id);
      expect(spyRunQuery).not.toHaveBeenCalled();
    });

  });

  describe('fetchAllPersisted', () => {
    let models;
    let persistence;
    let callback;
    let explorer;
    beforeEach(() => {
      explorer = {
        isValid: false,
        errors: [],
        query: {}
      };
      ExplorerStore.set(explorer);
      models = [
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
            },
            display_name: 'some name'
          }
        }
      ];
      persistence = {
        get: (id, callback) => {
          callback(null, models);
        }
      };
      callback = jest.fn();
    });

    it('should format the params for each model', () => {
      const spy = jest.spyOn(ExplorerUtils, 'formatQueryParams');
      ExplorerActions.fetchAllPersisted(persistence, callback);
      expect(spy).toHaveBeenCalledTimes(3);
      spy.mockRestore();
    });
    it('should run validations for each model', () => {
      const spy = RunValidations.mockReturnValue([]);
      ExplorerActions.fetchAllPersisted(persistence, callback);
      expect(spy).toHaveBeenCalledTimes(3);
      spy.mockRestore();
    });
    it('should include invalid models', () => {
      models[2].query = {};
      const spy = jest.spyOn(ExplorerActions, 'createBatch');
      ExplorerActions.fetchAllPersisted(persistence, callback);
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
    it('should log a warning for invalid models', () => {
      models[2].query = {};
      const spy = jest.spyOn(window.console, 'warn');
      ExplorerActions.fetchAllPersisted(persistence, callback);
      expect(spy.mock.calls[0][0])
        .toEqual('A persisted explorer model is invalid: ');
      expect(spy.mock.calls[0][1])
        .toMatchObject({ id: "3" });
      spy.mockRestore();
    });
    it('should call update app state when done and set fetchingPersistedExplorers to false', () => {
      const spy = jest.spyOn(AppStateActions, 'update');
      ExplorerActions.fetchAllPersisted(persistence, callback);
      expect(spy).toHaveBeenCalledWith({ fetchingPersistedExplorers: false });
      spy.mockRestore();
    });
  });

  describe('execError', () => {
    let explorer;
    let spyDispatch;
    beforeEach(() => {
      explorer = { id: 5 };
      spyDispatch = jest.spyOn(AppDispatcher, 'dispatch');
      ExplorerActions.execError(explorer, { message: 'NOPE' });
    });

    it('should call the dispatcher to update with the right argments', () => {
      expect(spyDispatch).toHaveBeenCalledWith({
        actionType: 'EXPLORER_UPDATE',
        id: 5,
        updates: { loading: false }
      });
    });

    it('should create a notice with the error message', () => {
      expect(spyDispatch).toHaveBeenCalledWith({
        actionType: 'NOTICE_CREATE',
        attrs: {
          text: 'NOPE',
          type: 'error'
        }
      });
    });

  });


  describe('execSuccess', () => {
    let explorer;
    let response;
    let spyResponseSupportsChartType;
    let spyGetChartTypeOptions;
    let spyDispatch;
    beforeEach(() => {
      explorer = {
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
      response = { result: 100 };

      spyGetChartTypeOptions = jest.spyOn(ChartTypeUtils, 'getChartTypeOptions').mockReturnValue(['metric']);
      spyResponseSupportsChartType = jest.spyOn(ChartTypeUtils, 'responseSupportsChartType').mockReturnValue(false);
      spyDispatch = jest.spyOn(AppDispatcher, 'dispatch').mockReset();
    });
    afterEach(() => {
      spyGetChartTypeOptions.mockRestore();
      spyResponseSupportsChartType.mockRestore();
    });

    it('should call the dispatcher to update with the right arguments', () => {
      let expectedUpdates = {
        loading: false,
        response: response,
        metadata: _.cloneDeep(explorer.metadata)
      };
      expectedUpdates.metadata.visualization.chart_type = 'metric';

      ExplorerActions.execSuccess(explorer, response);
      expect(spyDispatch.mock.calls[2][0].actionType).toEqual('EXPLORER_UPDATE');
      expect(spyDispatch.mock.calls[2][0].id).toEqual(5);

      // We need to check the dataTimestamp separately because we cannot get Date.now()'s to match
      // as they will be off by a few milliseconds.
      expect(_.omit(spyDispatch.mock.calls[2][0].updates, 'dataTimestamp')).toEqual(expectedUpdates);

      let actualTimestamp = spyDispatch.mock.calls[2][0].updates.dataTimestamp;
      actualTimestamp = actualTimestamp.toString().substring(0, actualTimestamp.length-5);

      let expectedTimestamp = Date.now();
      expectedTimestamp = expectedTimestamp.toString().substring(0, expectedTimestamp.length-5);

      expect(actualTimestamp).toEqual(expectedTimestamp);

    });

    it('should clear all notices', () => {
      ExplorerActions.execSuccess(explorer, response);
      expect(spyDispatch).toHaveBeenCalledWith({
        actionType: 'NOTICE_CLEAR_ALL'
      });
    });

    it('should add a query object on the response if one is not there', () => {
      ExplorerActions.execSuccess(explorer, response);
      expect(spyDispatch.mock.calls[2][0].updates.response.query).toEqual({ analysis_type: 'count', timezone: 'UTC' });
    });

    it('should not add a query object on the response if one is not there', () => {
      ExplorerActions.execSuccess(explorer, _.assign({}, response, { query: { analysis_type: 'not_count' } }));
      expect(spyDispatch.mock.calls[2][0].updates.response.query).toEqual({ analysis_type: 'not_count' });
    });

    it('should call ExplorerUtils.responseSupportsChartType with the right arguments', () => {
      const response1 = _.assign({}, response, { query: { analysis_type: 'not_count' } });
      ExplorerActions.execSuccess(explorer, response1);
      expect(spyResponseSupportsChartType).toHaveBeenCalledWith(response1.query, explorer.metadata.visualization.chart_type);
    });

  });


  describe('async functions', () => {
    let spyGet;
    beforeAll(() => {
      spyGet = jest.spyOn(ExplorerStore, 'get')
    });
    afterAll(() => {
      spyGet.mockRestore();
    });
    describe('save with unpersisted explorer', () => {
      let persistence;
      let explorer;
      let spyDispatch;
      let spyExplorerUtil;
      beforeEach(() => {
        persistence = {
          create: function(model, callback) {
            callback(null, _.assign({}, ExplorerUtils.formatQueryParams(ExplorerUtils.toJSON(model)), { query_name: 'abc123' }));
          }
        };
        explorer = TestHelpers.createExplorerModel();
        explorer.id = 'TEMP-ABC';
        explorer.query_name = 'some name';
        explorer.query.event_collection = 'clicks';
        explorer.query.analysis_type = 'count';
        spyDispatch = jest.spyOn(AppDispatcher, 'dispatch').mockReset();
        spyGet.mockReturnValue(explorer);
        spyExplorerUtil = jest.spyOn(ExplorerUtils, 'mergeResponseWithExplorer').mockReturnValue({ testKey: 'some updates' });
      });

      afterEach(() => {
        spyExplorerUtil.mockRestore();
      });

      it('should dispatch an EXPLORER_SAVING event', () => {
        ExplorerActions.save(persistence, 'TEMP-ABC');
        expect(spyDispatch).toHaveBeenCalledWith({
          actionType: 'EXPLORER_SAVING',
          id: 'TEMP-ABC',
          saveType: 'save'
        });
      });

      it('should dispatch to update the right model with params from mergeResponseWithExplorer if successful', () => {
        ExplorerActions.save(persistence, 'TEMP-ABC');
        expect(spyDispatch).toHaveBeenCalledWith({
          actionType: 'EXPLORER_UPDATE',
          id: 'TEMP-ABC',
          updates: { testKey: 'some updates' }
        });
      });

      it('should dispatch a fail event if there is a failure', () => {
        const errorResp = { text: 'an error' };
        persistence.create = (model, callback) => {
          callback(errorResp);
        };
        ExplorerActions.save(persistence, 'TEMP-ABC');
        expect(spyDispatch).toHaveBeenCalledWith({
          actionType: 'EXPLORER_SAVE_FAIL',
          saveType: 'save',
          id: 'TEMP-ABC',
          errorResp: errorResp,
          query: explorer.query
        });
      });

      it('should set the "saving" property back to false if found invalid', () => {
        explorer.query.query_name = '';
        explorer.isValid = false;
        ExplorerActions.save(persistence, 'TEMP-ABC');
        expect(spyDispatch).toHaveBeenCalledWith({
          actionType: 'EXPLORER_UPDATE',
          id: 'TEMP-ABC',
          updates: { saving: false }
        });
      });
    });
  });



    describe('save with an already persisted explorer', () => {
      let spyGet;
      let persistence;
      let explorer;
      let spyExplorerUtil;
      let spyDispatch;

      beforeEach(() => {
        persistence = {
          update: function(model, callback) {
            callback(null, _.assign({}, ExplorerUtils.formatQueryParams(ExplorerUtils.toJSON(model)), { query_name: 'abc123' }));
          }
        };
        explorer = TestHelpers.createExplorerModel();
        explorer.id = 'abc123';
        explorer.query_name = 'anb123';
        explorer.query.event_collection = 'clicks';
        explorer.query.analysis_type = 'count';
        spyDispatch = jest.spyOn(AppDispatcher, 'dispatch').mockReset();
        spyGet = jest.spyOn(ExplorerStore, 'get').mockReturnValue(explorer);
        spyExplorerUtil = jest.spyOn(ExplorerUtils, 'mergeResponseWithExplorer').mockReturnValue({ testKey: 'some updates' });
      });

      afterEach(() => {
        spyExplorerUtil.mockRestore();
      });

      it('should dispatch an EXPLORER_SAVING event', () => {
        ExplorerActions.save(persistence, 'ABC');
        expect(spyDispatch).toHaveBeenCalledWith({
          actionType: 'EXPLORER_SAVING',
          id: 'ABC',
          saveType: 'update'
        });
      });

      it('should dispatch to update the right model with params from mergeResponseWithExplorer if successful', () => {
        ExplorerActions.save(persistence, 'ABC');
        expect(spyDispatch).toHaveBeenCalledWith({
          actionType: 'EXPLORER_UPDATE',
          id: 'ABC',
          updates: { testKey: 'some updates' }
        });
      });

      it('should dispatch a fail event if there is a failure', () => {
        const errorResp = { text: 'an error' };
        persistence.update = (model, callback) => {
          callback(errorResp);
        };
        ExplorerActions.save(persistence, 'ABC');
        expect(spyDispatch).toHaveBeenCalledWith({
          actionType: 'EXPLORER_SAVE_FAIL',
          saveType: 'update',
          id: 'ABC',
          errorResp: errorResp,
          query: explorer.query
        });
      });

    });

    describe('clone a saved query', () => {
      it('should dispatch an EXPLORER_CLONE event', () => {
        let spyDispatch = jest.spyOn(AppDispatcher, 'dispatch').mockReset();
        ExplorerActions.clone('ABC');
        expect(spyDispatch).toHaveBeenCalledWith({
          actionType: 'EXPLORER_CLONE',
          id: 'ABC'
        });
      });
    });


});
