
import _ from 'lodash';
import RelativePicker from '../../../../lib/js/app/components/common/relative_picker.js';
import ProjectUtils from '../../../../lib/js/app/utils/ProjectUtils';
import ExplorerActions from '../../../../lib/js/app/actions/ExplorerActions';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TestHelpers from '../../../support/TestHelpers';

describe('components/common/relative_picker', () => {
  let handleChangeStub;
  let time;
  let component;
  let selectNode;
  beforeAll(() => {
    handleChangeStub = jest.fn();
  });

  beforeEach(() => {
    handleChangeStub.mockClear();

    time = TestHelpers.createExplorerModel().query.time;

    const relativeIntervalTypes = ProjectUtils.getConstant('RELATIVE_INTERVAL_TYPES');

    component = TestUtils.renderIntoDocument(<RelativePicker intervalVisible={true}
                                                                  relativeIntervalTypes={relativeIntervalTypes}
                                                                  time={time}
                                                                  handleChange={handleChangeStub} />);
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, RelativePicker)).toBe(true);
    });
    it('has one input child component', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')).toHaveLength(1);
    });
  });

  describe('field change reactions', () => {
    describe('relativity', () => {
      it('sets the chosen relativity on the query', () => {
        selectNode = TestUtils.findRenderedDOMComponentWithClass(component, 'relativity').childNodes[0].childNodes[0];
        TestUtils.Simulate.change(selectNode, {
          target: {
            name: 'relativity',
            value: 'this'
          }
        });
        expect(handleChangeStub.mock.calls[0][1]).toMatchObject({'relativity':'this'});
      });
    });
    describe('amount', () => {
      it('sets the amount on the query', () => {
        const amountInput = TestUtils.findRenderedDOMComponentWithClass(component, 'amount').childNodes[0];
        TestUtils.Simulate.change(amountInput, {
          target: {
            name: 'amount',
            value: '1'
          }
        });
        expect(handleChangeStub.mock.calls[0][1]).toMatchObject({'amount':'1'});
      });
    });
    describe('sub_timeframe', () => {
      it('sets the chosen sub-timeframe on the query', () => {
        selectNode = TestUtils.findRenderedDOMComponentWithClass(component, 'sub-timeframe').childNodes[0].childNodes[0];
        TestUtils.Simulate.change(selectNode, {
          target: {
            name: 'sub_timeframe',
            value: 'weeks'
          }
        });
        expect(handleChangeStub.mock.calls[0][1]).toMatchObject({'sub_timeframe':'weeks'});
      });
    });
    describe('relativity description', () => {
      it('is empty when no relative query params are set', () => {
        const props = _.assign({},
          component.props,
          {time: { relativity: '', amount: '', sub_timeframe: '' }}
        );
        component = TestHelpers.renderComponent(RelativePicker, props);

        expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'help-block')).toHaveLength(0);
      });

      describe('when relativity is "this"', () => {
        beforeEach(() => {
          const props = _.assign({},
            component.props,
            {
              time: {
                relativity: 'this',
                amount: '1',
                sub_timeframe: 'weeks'
              }
            }
          );
          component = TestHelpers.renderComponent(RelativePicker, props);
        });

        it('describes the set interval and relativity', () => {
          const descriptionNode = TestUtils.findRenderedDOMComponentWithClass(component, 'help-block');
          expect(descriptionNode.textContent).toEqual('The last 1 week including the current week.');
        });
      });

      describe('when relativity is not \'this\'', () => {
        it('describes the set interval and relativity', () => {
          const props = _.assign({},
            component.props,
            {
              time: {
                relativity: 'previous',
                amount: '1',
                sub_timeframe: 'weeks'
              }
            }
          );
          component = TestHelpers.renderComponent(RelativePicker, props);
          const descriptionNode = TestUtils.findRenderedDOMComponentWithClass(component, 'help-block');

          expect(descriptionNode.textContent).toEqual('The last 1 week excluding the current week.');
        });
      });
    });
  });
});
