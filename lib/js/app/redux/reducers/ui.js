import { RELATIVITY_UNITS, TIME_UNITS, TIMEFRAME_TABS } from '../../components/consts';

const defaultState = {
  analysisType: null,
  eventCollection: null,
  showTargetProperty: false,
  targetProperty: null,
  timeframe: null,
  timeframeData: {
    activeTab: TIMEFRAME_TABS[0],
    relativity: RELATIVITY_UNITS[0],
    numberOfUnits: 1,
    units: TIME_UNITS[0],
    start: null,
    end: null
  }
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
