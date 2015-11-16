var React = require('react');
var _ = require('lodash');
var FunnelStep = require('./funnel_step.js');

var FunnelsBuilder = React.createClass({

  buildSteps: function() {
    return this.props.model.query.steps.map(function(step, index) {
      return <li><FunnelStep index={index} step={step} /></li>;
    });
  },

  render: function() {
    return (
      <div className="funnel-builder">
        <h3>Steps</h3>
        <ul className="steps">
          {this.buildSteps()}
        </ul>
      </div>
    );
  }

});

module.exports = FunnelsBuilder;
