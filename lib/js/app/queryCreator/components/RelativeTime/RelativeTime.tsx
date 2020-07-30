import React, { FC, useCallback, useState, useMemo } from 'react';
import { Checkbox } from '@keen.io/ui-core';

import {
  Container,
  RelativityContainer,
  TimeValue,
  TimeLabel,
  UnitsContainer,
  CheckboxLabel,
} from './RelativeTime.styles';

import Title from '../Title';
import Input from '../Input';
import Dropdown from '../Dropdown';
import DropdownList from '../DropdownList';
import DropdownListContainer from '../DropdownListContainer';
import DropableContainer from '../DropableContainer';

import text from './text.json';

import { TIME_UNITS, THIS_RELATIVITY, PREVIOUS_RELATIVITY } from './constants';

type Props = {
  /** Time relativity */
  relativity: string;
  /** Time value */
  value: number;
  /** Timeframe units */
  units: string;
  /** Relative timeframe change event handler */
  onChange: (timeframe: string) => void;
};

const RelativeTime: FC<Props> = ({ relativity, value, units, onChange }) => {
  const [isUnitsOpen, setUnitsOpen] = useState(false);
  const changeValueHandler = useCallback(
    (eventValue) => {
      let updatedValue = 1;
      if (eventValue) {
        updatedValue = parseInt(eventValue);
      }
      onChange(`${relativity}_${updatedValue}_${units}`);
    },
    [onChange]
  );

  const unitsOptions = useMemo(
    () =>
      TIME_UNITS.map((unit) => ({
        label: unit,
        value: unit,
      })),
    []
  );

  return (
    <div data-testid="relative-time">
      <Container>
        <TimeLabel>{text.timeLabel}</TimeLabel>
        <TimeValue>
          <Input
            data-testid="relative-time-input"
            autoFocus
            type="number"
            value={value}
            onChange={(e) => changeValueHandler(e.target.value)}
          />
        </TimeValue>
        <UnitsContainer>
          <DropableContainer
            variant="secondary"
            placeholder={text.unitsPlaceholder}
            onClick={() => !isUnitsOpen && setUnitsOpen(true)}
            isActive={isUnitsOpen}
            value={units}
            dropIndicator
            onDefocus={() => {
              setUnitsOpen(false);
            }}
          >
            {units}
          </DropableContainer>
          <Dropdown isOpen={isUnitsOpen}>
            <DropdownListContainer scrollToActive>
              {(activeItemRef) => (
                <DropdownList
                  ref={activeItemRef}
                  items={unitsOptions}
                  setActiveItem={({ value }) => units === value}
                  onClick={(_e, { value: updatedUnits }) => {
                    onChange(`${relativity}_${value}_${updatedUnits}`);
                  }}
                />
              )}
            </DropdownListContainer>
          </Dropdown>
        </UnitsContainer>
      </Container>
      <RelativityContainer
        onClick={() => {
          const updatedRelativity =
            relativity === THIS_RELATIVITY
              ? PREVIOUS_RELATIVITY
              : THIS_RELATIVITY;
          onChange(`${updatedRelativity}_${value}_${units}`);
        }}
      >
        <Checkbox
          id="relativity"
          checked={relativity === THIS_RELATIVITY}
          onChange={() => {
            // @TODO: Make onChange optional in <Checkbox />
          }}
        />
        <CheckboxLabel>
          <Title>{text.relativityTitle}</Title>
        </CheckboxLabel>
      </RelativityContainer>
    </div>
  );
};

export default RelativeTime;
