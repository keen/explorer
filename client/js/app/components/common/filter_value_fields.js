/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var Select = require('./select.js');
var React = require('react');
var Datepicker = require('./datepicker.js');
var Timepicker = require('./timepicker.js');
var Geo = require('./geo.js');
var moment = require('moment');
var ProjectUtils = require('../../utils/ProjectUtils');
var FILTER_OPERATORS = ProjectUtils.getConstant('FILTER_OPERATORS');
var getPropertyType = ProjectUtils.getPropertyType;
var ExplorerActions = require('../../actions/ExplorerActions');
var FormatUtils = require('../../utils/FormatUtils');
var FilterUtils = require('../../utils/FilterUtils');

var dateFormat = 'll';
var timeFormat = 'h:mm A';

function coerceGeoValue(value) {
  var trailingDecimals = value.match(/\.+$/);
  if (value === '-' || (trailingDecimals && trailingDecimals.length)) {
    return value;
  } else {
    return parseFloat(value) || 0;
  }
}

var FilterValueFields = React.createClass({

  handleGeoSelection: function(event) {
    var name = event.target.name;
    var value = event.target.value;

    var updates = _.cloneDeep(this.props.filter);
    if (!_.isNull(name.match('coordinates'))) {
      updates.property_value.coordinates[parseInt(name.substr(name.length - 1))] = coerceGeoValue(value);
    } else {
      updates.property_value[name] = coerceGeoValue(value);
    }
    ExplorerActions.updateFilter(this.props.model.id, this.props.index, updates)
  },

  onChange: function(event) {
    var name = event.target.name;
    var value = event.target.value;
    var updates = {};
    updates[name] = value;
    this.setState(updates);
  },

  setDate: function(name, value) {
    var updates = _.cloneDeep(this.props.filter);
    updates.property_value = new Date(moment(new Date(value)).format(dateFormat) + " " + moment(this.props.filter.property_value).format(timeFormat));
    ExplorerActions.updateFilter(this.props.model.id, this.props.index, updates);
  },

  setTime: function(name, value) {
    var updates = _.cloneDeep(this.props.filter);
    updates.property_value = new Date(moment(this.props.filter.property_value).format(dateFormat) + " " + moment(new Date(value)).format(timeFormat));
    ExplorerActions.updateFilter(this.props.model.id, this.props.index, updates);
  },

  handleDateBlur: function (event) {
    var name = event.target.name;
    var value = event.target.value;
    // console.log('name is: ' + name);
    // console.log('value is: ' + value);
    this.setDate(name, value);
  },

  updateFilter: function(event) {
    var name = event.target.name;
    var value = event.target.value;
    var updates = _.cloneDeep(this.props.filter);
    updates[name] = value;
    ExplorerActions.updateFilter(this.props.model.id, this.props.index, updates);
  },

  getCoercionOptions: function() {
    var operator = this.props.filter.operator;
    return operator ? _.find(FILTER_OPERATORS, { value: operator }).canBeCoeredTo : [];
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

    var propertyType = getPropertyType(
      this.props.project,
      this.props.model.query.event_collection,
      this.props.filter.property_name
    );

    if (propertyType === 'geo' || this.props.filter.operator === 'within') {
      valueInput = <Geo handleGeoSelection={this.handleGeoSelection} filter={this.props.filter}/>;
    } else if (this.props.filter.operator === 'exists' || this.props.filter.coercion_type === 'Boolean') {
      valueInput = (
        <Select name="property_value"
                classes="property-value"
                ref="boolean-value-set"
                options={['true', 'false']}
                handleBlur={this.updateFilter}
                handleSelection={this.onChange}
                selectedOption={FormatUtils.booleanMap(this.state.property_value) || 'true'}
                emptyOption={false} />
      );
    } else if (this.props.filter.coercion_type === 'Datetime') {
      valueInput = (
        <div className="row property-value">
          <div className="col-md-6 form-collapse-right">
            <Datepicker ref="date-value-input"
                        value={moment(this.state.property_value).format(dateFormat)}
                        label={false}
                        name="property_value"
                        placeholder="Date"
                        classes="datepicker-wrapper"
                        onSet={this.setDate}
                        onBlur={this.handleDateBlur} />
          </div>
          <div className="col-md-6 form-collapse-left">
            <Timepicker ref="time-value-input"
                        value={moment(this.state.property_value).format(timeFormat)}
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
               onChange={this.onChange}
               onBlur={this.updateFilter}
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
                  handleSelection={this.updateFilter}
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
