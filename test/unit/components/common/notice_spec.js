/** @jsx React.DOM */
var assert = require('chai').assert;
var sinon = require('sinon');
var _ = require('lodash');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Notice = require('../../../../client/js/app/components/common/notice.js');
var TestHelpers = require('../../../support/TestHelpers');

describe('components/common/notice', function() {
  describe('setup', function() {
    it('is of the right type', function() {
      notice = {};
      component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      assert.isTrue(TestUtils.isCompositeComponentWithType(component, Notice));
    });
  });
  describe('text', function () {
    it('shows the passed in text', function () {
      it('it has the right class for anything other than error', function () {
        notice = {
          type: 'success',
          text: 'A very important message'
        };
        component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
        assert.match(component.getDOMNode().textContent, /A very important message/);
      });
    });
  });
  describe('alert classes', function () {
    it('it has the right class for any type other than error', function () {
      notice = {
        type: 'success',
        text: 'Some text'
      };
      component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      assert.match(component.getDOMNode().className, /alert-success/);
    });
    it('it has the danger class for a type of error', function () {
      notice = {
        type: 'error',
        text: 'Some text'
      };
      component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      assert.match(component.getDOMNode().className, /alert-danger/);
    });
  });
  describe('icons', function () {
    it('adds an icon if the icon property is present on the notice prop', function () {
      it('it has the right class for anything other than error', function () {
        notice = {
          type: 'success',
          text: 'Some text',
          icon: 'search'
        };
        component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
        assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithClass(component, 'icon'), 1);
        assert.match(TestUtils.findRenderedDOMComponentWithClass(component, 'icon').className, '-search');
      });
    });
  });
  describe('closing', function () {
    it('can be closed', function () {
      var notice = { type: 'error', text: 'some error' };
      var component = component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, 'close'));
      assert.include(component.getDOMNode().className, 'hide');
    });
    it('shows itself again after new props are passed in', function () {
      var notice = { type: 'error', text: 'some error' };
      var component = component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, 'close'));
      assert.include(component.getDOMNode().className, 'hide');
      component.setProps(notice);
      assert.notInclude(component.getDOMNode().className, 'hide');
    });
    it('calls the closeCallback', function () {
      var notice = { type: 'error', text: 'some error' };
      var closeCallback = sinon.stub();
      var component = component = TestUtils.renderIntoDocument(<Notice notice={notice} closeCallback={closeCallback} />);
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, 'close'));
      assert.isTrue(closeCallback.calledOnce);
    });
  });
});