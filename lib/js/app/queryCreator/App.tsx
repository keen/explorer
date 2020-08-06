import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FieldGroup } from '@keen.io/forms';

import { FiltersSettings } from './App.styles';

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
  setFilters,
  setPercentile,
} from './modules/query';

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

  return (
    <div>
      <QueryArguments />
      {showField('filters', analysis) && (
        <FiltersSettings>
          <Card>
            <Title isDisabled={!collection}>{text.filters}</Title>
            <Filters
              collection={collection}
              filters={filters}
              onChange={(filters) => dispatch(setFilters(filters))}
            />
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
