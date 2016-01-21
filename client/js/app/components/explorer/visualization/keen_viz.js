/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');

var KeenViz = React.createClass({

  lastDataTimestamp: null,

	// ***********************
	// Convenience functions
	// ***********************

	showVisualization: function() {
    console.log(new Date(), 'INSIDE showVisualization!')
    this.props.dataviz.destroy(); // Remove the old one first.
  	this.props.dataviz.data(this.props.model.response)
  		.title('') // No title - not necessary for Explorer
	    .chartType(this.props.model.metadata.visualization.chart_type)
    	.el(this.refs['keen-viz'])
    	.height(400)
    	.render();

    this.lastDataTimestamp = this.props.model.dataTimestamp;
	},

	// ***********************
	// Lifecycle hooks
	// ***********************
  
  shouldComponentUpdate: function(nextProps, nextState) {
    if (this.props.model.metadata.visualization.chart_type !== nextProps.model.metadata.visualization.chart_type) {
      return true;
    }
    if (!this.lastDataTimestamp || this.lastDataTimestamp !== nextProps.model.dataTimestamp) {
      return true
    }
    return false;
  },

	componentDidUpdate: function() {
		this.showVisualization();
	},

	componentDidMount: function() {
		this.showVisualization();
  },

  render: function() {
    return (
			<div ref="keen-viz"></div>
    );
  }
});

module.exports = KeenViz;
