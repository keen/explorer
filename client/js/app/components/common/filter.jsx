var _ = require('lodash');
var React = require('react');
var Select = require('./select.jsx');
var classNames = require('classnames');
var ReactSelect = require('./react_select.jsx');
var FilterValueFields = require('./filter_value_fields.jsx');
var FilterUtils = require('../../utils/FilterUtils');

var Filter = React.createClass({

  removeFilter: function(e) {
    e.preventDefault();
    this.props.removeFilter(this.props.index);
  },

  handleChange: function(name, value) {
    this.props.handleChange(this.props.index, name, value);
  },

  handleChangeWithEvent: function(e) {
    this.props.handleChange(this.props.index, e.target.name, e.target.value);
  },

  buildValueFormGroup: function() {
    return (
      <FilterValueFields filter={this.props.filter}
                         filterOperators={this.props.filterOperators}
                         handleChange={this.handleChange} />
    );
  },

  buildOperatorSelect: function() {
    return (
      <Select label={false}
              name="operator"
              classes="operator"
              options={this.props.filterOperators}
              emptyOption={false}
              sort={false}
              handleSelection={this.handleChangeWithEvent}
              selectedOption={this.props.filter.operator} />
    );
  },

  buildPropertyNameSelect: function() {
    return (
      <ReactSelect name="property_name"
                   inputClasses="property-name form-control"
                   items={this.props.propertyNames}
                   handleChange={this.handleChange}
                   placeholder="Select a property name"
                   value={this.props.filter.property_name}
                   sort={true} />
    )
  },

  getListSyntaxInfo: function() {
    if (this.props.filter.coercion_type === 'List') {
      return (
        <p className="filter-instructions help-block">
          Wrap strings in <b>double</b> quotes &amp; numbers in <b>single</b> quotes.
        </p>
      );
    }
  },

  buildValidationError: function() {
    if (this.filterCompleteAndInvalid()) {
      return (
        <div className="row">
          <div className="col-md-12">
            <p className="invalid">Invalid: {this.props.filter.errors[0].msg}</p>
          </div>
        </div>
      );
    }
  },

  filterCompleteAndInvalid: function() {
    var complete = FilterUtils.isComplete(this.props.filter);
    var valid = this.props.filter.isValid;
    return complete && !valid;
  },

  // React functions

  render: function() {
    var filterClasses = classNames({
      'filter-row': true,
      'filter-complete': !FilterUtils.isComplete(this.props.filter) || this.props.filter.isValid,
      'filter-incomplete': this.filterCompleteAndInvalid()
    });

    return (
      <div className={filterClasses}>
        <div className="row">
          <div className="col-md-4 filter-property-col">
            {this.buildPropertyNameSelect()}
          </div>
          <div className="col-md-2 filter-operator-col">
            {this.buildOperatorSelect()}
          </div>
          <div className="col-md-5 filter-value-col">
            {this.buildValueFormGroup()}
            {this.getListSyntaxInfo()}
          </div>
          <div className="col-md-1 filter-close-col">
            <a href="#" className="remove-filter" onClick={this.removeFilter} data-index={this.props.index}>
              <span className="icon no-margin">&times;</span>
            </a>
          </div>
        </div>
        {this.buildValidationError()}
      </div>
    );
  }
});

module.exports = Filter;
