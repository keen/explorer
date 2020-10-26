import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import SearchableProperty from './SearchableProperty';

import { createTree } from '../../utils';

const schema = createTree({
  'category.id': 'String',
  name: 'String',
  age: 'Number',
  loggedIn: 'Boolean',
});

const render = (overProps: any = {}) => {
  const props = {
    properties: schema,
    isEditAllowed: true,
    onRemove: jest.fn(),
    onSelectProperty: jest.fn(),
    onSearchProperties: jest.fn(),
    onBlur: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <div data-testid="wrapper">
      <SearchableProperty {...props} />
    </div>
  );

  return {
    wrapper,
    props,
  };
};

test('calls "onBlur" event handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render({ property: undefined });

  const element = getByTestId('wrapper');
  fireEvent.click(element);

  expect(props.onBlur).toHaveBeenCalled();
});

test('allows user to remove property', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render({ property: 'name' });
  const button = getByTestId('action-button');

  fireEvent.click(button);
  expect(props.onRemove).toHaveBeenCalled();
});

test('allows user to select property', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const property = getByText('age');
  fireEvent.click(property);

  expect(props.onSelectProperty).toHaveBeenCalledWith('age');
});

test('allows user to search property', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const searchInput = getByTestId('property-input');
  fireEvent.change(searchInput, { target: { value: 'age' } });

  expect(props.onSearchProperties).toHaveBeenCalled();
});
