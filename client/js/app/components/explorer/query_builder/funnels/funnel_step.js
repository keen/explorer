var React = require('react');
var _ = require('lodash');
var SelectField = require('../select_field.js');
var Timeframe = require('../../../common/timeframe.js');
var classNames = require('classnames');

var FunnelStep = React.createClass({

  removeStep: function(e) {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this funnel step?")) {
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

  handleSubmit: function(e) {
    e.preventDefault();
  },

  toggleStepActive: function(e) {
    e.preventDefault();
    this.props.toggleStepActive(this.props.index, !this.props.step.active);
  },

  buildStepBody: function() {
    if (this.props.step.active === true) {
      return (
        <div className="step-body margin-top-small margin-bottom-small">
          <form onSubmit={this.handleSubmit}>
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
                         options={this.props.getEventPropertyNames(this.props.step.event_collection)}
                         requiredLabel={true}
                         handleChange={this.handleChange} />
            <Timeframe ref="timeframe"
                       time={this.props.step.time}
                       timezone={this.props.step.timezone}  
                       handleChange={this.handleChange}/>
            <label className="block-label margin-top-small">
              <input name="optional" type="checkbox" checked={this.props.step.optional} onChange={this.handleCheckboxChange} /> Optional Step
            </label>
            <label className="block-label">
              <input name="inverted" type="checkbox" checked={this.props.step.inverted} onChange={this.handleCheckboxChange} /> Inverted Step
            </label>
            <hr />
            <a href="#" className="remove-step" onClick={this.removeStep}>
              <i className="icon glyphicon glyphicon-remove-circle margin-right-tiny"></i>
              Remove Step
            </a>
          </form>
        </div>
      );
    }
  },

  render: function() {
    var stepWrapperClasses = classNames({
      'funnel-step': true,
      'active': this.props.step.active
    })
    return (
      <div className={stepWrapperClasses}>
        <a href="#" className="step-header clearfix" onClick={this.toggleStepActive}>
          <div className="step-move-btns">
            <button className="up">Up</button>
            <button className="down">Down</button>
          </div>
          <div className="step-number">
            {this.props.index + 1}
          </div>
          <div className="step-name">
            Step {this.props.index + 1}
          </div>
        </a>
        {this.buildStepBody()}
      </div>
    );
  }

});

module.exports = FunnelStep;
