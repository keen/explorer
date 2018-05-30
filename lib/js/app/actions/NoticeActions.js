var AppDispatcher = require('../dispatcher/AppDispatcher');
var NoticeConstants = require('../constants/NoticeConstants');

var NoticeActions = {

  create: function(attrs) {
    AppDispatcher.dispatch({
      actionType: NoticeConstants.NOTICE_CREATE,
      attrs: attrs
    });
  },

  clearAll: function() {
    AppDispatcher.dispatch({
      actionType: NoticeConstants.NOTICE_CLEAR_ALL
    });
  }

};

module.exports = NoticeActions;
