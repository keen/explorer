import React, { FC, useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { colors } from '@keen.io/colors';
import { ErrorContainer } from '@keen.io/forms';
import {
  Anchor,
  Input,
  Label,
  Button,
  Error,
  Alert,
  FadeLoader,
  ModalFooter,
} from '@keen.io/ui-core';

import {
  Settings,
  TagManager,
  Cancel,
  ErrorNotification,
  FooterContent,
  NewQueryNotice,
} from './QuerySettings.styles';

import CacheQuery, { REFRESH_MINIMUM } from '../CacheQuery';
import QueryTagManager from '../QueryTagManager';

import { getSavedQuery } from '../../modules/savedQuery';
import {
  getQuerySettingsModalSource,
  SettingsModalSource,
} from '../../modules/app';
import {
  getQueriesSaving,
  getCacheQueriesLimitExceed,
  getSavedQueries,
  getSaveQueryError,
} from '../../modules/queries';
import text from './text.json';

import { slugify } from '../../utils/text';

type Props = {
  /** Save query event handler */
  onSave: (settings: {
    displayName: string;
    name: string;
    refreshRate: number;
    tags: string[];
  }) => void;
  /** Close settings event handler */
  onClose: () => void;
  /** Cache avaialbe indicator */
  cacheAvailable: boolean;
};

const QuerySettings: FC<Props> = ({ onSave, onClose, cacheAvailable }) => {
  const savedQuery = useSelector(getSavedQuery);
  const savedQueries = useSelector(getSavedQueries);
  const isSavingQuery = useSelector(getQueriesSaving);
  const isCacheLimited = useSelector(getCacheQueriesLimitExceed);
  const error = useSelector(getSaveQueryError);
  const settingsSource = useSelector(getQuerySettingsModalSource);

  const [querySettings, setQuerySettings] = useState(savedQuery);
  const [queryNameError, setQueryNameError] = useState<string | boolean>(null);

  const handleQueryNameUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setQueryNameError(value ? false : text.queryNameError);
      setQuerySettings((settings) => ({
        ...settings,
        name: slugify(value),
        displayName: value,
      }));
    },
    []
  );

  useEffect(() => {
    if (!savedQuery.cached && (isCacheLimited || !cacheAvailable)) {
      setQuerySettings((settings) => ({
        ...settings,
        cached: false,
        refreshRate: 0,
      }));
    }
  }, [cacheAvailable, isCacheLimited]);

  const hasNameChanged = savedQuery.name !== querySettings.name;

  return (
    <>
      <Settings>
        {error && (
          <ErrorNotification data-testid="error-alert">
            <Alert type="error">{error.body}</Alert>
          </ErrorNotification>
        )}
        {settingsSource === SettingsModalSource.FIRST_QUERY_SAVE && (
          <NewQueryNotice>
            <Alert type="info">{text.newQueryNotice}</Alert>
          </NewQueryNotice>
        )}
        <Label
          htmlFor="queryName"
          variant="secondary"
          showAsterisk
          hasError={!!queryNameError}
        >
          {text.queryName}
        </Label>
        <Input
          data-testid="query-name-input"
          type="text"
          variant="solid"
          id="queryName"
          hasError={!!queryNameError}
          placeholder={text.queryNamePlaceholder}
          value={querySettings.displayName}
          onChange={handleQueryNameUpdate}
        />
        <ErrorContainer>
          {queryNameError && <Error>{queryNameError}</Error>}
        </ErrorContainer>
        <TagManager>
          <QueryTagManager
            tags={querySettings.tags}
            onAddTag={(tag) => {
              setQuerySettings((settings) => ({
                ...settings,
                tags: [...settings.tags, tag],
              }));
            }}
            onRemoveTag={(tag) => {
              setQuerySettings((settings) => ({
                ...settings,
                tags: settings.tags.filter((tagName) => tagName !== tag),
              }));
            }}
          />
        </TagManager>
        {cacheAvailable && (
          <CacheQuery
            onCacheChange={(cached) =>
              setQuerySettings((settings) => ({
                ...settings,
                cached,
                refreshRate: cached ? REFRESH_MINIMUM : 0,
              }))
            }
            onRefreshRateChange={(refreshRate) =>
              setQuerySettings((settings) => ({
                ...settings,
                refreshRate,
              }))
            }
            isLimited={isCacheLimited}
            refreshRate={querySettings.refreshRate}
            isCached={querySettings.cached}
          />
        )}
      </Settings>
      <ModalFooter>
        <FooterContent>
          <Button
            data-testid="save-query"
            variant="secondary"
            style="solid"
            isDisabled={isSavingQuery}
            icon={isSavingQuery && <FadeLoader />}
            onClick={() => {
              const { name, displayName, refreshRate, tags } = querySettings;
              if (displayName) {
                const validateNameUniqueness =
                  hasNameChanged || savedQuery.isCloned;
                if (
                  validateNameUniqueness &&
                  savedQueries.find((query) => query.name === name)
                ) {
                  setQueryNameError(text.queryUniqueNameError);
                } else {
                  onSave({ name, displayName, refreshRate, tags });
                }
              } else {
                setQueryNameError(text.queryNameError);
              }
            }}
          >
            {isSavingQuery ? text.savingQuery : text.saveButton}
          </Button>
          {!isSavingQuery && (
            <Cancel>
              <Anchor
                onClick={onClose}
                color={colors.blue[500]}
                hoverColor={colors.blue[300]}
              >
                {text.closeButton}
              </Anchor>
            </Cancel>
          )}
        </FooterContent>
      </ModalFooter>
    </>
  );
};

export default QuerySettings;
