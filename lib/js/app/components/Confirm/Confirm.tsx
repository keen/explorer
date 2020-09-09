import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colors } from '@keen.io/colors';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  Anchor,
  Button,
} from '@keen.io/ui-core';

import { Title, Close, Footer, Description } from './Confirm.styles';

import {
  getConfirmation,
  hideConfirmation,
  acceptConfirmation,
} from '../../modules/app';

import text from './text.json';

const Confirm: FC<{}> = () => {
  const dispatch = useDispatch();
  const { visible } = useSelector(getConfirmation);

  const closeHandler = () => dispatch(hideConfirmation());

  return (
    <Modal isOpen={visible} onClose={closeHandler}>
      {() => (
        <>
          <ModalHeader onClose={closeHandler}>
            <Title>{text.deleteQueryTitle}</Title>
          </ModalHeader>
          <Description>{text.deleteMessage}</Description>
          <ModalFooter>
            <Footer>
              <Button
                htmlType="button"
                variant="danger"
                style="solid"
                onClick={() => dispatch(acceptConfirmation())}
              >
                {text.buttonLabel}
              </Button>
              <Close>
                <Anchor
                  onClick={() => dispatch(hideConfirmation())}
                  color={colors.blue[500]}
                  hoverColor={colors.blue[300]}
                >
                  {text.cancelLabel}
                </Anchor>
              </Close>
            </Footer>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};

export default Confirm;
