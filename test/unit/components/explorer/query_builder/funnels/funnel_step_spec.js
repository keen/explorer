import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import rquery from 'rquery';

import ExplorerActions from '../../../../../../lib/js/app/actions/ExplorerActions.js';
import FunnelStep from '../../../../../../lib/js/app/components/explorer/query_builder/funnels/funnel_step.js';
import FunnelBuilder from '../../../../../../lib/js/app/components/explorer/query_builder/funnels/funnel_builder.js';
import TestHelpers from '../../../../../../test/support/TestHelpers';

const $R = rquery(_, React, ReactDOM, TestUtils);

function getProps(props = {}) {
  const defaults = {
    index: 0,
    canRemove: true,
    step: TestHelpers.createStep(),
    eventCollections: [],
    propertyNames: [],
    onBrowseEvents: jest.fn(),
    moveStep: jest.fn(),
    removeStep: jest.fn(),
    handleChange: jest.fn(),
    toggleStepActive: jest.fn(),
    handleFilterChange: jest.fn(),
    handleAddFilter: jest.fn(),
    handleRemoveFilter: jest.fn(),
    getPropertyType: jest.fn()
  };
  return _.assign({}, defaults, props);
}

describe('components/explorer/query_builder/funnels/funnel_step', () => {
  let component;

  it('should ONLY call moveStepUp if the up button is clicked', () => {
    component = TestHelpers.renderComponent(FunnelStep, getProps());
    TestUtils.Simulate.click($R(component).find('.step-move-btns .up').components[0]);
    expect(component.props.moveStep).toBeCalledWith(0, 'up');
    expect(component.props.toggleStepActive).not.toBeCalled();
  });

  it('should ONLY call moveStepDown if the down button is clicked', () => {
    component = TestHelpers.renderComponent(FunnelStep, getProps());
    TestUtils.Simulate.click($R(component).find('.step-move-btns .down').components[0]);
    expect(component.props.moveStep).toBeCalledWith(0, 'down');
    expect(component.props.toggleStepActive).not.toBeCalled();
  });

  it('should ONLY call toggleStepActive if the header is clicked', () => {
    component = TestHelpers.renderComponent(FunnelStep, getProps());
    TestUtils.Simulate.click($R(component).find('.step-header').components[0]);
    expect(component.props.toggleStepActive).toBeCalledWith(0, true);
    expect(component.props.moveStep).not.toBeCalled();
  });

  it('should call removeStep if the user confirms they want to delete the step', () => {
    component = TestHelpers.renderComponent(FunnelStep, getProps({
      step: _.assign(TestHelpers.createStep(), { active: true })
    }));
    const stub = jest.spyOn(window, 'confirm').mockReturnValue(true);
    TestUtils.Simulate.click($R(component).find('.remove-step').components[0]);
    expect(component.props.removeStep).toBeCalledWith(0);
    stub.mockRestore();
  });

  it('should NOT show the removeStep button if canRemove is false', () => {
    component = TestHelpers.renderComponent(FunnelStep, getProps({
      canRemove: false,
      step: _.assign(TestHelpers.createStep(), { active: true })
    }));
    expect($R(component).find('.remove-step').components).toHaveLength(0);
  });

  it('calls handleChange when the event collection field is changed', () => {
    component = TestHelpers.renderComponent(FunnelStep, getProps({
      step: _.assign(TestHelpers.createStep(), { active: true })
    }));
    const node = $R(component).find('input[name="event_collection"]').components[0];
    node.value = 'test';
    TestUtils.Simulate.change(node);
    expect(component.props.handleChange).toBeCalledWith(0, 'event_collection', 'test');
  });

  it('calls handleChange when the actor property collection field is changed', () => {
    component = TestHelpers.renderComponent(FunnelStep, getProps({
      step: _.assign(TestHelpers.createStep(), { active: true })
    }));
    const node = $R(component).find('input[name="actor_property"]').components[0];
    node.value = 'test';
    TestUtils.Simulate.change(node);
    expect(component.props.handleChange).toBeCalledWith(0, 'actor_property', 'test');
  });

});
