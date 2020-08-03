import React, { FC } from 'react';

import Property from '../../../Property';
import PropertyGroup, { PropertyItem } from '../../../PropertyGroup';
import Input from '../../../Input';
import GeoCoordinates from '../GeoCoordinates';
import FilterBoolean from '../FilterBoolean';

import text from './text.json';

import { Coordinates, Property as PropertyType } from '../../types';

type Props = {
  value?: string | boolean | number | Coordinates;
  /** Type of property */
  propertyType: PropertyType;
  /** Change event handler */
  onChange: (value: string | boolean | number | Coordinates) => void;
};

const getValueComponent = (
  propertyType: PropertyType,
  onChange: (value: string | boolean | number | Coordinates) => void,
  value?: string | boolean | number | Coordinates
) => {
  switch (propertyType) {
    case 'Boolean':
      return <FilterBoolean value={value as boolean} onChange={onChange} />;
    case 'Geo':
      return (
        <GeoCoordinates onChange={onChange} value={value as Coordinates} />
      );
    case 'Number':
      return (
        <Input
          type="number"
          value={value ? (value as number) : 0}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      );
    default:
      return (
        <Input
          value={value ? (value as string) : ''}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      );
  }
};

const FilterValue: FC<Props> = ({ propertyType, value, onChange }) => {
  return (
    <>
      {propertyType ? (
        <div>{getValueComponent(propertyType, onChange, value)}</div>
      ) : (
        <PropertyGroup isActive={false}>
          <PropertyItem>
            <Property placeholder={text.placeholder} />
          </PropertyItem>
        </PropertyGroup>
      )}
    </>
  );
};

export default FilterValue;
