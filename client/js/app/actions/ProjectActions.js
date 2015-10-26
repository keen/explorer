var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProjectConstants = require('../constants/ProjectConstants');
var ProjectStore = require('../stores/ProjectStore');
var ProjectUtils = require('../utils/ProjectUtils');
var request = require('superagent');

var ProjectActions = {

  create: function(attrs) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_CREATE,
      attrs: attrs
    });
  },

  update: function(id, updates) {
    var project = ProjectStore.getProject();

    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_UPDATE,
      id: project.id,
      updates: updates
    });
  },


  fetchProjectSchema: function() {
    var project = ProjectStore.getProject();
    if (!project) throw new Error("Cannot fetchProjectSchema: No project model has been created yet.");

    return request.get(ProjectUtils.eventsUrl(project.client))
      .end(function(err, res) {
        if (err) {
          throw new Error("Error fetching project schema: " + err);
        } else {
          var schema = res.body;
          var eventCollections = ProjectUtils.getEventCollectionsFromSchema(schema);
          ProjectActions.update(project.id, {
            schema: schema,
            eventCollections: eventCollections,
            loading: false
          });
        }
      });
  },

};

module.exports = ProjectActions;
