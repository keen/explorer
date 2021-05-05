import { createAction } from '@reduxjs/toolkit';

export const fetchTimezones = createAction('timezone/fetchTimezones');

export const fetchEventStreamSchema = createAction(
  'schemas/fetchEventStreamSchema',
  (eventStream: string) => ({
    payload: {
      eventStream,
    },
  })
);
