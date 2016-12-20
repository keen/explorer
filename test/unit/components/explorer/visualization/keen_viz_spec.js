/** @jsx React.DOM */
var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');
var React = require('react');
var ReactDOM = require('react-dom');
var KeenViz = require('../../../../../client/js/app/components/explorer/visualization/keen_viz.js');
var TestUtils = require('react-addons-test-utils');
var ExplorerUtils = require('../../../../../client/js/app/utils/ExplorerUtils');
var TestHelpers = require('../../../../support/TestHelpers');
var $R = require('rquery')(_, React, ReactDOM, TestUtils);

describe('components/explorer/visualization/keen_viz', function() {

  beforeEach(function() {
    this.model = TestHelpers.createExplorerModel();
    this.dataviz = TestHelpers.createDataviz();
    this.exportToCsv = function() { return this; }
    this.component = TestUtils.renderIntoDocument(<KeenViz model={this.model} dataviz={this.dataviz} exportToCsv={this.exportToCsv}/>);
    this.exportToCsvStub = sinon.stub(this, 'exportToCsv');
  });

  describe('export to csv button', function() {
    it('export to csv button is not shown when chart type is different than table', function() {
    	assert.lengthOf($R(this.component).find('[role="export-table"]').components, 0);
    });
    it('export to csv button is shown when char type table is selected', function() {
      this.model.metadata.visualization.chart_type = 'table';
      this.component = TestUtils.renderIntoDocument(<KeenViz model={this.model} dataviz={this.dataviz} exportToCsv={this.exportToCsv}/>);
      assert.lengthOf($R(this.component).find('[role="export-table"]').components, 1);
    });
    it('export to csv button calls export to csv function', function() {
      this.model.metadata.visualization.chart_type = 'table';
      this.component = TestUtils.renderIntoDocument(<KeenViz model={this.model} dataviz={this.dataviz} exportToCsv={this.exportToCsv}/>);
      TestUtils.Simulate.click($R(this.component).find('[role="export-table"]').components[0]);
      sinon.assert.called(this.exportToCsvStub);
    });
  });
});
