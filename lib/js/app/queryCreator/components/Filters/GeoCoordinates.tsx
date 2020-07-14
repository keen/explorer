import React, { FC } from 'react';
import { Input } from '@keen.io/ui-core';

import { Filter } from '../../types';
import { Coordinates } from './types';

type Props = {
  /** Index */
  idx: number;
  /** Filter */
  filter: Filter;
  /** Onchange handler */
  onChange: (idx: number, value: Coordinates) => void;
};

const GeoCoordinates: FC<Props> = ({ idx, filter, onChange }) => {
  let newPropertyValue = {
    coordinates: [undefined, undefined],
    maxDistanceMiles: undefined,
  };
  if (filter?.propertyValue && typeof filter?.propertyValue === 'object') {
    newPropertyValue = {
      ...filter.propertyValue,
    };
  }
  const [long = '', lat = ''] = newPropertyValue?.coordinates;
  const radius = newPropertyValue?.maxDistanceMiles || '';
  return (
    <div data-test="filter-geo">
      <Input
        type="number"
        variant="solid"
        placeholder="Longitude"
        value={long}
        onChange={(e) => {
          const value: Coordinates = {
            coordinates: [e.target.value, lat],
            maxDistanceMiles: radius,
          };
          onChange(idx, value);
        }}
      />
      <Input
        type="number"
        variant="solid"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => {
          const value: Coordinates = {
            coordinates: [long, e.target.value],
            maxDistanceMiles: radius,
          };
          onChange(idx, value);
        }}
      />
      <Input
        type="number"
        variant="solid"
        placeholder="Radius [in miles]"
        value={radius}
        onChange={(e) => {
          const value: Coordinates = {
            coordinates: [long, lat],
            maxDistanceMiles: e.target.value,
          };
          onChange(idx, value);
        }}
      />
    </div>
  );
};

export default GeoCoordinates;
