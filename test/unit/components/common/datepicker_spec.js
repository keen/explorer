import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Datepicker from '../../../../lib/js/app/components/common/datepicker.js';
import TestHelpers from '../../../support/TestHelpers';

describe('components/common/datepicker', () => {
  let onSetStub;
  let component;
  beforeAll(() => {
    onSetStub = jest.fn();
    component = TestUtils.renderIntoDocument(<Datepicker name="Picker" onSet={onSetStub} />);
  });

  beforeEach(() => {
    onSetStub.mockClear();
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, Datepicker)).toBe(true);
    });
    it('has one input', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'input').length).toBe(1);
    });
  });

  describe('interactions', () => {
    it('should call the onSet prop function with the correct day', () => {
      var inputNode = component.refs.datepicker;
      TestUtils.Simulate.focus(inputNode);
      var dayNodes = $(ReactDOM.findDOMNode(component)).find('td[role="presentation"] div');
      var fifteenthDayNode;
      _.each(dayNodes, function(dayNode) {
        if (dayNode.textContent === '15') {
          fifteenthDayNode = dayNode;
        }
      });
      $(fifteenthDayNode).click();
      expect(onSetStub.mock.calls[0][1].getDate()).toBe(15);
    });
  });

});
