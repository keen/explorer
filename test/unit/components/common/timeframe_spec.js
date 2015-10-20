/** @jsx React.DOM */
var assert = require('chai').assert;
var expect = require('chai').expect;
var _ = require('lodash');
var moment = require('moment');
var sinon = require('sinon');
var Timeframe = require('../../../../client/js/app/components/common/timeframe.js');
var Timezone = require('../../../../client/js/app/components/common/timezone.js');
var RelativePicker = require('../../../../client/js/app/components/common/relative_picker.js');
var AbsolutePicker = require('../../../../client/js/app/components/common/absolute_picker.js');
var ReactSelect = require('../../../../client/js/app/components/common/react_select.js');
var FieldsToggle = require('../../../../client/js/app/components/common/fields_toggle.js');
var ExplorerActions = require('../../../../client/js/app/actions/ExplorerActions');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var TestHelpers = require('../../../support/TestHelpers');

describe('components/common/timeframe', function() {
  before(function () {
    this.handleChangeStub = sinon.stub();
  });

  beforeEach(function() {
    this.handleChangeStub.reset();

    this.model = TestHelpers.createExplorerModel();
    this.project = TestHelpers.createProject();

    this.component = TestUtils.renderIntoDocument(<Timeframe time={this.model.query.time}
                                                             timeframe_type={this.model.query.timeframe_type}
                                                             timezone={this.model.query.timezone}
                                                             handleChange={this.handleChangeStub} />
   )
  });

  describe('setup', function() {
    it('is of the right type', function() {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Timeframe));
    });

    it('has the relative tab selected by default', function(){
      var relativeTab = TestUtils.findRenderedDOMComponentWithTag(this.component, 'ul').getDOMNode().childNodes[0];
      assert.isTrue(relativeTab.classList.contains('active'));
    });

    it('has the relative picker shown by default', function(){
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'relative-timeframe-picker'), 1);
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'absolute-timeframe-picker'), 0);
    });

    it('has one Timezone component', function(){
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Timezone), 1);
    });
  });

  describe('interactions', function() {

    describe('absolute_picker', function () {
      it('clicking the absolute tab updates the model to an absolute timeframe', function () {
        this.absoluteTimeframeLink = TestUtils.findRenderedDOMComponentWithClass(this.component, 'absolute-tab').getDOMNode();
        TestUtils.Simulate.click(this.absoluteTimeframeLink);
        assert.deepPropertyVal(this.handleChangeStub.getCall(0).args[0], 'timeframe_type', 'absolute');
        assert.deepEqual(this.handleChangeStub.getCall(0).args[0].time, {
          start: new Date(moment().subtract(1, 'days').startOf('day').format()),
          end: new Date(moment().startOf('day').format())
        });
      });
    });

    describe('relative_picker', function () {
      it('clicking the relative tab updates the model to a relative timeframe', function () {
        this.relativeTimeframeLink = TestUtils.findRenderedDOMComponentWithClass(this.component, 'relative-tab').getDOMNode();
        TestUtils.Simulate.click(this.relativeTimeframeLink);
        assert.deepPropertyVal(this.handleChangeStub.getCall(0).args[0], 'timeframe_type', 'relative');
        assert.deepEqual(this.handleChangeStub.getCall(0).args[0].time, {
          relativity: 'this',
          amount: '14',
          sub_timeframe: 'days'
        });
      });
    });

  });
});
