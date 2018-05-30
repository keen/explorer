let sinon from 'sinon/pkg/sinon.js');

var _ from 'lodash');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var Modal from '../../../../lib/js/app/components/common/modal.js');

describe('components/common/modal', () => {

  describe('setup', () => {

    it('is of the right type', () => {
      var modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" />);
      assert.isTrue(TestUtils.isCompositeComponentWithType(modal, Modal));
    });

    it('it adds the modal classes', () => {
      var modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" modalClasses="a-test-class some-other-class" />);
      var classes = 'a-test-class some-other-class modal';
      assert.equal(ReactDOM.findDOMNode(modal).className, classes);
    });

    it('it adds the large class', () => {
      var modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" size="large" />);
      var classes = 'modal-dialog modal-lg';
      assert.equal(ReactDOM.findDOMNode(modal).childNodes[0].className, classes);
    });

    it('it sets the title', () => {
      var modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" />);
      var headerText = $(ReactDOM.findDOMNode(modal)).find('.modal-title').text();
      assert.strictEqual(headerText, 'Test Modal');
    });

    it("it doesn't have a footer by default", () => {
      var modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" />);
      assert.lengthOf($(ReactDOM.findDOMNode(modal)).find('.modal-footer'), 0);
    });

    it("it sets up the footer properly", () => {
      var onClickSpy = sinon.spy();
      var modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" useFooter={true} footerBtns={[{
        text: 'Done'
      }, {
        text: 'Submit',
        onClick: onClickSpy,
        classes: 'btn-primary'
      }]} />);

      var defaultButton = TestUtils.findRenderedDOMComponentWithClass(modal, 'btn-default');
      var primaryButton = TestUtils.findRenderedDOMComponentWithClass(modal, 'btn-primary');

      TestUtils.Simulate.click(primaryButton);

      assert.equal(defaultButton.textContent, 'Done');
      assert.equal(primaryButton.textContent, 'Submit');
      assert.isTrue(primaryButton.classList.contains('btn-primary'));
      assert.isTrue(onClickSpy.calledOnce);
    });

  });

  describe('component functions', () => {

    beforeEach(() => {
      this.modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" />);
    });

    describe('opening', () => {

      it('open calls addBackdrop', () => {
        var addBackdropSpy = sinon.spy(this.modal, 'addBackdrop');
        this.modal.open();
        assert.isTrue(addBackdropSpy.calledOnce);
        this.modal.addBackdrop.restore();
      });

      it('open sets the state attr open to true', () => {
        this.modal.open();
        assert.isTrue(this.modal.state.open);
      });

      it('addBackdrop properly adds the backdrop', () => {
        this.modal.open();
        assert.isTrue($('body').hasClass('modal-open'));
        assert.lengthOf($('body').find('#modal-backdrop'), 1);
      });

    });

    describe('closing', () => {

      it('close calls removeBackdrop', () => {
        var removeBackdropSpy = sinon.spy(this.modal, 'removeBackdrop');
        this.modal.open();
        this.modal.close();
        assert.isTrue(removeBackdropSpy.calledOnce);
        this.modal.removeBackdrop.restore();
      });

      it('open sets the state attr open to true', () => {
        this.modal.open(); // Open first, because "false" is the default value for the 'open' state attr.
        this.modal.close();
        assert.isFalse(this.modal.state.open);
      });

      it('removeBackdrop removes the backdrop properly', () => {
        this.modal.open();
        this.modal.close();
        assert.isFalse($('body').hasClass('modal-open'));
        assert.lengthOf($('body').find('#modal-backdrop'), 0);
      });

    });

  });
});
