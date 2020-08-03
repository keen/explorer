import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import Timeframe from './Timeframe';

const render = (overProps: any = {}) => {
  const props = {
    id: 'id',
    onTimeframeChange: jest.fn(),
    onTimezoneChange: jest.fn(),
    onReset: jest.fn(),
    value: 'this_10_days',
    ...overProps,
  };

  const wrapper = rtlRender(<Timeframe {...props} />);

  return {
    props,
    wrapper,
  };
};

test('should render relative time user interface', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  const propertyContainer = getByTestId('dropable-container');
  fireEvent.click(propertyContainer);

  expect(getByTestId('relative-time')).toBeInTheDocument();
});

test('should render absolute time user interface', () => {
  const timeframe = {
    start: undefined,
    end: undefined,
  };
  const {
    wrapper: { getByTestId },
  } = render({ value: timeframe });

  const propertyContainer = getByTestId('dropable-container');
  fireEvent.click(propertyContainer);

  expect(getByTestId('absolute-time')).toBeInTheDocument();
});

test('should render timezone user interface', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  const propertyContainer = getByTestId('dropable-container');
  fireEvent.click(propertyContainer);

  expect(getByTestId('timezone')).toBeInTheDocument();
});

test('should call "onReset" handler', () => {
  const {
    wrapper: { unmount },
    props,
  } = render();
  unmount();

  expect(props.onReset).toHaveBeenCalled();
});
