/** @jsx React.DOM */
var assert = require('chai').assert;
var sinon = require('sinon');
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var ReactSelect = require('../../../../client/js/app/components/common/react_select.js');
var TestHelpers = require('../../../support/TestHelpers');

describe('components/common/react_select', function() {
  before(function() {
    this.handleBlurStub = sinon.stub();
    this.handleChangeStub = sinon.stub();
    this.handleSelectionStub = sinon.stub();

    var props = {
      items: [],
      wrapClasses: '',
      inputClasses: '',
      placeholder: '',
      handleBlur: this.handleBlurStub,
      handleChange: this.handleChangeStub,
      handleSelection: this.handleSelectionStub
    };
    this.component = TestUtils.renderIntoDocument(<ReactSelect {...props} />);
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, ReactSelect));
    });
    it('has one input', function(){
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 1);
    });
  });

  describe('search', function () {
    it('searches for items case insensitive', function () {
      this.component.setProps({ items: ['ONE', 'TWO', 'THREE'] });
      this.component.setState({ initialFocus: false });
      TestUtils.Simulate.focus(this.component.refs.input.getDOMNode());
      TestUtils.Simulate.change(this.component.refs.input.getDOMNode());
      this.component.setProps({ value: 'one' });
      var listItems = _.map(this.component.refs.list.getDOMNode().childNodes, function(item) {
        return item.textContent;
      });
      assert.sameMembers(listItems, ['ONE']);
    });
  });
});