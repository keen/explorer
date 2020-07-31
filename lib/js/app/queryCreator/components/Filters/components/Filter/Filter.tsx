import React, { FC } from 'react';
import { ActionButton } from '@keen.io/ui-core';

import { Container } from './Filter.styles';

import FilterProperty from '../FilterProperty';
import PropertyType from '../PropertyType';

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
  console.log(filter, 'saas');

  const { propertyName } = filter;

  return (
    <Container>
      <FilterProperty
        property={propertyName}
        properties={properties}
        onSelectProperty={(property) =>
          onChange({ ...filter, propertyName: property })
        }
        onSearchProperties={onSearchProperties}
      />
      <PropertyType />
      <ActionButton action="remove" onClick={onRemove} />
    </Container>
  );
};

export default Filter;
