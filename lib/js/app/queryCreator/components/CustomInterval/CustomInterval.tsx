import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { parseCustomInterval } from './utils/parseCustomInterval';

import { Container } from './CustomInterval.styles';

import TimePeriod from '../TimePeriod';

import { EVERY } from './constants';

type Props = {
  /** Custom interval */
  interval: string;
  /** Change event handler */
  onChange: (interval: string) => void;
};

const CustomInterval: FC<Props> = ({ interval, onChange }) => {
  const { t } = useTranslation();
  const { value, timeUnit } = parseCustomInterval(interval);

  return (
    <Container data-testid="custom-interval">
      <TimePeriod
        label={t('custom_interval.main_label')}
        unitsPlaceholder={t('custom_interval.unit_placeholcer')}
        relativity={EVERY}
        value={value}
        units={timeUnit}
        onChange={(timeframe) => onChange(timeframe)}
      />
    </Container>
  );
};

export default CustomInterval;
