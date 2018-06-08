import AppDispatcher from '../dispatcher/AppDispatcher';
import AppStateConstants from '../constants/AppStateConstants';

const AppStateActions = {

  update: function(updates) {
    AppDispatcher.dispatch({
      actionType: AppStateConstants.APP_STATE_UPDATE,
      updates: updates
    });
  },

  reset: function() {
    AppDispatcher.dispatch({
      actionType: AppStateConstants.APP_STATE_RESET,
    });
  }

};

module.exports = AppStateActions;
