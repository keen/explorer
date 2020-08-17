import { PubSub } from '@keen.io/pubsub';

import { ToastSettings } from './types';

type Options = {
  /** PubSub instance */
  pubsub: PubSub;
  /** Event name */
  eventName: string;
};

export default class NotificationManager {
  pubsub: PubSub;

  eventName: string;

  constructor({ pubsub, eventName }: Options) {
    this.pubsub = pubsub;
    this.eventName = eventName;
  }

  showNotification(settings: ToastSettings) {
    this.pubsub.publish(this.eventName, settings);
  }
}
