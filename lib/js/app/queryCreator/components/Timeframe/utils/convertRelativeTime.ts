const TIME_SEPARATOR = '_';

const TODAY = {
  relativity: 'this',
  value: 1,
  units: 'days',
};

const YESTERDAY = {
  relativity: 'previous',
  value: 1,
  units: 'days',
};

const TIME_UNITS = {
  minute: 'minutes',
  month: 'months',
  hour: 'hours',
  year: 'years',
  week: 'weeks',
  day: 'days',
};

export const convertRelativeTime = (time: string) => {
  const timeChunks = time.split(TIME_SEPARATOR);
  const chunksLength = timeChunks.length;

  if (chunksLength === 1) {
    if (time === 'today') return TODAY;
    if (time === 'yesterday') return YESTERDAY;
  }

  if (chunksLength === 2) {
    const [relativity, unit] = timeChunks;
    return {
      relativity,
      value: 1,
      units: TIME_UNITS[unit],
    };
  }

  const [relativity, value, units] = timeChunks;

  return {
    relativity,
    value: Number(value),
    units,
  };
};
