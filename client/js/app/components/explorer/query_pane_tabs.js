/**
 * @jsx React.DOM
 */

var React = require('react');

var QueryPaneTabs = React.createClass({

  toggled: function(tab) {
    this.props.toggleCallback(tab);
  },

  render: function() {
    return (
      <ul className="query-pane-tabs nav nav-tabs">
        <li role="presentation" className={this.props.activePane === 'build' ? 'active' : ''}>
          <a ref="build-tab" href="#" onClick={this.toggled.bind(this, 'build')}>
            <span className="icon glyphicon glyphicon-tasks margin-right-tiny"></span>
            Build Query
          </a>
        </li>
        <li role="presentation" className={this.props.activePane === 'browse' ? 'active' : ''}>
          <a ref="browse-tab" href="#" onClick={this.toggled.bind(this, 'browse')}>
            <span className="icon glyphicon glyphicon-heart margin-right-tiny fav-icon"></span>
            Browse Favorites
          </a>
        </li>
      </ul>
    );
  }

});

module.exports = QueryPaneTabs;
