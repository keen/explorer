import React, { FC, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  Button,
  Anchor,
  Error,
  Checkbox,
  RadioGroup,
  Label,
  ModalFooter,
} from '@keen.io/ui-core';
import { ErrorContainer } from '@keen.io/forms';
import { colors } from '@keen.io/colors';

import {
  Container,
  EmailContainer,
  ContentTypeContainer,
  CompressionLabel,
  FooterContent,
  MaximumLimit,
  FileSettings,
  Cancel,
} from './ExtractToEmail.styles';

import { validateEmail } from './utils';

import { getQuerySettings, runEmailExtraction } from '../../modules/queries';
import {
  CONTENT_ENCODING,
  DEFAULT_LIMIT,
  DEFAULT_FILE_FORMAT,
  FILE_FORMATS_OPTIONS,
  EMAIL_EXTRACTION_LIMIT,
} from './constants';

type Props = {
  /** Close event handler */
  onClose: () => void;
};

const ExtractToEmail: FC<Props> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const querySettings = useSelector(getQuerySettings);

  const [isValidEmail, setEmailValidation] = useState(null);
  const [extractionSettings, setExtractionSettings] = useState({
    limit: querySettings.latest ? querySettings.latest : DEFAULT_LIMIT,
    contentEncoding: undefined,
    contentType: DEFAULT_FILE_FORMAT,
    email: '',
  });

  const handleLimitUpdate = useCallback((eventValue) => {
    let updatedLimit = DEFAULT_LIMIT;
    if (eventValue) {
      updatedLimit = parseInt(eventValue);
      if (updatedLimit > EMAIL_EXTRACTION_LIMIT) {
        updatedLimit = EMAIL_EXTRACTION_LIMIT;
      }
    }

    setExtractionSettings((state) => ({
      ...state,
      limit: updatedLimit,
    }));
  }, []);

  const { email, contentType, contentEncoding, limit } = extractionSettings;
  const emailError = isValidEmail === false;

  return (
    <>
      <Container>
        <Label htmlFor="limit" variant="secondary">
          {t('extract_to_email.limit_label')}{' '}
          <MaximumLimit>{t('extract_to_email.limit_max_label')}</MaximumLimit>
        </Label>
        <Input
          data-testid="limit-input"
          type="number"
          variant="solid"
          id="limit"
          placeholder={t('extract_to_email.limit_input_placeholder')}
          value={limit}
          onChange={(e) => handleLimitUpdate(e.target.value)}
        />
        <EmailContainer>
          <Label
            htmlFor="email"
            variant="secondary"
            showAsterisk
            hasError={emailError}
          >
            {t('extract_to_email.email_label')}
          </Label>
          <Input
            data-testid="email-input"
            type="text"
            variant="solid"
            id="email"
            hasError={emailError}
            placeholder={t('extract_to_email.email_input_placeholder')}
            value={email}
            onChange={(e) => {
              e.persist();
              const email = e.target.value;
              const isValidEmail = validateEmail(email);

              setEmailValidation(isValidEmail);
              setExtractionSettings((state) => ({
                ...state,
                email,
              }));
            }}
          />
          <ErrorContainer>
            {emailError && <Error>{t('extract_to_email.email_error')}</Error>}
          </ErrorContainer>
        </EmailContainer>
        <Label htmlFor="contentType" variant="secondary">
          {t('extract_to_email.file_format_label')}
        </Label>
        <FileSettings>
          <ContentTypeContainer>
            <RadioGroup
              items={FILE_FORMATS_OPTIONS}
              activeItem={contentType}
              onClick={({ value }) =>
                setExtractionSettings((state) => ({
                  ...state,
                  contentType: value as string,
                }))
              }
            />
          </ContentTypeContainer>
          <Label htmlFor="gzip">
            <Checkbox
              id="gzip"
              onChange={() => {
                const value = contentEncoding ? undefined : CONTENT_ENCODING;
                setExtractionSettings((state) => ({
                  ...state,
                  contentEncoding: value,
                }));
              }}
              checked={!!contentEncoding}
            />
            <CompressionLabel>
              {t('extract_to_email.content_encoding_label')}
            </CompressionLabel>
          </Label>
        </FileSettings>
      </Container>
      <ModalFooter>
        <FooterContent>
          <Button
            data-testid="send-email"
            variant="secondary"
            style="solid"
            onClick={() => {
              const isValidEmail = validateEmail(email);
              setEmailValidation(isValidEmail);

              if (isValidEmail) {
                dispatch(
                  runEmailExtraction(email, limit, contentType, contentEncoding)
                );
              }
            }}
          >
            {t('extract_to_email.button_label')}
          </Button>
          <Cancel>
            <Anchor
              onClick={onClose}
              color={colors.blue[500]}
              hoverColor={colors.blue[300]}
            >
              {t('extract_to_email.close_button')}
            </Anchor>
          </Cancel>
        </FooterContent>
      </ModalFooter>
    </>
  );
};

export default ExtractToEmail;
