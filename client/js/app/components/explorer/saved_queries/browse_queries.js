/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
var moment = require('moment');

function nameForUser(user) {
  if (user.first_name && user.last_name) {
    return user.first_name + " " + user.last_name;
  } else {
    return user.email;
  }
}

function dateForItem(item) {
  if (item.created_at) {
    var datetime = moment(new Date(item.created_at.replace(' ', 'T')));
    return datetime.isValid() ? datetime.format('ll h:mm A') : null;
  }
}

var BrowseQueries = React.createClass({

  removeClick: function(event) {
    event.preventDefault();
    this.props.removeCallback(event.currentTarget.dataset.itemIndex);
  },

  clickCallback: function(event) {
    if (event.target.getAttribute('role') !== 'remove' && event.target.parentNode.getAttribute('role') !== 'remove') {
      this.props.clickCallback(event);
    }
  },

  buildList: function() {
    var listElements = this.props.listItems.map(_.bind(function(listItem, index) {
      listItem.user = listItem.user || {};
      if (String(listItem.name.toLowerCase()).search(this.state.searchterm.toLowerCase()) < 0) return;

      if (this.state.filterType === 'user') {
        if (!listItem.user.id || listItem.user.id !== this.props.user.id) return;
      }

      var isSelected = (this.props.selectedIndex === index) ? true : false;
      var classes,
          removeBtn;
      if (isSelected) classes = 'active';
      if (this.props.removeCallback && listItem.user.id === this.props.user.id) {
        removeBtn = (<a href="#" className="remove-btn" data-item-index={index} role="remove" onClick={this.removeClick}>
                      <span className="icon"></span>
                     </a>);
      }

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

      return (
        <li className={classes} key={index} data-id={listItem.id} onClick={this.clickCallback}>
          {removeBtn}
          <h5 className="name">{listItem.name}</h5>
          <div className="metadata clearfix">
            <p className="author pull-left">
              <span className="icon glyphicon glyphicon-user"></span>
              {nameForUser(listItem.user)}
            </p>
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
      removeCallback: null,
      clickCallback: null,
      selectedIndex: null,
      notice: null,
      emptyContent: null
    };
  },

  getInitialState: function() {
    return {
      searchterm: '',
      filterType: 'all'
    };
  },

  render: function() {
    var emptyContent = this.props.listItems.length ? null: this.props.emptyContent;
    var listItems = this.buildList();

    return (
      <section className="query-pane-section browse-queries">
        {this.props.notice}
        <div className="queries-group-options">
          <div className="radio-inline">
            <label>
              <input type="radio" name="filterType" value="all" ref="all-filter" checked={this.state.filterType === 'all' ? true : false} onChange={this.fieldChanged} />
              {"Team"}
            </label>
          </div>
          <div className="radio-inline">
            <label>
              <input type="radio" name="filterType" value="user" ref="user-filter" checked={this.state.filterType === 'user' ? true : false} onChange={this.fieldChanged} />
              {"Mine"}
            </label>
          </div>
        </div>
        <div className="search-box">
          <input type="text" name="searchterm" ref="searchbox" placeholder="Search" onChange={this.fieldChanged} />
          <span className="glyphicon glyphicon-search icon"></span>
        </div>
        {listItems}
        {emptyContent}
      </section>
    );
  }

});

module.exports = BrowseQueries;
