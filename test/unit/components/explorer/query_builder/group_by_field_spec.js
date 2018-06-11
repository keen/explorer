import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import rquery from 'rquery';

import GroupByField from '../../../../../lib/js/app/components/explorer/query_builder/group_by_field.js';
import TestHelpers from '../../../../../test/support/TestHelpers';

const $R = rquery(_, React, ReactDOM, TestUtils);

describe('components/explorer/query_builder/group_by_field', () => {
  let handleChangeStub;
  let defaultProps;
  let renderComponent;
  let component;

  beforeEach(() => {
    handleChangeStub = jest.fn();
    defaultProps = {
      handleChange: handleChangeStub,
      value: ['one']
    };
    renderComponent = function(props) {
      let propsExt = _.assign({}, defaultProps, props);
      return TestUtils.renderIntoDocument(<GroupByField {...propsExt} />);
    };
    component = renderComponent();
  });

  describe('with a single group by', () => {
    it('shows one input', () => {
      expect($R(component).find('.group-by').components).toHaveLength(1);
    });
    it('shows the correct toggle button text', () => {
      expect($R(component).find('a').components[1].text).toEqual("Group by a second property");
    });
  });
  describe('with a double group by', () => {
    beforeEach(() => {
      component = renderComponent({
        value: ['one', 'two']
      });
    })
    it('shows two inputs', () => {
      expect($R(component).find('.group-by').components).toHaveLength(2);
    });
    it('shows the correct toggle button text', () => {
      expect($R(component).find('a').components[1].text).toEqual("Remove second property");
    });
  });
  describe('toggle link', () => {
    it('should call props.handleChange with an empty string array value at index 1 if the value is an empty array', () => {
      component = renderComponent({
        value: []
      });
      TestUtils.Simulate.click($R(component).find('a').components[1]);
      expect(handleChangeStub.mock.calls[0][1]).toEqual(['', '']);
    });
    it('should call props.handleChange with an empty string array value at index 1 if there is only one group by', () => {
      component = renderComponent({
        value: ['one']
      });
      TestUtils.Simulate.click($R(component).find('a').components[1]);
      expect(handleChangeStub.mock.calls[0][1]).toEqual(['one', '']);
    });
    it('should call props.handleChange with a single item array if there is two values', () => {
      component = renderComponent({
        value: ['one', 'two']
      });
      TestUtils.Simulate.click($R(component).find('a').components[1]);
      expect(handleChangeStub.mock.calls[0][1]).toEqual(['one']);
    });
  });
});
