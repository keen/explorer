let sinon from 'sinon/pkg/sinon.js');

var _ from 'lodash');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var $R from 'rquery')(_, React, ReactDOM, TestUtils);
var TestHelpers from '../../../support/TestHelpers.js');
var FilterManager from '../../../../lib/js/app/components/common/filter_manager.js');

function defaultProps() {
  return {
    eventCollection: null,
    filters: [],
    handleChange: sinon.stub(),
    removeFilter: sinon.stub(),
    addFilter: sinon.stub(),
    getPropertyType: sinon.stub().returns('String'),
    propertyNames: []
  };
}

describe('components/common/filter_manager', () => {
  it('has a message telling the user to choose an event collection is one is not set', () => {
    var component = TestHelpers.renderComponent(FilterManager, defaultProps());
    var message = 'Please select an Event Collection before making a filter.';

    assert.equal(message, TestUtils.findRenderedDOMComponentWithClass(component, 'no-filters-msg').textContent);
  });
  it("no longer shows the message when an event collection is set", () => {
    var component = TestHelpers.renderComponent(FilterManager, _.assign(defaultProps(), {
      eventCollection: 'click'
    }));
    assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(component, 'no-filters-msg'), 0);
  });
  it("has an add filter button when an event collection is set", () => {
    var component = TestHelpers.renderComponent(FilterManager, _.assign(defaultProps(), {
      eventCollection: 'click'
    }));
    assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(component, 'add-filter'), 1);
  });
  it('should call removeFilter with the correct filter index when the remove button is clicked', () => {
    var component = TestHelpers.renderComponent(FilterManager, _.assign(defaultProps(), {
      eventCollection: 'click',
      filters: [
        TestHelpers.createFilter(),
        TestHelpers.createFilter(),
        TestHelpers.createFilter()
      ]
    }));
    var node = $R(component).find('.remove-filter').components[1];
    TestUtils.Simulate.click(node);
    assert.isTrue(component.props.removeFilter.calledWith(1));
  });
});
