/**
 * @jsx React.DOM
 */

var React = require('react');
var classNames = require('classnames');

var CacheToggle = React.createClass({

  setCached: function(event) {
    this.setState({ cached: !this.state.cached });
  },

  setSettingsOpen: function(event) {
    event.preventDefault();
    this.setState({ settingsOpen: !this.state.settingsOpen });
  },

  setRefreshRate: function(event) {
    this.setState({ refresh_rate: event.target.value });
  },

  getInitialState: function() {
    return {
      cached: false,
      settingsOpen: false,
      refresh_rate: 90
    };
  },

  render: function() {
    var cacheDetailsClasses = classNames({
      "cache-details pull-left margin-right-small": true,
      "hide": !this.state.cached
    });
    var cacheSettingsClasses = classNames({
      "cache-settings pull-left": true,
      "hide": !this.state.settingsOpen
    });

    return (
      <div className="cache-toggle clearfix">
        <label htmlFor="cache" className="pull-left margin-right-small">
          Caching enabled
          <input type="checkbox" name="cache" onChange={this.setCached} />
        </label>
        <div className={cacheDetailsClasses}>
          <p>Last updated 43 mins ago</p>
          <a href="#" onClick={this.setSettingsOpen}>
            <span className="icon icon-cog glyphicon-cog glyphicon"></span>
          </a>
          <div className={cacheSettingsClasses}>
            Refresh every <input type="text" name="refresh_rate" value={this.state.refresh_rate} onChange={this.setRefreshRate} /> minutes
          </div>
        </div>
      </div>
    );
  }

});

module.exports = CacheToggle;