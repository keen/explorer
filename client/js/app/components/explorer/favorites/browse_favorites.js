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

var BrowseFavorites = React.createClass({

  removeClick: function(event) {
    event.preventDefault();
    this.props.removeCallback(event.currentTarget.dataset.itemIndex);
  },

  clickCallback: function(event) {
    if (event.target.getAttribute('role') !== 'remove' && event.target.parentNode.getAttribute('role') !== 'remove') {
      this.props.clickCallback(event);
    }
  },

  buildFavList: function() {
    var listElements = this.props.listItems.map(_.bind(function(listItem, index) {
      listItem.user = listItem.user || {};
      if (String(listItem.name.toLowerCase()).search(this.state.searchterm.toLowerCase()) < 0) return;

      if (this.state.favgroup === 'user') {
        if (!listItem.user.id || listItem.user.id !== this.props.user.id) return;
      }

      var isSelected = (this.props.selectedIndex === index) ? true : false;
      var classes,
          removeBtn;
      if (isSelected) classes = 'active';
      if (this.props.removeCallback && listItem.user.id === this.props.user.id) {
        removeBtn = (<a href="#" className="remove-btn" data-item-index={index} role="remove" onClick={this.removeClick}>
                      <span className="icon glyphicon glyphicon-remove-circle"></span>
                     </a>);
      }

      var createdAt;
      var datetime = dateForItem(listItem);
      if (datetime) {
        createdAt = (
          <p className="date">
            <span className="icon glyphicon glyphicon-time margin-right-tiny"></span>
            {datetime}
          </p>
        );
      }

      return (
        <li className={classes} key={index} data-id={listItem.id} onClick={this.clickCallback}>
          {removeBtn}
          <h5 className="name">{listItem.name}</h5>
          <div className="metadata">
            <div className="row">
              <div className="col-md-4">
                <p className="author">
                  <span className="icon glyphicon glyphicon-user margin-right-tiny"></span>
                  {nameForUser(listItem.user)}
                </p>
              </div>
              <div className="col-md-8">
                {createdAt}
              </div>
            </div>
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
      favListNotice: null,
      emptyContent: null
    };
  },

  getInitialState: function() {
    return {
      searchterm: '',
      favgroup: 'all'
    };
  },

  render: function() {
    var emptyContent = this.props.listItems.length ? null: this.props.emptyContent;
    var listItems = this.buildFavList();

    return (
      <section className="browse-favorites">
        {this.props.notice}
        <div className="fav-group-options">
          <div className="radio-inline">
            <label>
              <input type="radio" name="favgroup" value="all" ref="all-filter" checked={this.state.favgroup === 'all' ? true : false} onChange={this.fieldChanged} />
              {"My whole team's"}
            </label>
          </div>
          <div className="radio-inline">
            <label>
              <input type="radio" name="favgroup" value="user" ref="user-filter" checked={this.state.favgroup === 'user' ? true : false} onChange={this.fieldChanged} />
              Only mine
            </label>
          </div>
        </div>
        <div className="search-box">
          <input type="text" name="searchterm" ref="searchbox" placeholder="Search fav names..." onChange={this.fieldChanged} />
          <span className="glyphicon glyphicon-search icon"></span>
        </div>
        {listItems}
        {emptyContent}
      </section>
    );
  }

});

module.exports = BrowseFavorites;
