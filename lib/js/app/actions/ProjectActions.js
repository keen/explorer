import _ from 'lodash';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ProjectConstants from '../constants/ProjectConstants';
import ProjectStore from '../stores/ProjectStore';
import ProjectUtils from '../utils/ProjectUtils';
import ExplorerUtils from '../utils/ExplorerUtils';
import FormatUtils from '../utils/FormatUtils';

const ProjectActions = {

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

  fetchProjectCollections: function(client) {
    var project = ProjectStore.getProject();
    if (!project) console.error("Cannot fetchProjectCollections: No project model has been created yet.");
    var authKey = client.masterKey() || client.readKey();

    return client
      .get(client.url('projectId'))
      .auth(authKey)
      .send()
      .then(function(res){
        var schema = _.assign({}, project.schema);
        _.each(res.events, function(collection) {
          schema[collection.name] = _.assign(collection, {
            properties: {},
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
        console.error('Error fetching project collections: ', err.stack);
      });
  },

  fetchCollectionSchema: function(client, collectionName) {
    var project = ProjectStore.getProject();
    if (project.eventCollections.indexOf(collectionName) < 0) {
      return false;
    }
    ProjectActions.updateEventCollection(collectionName, {
      loading: true
    });
    return client
      .get(client.url('events', encodeURIComponent(collectionName)))
      .auth(client.masterKey())
      .send()
      .then(function(res) {
        ProjectActions.updateEventCollection(collectionName, {
          properties: res.properties,
          sortedProperties: FormatUtils.sortItems(_.keys(res.properties)),
          loading: false
        });
      })
      .catch(function(err){
        console.error('Error fetching project collections: ', err.stack);
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
        console.error("Error requesting latest events for event collection: " + eventCollection, err.stack);
      },
      complete: function() {
        ProjectActions.updateEventCollection(eventCollection, {
          loading: false
        });
      }
    });
  }

};

export default ProjectActions;
