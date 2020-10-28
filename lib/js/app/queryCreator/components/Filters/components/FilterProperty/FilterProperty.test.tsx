import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import FilterProperty from './FilterProperty';

import FiltersContext from '../../FiltersContext';
import { SearchContext } from '../../../../contexts';

import { createTree } from '../../../../utils';

const schema = createTree({
  'category.id': 'String',
  name: 'String',
  age: 'Number',
  loggedIn: 'Boolean',
});

const render = (overProps: any = {}, searchContext: any = {}) => {
  const props = {
    properties: schema,
    onSearchProperties: jest.fn(),
    onSelectProperty: jest.fn(),
    onCastPropertyType: jest.fn(),
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <SearchContext.Provider
      value={{
        expandTree: true,
        searchPropertiesPhrase: null,
        ...searchContext,
      }}
    >
      <FiltersContext.Provider value={{ schema }}>
        <FilterProperty {...props} />
      </FiltersContext.Provider>
    </SearchContext.Provider>
  );

  return {
    wrapper,
    props,
  };
};

test('allows user to set property', () => {
  const {
    wrapper: { getByTestId, getByText },
    props,
  } = render();

  const element = getByTestId('filter-property');
  fireEvent.click(element);

  const property = getByText('age');
  fireEvent.click(property);

  expect(props.onSelectProperty).toHaveBeenCalledWith('age');
});

test('allows user to cast property type', () => {
  const {
    wrapper: { getByTestId, getByText },
    props,
  } = render({
    property: 'name',
    type: 'String',
  });

  const propertyTypes = getByTestId('property-type-cast');
  fireEvent.click(propertyTypes);

  const type = getByText('boolean');
  fireEvent.click(type);

  expect(props.onCastPropertyType).toHaveBeenCalledWith('Boolean');
});

test('shows information about empty search results', () => {
  const {
    wrapper: { getByTestId, getByText },
  } = render(
    {
      properties: {},
    },
    { searchPropertiesPhrase: 'category' }
  );

  const element = getByTestId('filter-property');
  fireEvent.click(element);

  const message = getByText(
    'query_creator_filter_property.empty_search_results'
  );

  expect(message).toBeInTheDocument();
});
