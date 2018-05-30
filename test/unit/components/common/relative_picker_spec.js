
var _ from 'lodash');
let sinon from 'sinon/pkg/sinon.js');
var RelativePicker from '../../../../lib/js/app/components/common/relative_picker.js');
var ProjectUtils from '../../../../lib/js/app/utils/ProjectUtils');
var ExplorerActions from '../../../../lib/js/app/actions/ExplorerActions');
import React from 'react';
var TestUtils from 'react-addons-test-utils');
var TestHelpers from '../../../support/TestHelpers');

describe('components/common/relative_picker', () => {
  before(() => {
    this.handleChangeStub = sinon.stub();
  });

  beforeEach(() => {
    this.handleChangeStub.reset();

    this.time = TestHelpers.createExplorerModel().query.time;

    var relativeIntervalTypes = ProjectUtils.getConstant('RELATIVE_INTERVAL_TYPES');

    this.component = TestUtils.renderIntoDocument(<RelativePicker intervalVisible={true}
                                                                  relativeIntervalTypes={relativeIntervalTypes}
                                                                  time={this.time}
                                                                  handleChange={this.handleChangeStub} />);
  });

  describe('setup', () => {
    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, RelativePicker));
    });
    it('has one input child component', () => {
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 1);
    });
  });

  describe('field change reactions', () => {
    describe('relativity', () => {
      it('sets the chosen relativity on the query', () => {
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
    describe('amount', () => {
      it('sets the amount on the query', () => {
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
    describe('sub_timeframe', () => {
      it('sets the chosen sub-timeframe on the query', () => {
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
    describe('relativity description', () => {
      it('is empty when no relative query params are set', () => {
        var props = _.assign({},
          this.component.props,
          {time: { relativity: '', amount: '', sub_timeframe: '' }}
        );
        this.component = TestHelpers.renderComponent(RelativePicker, props);

        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'help-block'), 0);
      });

      describe('when relativity is "this"', () => {
        beforeEach(() => {
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

        it('describes the set interval and relativity', () => {
          var descriptionNode = TestUtils.findRenderedDOMComponentWithClass(this.component, 'help-block');
          assert.equal(descriptionNode.textContent, 'The last 1 week including the current week.');
        });
      });

      describe('when relativity is not \'this\'', () => {
        it('describes the set interval and relativity', () => {
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
