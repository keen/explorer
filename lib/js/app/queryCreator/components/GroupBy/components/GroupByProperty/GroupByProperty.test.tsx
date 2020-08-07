import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import GroupByProperty from './GroupByProperty';

import { createTree } from '../../../../utils/createTree';

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
    ...overProps,
  };

  const wrapper = rtlRender(<GroupByProperty {...props} />);

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
    wrapper: { getByTestId, getByText },
    props,
  } = render();

  const element = getByTestId('groupBy-property');
  fireEvent.click(element);

  const property = getByText('age');
  fireEvent.click(property);

  expect(props.onSelectProperty).toHaveBeenCalledWith('age');
});

test('allows user to search property', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const element = getByTestId('groupBy-property');
  fireEvent.click(element);

  const searchInput = getByTestId('property-input');
  fireEvent.change(searchInput, { target: { value: 'age' } });

  expect(props.onSearchProperties).toHaveBeenCalled();
});
