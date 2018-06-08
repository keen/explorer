import _ from 'lodash';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import AppStateConstants from '../constants/AppStateConstants';

const CHANGE_EVENT = 'change';

function defaultState() {
  return {
    fetchingPersistedExplorers: false,
    codeSampleHidden: true,
    ready: false
  };
}

var _appState = defaultState();

function _update(updates) {
  _appState = _.assign({}, _appState, updates);
}

function _reset() {
  _appState = defaultState();
}

var AppStateStore = _.assign({}, EventEmitter.prototype, {
  unregisterWithDispatcher: function() {
    AppDispatcher.unregister(this.dispatchToken);
  },

  getState: function() {
    return _appState;
  },

  reset: function() {
    _reset();
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
AppStateStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case AppStateConstants.APP_STATE_UPDATE:
      _update(action.updates);
      AppStateStore.emitChange();
      break;

    case AppStateConstants.APP_STATE_RESET:
      _reset();
      AppStateStore.emitChange();
      break;

    default:
      // no op
  }

  return true;
});

module.exports = AppStateStore;
