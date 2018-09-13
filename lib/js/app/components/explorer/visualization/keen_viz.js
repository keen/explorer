import React from 'react';
import ChartTypeUtils from '../../../utils/ChartTypeUtils';
import FormatUtils from '../../../utils/FormatUtils';
import KeenDataviz from 'keen-dataviz';
import moment from 'moment-timezone';

const KeenViz = React.createClass({

  lastDataTimestamp: null,
  lastChartType: null,
  datavizInstance: null,

  // ***********************
  // Convenience functions
  // ***********************

  showVisualization: function() {
    if (this.datavizInstance) {
      this.datavizInstance.destroy();
    }

    let sortGroups;
    if (this.props.model.query.analysis_type !== "funnel") {
      sortGroups = 'desc';
    }

    let type;
    if (this.props.model.metadata.visualization.chart_type) {
      type = this.props.model.metadata.visualization.chart_type;
    }

    let results = this.props.model.response;
    if (Array.isArray(results.result)
     && results.result[0].timeframe && results.result[0].timeframe.start
     && !this.props.model.response.dateConvertedToTimezone){
       this.props.model.response.dateConvertedToTimezone = true;
       const dateFormat = 'YYYY-MM-DDTHH:mm:ss';
       results.result.forEach((result, key) => {
         results.result[key].timeframe.start = moment(result.timeframe.start).tz(results.query.timezone).format(dateFormat);
         results.result[key].timeframe.end = moment(result.timeframe.end).tz(results.query.timezone).format(dateFormat);
       });
    }

    this.datavizInstance = new KeenDataviz({
      container: this.refs['keen-viz'],
      showTitle: false,
      type,
      sortGroups,
      results,
      ...((this.props.config && this.props.config.keenDatavizOptions) || {})
    });

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

export default KeenViz;
