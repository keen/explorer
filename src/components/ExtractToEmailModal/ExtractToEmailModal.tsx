import React, { FC, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Portal, Modal, ModalHeader } from '@keen.io/ui-core';

import ExtractToEmail from '../ExtractToEmail';

import {
  appSlice,
  getExtractToEmailModalVisibility,
  // hideEmailExtractionModal,
} from '../../modules/app';

import { AppContext } from '../../contexts';

const ExtractToEmailModal: FC<{}> = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { modalContainer } = useContext(AppContext);

  const closeHandler = useCallback(
    () => dispatch(appSlice.actions.hideEmailExtractionModal()),
    []
  );
  const isOpen = useSelector(getExtractToEmailModalVisibility);

  return (
    <Portal modalContainer={modalContainer}>
      <Modal isOpen={isOpen} onClose={closeHandler}>
        {() => (
          <>
            <ModalHeader onClose={closeHandler}>
              {t('extract_to_email.modal_title')}
            </ModalHeader>
            <ExtractToEmail onClose={closeHandler} />
          </>
        )}
      </Modal>
    </Portal>
  );
};

export default ExtractToEmailModal;
