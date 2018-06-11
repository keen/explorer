import  _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import rquery from 'rquery';
import TestHelpers from '../../../support/TestHelpers.js';
import FilterManager from '../../../../lib/js/app/components/common/filter_manager.js';
const $R = rquery(_, React, ReactDOM, TestUtils);

function defaultProps() {
  return {
    eventCollection: null,
    filters: [],
    handleChange: jest.fn(),
    removeFilter: jest.fn(),
    addFilter: jest.fn(),
    getPropertyType: jest.fn().mockReturnValue('String'),
    propertyNames: []
  };
}

describe('components/common/filter_manager', () => {
  it('has a message telling the user to choose an event collection is one is not set', () => {
    const component = TestHelpers.renderComponent(FilterManager, defaultProps());
    const message = 'Please select an Event Collection before making a filter.';

    expect(message).toBe(TestUtils.findRenderedDOMComponentWithClass(component, 'no-filters-msg').textContent);
  });
  it("no longer shows the message when an event collection is set", () => {
    const component = TestHelpers.renderComponent(FilterManager, _.assign(defaultProps(), {
      eventCollection: 'click'
    }));
    expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'no-filters-msg').length).toBe(0);
  });
  it("has an add filter button when an event collection is set", () => {
    const component = TestHelpers.renderComponent(FilterManager, _.assign(defaultProps(), {
      eventCollection: 'click'
    }));
    expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'add-filter').length).toBe(1);
  });
  it('should call removeFilter with the correct filter index when the remove button is clicked', () => {
    const component = TestHelpers.renderComponent(FilterManager, _.assign(defaultProps(), {
      eventCollection: 'click',
      filters: [
        TestHelpers.createFilter(),
        TestHelpers.createFilter(),
        TestHelpers.createFilter()
      ]
    }));
    const node = $R(component).find('.remove-filter').components[1];
    TestUtils.Simulate.click(node);
    expect(component.props.removeFilter).toHaveBeenCalledTimes(1);
  });
});
