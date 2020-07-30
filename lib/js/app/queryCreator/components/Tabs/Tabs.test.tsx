import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import Tabs from './Tabs';

const elements = [
  {
    label: 'Tab 1',
    id: 'tab-1',
  },
  {
    label: 'Tab 2',
    id: 'tab-2',
  },
  {
    label: 'Tab 3',
    id: 'tab-3',
  },
];

const render = (overProps: any = {}) => {
  const props = {
    onClick: jest.fn(),
    tabs: elements,
    ...overProps,
  };

  const wrapper = rtlRender(<Tabs {...props} />);

  return {
    props,
    wrapper,
  };
};

test('should be render tabs', () => {
  const {
    wrapper: { getByTestId },
  } = render();
  const tabs = getByTestId('tabs');

  expect(tabs).toBeInTheDocument();
});

test('should render provided number of tabs', () => {
  const {
    wrapper: { getAllByTestId },
  } = render();
  const tabs = getAllByTestId('tab');

  expect(tabs.length).toEqual(elements.length);
});

test('should call onClick event handler', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const tab = getByText('Tab 1');
  fireEvent.click(tab);

  expect(props.onClick).toHaveBeenCalledWith('tab-1');
});
