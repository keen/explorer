const assert from 'chai').assert;
const sinon from 'sinon/pkg/sinon.js');
const _ from 'lodash');
const React from 'react');
const ReactDOM from 'react-dom');
const TestUtils from 'react-addons-test-utils');
const Notice from '../../../../lib/js/app/components/common/notice.js');
const TestHelpers from '../../../support/TestHelpers');

describe('components/common/notice', () => {
  describe('setup', () => {
    it('is of the right type', () => {
      const notice = {};
      const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      assert.isTrue(TestUtils.isCompositeComponentWithType(component, Notice));
    });
  });
  describe('text', () => {
    it('shows the passed in text', () => {
      it('it has the right class for anything other than error', () => {
        const notice = {
          type: 'success',
          text: 'A very important message'
        };
        const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
        assert.match(ReactDOM.findDOMNode(component).textContent, /A very important message/);
      });
    });
  });
  describe('alert classes', () => {
    it('it has the right class for any type other than error', () => {
      const notice = {
        type: 'success',
        text: 'Some text'
      };
      const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      assert.match(ReactDOM.findDOMNode(component).className, /alert-success/);
    });
    it('it has the danger class for a type of error', () => {
      const notice = {
        type: 'error',
        text: 'Some text'
      };
      const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      assert.match(ReactDOM.findDOMNode(component).className, /alert-danger/);
    });
  });
  describe('icons', () => {
    it('adds an icon if the icon property is present on the notice prop', () => {
      it('it has the right class for anything other than error', () => {
        const notice = {
          type: 'success',
          text: 'Some text',
          icon: 'search'
        };
        const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(component, 'icon'), 1);
        assert.match(TestUtils.findRenderedDOMComponentWithClass(component, 'icon').className, '-search');
      });
    });
  });

  describe('closing', () => {
    let notice, component;

    beforeEach(() => {
      notice = { type: 'error', text: 'some error' };
      component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
    });

    it('can be closed', () => {
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, 'close'));

      assert.include(ReactDOM.findDOMNode(component).className, 'hide');
    });

    it('shows itself again after new props are passed in', () => {
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, 'close'));
      assert.include(ReactDOM.findDOMNode(component).className, 'hide');

      notice = { type: 'error', text: 'some error' };
      component = TestUtils.renderIntoDocument(<Notice notice={notice} />);

      assert.notInclude(ReactDOM.findDOMNode(component).className, 'hide');
    });

    it('calls the closeCallback', () => {
      const closeCallback = sinon.stub();
      component = TestUtils.renderIntoDocument(<Notice notice={notice} closeCallback={closeCallback} />);
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, 'close'));

      assert.isTrue(closeCallback.calledOnce);
    });
  });
});
