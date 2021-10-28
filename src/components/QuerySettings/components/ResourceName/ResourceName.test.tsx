import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import 'jest-styled-components';

import ResourceName from './ResourceName';

const render = (overProps: any = {}) => {
  const props = {
    resourceName: '@query/01',
    ...overProps,
  };

  const wrapper = rtlRender(<ResourceName {...props} />);

  return {
    props,
    wrapper,
  };
};

test('shows resource name with hint message', async () => {
  const {
    wrapper: { getByText, queryByText },
    props,
  } = render();

  const resourceName = getByText('query_settings.resource_name');
  fireEvent.mouseEnter(resourceName);

  await waitFor(() => {
    expect(queryByText(props.resourceName)).toBeInTheDocument();
    expect(
      queryByText('query_settings.resource_name_usage_hint')
    ).toBeInTheDocument();
  });
});

test('renders message about resource name access for not existing saved query', async () => {
  const {
    wrapper: { queryByText, getByText },
  } = render({
    resourceName: '',
  });

  const resourceName = getByText('query_settings.resource_name');
  fireEvent.mouseEnter(resourceName);

  await waitFor(() => {
    expect(
      queryByText('query_settings.save_query_to_access_resource_name')
    ).toBeInTheDocument();
  });
});

test('allows user to copy resource name', async () => {
  const {
    wrapper: { getByText, queryByText },
  } = render();
  const copyMock = jest.fn();

  document.execCommand = copyMock;

  const resourceName = getByText('query_settings.resource_name');
  fireEvent.mouseEnter(resourceName);
  fireEvent.click(resourceName);

  expect(copyMock).toHaveBeenCalledWith('copy');

  await waitFor(() => {
    expect(
      queryByText('query_settings.resource_name_copied')
    ).toBeInTheDocument();
  });
});
