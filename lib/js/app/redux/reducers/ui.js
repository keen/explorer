import {
  PANEL_NEW_QUERY,
  ANALYSIS_TYPES,
  DEFAULT_TIMEFRAME_RELATIVE_VALUE,
  TAB_TIMEFRAME_RELATIVE,
  TAB_INTERVAL_STANDARD,
  TAB_EXTRACTION_PREVIEW,
  EXTRACTION_PREVIEW_EVENTS_LIMIT,
} from '../../components/consts';

const defaultAnalysisType = ANALYSIS_TYPES.find(item => item.default);

const defaultStateSavedQuery = {
  name: '',
  displayName: '',
  cache: false,
  refreshRate: 0,
  exists: false,
};

const defaultState = {
  autoload: false,
  analysisType: defaultAnalysisType.type,
  eventCollection: undefined,
  showTargetProperty: false,
  targetProperty: undefined,
  filters: [],
  modalFilters: false,
  modalEmbedHTML: false,
  groupBy: undefined,
  orderBy: undefined,
  limit: undefined,
  latest: EXTRACTION_PREVIEW_EVENTS_LIMIT,
  email: '',
  propertyNames: [],
  interval: undefined,
  numberOfGroupByProps: 1,
  timeframe: DEFAULT_TIMEFRAME_RELATIVE_VALUE,
  timezone: parseInt(localStorage.timezone || 0, 0),
  percentile: undefined,
  chartType: undefined,
  savedQuery: {
    ...defaultStateSavedQuery,
  },
  error: null,
  fetching: false,
  activePanel: PANEL_NEW_QUERY,
  panelSave: false,
  timeframeActiveTab: TAB_TIMEFRAME_RELATIVE,
  intervalActiveTab: TAB_INTERVAL_STANDARD,
  extractionActiveTab: TAB_EXTRACTION_PREVIEW,
};

const queries = (state = defaultState, action) => {
  switch (action.type) {
    case 'UI_UPDATE':
      return {
        ...state,
        ...action.payload,
      };
    case 'CHANGE_EVENT_COLLECTION':
      const {
        eventCollection,
        showTargetProperty,
        analysisType,
        timeframe,
        timeframeActiveTab,
        ...defaults
      } = defaultState;
      return {
        ...state,
        ...defaults,
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
      };
    case 'UPDATE_SAVED_QUERY_UI':
      return {
        ...state,
        savedQuery: {
          ...state.savedQuery,
          ...action.payload,
        },
      };
    case 'CLIENT_SAVE_QUERY_SUCCESS':
      return {
        ...state,
        savedQuery: {
          ...state.savedQuery,
          exists: true,
        },
      };
    case 'RESET_SAVED_QUERY_UI':
      return {
        ...state,
        savedQuery: {
          ...defaultStateSavedQuery,
        },
      };
    case 'RESET_UI':
      return {
        ...defaultState,
      };
    case 'ADD_FILTER':
      return {
        ...state,
        filters: [
          ...state.filters,
          {
            propertyName: '',
            operator: 'eq',
            propertyType: 'String',
            propertyValue: '',
          },
        ],
      };
    case 'DELETE_FILTER':
      return {
        ...state,
        filters: state.filters.filter((item, index) => index !== action.payload),
      };
    case 'UPDATE_FILTER':
      return {
        ...state,
        filters: state.filters.map((item, index) => {
          if (action.payload.index !== index) {
            return item;
          }
          return {
            ...item,
            ...action.payload.item,
          };
        }),
      };
    case 'TOGGLE_PANEL_SAVE':
      return {
        ...state,
        panelSave: !state.panelSave,
      };
    default:
      return state;
  }
};

export default queries;
