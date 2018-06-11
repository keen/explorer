import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import rquery from 'rquery';
import _ from 'lodash';

import KeenViz from '../../../../../lib/js/app/components/explorer/visualization/keen_viz.js';

import ExplorerUtils from '../../../../../lib/js/app/utils/ExplorerUtils';
import TestHelpers from '../../../../support/TestHelpers';

const $R = rquery(_, React, ReactDOM, TestUtils);

describe('components/explorer/visualization/keen_viz', () => {
  let model;
  let dataviz;
  let exportToCsv;
  let exportToCsvStub;
  let component;

  beforeEach(() => {
    model = TestHelpers.createExplorerModel();
    dataviz = TestHelpers.createDataviz();
    exportToCsv = jest.fn();
    component = TestUtils.renderIntoDocument(<KeenViz model={model} dataviz={dataviz} exportToCsv={exportToCsv}/>);
    exportToCsvStub = jest.fn();
  });

  describe('export to csv button', () => {
    it('export to csv button is not shown when chart type is different than table', () => {
    	expect($R(component).find('[role="export-table"]').components).toHaveLength(0);
    });
    it('export to csv button is shown when char type table is selected', () => {
      model.metadata.visualization.chart_type = 'table';
      component = TestUtils.renderIntoDocument(<KeenViz model={model} dataviz={dataviz} exportToCsv={exportToCsv}/>);
      expect($R(component).find('[role="export-table"]').components).toHaveLength(1);
    });
    it('export to csv button calls export to csv function', () => {
      model.metadata.visualization.chart_type = 'table';
      component = TestUtils.renderIntoDocument(<KeenViz model={model} dataviz={dataviz} exportToCsv={exportToCsv}/>);
      TestUtils.Simulate.click($R(component).find('[role="export-table"]').components[0]);
      expect(exportToCsv).toBeCalled();
    });
  });
});
