/** @jsx React.DOM */
var assert = require('chai').assert;
var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var Chart = require('../../../../../client/js/app/components/explorer/visualization/chart.js');
var React = require('react/addons');
var ExplorerUtils = require('../../../../../client/js/app/utils/ExplorerUtils');
var TestUtils = React.addons.TestUtils;
var TestHelpers = require('../../../../support/TestHelpers');

describe('components/explorer/visualization/chart', function() {

  beforeEach(function() {
    this.model = TestHelpers.createExplorerModel();
    this.dataviz = TestHelpers.createDataviz();
    this.component = TestUtils.renderIntoDocument(<Chart model={this.model} dataviz={this.dataviz} />);
  });

  describe('setup', function() {

    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Chart));
    });
    it('has a get started message when there is no query yet', function(){
      var message = "Let's go exploring!";
      assert.equal(this.component.refs.notice.getDOMNode().textContent, message);
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
          assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'alert-small'), 1);
        });

        it('for Table chart type', function(){
          this.model.visualization.chart_type = 'table';
          this.component.forceUpdate();
          assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'alert-small'), 1);
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
});