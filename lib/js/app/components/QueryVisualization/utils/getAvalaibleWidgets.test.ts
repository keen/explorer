import { Query } from '../../../types';
import { getAvailableWidgets } from './getAvailableWidgets';

test('return widgets for extraction', () => {
  const query: Query = {
    analysisType: 'extraction',
    eventCollection: 'Clicks',
    timeframe: 'this_14_days',
  };

  const result = getAvailableWidgets(query);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "table",
    ]
  `);
});

test('return widgets for funnel', () => {
  const query: Query = {
    analysisType: 'funnel',
    eventCollection: 'Clicks',
    timeframe: 'this_14_days',
  };

  const result = getAvailableWidgets(query);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "bar",
      "area",
      "line",
      "funnel",
      "table",
    ]
  `);
});

test('return widgets for interval', () => {
  const query: Query = {
    analysisType: 'count',
    eventCollection: 'Clicks',
    timeframe: 'this_14_days',
    interval: 'daily',
  };

  const result = getAvailableWidgets(query);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "bar",
      "line",
      "area",
      "heatmap",
      "table",
    ]
  `);
});

test('return widgets for groupBy', () => {
  const query: Query = {
    analysisType: 'count',
    eventCollection: 'Clicks',
    timeframe: 'this_14_days',
    groupBy: ['country'],
  };

  const result = getAvailableWidgets(query);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "bar",
      "line",
      "area",
      "pie",
      "donut",
      "heatmap",
      "choropleth",
      "table",
    ]
  `);
});
test('return widgets for default', () => {
  const query: Query = {
    analysisType: 'count',
    eventCollection: 'Clicks',
    timeframe: 'this_14_days',
  };

  const result = getAvailableWidgets(query);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "gauge",
      "metric",
      "table",
    ]
  `);
});
