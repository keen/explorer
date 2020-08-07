import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { ActionButton } from '@keen.io/ui-core';
import { FieldGroup } from '@keen.io/forms';

import { FiltersSettings, ActionContainer } from './App.styles';

import {
  QueryArguments,
  Card,
  Extraction,
  GroupBy,
  OrderBy,
  Interval,
  Limit,
  Percentile,
  Title,
  FunnelSteps,
  Filters,
} from './components';

import { showField } from './utils/showField';
import text from './text.json';

import {
  getPercentile,
  getEventCollection,
  getAnalysis,
  getFilters,
  setPercentile,
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
  const percentile = useSelector(getPercentile);

  const filters = useSelector(getFilters);

  const isSchemaExist = useSelector((state: AppState) => {
    const schemas = getSchemas(state);
    return schemas[collection];
  });
  const isSchemaLoading = useSelector((state: AppState) =>
    getSchemaLoading(state, collection)
  );

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
        {showField('groupBy', analysis) && <GroupBy collection={collection} />}
        {showField('orderBy', analysis) && <OrderBy />}
        {showField('interval', analysis) && <Interval />}
        {showField('limit', analysis) && <Limit />}
      </Card>

      {analysis === 'extraction' && <Extraction collection={collection} />}

      {showField('percentile', analysis) && (
        <FieldGroup>
          <Percentile
            value={percentile}
            onReset={() => dispatch(setPercentile(null))}
            onChange={(value) => dispatch(setPercentile(value))}
          />
        </FieldGroup>
      )}
    </div>
  );
};

export default App;
