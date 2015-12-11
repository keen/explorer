var _ = require('lodash');
var sinon = require('sinon');
var assert = require('chai').assert;
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $R = require('rquery')(_, React, ReactDOM, TestUtils);
var TestHelpers = require('../../../../../support/TestHelpers');
var FunnelStep = require('../../../../../../client/js/app/components/explorer/query_builder/funnels/funnel_step.js');

function getProps(props) {
  var props = props || {};
  var defaults = {
    index: 0,
    canRemove: true,
    step: TestHelpers.createStep(),
    eventCollections: [],
    propertyNames: [],
    onBrowseEvents: sinon.stub(),
    moveStep: sinon.stub(),
    removeStep: sinon.stub(),
    handleChange: sinon.stub(),
    toggleStepActive: sinon.stub(),
    handleFilterChange: sinon.stub(),
    handleAddFilter: sinon.stub(),
    handleRemoveFilter: sinon.stub(),
    getPropertyType: sinon.stub()
  };
  return _.assign({}, defaults, props);
}

describe('components/explorer/query_builder/funnels/funnel_step', function() {

  it('should ONLY call moveStepUp if the up button is clicked', function () {
    this.component = TestHelpers.renderComponent(FunnelStep, getProps());
    TestUtils.Simulate.click($R(this.component).find('.step-move-btns .up').components[0]);
    assert.isTrue(this.component.props.moveStep.calledWith(0, 'up'));
    assert.isFalse(this.component.props.toggleStepActive.called);
  });

  it('should ONLY call moveStepDown if the down button is clicked', function () {
    this.component = TestHelpers.renderComponent(FunnelStep, getProps());
    TestUtils.Simulate.click($R(this.component).find('.step-move-btns .down').components[0]);
    assert.isTrue(this.component.props.moveStep.calledWith(0, 'down'));
    assert.isFalse(this.component.props.toggleStepActive.called);
  });

  it('should ONLY call toggleStepActive if the header is clicked', function () {
    this.component = TestHelpers.renderComponent(FunnelStep, getProps());
    TestUtils.Simulate.click($R(this.component).find('.step-header').components[0]);
    assert.isTrue(this.component.props.toggleStepActive.calledWith(0, true));
    assert.isFalse(this.component.props.moveStep.called);
  });

  it('should call removeStep if the user confirms they want to delete the step', function () {
    this.component = TestHelpers.renderComponent(FunnelStep, getProps({
      step: _.assign(TestHelpers.createStep(), { active: true })
    }));
    sinon.stub(window, 'confirm').returns(true);
    TestUtils.Simulate.click($R(this.component).find('.remove-step').components[0]);
    assert.isTrue(this.component.props.removeStep.calledWith(0));
    window.confirm.restore();
  });

  it('should NOT show the removeStep button if canRemove is false', function () {
    this.component = TestHelpers.renderComponent(FunnelStep, getProps({
      canRemove: false,
      step: _.assign(TestHelpers.createStep(), { active: true })
    }));
    assert.lengthOf($R(this.component).find('.remove-step').components, 0);
  });

  it('calls handleChange when the event collection field is changed', function () {
    this.component = TestHelpers.renderComponent(FunnelStep, getProps({
      step: _.assign(TestHelpers.createStep(), { active: true })
    }));
    var node = $R(this.component).find('input[name="event_collection"]').components[0];
    node.value = 'test';
    TestUtils.Simulate.change(node);
    assert.isTrue(this.component.props.handleChange.calledWith(0, 'event_collection', 'test'));
  });

  it('calls handleChange when the actor property collection field is changed', function () {
    this.component = TestHelpers.renderComponent(FunnelStep, getProps({
      step: _.assign(TestHelpers.createStep(), { active: true })
    }));
    var node = $R(this.component).find('input[name="actor_property"]').components[0];
    node.value = 'test';
    TestUtils.Simulate.change(node);
    assert.isTrue(this.component.props.handleChange.calledWith(0, 'actor_property', 'test'));
  });
  
});
