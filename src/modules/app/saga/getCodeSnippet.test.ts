/* eslint-disable @typescript-eslint/camelcase */
import sagaHelper from 'redux-saga-testing';
import { select } from '@redux-saga/core/effects';

import { getCodeSnippet as getCodeSnippetFlow } from './getCodeSnippet';
import { getVisualization } from '../selectors';
import { getQuerySettings } from '../../queries';

describe('getCodeSnippet()', () => {
  const projectId = '@projectId';
  const readKey = '@readKey';
  const chartSettings = {};
  const widgetSettings = {};
  const type = 'metric';
  const querySettings = {
    analysis_type: 'funnel',
    steps: [],
    timezone: null,
    timeframe: null,
  };
  const test = sagaHelper(getCodeSnippetFlow(projectId, readKey));

  test('gets query settings from state', (result) => {
    expect(result).toEqual(select(getQuerySettings));
    return querySettings;
  });

  test('gets visualization settings', (result) => {
    expect(result).toEqual(select(getVisualization));
    return {
      type,
      chartSettings,
      widgetSettings,
    };
  });
});
