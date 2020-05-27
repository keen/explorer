import React, { FC } from 'react';
import { Button, FadeLoader } from '@keen.io/ui-core';

type Props = {
  /** Save query event handler */
  onSave: () => void;
  /** Saving progress indicator */
  isSaving: boolean;
  /** Query persistance state */
  isExist: boolean;
};

const SaveQuery: FC<Props> = ({ onSave, isExist, isSaving }) => (
  <Button
    variant="secondary"
    style={isExist ? 'outline' : 'solid'}
    isDisabled={isSaving}
    onClick={onSave}
    icon={isSaving && <FadeLoader />}
  >
    {isExist ? 'Update' : 'Save'}
  </Button>
);

export default SaveQuery;
