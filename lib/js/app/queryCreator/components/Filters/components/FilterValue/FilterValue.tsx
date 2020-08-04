import React, { FC } from 'react';

import Property from '../../../Property';
import PropertyGroup, { PropertyItem } from '../../../PropertyGroup';
import Input from '../../../Input';
import GeoCoordinates from '../GeoCoordinates';
import FilterBoolean from '../FilterBoolean';

import text from './text.json';

import { Coordinates, Operator, Property as PropertyType } from '../../types';

type Props = {
  /** Type of property */
  propertyType: PropertyType;
  /** Change event handler */
  onChange: (value: string | boolean | number | Coordinates) => void;
  /** Filter value */
  value?: string | boolean | number | Coordinates;
  /** Filter operator */
  operator?: Operator;
};

const getValueComponent = (
  propertyType: PropertyType,
  operator: Operator,
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

const FilterValue: FC<Props> = ({
  propertyType,
  operator,
  value,
  onChange,
}) => {
  return (
    <>
      {propertyType && operator ? (
        <div>{getValueComponent(propertyType, operator, onChange, value)}</div>
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
