/** @jsx React.DOM */
var assert = require('chai').assert;
var _ = require('lodash');
var sinon = require('sinon');
var RelativePicker = require('../../../../client/js/app/components/common/relative_picker.js');
var ProjectUtils = require('../../../../client/js/app/utils/ProjectUtils');
var ExplorerActions = require('../../../../client/js/app/actions/ExplorerActions');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
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
        selectNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'relativity').childNodes[0].childNodes[0];
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
        var amountInput = TestUtils.findRenderedDOMComponentWithClass(this.component, 'amount').childNodes[0];
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
        selectNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'sub-timeframe').childNodes[0].childNodes[0];
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
        var props = _.assign({},
          this.component.props,
          {time: { relativity: '', amount: '', sub_timeframe: '' }}
        );
        this.component = TestHelpers.renderComponent(RelativePicker, props);

        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'help-block'), 0);
      });

      describe('when relativity is "this"', function () {
        beforeEach(function () {
          var props = _.assign({},
            this.component.props,
            {
              time: {
                relativity: 'this',
                amount: '1',
                sub_timeframe: 'weeks'
              }
            }
          );
          this.component = TestHelpers.renderComponent(RelativePicker, props);
        });

        it('describes the set interval and relativity', function () {
          var descriptionNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'help-block');
          assert.equal(descriptionNode.textContent, 'The last 1 week including the current week.');
        });
      });

      describe('when relativity is not \'this\'', function () {
        it('describes the set interval and relativity', function () {
          var props = _.assign({},
            this.component.props,
            {
              time: {
                relativity: 'previous',
                amount: '1',
                sub_timeframe: 'weeks'
              }
            }
          );
          this.component = TestHelpers.renderComponent(RelativePicker, props);
          var descriptionNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'help-block');

          assert.equal(descriptionNode.textContent, 'The last 1 week excluding the current week.');
        });
      });
    });
  });
});
