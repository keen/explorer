import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalHeader } from '@keen.io/ui-core';

import QuerySettings from '../QuerySettings';

import {
  getQuerySettingsModalVisibility,
  hideQuerySettingsModal,
} from '../../modules/app';
import { getSavedQuery, resetSavedQuery } from '../../modules/savedQuery';

import text from './text.json';

type Props = {
  onSaveQuery: (settings: { displayName: string; name: string }) => void;
};

const QuerySettingsModal: FC<Props> = ({ onSaveQuery }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(getQuerySettingsModalVisibility);
  const { exists } = useSelector(getSavedQuery);

  const closeHandler = useCallback(() => {
    dispatch(hideQuerySettingsModal());
    if (!exists) {
      dispatch(resetSavedQuery());
    }
  }, [exists]);

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      {() => (
        <>
          <ModalHeader title={text.querySettings} onClose={closeHandler} />
          <QuerySettings onSave={onSaveQuery} onClose={closeHandler} />
        </>
      )}
    </Modal>
  );
};

export default QuerySettingsModal;
