const DISABLE_STRINGIFY_KEYS = ['timezone'];

export const stringify = (queryParams: Record<string, any>) =>
  Object.keys(queryParams)
    .map((keyName) => {
      let queryParamValue = queryParams[keyName];
      if (!queryParamValue) return null;
      if (Array.isArray(queryParamValue) && !queryParamValue.length)
        return null;

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

      if (!DISABLE_STRINGIFY_KEYS.includes(keyName)) {
        queryParamValue = JSON.stringify(queryParamValue);
      }

      const underscoredK = keyName
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
