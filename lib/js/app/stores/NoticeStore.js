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
    location: 'global',
    text: null,
    type: null
  };
}

function _removeGlobalNotices() {
  _.each(_notices, function(val, key) {
    if (val.location === 'global') delete _notices[key];
  });
}

function _removeStepNotices() {
  _.each(_notices, function(val, key) {
    if (val.location === 'step') delete _notices[key];
  });
}

function _create(attrs) {
  if (!attrs.location || attrs.location === 'global') {
    _removeGlobalNotices();
  }
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

  getGlobalNotice: function() {
    return _.find(_notices, { location: 'global' });
  },

  getStepNotices: function() {
    return _.filter(_notices, function(notice) {
      if (notice.location === 'step') return notice;
    });
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
      var msg;
      var text = action.saveType === 'save' ? 'saving' : 'updating';
      if (action.errorMsg) {
        msg = 'Problem ' + text + ': ' + action.errorMsg;
      } else if (action.errorResp && JSON.parse(action.errorResp.text).error_code === "OverCachedQueryLimitError") {
        msg = 'Oops! Looks like you’ve reached your caching limit. Need more cached queries? Contact us at team@keen.io';
      } else if (action.errorResp) {
        msg = 'Problem ' + text + ': ' + JSON.parse(action.errorResp.text).message;
      }
      _create({
        type: 'error',
        text: msg,
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

    case ExplorerConstants.EXPLORER_FOUND_INVALID:
      var explorer = ExplorerStore.get(action.id);
      _create({
        text: 'There was a problem: ' + explorer.errors[0].msg,
        type: 'error',
        icon: 'remove-sign'
      });
      if (explorer.query.analysis_type === 'funnel') {
        _removeStepNotices();
        explorer.query.steps.forEach(function(step, index) {
          if (!step.isValid) {
            _create({
              id: explorer.id,
              location: 'step',
              stepIndex: index,
              text: step.errors[0].msg,
              type: 'error',
              icon: 'remove-sign',
            });
          }
        });
      }
      NoticeStore.emitChange();
      break;

    default:
      // no op
  }

  return true;
});

module.exports = NoticeStore;
