/** @jsx React.DOM */
var sinon = require('sinon');
var assert = require('chai').assert;
var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var Modal = require('../../../../client/js/app/components/common/modal.js');

describe('components/common/modal', function() {

  describe('setup', function() {

    it('is of the right type', function() {
      var modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" />);
      assert.isTrue(TestUtils.isCompositeComponentWithType(modal, Modal));
    });

    it('it adds the modal classes', function() {
      var modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" modalClasses="a-test-class some-other-class" />);
      var classes = 'a-test-class some-other-class modal';
      assert.equal(ReactDOM.findDOMNode(modal).className, classes);
    });

    it('it adds the large class', function() {
      var modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" size="large" />);
      var classes = 'modal-dialog modal-lg';
      assert.equal(ReactDOM.findDOMNode(modal).childNodes[0].className, classes);
    });

    it('it sets the title', function() {
      var modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" />);
      var headerText = $(ReactDOM.findDOMNode(modal)).find('.modal-title').text();
      assert.strictEqual(headerText, 'Test Modal');
    });

    it("it doesn't have a footer by default", function() {
      var modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" />);
      assert.lengthOf($(ReactDOM.findDOMNode(modal)).find('.modal-footer'), 0);
    });

    it("it sets up the footer properly", function() {
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

  describe('component functions', function() {

    beforeEach(function(){
      this.modal = TestUtils.renderIntoDocument(<Modal title="Test Modal" />);
    });

    describe('opening', function(){

      it('open calls addBackdrop', function(){
        var addBackdropSpy = sinon.spy(this.modal, 'addBackdrop');
        this.modal.open();
        assert.isTrue(addBackdropSpy.calledOnce);
        this.modal.addBackdrop.restore();
      });

      it('open sets the state attr open to true', function(){
        this.modal.open();
        assert.isTrue(this.modal.state.open);
      });

      it('addBackdrop properly adds the backdrop', function(){
        this.modal.open();
        assert.isTrue($('body').hasClass('modal-open'));
        assert.lengthOf($('body').find('#modal-backdrop'), 1);
      });

    });

    describe('closing', function(){

      it('close calls removeBackdrop', function(){
        var removeBackdropSpy = sinon.spy(this.modal, 'removeBackdrop');
        this.modal.open();
        this.modal.close();
        assert.isTrue(removeBackdropSpy.calledOnce);
        this.modal.removeBackdrop.restore();
      });

      it('open sets the state attr open to true', function(){
        this.modal.open(); // Open first, because "false" is the default value for the 'open' state attr.
        this.modal.close();
        assert.isFalse(this.modal.state.open);
      });

      it('removeBackdrop removes the backdrop properly', function(){
        this.modal.open();
        this.modal.close();
        assert.isFalse($('body').hasClass('modal-open'));
        assert.lengthOf($('body').find('#modal-backdrop'), 0);
      });

    });

  });
});
