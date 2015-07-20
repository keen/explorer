/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react/addons');
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

  toggleCodeSample: function(event) {
    event.preventDefault();
    this.setState({
      'codeSampleHidden': !this.state.codeSampleHidden
    })
  },

  noticeClosed: function() {
    NoticeActions.clearAll();
  },

  changeChartType: function(event) {
    var chartType = _.find(this.formatChartTypes(), function(type){
      return type.value === event.target.value;
    });
    var updates = _.cloneDeep(this.props.model.visualization);
    updates.chart_type = chartType.value;
    ExplorerActions.update(this.props.model.id, { visualization: updates });
  },

  formatChartTypes: function() {
    return _.map(ExplorerUtils.getChartTypeOptions(this.props.model.result, this.props.model.query.analysis_type), function(type) {
      return {
        name: (type !== 'JSON') ? FormatUtils.toTitleCase(type).replace('chart', '') : type,
        value: type
      };
    });
  },

  getInitialState: function() {
    return {
      codeSampleHidden: true
    };
  },

  componentWillMount: function() {
    this.dataviz = new Keen.Dataviz();
  },

  componentWillUnmount: function() {
    AppDispatcher.unregister(this.dispatcherToken);
  },

  render: function() {
    var csvExtractionBanner,
        chartOptionsBar,
        favoriteBar,
        favoriteBtn;

    var codeSampleBtnClasses = classNames({
      'code-sample-toggle btn btn-default pull-left': true,
      'open': !this.state.codeSampleHidden
    });

    if (this.props.model.query.analysis_type === 'extraction') {
      csvExtractionBanner = <div className="extraction-message-component">
                              <div className="alert">
                                <span className="icon glyphicon glyphicon-info-sign"></span>
                                Previews are limited to the latest {ExplorerUtils.EXRACTION_EVENT_LIMIT} events. Larger extractions are available by email.
                              </div>
                              <button type="button" className="btn btn-default pull-right" onClick={this.props.onOpenCSVExtraction}>
                                Email extraction
                              </button>
                            </div>;
    }

    if (null !== this.props.model.result && !this.props.model.loading) {
      chartOptionsBar = <div className="chart-options clearfix">
                          <div className="pull-left">
                            <Select label={false}
                                    name="chart_type"
                                    classes="chart-type"
                                    options={this.formatChartTypes()}
                                    handleSelection={this.changeChartType}
                                    selectedOption={this.props.model.visualization.chart_type}
                                    emptyOption={false}
                                    disabled={this.props.model.loading} />
                          </div>
                          <div className="pull-right">
                            <button className={codeSampleBtnClasses} onClick={this.toggleCodeSample}>
                              <span>&lt;/&gt; Embed</span>
                            </button>
                          </div>
                        </div>;
    }

    if (this.props.persistence
      && null !== this.props.model.result
        && !this.props.model.loading) {
          favoriteBtn = <button type="button" ref="add-fav" className="btn btn-default add-favorite" onClick={this.props.addFavoriteClick}>
                          <span className="icon glyphicon glyphicon-heart fav-icon"></span> Add
                        </button>;
    }

    return (
      <div className="visualization">
        <Notice notice={this.props.notice} closeCallback={this.noticeClosed} />
        <div className="visualization-wrapper">
          {csvExtractionBanner}
          <div className="chart-component">
            <Chart model={this.props.model} dataviz={this.dataviz} />
          </div>
          {chartOptionsBar}
          <CodeSample ref="codesample"
                      codeSample={ExplorerUtils.getSdkExample(this.props.model, this.props.client)}
                      hidden={this.state.codeSampleHidden}
                      onCloseClick={this.toggleCodeSample} />
        </div>
        {favoriteBtn}
      </div>
    );
  }
});

module.exports = Visualization;
