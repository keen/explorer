
var _ from 'lodash');
var moment from 'moment');
let sinon from 'sinon/pkg/sinon.js');
var Timeframe from '../../../../lib/js/app/components/common/timeframe.js');
var Timezone from '../../../../lib/js/app/components/common/timezone.js');
var RelativePicker from '../../../../lib/js/app/components/common/relative_picker.js');
var AbsolutePicker from '../../../../lib/js/app/components/common/absolute_picker.js');
var ReactSelect from '../../../../lib/js/app/components/common/react_select.js');
var FieldsToggle from '../../../../lib/js/app/components/common/fields_toggle.js');
var ExplorerActions from '../../../../lib/js/app/actions/ExplorerActions');
import React from 'react';
var TestUtils from 'react-addons-test-utils');
var TestHelpers from '../../../support/TestHelpers');

describe('components/common/timeframe', () => {
  before(() => {
    this.handleChangeStub = sinon.stub();
  });

  beforeEach(() => {
    this.handleChangeStub.reset();

    this.model = TestHelpers.createExplorerModel();
    this.project = TestHelpers.createProject();

    this.component = TestUtils.renderIntoDocument(<Timeframe time={this.model.query.time}
                                                             timezone={this.model.query.timezone}
                                                             handleChange={this.handleChangeStub} />
   )
  });

  describe('setup', () => {
    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Timeframe));
    });

    it('has the relative tab selected by default', () => {
      var relativeTab = TestUtils.findRenderedDOMComponentWithTag(this.component, 'ul').childNodes[0];
      assert.isTrue(relativeTab.classList.contains('active'));
    });

    it('has the relative picker shown by default', () => {
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'relative-timeframe-picker'), 1);
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(this.component, 'absolute-timeframe-picker'), 0);
    });

    it('has one Timezone component', () => {
      assert.lengthOf(TestUtils.scryRenderedComponentsWithType(this.component, Timezone), 1);
    });
  });

  describe('interactions', () => {

    describe('absolute_picker', () => {
      it('clicking the absolute tab updates the model to an absolute timeframe', () => {
        this.absoluteTimeframeLink = TestUtils.findRenderedDOMComponentWithClass(this.component, 'absolute-tab');
        TestUtils.Simulate.click(this.absoluteTimeframeLink);
        assert.strictEqual(this.handleChangeStub.getCall(0).args[0], 'time')
        assert.deepEqual(this.handleChangeStub.getCall(0).args[1], {
          start: new Date(moment().subtract(1, 'days').startOf('day').format()),
          end: new Date(moment().startOf('day').format())
        });
      });
    });

    describe('relative_picker', () => {
      it('clicking the relative tab updates the model to a relative timeframe', () => {
        this.relativeTimeframeLink = TestUtils.findRenderedDOMComponentWithClass(this.component, 'relative-tab');
        TestUtils.Simulate.click(this.relativeTimeframeLink);
        assert.strictEqual(this.handleChangeStub.getCall(0).args[0], 'time')
        assert.deepEqual(this.handleChangeStub.getCall(0).args[1], {
          relativity: 'this',
          amount: '14',
          sub_timeframe: 'days'
        });
      });
    });

  });
});
