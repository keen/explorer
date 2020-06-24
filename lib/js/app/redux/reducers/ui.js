import {
  PANEL_NEW_QUERY,
  ANALYSIS_TYPES,
  DEFAULT_TIMEFRAME_RELATIVE_VALUE,
  TAB_EXTRACTION_PREVIEW,
  EXTRACTION_PREVIEW_EVENTS_DEFAULT,
} from '../../consts';

import { getChartType } from '../../utils/charts';

const defaultAnalysisType = ANALYSIS_TYPES.find((item) => item.default);

const defaultStep = {
  eventCollection: undefined,
  actorProperty: undefined,
  timeframe: DEFAULT_TIMEFRAME_RELATIVE_VALUE,
  timezone: parseInt(localStorage.timezone || 0, 0),
  filters: [],
  inverted: false,
  optional: false,
  withActors: false,
};

const DEFAULT_TIMEZONE = parseInt(localStorage.timezone || 0, 0);

const defaultState = {
  autoload: false,
  analysisType: defaultAnalysisType.type,
  eventCollection: localStorage.eventCollection || undefined,
  targetProperty: undefined,
  filters: [],
  modalFilters: false,
  modalEmbedHTML: false,
  modalPreviewCollection: false,
  groupBy: undefined,
  orderBy: undefined,
  limit: undefined,
  latest: EXTRACTION_PREVIEW_EVENTS_DEFAULT,
  email: '',
  contentEncoding: undefined,
  propertyNames: [],
  interval: undefined,
  numberOfGroupByProps: 1,
  timeframe: DEFAULT_TIMEFRAME_RELATIVE_VALUE,
  timezone: DEFAULT_TIMEZONE,
  percentile: undefined,
  chartType: undefined,
  error: null,
  fetching: false,
  activePanel: PANEL_NEW_QUERY,
  extractionActiveTab: TAB_EXTRACTION_PREVIEW,
  steps: [
    {
      ...defaultStep,
    },
  ],
  activeStep: 0,
  stepLabels: [''],
  loadHeavySchemas: false,
  components: {
    eventCollection: true,
    previewCollections: true,
    analysisType: true,
    timeframe: true,
    timezone: true,
    filters: true,
    groupBy: true,
    interval: true,
    apiQueryUrl: true,
    actorProperty: true,
    step: true,
    savedQueryBrowser: true,
    results: true,
    saveButton: true,
    downloadButton: true,
    embedButton: true,
  },
};

const queries = (state = defaultState, action) => {
  switch (action.type) {
    case 'UI_UPDATE':
      return {
        ...state,
        ...action.payload,
      };
    case 'UI_STEP_UPDATE':
      return {
        ...state,
        steps: state.steps.map((item, itemIndex) => {
          if (itemIndex === action.step) {
            item = {
              ...item,
              ...action.payload,
            };
          }
          return item;
        }),
        ...action.rootPayload,
      };
    case 'CHANGE_EVENT_COLLECTION':
      return {
        ...state,
        ...action.payload,
      };
    case 'CLIENT_RUN_QUERY':
      return {
        ...state,
        error: null,
        fetching: true,
      };
    case 'CLIENT_RUN_QUERY_ERROR':
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };
    case 'CLIENT_RUN_QUERY_SUCCESS':
      return {
        ...state,
        fetching: false,
        chartType: getChartType(action.payload),
      };
    case 'CLIENT_SAVE_QUERY':
      return {
        ...state,
        error: null,
      };
    case 'CLIENT_SAVE_QUERY_SUCCESS':
      return {
        ...state,
        savedQuery: {
          ...state.savedQuery,
          exists: true,
        },
      };
    case 'CLIENT_SAVE_QUERY_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'RESET_UI':
      return {
        ...defaultState,
      };
    case 'CACHE_QUERY_LIMIT_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default queries;
