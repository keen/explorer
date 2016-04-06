var React = require('react');
var _ = require('lodash');
var FunnelStep = require('./funnel_step.jsx');
var ExplorerActions = require('../../../../actions/ExplorerActions');

var FunnelsBuilder = React.createClass({

  propTypes: {
    modelId:               React.PropTypes.string.isRequired,
    eventCollections:      React.PropTypes.array.isRequired,
    steps:                 React.PropTypes.array.isRequired,
    stepNotices:           React.PropTypes.array.isRequired,
    onBrowseEvents:        React.PropTypes.func.isRequired,
    getEventPropertyNames: React.PropTypes.func.isRequired,
    getPropertyType:       React.PropTypes.func.isRequired
  },

  handleChange: function(index, name, value) {
    var updates = {}
    updates[name] = value;
    ExplorerActions.updateStep(this.props.modelId, index, updates);
  },

  addStep: function(e) {
    e.preventDefault();
    ExplorerActions.addStep(this.props.modelId);
  },

  removeStep: function(index) {
    ExplorerActions.removeStep(this.props.modelId, index);
  },

  handleAddFilter: function(index) {
    ExplorerActions.addStepFilter(this.props.modelId, index);
  },

  handleRemoveFilter: function(stepIndex, filterIndex) {
    ExplorerActions.removeStepFilter(this.props.modelId, stepIndex, filterIndex);
  },

  handleFilterChange: function(stepIndex, filterIndex, updates) {
    ExplorerActions.updateStepFilter(this.props.modelId, stepIndex, filterIndex, updates);
  },

  toggleStepActive: function(index, active) {
    if (active) {
      ExplorerActions.setStepActive(this.props.modelId, index);
    } else {
      ExplorerActions.updateStep(this.props.modelId, index, { active: false });
    }
  },

  moveStep: function(index, direction) {
    ExplorerActions.moveStep(this.props.modelId, index, direction);
  },

  buildSteps: function() {
    return this.props.steps.map(function(step, index) {
      var notice = _.find(this.props.stepNotices, { stepIndex: index });
      return (
        <li key={index}>
          <FunnelStep index={index}
                      step={step}
                      notice={notice}
                      removeStep={this.removeStep}
                      canRemove={this.props.steps.length > 1}
                      eventCollections={this.props.eventCollections}
                      propertyNames={this.props.getEventPropertyNames(step.event_collection)}
                      onBrowseEvents={this.props.onBrowseEvents}
                      toggleStepActive={this.toggleStepActive}
                      handleChange={this.handleChange}
                      handleAddFilter={this.handleAddFilter}
                      handleRemoveFilter={this.handleRemoveFilter}
                      handleFilterChange={this.handleFilterChange}
                      getPropertyType={this.props.getPropertyType}
                      handleFiltersToggle={this.handleFiltersToggle}
                      moveStep={this.moveStep} />
        </li>
      );
    }.bind(this));
  },

  render: function() {
    return (
      <div className="funnel-builder margin-top-small">
        <h4>Steps</h4>
        <ul className="steps">
          {this.buildSteps()}
        </ul>
        <a href="#" className="add-step" onClick={this.addStep}>
          <i className="icon glyphicon glyphicon-plus-sign margin-right-tiny"></i>
          Add a step
        </a>
      </div>
    );
  }

});

module.exports = FunnelsBuilder;
