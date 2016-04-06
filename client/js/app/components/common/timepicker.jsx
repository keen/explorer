var _ = require('lodash');
var React = require('react');
var ReactSelect = require('./react_select.jsx');

var premadeTimes = [
  '12:00 AM',
  '12:15 AM',
  '12:30 AM',
  '12:45 AM',
  '01:00 AM',
  '01:15 AM',
  '01:30 AM',
  '01:45 AM',
  '02:00 AM',
  '02:15 AM',
  '02:30 AM',
  '02:45 AM',
  '03:00 AM',
  '03:15 AM',
  '03:30 AM',
  '03:45 AM',
  '04:00 AM',
  '04:15 AM',
  '04:30 AM',
  '04:45 AM',
  '05:00 AM',
  '05:15 AM',
  '05:30 AM',
  '05:45 AM',
  '06:00 AM',
  '06:15 AM',
  '06:30 AM',
  '06:45 AM',
  '07:00 AM',
  '07:15 AM',
  '07:30 AM',
  '07:45 AM',
  '08:00 AM',
  '08:15 AM',
  '08:30 AM',
  '08:45 AM',
  '09:00 AM',
  '09:15 AM',
  '09:30 AM',
  '09:45 AM',
  '10:00 AM',
  '10:15 AM',
  '10:30 AM',
  '10:45 AM',
  '11:00 AM',
  '11:15 AM',
  '11:30 AM',
  '11:45 AM',
  '12:00 PM',
  '12:15 PM',
  '12:30 PM',
  '12:45 PM',
  '01:00 PM',
  '01:15 PM',
  '01:30 PM',
  '01:45 PM',
  '02:00 PM',
  '02:15 PM',
  '02:30 PM',
  '02:45 PM',
  '03:00 PM',
  '03:15 PM',
  '03:30 PM',
  '03:45 PM',
  '04:00 PM',
  '04:15 PM',
  '04:30 PM',
  '04:45 PM',
  '05:00 PM',
  '05:15 PM',
  '05:30 PM',
  '05:45 PM',
  '06:00 PM',
  '06:15 PM',
  '06:30 PM',
  '06:45 PM',
  '07:00 PM',
  '07:15 PM',
  '07:30 PM',
  '07:45 PM',
  '08:00 PM',
  '08:15 PM',
  '08:30 PM',
  '08:45 PM',
  '09:00 PM',
  '09:15 PM',
  '09:30 PM',
  '09:45 PM',
  '10:00 PM',
  '10:15 PM',
  '10:30 PM',
  '10:45 PM',
  '11:00 PM',
  '11:15 PM',
  '11:30 PM',
  '11:45 PM',
];

function parseTime(timeStr, dt) {
  if (!dt) {
    dt = new Date();
  }

  var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
  if (!time) {
    return NaN;
  }
  var hours = parseInt(time[1], 10);
  if (hours == 12 && !time[3]) {
    hours = 0;
  }
  else {
    hours += (hours < 12 && time[3]) ? 12 : 0;
  }

  dt.setHours(hours);
  dt.setMinutes(parseInt(time[2], 10) || 0);
  dt.setSeconds(0, 0);
  return dt;
}

var Timepicker = React.createClass({

  validateTime: function(value) {
    var parsed = parseTime(value);
    if (parsed instanceof Date) {
      this.setState({ errorMsg: false });
      return true;
    } else {
      this.setState({ errorMsg: 'Invalid time' });
      return false;
    }
  },

  handleBlur: function(event) {
    if (this.validateTime(event.target.value)) {
      this.props.handleBlur(event.target.name, parseTime(event.target.value).getTime());
    }
  },

  handleSelection: function(name, selection) {
    if (this.validateTime(selection)) {
      this.props.handleSelection(name, parseTime(selection).getTime());
    }
  },

  handleChange: function(name, value) {
    this.setState({ value: value });
    this.props.handleChange(name, value);
  },

  // React methods

  getInitialState: function() {
    return {
      errorMsg: false,
      value: this.props.value
    };
  },

  getDefaultProps: function () {
    return {
      refValue: 'timepicker',
      label: false,
      handleBlur: function(){},
      handleChange: function(){},
      handleSelection: function(){},
      placeholder: '',
      classes: 'timepicker-wrapper form-group'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value != this.state.value) {
      this.setState({ value: nextProps.value });
    }
  },

  render: function() {
    var label = this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : null;
    var errorMsg = this.state.errorMsg ? <p>{this.state.errorMsg}</p> : null;

    return (
      <div className={this.props.classes}>
        {label}
        <ReactSelect ref={this.props.refValue}
                     name={this.props.name}
                     inputClasses="form-control"
                     items={premadeTimes}
                     handleBlur={this.handleBlur}
                     handleChange={this.handleChange}
                     handleSelection={this.handleSelection}
                     value={this.state.value}
                     title={this.props.name}
                     sort={true} />
        {errorMsg}
      </div>
    );
  }
});

module.exports = Timepicker;