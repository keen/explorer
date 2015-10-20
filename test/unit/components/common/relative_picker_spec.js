/** @jsx React.DOM */
var assert = require('chai').assert;
var expect = require('chai').expect;
var _ = require('lodash');
var sinon = require('sinon');
var RelativePicker = require('../../../../client/js/app/components/common/relative_picker.js');
var ProjectUtils = require('../../../../client/js/app/utils/ProjectUtils');
var ExplorerActions = require('../../../../client/js/app/actions/ExplorerActions');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TestHelpers = require('../../../support/TestHelpers');

describe('components/common/relative_picker', function() {
  before(function () {
    this.handleChangeStub = sinon.stub();
  });

  beforeEach(function() {
    this.handleChangeStub.reset();

    this.time = TestHelpers.createExplorerModel().query.time;

    var relativeIntervalTypes = ProjectUtils.getConstant('RELATIVE_INTERVAL_TYPES');

    this.component = TestUtils.renderIntoDocument(<RelativePicker intervalVisible={true}
                                                                  relativeIntervalTypes={relativeIntervalTypes}
                                                                  time={this.time} 
                                                                  handleChange={this.handleChangeStub} />);
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, RelativePicker));
    });
    it('has one input child component', function(){
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 1);
    });
  });

  describe('field change reactions', function(){
    describe('relativity', function () {
      it('sets the chosen relativity on the query', function () {
        selectNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'relativity').getDOMNode().childNodes[0].childNodes[0];
        TestUtils.Simulate.change(selectNode, {
          target: {
            name: 'relativity',
            value: 'this'
          }
        });
        assert.deepPropertyVal(this.handleChangeStub.getCall(0).args[1], 'relativity', 'this');
      });
    });
    describe('amount', function () {
      it('sets the amount on the query', function () {
        var amountInput = TestUtils.findRenderedDOMComponentWithClass(this.component, 'amount').getDOMNode().childNodes[0];
        TestUtils.Simulate.change(amountInput, {
          target: {
            name: 'amount',
            value: '1'
          }
        });
        assert.deepPropertyVal(this.handleChangeStub.getCall(0).args[1], 'amount', '1');
      });
    });
    describe('sub_timeframe', function () {
      it('sets the chosen sub-timeframe on the query', function () {
        selectNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'sub-timeframe').getDOMNode().childNodes[0].childNodes[0];
        TestUtils.Simulate.change(selectNode, {
          target: {
            name: 'sub_timeframe',
            value: 'weeks'
          }
        });
        assert.deepPropertyVal(this.handleChangeStub.getCall(0).args[1], 'sub_timeframe', 'weeks');
      });
    });
    describe('relativity description', function () {
      it('is empty when no relative query params are set', function () {
        this.component.setProps({time: { relativity: '', amount: '', sub_timeframe: '' }});
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'help-block'), 0);
      });
      describe('when relativity is "this"', function () {
        beforeEach(function () {
          this.component.setProps({
            time: {
              relativity: 'this',
              amount: '1',
              sub_timeframe: 'weeks'
            }
          });
          this.component.forceUpdate();
        });
        it('describes the set interval and relativity', function () {
          var descriptionNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'help-block').getDOMNode();
          assert.equal(descriptionNode.textContent, 'The last 1 week including the current week.');
        });
      });
      describe('when relativity is not \'this\'', function () {
        it('describes the set interval and relativity', function () {
          this.component.setProps({
            time: {
              relativity: 'previous',
              amount: '1',
              sub_timeframe: 'weeks'
            }
          });
          this.component.forceUpdate();
          var descriptionNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'help-block').getDOMNode();
          assert.equal(descriptionNode.textContent, 'The last 1 week excluding the current week.');
        });
      });
    });
  });
});
