/** @jsx React.DOM */
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var sinon = require('sinon');
var FormatUtils = require('../../../../client/js/app/utils/FormatUtils');
var TimeframeUtils = require('../../../../client/js/app/utils/TimeframeUtils');
var AbsolutePicker = require('../../../../client/js/app/components/common/absolute_picker.js');
var Datepicker = require('../../../../client/js/app/components/common/datepicker.js');
var Timepicker = require('../../../../client/js/app/components/common/timepicker.js');
var TestHelpers = require('../../../support/TestHelpers');

describe('components/common/absolute_picker', function() {

  beforeEach(function() {
    this.model = TestHelpers.createExplorerModel();
    this.component = TestUtils.renderIntoDocument(<AbsolutePicker time={this.model.query.time}/>);
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, AbsolutePicker));
    });

    it('has 2 Datepicker child components', function(){
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Datepicker), 2);
    });

    it('has 2 Timepicker child components', function(){
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Timepicker), 2);
    });

    it('has 4 input child components', function(){
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 4);
    });
  });

  describe('UI interactions', function () {
    beforeEach(function(){
      this.model = TestHelpers.createExplorerModel();
      this.model.query.time = {
        start: TimeframeUtils.convertDateToUTC(new Date(FormatUtils.formatISOTimeNoTimezone("June 7 2015 1:00 PM"))),
        end: TimeframeUtils.convertDateToUTC(new Date(FormatUtils.formatISOTimeNoTimezone("June 8 2015 3:37 PM")))
      };
      this.component = TestUtils.renderIntoDocument(<AbsolutePicker time={this.model.query.time}/>);
    });
    describe('displaying the correct dates and times at load', function () {
      it('should display the correct start date', function () {
        assert.strictEqual(this.component.refs['start-date'].refs['datepicker'].value, "Jun 7, 2015");
      });
      it('should display the correct start time', function () {
        assert.strictEqual(this.component.refs['start-time'].refs['timepicker'].refs.input.value, "1:00 PM");
      });
      it('should display the correct start date', function () {
        assert.strictEqual(this.component.refs['end-date'].refs['datepicker'].value, "Jun 8, 2015");
      });
      it('should display the correct end time', function () {
        assert.strictEqual(this.component.refs['end-time'].refs['timepicker'].refs.input.value, "3:37 PM");
      });
    });
    describe('date and time correctness on change', function () {
      it('should change the time as expected when the time value is changed ', function () {
        var startTimeInputNode = this.component.refs['start-time'].refs['timepicker'].refs.input;
        startTimeInputNode.value = "2:55 PM";
        TestUtils.Simulate.blur(startTimeInputNode);
        assert.strictEqual(this.component.refs['start-time'].refs['timepicker'].refs.input.value, "2:55 PM");
      });
      it('should change the date as expected when the time value is changed ', function () {
        var startTimeInputNode = this.component.refs['start-time'].refs['timepicker'].refs.input;
        startTimeInputNode.value = "2:55 PM";
        TestUtils.Simulate.blur(startTimeInputNode);
        assert.strictEqual(this.component.refs['start-date'].refs['datepicker'].value, "Jun 7, 2015");
      });
    });
  });

});
