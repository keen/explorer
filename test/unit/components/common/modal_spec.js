import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Modal from '../../../../lib/js/app/components/common/modal.js';

describe('components/common/modal', () => {

  describe('setup', () => {

    it('is of the right type', () => {
      const modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" />);
      expect(TestUtils.isCompositeComponentWithType(modal, Modal)).toBe(true);
    });

    it('it adds the modal classes', () => {
      const modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" modalClasses="a-test-class some-other-class" />);
      const classes = 'a-test-class some-other-class modal';
      expect(ReactDOM.findDOMNode(modal).className).toEqual(classes);
    });

    it('it adds the large class', () => {
      const modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" size="large" />);
      const classes = 'modal-dialog modal-lg';
      expect(ReactDOM.findDOMNode(modal).childNodes[0].className).toEqual(classes);
    });

    it('it sets the title', () => {
      const modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" />);
      const headerText = $(ReactDOM.findDOMNode(modal)).find('.modal-title').text();
      expect(headerText).toEqual('Test Modal');
    });

    it("it doesn't have a footer by default", () => {
      const modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" />);
      expect($(ReactDOM.findDOMNode(modal)).find('.modal-footer')).toHaveLength(0);
    });

    it("it sets up the footer properly", () => {
      const onClickSpy = jest.fn();
      const modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" useFooter={true} footerBtns={[{
        text: 'Done'
      }, {
        text: 'Submit',
        onClick: onClickSpy,
        classes: 'btn-primary'
      }]} />);

      const defaultButton = TestUtils.findRenderedDOMComponentWithClass(modal, 'btn-default');
      const primaryButton = TestUtils.findRenderedDOMComponentWithClass(modal, 'btn-primary');

      TestUtils.Simulate.click(primaryButton);

      expect(defaultButton.textContent).toEqual('Done');
      expect(primaryButton.textContent).toEqual('Submit');
      expect(primaryButton.classList.contains('btn-primary')).toBe(true);
      expect(onClickSpy).toHaveBeenCalled();
    });

  });

  describe('component functions', () => {
    let modal;

    beforeEach(() => {
      modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" />);
    });

    describe('opening', () => {

      it('open calls addBackdrop', () => {
        const addBackdropSpy = jest.spyOn(modal, 'addBackdrop');
        modal.open();
        expect(addBackdropSpy).toHaveBeenCalledTimes(1);
        addBackdropSpy.mockRestore();
      });

      it('open sets the state attr open to true', () => {
        modal.open();
        expect(modal.state.open).toBe(true);
      });

      it('addBackdrop properly adds the backdrop', () => {
        modal.open();
        expect($('body').hasClass('modal-open')).toBe(true);
        expect($('body').find('#modal-backdrop')).toHaveLength(1);
      });

    });

    describe('closing', () => {

      it('close calls removeBackdrop', () => {
        const removeBackdropSpy = jest.spyOn(modal, 'removeBackdrop');
        modal.open();
        modal.close();
        expect(removeBackdropSpy).toHaveBeenCalledTimes(1);
        removeBackdropSpy.mockRestore();
      });

      it('open sets the state attr open to true', () => {
        modal.open(); // Open first, because "false" is the default value for the 'open' state attr.
        modal.close();
        expect(modal.state.open).toBe(false);
      });

      it('removeBackdrop removes the backdrop properly', () => {
        modal.open();
        modal.close();
        expect($('body').hasClass('modal-open')).toBe(false);
        expect($('body').find('#modal-backdrop')).toHaveLength(0);
      });

    });

  });
});
