var _ = require('lodash');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ProjectConstants = require('../constants/ProjectConstants');
var ProjectStore = require('../stores/ProjectStore');
var ProjectUtils = require('../utils/ProjectUtils');
var ExplorerUtils = require('../utils/ExplorerUtils');
var FormatUtils = require('../utils/FormatUtils');

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

  fetchProjectCollections: function() {
    var project = ProjectStore.getProject();
    if (!project) throw new Error("Cannot fetchProjectCollections: No project model has been created yet.");

    return project.client
      .get(project.client.url('projectId'))
      .auth(project.client.masterKey())
      .send()
      .then(function(res){
        if (res.events.length < 1000) {
          ProjectActions.fetchProjectSchema();
          return res;
        }
        var schema = {};
        _.each(res.events, function(collection) {
          schema[collection.name] = _.assign(collection, {
            sortedProperties: [],
            loading: false,
            recentEvents: null
          });
        });
        ProjectActions.update(project.id, {
          schema: schema,
          eventCollections: FormatUtils.sortItems(_.keys(schema)),
          loading: false
        });
      })
      .catch(function(err){
        throw new Error('Error fetching project collections: ' + err);
      });
  },

  fetchProjectSchema: function() {
    var project = ProjectStore.getProject();
    if (!project) throw new Error("Cannot fetchProjectSchema: No project model has been created yet.");

    return project.client
      .get(project.client.url('events'))
      .auth(project.client.masterKey())
      .send()
      .then(function(res){
        var schema = {};
        _.each(res, function(collection) {
          schema[collection.name] = _.assign(collection, {
            sortedProperties: FormatUtils.sortItems(_.keys(collection.properties)),
            loading: false,
            recentEvents: null
          });
        });
        ProjectActions.update(project.id, {
          schema: schema,
          eventCollections: FormatUtils.sortItems(_.keys(schema)),
          loading: false
        });
      })
      .catch(function(err){
        throw new Error('Error fetching project collections: ' + err);
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
  }

};

module.exports = ProjectActions;
