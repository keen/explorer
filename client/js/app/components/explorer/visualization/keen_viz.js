/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');

var ExplorerUtils = require('../../../utils/ExplorerUtils');

var KeenViz = React.createClass({

	// ***********************
	// Convenience functions
	// ***********************

	showVisualization: function() {
		this.props.dataviz.destroy(); // Remove the old one first.
  	this.props.dataviz.data(this.props.model.response)
  		.title('') // No title - not necessary for Explorer
	    .chartType(this.props.model.metadata.visualization.chart_type)
    	.el(this.refs['keen-viz'])
    	.height(400)
    	.render();
	},

	// ***********************
	// Lifecycle hooks
	// ***********************

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
