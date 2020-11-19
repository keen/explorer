import { TIMEZONES } from '@keen.io/query-creator';

export const stringify = (queryParams) =>
  Object.keys(queryParams)
    .map((k) => {
      let queryParamValue = queryParams[k];
      if (!queryParamValue) return null;
      if (Array.isArray(queryParamValue) && !queryParamValue.length)
        return null;

      if (k === 'timezone') {
        const timezoneOption = TIMEZONES.find(
          (item) => item.name === queryParamValue
        ) || {
          label: 'UTC',
          value: 0,
        };
        queryParamValue = timezoneOption.value;
      }

      if (Array.isArray(queryParamValue)) {
        queryParamValue = queryParamValue.map((value) => {
          if (typeof value === 'object' && value !== null) {
            const underscoredObject = {};
            Object.keys(value).forEach((objkey) => {
              const underscoredK = objkey
                .replace(/(?:^|\.?)([A-Z])/g, (x, y) => `_${y.toLowerCase()}`)
                .replace(/^_/, '');
              underscoredObject[underscoredK] = value[objkey];
            });
            return underscoredObject;
          }
          return value;
        });
      }

      queryParamValue = JSON.stringify(queryParamValue);

      const underscoredK = k
        .replace(/(?:^|\.?)([A-Z])/g, (x, y) => `_${y.toLowerCase()}`)
        .replace(/^_/, '');
      return `${encodeURIComponent(underscoredK)}=${encodeURIComponent(
        queryParamValue
      )}`;
    })
    .filter((item) => !!item)
    .join('&')
    .replace(/%22true%22/gi, 'true')
    .replace(/%22false%22/gi, 'false');
