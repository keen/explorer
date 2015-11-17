/**
* @jsx React.DOM
*/

var _ = require('lodash');
var React = require('react');
var Select = require('./select.js');
var classNames = require('classnames');
var ReactSelect = require('./react_select.js');
var FilterValueFields = require('./filter_value_fields.js');
var ProjectUtils = require('../../utils/ProjectUtils');
var FilterUtils = require('../../utils/FilterUtils');
var runValidations = require('../../utils/ValidationUtils').runValidations;
var filterValidations = require('../../validations/FilterValidations').filter;

var Filter = React.createClass({

  handleChange: function(name, value) {
    this.props.handleChange(this.props.index, name, value);
  },

  handleChangeWithEvent: function(e) {
    this.props.handleChange(this.props.index, e.target.name, e.target.value);
  },

  buildValueFormGroup: function() {
    return (
      <FilterValueFields filter={this.props.filter}
                         index={this.props.index}
                         filterOperators={this.props.filterOperators}
                         handleChange={this.props.handleChange}
                         updateFilter={this.props.updateFilter} />
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
                   items={this.props.eventPropertyNames}
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

  // React functions

  render: function() {
    var filterValidity = runValidations(filterValidations, this.props.filter);
    var completeAndInvalid = FilterUtils.isComplete(this.props.filter) && !filterValidity.isValid;
    var invalidMsg;

    if (completeAndInvalid) {
      invalidMsg = (
        <div className="row">
          <div className="col-md-12">
            <p className="invalid">Invalid: {filterValidity.lastError}</p>
          </div>
        </div>
      );
    }

    var filterClasses = classNames({
      'filter-row': true,
      'filter-complete': !FilterUtils.isComplete(this.props.filter) || filterValidity.isValid,
      'filter-incomplete': completeAndInvalid
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
            <a href="#" className="remove-filter" onClick={this.props.removeFilter} data-index={this.props.index}>
              <span className="icon no-margin">&times;</span>
            </a>
          </div>
        </div>
        {invalidMsg}
      </div>
    );
  }
});

module.exports = Filter;
