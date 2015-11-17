var React = require('react');
var _ = require('lodash');
var FunnelStep = require('./funnel_step.js');
var ExplorerActions = require('../../../../actions/ExplorerActions.js');
var ProjectUtils = require('../../../../utils/ProjectUtils.js');

var FunnelsBuilder = React.createClass({

  handleChange: function() {
    // TODO
  },

  addStep: function(e) {
    e.preventDefault();
    ExplorerActions.addStep(this.props.model.id);
  },

  removeStep: function(index) {
    ExplorerActions.removeStep(this.props.model.id, index);
  },

  getEventPropertyNames: function(event_collection)  {
    return ProjectUtils.getEventCollectionPropertyNames(this.props.project, event_collection);
  },

  toggleStepActive: function(index, active) {
    if (active) {
      ExplorerActions.setStepActive(this.props.model.id, index);
    } else {
      ExplorerActions.updateStep(this.props.model.id, index, { active: false });
    }
  },

  buildSteps: function() {
    return this.props.model.query.steps.map(function(step, index) {
      return (
        <li key={index}>
          <FunnelStep index={index}
                      step={step}
                      removeStep={this.removeStep}
                      eventCollections={this.props.project.eventCollections}
                      getEventPropertyNames={this.getEventPropertyNames}
                      onBrowseEvents={this.props.onBrowseEvents}
                      toggleStepActive={this.toggleStepActive}
                      handleChange={this.handleChange} />
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
