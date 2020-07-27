import React, { FC, useState, useRef, useEffect } from 'react';

import { Container } from './Timeframe.styles';
import text from './text.json';

import Title from '../Title';
import Dropdown from '../Dropdown';
import DropableContainer from '../DropableContainer';
import AbsoluteTime, { TIME_PICKER_CLASS } from '../AbsoluteTime';
import RelativeTime from '../RelativeTime';
import RelativeTimeLabel from '../RelativeTimeLabel';
import Timezone, { getTimezoneValue } from '../Timezone';

import { getDefaultAbsoluteTime } from './utils/getDefaultAbsoluteTime';
import { convertRelativeTime } from './utils/convertRelativeTime';

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
};

const Timeframe: FC<Props> = ({
  id,
  onTimeframeChange,
  onTimezoneChange,
  onReset,
  timezone,
  value,
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
      <Title>{text.label}</Title>
      <DropableContainer
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
        <>
          {typeof value === 'string' ? (
            <RelativeTimeLabel {...convertRelativeTime(value)} />
          ) : (
            <div>
              {value.start} - {value.end}
            </div>
          )}
        </>
      </DropableContainer>
      <Dropdown isOpen={isOpen}>
        <div onClick={() => onTimeframeChange(DEFAULT_TIMEFRAME)}>
          {text.relative}
        </div>
        <div
          onClick={() =>
            onTimeframeChange(getDefaultAbsoluteTime(timezoneValue))
          }
        >
          {text.absolute}
        </div>
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
        <Timezone
          timezone={timezoneValue}
          onChange={(timezone) => onTimezoneChange(timezone)}
        />
      </Dropdown>
    </Container>
  );
};

export default Timeframe;
