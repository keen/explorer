/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react');
var classNames = require('classnames');
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
var FormatUtils = require('../../../utils/FormatUtils');

var Visualization = React.createClass({

  noticeClosed: function() {
    NoticeActions.clearAll();
  },

  changeChartType: function(event) {
    var chartType = _.find(this.formatChartTypes(), function(type){
      return type.value === event.target.value;
    });
    var updates = _.cloneDeep(this.props.model);
    updates.metadata.visualization.chart_type = chartType.value;
    ExplorerActions.update(this.props.model.id, updates);
  },

  formatChartTypes: function() {
    return _.map(ExplorerUtils.getChartTypeOptions(this.props.model.response, this.props.model.query.analysis_type), function(type) {
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
      return _.first(ExplorerUtils.getChartTypeOptions(this.props.model.response, this.props.model.query.analysis_type))
    }
  },

  componentWillMount: function() {
    this.dataviz = new Keen.Dataviz();
  },

  componentWillUnmount: function() {
    AppDispatcher.unregister(this.dispatcherToken);
  },

  render: function() {
    var chartTitle,
        codeSample;

    var chartDetailBarClasses = classNames({
      'chart-detail-bar': true,
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
                 spellCheck="false"
                 value={this.props.model.metadata.display_name}
                 placeholder="Give your query a name..." />
          <input className="chart-query-name"
                 type="text"
                 onChange={this.props.onQueryNameChange}
                 spellCheck="false"
                 value={this.props.model.query_name} />
        </div>
      );
    }

    return (
      <div className="visualization">
        <Notice notice={this.props.notice} closeCallback={this.noticeClosed} />
        <div className="visualization-wrapper">
          <div className={chartDetailBarClasses}>
            <div className="row">
              <div className="col-md-10 chart-title-col">
                {chartTitle}
              </div>
              <div className="col-md-2">
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
            </div>
          </div>
          <div className="chart-component">
            <Chart model={this.props.model} dataviz={this.dataviz} />
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
