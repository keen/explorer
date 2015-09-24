/**
 * @jsx React.DOM
 */

var React = require('react');
var classNames = require('classnames');

var CacheToggle = React.createClass({

  setCached: function(event) {
    this.setState({
      cached: !this.state.cached,
      settingsOpen: this.state.cached ? false : this.state.settingsOpen
    });
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
    var parentClasses = classNames({
      'cache-toggle': true,
      'inactive': !this.state.cached
    });
    var cacheDetailsClasses = classNames({
      "cache-details": true,
      "hide": !this.state.cached
    });
    var cacheSettingsClasses = classNames({
      "cache-settings": true,
      "hide": !this.state.settingsOpen
    });

    var cacheToggleLabel = this.state.cached ? 'Caching enabled' : 'Enable caching';

    return (
      <div className={parentClasses}>

        <label htmlFor="cache">
          <input type="checkbox" name="cache" id="cache" onChange={this.setCached} />
          {cacheToggleLabel}
        </label>

        <span className={cacheDetailsClasses}>
          Last updated 43 mins ago
          <a href="#" onClick={this.setSettingsOpen} className="margin-left-tiny">
            <span className="icon icon-cog glyphicon-cog glyphicon"></span>
          </a>
        </span>

        <span className={cacheSettingsClasses}>
          Refresh every <input type="text" name="refresh_rate" value={this.state.refresh_rate} className="form-control" onChange={this.setRefreshRate} /> minutes
        </span>



        <div className="row">
          <div className="col-md-5">

          </div>
        </div>
      </div>
    );
  }

});

module.exports = CacheToggle;
