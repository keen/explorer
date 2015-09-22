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

    return (
      <div className={parentClasses}>
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="cache" className="margin-right-small">
              Caching enabled
              <input type="checkbox" name="cache" onChange={this.setCached} />
            </label>    
          </div>
          <div className="col-md-3">
            <div className={cacheDetailsClasses}>
              <p>
                Last updated 43 mins ago
                <a href="#" onClick={this.setSettingsOpen} className="margin-left-tiny">
                  <span className="icon icon-cog glyphicon-cog glyphicon"></span>
                </a>
              </p>
            </div>
          </div>
          <div className="col-md-5">
            <div className={cacheSettingsClasses}>
              <p>
                Refresh every <input type="text" name="refresh_rate" value={this.state.refresh_rate} className="form-control" onChange={this.setRefreshRate} /> minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = CacheToggle;