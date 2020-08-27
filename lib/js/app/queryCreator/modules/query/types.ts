import {
  SERIALIZE_QUERY,
  SET_QUERY,
  SELECT_EVENT_COLLECTION,
  SELECT_ANALYSIS,
  SELECT_TARGET_PROPERTY,
  SET_PERCENTILE,
  SET_TIMEFRAME,
  SET_GROUP_BY,
  SET_ORDER_BY,
  SET_INTERVAL,
  SET_LIMIT,
  SET_EXTRACTION_LIMIT,
  SET_EXTRACTION_RECIPIENT_EMAIL,
  SET_EXTRACTION_CONTENT_ENCODING,
  SET_PROPERTY_NAMES,
  SET_FILTERS,
  SELECT_TIMEZONE,
  ADD_FUNNEL_STEP,
  REMOVE_FUNNEL_STEP,
  UPDATE_FUNNEL_STEP,
  SELECT_FUNNEL_STEP_EVENT_COLLECTION,
  CHANGE_FUNNEL_STEPS_ORDER,
  RESET_EXTRACTION,
  RESET_QUERY,
  ADD_FILTER,
  UPDATE_FILTER,
  REMOVE_FILTER,
} from './constants';

import { Timezones, Timeframe, OrderBy, FunnelStep, Filter } from '../../types';
import { Analysis } from '../../../types';

export type ReducerState = {
  eventCollection?: string;
  targetProperty?: string;
  percentile?: number;
  timezone?: number | Timezones;
  groupBy?: string | string[];
  orderBy?: OrderBy[];
  limit?: number;
  timeframe: Timeframe;
  interval?: string;
  analysisType: Analysis;
  filters?: Filter[];
  steps?: FunnelStep[];
  propertyNames?: string | string[];
  latest?: number;
  email?: string;
  contentEncoding?: string;
};

export interface SetQueryAction {
  type: typeof SET_QUERY;
  payload: {
    query: Partial<ReducerState>;
  };
}

export interface SerializeQueryAction {
  type: typeof SERIALIZE_QUERY;
  payload: {
    query: Partial<ReducerState>;
  };
}

export interface ResetQueryAction {
  type: typeof RESET_QUERY;
}

export interface AddFilterAction {
  type: typeof ADD_FILTER;
  payload: { id: string };
}

export interface RemoveFilterAction {
  type: typeof REMOVE_FILTER;
  payload: { index: number };
}

export interface UpdateFilterAction {
  type: typeof UPDATE_FILTER;
  payload: { index: number; filter: Partial<Filter> };
}

export interface SetExtractionLimitAction {
  type: typeof SET_EXTRACTION_LIMIT;
  payload: {
    limit: number;
  };
}

export interface SetExtractionRecipientEmailAction {
  type: typeof SET_EXTRACTION_RECIPIENT_EMAIL;
  payload: {
    email: string;
  };
}

export interface SetExtractionContentEncodingAction {
  type: typeof SET_EXTRACTION_CONTENT_ENCODING;
  payload: {
    contentEncoding: string;
  };
}

export interface ResetExtractionAction {
  type: typeof RESET_EXTRACTION;
}

export interface SelectEventCollectionAction {
  type: typeof SELECT_EVENT_COLLECTION;
  payload: {
    name: string;
  };
}

export interface SelectAnalysisAction {
  type: typeof SELECT_ANALYSIS;
  payload: {
    analysis: Analysis;
  };
}

export interface SelectTargetPropertyAction {
  type: typeof SELECT_TARGET_PROPERTY;
  payload: {
    property: string;
  };
}

export interface SelectTimezoneAction {
  type: typeof SELECT_TIMEZONE;
  payload: {
    timezone: Timezones;
  };
}

export interface SetPercentileAction {
  type: typeof SET_PERCENTILE;
  payload: {
    percentile: number;
  };
}

export interface SetPropertyNamesAction {
  type: typeof SET_PROPERTY_NAMES;
  payload: {
    propertyNames: string[];
  };
}

export interface SetTimeframeAction {
  type: typeof SET_TIMEFRAME;
  payload: {
    timeframe: Timeframe;
  };
}

export interface SetGroupByAction {
  type: typeof SET_GROUP_BY;
  payload: {
    groupBy: string | string[] | undefined;
  };
}

export interface SetIntervalAction {
  type: typeof SET_INTERVAL;
  payload: {
    interval: string | undefined;
  };
}

export interface SetOrderByAction {
  type: typeof SET_ORDER_BY;
  payload: {
    orderBy: OrderBy[] | undefined;
  };
}

export interface SetLimitAction {
  type: typeof SET_LIMIT;
  payload: {
    limit: number | undefined;
  };
}

export interface SetFiltersAction {
  type: typeof SET_FILTERS;
  payload: {
    filters: Filter[];
  };
}

export interface AddFunnelStepAction {
  type: typeof ADD_FUNNEL_STEP;
}

export interface SelectFunnelStepEventCollectionAction {
  type: typeof SELECT_FUNNEL_STEP_EVENT_COLLECTION;
  payload: { name: string };
}

export interface RemoveFunnelStepAction {
  type: typeof REMOVE_FUNNEL_STEP;
  payload: {
    index: number;
  };
}

export interface UpdateFunnelStepAction {
  type: typeof UPDATE_FUNNEL_STEP;
  payload: {
    index: number;
    properties: Partial<FunnelStep>;
  };
}

export interface ChangeFunnelStepsOrderAction {
  type: typeof CHANGE_FUNNEL_STEPS_ORDER;
  payload: {
    index: number;
    updatedIndex: number;
  };
}

export type QueryActions =
  | SerializeQueryAction
  | SetQueryAction
  | ResetQueryAction
  | SelectEventCollectionAction
  | SelectAnalysisAction
  | SelectTargetPropertyAction
  | SetPercentileAction
  | SetGroupByAction
  | SetOrderByAction
  | SetIntervalAction
  | SetLimitAction
  | SetExtractionLimitAction
  | SetExtractionRecipientEmailAction
  | SetExtractionContentEncodingAction
  | SetPropertyNamesAction
  | SetTimeframeAction
  | SetFiltersAction
  | SelectTimezoneAction
  | AddFunnelStepAction
  | UpdateFunnelStepAction
  | RemoveFunnelStepAction
  | SelectFunnelStepEventCollectionAction
  | ChangeFunnelStepsOrderAction
  | ResetExtractionAction
  | AddFilterAction
  | RemoveFilterAction
  | UpdateFilterAction;
