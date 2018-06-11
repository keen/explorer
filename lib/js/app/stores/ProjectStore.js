/* ExplorerStore */

import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import _ from 'lodash';
import ProjectConstants from '../constants/ProjectConstants';
import ProjectUtils from '../utils/ProjectUtils';
import FormatUtils from '../utils/FormatUtils';

const CHANGE_EVENT = 'change';

let _projects = {};

function defaultAttrs() {
  return {
    id: null,
    loading: true,
    eventCollections: [],
    sortedEventCollections: {},
    schema: {}
  };
}

function _create(attrs) {
  var id = FormatUtils.generateTempId();
  _projects[id] = _.assign(defaultAttrs(), { id: id }, attrs);
}

function _update(id, updates) {
  _projects[id] = _.assign({}, _projects[id], updates);
}

function _updateEventCollection(id, collectionName, updates) {
  var newCollection = _.assign(
    {},
    _projects[id].schema[collectionName],
    updates
  );
  _projects[id].schema[collectionName] = newCollection;
}

var ProjectStore = _.assign({}, EventEmitter.prototype, {
  unregisterWithDispatcher: function() {
    AppDispatcher.unregister(_dispatcherToken);
  },

  clearAll: function() {
    _projects = {};
  },

  getProject: function() {
    var keys = Object.keys(_projects);
    if (keys.length) {
      return _projects[keys[0]];
    }
  },

  getAll: function() {
    return _projects;
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
var _dispatcherToken = AppDispatcher.register(function(action) {
  var attrs;

  switch(action.actionType) {
    case ProjectConstants.PROJECT_CREATE:
      _create(action.attrs);
      ProjectStore.emitChange();
      break;

    case ProjectConstants.PROJECT_UPDATE:
      _update(action.id, action.updates);
      ProjectStore.emitChange();
      break;

    case ProjectConstants.PROJECT_UPDATE_EVENT_COLLECTION:
      _updateEventCollection(action.id, action.collectionName, action.updates);
      ProjectStore.emitChange();
      break;

    default:
      // no op
  }

  return true;
});

export default ProjectStore;
