import { queryReducer, initialState } from './reducer';

import {
  resetExtraction,
  setQuery,
  setLimit,
  setTimeframe,
  setExtractionLimit,
  setPropertyNames,
  updateFunnelStep,
  removeFunnelStep,
  addFunnelStep,
  cloneFunnelStep,
  addFunnelStepFilter,
  changeFunnelStepsOrder,
  updateFunnelStepFilter,
  updateFunnelStepTimezone,
  removeFunnelStepFilter,
  setGroupBy,
  setOrderBy,
  setInterval,
  setFilters,
  selectAnalysis,
  selectTargetProperty,
  selectEventCollection,
  setPercentile,
} from './actions';
import { DEFAULT_FUNNEL_STEP } from './constants';

import { ReducerState } from './types';
import { OrderBy, Filter } from '../../types';

test('reset extraction properties to initial state', () => {
  const action = resetExtraction();
  const state = queryReducer(
    {
      ...initialState,
      propertyNames: [{ id: 'id', propertyName: 'country' }],
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

test('set extraction property names', () => {
  const properties = [{ id: 'id', propertyName: 'surname' }];
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

test('set query interval', () => {
  const interval = 'monthly';
  const action = setInterval(interval);
  const state = queryReducer(initialState, action);

  expect(state.interval).toEqual(interval);
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

test('set filters', () => {
  const filters = [
    { propertyName: 'state', operator: 'ne', propertyValue: 'Arizona' },
  ] as Filter[];

  const action = setFilters(filters);
  const state = queryReducer(initialState, action);

  expect(state.filters).toEqual(filters);
});

test('update funnel step', () => {
  const stepsState = {
    steps: [
      {
        ...DEFAULT_FUNNEL_STEP,
        eventCollection: 'clicks',
        id: 'asd123',
      },
    ],
  };

  const action = updateFunnelStep('asd123', {
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
        id: 'asd123',
      },
    ],
  };

  const action = removeFunnelStep('asd123');
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

  const action = addFunnelStep('qwe123');
  const { steps } = queryReducer(
    {
      ...initialState,
      ...stepsState,
    },
    action
  );

  expect(steps).toMatchSnapshot();
});

test('inherits settings from previous funnel step', () => {
  const stepsState = {
    steps: [
      {
        id: 'step1',
        ...DEFAULT_FUNNEL_STEP,
        timeframe: 'previous_1_year',
        eventCollection: 'clicks',
      },
    ],
  };

  const action = addFunnelStep('step2');
  const { steps } = queryReducer(
    {
      ...initialState,
      ...stepsState,
    },
    action
  );

  expect(steps).toMatchSnapshot();
});

test('clone funnel step', () => {
  const stepsState = {
    steps: [
      {
        ...DEFAULT_FUNNEL_STEP,
        eventCollection: 'clicks',
        id: 'asd123',
      },
    ],
  };

  const action = cloneFunnelStep('asd123', 'qwe456');
  const { steps } = queryReducer(
    {
      ...initialState,
      ...stepsState,
    },
    action
  );

  expect(steps).toMatchSnapshot();
});

test('add funnel step filter', () => {
  const stepsState = {
    steps: [
      {
        ...DEFAULT_FUNNEL_STEP,
        eventCollection: 'clicks',
        id: 'asd123',
      },
    ],
  };

  const action = addFunnelStepFilter('asd123', 'qwe456');
  const { steps } = queryReducer(
    {
      ...initialState,
      ...stepsState,
    },
    action
  );

  expect(steps).toMatchSnapshot();
});

test('update funnel step filter', () => {
  const stepsState = {
    steps: [
      {
        ...DEFAULT_FUNNEL_STEP,
        eventCollection: 'clicks',
        id: 'asd123',
        filter: [
          {
            id: 'qwe456',
            propertyName: 'id',
            operator: 'eq',
            propertyValue: 'city',
          },
        ],
      },
    ],
  };

  const action = updateFunnelStepFilter('asd123', 'qwe456', {
    propertyName: 'id',
    operator: 'ne',
    propertyValue: 'name',
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

test('remove funnel step filter', () => {
  const stepsState = {
    steps: [
      {
        ...DEFAULT_FUNNEL_STEP,
        eventCollection: 'clicks',
        id: 'asd123',
        filter: [
          {
            id: 'qwe456',
            propertyName: 'id',
            operator: 'eq',
            propertyValue: 'city',
          },
        ],
      },
    ],
  };

  const action = removeFunnelStepFilter('asd123', 'qwe456');
  const { steps } = queryReducer(
    {
      ...initialState,
      ...stepsState,
    },
    action
  );

  expect(steps).toMatchSnapshot();
});

test('updates funnel steps order', () => {
  const funnelSteps = [
    {
      ...DEFAULT_FUNNEL_STEP,
      eventCollection: 'purchases',
      id: 'id2',
      inverted: true,
      optional: true,
    },
    {
      ...DEFAULT_FUNNEL_STEP,
      eventCollection: 'clicks',
      id: 'id1',
    },
  ];

  const action = changeFunnelStepsOrder(funnelSteps);
  const { steps } = queryReducer(initialState, action);

  const [firstStep] = steps;

  expect(firstStep.inverted).toBeFalsy();
  expect(firstStep.optional).toBeFalsy();
});

test('update funnel step timezone', () => {
  const stepsState = {
    steps: [
      {
        ...DEFAULT_FUNNEL_STEP,
        eventCollection: 'clicks',
        id: 'asd123',
      },
    ],
  };

  const action = updateFunnelStepTimezone('asd123', 'US/Central');
  const { steps } = queryReducer(
    {
      ...initialState,
      ...stepsState,
    },
    action
  );

  expect(steps).toMatchSnapshot();
});
