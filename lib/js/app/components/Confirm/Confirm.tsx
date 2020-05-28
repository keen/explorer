import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Anchor, Button } from '@keen.io/ui-core';

import { Title, Close, Footer, Description } from './Confirm.styles';

import {
  getConfirmation,
  hideConfirmation,
  acceptConfirmation,
} from '../../modules/app';

import text from './text.json';

const Confirm: FC<{}> = () => {
  const dispatch = useDispatch();
  const { visible, meta } = useSelector(getConfirmation);

  return (
    <Modal isOpen={visible} onClose={() => dispatch(hideConfirmation())}>
      {() => (
        <>
          <Title>{text.deleteQueryTitle}</Title>
          <Description>
            {text.deleteMessage} <b>{meta?.queryName}</b> ? {text.cannotReverse}
          </Description>
          <Footer>
            <Button
              htmlType="button"
              variant="secondary"
              onClick={() => dispatch(acceptConfirmation())}
            >
              {text.buttonLabel}
            </Button>
            <Close>
              <Anchor onClick={() => dispatch(hideConfirmation())}>
                {text.cancelLabel}
              </Anchor>
            </Close>
          </Footer>
        </>
      )}
    </Modal>
  );
};

export default Confirm;
