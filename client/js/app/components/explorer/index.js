/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
var EventBrowser = require('../common/event_browser.js');
var Visualization = require('./visualization/index.js')
var QueryPaneTabs = require('./query_pane_tabs.js');;
var QueryBuilder = require('./query_builder/index.js');
var BrowseQueries = require('./saved_queries/browse_queries.js');
var CacheToggle = require('./cache_toggle.js');
var QueryActions = require('./query_actions.js');
var Notice = require('../common/notice.js');
var FilterManager = require('../common/filter_manager.js');
var ExplorerStore = require('../../stores/ExplorerStore');
var UserStore = require('../../stores/UserStore');
var ExplorerActions = require('../../actions/ExplorerActions');
var NoticeActions = require('../../actions/NoticeActions');
var AppStateActions = require('../../actions/AppStateActions');
var NoticeStore = require('../../stores/NoticeStore');
var AppStateStore = require('../../stores/AppStateStore');
var ExplorerUtils = require('../../utils/ExplorerUtils');
var ExplorerActions = require('../../actions/ExplorerActions');
var ValidationUtils = require('../../utils/ValidationUtils');
var ExplorerValidations = require('../../validations/ExplorerValidations');
var QueryStringUtils = require('../../utils/QueryStringUtils');

function getStoresState() {
  return {
    allPersistedExplorers: ExplorerStore.getAllPersisted(),
    activeExplorer: ExplorerStore.getActive(),
    notice: NoticeStore.getNotice(),
    appState: AppStateStore.getState(),
    user: UserStore.getUser()
  };
}

var Explorer = React.createClass({

  toggleFields: function() {
    _.each(this.getFieldsToggleComponents(), function(toggleObj) {
      if (toggleObj.component) {
        var hasValue = (!_.isUndefined(toggleObj.value) && !_.isNull(toggleObj.value)) ? true : false;
        toggleObj.component.setState({ open: hasValue });
      }
    });
  },

  // ********************************
  // Callbacks for child components
  // ********************************

  savedQueryClicked: function(event) {
    event.preventDefault();
    if (this.state.activeExplorer.loading) {
      NoticeActions.create({
        icon: 'info-sign',
        type: 'warning',
        text: "There is already a query in progress. Wait for it to finish loading before selecting a query."
      });
    } else {
      ExplorerActions.revertActiveChanges();
      var modelId = event.currentTarget.dataset.id;
      ExplorerActions.setActive(modelId);
      ExplorerActions.exec(this.props.client, modelId);
    }
  },

  removeSavedQueryClicked: function() {
    if (confirm("Are you sure you want to delete this query?")) {
      ExplorerActions.destroy(this.props.persistence, this.state.activeExplorer.id);
    }
  },

  saveQueryClick: function(event) {
    event.preventDefault();
    var validity = ValidationUtils.runValidations(ExplorerValidations.explorer, this.state.activeExplorer);
    if (!validity.isValid) {
      NoticeActions.create({
        icon: 'remove-circle',
        type: 'error',
        text: "Can't save: " + validity.lastError
      });
      return;
    } else {
      if (ExplorerUtils.isPersisted(this.state.activeExplorer)) {
        ExplorerActions.saveExisting(this.props.persistence, this.state.activeExplorer.id);
      } else {
        ExplorerActions.saveNew(this.props.persistence, this.state.activeExplorer.id);
      }
    }
  },

  createNewQuery: function(event) {
    event.preventDefault();
    ExplorerActions.create();
    var newExplorer = ExplorerStore.getLast();
    ExplorerActions.setActive(newExplorer.id);
    this.setState({ activeQueryPane: 'build' });
  },

  onBrowseEvents: function(event) {
    event.preventDefault();
    this.refs['event-browser'].refs.modal.open();
  },

  handleFiltersToggle: function() {
    this.refs['filter-manager'].refs.modal.open();
  },

  onNameChange: function(event) {
    ExplorerActions.update(this.state.activeExplorer.id, { name: event.target.value });
  },

  handleRevertChanges: function(event) {
    event.preventDefault();
    ExplorerActions.revertActiveChanges();
  },

  handleQuerySubmit: function(event) {
    event.preventDefault();
    if (ExplorerUtils.isEmailExtraction(this.state.activeExplorer)) {
      ExplorerActions.runEmailExtraction(this.props.client, this.state.activeExplorer.id);
    } else {
      ExplorerActions.exec(this.props.client, this.state.activeExplorer.id);
    }
  },

  setExtractionType: function(event) {
    var updates = _.cloneDeep(this.state.activeExplorer);
    updates.query.email = event.target.value === 'email' ? "" : null;
    ExplorerActions.update(this.state.activeExplorer.id, updates);
  },

  // ********************************
  // Convenience functions
  // ********************************

  setVizWrapTop: function(top) {
    this.refs['viz-area'].getDOMNode().style.top = top + 'px';
  },

  getSelectedIndex: function() {
    if (!this.state.activeExplorer || !ExplorerUtils.isPersisted(this.state.activeExplorer)) {
      return null;
    }
    return _.findIndex(this.state.allPersistedExplorers, { id: this.state.activeExplorer.id });
  },

  toggleQueryPane: function(pane) {
    this.setState({ activeQueryPane: pane });
  },

  getSelectedIndex: function() {
    var index;
    for (i=0; i<this.state.allPersistedExplorers.length; i++) {
      if (this.state.allPersistedExplorers[i].active) {
        index = i;
        break;
      }
    }
    return index;
  },

  toggleCodeSample: function(event) {
    event.preventDefault();
    AppStateActions.update({
      codeSampleHidden: !this.state.appState.codeSampleHidden
    });
  },

  // Lifecycle hooks

  componentDidMount: function() {
    ExplorerStore.addChangeListener(this._onChange);
    NoticeStore.addChangeListener(this._onChange);
    AppStateStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ExplorerStore.removeChangeListener(this._onChange);
    NoticeStore.removeChangeListener(this._onChange);
    AppStateStore.removeChangeListener(this._onChange);
  },

  getInitialState: function() {
    return _.assign(getStoresState(), {
      activeQueryPane: 'build'
    });
  },

  render: function() {
    var cacheToggle,
        queryPane,
        queryPaneTabs,
        browseListNotice,
        browseEmptyContent;

    if (this.props.persistence) {
      queryPaneTabs = <QueryPaneTabs ref="query-pane-tabs"
                                     activePane={this.state.activeQueryPane}
                                     toggleCallback={this.toggleQueryPane}
                                     createNewQuery={this.createNewQuery}
                                     persisted={ExplorerUtils.isPersisted(this.state.activeExplorer)} />;
      if (!ExplorerUtils.isEmailExtraction(this.state.activeExplorer)) {
        cacheToggle = <CacheToggle />;
      }
      if (this.state.appState.fetchingPersistedExplorers) {
        browseListNotice = <Notice notice={{ icon: 'info-sign', text: 'Loading saved queries...', type: 'info' }} closable={false} />
      } else {
        browseEmptyContent = <h4 className="text-center">You don&#39;t have any saved queries yet.</h4>;
      }
    }

    if (!this.props.persistence || this.state.activeQueryPane === 'build') {
      queryPane = <QueryBuilder ref="query-builder"
                                model={this.state.activeExplorer}
                                originalModel={this.state.activeExplorerOriginal}
                                client={this.props.client}
                                project={this.props.project}
                                onBrowseEvents={this.onBrowseEvents}
                                handleFiltersToggle={this.handleFiltersToggle}
                                handleRevertChanges={this.handleRevertChanges}
                                handleQuerySubmit={this.handleQuerySubmit}
                                setExtractionType={this.setExtractionType} />;
    } else {
      queryPane = <BrowseQueries ref="query-browser"
                                 listItems={this.state.allPersistedExplorers}
                                 emptyContent={browseEmptyContent}
                                 notice={browseListNotice}
                                 clickCallback={this.savedQueryClicked}
                                 selectedIndex={this.getSelectedIndex()} />;
    }

    return (
      <div ref="root">
        <div className="row">
          <div className="col-sm-5 col-md-4 explorer-query-builder">
            {queryPaneTabs}
            {queryPane}
          </div>
          <div ref="viz-area" className="col-sm-7 col-md-8 explorer-visualization">
            <Visualization notice={this.state.notice}
                           model={this.state.activeExplorer}
                           client={this.props.client}
                           project={this.props.project}
                           persistence={this.props.persistence}
                           saveQueryClick={this.saveQueryClick}
                           onNameChange={this.onNameChange}
                           appState={this.state.appState}
                           toggleCodeSample={this.toggleCodeSample} />
            {cacheToggle}
            <QueryActions model={this.state.activeExplorer}
                          handleRevertChanges={this.handleRevertChanges}
                          handleQuerySubmit={this.handleQuerySubmit}
                          removeClick={this.removeSavedQueryClicked}
                          user={this.state.user}
                          persistence={this.props.persistence}
                          codeSampleHidden={this.state.appState.codeSampleHidden}
                          toggleCodeSample={this.toggleCodeSample} />
          </div>
        </div>
        <EventBrowser ref="event-browser"
                      client={this.props.client}
                      project={this.props.project}
                      model={this.state.activeExplorer} />
        <FilterManager ref="filter-manager"
                      model={this.state.activeExplorer}
                      project={this.props.project}
                      client={this.props.client} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStoresState());
    QueryStringUtils.updateSearchString(ExplorerUtils.paramsForURL(ExplorerStore.getActive()));
  }
});

module.exports = Explorer;
