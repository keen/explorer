import { FunnelStep } from '../../types';

export const SELECT_EVENT_COLLECTION = '@query-creator/SELECT_EVENT_COLLECTION';
export const SELECT_ANALYSIS = '@query-creator/SELECT_ANALYSIS';
export const SELECT_TARGET_PROPERTY = '@query-creator/SELECT_TARGET_PROPERTY';
export const SET_PERCENTILE = '@query-creator/SET_PERCENTILE';
export const SET_TIMEFRAME = '@query-creator/SET_TIMEFRAME';
export const SELECT_TIMEZONE = '@query-creator/SELECT_TIMEZONE';
export const ADD_FUNNEL_STEP = '@query-creator/ADD_FUNNEL_STEP';
export const REMOVE_FUNNEL_STEP = '@query-creator/REMOVE_FUNNEL_STEP';
export const UPDATE_FUNNEL_STEP = '@query-creator/UPDATE_FUNNEL_STEP';
export const UPDATE_FUNNEL_STEP_EVENT_COLLECTION =
  '@query-creator/UPDATE_FUNNEL_STEP_EVENT_COLLECTION';
export const CHANGE_FUNNEL_STEPS_ORDER =
  '@query-creator/CHANGE_FUNNEL_STEP_ORDER';

export const DEFAULT_ANALYSIS = 'funnel';
export const DEFAULT_TIMEFRAME = 'this_14_days';

export const DEFAULT_FUNNEL_STEP: FunnelStep = {
  eventCollection: undefined,
  actorProperty: undefined,
  timeframe: DEFAULT_TIMEFRAME,
  timezone: undefined,
  filters: [],
  inverted: false,
  optional: false,
  withActors: false,
};
