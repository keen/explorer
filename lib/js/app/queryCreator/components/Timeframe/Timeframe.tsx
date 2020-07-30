import React, { FC, useState, useRef, useEffect } from 'react';

import { Container, SettingsContainer } from './Timeframe.styles';
import text from './text.json';

import Title from '../Title';
import Tabs from '../Tabs';
import Dropdown from '../Dropdown';
import DropableContainer, { Variant } from '../DropableContainer';
import AbsoluteTime, { TIME_PICKER_CLASS } from '../AbsoluteTime';
import AbsoluteTimeLabel from '../AbsoluteTimeLabel';
import RelativeTime from '../RelativeTime';
import RelativeTimeLabel from '../RelativeTimeLabel';
import Timezone, { getTimezoneValue } from '../Timezone';

import { getDefaultAbsoluteTime } from './utils/getDefaultAbsoluteTime';
import { convertRelativeTime } from './utils/convertRelativeTime';

import { ABSOLUTE_TAB, RELATIVE_TAB, TABS_SETTINGS } from './constants';
import { DEFAULT_TIMEFRAME } from '../../modules/query';

import { Timeframe as TimeframeType, Timezones } from '../../types';

type Props = {
  /** Unique identifer */
  id: string;
  /** Timeframe change event handler */
  onTimeframeChange: (timeframe: TimeframeType) => void;
  /** Timezone change event handler */
  onTimezoneChange: (timezone: Timezones) => void;
  /** Timezone value */
  timezone: number | Timezones;
  /** Current timeframe value */
  value: TimeframeType;
  /** Reset field event handler */
  onReset?: () => void;
  /** Container variant */
  variant?: Variant;
};

const Timeframe: FC<Props> = ({
  id,
  onTimeframeChange,
  onTimezoneChange,
  onReset,
  timezone,
  value,
  variant = 'primary',
}) => {
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (onReset) onReset();
    };
  }, []);

  const timezoneValue = getTimezoneValue(timezone);

  return (
    <Container ref={containerRef}>
      <Title onClick={() => !isOpen && setOpen(true)}>{text.label}</Title>
      <DropableContainer
        variant={variant}
        onClick={() => !isOpen && setOpen(true)}
        isActive={isOpen}
        value={value}
        onDefocus={(event: any) => {
          if (
            !event.path?.includes(containerRef.current) &&
            !event.path?.includes(
              document.querySelector(`.${TIME_PICKER_CLASS}`)
            )
          ) {
            setOpen(false);
          }
        }}
      >
        {typeof value === 'string' ? (
          <RelativeTimeLabel {...convertRelativeTime(value)} />
        ) : (
          <AbsoluteTimeLabel
            start={value.start}
            end={value.end}
            timezone={timezoneValue}
          />
        )}
      </DropableContainer>
      <Dropdown isOpen={isOpen}>
        <Tabs
          activeTab={typeof value === 'string' ? RELATIVE_TAB : ABSOLUTE_TAB}
          onClick={(tabId) => {
            if (tabId === RELATIVE_TAB) {
              onTimeframeChange(DEFAULT_TIMEFRAME);
            } else {
              onTimeframeChange(getDefaultAbsoluteTime(timezoneValue));
            }
          }}
          tabs={TABS_SETTINGS}
        />
        <SettingsContainer>
          {typeof value === 'string' ? (
            <RelativeTime
              onChange={onTimeframeChange}
              {...convertRelativeTime(value)}
            />
          ) : (
            <AbsoluteTime
              id={id}
              {...value}
              timezone={timezoneValue}
              onChange={onTimeframeChange}
            />
          )}
        </SettingsContainer>
        <Timezone
          timezone={timezoneValue}
          onChange={(timezone) => onTimezoneChange(timezone)}
        />
      </Dropdown>
    </Container>
  );
};

export default Timeframe;
