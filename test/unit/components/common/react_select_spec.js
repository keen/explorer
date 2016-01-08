/** @jsx React.DOM */
var assert = require('chai').assert;
var sinon = require('sinon');
var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
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
      var propsStep1 = _.assign({}, this.component.props, { items: ['ONE', 'TWO', 'THREE'], value: 'one' });
      this.component = TestHelpers.renderComponent(ReactSelect, propsStep1);
      this.component.setState({ initialFocus: false });

      TestUtils.Simulate.focus(this.component.refs.input);
      TestUtils.Simulate.change(this.component.refs.input);

      var listItems = _.map(ReactDOM.findDOMNode(this.component.refs.list).childNodes, function(item) {
        return item.textContent;
      });
      assert.sameMembers(listItems, ['ONE']);
    });
  });
});
