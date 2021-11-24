import React, { FC, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Portal } from '@keen.io/ui-core';

import { appActions, appSelectors } from '../../modules/app';
import { AppContext } from '../../contexts';
import { EmbedWidget } from './components';

const EmbedWidgetModal: FC = () => {
  const dispatch = useDispatch();
  const closeHandler = useCallback(() => {
    dispatch(appActions.hideEmbedModal());
  }, []);
  const isOpen = useSelector(appSelectors.getEmbedModalVisibility);
  const { modalContainer } = useContext(AppContext);

  return (
    <Portal modalContainer={modalContainer}>
      <Modal isOpen={isOpen} onClose={closeHandler} blockScrollOnOpen={false}>
        {() => <EmbedWidget />}
      </Modal>
    </Portal>
  );
};

export default EmbedWidgetModal;
