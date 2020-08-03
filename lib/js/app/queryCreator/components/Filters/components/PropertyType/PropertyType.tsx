import React, { FC, useState } from 'react';

import { Container } from './PropertyType.styles';

import DropableContainer from '../../../DropableContainer';
import DropdownList from '../../../DropdownList';
import DropdownListContainer from '../../../DropdownListContainer';
import Dropdown from '../../../Dropdown';

import { createOptions } from './utils';
import text from './text.json';

import { DATA_TYPES } from './constants';

import { Property } from '../../types';

type Props = {
  /** Property type */
  type: Property;
  /** Change event handler */
  onChange: (type: Property) => void;
  /** Property */
  property?: string;
};

const PropertyType: FC<Props> = ({ property, type, onChange }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Container>
      <DropableContainer
        isActive={editMode}
        variant="secondary"
        onClick={() => !editMode && property && setEditMode(true)}
        onDefocus={() => setEditMode(false)}
        placeholder={text.placeholder}
        value={type}
      >
        {type}
      </DropableContainer>
      <Dropdown isOpen={editMode} fullWidth={false}>
        <DropdownListContainer scrollToActive maxHeight={240}>
          {(activeItemRef) => (
            <DropdownList
              ref={activeItemRef}
              items={createOptions(DATA_TYPES)}
              setActiveItem={({ value }) => value === type}
              onClick={(_e, { value }) => {
                setEditMode(false);
                onChange(value);
              }}
            />
          )}
        </DropdownListContainer>
      </Dropdown>
    </Container>
  );
};

export default PropertyType;
