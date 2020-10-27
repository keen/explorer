import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
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

const Confirm: FC<{}> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { visible } = useSelector(getConfirmation);

  const closeHandler = () => dispatch(hideConfirmation());

  return (
    <Modal isOpen={visible} onClose={closeHandler}>
      {() => (
        <>
          <ModalHeader onClose={closeHandler}>
            <Title>{t('confirm.delete_query_title')}</Title>
          </ModalHeader>
          <Description>{t('confirm.delete_message')}</Description>
          <ModalFooter>
            <Footer>
              <Button
                htmlType="button"
                variant="danger"
                style="solid"
                onClick={() => dispatch(acceptConfirmation())}
              >
                {t('confirm.button_label')}
              </Button>
              <Close>
                <Anchor
                  onClick={() => dispatch(hideConfirmation())}
                  color={colors.blue[500]}
                  hoverColor={colors.blue[300]}
                >
                  {t('confirm.cancel_label')}
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
