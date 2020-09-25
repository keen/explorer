import React, { FC } from 'react';
import PropertyName from '../PropertyName';
// import { TYPES_CONFIG } from '../../../../queryCreator/components/Filters/constants';

import { Wrapper, Operator, Value } from './FilterSummary.styles';

import { Filter } from '../../types';

// type Filter = {
//   operator: string;
//   property_name: string;
//   property_value: string;
//   property_type?: string;
// }

type Props = {
  filter: Filter;
};

const FilterSummary: FC<Props> = ({ filter }) => {
  const {
    operator,
    property_name: propertyName,
    property_value: propertyValue,
  } = filter;

  // const operatorLabel = property_type ? TYPES_CONFIG[property_type][operator] : operator;

  return (
    <Wrapper>
      <PropertyName name={propertyName} />
      <Operator>{operator}</Operator>
      <Value>{propertyValue}</Value>
    </Wrapper>
  );
};

export default FilterSummary;
