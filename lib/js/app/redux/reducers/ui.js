import {
  ANALYSIS_TYPES, RELATIVITY_UNITS, TIME_UNITS, TIMEFRAME_TABS
} from '../../components/consts';

const defaultAnalysisType = ANALYSIS_TYPES.find(item => item.default);

const defaultState = {
  autoload: false,
  analysisType: defaultAnalysisType.type,
  eventCollection: undefined,
  showTargetProperty: false,
  targetProperty: undefined,
  timeframe: undefined,
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
    end: undefined
  },
  chartType: undefined
};

const queries = (state = defaultState, action) => {
  switch (action.type) {
    case 'UI_UPDATE':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default queries;
