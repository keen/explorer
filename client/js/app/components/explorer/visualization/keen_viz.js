var React = require('react');
var ChartTypeUtils = require('../../../utils/ChartTypeUtils');

var KeenViz = React.createClass({

  lastDataTimestamp: null,
  lastChartType: null,

  // ***********************
  // Convenience functions
  // ***********************

  showVisualization: function() {
    this.props.dataviz.destroy();

    this.props.dataviz
      .data(this.props.model.response)
      .el(this.refs['keen-viz'])
      .height(300)
      .title(null)
      .type(this.props.model.metadata.visualization.chart_type);

    if (this.props.model.query.analysis_type !== "funnel") {
      this.props.dataviz.sortGroups('desc')
    }

    this.props.dataviz.render();

    this.lastDataTimestamp = this.props.model.dataTimestamp;
    this.lastChartType = this.props.model.metadata.visualization.chart_type;
  },

  // ***********************
  // Lifecycle hooks
  // ***********************

  shouldComponentUpdate: function(nextProps, nextState) {
    if (this.lastChartType !== nextProps.model.metadata.visualization.chart_type) {
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
  	var exportBtn;
  	if (ChartTypeUtils.isTableChartType(this.props.model.metadata.visualization.chart_type)) {
      exportBtn = (
        <button className="btn btn-default btn-download-csv"
                role="export-table"
                type="button"
                onClick={this.props.exportToCsv}>
          Download CSV
        </button>
      );
    }

    return (
      <div ref="keen-viz-wrapper">
        <div ref="keen-viz"></div>
        {exportBtn}
      </div>
    );
  }
});

module.exports = KeenViz;
