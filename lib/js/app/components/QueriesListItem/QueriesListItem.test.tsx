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

test('renders query name', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(props.queryName);

  expect(element).toBeInTheDocument();
});

test('renders cache indicator', () => {
  const {
    wrapper: { getByTestId },
  } = render({
    refreshRate: 4,
  });
  const element = getByTestId('cache-badge');

  expect(element).toBeInTheDocument();
});

test('renders query tags', () => {
  const {
    wrapper: { getByText },
  } = render({
    tags: ['marketing'],
  });
  const tagElement = getByText('marketing');

  expect(tagElement).toBeInTheDocument();
});

test('allows user to show all tags related with query', () => {
  const {
    wrapper: { getByText, getByTestId },
  } = render({
    tags: ['marketing', 'it', 'infrastructure'],
  });

  const dropIndicator = getByTestId('drop-indicator');
  fireEvent.click(dropIndicator);

  expect(getByText('infrastructure')).toBeInTheDocument();
});
