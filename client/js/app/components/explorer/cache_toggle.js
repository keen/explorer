/**
 * @jsx React.DOM
 */

var React = require('react');
var classNames = require('classnames');

var ExplorerActions = require('../../actions/ExplorerActions');
var ReactSelect = require('../common/react_select.js');

var _ = require('lodash');
var timeDivisor = 60 * 60;

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

  setRefreshRate: function(name, selection) {
    var updates = _.clone(this.props.model);
    updates.refresh_rate = parseInt(selection)*timeDivisor;

    ExplorerActions.update(this.props.model.id, updates);
    this.forceUpdate();
  },

  getInitialState: function() {
    return {
      cached: false,
      settingsOpen: false
    };
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
          Refresh every
          <ReactSelect
            ref="select"
            name="refresh_rate"
            items={_.range(4, 25)}
            className="form-control cache-settings-input"
            value={this.props.model.refresh_rate/timeDivisor}
            handleChange={this.setRefreshRate}
          /> hours
        </span>

      </div>
    );
  },

  _isCached: function() {
    return this.props.model.refresh_rate != 0;
  }

});

module.exports = CacheToggle;
