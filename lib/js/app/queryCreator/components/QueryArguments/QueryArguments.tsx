import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, MenuItem } from './QueryArguments.styles';

import {
  Analysis,
  EventCollection,
  TargetProperty,
  Timeframe,
  Percentile
} from '../../components';
import { showField } from '../../utils/showField';

import {
  selectEventCollection,
  selectTargetProperty,
  selectAnalysis,
  getEventCollection,
  getAnalysis,
  getTargetProperty,
  getTimeframe,
  getTimezone,
  getPercentile,
  selectTimezone,
  setTimeframe,
  setPercentile,
  DEFAULT_TIMEFRAME,
} from '../../modules/query';

type Props = {};

const App: FC<Props> = () => {
  const dispatch = useDispatch();
  const analysis = useSelector(getAnalysis);
  const collection = useSelector(getEventCollection);
  const timeframe = useSelector(getTimeframe);
  const targetProperty = useSelector(getTargetProperty);
  const timezone = useSelector(getTimezone);
  const percentile = useSelector(getPercentile);

  return (
    <Container>
      <MenuItem width="25%">
        <Analysis
          analysis={analysis}
          onChange={(updatedAnalysis) =>
            dispatch(selectAnalysis(updatedAnalysis))
          }
        />
      </MenuItem>
      {showField('eventCollection', analysis) && (
        <MenuItem width="25%">
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
        <MenuItem width="25%">
          <TargetProperty
            collection={collection}
            property={targetProperty}
            onChange={(property) => {
              dispatch(selectTargetProperty(property));
            }}
          />
        </MenuItem>
      )}
      
      {showField('percentile', analysis) && (
        <MenuItem>
          <Percentile
            value={percentile}
            onReset={() => dispatch(setPercentile(null))}
            onChange={(value) => dispatch(setPercentile(value))}
          />
        </MenuItem>
      )}

      {showField('timeframe', analysis) && (
        <MenuItem width="25%">
          <Timeframe
            id="timeframe"
            value={timeframe}
            timezone={timezone}
            onReset={() => {
              dispatch(setTimeframe(DEFAULT_TIMEFRAME));
              dispatch(selectTimezone(undefined));
            }}
            onTimeframeChange={(timeframe) => dispatch(setTimeframe(timeframe))}
            onTimezoneChange={(timezone) => dispatch(selectTimezone(timezone))}
          />
        </MenuItem>
      )}
    </Container>
  );
};

export default App;
