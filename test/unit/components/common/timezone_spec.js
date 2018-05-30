
import React from 'react';
var _ from 'lodash');
let sinon from 'sinon/pkg/sinon.js');
var TestUtils from 'react-addons-test-utils');
var TestHelpers from '../../../support/TestHelpers');

var ExplorerActions from '../../../../lib/js/app/actions/ExplorerActions');
var TimeframeUtils from '../../../../lib/js/app/utils/TimeframeUtils');
var ProjectUtils from '../../../../lib/js/app/utils/ProjectUtils');
var Timezone from '../../../../lib/js/app/components/common/timezone.js');

describe('components/common/timezone', () => {

  before(() => {
    this.handleChangeStub = sinon.stub();
  });


  beforeEach(() => {
    this.handleChangeStub.reset();
    this.model = TestHelpers.createExplorerModel();
    this.component = TestUtils.renderIntoDocument(<Timezone timezone={this.model.query.timezone}
                                                            timeframe_type={TimeframeUtils.timeframeType(this.model.query.time)}
                                                            handleChange={this.handleChangeStub} />);
  });

  it('should use the value from the project config if it matches the value', () => {
    var timezoneInput = this.component.refs.timezone.refs.input;
    timezoneInput.value = 'US/Hawaii';
    TestUtils.Simulate.change(timezoneInput);
    assert.strictEqual(this.handleChangeStub.getCall(0).args[1], 'US/Hawaii');
  });

  it('should allow a custom value if there is no match in the project config', () => {
    var timezoneInput = this.component.refs.timezone.refs.input;
    timezoneInput.value = '-27000';
    TestUtils.Simulate.change(timezoneInput);
    assert.strictEqual(this.handleChangeStub.getCall(0).args[1], '-27000');
  });

  it('should allow a custom value if there is no match in the project config', () => {
    var props = _.assign({}, this.component.props, { timezone: 'US/Hawaii' });
    this.component = TestHelpers.renderComponent(Timezone, props);
    var inputValue = this.component.refs.timezone.refs.input.value;

    assert.strictEqual(inputValue, 'US/Hawaii');
  });
});
