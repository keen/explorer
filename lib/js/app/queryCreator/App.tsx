import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ActionButton } from '@keen.io/ui-core';

import {
  FiltersSettings,
  ModifiersSettings,
  ModifiersItem,
  LimitContainer,
  ActionContainer,
} from './App.styles';

import {
  QueryArguments,
  Card,
  Extraction,
  GroupBy,
  OrderBy,
  Interval,
  Limit,
  Title,
  FunnelSteps,
  Filters,
} from './components';

import { showField } from './utils/showField';
import text from './text.json';

import {
  getEventCollection,
  getAnalysis,
  getFilters,
  removeFilter,
  addFilter,
  setFilters,
  updateFilter,
} from './modules/query';
import { getSchemas, getSchemaLoading } from './modules/events';

import { AppState } from './types';

type Props = {
  /** Preview collection event handler */
  onPreviewCollection?: (collection: string) => void;
};

const App: FC<Props> = () => {
  const dispatch = useDispatch();
  const analysis = useSelector(getAnalysis);
  const collection = useSelector(getEventCollection);

  const filters = useSelector(getFilters);

  const isSchemaExist = useSelector((state: AppState) => {
    const schemas = getSchemas(state);
    return schemas[collection];
  });
  const isSchemaLoading = useSelector((state: AppState) =>
    getSchemaLoading(state, collection)
  );

  const modifiersItemSettings = {
    marginBottom: { xs: 20, md: 0 },
    marginRight: { xs: 0, md: 25 },
    width: { xs: '100%', md: 'auto' },
  };

  return (
    <div>
      <QueryArguments />
      {showField('filters', analysis) && (
        <FiltersSettings>
          <Card>
            <Title isDisabled={!collection}>{text.filters}</Title>
            {isSchemaExist && !isSchemaLoading && (
              <Filters
                collection={collection}
                filters={filters}
                onReset={() => dispatch(setFilters([]))}
                onRemove={(idx) => dispatch(removeFilter(idx))}
                onChange={(idx, filter) => dispatch(updateFilter(idx, filter))}
              />
            )}
            <ActionContainer hasSpacing={!!filters.length}>
              <ActionButton
                action="create"
                isDisabled={!collection}
                onClick={() => {
                  const filterId = uuid();
                  dispatch(addFilter(filterId));
                }}
              />
            </ActionContainer>
          </Card>
        </FiltersSettings>
      )}
      <Card>
        {showField('steps', analysis) && <FunnelSteps />}
        <ModifiersSettings flexDirection={{ xs: 'column', md: 'row' }}>
          {showField('groupBy', analysis) && (
            <ModifiersItem {...modifiersItemSettings}>
              <GroupBy collection={collection} />
            </ModifiersItem>
          )}
          {showField('orderBy', analysis) && (
            <ModifiersItem {...modifiersItemSettings}>
              <OrderBy collection={collection} />
            </ModifiersItem>
          )}
          {showField('limit', analysis) && (
            <LimitContainer>
              <Limit />
            </LimitContainer>
          )}
        </ModifiersSettings>
        {showField('interval', analysis) && <Interval />}
      </Card>

      {analysis === 'extraction' && <Extraction collection={collection} />}
    </div>
  );
};

export default App;
