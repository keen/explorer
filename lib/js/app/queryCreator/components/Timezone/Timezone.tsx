import React, { FC, useMemo, useState } from 'react';
import { Dropdown } from '@keen.io/ui-core';

import { Container, SelectContainer } from './Timezone.styles';

import Title from '../Title';
import DropdownList from '../DropdownList';
import DropdownListContainer from '../DropdownListContainer';
import DropableContainer from '../DropableContainer';

import { TIMEZONES } from './constants';

import text from './text.json';

import { Timezones } from '../../types';

type Props = {
  /** Timezone value */
  timezone?: Timezones;
  /** Change event handler */
  onChange: (timezone: Timezones) => void;
};

const Timezone: FC<Props> = ({ timezone, onChange }) => {
  const [isOpen, setOpen] = useState(false);
  const options = useMemo(
    () =>
      TIMEZONES.map(({ name }) => ({
        label: name,
        value: name,
      })),
    []
  );

  return (
    <Container data-testid="timezone">
      <Title onClick={() => setOpen(true)}>{text.label}</Title>
      <SelectContainer>
        <DropableContainer
          variant="secondary"
          dropIndicator
          onClick={() => !isOpen && setOpen(true)}
          placeholder={text.placeholder}
          isActive={isOpen}
          value={timezone}
          onDefocus={() => {
            setOpen(false);
          }}
        >
          {timezone}
        </DropableContainer>
        <Dropdown isOpen={isOpen}>
          <DropdownListContainer scrollToActive>
            {(activeItemRef) => (
              <DropdownList
                ref={activeItemRef}
                items={options}
                setActiveItem={({ value }) => value === timezone}
                onClick={(_e, { value }) => {
                  onChange(value);
                }}
              />
            )}
          </DropdownListContainer>
        </Dropdown>
      </SelectContainer>
    </Container>
  );
};

export default Timezone;
