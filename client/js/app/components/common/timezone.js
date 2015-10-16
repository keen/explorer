/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');
var ReactSelect = require('./react_select.js');
var ProjectUtils = require('../../utils/ProjectUtils');
var ExplorerActions = require('../../actions/ExplorerActions');

var Timezone = React.createClass({

  handleTimezoneBlur: function() {
    this.setState({ active: false });
    this.refs['timezone-display'].getDOMNode().focus();
  },

  handleTimezoneActivated: function(){
    var self = this;
    this.setState({ active: true });
    setTimeout(function(){
      self.refs['timezone'].refs['input'].getDOMNode().focus();
      self.refs['timezone'].setState({ visible: true });
    }, 100);
  },

  handleTimezoneChange: function(name, value) {
    var timezones = ProjectUtils.getConstant('TIMEZONES');
    var timezone = _.find(timezones, { name: value }) || _.find(timezones, { value: value });
    value = timezone ? timezone.value : value;
    
    this.props.handleChange('timezone', value);
  },

  // React methods

  getInitialState: function(){
    return { active: false };
  },

  componentDidMount: function() {
    if (!this.props.timezone) {
      this.props.handleChange('timezone', ProjectUtils.getConstant('DEFAULT_TIMEZONE'));
    }
    this.refs['timezone'].setState({ visible: false });
  },

  render: function(){
    var timezone = this.props.timezone;
    var zones;
    if (this.props.timeframe_type === 'relative') {
      zones = _.map(ProjectUtils.getConstant('TIMEZONES'), function(item) {
        return item.value;
      });
    } else {
      zones = ProjectUtils.getConstant('TIMEZONE_NAMES');
    }

    return (
      <div className={"timezone-toggle" + (this.state.active ? " active" : "")}>
        <div className="toggle-display">
          <button ref="timezone-display"
                  className="btn btn-link field-secondary-control"
                  title={"Selectd timezone: " + timezone}
                  type="button"
                  onClick={this.handleTimezoneActivated}>
            <span className="icon glyphicon glyphicon-globe"></span> Timezone: {timezone}
          </button>
        </div>
        <div className="toggle-options">
          <ReactSelect ref="timezone"
                       name="timezone"
                       classes="timezone form-control"
                       value={this.props.timezone}
                       items={zones}
                       handleChange={this.handleTimezoneChange}
                       handleBlur={this.handleTimezoneBlur} />
        </div>
      </div>
    );
  }

});

module.exports = Timezone;
