var _ = require('lodash');
var React = require('react');
var classNames = require('classnames');
var KeenDataviz = require('keen-dataviz');
var Select = require('../../common/select.js');
var Notice = require('../../common/notice.js');
var Chart = require('./chart.js');
var CodeSample = require('./code_sample.js');
var AppDispatcher = require('../../../dispatcher/AppDispatcher');
var ExplorerConstants = require('../../../constants/ExplorerConstants');
var ExplorerActions = require('../../../actions/ExplorerActions');
var ExplorerStore = require('../../../stores/ExplorerStore');
var NoticeActions = require('../../../actions/NoticeActions');
var ExplorerUtils = require('../../../utils/ExplorerUtils');
var ChartTypeUtils = require('../../../utils/ChartTypeUtils');
var FormatUtils = require('../../../utils/FormatUtils');
var DataUtils = require('../../../utils/DataUtils');

var Visualization = React.createClass({

  getInitialState: function() {
    return {
      focusDisplayName: false,
      focusQueryName: false,
      blurTimeout: 100
    };
  },

  handleDisplayNameFocus: function(){
    this.setState({ focusDisplayName: true });
  },

  handleDisplayNameBlur: function(){
    setTimeout(function(){
      this.setState({ focusDisplayName: false });
    }.bind(this), this.state.blurTimeout);
  },

  handleQueryNameFocus: function(){
    this.setState({ focusQueryName: true });
  },

  handleQueryNameBlur: function(){
    setTimeout(function(){
      this.setState({ focusQueryName: false });
    }.bind(this), this.state.blurTimeout);
  },

  noticeClosed: function() {
    NoticeActions.clearAll();
  },

  changeChartType: function(event) {
    var chartType = _.find(this.formatChartTypes(), function(type){
      return type.value === event.target.value;
    });
    var updates = {
      metadata: {
        visualization: { chart_type: chartType.value }
      }
    };
    ExplorerActions.update(this.props.model.id, updates);
  },

  formatChartTypes: function() {
    return _.map(ChartTypeUtils.getChartTypeOptions(this.props.model.query), function(type) {
      return {
        name: (type !== 'JSON') ? FormatUtils.toTitleCase(type).replace('chart', '') : type,
        value: type
      };
    });
  },

  chartType: function() {
    if (this.props.model.metadata.visualization &&
        this.props.model.metadata.visualization.chart_type) {
      return this.props.model.metadata.visualization.chart_type;
    }
    else {
      return _.first(ChartTypeUtils.getChartTypeOptions(this.props.model.query))
    }
  },

  componentWillMount: function() {
    this.dataviz = new KeenDataviz();
  },

  componentWillUnmount: function() {
    AppDispatcher.unregister(this.dispatcherToken);
  },

  exportToCsv: function() {
    var data = this.dataviz.dataset.matrix;
    var filename = this.props.model.query_name || 'untitled-query';
    DataUtils.exportToCsv(data, filename);
  },

  render: function() {
    var chartTitle,
        codeSample;

    var chartDetailBarClasses = classNames({
      'chart-detail-bar': true,
      'chart-detail-bar-focus': (this.state.focusDisplayName || this.state.focusQueryName) && this.props.model.response !== null && !this.props.model.loading,
      'chart-detail-active': this.props.model.response !== null && !this.props.model.loading
    });

    if (this.props.model.isValid) {
      codeSample = ExplorerUtils.getSdkExample(this.props.model, this.props.client);
    }

    if (this.props.persistence) {
      chartTitle = (
        <div className="chart-title-component">
          <input className="chart-display-name"
                 type="text"
                 onChange={this.props.onDisplayNameChange}
                 onBlur={this.handleDisplayNameBlur}
                 onFocus={this.handleDisplayNameFocus}
                 spellCheck="false"
                 value={this.props.model.metadata.display_name}
                 placeholder="Give your query a name..." />
          <div className="chart-query-name">
            <label>
              Saved Query Resource Name &nbsp;
              <a href="https://keen.io/docs/api/#saved-queries" target="_blank">
                <i className="icon glyphicon glyphicon-question-sign"></i>
              </a>
            </label>
            <input className="chart-query-name"
                   type="text"
                   onChange={this.props.onQueryNameChange}
                   onBlur={this.handleQueryNameBlur}
                   onFocus={this.handleQueryNameFocus}
                   spellCheck="false"
                   value={this.props.model.query_name} />
          </div>
        </div>
      );
    }

    return (
      <div className="visualization">
        <Notice notice={this.props.notice} closeCallback={this.noticeClosed} />
        <div className="visualization-wrapper">
          <div className={chartDetailBarClasses}>
            {chartTitle}
            <div className="chart-type-component">
              <Select label={false}
                      ref="chart-type"
                      name="chart_type"
                      classes="chart-type"
                      options={this.formatChartTypes()}
                      handleSelection={this.changeChartType}
                      selectedOption={this.chartType()}
                      emptyOption={false}
                      disabled={this.props.model.loading} />
            </div>
          </div>
          <div className="chart-component">
            <Chart model={this.props.model}
                   dataviz={this.dataviz}
                   exportToCsv={this.exportToCsv}/>
          </div>
          <CodeSample ref="codesample"
                      codeSample={codeSample}
                      hidden={this.props.appState.codeSampleHidden}
                      onCloseClick={this.props.toggleCodeSample}
                      isValid={this.props.model.isValid} />
        </div>
      </div>
    );
  }
});

module.exports = Visualization;
