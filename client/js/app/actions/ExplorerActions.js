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

  revertActiveChanges: function() {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_REVERT_ACTIVE_CHANGES
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

  runEmailExtraction: function(client, id) {
    var explorer = ExplorerStore.get(id);

    var valid = ValidationUtils.runValidations(ExplorerValidations.explorer, explorer);
    if (!valid.isValid) {
      NoticeActions.create({ text: valid.lastError, type: 'error', icon: 'remove-sign' });
      return;
    }

    var valid = ValidationUtils.runValidations(ExplorerValidations.emailExtractionExplorer, explorer);
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
    ExplorerUtils.runQuery({
      client: client,
      query: attrs,
      success: function(res) {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_QUERY_SUCCESS,
          query: explorer.query,
          isSaved: ExplorerUtils.isPersisted(explorer)
        });
        NoticeActions.clearAll();
        NoticeActions.create({ text: "Email extraction successfully requested. Check your email ("+explorer.query.email+").", type: 'success', icon: 'check' });
        ExplorerActions.update(explorer.id, {
          result: res,
          loading: false
        });
      },
      error: function(err) {
        NoticeActions.create({ text: err.message, type: 'error', icon: 'remove-sign' });
      }
    });  
  },

  execError: function(explorer, err) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_QUERY_ERROR,
      query: explorer.query,
      error: err.message
    });
    ExplorerActions.update(explorer.id, { loading: false });
    NoticeActions.create({ text: err.message, type: 'error' });
  },

  execSuccess: function (explorer, response) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_QUERY_SUCCESS,
      query: explorer.query,
      isSaved: ExplorerUtils.isPersisted(explorer)
    });
    NoticeActions.clearAll();
    
    var updates = _.cloneDeep(explorer);
    updates.result = response.result;
    updates.loading = false;

    if (!ExplorerUtils.resultSupportsChartType(response.result, explorer.metadata.visualization.chart_type, explorer.query.analysis_type)) {
      updates.metadata.visualization.chart_type = ExplorerUtils.getChartTypeOptions(response.result, explorer.query.analysis_type)[0];
    }
    ExplorerActions.update(explorer.id, updates);
  },

  fetchAllPersisted: function(persistence, callback) {
    AppStateActions.update({ fetchingPersistedExplorers: true });
    persistence.get(null, function(err, resp) {
      if (err) {
        callback(err);
        return;
      }
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
      callback(null);
    });
  },

  fetchPersisted: function(persistence, id, callback) {
    persistence.get(id, function(err, resp) {
      if (err) {
        callback(err);
        return;
      }
      var model = ExplorerUtils.formatQueryParams(resp);
      if (!ValidationUtils.runValidations(ExplorerValidations.explorer, model).isValid) {
        console.warn('A persisted explorer model is invalid: ', model);
      }
      ExplorerActions.create(model);
      callback(null);
    });
  },

  save: function(persistence, sourceId) {
    var saveType = ExplorerUtils.isPersisted(ExplorerStore.get(sourceId)) ? 'update' : 'save';
    var persistenceFunction = saveType === 'save' ? 'create' : 'update';

    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_SAVING,
      id: sourceId,
      saveType: saveType
    });
    var valid = ValidationUtils.runValidations(ExplorerValidations.explorer, ExplorerStore.get(sourceId));
    if (!valid.isValid) {
      AppDispatcher.dispatch({
        actionType: ExplorerConstants.EXPLORER_SAVE_FAIL,
        saveType: saveType,
        id: sourceId,
        errorMsg: valid.lastError,
        query: ExplorerStore.get(sourceId).query
      });
      return;
    }
    persistence[persistenceFunction](ExplorerUtils.toJSON(ExplorerStore.get(sourceId)), function(err, res) {
      if (err) {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_FAIL,
          saveType: saveType,
          id: sourceId,
          errorResp: err,
          query: ExplorerStore.get(sourceId).query
        });
      } else {
        var updatedModel = ExplorerUtils.mergeResponseWithExplorer(ExplorerStore.get(sourceId), res);
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_UPDATE,
          id: sourceId,
          updates: updatedModel
        });
        // We need to use the new model id below, not the old sourceId passed in.
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_SUCCESS,
          id: updatedModel.id,
          saveType: saveType,
          query: updatedModel.query
        });
      }
    });
  },

  destroy: function(persistence, sourceId) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_DESTROYING
    });
    var attrs = _.clone(ExplorerUtils.toJSON(ExplorerStore.get(sourceId)));
    persistence.destroy(attrs, function(err, res) {
      if (err) {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROY_FAIL,
          errorMsg: err,
          query: ExplorerStore.get(sourceId).query
        });
      } else {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_REMOVE,
          id: sourceId
        });
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_DESTROY_SUCCESS,
          query: attrs.query
        });
      }
    });
  }

};

module.exports = ExplorerActions;
