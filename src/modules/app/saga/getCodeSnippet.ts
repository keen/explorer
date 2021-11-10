import { select } from 'redux-saga/effects';
import { createCodeSnippet } from '../../../utils';
import { getQuerySettings } from '../../queries';
import { getVisualization } from '../selectors';

export function* getCodeSnippet(projectId: string, readKey: string) {
  const query = yield select(getQuerySettings);
  const { type: widget, chartSettings, widgetSettings } = yield select(
    getVisualization
  );

  const snippet = createCodeSnippet({
    widget,
    query,
    chartSettings,
    widgetSettings,
    projectId,
    readKey,
  });

  return snippet;
}
