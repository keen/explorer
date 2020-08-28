import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ActionButton } from '@keen.io/ui-core';

import { Title } from '../';

import FiltersComponent from './FiltersComponent';

import { ActionContainer } from './Filters.styles';

import { getSchemas, getSchemaLoading } from '../../modules/events';

import text from './text.json';

import { AppState, Filter } from '../../types';

type Props = {
  /** Collection */
  collection: string;
  /** Filters */
  filters: Filter[];
  /** onReset handler */
  onReset?: () => void;
  /** onRemove handler */
  onRemove: (idx: number) => void;
  /** onChange handler */
  onChange: (idx: number, filter: Filter) => void;
  /** Add button onClick handler */
  onClick: (idx: string) => void;
};

const Filters: FC<Props> = ({
  collection,
  filters,
  onReset,
  onRemove,
  onChange,
  onClick,
}) => {
  const isSchemaExist = useSelector((state: AppState) => {
    const schemas = getSchemas(state);
    return schemas[collection];
  });
  const isSchemaLoading = useSelector((state: AppState) =>
    getSchemaLoading(state, collection)
  );

  return (
    <div>
      <Title isDisabled={!collection}>{text.filters}</Title>
      {isSchemaExist && !isSchemaLoading && (
        <FiltersComponent
          collection={collection}
          filters={filters}
          onReset={onReset && onReset}
          onRemove={(idx) => onRemove(idx)}
          onChange={(idx, filter) => onChange(idx, filter)}
        />
      )}
      <ActionContainer hasSpacing={!!filters.length}>
        <ActionButton
          action="create"
          isDisabled={!collection}
          onClick={() => {
            const filterId = uuid();
            onClick(filterId);
          }}
        />
      </ActionContainer>
    </div>
  );
};

export default Filters;
