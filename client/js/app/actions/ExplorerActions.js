var _ = require('lodash');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ExplorerConstants = require('../constants/ExplorerConstants');
var ExplorerStore = require('../stores/ExplorerStore');
var ExplorerValidations = require('../validations/ExplorerValidations');
var NoticeActions = require('./NoticeActions');
var AppStateActions = require('./AppStateActions');
var ProjectActions = require('./ProjectActions');
var ProjectStore = require('../stores/ProjectStore');
var RunValidations = require('../utils/RunValidations');
var ExplorerUtils = require('../utils/ExplorerUtils');
var ChartTypeUtils = require('../utils/ChartTypeUtils');

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
  
  clone: function(sourceId) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_CLONE,
      id: sourceId
    });
    NoticeActions.create({
      text: "Query cloned! Add a name for this cloned query and save it.",
      type: 'success',
      icon: 'check'
    });
  },

  update: function(id, updates) {
    var updated_query, project = ProjectStore.getProject();
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE,
      id: id,
      updates: updates
    });
    // Fetch schema for selected event collection
    updated_query = updates.query ? updates.query : updates.response && updates.response.query ? updates.response.query : {};
    if (updated_query.event_collection) {
      ProjectActions.fetchCollectionSchema(project.client, updated_query.event_collection);
    }
    if (updated_query.steps && updated_query.steps.length) {
      _.each(updated_query.steps, function(step, i) {
        ProjectActions.fetchCollectionSchema(project.client, step.event_collection);
      });
    }
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

  validate: function(id) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_VALIDATE,
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

  addStep: function(id, attrs) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_ADD_STEP,
      id: id,
      attrs: attrs
    });
  },

  removeStep: function(id, index) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_REMOVE_STEP,
      id: id,
      index: index
    });
  },

  setStepActive: function(id, index) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_SET_STEP_ACTIVE,
      id: id,
      index: index
    });
  },

  updateStep: function(id, index, attrs) {
    var project = ProjectStore.getProject();
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE_STEP,
      id: id,
      index: index,
      attrs: attrs
    });

    // Fetch schema for selected event collection
    if (attrs.event_collection) {
      ProjectActions.fetchCollectionSchema(project.client, attrs.event_collection);
    }
  },

  moveStep: function(id, index, direction) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_MOVE_STEP,
      id: id,
      index: index,
      direction: direction
    });
  },

  addStepFilter: function(id, stepIndex, attrs) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_ADD_STEP_FILTER,
      id: id,
      stepIndex: stepIndex,
      attrs: attrs
    });
  },

  removeStepFilter: function(id, stepIndex, filterIndex) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_REMOVE_STEP_FILTER,
      id: id,
      stepIndex: stepIndex,
      filterIndex: filterIndex
    });
  },

  updateStepFilter: function(id, stepIndex, filterIndex, attrs) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE_STEP_FILTER,
      id: id,
      stepIndex: stepIndex,
      filterIndex: filterIndex,
      attrs: attrs
    });
  },

  exec: function(client, id) {
    var explorer = ExplorerStore.get(id);
    if (explorer.loading) {
      throw new Error("Warning: calling exec when model loading is true. Explorer id: " + explorer.id);
    }
    ExplorerActions.validate(explorer.id);
    explorer = ExplorerStore.get(id);
    if (!explorer.isValid) {
      AppDispatcher.dispatch({
        actionType: ExplorerConstants.EXPLORER_FOUND_INVALID,
        id: explorer.id
      });
      return;
    }
    NoticeActions.clearAll();

    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE,
      id: explorer.id,
      updates: { loading: true }
    });

    ExplorerUtils.runQuery({
      client: client,
      query: ExplorerUtils.queryJSON(explorer),
      error: module.exports.execError.bind(this, explorer),
      success: module.exports.execSuccess.bind(this, explorer)
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

    var updates = {};
    updates.response = response;
    // If there is no query object on the response, add one. This is required for Dataviz to properly auto-parse
    // the result + the query to correctly choose a chart type.
    if (!response.query) response.query = ExplorerUtils.queryJSON(explorer);
    updates.loading = false;

    if (!ChartTypeUtils.responseSupportsChartType(response.query, explorer.metadata.visualization.chart_type)) {
      updates.metadata = _.cloneDeep(explorer.metadata);
      updates.metadata.visualization.chart_type = ChartTypeUtils.getChartTypeOptions(response.query)[0];
    }

    updates.dataTimestamp = Date.now();
    ExplorerActions.update(explorer.id, updates);
  },

  runEmailExtraction: function(client, id) {
    ExplorerActions.validate(id);
    var explorer = ExplorerStore.get(id);

    if (!explorer.isValid) {
      AppDispatcher.dispatch({
        actionType: ExplorerConstants.EXPLORER_FOUND_INVALID,
        id: explorer.id
      });
      return;
    }
    NoticeActions.clearAll();

    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_UPDATE,
      id: explorer.id,
      updates: { loading: true }
    });

    ExplorerUtils.runQuery({
      client: client,
      query: ExplorerUtils.queryJSON(explorer),
      success: module.exports.runEmailExtractionSuccess.bind(this, explorer),
      error: module.exports.runEmailExtractionError,
    });
  },

  runEmailExtractionSuccess: function(explorer, res) {
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_QUERY_SUCCESS,
      query: explorer.query,
      isSaved: ExplorerUtils.isPersisted(explorer)
    });
    NoticeActions.clearAll();
    NoticeActions.create({
      text: "Email extraction successfully requested. Check your email ("+explorer.query.email+").",
      type: 'success',
      icon: 'check'
    });
    ExplorerActions.update(explorer.id, {
      result: res,
      loading: false
    });
  },

  runEmailExtractionError: function(err) {
    NoticeActions.create({ text: err.message, type: 'error', icon: 'remove-sign' });
  },

  fetchAllPersisted: function(persistence, callback) {
    AppStateActions.update({ fetchingPersistedExplorers: true });
    persistence.get(null, function(err, resp) {
      if (err) {
        callback(err);
        return;
      }
      var models = [];
      resp.forEach(function(model) {
        var formattedModel = ExplorerUtils.formatQueryParams(model);
        RunValidations.run(ExplorerValidations, formattedModel);
        if (!formattedModel.isValid) {
          console.warn('A persisted explorer model is invalid: ', formattedModel);
          console.log('Errors: ', formattedModel.errors);
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
      RunValidations.run(ExplorerValidations, model);
      if (!model.isValid) {
        console.warn('A persisted explorer model is invalid: ', model);
      }
      ExplorerActions.create(model);
      callback(null);
    });
  },

  save: function(persistence, sourceId) {
    var saveType = ExplorerUtils.saveType(ExplorerStore.get(sourceId));
    var persistenceFunction = saveType === 'save' ? 'create' : 'update';
    AppDispatcher.dispatch({
      actionType: ExplorerConstants.EXPLORER_SAVING,
      id: sourceId,
      saveType: saveType
    });

    var explorer = ExplorerStore.get(sourceId);
    if (!explorer.isValid) {
      AppDispatcher.dispatch({
        actionType: ExplorerConstants.EXPLORER_FOUND_INVALID,
        id: explorer.id
      });
      module.exports.update(sourceId, { saving: false });
      return;
    }
    NoticeActions.clearAll();

    var explorerJSON = ExplorerUtils.toJSON(ExplorerStore.get(sourceId));
    persistence[persistenceFunction](explorerJSON, function(err, res) {
      if (err) {
        AppDispatcher.dispatch({
          actionType: ExplorerConstants.EXPLORER_SAVE_FAIL,
          saveType: saveType,
          id: sourceId,
          errorResp: err,
          query: ExplorerStore.get(sourceId).query
        });
        return;
      }
      module.exports.saveSuccess(sourceId, res);
    });
  },

  saveSuccess: function(sourceId, res) {
    var saveType = ExplorerUtils.saveType(ExplorerStore.get(sourceId));
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
