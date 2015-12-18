/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
var moment = require('moment');

function dateForItem(item) {
  if (item.created_date) {
    var datetime = moment(new Date(item.created_date.replace(' ', 'T')));
    return datetime.isValid() ? datetime.format('ll h:mm A') : null;
  }
}

var BrowseQueries = React.createClass({

  clickCallback: function(event) {
    this.props.clickCallback(event);
  },

  buildList: function() {
    var listElements = this.props.listItems.map(_.bind(function(listItem, index) {
      var isSelected = (this.props.selectedIndex === index) ? true : false;
      var classes;
      if (isSelected) classes = 'active';
      var createdAt;
      var datetime = dateForItem(listItem);
      if (datetime) {
        createdAt = (
          <p className="date pull-right">
            <span className="icon glyphicon glyphicon-time"></span>
            {datetime}
          </p>
        );
      }
      var isCachedText = listItem.refresh_rate > 0 ? 'Cached' : '';

      return (
        <li className={classes} key={index} data-id={listItem.id} onClick={this.clickCallback}>
          <h5 className="name">{listItem.metadata.display_name}</h5>
          <div className="metadata clearfix">
            <p className="date pull-left">{isCachedText}</p>
            {createdAt}
          </div>
        </li>
      );
    }, this));
    return (
      <ul ref="list" className="interactive-list">
        {listElements}
      </ul>
    );
  },

  fieldChanged: function(event) {
    var newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  },

  getDefaultProps: function() {
    return {
      listItems: [],
      clickCallback: null,
      selectedIndex: null,
      notice: null,
      emptyContent: null
    };
  },

  render: function() {
    var emptyContent = this.props.listItems.length ? null: this.props.emptyContent;
    var listItems = this.buildList();

    return (
      <section className="query-pane-section browse-queries">
        {this.props.notice}
        {listItems}
        {emptyContent}
      </section>
    );
  }

});

module.exports = BrowseQueries;
