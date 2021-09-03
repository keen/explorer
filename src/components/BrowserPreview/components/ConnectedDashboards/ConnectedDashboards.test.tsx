/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';

import ConnectedDashboards from './ConnectedDashboards';

const render = (overProps: any = {}) => {
  const props = {
    dashboards: null,
    ...overProps,
  };

  const wrapper = rtlRender(<ConnectedDashboards {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should display None notification for non-existing dashboards', () => {
  const {
    wrapper: { getByText },
  } = render();

  const item = getByText('browser_preview.dashboards_none');
  expect(item).toBeInTheDocument();
});

test('should display None notification for empty dashboards list', () => {
  const {
    wrapper: { getByText },
  } = render({ dashboards: [] });

  const item = getByText('browser_preview.dashboards_none');
  expect(item).toBeInTheDocument();
});

test('should display dashboards list', () => {
  const dashboards = [
    { id: '@id1', title: '@title1' },
    { id: '@id2', title: '@title2' },
    { id: '@id3', title: '@title3' },
    { id: '@id4', title: '@title4' },
  ];
  const {
    wrapper: { getByText },
  } = render({ dashboards });

  dashboards.forEach((dashboard) =>
    expect(getByText(dashboard.title)).toBeInTheDocument()
  );
});

test('should display "Show more" link', () => {
  const dashboards = [
    { id: '@id1', title: '@title1' },
    { id: '@id2', title: '@title2' },
    { id: '@id3', title: '@title3' },
    { id: '@id4', title: '@title4' },
    { id: '@id5', title: '@title5' },
    { id: '@id6', title: '@title6' },
    { id: '@id7', title: '@title7' },
  ];
  const {
    wrapper: { getByText },
  } = render({ dashboards });

  const item = getByText('browser_preview.show_more');
  expect(item).toBeInTheDocument();
});

test('should display "Show less" link', () => {
  const dashboards = [
    { id: '@id1', title: '@title1' },
    { id: '@id2', title: '@title2' },
    { id: '@id3', title: '@title3' },
    { id: '@id4', title: '@title4' },
    { id: '@id5', title: '@title5' },
    { id: '@id6', title: '@title6' },
    { id: '@id7', title: '@title7' },
  ];
  const {
    wrapper: { getByText },
  } = render({ dashboards });

  const moreLink = getByText('browser_preview.show_more');
  fireEvent.click(moreLink);

  const lessLink = getByText('browser_preview.show_less');
  expect(lessLink).toBeInTheDocument();
});
