var assert = require('chai').assert;
var _ = require('lodash');
let sinon = require('sinon/pkg/sinon.js');
var Chart = require('../../../../../client/js/app/components/explorer/visualization/chart.js');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var ExplorerUtils = require('../../../../../client/js/app/utils/ExplorerUtils');
var FormatUtils = require('../../../../../client/js/app/utils/FormatUtils');
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
      assert.equal(this.component.refs.notice.textContent, message);
    });
    it('shows the correct message about email extractions ', function () {
      this.model.query.analysis_type = 'extraction';
      this.model.query.email = 'someone@keen.io';
      this.model.response = { result: 10, success: true };
      this.component = TestUtils.renderIntoDocument(<Chart model={this.model} dataviz={this.dataviz} />);
      var message = "Email extractions don't have visualizations.";
      assert.equal(this.component.refs.notice.textContent, message);
    });
  });

  describe('JSON viz', function() {
    it('should only how the query result', function(){
      this.model.response = {
        query: { do_not: 'show_me' },
        result: 100
      };
      this.model.metadata.visualization.chart_type = 'json';
      this.component = TestUtils.renderIntoDocument(<Chart model={this.model} dataviz={this.dataviz} />);
      assert.strictEqual(this.component.refs.jsonViz.textContent, FormatUtils.prettyPrintJSON({ result: 100}));
    });
  });
});
