
var _ from 'lodash');
import React from 'react';
var TestUtils from 'react-addons-test-utils');
let sinon from 'sinon/pkg/sinon.js');
var FormatUtils from '../../../../lib/js/app/utils/FormatUtils');
var TimeframeUtils from '../../../../lib/js/app/utils/TimeframeUtils');
var AbsolutePicker from '../../../../lib/js/app/components/common/absolute_picker.js');
var Datepicker from '../../../../lib/js/app/components/common/datepicker.js');
var Timepicker from '../../../../lib/js/app/components/common/timepicker.js');
var TestHelpers from '../../../support/TestHelpers');

describe('components/common/absolute_picker', () => {

  beforeEach(() => {
    this.model = TestHelpers.createExplorerModel();
    this.component = TestUtils.renderIntoDocument(<AbsolutePicker time={this.model.query.time}/>);
  });

  describe('setup', () => {
    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, AbsolutePicker));
    });

    it('has 2 Datepicker child components', () => {
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Datepicker), 2);
    });

    it('has 2 Timepicker child components', () => {
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Timepicker), 2);
    });

    it('has 4 input child components', () => {
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 4);
    });
  });

  describe('UI interactions', () => {
    beforeEach(() => {
      this.model = TestHelpers.createExplorerModel();
      this.model.query.time = {
        start: FormatUtils.convertDateToUTC(new Date(FormatUtils.formatISOTimeNoTimezone("June 7 2015 1:00 PM UT"))),
        end: FormatUtils.convertDateToUTC(new Date(FormatUtils.formatISOTimeNoTimezone("June 8 2015 3:37 PM UT")))
      };
      this.component = TestUtils.renderIntoDocument(<AbsolutePicker time={this.model.query.time}/>);
    });
    describe('displaying the correct dates and times at load', () => {
      it('should display the correct start date', () => {
        assert.strictEqual(this.component.refs['start-date'].refs['datepicker'].value, "Jun 7, 2015");
      });
      it('should display the correct start time', () => {
        assert.strictEqual(this.component.refs['start-time'].refs['timepicker'].refs.input.value, "1:00 PM");
      });
      it('should display the correct start date', () => {
        assert.strictEqual(this.component.refs['end-date'].refs['datepicker'].value, "Jun 8, 2015");
      });
      it('should display the correct end time', () => {
        assert.strictEqual(this.component.refs['end-time'].refs['timepicker'].refs.input.value, "3:37 PM");
      });
    });
    describe('date and time correctness on change', () => {
      it('should change the time as expected when the time value is changed ', () => {
        var startTimeInputNode = this.component.refs['start-time'].refs['timepicker'].refs.input;
        startTimeInputNode.value = "2:55 PM";
        TestUtils.Simulate.blur(startTimeInputNode);
        assert.strictEqual(this.component.refs['start-time'].refs['timepicker'].refs.input.value, "2:55 PM");
      });
      it('should change the date as expected when the time value is changed ', () => {
        var startTimeInputNode = this.component.refs['start-time'].refs['timepicker'].refs.input;
        startTimeInputNode.value = "2:55 PM";
        TestUtils.Simulate.blur(startTimeInputNode);
        assert.strictEqual(this.component.refs['start-date'].refs['datepicker'].value, "Jun 7, 2015");
      });
    });
  });

});
