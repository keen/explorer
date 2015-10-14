/**
 * @jsx React.DOM
 */

var React = require('react');
var classNames = require('classnames');
var ExplorerActions = require('../../actions/ExplorerActions');
var _ = require('lodash');
var refreshRateMultiplier = 60 * 60;

var CacheToggle = React.createClass({

  setCached: function(event) {
    var updates = _.clone(this.props.model);
    if (this._isCached()) {
      updates.refresh_rate = 0;
    }
    else {
      updates.refresh_rate = 14400;
    }

    ExplorerActions.update(this.props.model.id, updates);
    this.setState({
      settingsOpen: updates.refresh_rate == 0 ? false : this.state.settingsOpen
    });
  },

  setSettingsOpen: function(event) {
    event.preventDefault();
    this.setState({ settingsOpen: !this.state.settingsOpen });
  },

  setRefreshRate: function(event) {
    this.setState({ refresh_rate: event.target.value });
  },

  setRefreshRateBlur: function(event) {
    var refresh_rate = Math.round(event.target.value*refreshRateMultiplier);
    var updates = _.clone(this.props.model);
    updates.refresh_rate = refresh_rate;

    ExplorerActions.update(this.props.model.id, updates);
    this.forceUpdate();
  },

  getInitialState: function() {
    return {
      refresh_rate: this._refreshRateInHours(this.props.model),
      cached: false,
      settingsOpen: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ refresh_rate: this._refreshRateInHours(nextProps.model) });
  },

  render: function() {
    var isCached = this._isCached();
    var parentClasses = classNames({
      'cache-toggle': true,
      'inactive': !isCached
    });
    var cacheDetailsClasses = classNames({
      "cache-details": true,
      "hide": !isCached
    });
    var cacheSettingsClasses = classNames({
      "cache-settings": true,
      "hide": !this.state.settingsOpen
    });

    var cacheToggleLabel = isCached? 'Caching enabled' : 'Enable caching';

    return (
      <div className={parentClasses}>

        <label htmlFor="cache">
          <input type="checkbox" name="cache" id="cache"
            onChange={this.setCached} checked={isCached} />
          {cacheToggleLabel}
        </label>

        <span className={cacheDetailsClasses}>
          Last updated 43 mins ago
          <a href="#" onClick={this.setSettingsOpen} className="margin-left-tiny">
            <span className="icon icon-cog glyphicon-cog glyphicon"></span>
          </a>
        </span>

        <span className={cacheSettingsClasses}>
          Refresh every <input type="text"
            name="refresh_rate"
            value={this.state.refresh_rate}
            className="form-control"
            onChange={this.setRefreshRate}
            onBlur={this.setRefreshRateBlur}
            /> hours (hours must be between 4 and 24).
        </span>
      </div>
    );
  },

  _isCached: function() {
    return this.props.model.refresh_rate != 0;
  },

  _refreshRateInHours: function(model) {
    return (model.refresh_rate/refreshRateMultiplier) * 100 / 100;
  }

});

module.exports = CacheToggle;
