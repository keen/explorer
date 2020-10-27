import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '@keen.io/ui-core';

import { Container } from './FilterBoolean.styles';

import DropableContainer from '../../../DropableContainer';
import DropdownList from '../../../DropdownList';

import { TRUE_LABEL, FALSE_LABEL, OPTIONS } from './constants';

type Props = {
  /** Current value */
  value: boolean;
  /** Change event handler */
  onChange: (value: boolean) => void;
};

const FilterBoolean: FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);

  return (
    <Container>
      <DropableContainer
        isActive={editMode}
        variant="secondary"
        onClick={() => !editMode && setEditMode(true)}
        onDefocus={() => setEditMode(false)}
        placeholder={t('query_creator_filter_boolean.placeholder')}
        value={t('query_creator_filter_boolean.placeholder')}
      >
        {value ? TRUE_LABEL : FALSE_LABEL}
      </DropableContainer>
      <Dropdown isOpen={editMode} fullWidth={false}>
        <DropdownList
          items={OPTIONS}
          setActiveItem={({ value: itemValue }) => itemValue === value}
          onClick={(_e, { value }) => {
            setEditMode(false);
            onChange(value);
          }}
        />
      </Dropdown>
    </Container>
  );
};

export default FilterBoolean;
