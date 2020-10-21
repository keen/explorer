import React, { FC, useState, useEffect, useRef } from 'react';
import { Input } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Container, ClearSearch } from './SearchQueries.styles';
import text from './text.json';

import { DEBOUNCE_TIME } from './constants';

type Props = {
  /** Search event handler */
  onSearch: (phrase: string) => void;
};

const SearchQueries: FC<Props> = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const updateCallback = useRef(null);

  useEffect(() => {
    if (updateCallback.current) clearTimeout(updateCallback.current);
    updateCallback.current = setTimeout(() => {
      onSearch(value ? value.toLowerCase() : value);
    }, DEBOUNCE_TIME);

    return () => {
      if (updateCallback.current) clearTimeout(updateCallback.current);
    };
  }, [value]);

  return (
    <Container data-testid="search-queries">
      <Input
        variant="solid"
        type="text"
        value={value}
        placeholder={text.placeholder}
        onChange={(e) => setValue(e.currentTarget.value)}
        renderPrefix={() => (
          <Icon type="search" width={15} height={15} fill={colors.blue[500]} />
        )}
        renderSuffix={() =>
          value ? (
            <ClearSearch
              data-testid="clear-search"
              onClick={() => setValue('')}
            >
              <Icon
                type="close"
                width={10}
                height={10}
                fill={colors.gray[500]}
              />
            </ClearSearch>
          ) : null
        }
      />
    </Container>
  );
};

export default SearchQueries;
