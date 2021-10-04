import React, { FC, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Portal } from '@keen.io/ui-core';

import {
  dataExportActions,
  dataExportSelectors,
} from '../../modules/dataExport';
import { AppContext } from '../../contexts';
import { ExportToCSV } from './components';

const ExportToCSVModal: FC = () => {
  const dispatch = useDispatch();
  const { modalContainer } = useContext(AppContext);
  const isOpen = useSelector(dataExportSelectors.getExportToCSVModalVisibility);
  const onClose = () => dispatch(dataExportActions.showCSVExportModal(false));

  return (
    <Portal modalContainer={modalContainer}>
      <Modal isOpen={isOpen} onClose={onClose}>
        {() => <ExportToCSV />}
      </Modal>
    </Portal>
  );
};

export default ExportToCSVModal;
