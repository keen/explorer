import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Timeframe from '../../../../lib/js/app/components/common/timeframe.js';
import Timezone from '../../../../lib/js/app/components/common/timezone.js';
import RelativePicker from '../../../../lib/js/app/components/common/relative_picker.js';
import AbsolutePicker from '../../../../lib/js/app/components/common/absolute_picker.js';
import ReactSelect from '../../../../lib/js/app/components/common/react_select.js';
import FieldsToggle from '../../../../lib/js/app/components/common/fields_toggle.js';
import ExplorerActions from '../../../../lib/js/app/actions/ExplorerActions';
import TestHelpers from '../../../support/TestHelpers';

describe('components/common/timeframe', () => {
  let handleChangeStub;
  let model;
  let project;
  let component;

  beforeAll(() => {
    handleChangeStub = jest.fn();
  });

  beforeEach(() => {
    handleChangeStub.mockClear();

    model = TestHelpers.createExplorerModel();
    project = TestHelpers.createProject();

    component = TestUtils.renderIntoDocument(<Timeframe time={model.query.time}
                                                             timezone={model.query.timezone}
                                                             handleChange={handleChangeStub} />
   )
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, Timeframe)).toBe(true);
    });

    it('has the relative tab selected by default', () => {
      const relativeTab = TestUtils.findRenderedDOMComponentWithTag(component, 'ul').childNodes[0];
      expect(relativeTab.classList.contains('active')).toBe(true);
    });

    it('has the relative picker shown by default', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'relative-timeframe-picker')).toHaveLength(1);
      expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'absolute-timeframe-picker')).toHaveLength(0);
    });

    it('has one Timezone component', () => {
      expect(TestUtils.scryRenderedComponentsWithType(component, Timezone)).toHaveLength(1);
    });
  });

  describe('interactions', () => {

    describe('absolute_picker', () => {
      it('clicking the absolute tab updates the model to an absolute timeframe', () => {
        const absoluteTimeframeLink = TestUtils.findRenderedDOMComponentWithClass(component, 'absolute-tab');
        TestUtils.Simulate.click(absoluteTimeframeLink);
        expect(handleChangeStub.mock.calls[0][0]).toEqual('time');
        expect(handleChangeStub.mock.calls[0][1]).toEqual({
          start: new Date(moment().subtract(1, 'days').startOf('day').format()),
          end: new Date(moment().startOf('day').format())
        });
      });
    });

    describe('relative_picker', () => {
      it('clicking the relative tab updates the model to a relative timeframe', () => {
        const relativeTimeframeLink = TestUtils.findRenderedDOMComponentWithClass(component, 'relative-tab');
        TestUtils.Simulate.click(relativeTimeframeLink);
        expect(handleChangeStub.mock.calls[0][0]).toEqual('time');
        expect(handleChangeStub.mock.calls[0][1]).toEqual({
          relativity: 'this',
          amount: '14',
          sub_timeframe: 'days'
        });
      });
    });

  });
});
