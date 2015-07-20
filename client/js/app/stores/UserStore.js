var _ = require('lodash');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');

var CHANGE_EVENT = 'change';

function defaultState() {
  return {
    id: null,
    email: null,
    name: null
  };
}

var _user = defaultState();

function _update(updates) {
  _user = _.assign({}, _user, updates);
}

function _reset() {
  _user = defaultState();
}

var UserStore = _.assign({}, EventEmitter.prototype, {
  unregisterWithDispatcher: function() {
    AppDispatcher.unregister(this.dispatchToken);
  },

  getUser: function() {
    return _user;
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
UserStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case UserConstants.USER_UPDATE:
      _update(action.updates);
      UserStore.emitChange();
      break;

    case UserConstants.USER_RESET:
      _reset();
      UserStore.emitChange();
      break;

    default:
      // no op
  }

  return true;
});

module.exports = UserStore;
