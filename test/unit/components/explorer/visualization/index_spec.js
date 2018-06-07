import _ from 'lodash';
import KeenAnalysis from 'keen-analysis';
import KeenDataviz from 'keen-dataviz';
import Visualization from '../../../../../lib/js/app/components/explorer/visualization/index.js';
import Chart from '../../../../../lib/js/app/components/explorer/visualization/chart.js';
import AppDispatcher from '../../../../../lib/js/app/dispatcher/AppDispatcher';
import AppStateStore from '../../../../../lib/js/app/stores/AppStateStore';
import ExplorerUtils from '../../../../../lib/js/app/utils/ExplorerUtils';
import ChartTypeUtils from '../../../../../lib/js/app/utils/ChartTypeUtils';
import DataUtils from '../../../../../lib/js/app/utils/DataUtils';
import ExplorerConstants from '../../../../../lib/js/app/constants/ExplorerConstants';
import ExplorerActions from '../../../../../lib/js/app/actions/ExplorerActions';
import NoticeActions from '../../../../../lib/js/app/actions/NoticeActions';
import TestHelpers from '../../../../support/TestHelpers';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import rquery from 'rquery';

const $R = rquery(_, React, ReactDOM, TestUtils);

describe('components/explorer/visualization/index', () => {
  let client;
  let model;
  let project;
  let chartOptionsStub;
  let exportToCsvStub;
  let renderComponent;
  let component;
  let getOptionsFromComponent;

  beforeEach(() => {
    client = new KeenAnalysis(TestHelpers.createClient());
    model = TestHelpers.createExplorerModel();
    model.id = 10;
    project = TestHelpers.createProject();
    const datavizStub = jest.spyOn(KeenDataviz, 'Dataviz').mockImplementation(()=>{}).mockReturnValue(TestHelpers.createDataviz());
    chartOptionsStub = jest.spyOn(ChartTypeUtils, 'getChartTypeOptions').mockImplementation(()=>{}).mockReturnValue([]);
    exportToCsvStub = jest.spyOn(DataUtils, 'exportToCsv').mockImplementation(()=>{}).mockReturnValue([]);

    renderComponent = function(props) {
      const defaults = {
        client,
        model,
        project,
        persistence: null,
        appState: AppStateStore.getState()
      };
      const propsExt = _.assign({}, defaults, props);
      return TestUtils.renderIntoDocument(<Visualization {...propsExt} />);
    };

    component = renderComponent();

    getOptionsFromComponent = function(component) {
      const chartTypeSelect = component.refs['chart-type'].refs.select;
      const optionNodes = chartTypeSelect.childNodes;
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
      expect(TestUtils.isCompositeComponentWithType(component, Visualization)).toBe(true);
    });
    it('has one chart child component', () => {
      expect(TestUtils.scryRenderedComponentsWithType(component, Chart)).toHaveLength(1);
    });

    describe('without persistence', () => {
      it('should not show the Save/Update button', () => {
        expect($R(component).find('[role="save-query"]').components).toHaveLength(0);
      });
    });
  });

  describe('chart types select', () => {
    describe('populates with the right chart types based on the dataviz capabilities', () => {
      it('basic options', () => {
        model.result = 50;
        chartOptionsStub.returns([
          'metric',
          'JSON'
        ]);
        component.forceUpdate();
        const options = getOptionsFromComponent(component);
        expect().sameMembers(options, ['JSON', 'Metric']);
      });
    });

    it('is not disabled when the model is not loading', () => {
      model.result = 50;
      model.loading = false;
      component.forceUpdate();
      expect().isFalse(component.refs['chart-type'].refs.select.disabled);
    });

    it('is disabled when the model is actively loading', () => {
      model.loading = true;
      component.forceUpdate();
      expect().isTrue(component.refs['chart-type'].refs.select.disabled);
    });

  });

  describe('default chart type', () => {
    it('renders a default chart type if there is no metadata.visualization object', () => {
      chartOptionsStub.returns([
          'metric',
          'JSON'
      ]);

      component.forceUpdate();
      const selectField = component.refs['chart-type'].refs.select;

      expect().equal(selectField.value, 'metric');
    });
  });

  describe('export to csv', () => {
    it('exports to csv chart data', () => {
      component.exportToCsv([['column1', 'column2'], ['row1 value 1', 'row2 value2']]);
      sinon.expect().called(exportToCsvStub);
    });
  });

});
