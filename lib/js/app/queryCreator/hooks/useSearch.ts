import { useRef, useEffect, useCallback } from 'react';
import Fuse from 'fuse.js';

const defaultOptions = {
  keys: ['label', 'value'],
  threshold: 0.3,
};

export const useSearch = <T>(
  collection: T[],
  callback: (results: T[], searchPhrase: string) => void,
  options: Fuse.IFuseOptions<any> = defaultOptions
) => {
  const fuseSearch = useRef(new Fuse(collection, options));

  useEffect(() => {
    fuseSearch.current = new Fuse(collection, options);
  }, [collection, options]);

  const searchHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      const results = fuseSearch.current.search(value).map(({ item }) => item);

      callback(results, value);
    },
    [fuseSearch]
  );

  return {
    searchHandler,
  };
};
