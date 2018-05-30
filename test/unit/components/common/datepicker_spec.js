
let sinon from 'sinon/pkg/sinon.js');
var _ from 'lodash');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var Datepicker from '../../../../lib/js/app/components/common/datepicker.js');
var TestHelpers from '../../../support/TestHelpers');

describe('components/common/datepicker', () => {
  before(() => {
    this.onSetStub = sinon.stub();
    this.component = TestUtils.renderIntoDocument(<Datepicker name="Picker" onSet={this.onSetStub} />);
  });

  beforeEach(() => {
    this.onSetStub.reset();
  });

  describe('setup', () => {
    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, Datepicker));
    });
    it('has one input', () => {
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 1);
    });
  });

  describe('interactions', () => {
    it('should call the onSet prop function with the correct day', () => {
      var inputNode = this.component.refs.datepicker;
      TestUtils.Simulate.focus(inputNode);
      var dayNodes = $(ReactDOM.findDOMNode(this.component)).find('td[role="presentation"] div');
      var fifteenthDayNode;
      _.each(dayNodes, function(dayNode) {
        if (dayNode.textContent === '15') {
          fifteenthDayNode = dayNode;
        }
      });
      $(fifteenthDayNode).click();
      assert.strictEqual(this.onSetStub.getCall(0).args[1].getDate(), 15);
    });
  });

});
