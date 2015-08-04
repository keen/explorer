/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
var EventBrowser = require('../common/event_browser.js');
var CSVExtraction = require('./csv_extraction.js');
var Visualization = require('./visualization/index.js')
var QueryPaneTabs = require('./query_pane_tabs.js');;
var QueryBuilder = require('./query_builder/index.js');
var BrowseQueries = require('./saved_queries/browse_queries.js');
var Notice = require('../common/notice.js');
var FilterManager = require('../common/filter_manager.js');
var ExplorerStore = require('../../stores/ExplorerStore');
var UserStore = require('../../stores/UserStore');
var ExplorerActions = require('../../actions/ExplorerActions');
var NoticeActions = require('../../actions/NoticeActions');
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
      var modelId = event.currentTarget.dataset.id;
      ExplorerActions.setActive(modelId);
      ExplorerActions.exec(this.props.client, modelId);
    }
  },

  removeSavedQueryClicked: function(modelIndex) {
    if (confirm("Are you sure you want to delete this query?")) {
      var model = this.state.allPersistedExplorers[modelIndex];
      ExplorerActions.destroy(this.props.persistence, model.id);
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

  onOpenCSVExtraction: function() {
    this.refs['csv-extraction'].refs.modal.open();
  },

  onNameChange: function(event) {
    ExplorerActions.update(this.state.activeExplorer.id, { name: event.target.value });
  },

  // ********************************
  // Convenience functions
  // ********************************

  updateVizPosition: function(event) {
    var options = this.props.config.options || {};
    var scrollOffset = $(document).scrollTop();
    var adjustedScrollOffset = scrollOffset + (options.fixedOffset || 0);

    var $explorerNode = $(this.refs['root'].getDOMNode());
    var explorerPosition = $explorerNode.offset();

    var explorerTop = explorerPosition.top;
    var explorerBottom = explorerTop + $explorerNode.outerHeight();

    var vizAreaHeight = $(this.refs['viz-area'].getDOMNode()).outerHeight();

    // Disable for mobile screens
    if (window.innerHeight > window.innerWidth) {
      this.setVizWrapTop(0);
      return;
    }

    if (adjustedScrollOffset > explorerTop && (adjustedScrollOffset + vizAreaHeight) < explorerBottom) {
      var offset = (adjustedScrollOffset - explorerTop);
      this.setVizWrapTop(offset);
    } else if (adjustedScrollOffset <= explorerTop) {
      this.setVizWrapTop(0);
    }
  },

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

  // Lifecycle hooks

  componentDidMount: function() {
    ExplorerStore.addChangeListener(this._onChange);
    NoticeStore.addChangeListener(this._onChange);
    AppStateStore.addChangeListener(this._onChange);
    window.addEventListener('scroll', _.bind(this.updateVizPosition, this), false);
  },

  componentWillUnmount: function() {
    ExplorerStore.removeChangeListener(this._onChange);
    NoticeStore.removeChangeListener(this._onChange);
    AppStateStore.removeChangeListener(this._onChange);
    window.removeEventListener('scroll', _.bind(this.updateVizPosition, this), false);
  },

  getInitialState: function() {
    return _.assign(getStoresState(), {
      activeQueryPane: 'build'
    });
  },

  render: function() {
    var queryPaneTabs,
        browseListNotice,
        browseEmptyContent;

    if (this.props.persistence) {
      queryPaneTabs = <QueryPaneTabs ref="query-pane-tabs"
                                     activePane={this.state.activeQueryPane}
                                     toggleCallback={this.toggleQueryPane}
                                     createNewQuery={this.createNewQuery}
                                     persisted={ExplorerUtils.isPersisted(this.state.activeExplorer)} />;
      if (this.state.appState.fetchingPersistedExplorers) {
        browseListNotice = <Notice notice={{ icon: 'info-sign', text: 'Loading saved queries...', type: 'info' }} closable={false} />
      } else {
        browseEmptyContent = <h4 className="text-center">You don&#39;t have any saved queries yet.</h4>;
      }
    }

    var activeQueryPane;
    if (!this.props.persistence || this.state.activeQueryPane === 'build') {
      queryPane = <QueryBuilder ref="query-builder"
                                model={this.state.activeExplorer}
                                client={this.props.client}
                                project={this.props.project}
                                onBrowseEvents={this.onBrowseEvents}
                                handleFiltersToggle={this.handleFiltersToggle} />;
    } else {
      queryPane = <BrowseQueries listItems={this.state.allPersistedExplorers}
                                 emptyContent={browseEmptyContent}
                                 notice={browseListNotice}
                                 clickCallback={this.savedQueryClicked}
                                 removeCallback={this.removeSavedQueryClicked}
                                 selectedIndex={this.getSelectedIndex()}
                                 user={this.state.user} />;
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
                           onOpenCSVExtraction={this.onOpenCSVExtraction}
                           onNameChange={this.onNameChange} />
          </div>
        </div>
        <EventBrowser ref="event-browser"
                      client={this.props.client}
                      project={this.props.project}
                      model={this.state.activeExplorer} />
        <CSVExtraction ref="csv-extraction"
                       client={this.props.client}
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
