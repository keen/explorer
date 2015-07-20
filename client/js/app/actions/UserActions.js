var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');

var UserActions = {

  update: function(updates) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_UPDATE,
      updates: updates
    });
  },

  reset: function() {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_RESET,
    });
  }

};

module.exports = UserActions;
