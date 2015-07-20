/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var Datepicker = require('./datepicker.js');
var Timepicker = require('./timepicker.js');

var ExplorerUtils = require('../../utils/ExplorerUtils');
var ExplorerActions = require('../../actions/ExplorerActions');

var dateFormat = 'll';
var timeFormat = 'h:mm A';

var AbsolutePicker = React.createClass({

  setDate: function(name, value) {
    var time = this.props.model.query.time;
    var endValue = new Date(time.end);

    var updates = _.cloneDeep(this.props.model);
    if (name === 'start_date' && value > endValue) {
      updates.query.time.end = '';
    }
    updates.query.time[name] = new Date(moment(new Date(value)).format(dateFormat) + " " + moment(time[name]).format(timeFormat));
    ExplorerActions.update(this.props.model.id, updates);
  },

  handleDateBlur: function (event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setDate(name, value);
  },

  setTime: function(name, value) {
    var time = this.props.model.query.time;
    var updates = _.cloneDeep(this.props.model);
    updates.query.time[name] = new Date(moment(time[name]).format(dateFormat) + " " + moment(new Date(value)).format(timeFormat));
    ExplorerActions.update(this.props.model.id, updates);
  },

  // React methods

  render: function() {
    var time = this.props.model.query.time;

    return (
      <div className="absolute-timeframe-picker">
        <div className="row">
          <div className="col-md-2">
            <label>Start</label>
          </div>
          <div className="col-md-5 form-collapse-right">
            <Datepicker ref="start-date"
                        value={moment(time.start).format(dateFormat)}
                        name="start"
                        placeholder="Date"
                        onBlur={this.handleDateBlur}
                        onSet={this.setDate} />
          </div>
          <div className="col-md-5 form-collapse-left">
            <Timepicker ref="start-time"
                        value={moment(time.start).format(timeFormat)}
                        name="start"
                        placeholder="Time"
                        handleBlur={this.setTime}
                        handleSelection={this.setTime} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <label>End</label>
          </div>
          <div className="col-md-5 form-collapse-right">
            <Datepicker ref="end-date"
                        value={moment(time.end).format(dateFormat)}
                        minimum={moment(time.start).format(dateFormat)}
                        name="end"
                        placeholder="Date"
                        onBlur={this.handleDateBlur}
                        onSet={this.setDate} />
          </div>
          <div className="col-md-5 form-collapse-left">
            <Timepicker ref="end-time"
                        value={moment(time.end).format(timeFormat)}
                        name="end"
                        placeholder="Time"
                        handleBlur={this.setTime}
                        handleSelection={this.setTime} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = AbsolutePicker;
