import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import PropertyTypeCast from './PropertyTypeCast';
import FiltersContext from '../../FiltersContext';

import { createTree } from '../../../../utils';

const schema = createTree({
  'category.id': 'String',
  name: 'String',
  age: 'Number',
  loggedIn: 'Boolean',
});

const render = (overProps: any = {}) => {
  const props = {
    property: 'name',
    type: 'String',
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <FiltersContext.Provider value={{ schema }}>
      <PropertyTypeCast {...props} />
    </FiltersContext.Provider>
  );

  return {
    wrapper,
    props,
  };
};

test('allows set property type', () => {
  const {
    wrapper: { getByTestId, getByText },
    props,
  } = render();

  const propertyTypes = getByTestId('property-type-cast');
  fireEvent.click(propertyTypes);

  const type = getByText('boolean');
  fireEvent.click(type);

  expect(props.onChange).toHaveBeenCalledWith('Boolean');
});

test('shows message about type cast consistency', () => {
  const {
    wrapper: { getByTestId, getByText },
  } = render();

  const propertyTypes = getByTestId('property-type-cast');
  fireEvent.click(propertyTypes);

  expect(
    getByText('query_creator_property_type_cast.cast_message')
  ).toBeInTheDocument();
});
