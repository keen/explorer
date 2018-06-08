import AppDispatcher from '../dispatcher/AppDispatcher';
import NoticeConstants from '../constants/NoticeConstants';

const NoticeActions = {

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
