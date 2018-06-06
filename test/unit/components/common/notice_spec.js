import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Notice from '../../../../lib/js/app/components/common/notice.js';
import TestHelpers from '../../../support/TestHelpers';

describe('components/common/notice', () => {
  describe('setup', () => {
    it('is of the right type', () => {
      const notice = {};
      const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      expect(TestUtils.isCompositeComponentWithType(component, Notice)).toBe(true);
    });
  });
  describe('text', () => {
    describe('shows the passed in text', () => {
      it('it has the right class for anything other than error', () => {
        const notice = {
          type: 'success',
          text: 'A very important message'
        };
        const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
        expect(ReactDOM.findDOMNode(component).textContent).toContain('A very important message');
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
      expect(ReactDOM.findDOMNode(component).className).toContain('alert-success');
    });
    it('it has the danger class for a type of error', () => {
      const notice = {
        type: 'error',
        text: 'Some text'
      };
      const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
      expect(ReactDOM.findDOMNode(component).className).toContain('alert-danger');
    });
  });
  describe('icons', () => {
    describe('adds an icon if the icon property is present on the notice prop', () => {
      it('it has the right class for anything other than error', () => {
        const notice = {
          type: 'success',
          text: 'Some text',
          icon: 'search'
        };
        const component = TestUtils.renderIntoDocument(<Notice notice={notice} />);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(component, 'icon')).toHaveLength(1);
        expect(TestUtils.findRenderedDOMComponentWithClass(component, 'icon').className).toContain('-search');
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

      expect(ReactDOM.findDOMNode(component).className).toContain('hide');
    });

    it('shows itself again after new props are passed in', () => {
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, 'close'));
      expect(ReactDOM.findDOMNode(component).className).toContain('hide');

      notice = { type: 'error', text: 'some error' };
      component = TestUtils.renderIntoDocument(<Notice notice={notice} />);

      expect(ReactDOM.findDOMNode(component).className).not.toContain('hide');
    });

    it('calls the closeCallback', () => {
      const closeCallback = jest.fn();
      component = TestUtils.renderIntoDocument(<Notice notice={notice} closeCallback={closeCallback} />);
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(component, 'close'));

      expect(closeCallback).toHaveBeenCalled();
    });
  });
});
