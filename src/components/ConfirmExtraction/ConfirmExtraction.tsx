import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  Anchor,
  Alert,
} from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';

import {
  Container,
  Description,
  EmailExtraction,
  Footer,
  Cancel,
} from './ConfirmExtraction.styles';

import {
  getExtractionConfirmation,
  queriesActions,
} from '../../modules/queries';

const ConfirmExtraction: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isVisible } = useSelector(getExtractionConfirmation);

  const closeHandler = useCallback(
    () => dispatch(queriesActions.cancelExtraction()),
    []
  );

  return (
    <Modal isOpen={isVisible} onClose={closeHandler}>
      {() => (
        <>
          <ModalHeader onClose={closeHandler}>
            {t('extraction_confirmation.title')}
          </ModalHeader>
          <Container>
            <Alert type="info">{t('extraction_confirmation.alert')}</Alert>
            <Description>
              <BodyText variant="body1">
                {t('extraction_confirmation.message')}
              </BodyText>
            </Description>
          </Container>
          <ModalFooter>
            <Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  dispatch(queriesActions.continueExtraction());
                }}
              >
                {t('extraction_confirmation.confirm_button')}
              </Button>
              <EmailExtraction>
                <Button
                  variant="secondary"
                  onClick={() => {
                    dispatch(queriesActions.cancelExtraction());
                    dispatch(queriesActions.extractToEmail());
                  }}
                >
                  {t('extraction_confirmation.extract_email_button')}
                </Button>
              </EmailExtraction>
              <Cancel>
                <Anchor onClick={closeHandler}>
                  {t('extraction_confirmation.cancel')}
                </Anchor>
              </Cancel>
            </Footer>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};

export default ConfirmExtraction;
