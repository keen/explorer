import React, { FC, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Label, Button, ModalFooter } from '@keen.io/ui-core';

import { Container } from './ExtractToEmail.styles';
import text from './text.json';

import { getQuerySettings, runEmailExtraction } from '../../modules/queries';
import { DEFAULT_LIMIT, EMAIL_EXTRACTION_LIMIT } from './constants';

const ExtractToEmail: FC<{}> = () => {
  const dispatch = useDispatch();
  const querySettings = useSelector(getQuerySettings);

  const [extractionSettings, setExtractionSettings] = useState({
    limit: querySettings.latest ? querySettings.latest : DEFAULT_LIMIT,
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

  const { email, limit } = extractionSettings;

  return (
    <>
      <Container>
        <Label htmlFor="limit" variant="secondary">
          {text.limitLabel}
        </Label>
        <Input
          data-testid="limit-input"
          type="number"
          variant="solid"
          id="limit"
          placeholder={text.limitPlaceholder}
          value={limit}
          onChange={(e) => handleLimitUpdate(e.target.value)}
        />
        <Label htmlFor="email" variant="secondary">
          {text.emailLabel}
        </Label>
        <Input
          data-testid="email-input"
          type="text"
          variant="solid"
          id="email"
          placeholder={text.emailPlaceholder}
          value={email}
          onChange={(e) => {
            e.persist();
            setExtractionSettings((state) => ({
              ...state,
              email: e.target.value,
            }));
          }}
        />
      </Container>
      <ModalFooter>
        <Button
          data-testid="send-email"
          variant="secondary"
          style="solid"
          onClick={() => dispatch(runEmailExtraction(email, limit))}
        >
          {text.buttonLabel}
        </Button>
      </ModalFooter>
    </>
  );
};

export default ExtractToEmail;
