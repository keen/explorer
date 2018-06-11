import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import FilterValueFields from '../../../../lib/js/app/components/common/filter_value_fields.js';
import Geo from '../../../../lib/js/app/components/common/geo.js';
import Datepicker from '../../../../lib/js/app/components/common/datepicker.js';
import ProjectUtils from '../../../../lib/js/app/utils/ProjectUtils.js';
import Select from '../../../../lib/js/app/components/common/select.js';
import TestHelpers from '../../../support/TestHelpers';

const datetimeFormat = 'll h:mm A';

describe('components/common/filter_value_fields', () => {
  let project;
  let model;
  let handleChangeStub;
  let operators;
  let filter;
  let index;
  let component;

  beforeEach(() => {
    project = TestHelpers.createProject();
    model = TestHelpers.createExplorerModel();;
    model.event_collection = 'click';
    handleChangeStub = jest.fn();
    operators = ProjectUtils.getConstant('FILTER_OPERATORS');
    filter = {
      property_name: 'propOne',
      operator: 'eq',
      property_value: 'abc',
      coercion_type: 'String'
    };
    index = 0;

    component = TestUtils.renderIntoDocument(<FilterValueFields filter={filter}
                                                                     filterOperators={operators}
                                                                     handleChange={handleChangeStub} />);
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, FilterValueFields)).toBe(true);
    });

    describe('Datetime', () => {
      beforeEach(() => {
        filter.coercion_type = 'Datetime';
        filter.property_value = 'May 15, 2015 10:00 AM';
        const props = _.assign({}, component.props, {filter: filter});
        component = TestHelpers.renderComponent(FilterValueFields, props);
      });

      it('has a Datetime component', () => {
        expect(TestUtils.scryRenderedComponentsWithType(component, Datepicker)).toHaveLength(1);
      });

      describe('Setting values datetime values', () => {
        it('properly sets the property_value from the date picker', () => {
          component.refs['date-value-input'].refs.datepicker.value = 'Jan 1, 2015';
          TestUtils.Simulate.blur(component.refs['date-value-input'].refs.datepicker);
          expect(moment(handleChangeStub.mock.calls[0][1]).format(datetimeFormat)).toEqual(
            "Jan 1, 2015 10:00 AM"
          );
        });
        it('properly sets the properly_value from the time picker', () => {
          var inputNode = component.refs['time-value-input'].refs.timepicker.refs.input;
          TestUtils.Simulate.focus(inputNode);
          inputNode.value = '03:47 PM';
          TestUtils.Simulate.blur(inputNode);
          expect(moment(handleChangeStub.mock.calls[0][1]).format(datetimeFormat)).toEqual(
            "May 15, 2015 3:47 PM"
          );
        });
      });
    });

    describe('Boolean', () => {
      beforeEach(() => {
        const props = _.assign({}, component.props, { filter: { coercion_type: 'Boolean' } });
        component = TestHelpers.renderComponent(FilterValueFields, props);
      });

      it('has a Select component', () => {
        expect(TestUtils.scryRenderedComponentsWithType(component, Select)).toHaveLength(2);
      });

      it('has no input tags', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')).toHaveLength(0);
      });
    });

    describe('Null', () => {
      beforeEach(() => {
        const props = _.assign({}, component.props, { filter: { coercion_type: 'Null' } });
        component = TestHelpers.renderComponent(FilterValueFields, props);
      });

      it('has one input', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')).toHaveLength(1);
      });

      it('has a readonly input', () => {
        const input = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')[0];
        expect(input.readOnly).toBe(true);
      });

      it('the input value has a placeholder of \'null\'', () => {
        const input = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')[0];
        expect(input.placeholder).toBe('Null');
      });
    });

    describe('Geo', () => {
      let getPropertyTypeStub;
      beforeEach(() => {
        const props = _.assign({}, component.props, { filter: {
          property_name: 'geoProp',
          coercion_type: 'Geo',
          operator: 'within',
          property_value: {
            coordinates: [],
            max_distance_miles: null
          }
        }});
        component = TestHelpers.renderComponent(FilterValueFields, props);
        getPropertyTypeStub = jest.spyOn(ProjectUtils, 'getPropertyType').mockImplementation(() => {});
      });

      afterEach(() => {
        getPropertyTypeStub.mockRestore();
      });

      it('has a Geo component', () => {
        expect(TestUtils.scryRenderedComponentsWithType(component, Geo)).toHaveLength(1);
      });

      it('has 3 inputs for geo-location query data', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')).toHaveLength(3);
      });
    });

    describe('not Boolean or Datetime or Null', () => {
      beforeEach(() => {
        const props = _.assign({}, component.props, {
          filter: { coercion_type: 'String' }
        });
        component = TestHelpers.renderComponent(FilterValueFields, props);
      });

      it('does not have a Datetime component', () => {
        expect(TestUtils.scryRenderedComponentsWithType(component, Datepicker)).toHaveLength(0);
      });

      it('has one input', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')).toHaveLength(1);
      });

      it('has one select', () => {
        expect(TestUtils.scryRenderedComponentsWithType(component, Select)).toHaveLength(1);
      });
    });

    describe('available coercion types', () => {
      describe('when property type is not geo', () => {
        it('has all the coercion types', () => {
          const defaultCoercionOptions = ['String', 'Number', 'Null', 'List', 'Boolean', 'Datetime']

          const props = _.assign({}, component.props, {
            filter: { operator: 'eq' }
          });
          component = TestHelpers.renderComponent(FilterValueFields, props);

          const coercionTypeSelect = TestUtils.scryRenderedDOMComponentsWithTag(component, 'select')[0];
          let coercionOptions = _.map(coercionTypeSelect.childNodes, function(node){
            return node.value;
          });
          coercionOptions = _.compact(coercionOptions);

          expect(defaultCoercionOptions).toEqual(coercionOptions);
        });
      });
    });
    describe('available property value options when Boolean', () => {
      it('is true or false', () => {
        const props = _.assign({}, component.props, {
          filter: { operator: 'exists', coercion_type: 'Boolean' }
        });
        component = TestHelpers.renderComponent(FilterValueFields, props);

        const boolPropValueSelect = ReactDOM.findDOMNode(component.refs['boolean-value-set']).childNodes[0].childNodes[0];

        const boolPropValueSelectOptions = _.map(boolPropValueSelect.childNodes, function(node){
          return node.value;
        });
        const propertyValueOptions = _.compact(boolPropValueSelectOptions);

        expect(propertyValueOptions).toEqual(['false', 'true']);
      });
    });
  });
});
