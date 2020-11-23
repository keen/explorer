import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import PropertyName from './PropertyName';

const render = (overProps: any = {}) => {
  const props = {
    name: 'item.price',
    ...overProps,
  };

  const wrapper = rtlRender(<PropertyName {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render <PropertyName/>', () => {
  const {
    wrapper: { getByText },
  } = render();

  const item = getByText('item');
  const price = getByText('price');

  expect(item).toBeInTheDocument();
  expect(price).toBeInTheDocument();
});
