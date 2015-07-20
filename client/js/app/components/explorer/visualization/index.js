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
    var csvExtractionBtn,
        favoriteBar,
        favoriteBtn;

    if (this.props.model.query.analysis_type === 'extraction') {
      csvExtractionBtn = <button type="button" className="margin-right-tiny btn btn-default pull-left" onClick={this.props.onOpenCSVExtraction}>
                          Email extraction
                        </button>;
    }
    if (this.props.persistence) {
      favoriteBtn = <button type="button" ref="add-fav" className="btn btn-default add-favorite" onClick={this.props.addFavoriteClick}>
                      <span className="icon glyphicon glyphicon-heart margin-right-tiny fav-icon"></span> Add
                    </button>;
    }

    var codeSampleBtnClasses = classNames({
      'code-sample-toggle btn btn-default pull-left margin-right-tiny': true,
      'open': !this.state.codeSampleHidden
    });

    return (
      <div className="visualization">
        <div className="row">
          <div className="col-md-12">
            <Notice notice={this.props.notice} closeCallback={this.noticeClosed} />
          </div>
        </div>
        <div className="content-wrap padding-small">
          <div className="row">
            <div className="col-md-9 btn-bar">
              <button className={codeSampleBtnClasses} onClick={this.toggleCodeSample}>
                <span>&lt;/&gt;</span>
              </button>
              {favoriteBtn}
              {csvExtractionBtn}
            </div>
            <div className="col-md-3">
              <Select label={false}
                      name="chart_type"
                      classes="chart-type"
                      options={this.formatChartTypes()}
                      handleSelection={this.changeChartType}
                      selectedOption={this.props.model.visualization.chart_type}
                      emptyOption={false}
                      disabled={this.props.model.loading} />
            </div>
          </div>
          <div className="row margin-top-tiny">
            <div className="col-md-12">
              <Chart model={this.props.model} dataviz={this.dataviz} />
            </div>
          </div>
          <CodeSample ref="codesample"
                      codeSample={ExplorerUtils.getSdkExample(this.props.model, this.props.client)}
                      hidden={this.state.codeSampleHidden}
                      onCloseClick={this.toggleCodeSample} />
        </div>
      </div>
    );
  }
});

module.exports = Visualization;
