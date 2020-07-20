import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FieldGroup } from '@keen.io/forms';

import { PreviewCollections, PreviewLabel, CoreProperties } from './App.styles';

import {
  Accordion,
  Analysis,
  EventCollection,
  Extraction,
  GroupBy,
  OrderBy,
  Interval,
  TargetProperty,
  Timeframe,
  Timezone,
  Limit,
  Percentile,
  FunnelSteps,
  FiltersContainer,
} from './components';
import { showField } from './utils/showField';

import {
  selectEventCollection,
  selectAnalysis,
  getPercentile,
  getEventCollection,
  getAnalysis,
  getFilters,
  setFilters,
  setPercentile,
  getTimeframe,
  setTimeframe,
  DEFAULT_TIMEFRAME,
} from './modules/query';

type Props = {
  /** Preview collection event handler */
  onPreviewCollection?: (collection: string) => void;
};

const App: FC<Props> = ({ onPreviewCollection }) => {
  const dispatch = useDispatch();
  const analysis = useSelector(getAnalysis);
  const collection = useSelector(getEventCollection);
  const percentile = useSelector(getPercentile);
  const timeframe = useSelector(getTimeframe);
  const filters = useSelector(getFilters);

  return (
    <div>
      <CoreProperties>
        <Analysis
          analysis={analysis}
          onChange={(updatedAnalysis) =>
            dispatch(selectAnalysis(updatedAnalysis))
          }
        />
        {showField('eventCollection', analysis) && (
          <EventCollection
            collection={collection}
            onReset={() => dispatch(selectEventCollection(null))}
            onChange={(collection) =>
              dispatch(selectEventCollection(collection))
            }
          />
        )}
        {showField('targetProperty', analysis) && (
          <TargetProperty collection={collection} />
        )}
        {showField('timeframe', analysis) && (
          <Timeframe
            id="timeframe"
            value={timeframe}
            onReset={() => dispatch(setTimeframe(DEFAULT_TIMEFRAME))}
            onChange={(timeframe) => dispatch(setTimeframe(timeframe))}
          />
        )}
      </CoreProperties>

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

      {showField('timezone', analysis) && typeof timeframe === 'string' && (
        <Timezone />
      )}
      {showField('steps', analysis) && <FunnelSteps />}
      {showField('groupBy', analysis) && (
        <Accordion renderHeader={() => <div>Group By</div>}>
          <GroupBy collection={collection} />
        </Accordion>
      )}
      {showField('orderBy', analysis) && (
        <Accordion renderHeader={() => <div>Order By</div>}>
          <OrderBy />
        </Accordion>
      )}
      {showField('interval', analysis) && <Interval />}
      {showField('limit', analysis) && <Limit />}
      {showField('filters', analysis) && (
        <Accordion renderHeader={() => <div>Filters</div>}>
          <FiltersContainer
            collection={collection}
            filters={filters}
            onChange={(filters) => dispatch(setFilters(filters))}
          />
        </Accordion>
      )}
    </div>
  );
};

export default App;
