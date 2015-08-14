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

var CHANGE_EVENT = 'change';
var DEFAULT_NAME = 'Untitled';

var _explorers = {};

function _defaultAttrs(){
  return {
    id: FormatUtils.generateRandomId("TEMP-"),
    name: DEFAULT_NAME,
    active: false,
    saving: false,
    error: null,
    result: null,
    loading: false,
    isValid: true,
    timeframe_type: 'relative',
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
}

function _defaultFilter() {
  return {
    property_name: null,
    property_value: null,
    operator: 'eq',
    coercion_type: 'String'
  };
}

function _defaultGeoFilter() {
  return {
    coordinates: [],
    max_distance_miles: null
  };
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
  return targetCoercionType = FormatUtils.coercionTypeForPropertyType(propertyType);
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
    // No need to update the operator - we allow any operator for any property type right now.
    updates.coercion_type = _getDefaultFilterCoercionType(explorer, _.assign({}, filter, updates));
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
    if (!_.contains(coercionOptions, coercion_type)) {
      updates.coercion_type = coercionOptions[0];
    }
  }
  
  if (updates.coercion_type === 'Geo' && filter.coercion_type !== 'Geo') {
    updates.property_value = _defaultGeoFilter();
  }
  
  updates.property_value = FilterUtils.getCoercedValue(_.assign({}, filter, updates));

  return updates;
}

function _create(attrs) {
  attrs = attrs || {};
  var newAttrs = _.merge(_defaultAttrs(), attrs);
  _explorers[newAttrs.id] = newAttrs;
}

function _update(id, updates) {
  var newModel = _.assign({}, _explorers[id], updates);
  if (updates.id && updates.id !== id) {
    _explorers[updates.id] = newModel;
    delete _explorers[id];
  } else {
    _explorers[id] = newModel;
  }
}

function _remove(id) {
  delete _explorers[id];
}

function _setActive(id) {
  var keys = Object.keys(_explorers);
  for(var i=0; i<keys.length; i++) {
    _explorers[keys[i]].active = false;
  }
  _explorers[id].active = true;
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

function _clear(id) {
  var model = _explorers[id];
  _explorers[id] = _.assign({}, _defaultAttrs(), { id: model.id, active: model.active });
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
  var attrs;

  switch(action.actionType) {
    case ExplorerConstants.EXPLORER_CREATE:
      _create(action.attrs);
      ExplorerStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_CREATE_BATCH:
      _.each(action.models, function(model) {
        if (_explorers[model.id]) {
          _update(model.id, model);
        } else {
          _create(model);
        }
      });
      ExplorerStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_UPDATE:
      _update(action.id, action.updates);
      ExplorerStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_REMOVE:
      var wasActive = (_explorers[action.id].active === true);
      _remove(action.id);
      if (wasActive) {
        _create({ active: true }); // Create a new active explorer to replace the previously active one.
      }
      ExplorerStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_SET_ACTIVE:
      _setActive(action.id);
      ExplorerStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_CLEAR:
      _clear(action.id);
      ExplorerStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_SAVING:
      _update(action.id, { saving: true });
      ExplorerStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_SAVE_SUCCESS:
      _update(action.id, { saving: false });
      ExplorerStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_SAVE_FAIL:
      _update(action.id, { saving: false });
      ExplorerStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_ADD_FILTER:
      _addFilter(action.id, action.attrs);
      ExplorerStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_REMOVE_FILTER:
      _removeFilter(action.id, action.index);
      ExplorerStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_UPDATE_FILTER:
      _updateFilter(action.id, action.index, action.attrs);
      ExplorerStore.emitChange();
      break;

    default:
      // no op
  }

  return true;
});

module.exports = ExplorerStore;
