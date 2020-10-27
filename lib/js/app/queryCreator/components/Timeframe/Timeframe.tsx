import React, { FC, useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '@keen.io/ui-core';

import { Container, SettingsContainer } from './Timeframe.styles';

import Title from '../Title';
import Tabs from '../Tabs';
import DropableContainer, { Variant } from '../DropableContainer';
import AbsoluteTime, { TIME_PICKER_CLASS } from '../AbsoluteTime';
import AbsoluteTimeLabel from '../AbsoluteTimeLabel';
import RelativeTime from '../RelativeTime';
import RelativeTimeLabel from '../RelativeTimeLabel';
import Timezone, { getTimezoneValue } from '../Timezone';

import { getDefaultAbsoluteTime } from './utils/getDefaultAbsoluteTime';
import { convertRelativeTime } from './utils/convertRelativeTime';
import { getEventPath } from '../../utils';

import { ABSOLUTE_TAB, RELATIVE_TAB } from './constants';
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
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (onReset) onReset();
    };
  }, []);

  const timezoneValue = getTimezoneValue(timezone);
  const TABS_SETTINGS = useMemo(
    () => [
      {
        label: t('query_creator_timeframe.relative'),
        id: RELATIVE_TAB,
      },
      {
        label: t('query_creator_timeframe.absolute'),
        id: ABSOLUTE_TAB,
      },
    ],
    []
  );

  return (
    <Container ref={containerRef}>
      <Title onClick={() => !isOpen && setOpen(true)}>
        {t('query_creator_timeframe.label')}
      </Title>
      <DropableContainer
        variant={variant}
        onClick={() => !isOpen && setOpen(true)}
        isActive={isOpen}
        value={value}
        dropIndicator
        onDefocus={(event: any) => {
          const path = getEventPath(event);
          if (
            !path?.includes(containerRef.current) &&
            !path?.includes(document.querySelector(`.${TIME_PICKER_CLASS}`))
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
