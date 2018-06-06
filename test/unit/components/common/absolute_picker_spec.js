
import _ from 'lodash';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import FormatUtils from '../../../../lib/js/app/utils/FormatUtils';
import TimeframeUtils from '../../../../lib/js/app/utils/TimeframeUtils';
import AbsolutePicker from '../../../../lib/js/app/components/common/absolute_picker.js';
import Datepicker from '../../../../lib/js/app/components/common/datepicker.js';
import Timepicker from '../../../../lib/js/app/components/common/timepicker.js';
import TestHelpers from '../../../support/TestHelpers';

describe('components/common/absolute_picker', () => {
  let model;
  let component;

  beforeEach(() => {
    model = TestHelpers.createExplorerModel();
    component = TestUtils.renderIntoDocument(<AbsolutePicker time={model.query.time}/>);
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, AbsolutePicker)).toBe(true);
    });

    it('has 2 Datepicker child components', () => {
      expect(TestUtils.scryRenderedComponentsWithType(component, Datepicker).length).toBe(2);
    });

    it('has 2 Timepicker child components', () => {
      expect(TestUtils.scryRenderedComponentsWithType(component, Timepicker).length).toBe(2);
    });

    it('has 4 input child components', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'input').length).toBe(4);
    });
  });

  describe('UI interactions', () => {
    beforeEach(() => {
      model = TestHelpers.createExplorerModel();
      model.query.time = {
        start: FormatUtils.convertDateToUTC(new Date(FormatUtils.formatISOTimeNoTimezone("June 7 2015 1:00 PM UT"))),
        end: FormatUtils.convertDateToUTC(new Date(FormatUtils.formatISOTimeNoTimezone("June 8 2015 3:37 PM UT")))
      };
      component = TestUtils.renderIntoDocument(<AbsolutePicker time={model.query.time}/>);
    });
    describe('displaying the correct dates and times at load', () => {
      it('should display the correct start date', () => {
        expect(component.refs['start-date'].refs['datepicker'].value).toBe("Jun 7, 2015");
      });
      it('should display the correct start time', () => {
        expect(component.refs['start-time'].refs['timepicker'].refs.input.value).toBe("1:00 PM");
      });
      it('should display the correct start date', () => {
        expect(component.refs['end-date'].refs['datepicker'].value).toBe("Jun 8, 2015");
      });
      it('should display the correct end time', () => {
        expect(component.refs['end-time'].refs['timepicker'].refs.input.value).toBe("3:37 PM");
      });
    });
    describe('date and time correctness on change', () => {
      it('should change the time as expected when the time value is changed ', () => {
        var startTimeInputNode = component.refs['start-time'].refs['timepicker'].refs.input;
        startTimeInputNode.value = "2:55 PM";
        TestUtils.Simulate.blur(startTimeInputNode);
        expect(component.refs['start-time'].refs['timepicker'].refs.input.value).toBe("2:55 PM");
      });
      it('should change the date as expected when the time value is changed ', () => {
        var startTimeInputNode = component.refs['start-time'].refs['timepicker'].refs.input;
        startTimeInputNode.value = "2:55 PM";
        TestUtils.Simulate.blur(startTimeInputNode);
        expect(component.refs['start-date'].refs['datepicker'].value).toBe("Jun 7, 2015");
      });
    });
  });

});
