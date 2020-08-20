import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Badge, FadeLoader } from '@keen.io/ui-core';

import {
  Container,
  QueryName,
  QueryMeta,
  Menu,
  MenuItem,
} from './EditorNavigation.styles';
import text from './text.json';

import { getSavedQuery } from '../../modules/savedQuery';
import { getQueriesSaving } from '../../modules/queries';
import {
  showQuerySettingsModal,
  getQuerySettingsModalVisibility,
  SettingsModalSource,
} from '../../modules/app';

type Props = {
  /** Save query event handler*/
  onSaveQuery: () => void;
};

const EditorNavigation: FC<Props> = ({ onSaveQuery }) => {
  const dispatch = useDispatch();
  const { exists, displayName, refreshRate, cached } = useSelector(
    getSavedQuery
  );
  const isSavingQuery = useSelector(getQueriesSaving);
  const isModalVisible = useSelector(getQuerySettingsModalVisibility);

  return (
    <Container>
      <QueryName>{displayName ? displayName : text.newQueryTitle}</QueryName>
      <QueryMeta>
        {cached && (
          <Badge variant="green">
            <span data-testid="cache-badge">{text.cachedLabel}</span>{' '}
            {`(${refreshRate}${text.cacheUnits})`}
          </Badge>
        )}
      </QueryMeta>
      <Menu>
        <MenuItem>
          <span
            data-testid="query-settings"
            onClick={() =>
              dispatch(
                showQuerySettingsModal(SettingsModalSource.QUERY_SETTINGS)
              )
            }
          >
            Settings
          </span>
        </MenuItem>
        <MenuItem>
          <Button
            data-testid="save-query"
            variant="secondary"
            style="solid"
            isDisabled={isSavingQuery}
            onClick={() => {
              if (!exists) {
                dispatch(
                  showQuerySettingsModal(SettingsModalSource.FIRST_QUERY_SAVE)
                );
              } else {
                onSaveQuery();
              }
            }}
            icon={isSavingQuery && !isModalVisible && <FadeLoader />}
          >
            {text.saveQuery}
          </Button>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default EditorNavigation;
