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
var ProjectActions = require('../../actions/ProjectActions');
var Modal = require('./modal.js');

var EventBrowser = React.createClass({

  onKeyUp: function(e) {
    if (e.keyCode == 13) { // enter key code
      this.selectEventCollection();
    }
  },

  setActiveEventCollection: function(event) {
    var collection = event.target.innerText;
    this.setState({ activeEventCollection: collection });
    if (!this.props.project.schema[collection].recentEvents) {
      ProjectActions.fetchRecentEventsForCollection(this.props.client, collection);
    }
  },

  selectEventCollectionClick: function(event) {
    event.preventDefault();
    this.selectEventCollection();
  },

  selectEventCollection: function() {
    var updates = _.cloneDeep(this.props.model.query);
    updates.event_collection = this.activeEventCollection;
    ExplorerActions.update(this.props.model.id, { query: updates });
    this.refs['event-browser-modal'].close();
  },

  showEventData: function(event) {
    event.preventDefault();
    this.markModelActive(event.target.innerText);
  },

  setSearchText: function(event) {
    this.setState({ searchtext: event.target.value });
  },

  // Builders

  buildEventCollectionNodes: function() {
    return _.map(this.props.project.eventCollections, _.bind(function(eventCollection) {
      var re = new RegExp(this.state.searchtext, 'i');
      var classes = classNames({
        'active': this.state.activeEventCollection === eventCollection,
        'hide':  re.test(eventCollection) ? false : true
      });

      return (
        <li className={classes} key={eventCollection}>
          <a href="#" onClick={this.setActiveEventCollection}>{eventCollection}</a>
        </li>
      );
    }, this));
  },

  // Convenience functions

  getNavClasses: function(name) {
    return (this.state.activeView === name) ? 'active' : '';
  },

  shouldShowLoader: function() {
    return (this.state.activeView === 'recentEvents' && this.props.project.schema[this.state.activeEventCollection].loading);
  },

  getRecentEvents: function() {
    var recentEvents = this.props.project.schema[this.state.activeEventCollection].recentEvents;
    return recentEvents ? FormatUtils.prettyPrintJSON(recentEvents) : "";
  },

  getSchema: function() {
    return FormatUtils.prettyPrintJSON(ProjectUtils.getEventCollectionProperties(this.props.project, this.state.activeEventCollection)) || "";
  },

  changeActiveView: function(event) {
    event.preventDefault();
    this.setState({ activeView: event.target.name });
  },

  // Lifecycle hooks

  getInitialState: function() {
    return {
      activeView: 'schema',
      activeEventCollection: null,
      searchtext: ''
    }
  },

  componentWillReceiveProps: function(nextProps) {
    // Mark the last chosen event collection in the Query Builder as active here, unless 
    // this.setState({ activeEventCollection: nextProps.currentEventCollection });
  },

  render: function() {
    var previewData;
    if (this.state.activeView === 'recentEvents') {
      previewData = this.getRecentEvents();
    } else {
      previewData = this.getSchema();
    }

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
              <input type="text" name="search" ref="search-box" placeholder="Search..." onChange={this.setSearchText} />
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
              <Loader ref="loader" visible={this.shouldShowLoader()} />
              <textarea className="json-view" value={previewData} readOnly />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
});

module.exports = EventBrowser;
