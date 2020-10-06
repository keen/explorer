import { FunnelStep } from '../../types';

export const SET_QUERY = '@query-creator/SET_QUERY';
export const SERIALIZE_QUERY = '@query-creator/SERIALIZE_QUERY';
export const RESET_QUERY = '@query-creator/RESET_QUERY';
export const SELECT_EVENT_COLLECTION = '@query-creator/SELECT_EVENT_COLLECTION';
export const SELECT_ANALYSIS = '@query-creator/SELECT_ANALYSIS';
export const SELECT_TARGET_PROPERTY = '@query-creator/SELECT_TARGET_PROPERTY';
export const SET_PERCENTILE = '@query-creator/SET_PERCENTILE';
export const SET_TIMEFRAME = '@query-creator/SET_TIMEFRAME';
export const SET_GROUP_BY = '@query-creator/SET_GROUP_BY';
export const SET_INTERVAL = '@query-creator/SET_INTERVAL';
export const SET_ORDER_BY = '@query-creator/SET_ORDER_BY';
export const SET_LIMIT = '@query-creator/SET_LIMIT';
export const RESET_EXTRACTION = '@query-creator/RESET_EXTRACTION';
export const SET_EXTRACTION_LIMIT = '@query-creator/SET_EXTRACTION_LIMIT';
export const SET_PROPERTY_NAMES = '@query-creator/SET_PROPERTY_NAMES';
export const SET_FILTERS = '@query-creator/SET_FILTERS';
export const SELECT_TIMEZONE = '@query-creator/SELECT_TIMEZONE';
export const ADD_FUNNEL_STEP = '@query-creator/ADD_FUNNEL_STEP';
export const SELECT_FUNNEL_STEP_EVENT_COLLECTION =
  '@query-creator/SELECT_FUNNEL_STEP_EVENT_COLLECTION';
export const REMOVE_FUNNEL_STEP = '@query-creator/REMOVE_FUNNEL_STEP';
export const UPDATE_FUNNEL_STEP = '@query-creator/UPDATE_FUNNEL_STEP';
export const CLONE_FUNNEL_STEP = '@query-creator/CLONE_FUNNEL_STEP';
export const SET_FUNNEL_STEPS = '@query-creator/SET_FUNNEL_STEPS';
export const SET_FUNNEL_STEP_FILTERS = '@query-creator/SET_FUNNEL_STEP_FILTERS';
export const CHANGE_FUNNEL_STEPS_ORDER =
  '@query-creator/CHANGE_FUNNEL_STEP_ORDER';
export const ADD_FUNNEL_STEP_FILTER = '@query-creator/ADD_FUNNEL_STEP_FILTER';
export const UPDATE_FUNNEL_STEP_FILTER =
  '@query-creator/UPDATE_FUNNEL_STEP_FILTER';
export const REMOVE_FUNNEL_STEP_FILTER =
  '@query-creator/REMOVE_FUNNEL_STEP_FILTER';
export const UPDATE_FUNNEL_STEP_TIMEZONE =
  '@query-creator/UPDATE_FUNNEL_STEP_TIMEZONE';
export const ADD_FILTER = '@query-creator/ADD_FILTER';
export const UPDATE_FILTER = '@query-creator/UPDATE_FILTER';
export const REMOVE_FILTER = '@query-creator/REMOVE_FILTER';

export const DEFAULT_ANALYSIS = 'count';
export const DEFAULT_TIMEFRAME = 'this_14_days';
export const DEFAULT_TIMEZONE = 'UTC';
export const DEFAULT_EXTRACTION_LIMIT = 100;

export const DEFAULT_FILTER = {
  propertyName: undefined,
  operator: undefined,
  propertyValue: undefined,
  propertyType: undefined,
};

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
