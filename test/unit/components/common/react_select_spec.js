
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ReactSelect from '../../../../lib/js/app/components/common/react_select.js';
import TestHelpers from '../../../support/TestHelpers';

describe('components/common/react_select', () => {
  let handleBlurStub;
  let handleChangeStub;
  let handleSelectionStub;
  let component;
  beforeAll(() => {
    handleBlurStub = jest.fn();
    handleChangeStub = jest.fn();
    handleSelectionStub = jest.fn();

    const props = {
      items: [],
      wrapClasses: '',
      inputClasses: '',
      placeholder: '',
      handleBlur: handleBlurStub,
      handleChange: handleChangeStub,
      handleSelection: handleSelectionStub
    };
    component = TestUtils.renderIntoDocument(<ReactSelect {...props} />);
  });

  describe('setup', () => {
    it('is of the right type', () => {
      expect(TestUtils.isCompositeComponentWithType(component, ReactSelect)).toBe(true);
    });
    it('has one input', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')).toHaveLength(1);
    });
  });

  describe('search', () => {
    let searchTest;
    beforeAll(() => {
      searchTest = function(selectOptions, searchValue, expectedListItems) {
        const propsStep1 = _.assign({}, component.props, { items: selectOptions, value: searchValue });
        component = TestHelpers.renderComponent(ReactSelect, propsStep1);
        component.setState({ initialFocus: false });

        TestUtils.Simulate.focus(component.refs.input);
        TestUtils.Simulate.change(component.refs.input);

        const listItems = _.map(ReactDOM.findDOMNode(component.refs.list).childNodes, function(item) {
          return item.textContent;
        }.bind(this));
        expect(listItems).toEqual(expect.arrayContaining(expectedListItems));
      };
    });

    it('searches for items case insensitive', () => {
      const propsStep1 = _.assign({}, component.props, { items: ['ONE', 'TWO', 'THREE'], value: 'one' });
      component = TestHelpers.renderComponent(ReactSelect, propsStep1);
      component.setState({ initialFocus: false });

      TestUtils.Simulate.focus(component.refs.input);
      TestUtils.Simulate.change(component.refs.input);

      const listItems = _.map(ReactDOM.findDOMNode(component.refs.list).childNodes, function(item) {
        return item.textContent;
      });
      expect(listItems).toEqual(expect.arrayContaining(['ONE']));
    });

    it('should display items with opening square bracket (RegExp reserved char)', () => {
      const selectOptions = ['ONE', 'TWO[2]', 'THREE'];
      const searchValue = 'two[';
      const expectedListItems = ['TWO[2]'];

      searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with opening curly brace (RegExp reserved char)', () => {
      const selectOptions = ['ONE', 'TWO', 'THREE{tres}'];
      const searchValue = 'three{';
      const expectedListItems = ['THREE{tres}'];

      searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with opening parenthesis (RegExp reserved char)', () => {
      const selectOptions = ['ONE', 'TWO', 'THREE(3)'];
      const searchValue = 'three(';
      const expectedListItems = ['THREE(3)'];

      searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with closing square bracket (RegExp reserved char)', () => {
      const selectOptions = ['ONE', 'TWO]xxx[', 'THREE'];
      const searchValue = 'two]';
      const expectedListItems = ['TWO]xxx['];

      searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with closing curly brace (RegExp reserved char)', () => {
      const selectOptions = ['ONE', 'TWO', 'THREE}tres'];
      const searchValue = 'three}';
      const expectedListItems = ['THREE}tres'];

      searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with closing parenthesis (RegExp reserved char)', () => {
      const selectOptions = ['ONE', 'TWO', 'THREE)yyy'];
      const searchValue = 'three)';
      const expectedListItems = ['THREE)yyy'];

      searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with both square brackets (RegExp reserved char)', () => {
      const selectOptions = ['ONE', 'TWO[2]', 'THREE'];
      const searchValue = 'two[2]';
      const expectedListItems = ['TWO[2]'];

      searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with both curly braces (RegExp reserved char)', () => {
      const selectOptions = ['ONE', 'TWO', 'THREE{tres}'];
      const searchValue = 'three{tres}';
      const expectedListItems = ['THREE{tres}'];

      searchTest(selectOptions, searchValue, expectedListItems);
    });

    it('should display items with both parentheses (RegExp reserved char)', () => {
      const selectOptions = ['ONE', 'TWO', 'THREE(yyy)'];
      const searchValue = 'three(yyy)';
      const expectedListItems = ['THREE(yyy)'];

      searchTest(selectOptions, searchValue, expectedListItems);
    });
  });
});
