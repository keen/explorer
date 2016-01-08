/** @jsx React.DOM */
var assert = require('chai').assert;
var _ = require('lodash');
var sinon = require('sinon');
var Visualization = require('../../../../../client/js/app/components/explorer/visualization/index.js');
var Chart = require('../../../../../client/js/app/components/explorer/visualization/chart.js');
var AppDispatcher = require('../../../../../client/js/app/dispatcher/AppDispatcher');
var AppStateStore = require('../../../../../client/js/app/stores/AppStateStore');
var ExplorerUtils = require('../../../../../client/js/app/utils/ExplorerUtils');
var ExplorerConstants = require('../../../../../client/js/app/constants/ExplorerConstants');
var ExplorerActions = require('../../../../../client/js/app/actions/ExplorerActions');
var NoticeActions = require('../../../../../client/js/app/actions/NoticeActions');
var TestHelpers = require('../../../../support/TestHelpers');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $R = require('rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/visualization/index', function() {
  beforeEach(function() {
    this.client = TestHelpers.createClient();
    this.model = TestHelpers.createExplorerModel();
    this.model.id = 10;
    this.project = TestHelpers.createProject();
    var datavizStub = sinon.stub(Keen, 'Dataviz').returns(TestHelpers.createDataviz());
    this.chartOptionsStub = sinon.stub(ExplorerUtils, 'getChartTypeOptions').returns([]);

    this.renderComponent = function(props) {
      var defaults = {
        client: this.client,
        model: this.model,
        project: this.project,
        persistence: null,
        appState: AppStateStore.getState()
      };
      var props = _.assign({}, defaults, props);
      return TestUtils.renderIntoDocument(<Visualization {...props} />);
    };

    this.component = this.renderComponent();

    this.getOptionsFromComponent = function(component) {
      var chartTypeSelect = this.component.refs['chart-type'].refs.select;
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
        assert.lengthOf($R(this.component).find('[role="save-query"]').components, 0);
      });
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
      assert.isFalse(this.component.refs['chart-type'].refs.select.disabled);
    });

    it('is disabled when the model is actively loading', function(){
      this.model.loading = true;
      this.component.forceUpdate();
      assert.isTrue(this.component.refs['chart-type'].refs.select.disabled);
    });

  });

  describe('default chart type', function() {
    it('renders a default chart type if there is no metadata.visualization object', function() {
      this.chartOptionsStub.returns([
          'metric',
          'JSON'
      ]);

      this.component.forceUpdate();
      var selectField = this.component.refs['chart-type'].refs.select;

      assert.equal(selectField.value, 'metric');
    });
  });

});
