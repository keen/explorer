var React = require('react');
var _ = require('lodash');
var SelectField = require('../select_field.jsx');
var Timeframe = require('../../../common/timeframe.jsx');
var FieldsToggle = require('../../../common/fields_toggle.jsx');
var Notice = require('../../../common/notice.jsx');
var FilterManager = require('../../../common/filter_manager.jsx');
var FilterUtils = require('../../../../utils/FilterUtils.js');
var classNames = require('classnames');

var FunnelStep = React.createClass({

  propTypes: {
    index:                React.PropTypes.number.isRequired,
    step:                 React.PropTypes.object.isRequired,
    eventCollections:     React.PropTypes.array.isRequired,
    propertyNames:        React.PropTypes.array.isRequired,
    onBrowseEvents:       React.PropTypes.func.isRequired,
    getPropertyType:      React.PropTypes.func.isRequired,
    moveStep:             React.PropTypes.func.isRequired,
    removeStep:           React.PropTypes.func.isRequired,
    handleChange:         React.PropTypes.func.isRequired,
    toggleStepActive:     React.PropTypes.func.isRequired,
    handleFilterChange:   React.PropTypes.func.isRequired,
    handleAddFilter:      React.PropTypes.func.isRequired,
    handleRemoveFilter:   React.PropTypes.func.isRequired
  },

  removeStep: function(e) {
    e.preventDefault();
    if (this.props.canRemove && confirm("Are you sure you want to delete this funnel step?")) {
      this.props.removeStep(this.props.index);
    }
  },

  handleChange: function(name, value) {
    this.props.handleChange(this.props.index, name, value);
  },

  handleChangeWithEvent: function(e) {
    e.preventDefault();
    this.props.handleChange(this.props.index, e.target.name, e.target.value);
  },

  handleCheckboxChange: function(e) {
    this.props.handleChange(this.props.index, e.target.name, e.target.checked);
  },

  toggleStepActive: function(e) {
    this.props.toggleStepActive(this.props.index, !this.props.step.active);
  },

  handleFiltersToggle: function() {
    this.refs['filter-manager'].open();
  },

  handleAddFilter: function() {
    this.props.handleAddFilter(this.props.index);
  },

  handleRemoveFilter: function(filterIndex) {
    this.props.handleRemoveFilter(this.props.index, filterIndex);
  },

  handleFilterChange: function(filterIndex, updates) {
    this.props.handleFilterChange(this.props.index, filterIndex, updates);
  },

  moveStepUp: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.moveStep(this.props.index, 'up');
  },

  moveStepDown: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.moveStep(this.props.index, 'down');
  },

  buildStepBody: function() {
    var remove, notice;

    if (this.props.canRemove) {
      remove = (
        <a href="#" className="remove-step" onClick={this.removeStep}>
          <i className="icon glyphicon glyphicon-remove-circle margin-right-tiny"></i>
          Remove Step
        </a>
      );
    }
    if (this.props.notice) {
      notice = (<Notice notice={this.props.notice} closable={false} />);
    }

    if (this.props.step.active === true) {
      return (
        <div className="step-body margin-top-small margin-bottom-small">
          {notice}
          <SelectField name="event_collection"
                       label="Event Collection"
                       value={this.props.step.event_collection}
                       options={this.props.eventCollections}
                       requiredLabel={true}
                       onBrowseEvents={this.props.onBrowseEvents}
                       handleChange={this.handleChange} />
          <SelectField name="actor_property"
                       label="Actor Property"
                       value={this.props.step.actor_property}
                       options={this.props.propertyNames}
                       requiredLabel={true}
                       handleChange={this.handleChange} />
          <Timeframe ref="timeframe"
                     time={this.props.step.time}
                     timezone={this.props.step.timezone}
                     handleChange={this.handleChange}/>
          <div className="field-component">
            <FieldsToggle ref="filters-fields-toggle"
                          name="Filters"
                          toggleCallback={this.handleFiltersToggle}
                          fieldsCount={FilterUtils.validFilters(this.props.step.filters).length} />
          </div>
          <FilterManager ref="filter-manager"
                         eventCollection={this.props.step.event_collection}
                         filters={this.props.step.filters}
                         handleChange={this.handleFilterChange}
                         removeFilter={this.handleRemoveFilter}
                         addFilter={this.handleAddFilter}
                         getPropertyType={this.props.getPropertyType}
                         propertyNames={this.props.propertyNames} />
          <label className="block-label margin-top-small">
            <input name="optional" type="checkbox" checked={this.props.step.optional} onChange={this.handleCheckboxChange} /> Optional Step
          </label>
          <label className="block-label">
            <input name="inverted" type="checkbox" checked={this.props.step.inverted} onChange={this.handleCheckboxChange} /> Inverted Step
          </label>
          <hr />
          {remove}
        </div>
      );
    }
  },

  render: function() {
    var stepWrapperClasses = classNames({
      'funnel-step': true,
      'active': this.props.step.active
    });
    return (
      <div className={stepWrapperClasses}>
        <div className="step-header clearfix" onClick={this.toggleStepActive} role="step-header">
          <div className="step-move-btns">
            <a href="#" className="up" onClick={this.moveStepUp} role="move-step">
              <span className="arrow"></span>
            </a>
            <a href="#" className="down" onClick={this.moveStepDown} role="move-step">
              <span className="arrow"></span>
            </a>
          </div>
          <div className="step-number">
            {this.props.index + 1}
          </div>
          <div className="step-name">
            Step {this.props.index + 1}
          </div>
        </div>
        {this.buildStepBody()}
      </div>
    );
  }

});

module.exports = FunnelStep;
