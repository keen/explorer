import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  Anchor,
} from '@keen.io/ui-core';

import {
  getExtractionConfirmation,
  cancelExtraction,
  continueExtraction,
  extractToEmail,
} from '../../modules/queries';

type Props = {};

const ConfirmExtraction: FC<Props> = () => {
  const dispatch = useDispatch();
  const { isVisible } = useSelector(getExtractionConfirmation);

  const closeHandler = useCallback(() => dispatch(cancelExtraction()), []);

  return (
    <Modal isOpen={isVisible} onClose={closeHandler}>
      {() => (
        <>
          <ModalHeader onClose={closeHandler}>sasa</ModalHeader>
          Title
          <ModalFooter>
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(continueExtraction());
              }}
            >
              Continue
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(cancelExtraction());
                dispatch(extractToEmail());
              }}
            >
              Email
            </Button>
            <Anchor onClick={closeHandler}>Cancel</Anchor>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};

export default ConfirmExtraction;
