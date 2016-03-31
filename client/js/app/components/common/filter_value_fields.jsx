var _ = require('lodash');
var moment = require('moment');
var React = require('react');
var Select = require('./select.jsx');
var Datepicker = require('./datepicker.jsx');
var Timepicker = require('./timepicker.jsx');
var Geo = require('./geo.jsx');
var FormatUtils = require('../../utils/FormatUtils');
var FilterUtils = require('../../utils/FilterUtils');

var dateFormat = 'll';
var timeFormat = 'h:mm A';

function pasrseIntoDate(dateString, timeString) {
  var date = moment(new Date(dateString)).format(dateFormat);
  var time = moment(new Date(timeString)).format(timeFormat);
  return new Date(date + " " + time).toString();
}

var FilterValueFields = React.createClass({

  handleChangeWithEvent: function(event) {
    this.props.handleChange(event.target.name, event.target.value);
  },

  setValueState: function(event) {
    var updates = {};
    updates[event.target.name] = event.target.value;
    this.setState(updates);
  },

  setDate: function(name, value) {
    this.props.handleChange(name, pasrseIntoDate(value, this.props.filter.property_value));
  },

  setTime: function(name, value) {
    this.props.handleChange(name, pasrseIntoDate(this.props.filter.property_value, value));
  },

  handleDateBlur: function (event) {
    this.setDate(event.target.name, event.target.value);
  },

  handleChange: function(event) {
    this.props.handleChange(event.target.name, event.target.value);
  },

  getCoercionOptions: function() {
    var operator = this.props.filter.operator;
    return operator ? _.find(this.props.filterOperators, { value: operator }).canBeCoeredTo : [];
  },

  getInputPlaceholder: function() {
    var type = this.props.filter.coercion_type;
    return type === 'List' ? 'Comma sep list' : type;
  },

  // React methods

  getInitialState: function() {
    return {
      property_value: this.props.filter.property_value
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({ property_value: newProps.filter.property_value });
  },

  render: function() {
    var valueInput;
    if (this.propertyType === 'geo' || this.props.filter.operator === 'within') {
      valueInput = (
        <Geo handleChange={this.handleChangeWithEvent}
             filter={this.props.filter}/>
      );
    } else if (this.props.filter.operator === 'exists' || this.props.filter.coercion_type === 'Boolean') {
      valueInput = (
        <Select name="property_value"
                classes="property-value"
                ref="boolean-value-set"
                options={['true', 'false']}
                handleBlur={this.handleChangeWithEvent}
                handleSelection={this.setValueState}
                selectedOption={FormatUtils.booleanMap(this.state.property_value) || 'true'}
                emptyOption={false} />
      );
    } else if (this.props.filter.coercion_type === 'Datetime') {
      valueInput = (
        <div className="row property-value">
          <div className="col-md-6 form-collapse-right">
            <Datepicker ref="date-value-input"
                        value={moment(new Date(this.state.property_value)).format(dateFormat)}
                        label={false}
                        name="property_value"
                        placeholder="Date"
                        classes="datepicker-wrapper"
                        onSet={this.setDate}
                        onBlur={this.handleDateBlur} />
          </div>
          <div className="col-md-6 form-collapse-left">
            <Timepicker ref="time-value-input"
                        value={moment(new Date(this.state.property_value)).format(timeFormat)}
                        label={false}
                        name="property_value"
                        placeholder="Time"
                        classes="timepicker-wrapper"
                        handleSelection={this.setTime}
                        handleBlur={this.setTime} />
          </div>
        </div>
      );
    } else {
      valueInput = (
        <input type="text"
               ref="value-input"
               name="property_value"
               className="form-control property-value"
               value={this.state.property_value}
               onChange={this.setValueState}
               onBlur={this.handleChangeWithEvent}
               placeholder={this.getInputPlaceholder()}
               readOnly={this.props.filter.coercion_type === 'Null'}/>
      );
    }

    return (
      <div className="row">
        <div className="col-md-3 form-collapse-right">
          <Select label={false}
                  ref="type-set"
                  name="coercion_type"
                  classes="coercion-type"
                  sort={false}
                  options={this.getCoercionOptions()}
                  handleSelection={this.handleChangeWithEvent}
                  selectedOption={this.props.filter.coercion_type}
                  emptyOption={false} />
        </div>
        <div className="col-md-9 form-collapse-left">
          {valueInput}
        </div>
      </div>
    );
  }
});

module.exports = FilterValueFields;
