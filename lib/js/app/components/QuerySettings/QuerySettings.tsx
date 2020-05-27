import React, { FC, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Input } from '@keen.io/ui-core';

import { Container, Title, Settings, QueryName, Actions } from './QuerySettings.styles';

import CacheQuery, { REFRESH_MINIMUM } from '../CacheQuery';
import Label from '../Label';
import SaveQuery from '../SaveQuery';

import {
  getSavedQuery,
  updateSaveQuery,
  resetSavedQuery,
} from '../../modules/savedQuery';
import { getQueriesSaving, getQueriesLimit } from '../../modules/queries';
import { slugify, copyToClipboard } from '../../utils/text';

import text from './text.json';

import { QueryError } from './types';

type Props = {
  /** Save query event handler */
  onSave: (queryName: string, refreshRate: number) => void;
  /** Delete query event handler */
  onDelete: (queryName: string) => void;
};

const QuerySettings: FC<Props> = ({ onSave, onDelete }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const isSaving = useSelector(getQueriesSaving);
  const savedQuery = useSelector(getSavedQuery);

  const limitedQueries = useSelector(getQueriesLimit);

  const saveHandler = useCallback(() => {
    setError(null);
    const { name, displayName, refreshRate } = savedQuery;
    if (displayName) {
      onSave(name, refreshRate);
    } else {
      setError(QueryError.NAME);
    }
  }, [onSave, savedQuery]);

  return (
    <Container>
      <Settings>
      <Title>{text.querySettings}</Title>
      <QueryName>
      <Label>{text.queryName}</Label>
      <Input
        value={savedQuery.displayName}
        placeholder={text.queryNamePlaceholder}
        onChange={(e) => {
          const value = e.currentTarget.value;
          dispatch(
            updateSaveQuery({
              name: slugify(value),
              displayName: value,
              exists: false,
            })
          );
        }}
      />
      {savedQuery.name && (
        <div onClick={() => copyToClipboard(savedQuery.name)}>
          Saved query resource name: {savedQuery.name}
        </div>
      )}
      </QueryName>
      <CacheQuery
        onCacheChange={(cached) =>
          dispatch(
            updateSaveQuery({
              cached,
              refreshRate: cached ? REFRESH_MINIMUM : 0,
            })
          )
        }
        onRefreshRateChange={(refreshRate) =>
          dispatch(
            updateSaveQuery({
              refreshRate,
            })
          )
        }
        isLimited={limitedQueries}
        refreshRate={savedQuery.refreshRate}
        isCached={savedQuery.cached}
      />
      {error && <Alert type="error">{error}</Alert>}
      </Settings>
      <Actions>
        <SaveQuery
          onSave={saveHandler}
          isSaving={isSaving}
          isExist={savedQuery.exists}
        />
        {savedQuery.exists && (
          <>
            <Button
              variant="secondary"
              style="outline"
              onClick={() => {
                setError(null);
                dispatch(resetSavedQuery());
              }}
            >
              {text.clone}
            </Button>
            <Button
              variant="danger"
              style="outline"
              onClick={() => onDelete(savedQuery.name)}
            >
              {text.delete}
            </Button>
          </>
        )}
      </Actions>
    </Container>
  );
};

export default QuerySettings;
