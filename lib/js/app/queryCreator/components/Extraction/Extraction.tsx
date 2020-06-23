import React, { FC, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Input, Checkbox } from '@keen.io/ui-core';

import PropertyNames from '../PropertyNames';
import text from './text.json';

import {
  setPropertyNames,
  setExtractionLimit,
  setExtractionContentEncoding,
  setExtractionRecipientEmail,
  getExtractionLimit,
  getExtractionEncoding,
  getExtractionEmail,
  resetExtraction,
} from '../../modules/query';

import { DEFAULT_LIMIT, GZIP_ENCODING } from './constants';

type Props = {
  /** Events collection identifer */
  collection: string;
};

const Extraction: FC<Props> = ({ collection }) => {
  const dispatch = useDispatch();
  const extractionLimit = useSelector(getExtractionLimit);
  const recipientEmail = useSelector(getExtractionEmail);
  const encoding = useSelector(getExtractionEncoding);

  const [emailExtraction, setEmailExtraction] = useState(!!recipientEmail);

  const changeLimitHandler = useCallback((eventValue) => {
    if (eventValue) {
      const value = parseInt(eventValue);
      dispatch(setExtractionLimit(value));
    } else {
      dispatch(setExtractionLimit(DEFAULT_LIMIT));
    }
  }, []);

  useEffect(() => {
    if (!emailExtraction) {
      dispatch(setExtractionRecipientEmail(undefined));
      dispatch(setExtractionContentEncoding(undefined));
    }
  }, [emailExtraction]);

  useEffect(() => {
    return () => dispatch(resetExtraction());
  }, []);

  return (
    <div>
      <Label>Extraction</Label>
      <PropertyNames
        collection={collection}
        onSelect={(properties) => dispatch(setPropertyNames(properties))}
      />
      <div>
        <Label>{text.limitLabel}</Label>
        <Input
          type="number"
          variant="solid"
          value={extractionLimit}
          defaultValue={100}
          placeholder={text.limitPlaceholder}
          onChange={(e) => changeLimitHandler(e.target.value)}
        />
      </div>
      <Label htmlFor="email-extraction">
        <Checkbox
          id="email-extraction"
          onChange={() => setEmailExtraction(!emailExtraction)}
          checked={emailExtraction}
        />
        to email
      </Label>
      {emailExtraction && (
        <div>
          <Label htmlFor="email">{text.emailLabel}</Label>
          <Input
            type="email"
            id="email"
            variant="solid"
            value={recipientEmail ? recipientEmail : undefined}
            onChange={(e) => {
              const email = e.target.value;
              dispatch(setExtractionRecipientEmail(email));
            }}
          />
          <Label htmlFor="gzip-encoding">
            <Checkbox
              id="gzip-encoding"
              onChange={() => {
                const value =
                  encoding === GZIP_ENCODING ? undefined : GZIP_ENCODING;
                dispatch(setExtractionContentEncoding(value));
              }}
              checked={encoding === GZIP_ENCODING}
            />
            {GZIP_ENCODING}
          </Label>
        </div>
      )}
    </div>
  );
};

export default Extraction;
