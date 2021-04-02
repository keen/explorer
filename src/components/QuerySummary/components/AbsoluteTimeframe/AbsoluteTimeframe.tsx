import React, { FC } from 'react';
import { Timeframe } from '@keen.io/query';
import { formatDate } from '@keen.io/time-utils';
import { useTranslation } from 'react-i18next';

import { Container, Separator } from './AbsoluteTimeframe.styles';

type Props = {
  timeframe: Exclude<Timeframe, string>;
  timezone: string | number;
};

const AbsoluteTimeframe: FC<Props> = ({ timeframe, timezone }) => {
  const { t } = useTranslation();
  const { start, end } = timeframe;

  return (
    <Container>
      <span>
        {typeof timezone === 'string' ? formatDate(start, timezone) : start}
      </span>
      <Separator>{t('absolute_timeframe.separator')}</Separator>
      <span>
        {typeof timezone === 'string' ? formatDate(end, timezone) : end}
      </span>
    </Container>
  );
};

export default AbsoluteTimeframe;
