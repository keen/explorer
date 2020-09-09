import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import QueriesListItem from './QueriesListItem';

const render = (overProps: any = {}) => {
  const props = {
    tags: [],
    isActive: false,
    refreshRate: 0,
    queryName: 'Purchases',
    updateDate: '2020/03/10',
    onClick: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <table>
      <tbody>
        <QueriesListItem {...props} />
      </tbody>
    </table>
  );

  return {
    wrapper,
    props,
  };
};

test('calls "onClick" handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const element = getByTestId('saved-query-item');
  fireEvent.click(element);

  expect(props.onClick).toHaveBeenCalled();
});
