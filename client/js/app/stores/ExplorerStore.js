/* ExplorerStore */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
var ExplorerConstants = require('../constants/ExplorerConstants');
var FormatUtils = require('../utils/FormatUtils');
var ExplorerUtils = require('../utils/ExplorerUtils');
var FilterUtils = require('../utils/FilterUtils');
var ProjectUtils = require('../utils/ProjectUtils');
var ProjectStore = require('./ProjectStore');

var RunValidations = require('../utils/RunValidations.js').run;
var ExplorerValidations = require('../validations/ExplorerValidations.js');
var FilterValidations = require('../validations/FilterValidations.js');
var StepValidations = require('../validations/StepValidations.js');

var CHANGE_EVENT = 'change';
var SHARED_FUNNEL_STEP_PROPERTIES = ['event_collection', 'time', 'timezone', 'filters'];

var _explorers = {};

function _defaultAttrs() {
  return {
    id: FormatUtils.generateTempId(),
    query_name: null,
    active: false,
    saving: false,
    dataTimestamp: null,
    response: null,
    loading: false,
    isValid: true,
    errors: [],
    refresh_rate: 0,
    query: {
      event_collection: null,
      analysis_type: null,
      target_property: null,
      percentile: null,
      group_by: [],
      interval: null,
      timezone: ProjectUtils.getLocalTimezoneOffset(),
      filters: [],
      steps: [],
      email: null,
      latest: null,
      time: {
        relativity: 'this',
        amount: 14,
        sub_timeframe: 'days'
      }
    },
    metadata: _defaultMetadata()
  };
}

function _defaultMetadata() {
  return {
    display_name: null,
    visualization: {
      chart_type: null
    }
  };
}

function _defaultFilter() {
  return {
    property_name: null,
    property_value: null,
    operator: 'eq',
    coercion_type: 'String',
    isValid: true,
    errors: []
  };
}

function _defaultGeoFilter() {
  return {
    coordinates: [],
    max_distance_miles: null
  };
}

function _defaultStep() {
  return {
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
    active: false,
    isValid: true,
    errors: []
  }
}


function _validate(id) {
  RunValidations(ExplorerValidations, _explorers[id]);
}

/**
 * Get the default coercion type for this filter based off the filter's property_name's set type
 * in the project schema.
 * @param  {Object} explorer  The explorer model that the filter belongs to
 * @param  {Object} filter    The filter
 * @return {String}           The default coercion type
 */
function _getDefaultFilterCoercionType(explorer, filter) {
  var propertyType = ProjectUtils.getPropertyType(
    ProjectStore.getProject(),
    explorer.query.event_collection,
    filter.property_name);
  var targetCoercionType = FormatUtils.coercionTypeForPropertyType(propertyType);
  return targetCoercionType;
}

/**
 * Runs through the changeset and moves data around if necessary
 * @param {Object} explorer   The explorer model that is being updated
 * @param {Object} updates    The updated explorer model
 * @return {Object}           The new set of updates
 */
function _prepareUpdates(explorer, updates) {
  // TODO: We're assigning the response object directly onto the model so we
  // don't have to loop through the (sometimes) massive response object.
  function customizer(objValue, srcValue, key) {
    if (_.isArray(objValue)) {
      return srcValue;
    } else if (key === 'time' && _.isPlainObject(objValue)) {
      return srcValue;
    }
  }
  var newModel = _.mergeWith({}, explorer, _.omit(updates, 'response'), customizer);
  if (updates.response) newModel.response = updates.response;

  if(newModel.query.analysis_type === 'funnel' && explorer.query.analysis_type !== 'funnel') {
    newModel = _migrateToFunnel(explorer, newModel);
  } else if(newModel.query.analysis_type !== 'funnel' && explorer.query.analysis_type === 'funnel') {
    newModel = _migrateFromFunnel(explorer, newModel);
  }
  newModel = _removeInvalidFields(newModel);

  return newModel;
}

/**
 * If the query got changed to a funnel, move the step-specific parameters to a steps object.
 * @param {Object} explorer The explorer model that is being updated
 * @param {Object} newModel The updated explorer model
 * @return {Object}         The new set of updates
 */
function _migrateToFunnel(explorer, newModel) {
  var firstStep = _defaultStep();
  firstStep.active = true;

  _.each(SHARED_FUNNEL_STEP_PROPERTIES, function (key) {
    if(!_.isUndefined(explorer.query[key]) && !_.isNull(explorer.query[key])) {
      firstStep[key] = explorer.query[key]
    }

    newModel.query[key] = (key === 'filters') ? [] : null;
  });

  if(!_.isUndefined(explorer.query.target_property) && !_.isNull(explorer.query.target_property)) {
    firstStep.actor_property = explorer.query.target_property;
    explorer.query.target_property = null;
  }

  newModel.query.steps = [firstStep];

  return newModel;
}

/**
 * If the query got changed from a funnel, move the applicable parameters out to the root query
 * @param {Object} explorer The explorer model that is being updated
 * @param {Object} newModel The updated explorer model
 * @return {Object}         The new set of updates
 */
function _migrateFromFunnel(explorer, newModel) {
  if (explorer.query.steps.length < 1) return newModel;
  var activeStep = _.find(explorer.query.steps, { active: true }) || explorer.query.steps[0];

  _.each(SHARED_FUNNEL_STEP_PROPERTIES, function (key) {
    if (!_.isUndefined(activeStep[key])) {
      newModel.query[key] = activeStep[key];
    }
  });

  if (!_.isNull(activeStep.actor_property) && ExplorerUtils.shouldHaveTarget(newModel)) {
    newModel.query.target_property = activeStep.actor_property;
  }

  newModel.query.steps = [];

  return newModel;
}

/**
 * Removes fields from the query that aren't valid given the new analysis type.
 * @param {Object} newModel   The updated explorer model
 * @return {Object}           The new set of updates
 */
function _removeInvalidFields(newModel) {
  if (!ExplorerUtils.isEmailExtraction(newModel)) {
    newModel.query.latest = null;
    newModel.query.email = null;
  }
  if (newModel.query.analysis_type === 'extraction') {
    newModel.query.group_by = null;
    newModel.query.interval = null;
  }
  if (newModel.query.analysis_type !== 'extraction') {
    newModel.query.latest = null;
  }
  if (newModel.query.analysis_type !== 'percentile') {
    newModel.query.percentile = null;
  }
  if (_.includes(['count', 'extraction', 'funnel'], newModel.query.analysis_type)) {
    newModel.query.target_property = null;
  }
  if (newModel.query.analysis_type !== 'funnel') {
    newModel.query.steps = [];
  }
  if(newModel.query.analysis_type === 'funnel') {
    newModel.query.filters = [];
    newModel.query.time = null;
    newModel.query.timezone = null;
    newModel.query.group_by = null;
    newModel.query.timeframe = null;
    newModel.query.interval = null;
  }
  return newModel;
}

/**
 * Looks at updates about to be made to a filter and performs a series of operations to
 * change the filter values depending on the coercion_type, operator and type of property_value.
 * @param  {Object} explorer  The explorer model that owns the filter to be updated
 * @param  {Object} filter    The filter to be updated
 * @param  {Object} updates   The updates to be made to the filter
 * @return {Object}           The updated version of the filter after the changes have been made to it.
 */
function _prepareFilterUpdates(explorer, filter, updates) {
  if (updates.property_name && updates.property_name !== filter.property_name) {
    if (filter.operator === 'exists') {
      updates.coercion_type = 'Boolean';
    } else {
      // No need to update the operator - we allow any operator for any property type right now.
      updates.coercion_type = _getDefaultFilterCoercionType(explorer, _.merge({}, filter, updates));
    }
  }
  else if (updates.operator && updates.operator !== filter.operator) {
    var newOp = updates.operator;
    if (newOp === 'in') updates.coercion_type = 'List';
    if (newOp === 'exists') updates.coercion_type = 'Boolean';
    if (newOp === 'within') updates.coercion_type = 'Geo';

    // If it's not any of these operators, we still need to make sure that the current coercion_type is available
    // as an option for this new operator.
    var coercionOptions = _.find(ProjectUtils.getConstant('FILTER_OPERATORS'), { value: updates.operator }).canBeCoeredTo;
    var coercion_type = updates.coercion_type || filter.coercion_type;
    if (!_.includes(coercionOptions, coercion_type)) {
      updates.coercion_type = coercionOptions[0];
    }
  }

  if (updates.coercion_type === 'Geo' && filter.coercion_type !== 'Geo') {
    updates.property_value = _defaultGeoFilter();
  }

  updates.property_value = FilterUtils.getCoercedValue(_.merge({}, filter, updates));

  return updates;
}

function _wrapGroupBy(group_by) {
  if (!_.isArray(group_by)) group_by = [group_by];
  return _.pull(group_by, null);
}

function _create(attrs) {
  if (attrs && attrs.active === true) {
    throw new Error('You must use setActive to set a model as active.');
    return;
  }

  attrs = attrs || {};
  var newAttrs = _.merge(_defaultAttrs(), attrs);

  if (newAttrs.query.steps) {
    newAttrs.query.steps = _.map(newAttrs.query.steps, function (step) {
      return _.merge(_defaultStep(), step);
    });
  }
  if (!newAttrs.metadata) newAttrs.metadata = _defaultMetadata();
  newAttrs.query.group_by = _wrapGroupBy(newAttrs.query.group_by);
  newAttrs.query.percentile = parseFloat(newAttrs.query.percentile) || null;

  _explorers[newAttrs.id] = newAttrs;
  return newAttrs.id;
}

function _update(id, updates) {
  if (updates && updates.active === true && !_explorers[id].active) {
    throw new Error('You must use setActive to set a model as active.');
    return;
  }

  var newModel = _prepareUpdates(_explorers[id], updates);
  newModel.query.group_by = _wrapGroupBy(newModel.query.group_by);
  newModel.query.percentile = parseFloat(newModel.query.percentile) || null;

  if (updates.id && updates.id !== id) {
    _explorers[updates.id] = newModel;
    delete _explorers[id];
    return updates.id;
  } else {
    _explorers[id] = newModel;
    return id;
  }
}

function _markFirstInvalidStepActive(id) {
  var explorer = _explorers[id];
  if (explorer.query.analysis_type !== 'funnel') return;
  explorer.query.steps.forEach(function(step, index) {
    if (!step.isValid) _setStepActive(id, index);
  });
}

function _remove(id) {
  delete _explorers[id];
}

function _setActive(id) {
  _.each(_explorers, function(explorer, key) {
    explorer.active = false;
    delete explorer.originalModel;
  });
  _explorers[id].active = true;
  _explorers[id].originalModel = _.cloneDeep(_explorers[id]);
}

function _revertActiveChanges() {
  var active = _.find(_explorers, { active: true });
  var original = _explorers[active.id].originalModel;
  _explorers[active.id] = _.assign({}, original, { originalModel: original, response: active.response });
  return active.id;
}

function _addFilter(id, attrs) {
  attrs = attrs || {};
  _explorers[id].query.filters.push(_.assign(_defaultFilter(), attrs));
}

function _removeFilter(id, index) {
  _explorers[id].query.filters.splice(index, 1);
}

function _updateFilter(id, index, updates) {
  var filter = _explorers[id].query.filters[index];
  var updates = _prepareFilterUpdates(_explorers[id], filter, updates);

  _explorers[id].query.filters[index] = _.assign({}, filter, updates);

  // Hack around the fact that _.assign doesn't assign null values. But we
  // actually WANT a null value if the coercion_type is null.
  if (_explorers[id].query.filters[index].coercion_type === 'Null') {
    _explorers[id].query.filters[index].property_value = null;
  }
}

function _addStep(id, attrs) {
  var explorer = _explorers[id];
  if (explorer.query.analysis_type !== 'funnel') {
    throw new Error('Error: Attempting to add a step to a non-funnel query. Explorer id: '+explorer.id);
  }
  var step = _.assign(_defaultStep(), attrs || {});
  step.active = true;

  // This is likely always true, but I like being defensive
  if(explorer.query.steps.length > 0) {
    var lastStep = explorer.query.steps[explorer.query.steps.length - 1];

    step.time = lastStep.time;
    step.timezone = lastStep.timezone;
  }

  explorer.query.steps.push(step);
  _setStepActive(id, explorer.query.steps.length - 1);
}

function _removeStep(id, index) {
  _explorers[id].query.steps.splice(index, 1);

  if(index > _explorers[id].query.steps.length - 1) {
    _setStepActive(id, _explorers[id].query.steps.length - 1);
  } else {
    _setStepActive(id, index);
  }
}

function _updateStep(id, index, updates) {
  var step = _explorers[id].query.steps[index];
  _explorers[id].query.steps[index] = _.assign({}, step, updates);
}

function _setStepActive(id, index) {
  _explorers[id].query.steps.forEach(function(step) {
    step.active = false
  })
  _explorers[id].query.steps[index].active = true;
}

function _moveStep(id, index, direction) {
  var steps = _.cloneDeep(_explorers[id].query.steps);

  if (direction === 'up') {
    if (index === 0) return;

    var stepToDisplace = steps[index-1];
    var step = steps[index];
    steps[index-1] = step;
    steps[index] = stepToDisplace;
  }
  if (direction === 'down') {
    if (index === steps.length-1) return;

    var stepToDisplace = steps[index+1];
    var step = steps[index];
    steps[index+1] = step;
    steps[index] = stepToDisplace;
  }

  _explorers[id].query.steps = steps;
}

function _addStepFilter(id, stepIndex, attrs) {
  attrs = attrs || {};
  _explorers[id].query.steps[stepIndex].filters.push(_.assign(_defaultFilter(), attrs));
}

function _removeStepFilter(id, stepIndex, filterIndex) {
  _explorers[id].query.steps[stepIndex].filters.splice(filterIndex, 1);
}

function _updateStepFilter(id, stepIndex, filterIndex, updates) {
  var filter = _explorers[id].query.steps[stepIndex].filters[filterIndex];
  var updates = _prepareFilterUpdates(_explorers[id], filter, updates);
  _explorers[id].query.steps[stepIndex].filters[filterIndex] = _.assign({}, filter, updates);

  // Hack around the fact that _.assign doesn't assign null values. But we
  // actually WANT a null value if the coercion_type is null.
  if (_explorers[id].query.steps[stepIndex].filters[filterIndex].coercion_type === 'Null') {
    _explorers[id].query.steps[stepIndex].filters[filterIndex].property_value = null;
  }
}

function _clear(id) {
  var model = _explorers[id];
  _explorers[id] = _.assign({}, _defaultAttrs(), _.pick(model, ['id', 'query_name', 'active', 'metadata', 'originalModel']));
}

var ExplorerStore = _.assign({}, EventEmitter.prototype, {

  unregisterWithDispatcher: function() {
    AppDispatcher.unregister(this.dispatchToken);
  },

  clearAll: function() {
    _explorers = {};
  },

  get: function(id) {
    return _explorers[id];
  },

  getActive: function() {
    return _.find(_explorers, { active: true });
  },

  getAll: function() {
    return _explorers;
  },

  getLast: function() {
    var keys = _.keys(_explorers);
    return _explorers[keys[keys.length-1]];
  },

  getAllPersisted: function() {
    return _.filter(_explorers, function(explorer){
      return ExplorerUtils.isPersisted(explorer);
    });
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

// Register callback to handle all updates
ExplorerStore.dispatchToken = AppDispatcher.register(function(action) {

  function finishAction(id) {
    // Validate the model
    if (id) _validate(id);

    // Emit change
    ExplorerStore.emitChange();
  }

  switch(action.actionType) {
    case ExplorerConstants.EXPLORER_CREATE:
      _create(action.attrs);
      finishAction();
      break;

    case ExplorerConstants.EXPLORER_CREATE_BATCH:
      action.models.forEach(function(model) {
        _explorers[model.id] ? _update(model.id, model) : _create(model);
      });
      finishAction();
      break;

    case ExplorerConstants.EXPLORER_CLONE:
      var source = ExplorerStore.get(action.id);
      _create({ query: _.cloneDeep(source.query),
                metadata: {
                  display_name: null,
                  visualization: {
                    chart_type: _.cloneDeep(source.metadata.visualization.chart_type)
                  }
                }
              });
      finishAction();
      break;

    case ExplorerConstants.EXPLORER_UPDATE:
      var id = _update(action.id, action.updates);
      finishAction(id);
      break;

    case ExplorerConstants.EXPLORER_REMOVE:
      var wasActive = (_explorers[action.id].active === true);
      _remove(action.id);
      // Create a new active explorer to replace the previously active one.
      if (wasActive) {
        var id = _create();
        _setActive(id);
      }
      finishAction();
      break;

    case ExplorerConstants.EXPLORER_SET_ACTIVE:
      _setActive(action.id);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_REVERT_ACTIVE_CHANGES:
      var id = _revertActiveChanges();
      finishAction(id);
      break;

    case ExplorerConstants.EXPLORER_CLEAR:
      _clear(action.id);
      finishAction();
      break;

    case ExplorerConstants.EXPLORER_SAVING:
      _update(action.id, { saving: true });
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_SAVE_SUCCESS:
      _update(action.id, { saving: false });
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_SAVE_FAIL:
      _update(action.id, { saving: false });
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_ADD_FILTER:
      _addFilter(action.id, action.attrs);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_REMOVE_FILTER:
      _removeFilter(action.id, action.index);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_UPDATE_FILTER:
      _updateFilter(action.id, action.index, action.attrs);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_ADD_STEP:
      _addStep(action.id, action.attrs);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_REMOVE_STEP:
      _removeStep(action.id, action.index);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_UPDATE_STEP:
      _updateStep(action.id, action.index, action.attrs);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_SET_STEP_ACTIVE:
      _setStepActive(action.id, action.index);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_MOVE_STEP:
      _moveStep(action.id, action.index, action.direction);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_ADD_STEP_FILTER:
      _addStepFilter(action.id, action.stepIndex, action.attrs);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_REMOVE_STEP_FILTER:
      _removeStepFilter(action.id, action.stepIndex, action.filterIndex);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_UPDATE_STEP_FILTER:
      _updateStepFilter(action.id, action.stepIndex, action.filterIndex, action.attrs);
      finishAction(action.id);
      break;

    case ExplorerConstants.EXPLORER_VALIDATE:
      _validate(action.id);
      finishAction();
      break;

    case ExplorerConstants.EXPLORER_FOUND_INVALID:
      // Find any invalid steps and mark the first one active to display the notice.
      _markFirstInvalidStepActive(action.id);
      finishAction();
      break;

    default:
      // no op
  }

  return true;
});

module.exports = ExplorerStore;
