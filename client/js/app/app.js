var _ = require('lodash');
var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Persistence = require('./modules/persistence/persistence.js');
var AppDispatcher = require('./dispatcher/AppDispatcher');
var AppComponent = require('./components/app.js');
var Explorer = require('./components/explorer/index.js');
var ProjectActions = require('./actions/ProjectActions');
var ExplorerActions = require('./actions/ExplorerActions');
var UserActions = require('./actions/UserActions');
var ExplorerUtils = require('./utils/ExplorerUtils');
var FormatUtils = require('./utils/FormatUtils');
var runValidations = require('./utils/ValidationUtils').runValidations;
var explorerValidations = require('./validations/ExplorerValidations').explorer;
var ProjectStore = require('./stores/ProjectStore');
var ExplorerStore = require('./stores/ExplorerStore');
var QueryStringUtils = require('./utils/QueryStringUtils');

function App(config) {
  if (config.persistence && !config.user) {
    throw new Error("If you initialize Explorer with a persistence layer you must provide a user object as well.");
  }

  this.appDispatcher = AppDispatcher;
  this.targetNode = document.getElementById(config.targetId);
  this.persistence = config.persistence || null;
  this.client = config.client;

  UserActions.update(config.user || {});

  // Create the project store and kick off fetching schema for it.
  ProjectActions.create({ client: this.client });

  // Create the main active explorer
  var explorerAttrs = _.assign(
    { id: FormatUtils.generateRandomId("TEMP-") },
    ExplorerUtils.formatQueryParams(QueryStringUtils.getQueryAttributes()) // Grab params form URL and load into new explorer
  );
  ExplorerActions.create(explorerAttrs);
  ExplorerActions.setActive(explorerAttrs.id);

  // Run the query for this explorer if it's valid
  if (runValidations(explorerValidations, ExplorerStore.getActive()).isValid) {
    ExplorerActions.exec(this.client, ExplorerStore.getActive().id);
  }

  this.componentConfig = {
    persistence: this.persistence,
    options: config.options || {},
    client: this.client
  };

  // Grab the persisted explorers if a persitence module was passed in
  if (this.persistence) {
    ExplorerActions.getPersisted(this.persistence);
  }

  this.routes = (
    <Route name="app" path={config.appRoot || "/"} handler={AppComponent}>
      <Route name="explorer" handler={Explorer}/>
    </Route>
  );
}

App.prototype.render = function() {
  var targetNode = this.targetNode;
  var config = this.componentConfig;

  Router.run(this.routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler config={config}/>, targetNode);
  });
};

window.React = React;
window.Keen = window.Keen || {};
window.Keen.DataTools = window.Keen.DataTools || {};
window.Keen.DataTools.Persistence = Persistence;
window.Keen.DataTools.App = module.exports = App;