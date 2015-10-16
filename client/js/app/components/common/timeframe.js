/**
* @jsx React.DOM
*/

var _ = require('lodash');
var moment = require('moment');
var React = require('react/addons');
var AbsolutePicker = require('./absolute_picker.js');
var RelativePicker = require('./relative_picker.js');
var FieldsToggle = require('./fields_toggle.js');
var ReactSelect = require('./react_select.js');
var Timezone = require('./timezone.js');
var ExplorerActions = require('../../actions/ExplorerActions');
var ExplorerUtils = require('../../utils/ExplorerUtils');
var ProjectUtils = require('../../utils/ProjectUtils');

function relativeDefaults() {
  return {
    relativity: 'this',
    amount: '14',
    sub_timeframe: 'days'
  };
}

function absoluteDefaults() {
  return {
    start: new Date(moment().subtract(1, 'days').startOf('day').format()),
    end: new Date(moment().startOf('day').format())
  };
}

var Timeframe = React.createClass({

  toggleTimeframeType: function(event) {
    event.preventDefault();
    var type = event.currentTarget.dataset.type;

    this.props.handleChange({
      timeframe_type: type,
      time: (type === 'absolute') ? absoluteDefaults() : relativeDefaults()
    });
  },

  isAbsolute: function() {
    return this.props.timeframe_type === 'absolute';
  },

  isRelative: function() {
    return this.props.timeframe_type === 'relative';
  },

  // React Methods

  render: function() {
    var timezone = this.props.timezone || ProjectUtils.getConstant('DEFAULT_TIMEZONE');

    if (this.isAbsolute()) {
      var timeframePicker = <AbsolutePicker time={this.props.time}
                            handleChange={this.props.handleChange} />;
    } else {
      var timeframePicker = <RelativePicker relativeIntervalTypes={ProjectUtils.getConstant('RELATIVE_INTERVAL_TYPES')}
                                            time={this.props.time}
                                            handleChange={this.props.handleChange} />;
    }

    return (
      <div className="timeframe">
        <div className="field-component">
          <label>Timeframe</label>
          <ul className="nav nav-pills" role="tablist">
            <li className={this.isRelative() ? 'active' : ''}>
              <a href="#" className="relative-tab" data-type="relative" onClick={this.toggleTimeframeType}>Relative</a>
            </li>
            <li className={this.isAbsolute() ? 'active' : ''}>
              <a href="#" className="absolute-tab" data-type="absolute" onClick={this.toggleTimeframeType}>Absolute</a>
            </li>
          </ul>
          {timeframePicker}
          <Timezone timezone={this.props.timezone} 
                    timeframe_type={this.props.timeframe_type}
                    handleChange={this.props.handleChange} />
        </div>
      </div>
    );
  }
});

module.exports = Timeframe;
