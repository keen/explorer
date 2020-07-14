import React, { FC, useState, useEffect } from 'react';
import { Button } from '@keen.io/ui-core';
import Filters from './Filters';

import { Filter } from '../../types';

type Props = {
  /** Collection name */
  collection: string;
  /** Filters */
  filters: Filter[];
  /** onChange handler */
  onChange: (filters: Filter[]) => void;
};

export const FiltersContainer: FC<Props> = ({ collection, filters=[], onChange }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  
  const handleChange = (filters:Filter[]) => {
    setLocalFilters(filters);
    setIsEdited(false);
    onChange(filters);
  }
  
  useEffect(() => {
    return () => {
      handleChange([]);
    }
  }, []);

  return (
    <>
      {isEdited ? 
        <Filters collection={collection} filters={localFilters} onChange={filters => handleChange(filters)} />
      :
      <div>
        <span>Filters {localFilters.length}</span>
        <Button 
          variant="secondary"
          style="outline"
          onClick={() => setIsEdited(!isEdited)}>Edit</Button>
      </div>
      }
    </>
  )
}