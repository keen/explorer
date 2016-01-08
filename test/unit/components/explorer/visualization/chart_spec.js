/** @jsx React.DOM */
var assert = require('chai').assert;
var _ = require('lodash');
var sinon = require('sinon');
var Chart = require('../../../../../client/js/app/components/explorer/visualization/chart.js');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var ExplorerUtils = require('../../../../../client/js/app/utils/ExplorerUtils');
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
});
