/**
 * @jsx React.DOM
 */

var React = require('react');
var classNames = require('classnames');

var QueryPaneTabs = React.createClass({

  toggled: function(tab) {
    this.props.toggleCallback(tab);
  },

  render: function() {
    var btnNewQuery;
    var queryPaneClasses = classNames({
      'query-pane-tabs clearfix': true,
      'query-pane-persisted': this.props.persisted,
      'query-pane-new': !this.props.persisted
    });

    if (this.props.persisted) {
      btnNewQuery = <li role="presentation" className="tab-new-query">
        <a ref="new-query" href="#"
           title="Create a new query"
           onClick={this.props.createNewQuery}>
          <span className="icon glyphicon icon-plus glyphicon-plus"></span>
        </a>
      </li>;
    }

    return (
      <div className={queryPaneClasses}>
        <ul className="nav nav-tabs">
          {btnNewQuery}
          <li role="presentation" className={this.props.activePane === 'build' ? 'tab-build-query active' : 'tab-build-query'}>
            <a ref="build-tab" href="#"
               id="build-query"
               title={this.props.persisted ? "Edit query" : "Create a new query"}
               onClick={this.toggled.bind(this, 'build')}>
              {this.props.persisted ? "Edit query" : "Create a new query"}
            </a>
          </li>
          <li role="presentation" className={this.props.activePane === 'browse' ? 'tab-browse-queries active' : 'tab-browse-queries'}>
            <a ref="browse-tab" href="#"
               id="browse"
               title="Browse saved queries"
               onClick={this.toggled.bind(this, 'browse')}>
              <span className="icon glyphicon icon-th-list glyphicon-th-list"></span>
              Browse
            </a>
          </li>
        </ul>
      </div>
    );
  }

});

module.exports = QueryPaneTabs;
