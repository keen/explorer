var _ = require('lodash');
var KeenAnalysis = require('keen-analysis');
var React = require('react');
var ReactDOM = require('react-dom');

var Persistence = require('./modules/persistence/persistence.js');
var AppDispatcher = require('./dispatcher/AppDispatcher');
var AppComponent = require('./components/app.js');
var ProjectActions = require('./actions/ProjectActions');
var ExplorerActions = require('./actions/ExplorerActions');
var AppStateActions = require('./actions/AppStateActions');
var NoticeActions = require('./actions/NoticeActions');
var ExplorerUtils = require('./utils/ExplorerUtils');
var FormatUtils = require('./utils/FormatUtils');
var RunValidations = require('./utils/RunValidations').run;
var ExplorerValidations = require('./validations/ExplorerValidations');
var ExplorerStore = require('./stores/ExplorerStore');
var ProjectStore = require('./stores/ProjectStore');
var QueryStringUtils = require('./utils/QueryStringUtils');

function App(el) {
  var tempId = FormatUtils.generateTempId();
  this.appDispatcher = AppDispatcher;
  this.config = {
    params: QueryStringUtils.getQueryAttributes(),
    persistence: null
  };
  this.el(el);
  ExplorerActions.create(_.assign(ExplorerUtils.formatQueryParams(this.config.params) || {}, { 'id': tempId }));
  ExplorerActions.setActive(tempId);
  ExplorerActions.validate(tempId);
}

App.prototype.client = function(obj) {
  if (!arguments.length) return this.config.client;
  this.config.client = new KeenAnalysis(obj);
  this.config.client.resources({
    'events': '{protocol}://{host}/3.0/projects/{projectId}/events'
  });
  ProjectActions.create({ client: this.config.client });
  ProjectActions.fetchProjectCollections(this.config.client);
  return this;
};

App.prototype.el = function(target) {
  if (!arguments.length) return this.config.el;
  if (target.nodeName) {
    this.config.el = target;
  }
  else if (document.querySelector) {
    this.config.el = document.querySelector(target);
  }
  else {
    this.config.el = undefined;
  }
  return this;
};

App.prototype.fetch = function(){
  if (this.config.persistence) {
    ExplorerActions.fetchAllPersisted(this.config.persistence, function(err) {
      if (err) throw new Error('There was an error fetching the persisted explorers: ' + err.text);
    });
    // Is this a saved query we want to load?
    if (this.config.params.saved_query) {
      // Once the models come back from the server, mark the right one as active.
      ExplorerActions.fetchPersisted(this.config.persistence, { id: this.config.params.saved_query },
        this.doneFetchingSavedQuery.bind(this, this.config.params.saved_query));
    } else {
      AppStateActions.update({ ready: true });
      // Run the query for this explorer if it's valid
      var isEmailExtraction = ExplorerUtils.isEmailExtraction(ExplorerStore.getActive());
      RunValidations(ExplorerValidations, ExplorerStore.getActive());
      if (!isEmailExtraction && ExplorerStore.getActive().isValid) {
        ExplorerActions.exec(this.config.client, ExplorerStore.getActive().id);
      }
    }
  }
  this.render();
  return this;
};

App.prototype.persistence = function(bool) {
  if (!arguments.length) return this.config.persistence;
  if (typeof bool === 'boolean' && bool) {
    if (!this.config.client || !this.config.client.masterKey()) {
      throw new Error('This feature requires a client instance with a masterKey value');
    }
    this.config.persistence = new Keen.Explorer.Persistence.KeenSavedQueries({
      baseUrl: this.config.client.url('queries', 'saved'),
      client: this.config.client
    });
    this.config.persistence.config.masterKey = this.config.client.masterKey();
  }
  return this;
};

App.prototype.doneFetchingSavedQuery = function(savedQueryName, err) {
  if (!err) {
    ExplorerActions.setActive(savedQueryName);
    ExplorerActions.exec(this.config.client, savedQueryName);
    AppStateActions.update({ ready: true });
  } else {
    if (err.status === 404) {
      // We couldn't find that saved query.
      NoticeActions.create({
        text: 'The saved query '+savedQueryName+' could not be found.',
        type: 'error',
        icon: 'remove-sign'
      });
      var id = FormatUtils.generateTempId();
      ExplorerActions.create({ id: id });
      ExplorerActions.setActive(id);
      AppStateActions.update({ ready: true });
    } else {
      throw new Error("There was a problem fetching a saved query");
    }
  }
};

App.prototype.render = function() {
  var Component = React.createFactory(AppComponent);
  ReactDOM.render(Component({
    persistence: this.config.persistence,
    client: this.config.client
  }), this.config.el);
};

window.Keen = window.Keen || {};
window.Keen.Explorer = window.Keen.Explorer || {};
window.Keen.Explorer.Persistence = Persistence;
window.Keen.Explorer.App = module.exports = App;
