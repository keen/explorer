import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import FilterValue from './FilterValue';

import { Filter } from '../../types';

test('render number field', () => {
  const filter: Filter = {
    propertyName: 'propertyName',
    propertyValue: 1,
    propertyType: 'Number',
    operator: 'eq',
  };
  const { container } = render(
    <FilterValue idx={0} filter={filter} onChange={() => true} />
  );

  const filterValue = container.querySelector('[data-test="filter-number"]');
  expect(filterValue).toBeInTheDocument();
});

test('render boolean field', () => {
  const filter: Filter = {
    propertyName: 'propertyName',
    propertyValue: true,
    propertyType: 'Boolean',
    operator: 'eq',
  };
  const { container } = render(
    <FilterValue idx={0} filter={filter} onChange={() => true} />
  );

  const filterValue = container.querySelector('[data-test="filter-boolean"]');
  expect(filterValue).toBeInTheDocument();
});

test('render null field', () => {
  const filter: Filter = {
    propertyName: 'propertyName',
    propertyValue: null,
    propertyType: 'Null',
    operator: 'eq',
  };
  const { container } = render(
    <FilterValue idx={0} filter={filter} onChange={() => true} />
  );

  const filterValue = container.querySelector('[data-test="filter-disabled"]');
  expect(filterValue).toBeInTheDocument();
});

test('render datetime field', () => {
  const filter: Filter = {
    propertyName: 'propertyName',
    propertyValue: '2020-07-10T00:00:00.000Z',
    propertyType: 'Datetime',
    operator: 'eq',
  };
  const { container } = render(
    <FilterValue idx={0} filter={filter} onChange={() => true} />
  );

  const filterValue = container.querySelector(
    '[data-test="filter-datepicker"]'
  );
  expect(filterValue).toBeInTheDocument();
});

test('render geo field', () => {
  const filter: Filter = {
    propertyName: 'propertyName',
    propertyValue: { coordinates: [1, 2], maxDistanceMiles: 1 },
    propertyType: 'Geo',
    operator: 'eq',
  };
  const { container } = render(
    <FilterValue idx={0} filter={filter} onChange={() => true} />
  );

  const filterValue = container.querySelector('[data-test="filter-geo"]');
  expect(filterValue).toBeInTheDocument();
});

test('render string field', () => {
  const filter: Filter = {
    propertyName: 'propertyName',
    propertyValue: 'propertyValue',
    operator: 'eq',
  };
  const { container } = render(
    <FilterValue idx={0} filter={filter} onChange={() => true} />
  );

  const filterValue = container.querySelector('[data-test="filter-input"]');
  expect(filterValue).toBeInTheDocument();
});

test('calls "onChange" handler', () => {
  const mockFn = jest.fn();
  const filter: Filter = {
    propertyName: 'propertyName',
    propertyValue: 'propertyValue',
    operator: 'eq',
  };
  const { container } = render(
    <FilterValue idx={0} filter={filter} onChange={mockFn} />
  );

  const input = container.querySelector('[data-test="filter-input"]');
  fireEvent.change(input, { target: { value: '1' } });

  expect(mockFn).toHaveBeenCalled();
});
