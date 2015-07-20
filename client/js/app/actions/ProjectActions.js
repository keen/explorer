var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProjectConstants = require('../constants/ProjectConstants');

var ProjectActions = {

  create: function(attrs) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_CREATE,
      attrs: attrs
    });
  },

  update: function(id, updates) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_UPDATE,
      id: id,
      updates: updates
    });
  }

};

module.exports = ProjectActions;
