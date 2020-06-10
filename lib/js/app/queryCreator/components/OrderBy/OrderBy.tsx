import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Label } from '@keen.io/ui-core';

import { getGroupBy } from '../../modules/query';

type Props = {};

const OrderBy: FC<Props> = () => {
  const groupBy = useSelector(getGroupBy);

  const notEmptyGroups = Array.isArray(groupBy) && groupBy.length;
  const showOrderOptions = notEmptyGroups || groupBy;

  return (
    <>
    <Label>order by</Label>
    {showOrderOptions ? (
      'show options'
    ) : (
      'set groupBy'
    )}
    </>
  );
};

export default OrderBy;
