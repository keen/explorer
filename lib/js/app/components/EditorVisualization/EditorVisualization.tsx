import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAvailableWidgets,
  getSimpleOptionsWidgets,
  WidgetPicker,
} from '@keen.io/widget-picker';

import { Container, PickerContainer } from './EditorVisualization.styles';

import QueryVisualization from '../QueryVisualization';
import { getVisualization, setVisualization } from '../../modules/app';

import { AppState } from '../../modules/types';

type Props = {
  /** Query definition */
  query: Record<string, any>;
  /** Analysis results */
  queryResults: Record<string, any>;
};

const EditorVisualization: FC<Props> = ({ query, queryResults }) => {
  const dispatch = useDispatch();
  const widgets = getAvailableWidgets(query);

  const { widget: widgetType, chartSettings, widgetSettings } = useSelector(
    (state: AppState) => {
      const { type, ...restSettings } = getVisualization(state);
      let widget = type;
      if (widget === null) {
        const [defaultWidget] = widgets;
        widget = defaultWidget;
      }

      return {
        widget,
        ...restSettings,
      };
    }
  );

  useEffect(() => {
    if (!widgets.includes(widgetType)) {
      const [defaultWidget] = widgets;
      dispatch(setVisualization(defaultWidget, {}, {}));
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
          onUpdateSettings={(widgetType, chartSettings, widgetSettings) =>
            dispatch(
              setVisualization(widgetType, chartSettings, widgetSettings)
            )
          }
        />
      </PickerContainer>
      <QueryVisualization
        widgetType={widgetType}
        chartSettings={chartSettings}
        widgetSettings={widgetSettings}
        queryResults={queryResults}
      />
    </Container>
  );
};

export default EditorVisualization;
