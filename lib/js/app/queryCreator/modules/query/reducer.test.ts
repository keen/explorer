import { queryReducer, initialState } from './reducer';

import {
  resetExtraction,
  setQuery,
  setLimit,
  setTimeframe,
  setExtractionLimit,
  setExtractionRecipientEmail,
  setExtractionContentEncoding,
  setPropertyNames,
  updateFunnelStep,
  removeFunnelStep,
  addFunnelStep,
  setGroupBy,
  setOrderBy,
  selectAnalysis,
  selectTargetProperty,
  selectEventCollection,
  setPercentile,
} from './actions';
import { DEFAULT_FUNNEL_STEP } from './constants';

import { ReducerState } from './types';
import { OrderBy } from '../../types';

test('reset extraction properties to initial state', () => {
  const action = resetExtraction();
  const state = queryReducer(
    {
      ...initialState,
      contentEncoding: 'gzip',
      propertyNames: ['surname'],
    },
    action
  );

  expect(state).toEqual(initialState);
});

test('set query properties', () => {
  const properties = {
    analysisType: 'extraction',
    groupBy: ['country'],
  };
  const action = setQuery(properties as Partial<ReducerState>);
  const state = queryReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    ...properties,
  });
});

test('set query limit', () => {
  const action = setLimit(100);
  const { limit } = queryReducer(initialState, action);

  expect(limit).toEqual(100);
});

test('set extraction limit', () => {
  const action = setExtractionLimit(45);
  const { latest } = queryReducer(initialState, action);

  expect(latest).toEqual(45);
});

test('set extraction email recipient', () => {
  const email = 'user@keen.io';
  const action = setExtractionRecipientEmail(email);
  const state = queryReducer(initialState, action);

  expect(state.email).toEqual(email);
});

test('set extraction content encoding', () => {
  const encoding = 'gzip';
  const action = setExtractionContentEncoding(encoding);

  const state = queryReducer(initialState, action);

  expect(state.contentEncoding).toEqual(encoding);
});

test('set extraction property names', () => {
  const properties = ['name', 'surname', 'id'];
  const action = setPropertyNames(properties);

  const state = queryReducer(initialState, action);

  expect(state.propertyNames).toEqual(properties);
});

test('set query timeframe', () => {
  const timeframe = 'this_100_days';
  const action = setTimeframe(timeframe);
  const state = queryReducer(initialState, action);

  expect(state.timeframe).toEqual(timeframe);
});

test('set query order by properties', () => {
  const orderBy: OrderBy[] = [
    {
      propertyName: 'result',
      direction: 'ASC',
    },
  ];

  const action = setOrderBy(orderBy);
  const state = queryReducer(initialState, action);

  expect(state.orderBy).toEqual(orderBy);
});

test('set group by properties', () => {
  const groupBy = ['name', 'surname'];

  const action = setGroupBy(groupBy);
  const state = queryReducer(initialState, action);

  expect(state.groupBy).toEqual(groupBy);
});

test('set percentile', () => {
  const percentile = 85;

  const action = setPercentile(percentile);
  const state = queryReducer(initialState, action);

  expect(state.percentile).toEqual(percentile);
});

test('set analysis', () => {
  const analysis = 'funnel';

  const action = selectAnalysis(analysis);
  const state = queryReducer(initialState, action);

  expect(state.analysisType).toEqual(analysis);
});

test('set target property', () => {
  const property = 'keen.id';

  const action = selectTargetProperty(property);
  const state = queryReducer(initialState, action);

  expect(state.targetProperty).toEqual(property);
});

test('set event collection', () => {
  const collection = 'logins';

  const action = selectEventCollection(collection);
  const state = queryReducer(initialState, action);

  expect(state.eventCollection).toEqual(collection);
});

test('update funnel step', () => {
  const stepsState = {
    steps: [
      {
        ...DEFAULT_FUNNEL_STEP,
        eventCollection: 'clicks',
      },
    ],
  };

  const action = updateFunnelStep(0, {
    withActors: true,
    eventCollection: 'logins',
  });

  const { steps } = queryReducer(
    {
      ...initialState,
      ...stepsState,
    },
    action
  );

  expect(steps).toMatchSnapshot();
});

test('removes funnel step', () => {
  const stepsState = {
    steps: [
      {
        ...DEFAULT_FUNNEL_STEP,
        eventCollection: 'clicks',
      },
    ],
  };

  const action = removeFunnelStep(0);
  const { steps } = queryReducer(
    {
      ...initialState,
      ...stepsState,
    },
    action
  );

  expect(steps).toEqual([]);
});

test('add funnel step', () => {
  const stepsState = {
    steps: [
      {
        ...DEFAULT_FUNNEL_STEP,
        eventCollection: 'clicks',
      },
    ],
  };

  const action = addFunnelStep();
  const { steps } = queryReducer(
    {
      ...initialState,
      ...stepsState,
    },
    action
  );

  expect(steps).toMatchSnapshot();
});
