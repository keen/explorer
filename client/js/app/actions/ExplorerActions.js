var _ = require('lodash');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ExplorerConstants = require('../constants/ExplorerConstants');
var ExplorerStore = require('../stores/ExplorerStore');
var ExplorerValidations = require('../validations/ExplorerValidations');
var ValidationUtils = require('../utils/ValidationUtils');
var ExplorerUtils = require('../utils/ExplorerUtils');
var NoticeActions = require('./NoticeActions');
var AppStateActions = require('./AppStateActions');

var ExplorerActions = {

  create: function(attrs) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_CREATE,
      attrs: attrs
    });
  },

  createBatch: function(models) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_CREATE_BATCH,
      models: models
    });
  },

  update: function(id, updates) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE,
      id: id,
      updates: updates
    });
  },

  remove: function(id) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_REMOVE,
      id: id
    });
  },

  setActive: function(id) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_SET_ACTIVE,
      id: id
    });
  },

  clear: function(id) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_CLEAR,
      id: id
    });
  },

  addFilter: function(id, attrs) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_ADD_FILTER,
      id: id,
      attrs: attrs
    });
  },

  removeFilter: function(id, index) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_REMOVE_FILTER,
      id: id,
      index: index
    });
  },

  updateFilter: function(id, index, attrs) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE_FILTER,
      id: id,
      index: index,
      attrs: attrs
    });
  },

  exec: function(client, id) { 
    var explorer = ExplorerStore.get(id);

    if (explorer.loading) {
      throw new Error("Warning: calling exec when model loading is true. Explorer id: " + explorer.id);
    }

    var valid = ValidationUtils.runValidations(ExplorerValidations.explorer, explorer);
    if (!valid.isValid) {
      NoticeActions.create({ text: valid.lastError, type: 'error', icon: 'remove-sign' });
      return;
    }

    NoticeActions.clearAll();
    
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE,
      id: explorer.id,
      updates: { loading: true }
    });

    var attrs = ExplorerUtils.queryJSON(explorer);
    if (explorer.query.analysis_type === 'extraction') {
      _.assign(attrs, { latest: ExplorerUtils.EXRACTION_EVENT_LIMIT });
    }

    ExplorerUtils.runQuery({
      client: client,
      query: attrs,
      error: function(err) {
        module.exports.execError(explorer, err);
      },
      success: function(res) {
        module.exports.execSuccess(explorer, res);
      }
    });
  },

  runEmailExtraction: function(client, id, callback) {
    var explorer = ExplorerStore.get(id);

    var valid = ValidationUtils.runValidations(ExplorerValidations.explorer, explorer);
    if (!valid.isValid) {
      callback({ success: false, error: valid.lastError });
      return;
    }

    var valid = ValidationUtils.runValidations(ExplorerValidations.emailExtractionExplorer, explorer);
    if (!valid.isValid) {
      callback({ success: false, error: valid.lastError });
      return;
    }

    var attrs = ExplorerUtils.queryJSON(explorer);
    ExplorerUtils.runQuery({
      client: client,
      query: attrs,
      success: function(res) {
        callback({ success: true });
      },
      error: function(err) {
        callback({ success: false, err: err.message });
      }
    });  
  },

  execError: function(explorer, err) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_QUERY_ERROR,
      explorer: explorer,
      error: err.message
    });
    ExplorerActions.update(explorer.id, { loading: false });
    NoticeActions.create({ text: err.message, type: 'error' });
  },

  execSuccess: function (explorer, response) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_QUERY_SUCCESS,
      explorer: explorer
    });
    NoticeActions.clearAll();
    var updates = {
      result: response.result,
      loading: false
    };
    if (!ExplorerUtils.resultSupportsChartType(response.result, explorer.visualization.chart_type, explorer.query.analysis_type)) {
      updates.visualization = _.cloneDeep(explorer.visualization);
      updates.visualization.chart_type = ExplorerUtils.getChartTypeOptions(response.result, explorer.query.analysis_type)[0];
    }
    ExplorerActions.update(explorer.id, updates);
  },

  getPersisted: function(persistence) {
    AppStateActions.update({ fetchingPersistedExplorers: true });
    persistence.get(null, function(err, resp) {
      if (!resp) throw new Error("There was an error fetching the persisted explorers: Response is empty.");
      if (err) throw new Error("There was an error fetching the persisted explorers: " + err.message);
      var models = [];
      _.each(resp, function(model) {
        var formattedModel = ExplorerUtils.formatQueryParams(model);
        if (!ValidationUtils.runValidations(ExplorerValidations.explorer, formattedModel).isValid) {
          console.warn('A persisted explorer model is invalid: ', formattedModel);
        }
        models.push(formattedModel);
      });
      ExplorerActions.createBatch(models);
      AppStateActions.update({ fetchingPersistedExplorers: false });
    });
  },

  saveNew: function(persistence, sourceId) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_SAVING,
      id: sourceId,
      saveType: 'save'
    });
    var attrs = _.assign({}, ExplorerUtils.toJSON(ExplorerStore.get(sourceId)));
    persistence.create(attrs, function(err, res) {
      if (err) {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_FAIL,
          saveType: 'save',
          id: sourceId,
          errorMsg: err
        });
      } else {
        var formattedParams = ExplorerUtils.formatQueryParams(res);
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_UPDATE,
          id: sourceId,
          updates: ExplorerUtils.mergeResponseWithExplorer(ExplorerStore.get(sourceId), res)
        });
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_SUCCESS,
          id: sourceId,
          saveType: 'save',
        });
      }
    });
  },

  saveExisting: function(persistence, sourceId) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_SAVING,
      id: sourceId,
      saveType: 'update'
    });
    var attrs = _.assign({}, ExplorerUtils.toJSON(ExplorerStore.get(sourceId)));
    persistence.update(attrs, function(err, res) {
      if (err) {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_FAIL,
          saveType: 'update',
          id: sourceId,
          errorMsg: err
        });
      } else {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_UPDATE,
          id: sourceId,
          updates: ExplorerUtils.mergeResponseWithExplorer(ExplorerStore.get(sourceId), res)
        });
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_SUCCESS,
          id: sourceId,
          saveType: 'update',
        });
      }
    });
  },

  destroy: function(persistence, id) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_DESTROYING
    });

    persistence.destroy(id, function(err, res) {
      if (err) {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROY_FAIL,
          errorMsg: err
        });
      } else {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_REMOVE,
          id: id
        });
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROY_SUCCESS
        });
      }
    });
  }

};

module.exports = ExplorerActions;
