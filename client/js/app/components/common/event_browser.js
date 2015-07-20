/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
var classNames = require('classnames');
var Loader = require('../common/loader.js');
var FormatUtils = require('../../utils/FormatUtils');
var ProjectUtils = require('../../utils/ProjectUtils');
var ExplorerUtils = require('../../utils/ExplorerUtils');
var ExplorerActions = require('../../actions/ExplorerActions');
var Modal = require('./modal.js');

var EventBrowser = React.createClass({

  // Callbacks

  onKeyUp: function(e) {
    if (e.keyCode == 13) { // enter key
      this.selectEventCollection();
    }
  },

  showEventData: function(event) {
    event.preventDefault();
    this.markModelActive(event.target.innerText);
  },

  filterEventNames: function(event) {
    var eventNameNodes = this.refs['event-names-list'].getDOMNode().childNodes;
    var models = this.state.models;

    var re = new RegExp(event.target.value, 'i');
    for (var i = 0; i < eventNameNodes.length; i++) {
      var nodeText = eventNameNodes[i].childNodes[0].innerText;
      models[i].visible = re.test(nodeText) ? true : false;
    }
    this.setState({ models: models });
  },

  selectEventCollectionClick: function(event) {
    event.preventDefault();
    this.selectEventCollection();
  },

  selectEventCollection: function() {
    var updates = _.cloneDeep(this.props.model.query);
    updates.event_collection = this.getActiveModel().query.event_collection;
    ExplorerActions.update(this.props.model.id, { query: updates });
    this.refs['event-browser-modal'].close();
  },

  // Builders

  buildEventCollectionNodes: function() {
    return _.map(this.state.models, _.bind(function(model) {
      var classes = classNames({
        'active': model.active,
        'hide':  !model.visible
      });

      return (
        <li className={classes} key={model.name}>
          <a href="#" onClick={this.showEventData}>{model.name}</a>
        </li>
      );
    }, this));
  },

  // Convenience functions

  stateStore: {},

  setStateBatch: function() {
    this.setState(this.stateStore);
    this.stateStore = {};
  },

  initializeModels: function() {
    this.stateStore.models = _.map(this.props.project.eventCollections, function(eventCollection) {
      return {
        id: FormatUtils.generateRandomId(),
        name: eventCollection,
        active: false,
        visible: true,
        schema: FormatUtils.prettyPrintJSON(ProjectUtils.getEventCollectionProperties(this.props.project, eventCollection)),
        result: null,
        loading: false,
        query: {
          analysis_type: 'extraction',
          event_collection: eventCollection,
          latest: '10'
        }
      };
    }, this);
    this.stateStore.modelsInitialized = true;

    // Mark the first collection active by default or use the currently selected event collection.
    if (this.stateStore.models.length) {
      this.markModelActive(this.props.model.query.event_collection || this.stateStore.models[0].name);
    } else {
      this.setStateBatch();
    }
  },

  markModelActive: function(name) {
    var models = this.stateStore.models || this.state.models;

    _.each(models, function(model) {
      model.active = false;

      if (model.name === name) {
        model.active = true;
        // RUn the query and get the last 10 events if that hasn't happened yet.
        if (!model.result && !model.loading) {
          model.loading = true;
          this.fetchEventsForModel(model);
        }
      }
    }, this); 
  
    if (this.stateStore.models) {
      this.setStateBatch();
    } else {
      this.setState({ models: models });
    }
  },

  fetchEventsForModel: function(model) {
    ExplorerUtils.runQuery({
      client: this.props.client,
      query: model.query,
      success: _.bind(function(res){
        var models = this.state.models;
        _.find(models, { id: model.id }).result = res.result;
        this.setState({ models: models });
      }, this),
      error: function(err) {
        throw new Error("There was an error querying for latest events for collection: " + model.name);
      },
      complete: _.bind(function() {
        var models = this.state.models;
        _.find(models, { id: model.id }).loading = false;
        this.setState({ models: models });
      }, this)
    });
  },

  getNavClasses: function(name) {
    return (this.state.activeView === name) ? 'active' : '';
  },

  getActiveModel: function() {
    return _.find(this.state.models, { active: true });
  },

  getPreviewData: {

    recentEvents: function(model) {
      return (model && model.result) ? FormatUtils.prettyPrintJSON(model.result) : "";
    },

    schema: function(model) {
      return model ? model.schema : "";
    }

  },

  changeActiveView: function(event) {
    event.preventDefault();
    this.setState({ activeView: event.target.name });
  },

  // Lifecycle hooks

  getInitialState: function() {
    return {
      models: [],
      modelsInitialized: false,
      activeView: 'schema'
    }
  },

  componentWillMount: function() {
    // Initialize necessary modules.
    if (!this.props.project.loading && !this.state.modelsInitialized) {
      this.initializeModels();
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (!nextProps.project.loading && !this.state.modelsInitialized) {
      this.initializeModels();
    } else {
      // Mark the last chosen event collection in the Query Builder as active here, unless 
      var activeModel = this.getActiveModel();
      var eventCollection = nextProps.model.query.event_collection;
      if (activeModel && eventCollection && activeModel.name !== eventCollection) {
        this.markModelActive(eventCollection);
      }
    }
  },

  render: function() {
    var activeModel = this.getActiveModel();
    var loaderVisible = (activeModel && this.state.activeView === 'recentEvents') ? activeModel.loading : false;
    var previewData = this.getPreviewData[this.state.activeView](activeModel);

    return (
      <Modal ref="modal"
             title="Project Event Collections"
             size="large"
             modalClasses="event-browser-modal"
             footerBtns={[
              { text: 'Close' },
              {
                text: 'Use this Event Collection',
                iconName: 'ok',
                classes: 'btn-primary',
                onClick: this.selectEventCollectionClick
              }
             ]}>
        <div className="event-browser" onKeyUp={this.handleKeyUp}>
          <div className="event-names">
            <div className="search-box">
              <input type="text" name="search" ref="search-box" placeholder="Search..." onChange={this.filterEventNames} />
              <span className="glyphicon glyphicon-search icon"></span>
            </div>
            <ul className="nav nav-pills nav-stacked event-names-list" ref="event-names-list">
              {this.buildEventCollectionNodes()}
            </ul>
          </div>
          <div className="event-browser-content">
            <ul className="nav nav-pills view-options">
              <li className={this.getNavClasses('schema')}>
                <a href="#" name="schema" onClick={this.changeActiveView}>
                  Schema
                </a>
              </li>
              <li className={this.getNavClasses('recentEvents')}>
                <a href="#" name="recentEvents" onClick={this.changeActiveView}>
                  Recent Events
                </a>
              </li>
            </ul>
            <div ref="event-data-wrapper" className="event-data-wrapper">
              <Loader ref="loader" visible={loaderVisible} />
              <textarea className="json-view" value={previewData} readOnly />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
});

module.exports = EventBrowser;
