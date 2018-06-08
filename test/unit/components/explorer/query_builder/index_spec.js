import _ from 'lodash';
import KeenAnalysis from 'keen-analysis';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import rquery from 'rquery';

import TestHelpers from '../../../../support/TestHelpers';
import QueryBuilder from '../../../../../lib/js/app/components/explorer/query_builder/index.js';
import GroupByField from '../../../../../lib/js/app/components/explorer/query_builder/group_by_field.js';
import SelectField from '../../../../../lib/js/app/components/explorer/query_builder/select_field.js';
import Timeframe from '../../../../../lib/js/app/components/common/timeframe.js';
import Interval from '../../../../../lib/js/app/components/common/interval.js';
import ExplorerActions from '../../../../../lib/js/app/actions/ExplorerActions';
import Input from '../../../../../lib/js/app/components/common/select.js';
import ExtractionOptions from '../../../../../lib/js/app/components/explorer/query_builder/extraction_options.js';
import ReactSelect from '../../../../../lib/js/app/components/common/react_select.js';

const $R = rquery(_, React, ReactDOM, TestUtils);

describe('components/explorer/query_builder/index', () => {
  let model;
  let client;
  let project;
  let component;
  let renderComponent;
  beforeEach(() => {
    model = TestHelpers.createExplorerModel();
    model.id = 10;
    model.active = true;
    client = new KeenAnalysis(TestHelpers.createClient());
    project = TestHelpers.createProject();

    renderComponent = (props) => {
      const defaults = {
        project: project,
        model: model,
        client: client,
        getEventPropertyNames: () => {}
      };
      const propsExt = _.assign({}, defaults, props);
      return TestUtils.renderIntoDocument(<QueryBuilder {...propsExt} />);
    }

    component = renderComponent();
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, QueryBuilder)).toBe(true);
    });

    it('has a single Timeframe child component', () => {
      expect(TestUtils.findRenderedComponentWithType(component, Timeframe)).not.toBe(null);
    });

    it('has one Interval component', () => {
      expect(TestUtils.scryRenderedComponentsWithType(component, Interval)).toHaveLength(1);
    });

    it('has zero Interval components if the analysis_type is extraction', () => {
      model.query.analysis_type = 'extraction';
      let props = _.assign({}, component.props, { model: model });
      component = TestHelpers.renderComponent(QueryBuilder, props);

      expect(TestUtils.scryRenderedComponentsWithType(component, Interval)).toHaveLength(0);
    });

    it('has the right number of ReactSelect child components', () => {
      expect(TestUtils.scryRenderedComponentsWithType(component, ReactSelect)).toHaveLength(4);
    });

    it('has the right number of ReactSelect child components when the analysis type is extraction', () => {
      model.query.analysis_type = 'extraction';
      component.forceUpdate();
      expect(TestUtils.scryRenderedComponentsWithType(component, ReactSelect)).toHaveLength(3);
    });

    it('has the clear button button', () => {
      expect($R(component).find('[role="clear-query"]').components).toHaveLength(1);
    });

    describe('button event bindings', () => {
      it('calls clearQuery when the clear query button is clicked', () => {
        const stub = jest.fn();
        component = renderComponent({ handleClearQuery: stub });
        TestUtils.Simulate.click($R(component).find('[role="clear-query"]').components[0]);
        expect(stub).toHaveBeenCalled();
      });
    });
  });

  describe('field change reactions', () => {
    describe('analysis-type', () => {
      describe('set to count', () => {
        it('does not show the target_property field', () => {
          model.query.event_collection = 'click';
          model.query.analysis_type = 'count';
          component.forceUpdate();
          expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'target-property')).toHaveLength(0);
        });
      });
      describe('set to anything but count', () => {
        it('shows the target_property field', () => {
          model.query.event_collection = 'click';
          model.query.analysis_type = 'sum';
          component.forceUpdate();
          expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'target-property')).toHaveLength(1);
        });
      });
      describe('analysis type is set to percentile', () => {
        it('shows the percentile input field', () => {
          model.query.event_collection = 'click';
          model.query.analysis_type = 'percentile';
          component.forceUpdate();
          expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'percentile')).toHaveLength(1);
        });
      });
      describe('analysis type is set to extraction', () => {
        it('shows the extraction options component', () => {
          model.query.event_collection = 'click';
          model.query.analysis_type = 'extraction';
          component.forceUpdate();
          expect(TestUtils.scryRenderedComponentsWithType(component, ExtractionOptions)).toHaveLength(1);
        });
      });
      describe('analysis type is not extraction', () => {
        it('does not show the extraction options component', () => {
          model.query.event_collection = 'click';
          model.query.analysis_type = 'count';
          component.forceUpdate();
          expect(TestUtils.scryRenderedComponentsWithType(component, ExtractionOptions)).toHaveLength(0);
        });
      });
    });

    describe('group_by', () => {

      describe('when event_collection is set', () => {

        it('there are group_by options', () => {
          const expectedOptions = ['one', 'two', 'three'];
          let props = _.extend({},
              component.props,
              { getEventPropertyNames: () => { return expectedOptions } }
          );
          model.query.event_collection = 'click';
          model.query.analysis_type = 'count';
          model.query.group_by = ['one'];
          component = TestHelpers.renderComponent(QueryBuilder, props);

          const groupByNode = $R(component).find('input[name="group_by.0"]').components[0];
          TestUtils.Simulate.focus(groupByNode);

          let groupByOptions = _.map(groupByNode.parentNode.childNodes[1].childNodes[1].childNodes, (node) => {
            return node.textContent;
          });
          groupByOptions = _.compact(groupByOptions);

          expect(expectedOptions).toEqual(expect.arrayContaining(groupByOptions));
        });

        it('when event_collection is set group_by has the options returned getEventPropertyNames', () => {
          const model = TestHelpers.createExplorerModel();
          model.query.event_collection = 'click';
          model.query.analysis_type = 'count';
          model.query.group_by = 'one';

          component = renderComponent({
            model,
            getEventPropertyNames: function(val) {
              if (val) return ['one', 'two'];
            }
          });

          const groupByComponent = TestUtils.findRenderedComponentWithType(component, GroupByField);
          expect(groupByComponent.props.options).toEqual(expect.arrayContaining(['one', 'two']));
        });

      });
    });

    describe('form submission', () => {
      it('calls handleQuerySubmit prop function when the form is submitted', () => {
        const submitStub = jest.fn();
        component = renderComponent({ handleQuerySubmit: submitStub });
        const formSubmitNode = TestUtils.findRenderedDOMComponentWithTag(component, 'form');
        TestUtils.Simulate.submit(formSubmitNode);
        expect(submitStub).toBeCalled();
      });
    });
  });

  describe('field change bindings', () => {
    let stub;
    beforeAll(() => {
      stub = jest.spyOn(ExplorerActions, 'update').mockImplementation(()=>{});
    });
    afterAll(() => {
      stub.mockRestore();
    });
    beforeEach(() => {
      stub.mockClear();
    });

    describe('event_collection', () => {
      it('tries to update the attribute when the field changes', () => {
        const node = $R(component).find('input[name="event_collection"]').components[0];
        node.value = 'clicks';
        TestUtils.Simulate.change(node);

        expect(stub.mock.calls[0][0]).toEqual(model.id);
        expect(stub.mock.calls[0][1]).toEqual({'query': {'event_collection': 'clicks'}});
      });
    });
    describe('analysis_type', () => {
      it('tries to update the attribute when the field changes', () => {
        const node = $R(component).find('input[name="analysis_type"]').components[0];
        node.value = 'count';
        TestUtils.Simulate.change(node);

        expect(stub.mock.calls[0][0]).toEqual(model.id);
        expect(stub.mock.calls[0][1]).toEqual({'query': {'analysis_type': 'count'}});
      });
    });
    describe('target_property', () => {
      it('tries to update the attribute when the field changes', () => {
        model.query.event_collection = 'clicks';
        model.query.analysis_type = 'sum';
        component.forceUpdate();

        const node = $R(component).find('input[name="target_property"]').components[0];
        node.value = 'target';
        TestUtils.Simulate.change(node);

        expect(stub.mock.calls[0][0]).toEqual(model.id);
        expect(stub.mock.calls[0][1]).toEqual({'query': {'target_property': 'target'}});
      });
    });
    describe('percentile', () => {
      it('tries to update the attribute when the field changes', () => {
        model.query.event_collection = 'clicks';
        model.query.analysis_type = 'percentile';
        component.forceUpdate();

        var node = $R(component).find('input[name="percentile"]').components[0];
        node.value = '10';
        TestUtils.Simulate.change(node);

        expect(stub.mock.calls[0][0]).toEqual(model.id);
        expect(stub.mock.calls[0][1]).toEqual({'query': {'percentile': '10'}});
      });
    });
    describe('group_by', () => {
      it('tries to update the attribute when the field changes', () => {
        model.query.event_collection = 'clicks';
        model.query.analysis_type = 'percentile';
        model.query.group_by = ['old_group_by_value'];
        component.forceUpdate();

        const node = $R(component).find('input[name="group_by.0"]').components[0];
        node.value = 'new_group_by_value';
        TestUtils.Simulate.change(node);

        expect(stub.mock.calls[0][0]).toEqual(model.id);
        expect(stub.mock.calls[0][1]).toEqual({'query': {'group_by': ['new_group_by_value']}});
      });
    });
  });

  describe('event_collection', () => {
    it('has the project events as dropdown options', () => {
      const project = TestHelpers.createProject();
      project.eventCollections = ['one', 'two'];
      component = renderComponent({ project });

      const eventCollectionComponent = TestUtils.scryRenderedComponentsWithType(component, SelectField)[1];
      expect(eventCollectionComponent.props.options).toEqual(expect.arrayContaining(['one', 'two']));
    });
  });

  describe('helper functions', () => {
    describe('shouldShowRevertButton', () => {
      it('should return true if the model and its original are different', () => {
        const model = TestHelpers.createExplorerModel();
        model.id = 'abc-123';
        model.query.event_collection = 'clicks';
        model.query.analysis_type = 'count';
        model.originalModel = _.cloneDeep(model);
        model.query.event_collection = 'not clicks';
        component = renderComponent({ model });
        expect(component.shouldShowRevertButton()).toBe(true);
      });
      it('should return false if the model and its original are the same', () => {
        const model = TestHelpers.createExplorerModel();
        model.id = 'abc-123';
        model.query.event_collection = 'clicks';
        model.query.analysis_type = 'count';
        model.originalModel = _.cloneDeep(model);
        component = renderComponent({ model: model });
        expect(component.shouldShowRevertButton()).toBe(false);
      });
    });
  });

});
