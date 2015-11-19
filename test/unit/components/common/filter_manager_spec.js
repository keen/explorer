/** @jsx React.DOM */
var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TestHelpers = require('../../../support/TestHelpers.js');
var FilterManager = require('../../../../client/js/app/components/common/filter_manager.js');

describe('components/common/filter_manager', function() {

  beforeEach(function() {
    this.handleChangeStub = sinon.stub();
    this.removeFilterStub = sinon.stub();
    this.addFilterStub = sinon.stub();
    this.getPropertyType = function(){ return 'String'; };

    var defaultProps = {
      eventCollection: null,
      filters: [],
      handleChange: this.handleChangeStub,
      removeFilter: this.removeFilterStub,
      addFilter: this.addFilterStub,
      getPropertyType: this.getPropertyType,
      propertyNames: []
    };
    this.renderComponent = function(props) {
      var props = _.assign({}, defaultProps, props);
      return TestUtils.renderIntoDocument(<FilterManager {...props} />);
    }
    this.component = this.renderComponent();
  });

  it('has a message telling the user to choose an event collection is one is not set', function(){
    var message = 'Please select an Event Collection before making a filter.';
    assert.equal(message, TestUtils.findRenderedDOMComponentWithClass(this.component, 'no-filters-msg').getDOMNode().textContent);
  });
  it("no longer shows the message when an event collection is set", function() {
    this.component = this.renderComponent({ eventCollection: 'click' });
    assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'no-filters-msg'), 0);
  });
  it("has an add filter button when an event collection is set", function() {
    this.component = this.renderComponent({ eventCollection: 'click' });
    assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'add-filter'), 1);
  });
});