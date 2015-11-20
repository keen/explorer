var assert = require('chai').assert;
var React = require('react');
var _ = require('lodash');
var sinon = require('sinon');
var TestUtils = React.addons.TestUtils;
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
    var timezoneInput = this.component.refs.timezone.refs.input.getDOMNode();
    timezoneInput.value = 'US/Hawaii (GMT-10:00)';
    TestUtils.Simulate.change(timezoneInput);
    assert.strictEqual(this.handleChangeStub.getCall(0).args[1], 'US/Hawaii');
  });

  it('should use the value from the project config if it matches the value', function(){
    var timezoneInput = this.component.refs.timezone.refs.input.getDOMNode();
    timezoneInput.value = 'US/Hawaii';
    TestUtils.Simulate.change(timezoneInput);
    assert.strictEqual(this.handleChangeStub.getCall(0).args[1], 'US/Hawaii');
  });

  it('should allow a custom value if there is no match in the project config', function(){
    var timezoneInput = this.component.refs.timezone.refs.input.getDOMNode();
    timezoneInput.value = '-27000';
    TestUtils.Simulate.change(timezoneInput);
    assert.strictEqual(this.handleChangeStub.getCall(0).args[1], '-27000');
  });

  it('should allow a custom value if there is no match in the project config', function(){
    this.component.setProps({ timezone: 'US/Hawaii' });
    var inputValue = this.component.refs.timezone.refs.input.getDOMNode().value;
    assert.strictEqual(inputValue, 'US/Hawaii');
  });
});
