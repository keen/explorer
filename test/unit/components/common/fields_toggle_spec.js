let sinon from 'sinon/pkg/sinon.js');

var _ from 'lodash');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var FieldsToggle from '../../../../lib/js/app/components/common/fields_toggle.js');
var TestHelpers from '../../../support/TestHelpers');

describe('components/common/fields_toggle', () => {

  before(() => {
    this.getFn = sinon.stub();
    this.updateFn = sinon.stub();
  });

  beforeEach(() => {
    this.getFn.reset();
    this.updateFn.reset();
    this.model = TestHelpers.createExplorerModel();
    this.component = null;
  });

  describe('setup', () => {
    beforeEach(() => {
      this.component = TestUtils.renderIntoDocument(<FieldsToggle model={this.model}
                                                                  name="Some Field"
                                                                  initialOpenState={true}
                                                                  attrsToStore={'analysis_type'}
                                                                  getFn={this.getFn} />);
    });
    it('displays the name prop', () => {
      var nameDisplayed = this.component.refs['name'].textContent;
      assert.strictEqual(nameDisplayed, 'Some Field');
    });
  });

  describe('with fieldsCount prop', () => {
    beforeEach(() => {
      this.component = TestUtils.renderIntoDocument(<FieldsToggle model={this.model}
                                                                  name="Some Field"
                                                                  initialOpenState={true}
                                                                  fieldsCount={5}
                                                                  getFn={this.getFn} />);
    });
    it('displays the fields count prop', () => {
      var nameDisplayed = this.component.refs['icon'].textContent;
      assert.strictEqual(nameDisplayed, '5');
    });
    it('doesnt call handleFieldsToggle when toggled', () => {
      var spy = sinon.spy(this.component, 'handleFieldsToggle');
      TestUtils.Simulate.click(this.component.refs['toggle-label']);
      assert.isFalse(spy.called);
      this.component.handleFieldsToggle.restore();
    });
  });

  describe('basic interactions', () => {
    it('calls the toggle function when the toggle-label is clicked', () => {
      this.component = TestUtils.renderIntoDocument(<FieldsToggle model={this.model}
                                                                  name="Some Field"
                                                                  initialOpenState={true}
                                                                  attrsToStore={'analysisType'}
                                                                  updateFn={this.updateFn}
                                                                  getFn={this.getFn} />);
      var spy = sinon.spy(this.component, 'toggle');
      TestUtils.Simulate.click(this.component.refs['toggle-label']);
      assert.isTrue(spy.calledOnce);
      this.component.toggle.restore();
    });

    it('calls the toggle callback when the toggle-label is clicked', () => {
      var spy = sinon.spy();
      this.component = TestUtils.renderIntoDocument(<FieldsToggle model={this.model}
                                                                  name="Some Field"
                                                                  initialOpenState={true}
                                                                  attrsToStore={'analysisType'}
                                                                  toggleCallback={spy}
                                                                  getFn={this.getFn}
                                                                  updateFn={this.updateFn} />);


      TestUtils.Simulate.click(this.component.refs['toggle-label']);
      assert.isTrue(spy.calledOnce);
    });

    describe('toggles the open class when the toggle-label is clicked', () => {
      it('opening', () => {
        this.component = TestUtils.renderIntoDocument(<FieldsToggle model={this.model}
                                                                    name="Some Field"
                                                                    initialOpenState={true}
                                                                    attrsToStore={'analysisType'}
                                                                    getFn={this.getFn}
                                                                    updateFn={this.updateFn} />);

        TestUtils.Simulate.click(this.component.refs['toggle-label']);
        assert.isFalse(ReactDOM.findDOMNode(this.component).classList.contains('open'));
      });
      it('closing', () => {
        this.component = TestUtils.renderIntoDocument(<FieldsToggle model={this.model}
                                                                    name="Some Field"
                                                                    initialOpenState={false}
                                                                    attrsToStore={'analysisType'}
                                                                    getFn={this.getFn}
                                                                    updateFn={this.updateFn} />);

        TestUtils.Simulate.click(this.component.refs['toggle-label']);
        assert.isTrue(ReactDOM.findDOMNode(this.component).classList.contains('open'));
      });
    });
  });

  describe('attribute management', () => {
    describe('storing attributes from the model', () => {

      it('properly stores a single attribute', () => {
        this.component = TestUtils.renderIntoDocument(<FieldsToggle model={this.model}
                                                                    name="Some Field"
                                                                    initialOpenState={true}
                                                                    attrsToStore={'some_attr'}
                                                                    getFn={() => {
                                                                      return 'something to be stored';
                                                                    }}
                                                                    updateFn={this.updateFn} />);
        this.component.toggle();
        assert.deepEqual(this.component._storedAttrs, {
          some_attr: 'something to be stored'
        });
      });

      it('properly stores multiple attributes', () => {
        this.model.analysis_type = 'something to be stored';
        this.model.event_collection = 'some kind of collection';

        this.component = TestUtils.renderIntoDocument(<FieldsToggle model={this.model}
                                                                    name="Some Field"
                                                                    initialOpenState={true}
                                                                    attrsToStore={['analysis_type', 'event_collection']}
                                                                    getFn={function(attrName){
                                                                      return this.model[attrName];
                                                                    }}
                                                                    updateFn={this.updateFn} />);

        this.component.toggle();

        assert.deepEqual(this.component._storedAttrs, {
          analysis_type: 'something to be stored',
          event_collection: 'some kind of collection'
        });
      });

    });

    describe('restoring attributes to the model', () => {

      it('properly restores a single attribute', () => {
        this.component = TestUtils.renderIntoDocument(<FieldsToggle model={this.model}
                                                                    name="Some Field"
                                                                    initialOpenState={false}
                                                                    attrsToStore={'analysis_type'}
                                                                    updateFn={this.updateFn}
                                                                    getFn={() => {
                                                                      return this.model.analysis_type;
                                                                    }}
                                                                    updateFn={this.updateFn} />);

        this.component._storedAttrs.analysis_type = 'something to be stored';
        this.component.toggle();
        assert.deepPropertyVal(this.updateFn.getCall(0).args[0], 'analysis_type', 'something to be stored');
      });

      it('properly restores multiple attributes', () => {
        this.component = TestUtils.renderIntoDocument(<FieldsToggle model={this.model}
                                                                    name="Some Field"
                                                                    initialOpenState={false}
                                                                    attrsToStore={['analysis_type', 'event_collection']}
                                                                    updateFn={this.updateFn}
                                                                    getFn={function(name){
                                                                      return this.model[name];
                                                                    }}
                                                                    updateFn={this.updateFn} />);

        this.component._storedAttrs = {
          analysis_type: 'something to be stored',
          event_collection: 'some kind of collection'
        };
        this.component.toggle();
        assert.deepPropertyVal(this.updateFn.getCall(0).args[0], 'analysis_type', 'something to be stored');
        assert.deepPropertyVal(this.updateFn.getCall(0).args[0], 'event_collection', 'some kind of collection');
      });

    });

    describe('resetting attributes from the model', () => {

      it('properly resets a single attribute', () => {
        this.component = TestUtils.renderIntoDocument(<FieldsToggle model={this.model}
                                                                    name="Some Field"
                                                                    initialOpenState={true}
                                                                    attrsToStore={'analysis_type'}
                                                                    resetValues={{analysis_type: 'a reset value'}}
                                                                    getFn={function(name){
                                                                      return this.model.analysis_type;
                                                                    }}
                                                                    updateFn={this.updateFn} />);
        this.component.toggle();
        assert.deepPropertyVal(this.updateFn.getCall(0).args[0], 'analysis_type', 'a reset value');
      });

      it('properly resets a multiple attributes', () => {
        this.component = TestUtils.renderIntoDocument(<FieldsToggle model={this.model}
                                                                    name="Some Field"
                                                                    initialOpenState={true}
                                                                    attrsToStore={['analysis_type', 'event_collection']}
                                                                    resetValues={{
                                                                      analysis_type: 'analysis_type reset value',
                                                                      event_collection: 'event_collection reset value'
                                                                    }}
                                                                    getFn={function(name) {
                                                                      return this.model[name];
                                                                    }}
                                                                    updateFn={this.updateFn} />);

        this.component.toggle();
        assert.deepPropertyVal(this.updateFn.getCall(0).args[0], 'analysis_type', 'analysis_type reset value');
        assert.deepPropertyVal(this.updateFn.getCall(0).args[0], 'event_collection', 'event_collection reset value');
      });

    });
  });

});
