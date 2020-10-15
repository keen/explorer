import React, { FC, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Portal, Modal, ModalHeader } from '@keen.io/ui-core';

import ExtractToEmail from '../ExtractToEmail';
import text from './text.json';

import {
  getExtractToEmailModalVisibility,
  hideEmailExtractionModal,
} from '../../modules/app';

import { AppContext } from '../../contexts';

const ExtractToEmailModal: FC<{}> = () => {
  const dispatch = useDispatch();
  const { modalContainer } = useContext(AppContext);

  const closeHandler = useCallback(
    () => dispatch(hideEmailExtractionModal()),
    []
  );
  const isOpen = useSelector(getExtractToEmailModalVisibility);

  return (
    <Portal modalContainer={modalContainer}>
      <Modal isOpen={isOpen} onClose={closeHandler}>
        {() => (
          <>
            <ModalHeader onClose={closeHandler}>{text.title}</ModalHeader>
            <ExtractToEmail onClose={closeHandler} />
          </>
        )}
      </Modal>
    </Portal>
  );
};

export default ExtractToEmailModal;
