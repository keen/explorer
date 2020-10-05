import React, { FC, useState, useCallback, useMemo } from 'react';
import { Dropdown, Input } from '@keen.io/ui-core';

import {
  Container,
  TimeLabel,
  TimeValue,
  UnitsContainer,
} from './TimePeriod.styles';

import DropdownList from '../DropdownList';
import DropdownListContainer from '../DropdownListContainer';
import DropableContainer from '../DropableContainer';

import { TIME_UNITS } from '../../constants';

type Props = {
  /** Time relativity */
  relativity: string;
  /** Time value */
  value: number;
  /** Timeframe units */
  units: string;
  /** Relative timeframe change event handler */
  onChange: (timeframe: string) => void;
  /** Label value */
  label: string;
  /** Units placeholder */
  unitsPlaceholder: string;
};

const TimePeriod: FC<Props> = ({
  relativity,
  value,
  units,
  onChange,
  label,
  unitsPlaceholder,
}) => {
  const [isUnitsOpen, setUnitsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const changeValueHandler = useCallback(
    (eventValue) => {
      if (eventValue) {
        const updatedValue = parseInt(eventValue);
        onChange(`${relativity}_${updatedValue}_${units}`);
      }
      setInputValue(eventValue);
    },
    [onChange]
  );

  const unitsOptions = useMemo(
    () =>
      Object.values(TIME_UNITS).map((unit) => ({
        label: unit,
        value: unit,
      })),
    []
  );

  return (
    <Container>
      <TimeLabel>{label}</TimeLabel>
      <TimeValue>
        <Input
          variant="solid"
          data-testid="relative-time-input"
          autoFocus
          type="number"
          value={inputValue}
          hasError={!inputValue}
          min={1}
          onChange={(e) => changeValueHandler(e.target.value)}
        />
      </TimeValue>
      <UnitsContainer>
        <DropableContainer
          variant="secondary"
          placeholder={unitsPlaceholder}
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
  );
};

export default TimePeriod;
