import React, { FC } from 'react';
import { Select, Input } from '@keen.io/ui-core';
import DatePicker from './DatePicker';
import GeoCoordinates from './GeoCoordinates';

import { getTypeFromValue } from './utils';

import { Filter } from '../../types';
import { Coordinates } from './types';
import { DATA_TYPES, DEFAULT_TIMEFRAME_ABSOLUTE_VALUE } from './constants';

type Props = {
  /** Index */
  idx: number;
  /** Filter */
  filter: Filter;
  /** Onchange handler */
  onChange: (idx: number, value: string|Coordinates) => void;
};

const getInputValue = (filter: Filter) => {
  if (filter?.propertyValue && typeof filter?.propertyValue === 'string') return filter.propertyValue;
  return '';
};

const getSelectValue = (options: any, filter: Filter) => {
  if (filter?.propertyValue) {
    const value = options.filter(option => option.value === filter.propertyValue);
    return value.length ? { label: filter.propertyValue, value: filter.propertyValue } : null;
  }
  return null;
}

const FilterValue: FC<Props> = ({ idx, filter, onChange }) => {
  const propertyType = filter?.propertyType || getTypeFromValue(filter);
  if (propertyType === DATA_TYPES['num']) {
    return (
      <Input
        data-test="filter-number"
        type="number"
        variant="solid"
        placeholder="Value"
        value={getInputValue(filter)}
        onChange={(e) => onChange(idx, e.target.value )}
      />
    );
  }

  if (propertyType === DATA_TYPES['bool']) {
    const BooleanOptions = ['true', 'false'].map((item) => ({
      label: item,
      value: item,
    }));

    return (
      <div data-test="filter-boolean">
        <Select
          variant="solid"
          placeholder={'Select property type'}
          options={BooleanOptions}
          onChange={({ value }: { value: string }) => onChange(idx, value )}
          value={getSelectValue(BooleanOptions, filter)}
        />
      </div>
    );
  }

  if (propertyType === DATA_TYPES['null']) {
    return (
    <Input
      data-test="filter-disabled"
      disabled
      variant="solid"
      value={'null'}
    />
    );
  }

  if (propertyType === DATA_TYPES['datetime']) {
    const initialDate = filter?.propertyValue || DEFAULT_TIMEFRAME_ABSOLUTE_VALUE
    return (
      <DatePicker
        idx={idx}
        initialDate={initialDate}
        onChange={
          (idx, value) => onChange(idx, value)
        }
      />
    )
  }

  if (propertyType === DATA_TYPES['geo']) {
    return (
      <GeoCoordinates
        idx={idx}
        filter={filter}
        onChange={(idx, value) => onChange(idx, value)}
      />
    )
  }

  return (
    <Input
      data-test="filter-input"
      variant="solid"
      placeholder="Value"
      value={getInputValue(filter)}
      onChange={(e) => onChange(idx, e.target.value)}
    />
  );
}

export default FilterValue;
