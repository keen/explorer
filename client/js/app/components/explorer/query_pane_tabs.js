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
      <div className="query-pane-tabs clearfix">
        <a ref="new-query" className="new-query btn btn-primary pull-left" href="#" onClick={this.props.createNewQuery}>
          &#43; New
        </a>
        <ul className="nav nav-tabs pull-left">
          <li role="presentation" className={this.props.activePane === 'build' ? 'active' : ''}>
            <a ref="build-tab" href="#" id="build-query" onClick={this.toggled.bind(this, 'build')}>
              {this.props.persisted ? "Edit Query" : "Build query"}
            </a>
          </li>
          <li role="presentation" className={this.props.activePane === 'browse' ? 'active' : ''}>
            <a ref="browse-tab" href="#" id="browse-favs" onClick={this.toggled.bind(this, 'browse')}>
              Browse
            </a>
          </li>
        </ul>
      </div>
    );
  }

});

module.exports = QueryPaneTabs;
