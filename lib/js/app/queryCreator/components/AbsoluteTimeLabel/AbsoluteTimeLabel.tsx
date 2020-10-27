import React, { FC, memo } from 'react';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';

import { Container, Separator } from './AbsoluteTimeLabel.styles';

import { Timezones } from '../../types';

type Props = {
  /** Start date in ISO format */
  start: string;
  /** End date in ISO format */
  end: string;
  /** Timezone */
  timezone: Timezones;
};

const AbsoluteTimeLabel: FC<Props> = memo(({ timezone, start, end }) => {
  const { t } = useTranslation();
  return (
    <Container>
      {moment(start).tz(timezone).format('YYYY-MM-DD HH:mm')}
      <Separator>{t('absolute_time_label.separator')}</Separator>
      {moment(end).tz(timezone).format('YYYY-MM-DD HH:mm')}
    </Container>
  );
});

AbsoluteTimeLabel.displayName = 'AbsoluteTimeLabel';

export default AbsoluteTimeLabel;
