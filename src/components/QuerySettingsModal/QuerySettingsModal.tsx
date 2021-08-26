import React, { FC, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Portal, Modal, ModalHeader } from '@keen.io/ui-core';

import QuerySettings from '../QuerySettings';

import { appActions, appSelectors } from '../../modules/app';
import { queriesActions } from '../../modules/queries';

import { AppContext } from '../../contexts';
import {
  savedQueryActions,
  savedQuerySelectors,
} from '../../modules/savedQuery';

type Props = {
  /** Save query event handler */
  onSaveQuery: (settings: {
    displayName: string;
    name: string;
    refreshRate: number;
    tags: string[];
  }) => void;
  /** Cache available indicator */
  cacheAvailable: boolean;
};

const QuerySettingsModal: FC<Props> = ({ onSaveQuery, cacheAvailable }) => {
  const dispatch = useDispatch();
  const { modalContainer } = useContext(AppContext);
  const { t } = useTranslation(null, { useSuspense: false });

  const isOpen = useSelector(appSelectors.getQuerySettingsModalVisibility);
  const { exists, isCloned } = useSelector(savedQuerySelectors.getSavedQuery);

  const closeHandler = useCallback(() => {
    dispatch(appActions.hideQuerySettingsModal());
    dispatch(queriesActions.resetSavedQueryError());
    if (!exists && !isCloned) {
      dispatch(savedQueryActions.resetSavedQuery());
    }
  }, [exists, isCloned]);

  return (
    <Portal modalContainer={modalContainer}>
      <Modal isOpen={isOpen} onClose={closeHandler}>
        {() => (
          <>
            <ModalHeader onClose={closeHandler}>
              {t('query_settings.modal_title')}
            </ModalHeader>
            <QuerySettings
              cacheAvailable={cacheAvailable}
              onSave={onSaveQuery}
              onClose={closeHandler}
            />
          </>
        )}
      </Modal>
    </Portal>
  );
};

export default QuerySettingsModal;
