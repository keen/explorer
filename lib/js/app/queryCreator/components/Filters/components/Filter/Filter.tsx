import React, { FC } from 'react';
import { ActionButton } from '@keen.io/ui-core';

import { Container, FilterItem } from './Filter.styles';

import FilterProperty from '../FilterProperty';
import FilterOperator from '../FilterOperator';
import FilterValue from '../FilterValue';

import { setDefaultValue, setOperator, isComponentChange } from '../../utils';

import { Filter as FilterType } from '../../../../types';

type Props = {
  /** Filter identifier */
  id: string;
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
  id,
  filter,
  properties,
  onRemove,
  onSearchProperties,
  onPropertyChange,
  onChange,
}) => {
  const { propertyName, propertyType, propertyValue, operator } = filter;

  return (
    <Container data-testid="filter-item">
      <FilterItem>
        <FilterProperty
          property={propertyName}
          type={propertyType}
          properties={properties}
          onBlur={() => {
            if (!propertyName) onRemove();
          }}
          onSelectProperty={(property) => onPropertyChange(property)}
          onCastPropertyType={(propertyType) => {
            const operator = setOperator(propertyType, filter.operator);
            onChange({
              ...filter,
              propertyType,
              operator,
              propertyValue: setDefaultValue(propertyType, operator),
            });
          }}
          onSearchProperties={onSearchProperties}
        />
      </FilterItem>
      <FilterItem>
        <FilterOperator
          property={propertyName}
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
          id={id}
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
