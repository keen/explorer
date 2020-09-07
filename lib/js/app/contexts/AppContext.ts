import React from 'react';
import { PubSub } from '@keen.io/pubsub';

const AppContext = React.createContext<{
  keenAnalysis: any;
  notificationPubSub: PubSub;
  modalContainer: string;
  upgradeSubscriptionUrl?: string;
  virtualFields: any;
}>({
  virtualFields: {},
  keenAnalysis: null,
  modalContainer: null,
  notificationPubSub: null,
  upgradeSubscriptionUrl: null,
});

export default AppContext;
