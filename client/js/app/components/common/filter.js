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
var ExplorerActions = require('../../actions/ExplorerActions');

var Filter = React.createClass({

  handleChange: function(name, selection) {
    var updates = {};
    updates[name] = selection;
    ExplorerActions.updateFilter(this.props.model.id, this.props.index, updates);
  },

  handleSelectionWithEvent: function(event) {
    var name = event.target.name;
    var selection = event.target.value;
    this.handleChange(name, selection);
  },

  typeOfPropertyName: function () {
    var propertyName = this.props.filter.property_name;
    var eventName = this.props.model.query.event_collection;
    return ProjectUtils.getPropertyType(this.props.project, eventName, propertyName);
  },

  buildValueFormGroup: function() {
    var filter = this.props.filter;
    var type = this.typeOfPropertyName() || 'String';
    return (
      <FilterValueFields model={this.props.model}
                         filter={this.props.filter}
                         index={this.props.index}
                         project={this.props.project} />
    );
  },

  buildOperatorSelect: function() {
    var type = this.typeOfPropertyName() || '';
    var coercionType = this.props.filter.coercion_type || '';
    var operators = ProjectUtils.getConstant('FILTER_OPERATORS');

    return (
      <Select label={false}
              name="operator"
              classes="operator"
              options={operators}
              emptyOption={false}
              sort={false}
              handleSelection={this.handleSelectionWithEvent}
              selectedOption={this.props.filter.operator} />
    );
  },

  buildPropertyNameSelect: function() {
    var eventCollection = this.props.model.query.event_collection;
    var eventPropertyNames = ProjectUtils.getEventCollectionPropertyNames(this.props.project, eventCollection);

    return (
      <ReactSelect name="property_name"
                   inputClasses="property-name form-control"
                   items={eventPropertyNames}
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

  componentDidUpdate: function() {
    var type = this.typeOfPropertyName();

    if (type && type == 'geo') {
      ExplorerActions.updateFilter(this.props.model.id, this.props.index, { coercion_type: 'Geo' });
    }
  },

  render: function() {
    var propertyNameSelect = this.buildPropertyNameSelect();
    var operatorSelect = this.buildOperatorSelect();
    var valueFormGroup = this.buildValueFormGroup();
    var listSyntaxInfo = this.getListSyntaxInfo();
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
            {propertyNameSelect}
          </div>
          <div className="col-md-2 filter-operator-col">
            {operatorSelect}
          </div>
          <div className="col-md-5 filter-value-col">
            {valueFormGroup}
            {listSyntaxInfo}
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
