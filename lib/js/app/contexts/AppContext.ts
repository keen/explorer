import React from 'react';
import { PubSub } from '@keen.io/pubsub';

const AppContext = React.createContext<{
  keenAnalysis: any;
  notificationPubSub: PubSub;
  modalContainer: string;
}>({
  keenAnalysis: null,
  modalContainer: null,
  notificationPubSub: null,
});

export default AppContext;
