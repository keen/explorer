import React, { FC, useState } from 'react';

import { Container } from './FilterBoolean.styles';

import DropableContainer from '../../../DropableContainer';
import DropdownList from '../../../DropdownList';
import Dropdown from '../../../Dropdown';

import { TRUE_LABEL, FALSE_LABEL, OPTIONS } from './constants';

import text from './text.json';

type Props = {
  /** Current value */
  value: boolean;
  /** Change event handler */
  onChange: (value: boolean) => void;
};

const FilterBoolean: FC<Props> = ({ value, onChange }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Container>
      <DropableContainer
        isActive={editMode}
        variant="secondary"
        onClick={() => !editMode && setEditMode(true)}
        onDefocus={() => setEditMode(false)}
        placeholder={text.placeholder}
        value={'value'}
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
