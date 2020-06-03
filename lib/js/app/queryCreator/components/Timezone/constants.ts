import { Timezone } from './types';

export const TIMEZONES: Timezone[] = [
  {
    name: 'UTC',
    value: 0,
    dstValue: 0,
  },
  {
    name: 'Europe/London',
    value: 0,
    dstValue: 3600,
  },
  {
    name: 'Africa/Casablanca',
    value: 0,
    dstValue: 0,
  },
  {
    name: 'Africa/Nairobi',
    value: 10800,
    dstValue: 0,
  },
  {
    name: 'Asia/Dubai',
    value: 14400,
    dstValue: 0,
  },
  {
    name: 'America/Sao_Paulo',
    value: -10800,
    dstValue: -7200,
  },
  {
    name: 'US/Eastern',
    value: -18000,
    dstValue: -14400,
  },
  {
    name: 'US/Central',
    value: -21600,
    dstValue: -18000,
  },
  {
    name: 'US/Mountain',
    value: -25200,
    dstValue: -21600,
  },
  {
    name: 'US/Pacific',
    value: -28800,
    dstValue: -25200,
  },
  {
    name: 'US/Alaska',
    value: -32400,
    dstValue: -28800,
  },
  {
    name: 'US/Hawaii',
    value: -36000,
    dstValue: -32400,
  },
  {
    name: 'Europe/Paris',
    value: 3600,
    dstValue: 7200,
  },
  {
    name: 'Europe/Amsterdam',
    value: 3600,
    dstValue: 7200,
  },
  {
    name: 'Europe/Stockholm',
    value: 3600,
    dstValue: 7200,
  },
  {
    name: 'Europe/Prague',
    value: 3600,
    dstValue: 7200,
  },
  {
    name: 'Asia/Istanbul',
    value: 7200,
    dstValue: 10800,
  },
  {
    name: 'Europe/Istanbul',
    value: 7200,
    dstValue: 10800,
  },
  {
    name: 'Europe/Copenhagen',
    value: 3600,
    dstValue: 7200,
  },
  {
    name: 'Asia/Jakarta',
    value: 25200,
    dstValue: 25200,
  },
  {
    name: 'Asia/Singapore',
    value: 28800,
    dstValue: 28800,
  },
  {
    name: 'Australia/Perth',
    value: 28800,
    dstValue: 28800,
  },
  {
    name: 'Asia/Tokyo',
    value: 32400,
    dstValue: 32400,
  },
  {
    name: 'Australia/Sydney',
    value: 36000,
    dstValue: 39600,
  },
  {
    name: 'Pacific/Auckland',
    value: 43200,
    dstValue: 46800,
  },
];
