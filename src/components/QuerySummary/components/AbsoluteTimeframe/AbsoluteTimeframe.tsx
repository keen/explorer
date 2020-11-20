import React, { FC } from 'react';
import moment from 'moment-timezone';
import { useTranslation } from 'react-i18next';

import { getTimezoneValue, Timezones } from '@keen.io/query-creator';
import { Container, Separator } from './AbsoluteTimeframe.styles';

type Props = {
  timeframe: {
    start: string;
    end: string;
  };
  timezone: Timezones | number;
};

const AbsoluteTimeframe: FC<Props> = ({ timeframe, timezone }) => {
  const { t } = useTranslation();
  const { start, end } = timeframe;
  const namedTimezone = getTimezoneValue(timezone);

  return (
    <Container>
      <span>{moment(start).tz(namedTimezone).format('YYYY-MM-DD HH:mm')}</span>
      <Separator>{t('absolute_timeframe.separator')}</Separator>
      <span>{moment(end).tz(namedTimezone).format('YYYY-MM-DD HH:mm')}</span>
    </Container>
  );
};

export default AbsoluteTimeframe;
