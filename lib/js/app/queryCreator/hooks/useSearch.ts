import { useRef, useState, useEffect, useCallback } from 'react';
import Fuse from 'fuse.js';

const defaultOptions = {
  keys: ['label', 'value'],
  threshold: 0.3,
};

const DEBOUNCE_TIME = 200;

export const useSearch = <T>(
  collection: T[],
  callback: (results: T[], searchPhrase: string) => void,
  options: Fuse.IFuseOptions<any> = defaultOptions
) => {
  const [searchPhrase, setSearchPhrase] = useState(null);
  const fuseSearch = useRef(new Fuse(collection, options));

  const searchDebounce = useRef(null);

  const clearSearchPhrase = useCallback(() => {
    setSearchPhrase(null);
  }, []);

  useEffect(() => {
    fuseSearch.current = new Fuse(collection, options);
  }, [collection, options]);

  const searchHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;

      if (searchDebounce.current) clearTimeout(searchDebounce.current);

      searchDebounce.current = setTimeout(() => {
        const results = fuseSearch.current
          .search(value)
          .map(({ item }) => item);
        setSearchPhrase(value);

        callback(results, value);
      }, DEBOUNCE_TIME);
    },
    [fuseSearch, collection]
  );

  return {
    clearSearchPhrase,
    searchPhrase,
    searchHandler,
  };
};
