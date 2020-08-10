import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import GeoCoordinates from './GeoCoordinates';

const render = (overProps: any = {}) => {
  const props = {
    value: {
      coordinates: [0, 0],
      maxDistanceMiles: 0,
    },
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<GeoCoordinates {...props} />);

  return {
    wrapper,
    props,
  };
};

test('allows user to change latitude', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const input = getByTestId('lat-input');
  fireEvent.change(input, { target: { value: 100 } });

  expect(props.onChange).toHaveBeenCalledWith({
    coordinates: [100, 0],
    maxDistanceMiles: 0,
  });
});

test('allows user to change longitude', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const input = getByTestId('long-input');
  fireEvent.change(input, { target: { value: 200 } });

  expect(props.onChange).toHaveBeenCalledWith({
    coordinates: [0, 200],
    maxDistanceMiles: 0,
  });
});

test('allows user to change radius', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();

  const input = getByTestId('radius-input');
  fireEvent.change(input, { target: { value: 20 } });

  expect(props.onChange).toHaveBeenCalledWith({
    coordinates: [0, 0],
    maxDistanceMiles: 20,
  });
});
