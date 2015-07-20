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

  updateFilter: function(event) {
    var name = event.target.name;
    var value = event.target.value;

    if (name === 'property_value_date') {
      value = moment(new Date(value)).format('ll');
    }
    if (name === 'property_value_time') {
      var formattedDateAndTime = moment(new Date(moment().format('ll') + ' ' + value));
      value = formattedDateAndTime.format('h:mm A');
    }
    
    var updates = {};
    updates[name] = value;
    attrs = _.assign({}, this.props.model.query.filters[this.props.index], updates);
    ExplorerActions.updateFilter(this.props.model.id, this.props.index, updates);
  },

  buildValueInput: function() {
    var filter = this.props.filter;
    
    var propertyType = getPropertyType(
      this.props.project,
      this.props.model.query.event_collection,
      filter.property_name
    );

    if (propertyType === 'geo' || filter.operator === 'within') {
      return this.geoInput();
    } else if (filter.operator === 'exists' || filter.coercion_type === 'Boolean') {
      return this.booleanInput();
    } else if (filter.coercion_type === 'Datetime') {
      return this.datetimeInput();
    } else {
      return null;
    }
  },

  geoInput: function() {
    return <Geo handleGeoSelection={this.handleGeoSelection} filter={this.props.filter}/>
  },

  getCoercionOptions: function() {
    if (this.props.filter.operator) {
      return _.find(FILTER_OPERATORS, { value: this.props.filter.operator }).canBeCoeredTo;
    } else {
      return [];
    }
  },

  defaultInput: function() {
    var isReadonly = (this.props.filter.coercion_type === 'Null');

    return (
      <input type="text"
             ref="value-input"
             name="property_value"
             className="form-control property-value"
             value={this.state.property_value}
             onChange={this.onChange}
             onBlur={this.updateFilter}
             placeholder={this.getInputPlaceholder()}
             readOnly={isReadonly}/>
    )
  },

  datetimeInput: function() {
    return (
      <div className="row property-value">
        <div className="col-md-6 form-collapse-right">
          <Datepicker ref="value-input"
                      value={this.state.property_value_date}
                      label={false}
                      name="property_value_date"
                      placeholder="Date"
                      classes="datepicker-wrapper"
                      onChange={this.onChange}
                      onBlur={this.updateFilter} />
        </div>
        <div className="col-md-6 form-collapse-left">
          <Timepicker value={this.state.property_value_time}
                      label={false}
                      name="property_value_time"
                      placeholder="Time"
                      classes="timepicker-wrapper"
                      onChange={this.onChange}
                      onBlur={this.updateFilter} />
        </div>
      </div>
    );
  },

  booleanInput: function() {
    var selectedOption = FormatUtils.booleanMap(this.state.property_value);

    return  (
      <Select name="property_value"
              classes="property-value"
              ref="boolean-value-set"
              options={['true', 'false']}
              handleBlur={this.updateFilter}
              handleSelection={this.onChange}
              selectedOption={selectedOption || 'true'}
              emptyOption={false} />);
  },

  getInputPlaceholder: function() {
    var type = this.props.filter.coercion_type;

    if (type === 'List') {
      return 'Comma sep list';
    } else {
      return type;
    }
  },

  // React methods

  getInitialState: function() {
    return {
      property_value:      this.props.filter.property_value,
      property_value_date: this.props.filter.property_value_date,
      property_value_time: this.props.filter.property_value_time
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({
      property_value: newProps.filter.property_value
    });
  },

  render: function() {
    var valueInput = this.buildValueInput() || this.defaultInput();

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
