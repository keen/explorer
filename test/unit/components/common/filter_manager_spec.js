var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $R = require('rquery')(_, React, ReactDOM, TestUtils);
var TestHelpers = require('../../../support/TestHelpers.js');
var FilterManager = require('../../../../client/js/app/components/common/filter_manager.js');

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

describe('components/common/filter_manager', function() {
  it('has a message telling the user to choose an event collection is one is not set', function(){
    var component = TestHelpers.renderComponent(FilterManager, defaultProps());
    var message = 'Please select an Event Collection before making a filter.';

    assert.equal(message, TestUtils.findRenderedDOMComponentWithClass(component, 'no-filters-msg').textContent);
  });
  it("no longer shows the message when an event collection is set", function() {
    var component = TestHelpers.renderComponent(FilterManager, _.assign(defaultProps(), {
      eventCollection: 'click'
    }));
    assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(component, 'no-filters-msg'), 0);
  });
  it("has an add filter button when an event collection is set", function() {
    var component = TestHelpers.renderComponent(FilterManager, _.assign(defaultProps(), {
      eventCollection: 'click'
    }));
    assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(component, 'add-filter'), 1);
  });
  it('should call removeFilter with the correct filter index when the remove button is clicked', function () {
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
