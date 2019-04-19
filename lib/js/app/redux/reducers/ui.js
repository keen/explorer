import {
  ANALYSIS_TYPES, RELATIVITY_UNITS, TIME_UNITS, TIMEFRAME_TABS,
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
  timeframe: undefined,
  timezone: parseInt(localStorage.timezone || 0),
  filters: undefined,
  group_by: undefined,
  order_by: undefined,
  limit: undefined,
  numberOfGroupByProps: 1,
  timeframeData: {
    activeTab: TIMEFRAME_TABS[0],
    relativity: RELATIVITY_UNITS[0],
    numberOfUnits: 14,
    units: TIME_UNITS[0],
    start: undefined,
    end: undefined,
  },
  chartType: undefined,
  savedQuery: {
    ...defaultStateSavedQuery,
  },
  savedQueryBrowser: {
    items: [],
  },
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
      };

    case 'UPDATE_SAVED_QUERY_BROWSER_UI':
    console.log(action.payload);
      return {
        ...state,
        savedQueryBrowser: {
          ...state.savedQueryBrowser,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

export default queries;
