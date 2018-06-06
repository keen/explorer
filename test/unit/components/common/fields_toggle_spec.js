import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FieldsToggle from '../../../../lib/js/app/components/common/fields_toggle.js';
import TestHelpers from '../../../support/TestHelpers';

describe('components/common/fields_toggle', () => {
  let getFn;
  let updateFn;
  let component;
  let model;

  beforeAll(() => {
    getFn = jest.fn();
    updateFn = jest.fn();
  });

  beforeEach(() => {
    getFn.mockClear();
    updateFn.mockClear();
    model = TestHelpers.createExplorerModel();
    component = null;
  });

  describe('setup', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<FieldsToggle model={model}
                                                                  name="Some Field"
                                                                  initialOpenState={true}
                                                                  attrsToStore={'analysis_type'}
                                                                  getFn={getFn} />);
    });
    it('displays the name prop', () => {
      const nameDisplayed = component.refs['name'].textContent;
      expect(nameDisplayed).toBe('Some Field');
    });
  });

  describe('with fieldsCount prop', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<FieldsToggle model={model}
                                                                  name="Some Field"
                                                                  initialOpenState={true}
                                                                  fieldsCount={5}
                                                                  getFn={getFn} />);
    });
    it('displays the fields count prop', () => {
      const nameDisplayed = component.refs['icon'].textContent;
      expect(nameDisplayed).toBe('5');
    });
    it('doesnt call handleFieldsToggle when toggled', () => {
      const spy = jest.spyOn(component, 'handleFieldsToggle');
      TestUtils.Simulate.click(component.refs['toggle-label']);
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });

  describe('basic interactions', () => {
    it('calls the toggle function when the toggle-label is clicked', () => {
      component = TestUtils.renderIntoDocument(<FieldsToggle model={model}
                                                                  name="Some Field"
                                                                  initialOpenState={true}
                                                                  attrsToStore={'analysisType'}
                                                                  updateFn={updateFn}
                                                                  getFn={getFn} />);
      const spy = jest.spyOn(component, 'toggle');
      TestUtils.Simulate.click(component.refs['toggle-label']);
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    describe('toggles the open class when the toggle-label is clicked', () => {
      it('opening', () => {
        component = TestUtils.renderIntoDocument(<FieldsToggle model={model}
                                                                    name="Some Field"
                                                                    initialOpenState={true}
                                                                    attrsToStore={'analysisType'}
                                                                    getFn={getFn}
                                                                    updateFn={updateFn} />);

        TestUtils.Simulate.click(component.refs['toggle-label']);
        expect(ReactDOM.findDOMNode(component).classList.contains('open')).toBe(false);
      });
      it('closing', () => {
        component = TestUtils.renderIntoDocument(<FieldsToggle model={model}
                                                                    name="Some Field"
                                                                    initialOpenState={false}
                                                                    attrsToStore={'analysisType'}
                                                                    getFn={getFn}
                                                                    updateFn={updateFn} />);

        TestUtils.Simulate.click(component.refs['toggle-label']);
        expect(ReactDOM.findDOMNode(component).classList.contains('open')).toBe(true);
      });
    });
  });

  describe('attribute management', () => {
    describe('storing attributes from the model', () => {

      it('properly stores a single attribute', () => {
        component = TestUtils.renderIntoDocument(<FieldsToggle model={model}
                                                                    name="Some Field"
                                                                    initialOpenState={true}
                                                                    attrsToStore={'some_attr'}
                                                                    getFn={() => {
                                                                      return 'something to be stored';
                                                                    }}
                                                                    updateFn={updateFn} />);
        component.toggle();
        expect(component._storedAttrs).toEqual({
          some_attr: 'something to be stored'
        });
      });

      it('properly stores multiple attributes', () => {
        model.analysis_type = 'something to be stored';
        model.event_collection = 'some kind of collection';

        component = TestUtils.renderIntoDocument(<FieldsToggle model={model}
                                                                    name="Some Field"
                                                                    initialOpenState={true}
                                                                    attrsToStore={['analysis_type', 'event_collection']}
                                                                    getFn={function(attrName){
                                                                      return model[attrName];
                                                                    }}
                                                                    updateFn={updateFn} />);

        component.toggle();

        expect(component._storedAttrs).toEqual({
          analysis_type: 'something to be stored',
          event_collection: 'some kind of collection'
        });
      });

    });

    describe('restoring attributes to the model', () => {

      it('properly restores a single attribute', () => {
        component = TestUtils.renderIntoDocument(<FieldsToggle model={model}
                                                                    name="Some Field"
                                                                    initialOpenState={false}
                                                                    attrsToStore={'analysis_type'}
                                                                    updateFn={updateFn}
                                                                    getFn={() => {
                                                                      return model.analysis_type;
                                                                    }}
                                                                    updateFn={updateFn} />);

        component._storedAttrs.analysis_type = 'something to be stored';
        component.toggle();
        expect(updateFn.mock.calls[0][0]).toEqual({
          'analysis_type': 'something to be stored'
        });
      });

      it('properly restores multiple attributes', () => {
        component = TestUtils.renderIntoDocument(<FieldsToggle model={model}
                                                                    name="Some Field"
                                                                    initialOpenState={false}
                                                                    attrsToStore={['analysis_type', 'event_collection']}
                                                                    updateFn={updateFn}
                                                                    getFn={function(name){
                                                                      return model[name];
                                                                    }}
                                                                    updateFn={updateFn} />);

        component._storedAttrs = {
          analysis_type: 'something to be stored',
          event_collection: 'some kind of collection'
        };
        component.toggle();
        expect(updateFn.mock.calls[0][0]).toEqual(component._storedAttrs);
      });

    });

    describe('resetting attributes from the model', () => {

      it('properly resets a single attribute', () => {
        component = TestUtils.renderIntoDocument(<FieldsToggle model={model}
                                                                    name="Some Field"
                                                                    initialOpenState={true}
                                                                    attrsToStore={'analysis_type'}
                                                                    resetValues={{analysis_type: 'a reset value'}}
                                                                    getFn={function(name){
                                                                      return model.analysis_type;
                                                                    }}
                                                                    updateFn={updateFn} />);
        component.toggle();
        expect(updateFn.mock.calls[0][0]).toEqual({
          'analysis_type': 'a reset value'
        });
      });

      it('properly resets a multiple attributes', () => {
        const resetValues = {
          analysis_type: 'analysis_type reset value',
          event_collection: 'event_collection reset value'
        };
        component = TestUtils.renderIntoDocument(<FieldsToggle model={model}
                                                                    name="Some Field"
                                                                    initialOpenState={true}
                                                                    attrsToStore={['analysis_type', 'event_collection']}
                                                                    resetValues={resetValues}
                                                                    getFn={function(name) {
                                                                      return model[name];
                                                                    }}
                                                                    updateFn={updateFn} />);

        component.toggle();
        expect(updateFn.mock.calls[0][0]).toEqual(resetValues);
      });

    });
  });

});
