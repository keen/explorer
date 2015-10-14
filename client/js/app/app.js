var _ = require('lodash');
var React = require('react');
var Persistence = require('./modules/persistence/persistence.js');
var AppDispatcher = require('./dispatcher/AppDispatcher');
var AppComponent = require('./components/app.js');
var ProjectActions = require('./actions/ProjectActions');
var ExplorerActions = require('./actions/ExplorerActions');
var NoticeActions = require('./actions/NoticeActions');
var ExplorerUtils = require('./utils/ExplorerUtils');
var FormatUtils = require('./utils/FormatUtils');
var runValidations = require('./utils/ValidationUtils').runValidations;
var explorerValidations = require('./validations/ExplorerValidations').explorer;
var AppStateStore = require('./stores/AppStateStore');
var ExplorerStore = require('./stores/ExplorerStore');
var ProjectStore = require('./stores/ProjectStore');
var QueryStringUtils = require('./utils/QueryStringUtils');

function App(config) {
  this.appDispatcher = AppDispatcher;
  this.targetNode = document.getElementById(config.targetId);
  this.persistence = config.persistence || null;
  this.client = config.client;

  ProjectActions.create({ client: this.client });
  ProjectActions.fetchProjectSchema();

  if (this.persistence) ExplorerActions.getPersisted(this.persistence);

  // Create an active Explorer model to start: Either from a saved query or an unsaved one populated
  // with the params from the query string.
  var attrs = ExplorerUtils.formatQueryParams(QueryStringUtils.getQueryAttributes());

  // Is this a saved query we want to load?
  if (attrs.saved_query) {
    // Once the models come back from the server, mark the right one as active.
    AppStateStore.once('change', this.doneFetchingExplorers.bind(this, attrs.saved_query)); 
  } else {
    // Not a saved query, so create a new temporary query from the query attributes.
    var id = FormatUtils.generateTempId();
    ExplorerActions.create(_.assign(attrs, { id: id }));
    ExplorerActions.setActive(id);
    // Run the query for this explorer if it's valid
    var activeExplorer = ExplorerStore.getActive();
    var isEmailExtraction = !ExplorerUtils.isEmailExtraction(activeExplorer);
    var isValid = runValidations(explorerValidations, activeExplorer).isValid;
    if (!isEmailExtraction && isValid) {
      ExplorerActions.exec(this.client, ExplorerStore.getActive().id);
    }
  }
}

App.prototype.doneFetchingExplorers = function(savedQueryName) {
  var appState = AppStateStore.getState();
  if (!appState.fetchingPersistedExplorers && _.find(ExplorerStore.getAllPersisted(), { id: savedQueryName })) {
    ExplorerActions.setActive(savedQueryName);
    ExplorerActions.exec(this.client, savedQueryName);
  } else {
    // We couldn't find that saved query.
    NoticeActions.create({
      text: 'The saved query '+savedQueryName+' could not be found.',
      type: 'error',
      icon: 'remove-sign'
    });
    var id = FormatUtils.generateTempId();
    ExplorerActions.create({ id: id });
    ExplorerActions.setActive(id);
  }
};

App.prototype.render = function() {
  var Component = React.createFactory(AppComponent);
  React.render(Component({
    persistence: this.persistence,
    client: this.client
  }), this.targetNode);
};

window.React = React;
window.Keen = window.Keen || {};
window.Keen.DataTools = window.Keen.DataTools || {};
window.Keen.DataTools.Persistence = Persistence;
window.Keen.DataTools.App = module.exports = App;