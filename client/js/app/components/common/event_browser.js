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

  selectEventCollectionClick: function(event) {
    event.preventDefault();
    this.props.selectEventCollection(this.state.activeEventCollection);
  },

  setActiveEventCollectionClick: function(event) {
    this.setActiveEventCollection(event.target.innerText);
  },

  setActiveEventCollection: function(collection, props) {
    var props = props || this.props;
    this.setState({ activeEventCollection: collection });
    if (!props.project.schema[collection].recentEvents && !props.project.schema[collection].loading) {
      ProjectActions.fetchRecentEventsForCollection(props.client, collection);
    }
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
          <a href="#" onClick={this.setActiveEventCollectionClick}>{eventCollection}</a>
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

  componentDidMount: function() {
    if (!this.state.activeEventCollection && !_.isEmpty(this.props.project.schema)) {
      this.setActiveEventCollection(this.props.project.eventCollections[0]);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (!_.isEmpty(nextProps.project.schema)) {
      if (nextProps.currentEventCollection !== this.props.currentEventCollection && nextProps.currentEventCollection !== null) {
        this.setActiveEventCollection(nextProps.currentEventCollection, nextProps);
      } else if (!this.state.activeEventCollection) {
        this.setActiveEventCollection(nextProps.project.eventCollections[0], nextProps);
      }
    }
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
