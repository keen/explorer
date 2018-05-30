
var _ from 'lodash');
var KeenAnalysis from 'keen-analysis');
let sinon from 'sinon/pkg/sinon.js');
var Visualization from '../../../../../lib/js/app/components/explorer/visualization/index.js');
var Chart from '../../../../../lib/js/app/components/explorer/visualization/chart.js');
var AppDispatcher from '../../../../../lib/js/app/dispatcher/AppDispatcher');
var AppStateStore from '../../../../../lib/js/app/stores/AppStateStore');
var ExplorerUtils from '../../../../../lib/js/app/utils/ExplorerUtils');
var ChartTypeUtils from '../../../../../lib/js/app/utils/ChartTypeUtils');
var DataUtils from '../../../../../lib/js/app/utils/DataUtils');
var ExplorerConstants from '../../../../../lib/js/app/constants/ExplorerConstants');
var ExplorerActions from '../../../../../lib/js/app/actions/ExplorerActions');
var NoticeActions from '../../../../../lib/js/app/actions/NoticeActions');
var TestHelpers from '../../../../support/TestHelpers');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var $R from 'rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/visualization/index', () => {
  beforeEach(() => {
    this.client = new KeenAnalysis(TestHelpers.createClient());
    this.model = TestHelpers.createExplorerModel();
    this.model.id = 10;
    this.project = TestHelpers.createProject();
    var datavizStub = sinon.stub(Keen, 'Dataviz').returns(TestHelpers.createDataviz());
    this.chartOptionsStub = sinon.stub(ChartTypeUtils, 'getChartTypeOptions').returns([]);
    this.exportToCsvStub = sinon.stub(DataUtils, 'exportToCsv').returns([]);

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

  afterEach(() => {
    Keen.Dataviz.restore();
    ChartTypeUtils.getChartTypeOptions.restore();
    DataUtils.exportToCsv.restore();
  });

  describe('setup', () => {
    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Visualization));
    });
    it('has one chart child component', () => {
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Chart), 1);
    });

    describe('without persistence', () => {
      it('should not show the Save/Update button', () => {
        assert.lengthOf($R(this.component).find('[role="save-query"]').components, 0);
      });
    });
  });

  describe('chart types select', () => {
    describe('populates with the right chart types based on the dataviz capabilities', () => {
      it('basic options', () => {
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

    it('is not disabled when the model is not loading', () => {
      this.model.result = 50;
      this.model.loading = false;
      this.component.forceUpdate();
      assert.isFalse(this.component.refs['chart-type'].refs.select.disabled);
    });

    it('is disabled when the model is actively loading', () => {
      this.model.loading = true;
      this.component.forceUpdate();
      assert.isTrue(this.component.refs['chart-type'].refs.select.disabled);
    });

  });

  describe('default chart type', () => {
    it('renders a default chart type if there is no metadata.visualization object', () => {
      this.chartOptionsStub.returns([
          'metric',
          'JSON'
      ]);

      this.component.forceUpdate();
      var selectField = this.component.refs['chart-type'].refs.select;

      assert.equal(selectField.value, 'metric');
    });
  });

  describe('export to csv', () => {
    it('exports to csv chart data', () => {
      this.component.exportToCsv([['column1', 'column2'], ['row1 value 1', 'row2 value2']]);
      sinon.assert.called(this.exportToCsvStub);
    });
  });

});
