import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAvailableWidgets,
  getSimpleOptionsWidgets,
  WidgetPicker,
} from '@keen.io/widget-picker';

import { Container, PickerContainer } from './EditorVisualization.styles';
import { getDefaultSettings } from './utils';

import QueryVisualization from '../QueryVisualization';
import {
  getVisualization,
  setVisualization,
  updateVisualizationType,
} from '../../modules/app';

import { AppState } from '../../modules/types';

type Props = {
  /** Query definition */
  query: Record<string, any>;
  /** Analysis results */
  queryResults: Record<string, any>;
};

const EditorVisualization: FC<Props> = ({ query, queryResults }) => {
  const dispatch = useDispatch();
  const widgets = useMemo(() => getAvailableWidgets(query), [queryResults]);

  const { widget: widgetType, chartSettings, widgetSettings } = useSelector(
    (state: AppState) => {
      const { type: widget, ...restSettings } = getVisualization(state);
      return {
        widget,
        ...restSettings,
      };
    }
  );

  useEffect(() => {
    if (!widgets.includes(widgetType)) {
      const [defaultWidget] = widgets;
      const { chartSettings, widgetSettings } = getDefaultSettings(
        defaultWidget
      );
      dispatch(setVisualization(defaultWidget, chartSettings, widgetSettings));
      dispatch(updateVisualizationType(defaultWidget));
    }
  }, [widgets, widgetType]);

  return (
    <Container>
      <PickerContainer data-testid="widget-picker">
        <WidgetPicker
          widgets={widgets}
          currentWidget={widgetType}
          chartSettings={chartSettings}
          widgetSettings={widgetSettings}
          disabledWidgetOptions={getSimpleOptionsWidgets(query)}
          onUpdateSettings={(widgetType, chartSettings, widgetSettings) => {
            dispatch(
              setVisualization(widgetType, chartSettings, widgetSettings)
            );
            dispatch(updateVisualizationType(widgetType));
          }}
        />
      </PickerContainer>
      {widgets.includes(widgetType) && (
        <QueryVisualization
          widgetType={widgetType}
          chartSettings={chartSettings}
          widgetSettings={widgetSettings}
          queryResults={queryResults}
        />
      )}
    </Container>
  );
};

export default EditorVisualization;
