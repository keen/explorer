
import  _ from 'lodash';
import ProjectUtils from '../../../../lib/js/app/utils/ProjectUtils.js';
import Filter from '../../../../lib/js/app/components/common/filter.js';
import Geo from '../../../../lib/js/app/components/common/geo.js';
import Select from '../../../../lib/js/app/components/common/select.js';
import ReactSelect from '../../../../lib/js/app/components/common/react_select.js';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TestHelpers from '../../../support/TestHelpers';
import rquery from 'rquery';
const $R = rquery(_, React, ReactDOM, TestUtils);

describe('components/common/filter', () => {
  let handleChangeStub;
  let removeFilterStub;
  let defaultProps;
  let renderComponent;
  let getSelectOptions;
  let component;

  beforeEach(() => {
    handleChangeStub = jest.fn();
    removeFilterStub = jest.fn();

    defaultProps = {
      key: 0,
      index: 0,
      filter: {
        property_name: 'name',
        operator: 'eq',
        property_value: 'value',
        coercion_type: 'String',
        isValid: true,
        errors: []
      },
      propertyType: 'String',
      eventCollection: 'click',
      propertyNames: [
        'one',
        'two'
      ],
      handleChange: handleChangeStub,
      removeFilter: removeFilterStub,
      filterOperators: ProjectUtils.getConstant('FILTER_OPERATORS')
    };

    renderComponent = (props) => {
      const propsExtended = _.assign({}, defaultProps, props);
      return TestUtils.renderIntoDocument(<Filter {...propsExtended} />);
    }

    component = renderComponent();

    // TODO: Remove
    getSelectOptions = (selectClass, activeOnly = false) => {
      const operatorSelect = TestUtils.findRenderedDOMComponentWithClass(component, selectClass).childNodes[0];
      const operators = _.map(operatorSelect.childNodes[0].childNodes, function(node){
        if (!activeOnly) {
          return node.value;
        } else if (activeOnly && !node.disabled) {
          return node.value;
        }
      });
      return _.compact(operators);
    };
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, Filter)).toBe(true);
    });

    describe('has the right empty form fields by default', () => {
      it ('has the right number of typeaheads', () => {
        expect(TestUtils.scryRenderedComponentsWithType(component, ReactSelect).length).toBe(1);
      });

      it ('has the right number of inputs', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'property-value').length).toBe(1);
      });

      it ('has the right number of selects', () => {
        expect(TestUtils.scryRenderedComponentsWithType(component, Select).length).toBe(2);
      });
    });
  });

  it('only shows "Boolean" coercion type when the operator is "exists"', () => {
    const props = {
      filter: {
        property_name: 'name',
        operator: 'exists',
        property_value: 'true',
        coercion_type: 'Boolean',
        isValid: true,
        errors: []
      }
    };
    component = renderComponent(props);
    const selectNode = $R(component).find('select').components[1];
    let options = _.map(selectNode.childNodes, function(node) {
      return node.value;
    });
    options = _.compact(options);

    options.forEach(option => {
      expect(option).toBe('Boolean');
    });

  });
});
