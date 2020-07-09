import React, { FC, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Label } from '@keen.io/ui-core';

import {
  Container,
  Title,
  Settings,
  QueryName,
  ResourceName,
  ResourceMessage,
  Actions,
  InputContainer,
} from './QuerySettings.styles';

import CacheQuery, { REFRESH_MINIMUM } from '../CacheQuery';
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
  /** Caching available */
  cacheAvailable: boolean;
};

const QuerySettings: FC<Props> = ({ onSave, onDelete, cacheAvailable }) => {
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

  useEffect(() => {
    if (!cacheAvailable) {
      dispatch(
        updateSaveQuery({
          cached: false,
          refreshRate: 0,
        })
      );
    }
  }, [cacheAvailable]);

  return (
    <Container>
      <Settings>
        <Title>{text.querySettings}</Title>
        <QueryName>
          <Label variant="secondary">{text.queryName}</Label>
          <InputContainer>
            <Input
              type="text"
              data-test="query-name"
              value={savedQuery.displayName}
              placeholder={text.queryNamePlaceholder}
              hasError={!!error}
              variant="solid"
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
          </InputContainer>
        </QueryName>
        {savedQuery.name && (
          <ResourceName onClick={() => copyToClipboard(savedQuery.name)}>
            <Label variant="secondary">
              <ResourceMessage>{text.resourceName}</ResourceMessage>{' '}
              {savedQuery.name}
            </Label>
          </ResourceName>
        )}
        {cacheAvailable ? (
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
        ) : (
          <div>{text.cachingNotAvailable}</div>
        )}
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
