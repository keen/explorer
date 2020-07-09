import React, { FC, useState } from 'react';
import { Button } from '@keen.io/ui-core';
import { Filters } from './Filters';

import { Filter } from '../../types';

type Props = {
  /** Collection name */
  collection: string;
};

const tempFilters = [{"propertyName":"state","operator":"ne","propertyValue":"Arizona"}] as Filter[];

export const FiltersContainer: FC<Props> = ({ collection }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [filters, setFilters] = useState(tempFilters);

  const handleChange = (filters:Filter[]) => {
    setFilters(filters);
    setIsEdited(false);
  }

  return (
    <>
      {isEdited ? 
        <Filters collection={collection} filters={filters} onChange={filters => handleChange(filters)} />
      :
      <div>
        <span>Filters {filters.length}</span>
        <Button 
          variant="secondary"
          style="outline"
          onClick={() => setIsEdited(!isEdited)}>Edit</Button>
      </div>
      }
    </>
  )
}