/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');

var KeenViz = React.createClass({

  // ***********************
  // Convenience functions
  // ***********************

  showVisualization: function() {
    this.props.dataviz.destroy(); // Remove the old one first.
    this.props.dataviz.data(this.props.model.response)
      .title('') // No title - not necessary for Explorer
      .el(this.refs['keen-viz'])
      .chartType(this.props.model.metadata.visualization.chart_type)
      .height(400);

    if (this.props.dataviz.view.adapter.chartType !== "metric") {
      this.props.dataviz.library("c3");
    }
    else {
      this.props.dataviz.library("keen-io");
    }

    this.props.dataviz.render();

    this.setState({ lastDataTimestamp: this.props.model.dataTimestamp });
  },

  // ***********************
  // Lifecycle hooks
  // ***********************

  shouldComponentUpdate: function(nextProps, nextState) {
    if (this.props.model.metadata.visualization.chart_type !== nextProps.model.metadata.visualization.chart_type) {
      return true;
    }
    if (!this.state.lastDataTimestamp || this.state.lastDataTimestamp !== nextProps.model.dataTimestamp) {
      return true
    }
    return false;
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
