import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label, Input } from '@keen.io/ui-core';

import PropertyNames from '../PropertyNames';
import Email from '../Email';

import text from './text.json';

import { setPropertyNames, setExtractionLimit, getExtractionLimit } from '../../modules/query';
import { DEFAULT_LIMIT } from './constants';

type Props = {
  /** Events collection identifer */
  collection: string;
};

const Extraction: FC<Props> = ({ collection }) => {
  const dispatch = useDispatch();
  const extractionLimit = useSelector(getExtractionLimit);

  const changeLimitHandler = useCallback(
    (eventValue) => {
      if (eventValue) {
        const value = parseInt(eventValue);
        dispatch(setExtractionLimit(value));
      } else {
          dispatch(setExtractionLimit(DEFAULT_LIMIT));
      }
    },
    []
  );

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
        placeholder={text.limitPlaceholder}
        onChange={(e) => changeLimitHandler(e.target.value)}
      />
      </div>
      <Email />
    </div>
  );
};

export default Extraction;
