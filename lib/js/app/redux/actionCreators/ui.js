/* eslint-disable @typescript-eslint/camelcase */
import { translateDeprecatedCharts, getTypeAndValue } from '../../utils/filter';

import { getChartType } from '../../utils/charts';

export const updateUI = (payload) => ({
  type: 'UI_UPDATE',
  payload,
});

export const updateUISavedQuery = ({ item, schemas }) => {
  const { query, metadata } = item;
  let stepLabels = [''];
  if (query.analysis_type === 'funnel') {
    stepLabels = metadata.visualization.step_labels || [''];
  }

  const chartType = metadata
    ? translateDeprecatedCharts(metadata.visualization.chart_type)
    : getChartType(item);

  return {
    type: 'UI_UPDATE',
    payload: {
      panelSave: true,
      autoload: true,
      analysisType: query.analysis_type,
      eventCollection: query.event_collection,
      timezone: query.timezone,
      targetProperty: query.target_property,
      timeframe: query.timeframe,
      percentile: query.percentile,
      propertyNames: query.property_names || [],
      groupBy: query.group_by,
      orderBy: query.order_by &&
        query.order_by.direction && {
          property_name: 'result',
          direction: query.order_by.direction,
        },
      interval: query.interval,
      filters: (query.filters || []).map((itemFilter) => ({
        propertyName: itemFilter.property_name,
        operator: itemFilter.operator,
        ...getTypeAndValue({
          filter: itemFilter,
          eventCollection: query.event_collection,
          schemas,
        }),
      })),
      chartType,
      steps: (query.steps || []).map((item) => ({
        actorProperty: item.actor_property,
        eventCollection: item.event_collection,
        filters: (item.filters || []).map((filteritem) => ({
          propertyName: filteritem.property_name,
          operator: filteritem.operator,
          ...getTypeAndValue({
            filter: filteritem,
            eventCollection: query.event_collection,
            schemas,
          }),
        })),
        inverted: item.inverted,
        optional: item.optional,
        timeframe: item.timeframe,
        timezone: item.timezone,
        withActors: item.with_actors,
      })),
      stepLabels,
    },
  };
};

export const updateStepUI = ({ step, payload, rootPayload = {} }) => ({
  type: 'UI_STEP_UPDATE',
  step,
  payload,
  rootPayload,
});

export const changeEventCollection = (payload) => ({
  type: 'CHANGE_EVENT_COLLECTION',
  payload,
});

export const resetUI = () => ({
  type: 'RESET_UI',
});

export const addFilter = () => ({
  type: 'ADD_FILTER',
});

export const deleteFilter = (payload) => ({
  type: 'DELETE_FILTER',
  payload,
});

export const updateFilter = (payload) => ({
  type: 'UPDATE_FILTER',
  payload,
});

export const addStepFilter = ({ step, payload }) => ({
  type: 'ADD_STEP_FILTER',
  step,
  payload,
});

export const deleteStepFilter = ({ step, payload }) => ({
  type: 'DELETE_STEP_FILTER',
  step,
  payload,
});

export const updateStepFilter = ({ step, payload }) => ({
  type: 'UPDATE_STEP_FILTER',
  step,
  payload,
});

export const addStep = () => ({
  type: 'ADD_STEP',
});

export const deleteStep = (payload) => ({
  type: 'DELETE_STEP',
  payload,
});
