import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FieldGroup } from '@keen.io/forms';

import { PropertiesMenu, MenuItem } from './App.styles';

import {
  Accordion,
  Analysis,
  Card,
  EventCollection,
  Extraction,
  GroupBy,
  OrderBy,
  Interval,
  TargetProperty,
  Timeframe,
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
  getTimezone,
  selectTimezone,
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
  const timezone = useSelector(getTimezone);

  return (
    <div>
      <PropertiesMenu>
        <MenuItem>
          <Analysis
            analysis={analysis}
            onChange={(updatedAnalysis) =>
              dispatch(selectAnalysis(updatedAnalysis))
            }
          />
        </MenuItem>
        {showField('eventCollection', analysis) && (
          <MenuItem>
            <EventCollection
              collection={collection}
              onReset={() => dispatch(selectEventCollection(null))}
              onChange={(collection) =>
                dispatch(selectEventCollection(collection))
              }
            />
          </MenuItem>
        )}
        {showField('targetProperty', analysis) && (
          <MenuItem>
            <TargetProperty collection={collection} />
          </MenuItem>
        )}
        {showField('timeframe', analysis) && (
          <MenuItem>
            <Timeframe
              id="timeframe"
              value={timeframe}
              timezone={timezone}
              onReset={() => {
                dispatch(setTimeframe(DEFAULT_TIMEFRAME));
                dispatch(selectTimezone(undefined));
              }}
              onTimeframeChange={(timeframe) =>
                dispatch(setTimeframe(timeframe))
              }
              onTimezoneChange={(timezone) =>
                dispatch(selectTimezone(timezone))
              }
            />
          </MenuItem>
        )}
      </PropertiesMenu>

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
