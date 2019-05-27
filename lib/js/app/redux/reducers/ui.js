import {
  PANEL_NEW_QUERY,
  ANALYSIS_TYPES,
  DEFAULT_TIMEFRAME_RELATIVE_VALUE,
  TAB_EXTRACTION_PREVIEW,
  EXTRACTION_PREVIEW_EVENTS_LIMIT,
} from '../../consts';

const defaultAnalysisType = ANALYSIS_TYPES.find(item => item.default);

const defaultStateSavedQuery = {
  name: '',
  displayName: '',
  cache: false,
  refreshRate: 0,
  exists: false,
};

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
  timezone: DEFAULT_TIMEZONE,
  percentile: undefined,
  chartType: undefined,
  savedQuery: {
    ...defaultStateSavedQuery,
  },
  error: null,
  fetching: false,
  activePanel: PANEL_NEW_QUERY,
  panelSave: false,
  extractionActiveTab: TAB_EXTRACTION_PREVIEW,
  steps: [
    {
      ...defaultStep,
    },
  ],
  activeStep: 0,
  stepLabels: [
    '',
  ],
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
    case 'ADD_STEP_FILTER':
      return {
        ...state,
        steps: state.steps.map((item, itemIndex) => {
          if (itemIndex === action.step) {
            item.filters = [
              ...item.filters,
              {
                propertyName: '',
                operator: 'eq',
                propertyType: 'String',
                propertyValue: '',
              },
            ];
          }
          return item;
        }),
      };
    case 'DELETE_STEP_FILTER':
      return {
        ...state,
        steps: state.steps.map((item, itemIndex) => {
          if (itemIndex === action.step) {
            item.filters = item.filters.filter((subitem, index) => index !== action.payload.index);
          }
          return item;
        }),
      };
    case 'UPDATE_STEP_FILTER':
      return {
        ...state,
        steps: state.steps.map((item, itemIndex) => {
          if (itemIndex === action.step) {
            const filters = item.filters.map((itemFilter, index) => {
              if (action.payload.index !== index) {
                return itemFilter;
              }
              return {
                ...itemFilter,
                ...action.payload.item,
              };
            });
            item.filters = filters;
          }
          return item;
        }),
      };
    case 'TOGGLE_PANEL_SAVE':
      return {
        ...state,
        panelSave: !state.panelSave,
      };
    case 'ADD_STEP':
      const prevStep = state.steps[state.steps.length - 1] || {};
      const inheritedValues = {
        timeframe: prevStep.timeframe || DEFAULT_TIMEFRAME_RELATIVE_VALUE,
        timezone: prevStep.timezone || DEFAULT_TIMEZONE,
        withActors: !!prevStep.withActors,
      };
      return {
        ...state,
        steps: [
          ...state.steps,
          {
            ...defaultStep,
            ...inheritedValues,
          },
        ],
        stepLabels: [
          ...state.stepLabels,
          '',
        ],
        activeStep: state.steps.length,
      };
    case 'DELETE_STEP':
      return {
        ...state,
        steps: state.steps.filter((item, index) => index !== action.payload),
        stepLabels: state.stepLabels.filter((item, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export default queries;
