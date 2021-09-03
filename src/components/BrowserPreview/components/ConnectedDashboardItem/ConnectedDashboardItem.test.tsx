/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import { AppContext } from '../../../../contexts';
import ConnectedDashboardItem from './ConnectedDashboardItem';

const render = (overProps: any = {}, overContext: any = {}) => {
  const props = {
    dashboard: {
      id: '@id',
    },
    ...overProps,
  };

  const wrapper = rtlRender(
    <AppContext.Provider
      value={{ createDashboardUrl: (id: string) => id, ...overContext } as any}
    >
      <ConnectedDashboardItem {...props} />
    </AppContext.Provider>
  );

  return {
    wrapper,
    props,
  };
};

test('should display an item with default title', () => {
  const {
    wrapper: { getByText },
  } = render();

  const item = getByText('browser_preview.untitled_dashboard');
  expect(item).toBeInTheDocument();
});

test('should display an item with provided title', () => {
  const title = '@title';
  const {
    wrapper: { getByText },
    props,
  } = render({ dashboard: { id: '@id', title } });

  const item = getByText(props.dashboard.title);
  expect(item).toBeInTheDocument();
});

test('should display a link to a specific dashboard', () => {
  const {
    wrapper: { getByRole },
  } = render();

  const item = getByRole('link');
  expect(item).toBeInTheDocument();
});

test('should not display link if a function for creating urls is not provided', () => {
  const {
    wrapper: { queryByRole },
  } = render({}, { createDashboardUrl: undefined });

  const item = queryByRole('link');
  expect(item).toBeNull();
});
