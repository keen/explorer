import { transformToQuery } from './transformToQuery';
import { ReducerState } from '../modules/query';

test('transforms query', () => {
  const query = {
    eventCollection: 'logins',
    targetProperty: null,
    timezone: 'UTC',
    groupBy: ['user.age'],
    orderBy: [
      {
        id: 'a5c959be-dabb-4198-b440-fc43902beaf1',
        propertyName: 'user.age',
        direction: 'ASC',
      },
    ],
    timeframe: 'this_14_days',
    analysisType: 'count',
    steps: [],
    filters: [],
  } as ReducerState;

  expect(transformToQuery(query)).toMatchSnapshot();
});
