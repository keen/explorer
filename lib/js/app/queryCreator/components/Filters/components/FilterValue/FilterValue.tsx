import React, { FC } from 'react';
import { Input } from '@keen.io/ui-core';
import moment from 'moment';

import { DatePickerContainer } from './FilterValue.styles';

import Property from '../../../Property';
import PropertyGroup, { PropertyItem } from '../../../PropertyGroup';
import FilterListValue from '../FilterListValue';
import GeoCoordinates from '../GeoCoordinates';
import DatePicker from '../../../DatePicker';
import FilterBoolean from '../FilterBoolean';

import text from './text.json';

import { TYPES_CONFIG } from '../../constants';

import { GetComponent } from './types';
import {
  Coordinates,
  Operator,
  Property as PropertyType,
} from '../../../../types';

type Props = {
  /** Type of property */
  propertyType: PropertyType;
  /** Change event handler */
  onChange: (
    value: string | boolean | number | Coordinates | Array<string | number>
  ) => void;
  /** Filter value */
  value?: string | boolean | number | Coordinates | Array<string | number>;
  /** Filter operator */
  operator?: Operator;
  /** Filter identifier */
  id: string;
};

const getValueComponent = ({
  propertyType,
  operator,
  onChange,
  value,
  id,
}: GetComponent) => {
  const { component } = TYPES_CONFIG[propertyType][operator];

  switch (component) {
    case 'null-placeholder':
      return null;
    case 'list':
      return <FilterListValue items={value as string[]} onChange={onChange} />;
    case 'datepicker':
      return (
        <DatePickerContainer>
          <DatePicker
            date={moment.utc(value as string)}
            id={`datepicker_${id}`}
            onChange={onChange}
          />
        </DatePickerContainer>
      );
    case 'boolean-switcher':
      return <FilterBoolean value={value as boolean} onChange={onChange} />;
    case 'geo-coordinates':
      return (
        <GeoCoordinates onChange={onChange} value={value as Coordinates} />
      );
    case 'input-number':
      return (
        <Input
          type="number"
          variant="solid"
          value={value as number}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      );
    default:
      return (
        <Input
          data-testid="filter-value-input"
          variant="solid"
          value={value as string}
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
  id,
}) => {
  return (
    <>
      {propertyType && operator ? (
        <>
          {getValueComponent({ propertyType, operator, onChange, value, id })}
        </>
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
