const assert = require('chai').assert;
const sinon = require('sinon/pkg/sinon.js');
const _ = require('lodash');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Notice = require('../../../../client/js/app/components/common/notice.js');
const TestHelpers = require('../../../support/TestHelpers');

describe('components/common/notice', function() {
  describe('setup', function() {
    it('is of the right type', function() {
      const notice = {};
      const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      assert.isTrue(TestUtils.isCompositeComponentWithType(component, Notice));
    });
  });
  describe('text', function () {
    it('shows the passed in text', function () {
      it('it has the right class for anything other than error', function () {
        const notice = {
          type: 'success',
          text: 'A very important message'
        };
        const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
        assert.match(ReactDOM.findDOMNode(component).textContent, /A very important message/);
      });
    });
  });
  describe('alert classes', function () {
    it('it has the right class for any type other than error', function () {
      const notice = {
        type: 'success',
        text: 'Some text'
      };
      const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      assert.match(ReactDOM.findDOMNode(component).className, /alert-success/);
    });
    it('it has the danger class for a type of error', function () {
      const notice = {
        type: 'error',
        text: 'Some text'
      };
      const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      assert.match(ReactDOM.findDOMNode(component).className, /alert-danger/);
    });
  });
  describe('icons', function () {
    it('adds an icon if the icon property is present on the notice prop', function () {
      it('it has the right class for anything other than error', function () {
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

  describe('closing', function () {
    let notice, component;

    beforeEach(function() {
      notice = { type: 'error', text: 'some error' };
      component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
    });

    it('can be closed', function () {
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, 'close'));

      assert.include(ReactDOM.findDOMNode(component).className, 'hide');
    });

    it('shows itself again after new props are passed in', function () {
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, 'close'));
      assert.include(ReactDOM.findDOMNode(component).className, 'hide');

      notice = { type: 'error', text: 'some error' };
      component = TestUtils.renderIntoDocument(<Notice notice={notice} />);

      assert.notInclude(ReactDOM.findDOMNode(component).className, 'hide');
    });

    it('calls the closeCallback', function () {
      const closeCallback = sinon.stub();
      component = TestUtils.renderIntoDocument(<Notice notice={notice} closeCallback={closeCallback} />);
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, 'close'));

      assert.isTrue(closeCallback.calledOnce);
    });
  });
});
