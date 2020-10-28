import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@keen.io/ui-core';

import { RelativityContainer, CheckboxLabel } from './RelativeTime.styles';

import TimePeriod from '../TimePeriod';

import Title from '../Title';

import { getInterval } from '../../utils';

import { THIS_RELATIVITY, PREVIOUS_RELATIVITY } from './constants';

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
  const { t } = useTranslation();
  const interval = getInterval(units);
  return (
    <div data-testid="relative-time">
      <TimePeriod
        label={t('query_creator_relative_time.time_label')}
        unitsPlaceholder={t('query_creator_relative_time.units_placeholder')}
        relativity={relativity}
        value={value}
        units={units}
        onChange={onChange}
      />
      <RelativityContainer
        onClick={() => {
          const updatedRelativity =
            relativity === THIS_RELATIVITY
              ? PREVIOUS_RELATIVITY
              : THIS_RELATIVITY;
          onChange(`${updatedRelativity}_${value}_${units}`);
        }}
      >
        <Checkbox id="relativity" checked={relativity === THIS_RELATIVITY} />
        <CheckboxLabel>
          <Title>
            {interval === 'day'
              ? t('query_creator_relative_time.relativity_title_for_today')
              : `${t(
                  'query_creator_relative_time.relativity_title'
                )} ${interval}`}
          </Title>
        </CheckboxLabel>
      </RelativityContainer>
    </div>
  );
};

export default RelativeTime;
