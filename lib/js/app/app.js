import _ from 'lodash';
import KeenAnalysis from 'keen-analysis';
import React from 'react';
import ReactDOM from 'react-dom';

import { version } from '../../../package.json';

import Persistence from './modules/persistence/persistence.js';
import AppDispatcher from './dispatcher/AppDispatcher';
import AppComponent from './components/app.js';
import ProjectActions from './actions/ProjectActions';
import ExplorerActions from './actions/ExplorerActions';
import AppStateActions from './actions/AppStateActions';
import NoticeActions from './actions/NoticeActions';
import ExplorerUtils from './utils/ExplorerUtils';
import FormatUtils from './utils/FormatUtils';
import RunValidations from './utils/RunValidations';
import ExplorerValidations from './validations/ExplorerValidations';
import ExplorerStore from './stores/ExplorerStore';
import ProjectStore from './stores/ProjectStore';
import QueryStringUtils from './utils/QueryStringUtils';

export const KeenExplorer = function (options) {
  var tempId = FormatUtils.generateTempId();
  this.appDispatcher = AppDispatcher;
  var params = QueryStringUtils.getQueryAttributes();
  if (params && params.query && params.query.limit) {
    params.query.limit = parseInt(params.query.limit);
  }
  this.config = {
    params,
    persistence: null
  };
  if (typeof options === 'string') {
    // backward compatibility
    this.el(options);
  } else {
    // configuration object
    this.config = { ...this.config, ...options };
    this.el(this.config.container);
  }
  if (!this.config.el) {
    console.error("Can't find HTML element", el);
  }
  ExplorerActions.create(_.assign(ExplorerUtils.formatQueryParams(this.config.params) || {}, { 'id': tempId }));
  ExplorerActions.setActive(tempId);
  ExplorerActions.validate(tempId);
  if (this.config.keenAnalysisOptions) {
    this.client(this.config.keenAnalysisOptions);
  }
}

KeenExplorer.prototype.client = function(obj) {
    if (!arguments.length) return this.config.client;
    this.config.client = new KeenAnalysis(obj);
    this.config.client.resources({
      'events': '{protocol}://{host}/3.0/projects/{projectId}/events'
    });
    ProjectActions.create({ client: this.config.client });
    ProjectActions.fetchProjectCollections(this.config.client);
    if (this.config.persistence) {
      this.persistence(true);
    }
    this.fetch();
    return this;
};

KeenExplorer.prototype.el = function(target) {
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

KeenExplorer.prototype.fetch = function(){
  if (this.config.persistence) {
    ExplorerActions.fetchAllPersisted(this.config.persistenceInstance, (err) => {
      if (err) console.error('There was an error fetching the persisted explorers: ', err.stack);

      // Is this a saved query we want to load?
      if (this.config.params.saved_query) {
        // Once the models come back from the server, mark the right one as active.
        /*         */
        ExplorerActions.fetchPersisted(this.config.persistenceInstance, { id: this.config.params.saved_query },
          this.doneFetchingSavedQuery.bind(this, this.config.params.saved_query));

      } else {
        AppStateActions.update({ ready: true });
        // Run the query for this explorer if it's valid
        var isEmailExtraction = ExplorerUtils.isEmailExtraction(ExplorerStore.getActive());
        RunValidations.run(ExplorerValidations, ExplorerStore.getActive());
        if (!isEmailExtraction && ExplorerStore.getActive().isValid) {
          ExplorerActions.exec(this.config.client, ExplorerStore.getActive().id);
        }
      }
    });

  } else {
    AppStateActions.update({ ready: true });
  }
  this.render();
  return this;
};

KeenExplorer.prototype.persistence = function(bool) {
  if (!arguments.length) return this.config.persistenceInstance;
  if (typeof bool === 'boolean' && bool) {
    if (!this.config.client || !this.config.client.masterKey()) {
      console.error('The Persistence feature requires a client instance with a masterKey value');
    }
    this.config.persistenceInstance = new Persistence.KeenSavedQueries({
      baseUrl: this.config.client.url('queries', 'saved'),
      client: this.config.client
    });
    this.config.persistenceInstance.config.masterKey = this.config.client.masterKey();
    this.config.persistence = bool;
  }
  return this;
};

KeenExplorer.prototype.doneFetchingSavedQuery = function(savedQueryName, err) {
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
      console.error("There was a problem fetching a saved query: ", err.stack);
    }
  }
};

KeenExplorer.prototype.render = function() {
  let Component = React.createFactory(AppComponent);
  ReactDOM.render(Component({
    persistence: this.config.persistenceInstance,
    client: this.config.client,
    config: this.config
  }), this.config.el);
};

KeenExplorer.version = version;

export let keenGlobals = undefined;
if (typeof webpackKeenGlobals !== 'undefined') {
  keenGlobals = webpackKeenGlobals;
}

KeenExplorer.Persistence = Persistence;
export default KeenExplorer;
