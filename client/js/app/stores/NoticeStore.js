var _ = require('lodash');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NoticeConstants = require('../constants/NoticeConstants');
var ExplorerConstants = require('../constants/ExplorerConstants');
var ExplorerStore = require('../stores/ExplorerStore');


var CHANGE_EVENT = 'change';

var _notices = {};

function defaultAttrs() {
  return {
    text: null,
    type: null
  };
}

function _create(attrs) {
  _notices = {};
  var tempId = "TEMP-" + (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _notices[tempId] = _.assign(defaultAttrs(), attrs);
}

function _clearAll() {
  _notices = {};
}

var NoticeStore = _.assign({}, EventEmitter.prototype, {
  unregisterWithDispatcher: function() {
    AppDispatcher.unregister(this.dispatchToken);
  },

  getNotice: function() {
    var keys = Object.keys(_notices);
    if (keys.length) {
      return _notices[keys[0]];
    }
  },

  clearAll: function() {
    _clearAll();
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
NoticeStore.dispatchToken = AppDispatcher.register(function(action) {
  AppDispatcher.waitFor([ExplorerStore.dispatchToken]);

  switch(action.actionType) {
    case NoticeConstants.NOTICE_CREATE:
      _create(action.attrs);
      NoticeStore.emitChange();
      break;

    case NoticeConstants.NOTICE_CLEAR_ALL:
      _clearAll();
      NoticeStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_SAVING:
      var text = action.saveType === 'save' ? 'Saving query...' : 'Updating query...';
      _create({
        type: 'info',
        text: text,
        icon: 'info-sign'
      });
      NoticeStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_SAVE_SUCCESS:
      var text = action.saveType === 'save' ? 'Query saved' : 'Query updated';
      _create({
        type: 'success',
        text: text + '.',
        icon: 'ok'
      });
      NoticeStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_SAVE_FAIL:
    var text = action.saveType === 'save' ? 'saving your query' : 'updating your query';
      _create({
        type: 'error',
        text: 'There was a problem ' + text + ': ' + action.errorMsg,
        icon: 'remove-sign'
      });
      NoticeStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_DESTROYING:
      _create({
        type: 'info',
        text: 'Deleting query...',
        icon: 'info-sign'
      });
      NoticeStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_DESTROY_SUCCESS:
      _create({
        type: 'success',
        text: 'Query deleted.',
        icon: 'ok'
      });
      NoticeStore.emitChange();
      break;

    case ExplorerConstants.EXPLORER_DESTROY_FAIL:
      _create({
        type: 'error',
        text: 'There was a problem deleting your query: ' + action.errorMsg,
        icon: 'remove-sign'
      });
      NoticeStore.emitChange();
      break;

    default:
      // no op
  }

  return true;
});

module.exports = NoticeStore;
