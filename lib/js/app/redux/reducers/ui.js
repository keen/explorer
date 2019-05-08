import {
  PANEL_NEW_QUERY,
  ANALYSIS_TYPES,
  RELATIVITY_UNITS,
  TIME_UNITS,
  TIMEFRAME_TABS,
  DEFAULT_NUMBER_OF_TIME_UNITS,
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
  activePanel: PANEL_NEW_QUERY,
  autoload: false,
  analysisType: defaultAnalysisType.type,
  eventCollection: undefined,
  showTargetProperty: false,
  targetProperty: undefined,
  timezone: parseInt(localStorage.timezone || 0, 0),
  filters: [],
  modalFilters: false,
  groupBy: undefined,
  orderBy: undefined,
  limit: undefined,
  interval: undefined,
  numberOfGroupByProps: 1,
  timeframe: `${RELATIVITY_UNITS[0]}_${DEFAULT_NUMBER_OF_TIME_UNITS}_${TIME_UNITS[0]}`,
  timeframeData: {
    activeTab: TIMEFRAME_TABS[0],
    relativity: RELATIVITY_UNITS[0],
    numberOfUnits: DEFAULT_NUMBER_OF_TIME_UNITS,
    units: TIME_UNITS[0],
    start: undefined,
    end: undefined,
  },
  chartType: undefined,
  savedQuery: {
    ...defaultStateSavedQuery,
  },
  activeSavedQuery: -1,
};

const queries = (state = defaultState, action) => {
  switch (action.type) {
    case 'UI_UPDATE':
      return {
        ...state,
        ...action.payload,
      };
    case 'UPDATE_SAVED_QUERY_UI':
      return {
        ...state,
        savedQuery: {
          ...state.savedQuery,
          ...action.payload,
        },
      };
    case 'RESET_SAVED_QUERY_UI':
      return {
        ...state,
        savedQuery: {
          ...defaultStateSavedQuery,
        },
        activeSavedQuery: -1,
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
    default:
      return state;
  }
};

export default queries;
