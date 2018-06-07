import _ from 'lodash';
import Chart from '../../../../../lib/js/app/components/explorer/visualization/chart.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ExplorerUtils from '../../../../../lib/js/app/utils/ExplorerUtils';
import FormatUtils from '../../../../../lib/js/app/utils/FormatUtils';
import TestHelpers from '../../../../support/TestHelpers';

describe('components/explorer/visualization/chart', () => {
  let model;
  let dataviz;
  let component;

  beforeEach(() => {
    model = TestHelpers.createExplorerModel();
    dataviz = TestHelpers.createDataviz();
    component = TestUtils.renderIntoDocument(<Chart model={model} dataviz={dataviz} />);
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, Chart)).toBe(true);
    });
    it('has a get started message when there is no query yet', () => {
      var message = "Let's go exploring!";
      expect(component.refs.notice.textContent).toEqual(message);
    });
    it('shows the correct message about email extractions ', () => {
      model.query.analysis_type = 'extraction';
      model.query.email = 'someone@keen.io';
      model.response = { result: 10, success: true };
      component = TestUtils.renderIntoDocument(<Chart model={model} dataviz={dataviz} />);
      var message = "Email extractions don't have visualizations.";
      expect(component.refs.notice.textContent).toEqual(message);
    });
  });

  describe('JSON viz', () => {
    it('should only show the query result', () => {
      model.response = {
        query: { do_not: 'show_me' },
        result: 100
      };
      model.metadata.visualization.chart_type = 'json';
      component = TestUtils.renderIntoDocument(<Chart model={model} dataviz={dataviz} />);
      expect(component.refs.jsonViz.textContent).toEqual(FormatUtils.prettyPrintJSON({ result: 100 }));
    });
    it('should also show the actors property if present in the response', () => {
      model.response = {
        query: { do_not: 'show_me' },
        result: 100,
        actors: ['a', 'b', 'c']
      };
      model.metadata.visualization.chart_type = 'json';
      component = TestUtils.renderIntoDocument(<Chart model={model} dataviz={dataviz} />);
      expect(component.refs.jsonViz.textContent).toEqual(FormatUtils.prettyPrintJSON({ result: 100, actors: ['a', 'b', 'c'] }));
    });
  });
});
