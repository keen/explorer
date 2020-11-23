import React, { FC, useState, useCallback, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  UpgradeAnchor,
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

import { AppContext } from '../../contexts';
import { ERRORS } from '../../constants';

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

  const { upgradeSubscriptionUrl } = useContext(AppContext);
  const { t } = useTranslation();

  const [querySettings, setQuerySettings] = useState(savedQuery);
  const [queryNameError, setQueryNameError] = useState<string | boolean>(null);

  const handleQueryNameUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setQueryNameError(
        value ? false : (t('query_settings.query_name_error') as string)
      );
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
            <Alert type="error">
              {error.error_code === ERRORS.TOO_MANY_QUERIES ? (
                <>
                  <div>{t('query_settings.cached_queries_limit_reached')}</div>
                  <UpgradeAnchor
                    target="_blank"
                    rel="noopener noreferrer"
                    href={upgradeSubscriptionUrl}
                  >
                    {t('query_settings.upgrade_anchor')}
                  </UpgradeAnchor>{' '}
                  {t('query_settings.upgrade_connector')}{' '}
                  {t('query_settings.uncache_query')}
                </>
              ) : (
                error.body
              )}
            </Alert>
          </ErrorNotification>
        )}
        {settingsSource === SettingsModalSource.FIRST_QUERY_SAVE && (
          <NewQueryNotice>
            <Alert type="info">
              {savedQuery.isCloned
                ? t('query_settings.cloned_query_notice')
                : t('query_settings.new_query_notice')}
            </Alert>
          </NewQueryNotice>
        )}
        <Label
          htmlFor="queryName"
          variant="secondary"
          showAsterisk
          hasError={!!queryNameError}
        >
          {t('query_settings.query_name_label')}
        </Label>
        <Input
          data-testid="query-name-input"
          type="text"
          variant="solid"
          id="queryName"
          hasError={!!queryNameError}
          placeholder={t('query_settings.query_name_input_placeholder')}
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
                  setQueryNameError(
                    t('query_settings.query_unique_name_error') as string
                  );
                } else {
                  onSave({ name, displayName, refreshRate, tags });
                }
              } else {
                setQueryNameError(
                  t('query_settings.query_name_error') as string
                );
              }
            }}
          >
            {isSavingQuery
              ? t('query_settings.saving_query')
              : t('query_settings.save_query_button')}
          </Button>
          {!isSavingQuery && (
            <Cancel>
              <Anchor
                onClick={onClose}
                color={colors.blue[500]}
                hoverColor={colors.blue[300]}
              >
                {t('query_settings.close_button')}
              </Anchor>
            </Cancel>
          )}
        </FooterContent>
      </ModalFooter>
    </>
  );
};

export default QuerySettings;
