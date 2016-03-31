var React = require('react');
var _ = require('lodash');
var EventBrowser = require('../common/event_browser.jsx');
var Visualization = require('./visualization/index.jsx')
var QueryPaneTabs = require('./query_pane_tabs.jsx');
var QueryBuilder = require('./query_builder/index.jsx');
var BrowseQueries = require('./saved_queries/browse_queries.jsx');
var CacheToggle = require('./cache_toggle.jsx');
var QueryActions = require('./query_actions.jsx');
var Notice = require('../common/notice.jsx');
var FilterManager = require('../common/filter_manager.jsx');
var ExplorerStore = require('../../stores/ExplorerStore');
var ExplorerActions = require('../../actions/ExplorerActions');
var NoticeActions = require('../../actions/NoticeActions');
var AppStateActions = require('../../actions/AppStateActions');
var NoticeStore = require('../../stores/NoticeStore');
var AppStateStore = require('../../stores/AppStateStore');
var ExplorerUtils = require('../../utils/ExplorerUtils');
var FilterUtils = require('../../utils/FilterUtils');
var ProjectUtils = require('../../utils/ProjectUtils');
var ExplorerActions = require('../../actions/ExplorerActions');
var QueryStringUtils = require('../../utils/QueryStringUtils');

function getStoresState() {
  return {
    allPersistedExplorers: ExplorerStore.getAllPersisted(),
    activeExplorer: ExplorerStore.getActive(),
    notice: NoticeStore.getGlobalNotice(),
    stepNotices: NoticeStore.getStepNotices(),
    appState: AppStateStore.getState()
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

  selectEventCollection: function(collectionName) {
    var updates = {
      query: {
        event_collection: collectionName
      }
    };
    ExplorerActions.update(this.state.activeExplorer.id, updates);
    this.refs['event-browser'].refs.modal.close();
  },

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
    if (confirm('Are you sure you want to delete this saved query?')) {
      ExplorerActions.destroy(this.props.persistence, this.state.activeExplorer.id);
    }
  },

  saveQueryClick: function(event) {
    event.preventDefault();
    ExplorerActions.save(this.props.persistence, this.state.activeExplorer.id);
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
    this.refs['filter-manager'].open();
  },

  onDisplayNameChange: function(event) {
    var updates = {
      query_name: ExplorerUtils.slugify(event.target.value),
      metadata: {
        display_name: event.target.value
      }
    };
    ExplorerActions.update(this.state.activeExplorer.id, updates);
  },

  onQueryNameChange: function(event) {
    var name = event.target.value.replace(/[^\w-]/g,'');
    ExplorerActions.update(this.state.activeExplorer.id, { query_name: name });
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
    var updates = {
      query: {
        email: event.target.value === 'email' ? "" : null
      }
    };
    ExplorerActions.update(this.state.activeExplorer.id, updates);
  },

  handleClearQuery: function() {
    // NOTE: (Eric Anderson, Aug 19, 2015): Awful terrible hack to
    // ensure that the components properly display the values of the cleared
    // model.
    var self = this;
    setTimeout(function(){
      ExplorerActions.clear(self.state.activeExplorer.id);
    }, 0);
  },

  handleAddFilter: function() {
    ExplorerActions.addFilter(this.state.activeExplorer.id);
  },

  handleRemoveFilter: function(index) {
    ExplorerActions.removeFilter(this.state.activeExplorer.id, index);
  },

  handleFilterChange: function(index, updates) {
    ExplorerActions.updateFilter(this.state.activeExplorer.id, index, updates);
  },

  // ********************************
  // Convenience functions
  // ********************************

  setVizWrapTop: function(top) {
    this.refs['viz-area'].style.top = top + 'px';
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

  getEventPropertyNames: function(collection)  {
    return ProjectUtils.getEventCollectionPropertyNames(
      this.props.project,
      collection
    );
  },

  getPropertyType: function (eventCollection, property_name) {
    return ProjectUtils.getPropertyType(
      this.props.project,
      eventCollection,
      property_name
    );
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
    // Create a default filter if there are no filters already on this model
    if (!this.state.activeExplorer.query.filters.length) {
      ExplorerActions.addFilter(this.state.activeExplorer.id);
    }
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
      if (['extraction'].indexOf(this.state.activeExplorer.query.analysis_type) === -1) {
        cacheToggle = <CacheToggle model={this.state.activeExplorer} />;
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
                                setExtractionType={this.setExtractionType}
                                handleClearQuery={this.handleClearQuery}
                                getEventPropertyNames={this.getEventPropertyNames}
                                getPropertyType={this.getPropertyType}
                                analysisTypes={ProjectUtils.getConstant('ANALYSIS_TYPES')}
                                stepNotices={this.state.stepNotices} />;
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
                           onNameChange={this.onNameChange}
                           appState={this.state.appState}
                           toggleCodeSample={this.toggleCodeSample}
                           onQueryNameChange={this.onQueryNameChange}
                           onDisplayNameChange={this.onDisplayNameChange} />
            {cacheToggle}
            <QueryActions model={this.state.activeExplorer}
                          handleRevertChanges={this.handleRevertChanges}
                          handleQuerySubmit={this.handleQuerySubmit}
                          saveQueryClick={this.saveQueryClick}
                          removeClick={this.removeSavedQueryClicked}
                          persistence={this.props.persistence}
                          codeSampleHidden={this.state.appState.codeSampleHidden}
                          toggleCodeSample={this.toggleCodeSample} />
          </div>
        </div>
        <EventBrowser ref="event-browser"
                      client={this.props.client}
                      project={this.props.project}
                      currentEventCollection={this.state.activeExplorer.query.event_collection}
                      selectEventCollection={this.selectEventCollection} />
        <FilterManager ref="filter-manager"
                       eventCollection={this.state.activeExplorer.query.event_collection}
                       filters={this.state.activeExplorer.query.filters}
                       handleChange={this.handleFilterChange}
                       removeFilter={this.handleRemoveFilter}
                       addFilter={this.handleAddFilter}
                       getPropertyType={this.getPropertyType}
                       propertyNames={this.getEventPropertyNames(this.state.activeExplorer.query.event_collection)} />
      </div>
    );
  },

  _onChange: function() {
    var newState = getStoresState();
    this.setState(newState);
    if (ExplorerUtils.isPersisted(newState.activeExplorer)) {
      window.history.pushState({ model: newState.activeExplorer }, "", '?saved_query='+newState.activeExplorer.id);
    } else {
      QueryStringUtils.updateSearchString(ExplorerUtils.paramsForURL(newState.activeExplorer));
    }
  }
});

module.exports = Explorer;
