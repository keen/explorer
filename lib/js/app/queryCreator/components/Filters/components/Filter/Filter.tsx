import React, { FC } from 'react';
import { ActionButton } from '@keen.io/ui-core';

import { Container, FilterItem } from './Filter.styles';

import FilterProperty from '../FilterProperty';
import PropertyType from '../PropertyType';
import FilterOperator from '../FilterOperator';
import FilterValue from '../FilterValue';

import { setDefaultValue, setOperator, isComponentChange } from '../../utils';

import { Filter as FilterType } from '../../../../types';

type Props = {
  /** Filter settings */
  filter: FilterType;
  /** Remove event handler */
  onRemove: () => void;
  /** Change event handler */
  onChange: (filter: FilterType) => void;
  /** Change property event handler */
  onPropertyChange: (propertyName: string) => void;
  /** Search properties event handler */
  onSearchProperties: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Properties tree */
  properties: Record<string, string[] | Record<string, any>>;
};

const Filter: FC<Props> = ({
  filter,
  properties,
  onRemove,
  onSearchProperties,
  onPropertyChange,
  onChange,
}) => {
  const { propertyName, propertyType, propertyValue, operator } = filter;

  return (
    <Container>
      <FilterItem>
        <FilterProperty
          property={propertyName}
          properties={properties}
          onSelectProperty={(property) => onPropertyChange(property)}
          onSearchProperties={onSearchProperties}
        />
      </FilterItem>
      <FilterItem>
        <PropertyType
          onChange={(propertyType) => {
            const operator = setOperator(propertyType, filter.operator);
            onChange({
              ...filter,
              propertyType,
              operator,
              propertyValue: setDefaultValue(propertyType, operator),
            });
          }}
          property={propertyName}
          type={propertyType}
        />
      </FilterItem>
      <FilterItem>
        <FilterOperator
          propertyType={propertyType}
          operator={operator}
          onChange={(updatedOperator) => {
            const componentChange = isComponentChange(
              propertyType,
              operator,
              updatedOperator
            );
            const filterValue = componentChange
              ? setDefaultValue(propertyType, updatedOperator)
              : propertyValue;

            onChange({
              ...filter,
              operator: updatedOperator,
              propertyValue: filterValue,
            });
          }}
        />
      </FilterItem>
      <FilterItem>
        <FilterValue
          value={propertyValue}
          operator={operator}
          onChange={(value) => onChange({ ...filter, propertyValue: value })}
          propertyType={propertyType}
        />
      </FilterItem>
      <FilterItem>
        <ActionButton action="remove" onClick={onRemove} />
      </FilterItem>
    </Container>
  );
};

export default Filter;
