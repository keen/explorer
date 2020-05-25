import React, { FC } from 'react';
import { Button, FadeLoader } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';

type Props = {
  onSave: () => void;
  isSaving: boolean;
  isExist: boolean;
};

const SaveQuery: FC<Props> = ({ onSave, isExist, isSaving }) => (
  <Button
    variant="success"
    size="large"
    isDisabled={isSaving}
    onClick={onSave}
    icon={
      isSaving ? (
        <FadeLoader />
      ) : (
        <Icon type="button-arrow" width={32} height={32} />
      )
    }
  >
    {isExist ? 'Update' : 'Save'}
  </Button>
);

export default SaveQuery;
