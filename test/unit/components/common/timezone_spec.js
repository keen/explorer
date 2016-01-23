var assert = require('chai').assert;
var React = require('react');
var _ = require('lodash');
var sinon = require('sinon');
var TestUtils = require('react-addons-test-utils');
var TestHelpers = require('../../../support/TestHelpers');

var ExplorerActions = require('../../../../client/js/app/actions/ExplorerActions');
var TimeframeUtils = require('../../../../client/js/app/utils/TimeframeUtils');
var ProjectUtils = require('../../../../client/js/app/utils/ProjectUtils');
var Timezone = require('../../../../client/js/app/components/common/timezone.js');

describe('components/common/timezone', function() {

  before(function () {
    this.handleChangeStub = sinon.stub();
  });


  beforeEach(function () {
    this.handleChangeStub.reset();
    this.model = TestHelpers.createExplorerModel();
    this.component = TestUtils.renderIntoDocument(<Timezone timezone={this.model.query.timezone} 
                                                            timeframe_type={TimeframeUtils.timeframeType(this.model.query.time)}
                                                            handleChange={this.handleChangeStub} />);
  });

  it('should use the value from the project config if it matches the name', function(){
    var timezoneInput = this.component.refs.timezone.refs.input;
    timezoneInput.value = 'US/Hawaii (GMT-10:00)';
    TestUtils.Simulate.change(timezoneInput);
    assert.strictEqual(this.handleChangeStub.getCall(0).args[1], 'US/Hawaii');
  });

  it('should use the value from the project config if it matches the value', function(){
    var timezoneInput = this.component.refs.timezone.refs.input;
    timezoneInput.value = 'US/Hawaii';
    TestUtils.Simulate.change(timezoneInput);
    assert.strictEqual(this.handleChangeStub.getCall(0).args[1], 'US/Hawaii');
  });

  it('should allow a custom value if there is no match in the project config', function(){
    var timezoneInput = this.component.refs.timezone.refs.input;
    timezoneInput.value = '-27000';
    TestUtils.Simulate.change(timezoneInput);
    assert.strictEqual(this.handleChangeStub.getCall(0).args[1], '-27000');
  });

  it('should allow a custom value if there is no match in the project config', function(){
    var props = _.assign({}, this.component.props, { timezone: 'US/Hawaii' });
    this.component = TestHelpers.renderComponent(Timezone, props);
    var inputValue = this.component.refs.timezone.refs.input.value;

    assert.strictEqual(inputValue, 'US/Hawaii');
  });
});
