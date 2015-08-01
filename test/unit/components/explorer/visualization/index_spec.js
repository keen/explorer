/** @jsx React.DOM */
var assert = require('chai').assert;
var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var Select = require('../../../../../client/js/app/components/common/select.js');
var Visualization = require('../../../../../client/js/app/components/explorer/visualization/index.js');
var Chart = require('../../../../../client/js/app/components/explorer/visualization/chart.js');
var React = require('react/addons');
var AppDispatcher = require('../../../../../client/js/app/dispatcher/AppDispatcher');
var ExplorerUtils = require('../../../../../client/js/app/utils/ExplorerUtils');
var ExplorerConstants = require('../../../../../client/js/app/constants/ExplorerConstants');
var ExplorerActions = require('../../../../../client/js/app/actions/ExplorerActions');
var NoticeActions = require('../../../../../client/js/app/actions/NoticeActions');
var TestUtils = React.addons.TestUtils;
var TestHelpers = require('../../../../support/TestHelpers');

describe('components/explorer/visualization/index', function() {
  beforeEach(function() {
    this.client = TestHelpers.createClient();
    this.model = TestHelpers.createExplorerModel();
    this.model.id = 10;
    this.project = TestHelpers.createProject();

    var datavizStub = sinon.stub(Keen, 'Dataviz').returns(TestHelpers.createDataviz());
    this.chartOptionsStub = sinon.stub(ExplorerUtils, 'getChartTypeOptions').returns([]);
    this.component = TestUtils.renderIntoDocument(<Visualization client={this.client} model={this.model} project={this.project} persistence={null} />);

    this.getOptionsFromComponent = function(component) {
      var chartTypeSelect = this.component.refs['chart-type'].refs.select.getDOMNode();
      var optionNodes = chartTypeSelect.childNodes;
      return _.map(optionNodes, function(optionNode) {
        return optionNode.textContent;
      });
    };
  });

  afterEach(function () {
    Keen.Dataviz.restore();
    ExplorerUtils.getChartTypeOptions.restore();
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Visualization));
    });
    it('has one chart child component', function(){
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Chart), 1);
    });

    describe('without persistence', function () {
      it('should not show the Save/Update button', function () {
        assert.isUndefined(this.component.refs['save-query']);
      });
    });

    describe('with persistence', function () {
      it('should show the Save/Update button', function () {
        this.model.result = 50;
        this.component.setProps({ persistence: {} });
        assert.isDefined(this.component.refs['save-query']);
      });
    });
  });

  describe('interactions', function () {
    it('should call props.saveQueryClick when the save button is clicked', function () {
      var stub = sinon.stub();
      this.model.result = 50;
      this.component.setProps({ persistence: {}, saveQueryClick: stub });
      TestUtils.Simulate.click(this.component.refs['save-query'].getDOMNode());
      assert.isTrue(stub.calledOnce);
    });
  });

  describe('chart types select', function() {
    describe('populates with the right chart types based on the dataviz capabilities', function() {
      it('basic options', function(){
        this.model.result = 50;
        this.chartOptionsStub.returns([
          'metric',
          'JSON'
        ]);
        this.component.forceUpdate();
        var options = this.getOptionsFromComponent(this.component);
        assert.sameMembers(options, ['JSON', 'Metric']);
      });
    });

    it('is not disabled when the model is not loading', function(){
      this.model.result = 50;
      this.model.loading = false;
      this.component.forceUpdate();
      assert.isFalse(this.component.refs['chart-type'].refs.select.getDOMNode().disabled);
    });

    it('is disabled when the model is actively loading', function(){
      this.model.loading = true;
      this.component.forceUpdate();
      assert.isTrue(this.component.refs['chart-type'].refs.select.getDOMNode().disabled);
    });

  });


  describe('custom limit message', function(){

    beforeEach(function(){
      this.model.result = 50;
      sinon.stub(ExplorerUtils, 'resultCanBeVisualized').returns(true);
    });

    afterEach(function(){
      ExplorerUtils.resultCanBeVisualized.restore();
    });

    describe('shows when the analysis type is extraction', function(){
      beforeEach(function(){
        this.model.query.analysis_type = 'extraction';
      });

      it('for JSON chart type', function(){
        this.model.visualization.chart_type = 'json';
        this.component.forceUpdate();
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'extraction-message-component'), 1);
      });

      it('for Table chart type', function(){
        this.model.visualization.chart_type = 'table';
        this.component.forceUpdate();
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'extraction-message-component'), 1);
      });
    });

    describe('does not show when the analysis type is not extraction', function(){

      beforeEach(function(){
        this.model.query.analysis_type = 'count';
      });

      it('for JSON chart type', function(){
        this.model.visualization.chart_type = 'json';
        this.component.forceUpdate();
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'viz-notice'), 0);
      });

      it('for metric chart type', function(){
        this.model.visualization.chart_type = 'metric';
        this.component.forceUpdate();
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'viz-notice'), 0);
      });
    });

  });

});
