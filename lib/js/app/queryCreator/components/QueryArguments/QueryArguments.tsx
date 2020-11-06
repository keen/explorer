import React, { FC, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  MenuItem,
  MenuItemPercentile,
} from './QueryArguments.styles';

import {
  Analysis,
  EventCollection,
  TargetProperty,
  Timeframe,
  Percentile,
} from '../../components';
import { showField } from '../../utils';

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
import { updateChartSettings } from '../../modules/chartSettings';

import { AppContext } from '../../contexts';

type Props = {};

const App: FC<Props> = () => {
  const dispatch = useDispatch();
  const analysis = useSelector(getAnalysis);
  const collection = useSelector(getEventCollection);
  const timeframe = useSelector(getTimeframe);
  const targetProperty = useSelector(getTargetProperty);
  const timezone = useSelector(getTimezone);
  const percentile = useSelector(getPercentile);
  const { onUpdateChartSettings } = useContext(AppContext);

  return (
    <Container>
      <MenuItem>
        <Analysis
          analysis={analysis}
          onChange={(updatedAnalysis) => {
            dispatch(selectAnalysis(updatedAnalysis));
            dispatch(updateChartSettings({ stepLabels: [] }));
            onUpdateChartSettings({ stepLabels: [] });
          }}
        />
      </MenuItem>

      {showField('percentile', analysis) && (
        <MenuItemPercentile>
          <Percentile
            value={percentile}
            onReset={() => dispatch(setPercentile(null))}
            onChange={(value) => dispatch(setPercentile(value))}
          />
        </MenuItemPercentile>
      )}

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
          <TargetProperty
            collection={collection}
            property={targetProperty}
            onChange={(property) => {
              dispatch(selectTargetProperty(property));
            }}
          />
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
            onTimeframeChange={(timeframe) => dispatch(setTimeframe(timeframe))}
            onTimezoneChange={(timezone) => dispatch(selectTimezone(timezone))}
          />
        </MenuItem>
      )}
    </Container>
  );
};

export default App;
