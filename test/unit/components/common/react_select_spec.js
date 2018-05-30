
let sinon from 'sinon/pkg/sinon.js');
var _ from 'lodash');
import React from 'react';
var ReactDOM from 'react-dom');
var TestUtils from 'react-addons-test-utils');
var ReactSelect from '../../../../lib/js/app/components/common/react_select.js');
var TestHelpers from '../../../support/TestHelpers');

describe('components/common/react_select', () => {
  before(() => {
    this.handleBlurStub = sinon.stub();
    this.handleChangeStub = sinon.stub();
    this.handleSelectionStub = sinon.stub();

    var props = {
      items: [],
      wrapClasses: '',
      inputClasses: '',
      placeholder: '',
      handleBlur: this.handleBlurStub,
      handleChange: this.handleChangeStub,
      handleSelection: this.handleSelectionStub
    };
    this.component = TestUtils.renderIntoDocument(<ReactSelect {...props} />);
  });

  describe('setup', () => {
    it('is of the right type', () => {
      assert.isTrue(TestUtils.isCompositeComponentWithType(this.component, ReactSelect));
    });
    it('has one input', () => {
      assert.lengthOf(TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input'), 1);
    });
  });

  describe('search', () => {
    before(() => {
      this.searchTest = function(selectOptions, searchValue, expectedListItems) {
        var propsStep1 = _.assign({}, this.component.props, { items: selectOptions, value: searchValue });
        this.component = TestHelpers.renderComponent(ReactSelect, propsStep1);
        this.component.setState({ initialFocus: false });

        TestUtils.Simulate.focus(this.component.refs.input);
        TestUtils.Simulate.change(this.component.refs.input);

        var listItems = _.map(ReactDOM.findDOMNode(this.component.refs.list).childNodes, function(item) {
          return item.textContent;
        }.bind(this));
        assert.sameMembers(listItems, expectedListItems);
      };
    });

    it('searches for items case insensitive', () => {
      var propsStep1 = _.assign({}, this.component.props, { items: ['ONE', 'TWO', 'THREE'], value: 'one' });
      this.component = TestHelpers.renderComponent(ReactSelect, propsStep1);
      this.component.setState({ initialFocus: false });

      TestUtils.Simulate.focus(this.component.refs.input);
      TestUtils.Simulate.change(this.component.refs.input);

      var listItems = _.map(ReactDOM.findDOMNode(this.component.refs.list).childNodes, function(item) {
        return item.textContent;
      });
      assert.sameMembers(listItems, ['ONE']);
    });

    it('should display items with opening square bracket (RegExp reserved char)', () => {
      var selectOptions = ['ONE', 'TWO[2]', 'THREE'];
      var searchValue = 'two[';
      var expectedListItems = ['TWO[2]'];

      this.searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with opening curly brace (RegExp reserved char)', () => {
      var selectOptions = ['ONE', 'TWO', 'THREE{tres}'];
      var searchValue = 'three{';
      var expectedListItems = ['THREE{tres}'];

      this.searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with opening parenthesis (RegExp reserved char)', () => {
      var selectOptions = ['ONE', 'TWO', 'THREE(3)'];
      var searchValue = 'three(';
      var expectedListItems = ['THREE(3)'];

      this.searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with closing square bracket (RegExp reserved char)', () => {
      var selectOptions = ['ONE', 'TWO]xxx[', 'THREE'];
      var searchValue = 'two]';
      var expectedListItems = ['TWO]xxx['];

      this.searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with closing curly brace (RegExp reserved char)', () => {
      var selectOptions = ['ONE', 'TWO', 'THREE}tres'];
      var searchValue = 'three}';
      var expectedListItems = ['THREE}tres'];

      this.searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with closing parenthesis (RegExp reserved char)', () => {
      var selectOptions = ['ONE', 'TWO', 'THREE)yyy'];
      var searchValue = 'three)';
      var expectedListItems = ['THREE)yyy'];

      this.searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with both square brackets (RegExp reserved char)', () => {
      var selectOptions = ['ONE', 'TWO[2]', 'THREE'];
      var searchValue = 'two[2]';
      var expectedListItems = ['TWO[2]'];

      this.searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with both curly braces (RegExp reserved char)', () => {
      var selectOptions = ['ONE', 'TWO', 'THREE{tres}'];
      var searchValue = 'three{tres}';
      var expectedListItems = ['THREE{tres}'];

      this.searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with both parentheses (RegExp reserved char)', () => {
      var selectOptions = ['ONE', 'TWO', 'THREE(yyy)'];
      var searchValue = 'three(yyy)';
      var expectedListItems = ['THREE(yyy)'];

      this.searchTest(selectOptions, searchValue, expectedListItems);
    });
  });
});
