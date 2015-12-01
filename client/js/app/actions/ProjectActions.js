var _ = require('lodash');
var request = require('superagent');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProjectConstants = require('../constants/ProjectConstants');
var ProjectStore = require('../stores/ProjectStore');
var ProjectUtils = require('../utils/ProjectUtils');
var ExplorerUtils = require('../utils/ExplorerUtils');

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
          var schema = {};
          _.each(res.body, function(collection) {
            schema[collection.name] = _.assign(collection, { 
              loading: false,
              recentEvents: null
            });
          });
          ProjectActions.update(project.id, {
            schema: schema,
            eventCollections: ProjectUtils.getEventCollectionsFromSchema(schema),
            loading: false
          });
        }
      });
  },

  updateEventCollection: function(collectionName, updates) {
    var project = ProjectStore.getProject();
    AppDispatcher.dispatch({
      actionType: ProjectConstants.PROJECT_UPDATE_EVENT_COLLECTION,
      id: project.id,
      collectionName: collectionName,
      updates: updates
    });
  },

  fetchRecentEventsForCollection: function(client, eventCollection) {
    var project = ProjectStore.getProject();
    ProjectActions.updateEventCollection(eventCollection, {
      loading: true
    });
    ExplorerUtils.runQuery({
      client: client,
      query: {
        event_collection: eventCollection,
        analysis_type: 'extraction',
        latest: 10
      },
      success: function(res) {
        ProjectActions.updateEventCollection(eventCollection, {
          recentEvents: res.result
        });
      },
      error: function(err) {
        throw new Error("Error requesting latest events for event collection: " + eventCollection);
      },
      complete: function() {
        ProjectActions.updateEventCollection(eventCollection, {
          loading: false
        });
      }
    });
  },

  deleteProperty: function(propertyName, eventCollection, client) {
    var url = client.config.protocol +
      "://" + client.config.host +
      "/projects/" + client.config.projectId +
      "/events/" + eventCollection +
      "/properties/" + propertyName +
      "?api_key=" + client.config.masterKey;
    var req = request("DELETE", url).type("application/json");
    req.end(function(err, res) {
      if (err) {
        throw new Error("Error deleting " + propertyName +":" + err);
      } else {
        ProjectActions.fetchProjectSchema();
      }
    });
  }

};

module.exports = ProjectActions;
