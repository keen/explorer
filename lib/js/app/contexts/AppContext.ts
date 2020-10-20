import React from 'react';
import { PubSub } from '@keen.io/pubsub';

import { DatavizSettings } from '../types';

const AppContext = React.createContext<{
  keenAnalysis: any;
  notificationPubSub: PubSub;
  modalContainer: string;
  upgradeSubscriptionUrl?: string;
  datavizSettings: DatavizSettings;
}>({
  keenAnalysis: null,
  modalContainer: null,
  notificationPubSub: null,
  upgradeSubscriptionUrl: null,
  datavizSettings: {},
});

export default AppContext;
