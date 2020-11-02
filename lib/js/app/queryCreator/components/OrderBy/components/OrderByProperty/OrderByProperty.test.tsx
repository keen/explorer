import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import OrderByProperty from './OrderByProperty';

import { createTree } from '../../../../utils';

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
    onSelectDirection: jest.fn(),
    onSelectProperty: jest.fn(),
    onSearchProperties: jest.fn(),
    onBlur: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<OrderByProperty {...props} />);

  return {
    wrapper,
    props,
  };
};

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

test('allows user to select orderBy direction', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const defaultOrder = getByText('DESC');
  fireEvent.click(defaultOrder);

  const customOrder = getByText('ASC');
  fireEvent.click(customOrder);

  expect(props.onSelectDirection).toHaveBeenCalledWith('ASC');
});
