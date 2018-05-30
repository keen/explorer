
var _ from 'lodash');
let sinon from 'sinon/pkg/sinon.js');
var Chart from '../../../../../lib/js/app/components/explorer/visualization/chart.js');
import React from 'react';
var TestUtils from 'react-addons-test-utils');
var ExplorerUtils from '../../../../../lib/js/app/utils/ExplorerUtils');
var FormatUtils from '../../../../../lib/js/app/utils/FormatUtils');
var TestHelpers from '../../../../support/TestHelpers');

describe('components/explorer/visualization/chart', () => {

  beforeEach(() => {
    this.model = TestHelpers.createExplorerModel();
    this.dataviz = TestHelpers.createDataviz();
    this.component = TestUtils.renderIntoDocument(<Chart model={this.model} dataviz={this.dataviz} />);
  });

  describe('setup', () => {
    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Chart));
    });
    it('has a get started message when there is no query yet', () => {
      var message = "Let's go exploring!";
      assert.equal(this.component.refs.notice.textContent, message);
    });
    it('shows the correct message about email extractions ', () => {
      this.model.query.analysis_type = 'extraction';
      this.model.query.email = 'someone@keen.io';
      this.model.response = { result: 10, success: true };
      this.component = TestUtils.renderIntoDocument(<Chart model={this.model} dataviz={this.dataviz} />);
      var message = "Email extractions don't have visualizations.";
      assert.equal(this.component.refs.notice.textContent, message);
    });
  });

  describe('JSON viz', () => {
    it('should only show the query result', () => {
      this.model.response = {
        query: { do_not: 'show_me' },
        result: 100
      };
      this.model.metadata.visualization.chart_type = 'json';
      this.component = TestUtils.renderIntoDocument(<Chart model={this.model} dataviz={this.dataviz} />);
      assert.strictEqual(this.component.refs.jsonViz.textContent, FormatUtils.prettyPrintJSON({ result: 100 }));
    });
    it('should also show the actors property if present in the response', () => {
      this.model.response = {
        query: { do_not: 'show_me' },
        result: 100,
        actors: ['a', 'b', 'c']
      };
      this.model.metadata.visualization.chart_type = 'json';
      this.component = TestUtils.renderIntoDocument(<Chart model={this.model} dataviz={this.dataviz} />);
      assert.strictEqual(this.component.refs.jsonViz.textContent, FormatUtils.prettyPrintJSON({ result: 100, actors: ['a', 'b', 'c'] }));
    });
  });
});
