/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
var request = require('superagent');
var classNames = require('classnames');
var DataGrid = require('react-datagrid');

var FormatUtils = require('../../utils/FormatUtils');
var Loader = require('./loader');
var Modal = require('./modal');
var Notice = require('./notice');
var ProjectActions = require('../../actions/ProjectActions');
var ProjectUtils = require('../../utils/ProjectUtils');

var EventBrowser = React.createClass({

  onKeyUp: function(event) {
    var enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) this.selectEventCollection();
  },

  deleteProperty: function(propertyName, eventCollection, event) {
    var _this = this;
    var confirmDeleteMessage = "Are you sure you want to delete all values for " +
      propertyName + " from " +
      eventCollection + "? This operation may take a while and is not reversible.";

      if(confirm(confirmDeleteMessage)) {
        var client = this.props.client;
        var url = client.config.protocol +
          "://" + client.config.host +
          "/projects/" + client.config.projectId +
          "/events/" + eventCollection +
          "/properties/" + propertyName +
          "?api_key=" + client.config.masterKey;
        var req = request("DELETE", url);

        req.end(function(err, res) {
          if (err) {
            _this.setState({ eventNotice: { text: res.body.message, type: 'error' } });
          } else {
            _this.setState({ eventNotice: { text: "Successfully deleted values for " + propertyName } });
          }
        });
      }
  },

  closeNotice: function() {
    this.setState({ eventNotice: undefined });
  },

  selectEventCollectionClick: function(event) {
    event.preventDefault();
    this.props.selectEventCollection(this.state.activeEventCollection);
  },

  setActiveEventCollectionClick: function(event) {
    this.setActiveEventCollection(event.target.innerText);
  },

  setActiveEventCollection: function(collection) {
    if (collection === this.state.activeEventCollection) return;
    this.setState({ activeEventCollection: collection });
    if (this.state.activeView === 'recentEvents') this.fetchRecentEvents(collection);
  },

  modalOpened: function() {
    if (this.state.activeView === 'recentEvents') this.fetchRecentEvents();
  },

  fetchRecentEvents: function(collectionToUse) {
    var collection = collectionToUse ? collectionToUse : this.state.activeEventCollection;
    var schema = this.props.project.schema;
    if (!_.isEmpty(schema) && !schema[collection].recentEvents && !schema[collection].loading) {
      ProjectActions.fetchRecentEventsForCollection(this.props.client, collection);
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
    var recentEventsText = recentEvents ? FormatUtils.prettyPrintJSON(recentEvents) : "";

    return <textarea className="json-view" value={recentEventsText} readOnly />
  },

  getSchema: function() {
    var project = this.props.project;
    var eventCollection = this.state.activeEventCollection;
    var properties = project.schema[eventCollection] ? project.schema[eventCollection].properties : {};
    var _this = this;

    var rows = Object.keys(properties).map(function(propertyName) {
      return { property: propertyName, type: properties[propertyName] };
    });
    var columns = [ { name: "property" }, { name: "type" } ]

    return <DataGrid idProperty="property" dataSource={rows} columns={columns} />;
  },

  changeActiveView: function(event) {
    event.preventDefault();
    var tabName = event.target.name;
    this.setState({ activeView: tabName });
    if (tabName === 'recentEvents') this.fetchRecentEvents();
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
      this.setActiveEventCollection(this.props.currentEventCollection || this.props.project.eventCollections[0]);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (!_.isEmpty(nextProps.project.schema) && !this.state.activeEventCollection) {
      this.setState({ activeEventCollection: nextProps.project.eventCollections[0] });
    }
    if (nextProps.currentEventCollection && nextProps.currentEventCollection != this.props.currentEventCollection) {
      this.setState({ activeEventCollection: nextProps.currentEventCollection });
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
             onOpen={this.modalOpened}
             footerBtns={[
              { text: 'Close' },
              {
                text: 'Use this Event Collection',
                iconName: 'ok',
                classes: 'btn-primary',
                onClick: this.selectEventCollectionClick
              }
             ]}>
        <Notice notice={this.state.eventNotice} closeCallback={this.closeNotice} />
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
            <ul className="nav nav-tabs view-options">
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
              {previewData}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
});

module.exports = EventBrowser;
