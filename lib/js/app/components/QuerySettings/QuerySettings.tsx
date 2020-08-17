import React, { FC, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ErrorContainer } from '@keen.io/forms';
import {
  Anchor,
  Input,
  Label,
  Button,
  Error,
  FadeLoader,
  ModalFooter,
} from '@keen.io/ui-core';

import {
  Settings,
  Cancel,
  FooterContent,
  NewQueryNotice,
} from './QuerySettings.styles';

import { getSavedQuery } from '../../modules/savedQuery';
import { getQueriesSaving } from '../../modules/queries';
import text from './text.json';

import { slugify } from '../../utils/text';

type Props = {
  /** Save query event handler */
  onSave: (settings: { displayName: string; name: string }) => void;
  /** Close settings event handler */
  onClose: () => void;
};

const QuerySettings: FC<Props> = ({ onSave, onClose }) => {
  const savedQuery = useSelector(getSavedQuery);
  const isSavingQuery = useSelector(getQueriesSaving);

  const [querySettings, setQuerySettings] = useState(savedQuery);
  const [queryNameError, setQueryNameError] = useState(false);

  const handleQueryNameUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setQueryNameError(!value);
      setQuerySettings((settings) => ({
        ...settings,
        name: slugify(value),
        displayName: value,
      }));
    },
    []
  );

  const { exists } = savedQuery;

  return (
    <>
      <Settings>
        {!exists && <NewQueryNotice>{text.newQueryNotice}</NewQueryNotice>}
        <Label
          htmlFor="queryName"
          variant="secondary"
          showAsterisk
          hasError={queryNameError}
        >
          {text.queryName}
        </Label>
        <Input
          data-testid="query-name-input"
          type="text"
          variant="solid"
          id="queryName"
          hasError={queryNameError}
          placeholder={text.queryNamePlaceholder}
          value={querySettings.displayName}
          onChange={handleQueryNameUpdate}
        />
        <ErrorContainer>
          {queryNameError && <Error>{text.queryNameError}</Error>}
        </ErrorContainer>
      </Settings>
      <ModalFooter>
        <FooterContent>
          <Button
            data-testid="save-query"
            variant="secondary"
            style="solid"
            isDisabled={isSavingQuery}
            icon={isSavingQuery && <FadeLoader />}
            onClick={() => {
              const { name, displayName } = querySettings;
              if (displayName) {
                onSave({ name, displayName });
              } else {
                setQueryNameError(true);
              }
            }}
          >
            {isSavingQuery ? text.savingQuery : text.saveButton}
          </Button>
          {!isSavingQuery && (
            <Cancel>
              <Anchor onClick={onClose}>{text.closeButton}</Anchor>
            </Cancel>
          )}
        </FooterContent>
      </ModalFooter>
    </>
  );
};

export default QuerySettings;
