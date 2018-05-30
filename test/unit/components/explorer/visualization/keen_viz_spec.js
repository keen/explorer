
var expect from 'chai').expect;
let sinon from 'sinon/pkg/sinon.js');
import React from 'react';
var ReactDOM from 'react-dom');
var KeenViz from '../../../../../lib/js/app/components/explorer/visualization/keen_viz.js');
var TestUtils from 'react-addons-test-utils');
var ExplorerUtils from '../../../../../lib/js/app/utils/ExplorerUtils');
var TestHelpers from '../../../../support/TestHelpers');
var $R from 'rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/visualization/keen_viz', () => {

  beforeEach(() => {
    this.model = TestHelpers.createExplorerModel();
    this.dataviz = TestHelpers.createDataviz();
    this.exportToCsv = () => { return this; }
    this.component = TestUtils.renderIntoDocument(<KeenViz model={this.model} dataviz={this.dataviz} exportToCsv={this.exportToCsv}/>);
    this.exportToCsvStub = sinon.stub(this, 'exportToCsv');
  });

  describe('export to csv button', () => {
    it('export to csv button is not shown when chart type is different than table', () => {
    	assert.lengthOf($R(this.component).find('[role="export-table"]').components, 0);
    });
    it('export to csv button is shown when char type table is selected', () => {
      this.model.metadata.visualization.chart_type = 'table';
      this.component = TestUtils.renderIntoDocument(<KeenViz model={this.model} dataviz={this.dataviz} exportToCsv={this.exportToCsv}/>);
      assert.lengthOf($R(this.component).find('[role="export-table"]').components, 1);
    });
    it('export to csv button calls export to csv function', () => {
      this.model.metadata.visualization.chart_type = 'table';
      this.component = TestUtils.renderIntoDocument(<KeenViz model={this.model} dataviz={this.dataviz} exportToCsv={this.exportToCsv}/>);
      TestUtils.Simulate.click($R(this.component).find('[role="export-table"]').components[0]);
      sinon.assert.called(this.exportToCsvStub);
    });
  });
});
