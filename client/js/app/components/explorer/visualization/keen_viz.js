/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react/addons');
var ExplorerActions = require('../../../actions/ExplorerActions');

var KeenViz = React.createClass({

	// ***********************
	// Convenience functions
	// ***********************

	showVisualization: function() {
    this.props.dataviz.destroy(); // Remove the old one first.
  	this.props.dataviz.data(this.props.model.response)
  		.title('') // No title - not necessary for Explorer
	    .chartType(this.props.model.metadata.visualization.chart_type)
    	.el(this.refs['keen-viz'].getDOMNode())
    	.height(400)
    	.render();
    
    this.setState({ lastDataTimestamp: this.props.model.dataTimestamp });
	},

	// ***********************
	// Lifecycle hooks
	// ***********************
  
  shouldComponentUpdate: function(nextProps, nextState) {
    return (!this.state.lastDataTimestamp || this.state.lastDataTimestamp !== nextProps.model.dataTimestamp);
  },
  
  getInitialState: function() {
    return { lastDataTimestamp: null };
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
