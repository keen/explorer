import React from 'react';
import { render as rtlRender, fireEvent, getAllByTestId } from '@testing-library/react';

import Tabs from './Tabs';

const elements = [
  'Tab 1', 'Tab 2', 'Tab 3'
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

test('Tabs should be rendered', () => {
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

test('should call onClick', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const tab = getByText('Tab 1');
  fireEvent.click(tab);

  expect(props.onClick).toHaveBeenCalled();
});
