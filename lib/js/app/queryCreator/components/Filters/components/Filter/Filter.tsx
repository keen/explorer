import React, { FC } from 'react';
import { ActionButton } from '@keen.io/ui-core';

import { Container, FilterItem } from './Filter.styles';

import FilterProperty from '../FilterProperty';
import PropertyType from '../PropertyType';
import FilterOperator from '../FilterOperator';
import FilterValue from '../FilterValue';

import { setDefaultValue } from './utils';
import { getPropertyType } from '../../utils';

import { Filter as FilterType } from '../../../../types';

type Props = {
  /** Filter settings */
  filter: FilterType;
  /** Remove event handler */
  onRemove: () => void;
  /** Change event handler */
  onChange: (filter: FilterType) => void;
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
  onChange,
}) => {
  const { propertyName, propertyType, propertyValue, operator } = filter;

  return (
    <Container>
      <FilterItem>
        <FilterProperty
          property={propertyName}
          properties={properties}
          onSelectProperty={(property) =>
            onChange({ ...filter, propertyName: property })
          }
          onSearchProperties={onSearchProperties}
        />
      </FilterItem>
      <FilterItem>
        <PropertyType
          onChange={(propertyType) =>
            onChange({
              ...filter,
              propertyType,
              operator: undefined,
              propertyValue: setDefaultValue(propertyType),
            })
          }
          property={propertyName}
          type={getPropertyType(filter)}
        />
      </FilterItem>
      <FilterItem>
        <FilterOperator
          propertyType={propertyType}
          operator={operator}
          onChange={(value) => onChange({ ...filter, operator: value })}
        />
      </FilterItem>
      <FilterItem>
        <FilterValue
          value={propertyValue}
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
