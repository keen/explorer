import React from 'react';
import { PubSub } from '@keen.io/pubsub';

import { DatavizSettings } from '../types';

const AppContext = React.createContext<{
  keenAnalysis: any;
  notificationPubSub: PubSub;
  modalContainer: string;
  upgradeSubscriptionUrl?: string;
  enableDashboardsConnection?: boolean;
  createDashboardUrl?: (dashboardId: string) => string;
  datavizSettings: DatavizSettings;
  defaultTimezoneForQuery;
  disableTimezoneSelection;
  chartEventsPubSub: PubSub;
  disableQueryFilterSuggestions: boolean;
  timezonesHost?: string;
}>({
  keenAnalysis: null,
  modalContainer: null,
  notificationPubSub: null,
  upgradeSubscriptionUrl: null,
  enableDashboardsConnection: null,
  createDashboardUrl: null,
  datavizSettings: {},
  defaultTimezoneForQuery: null,
  disableTimezoneSelection: null,
  chartEventsPubSub: null,
  disableQueryFilterSuggestions: false,
  timezonesHost: null,
});

export default AppContext;
