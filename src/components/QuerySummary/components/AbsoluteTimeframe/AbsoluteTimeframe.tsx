import React, { FC } from 'react';
import { transparentize } from 'polished';
import { useTranslation } from 'react-i18next';
import { Timeframe } from '@keen.io/query';
import { formatDate } from '@keen.io/time-utils';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

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
      <BodyText variant="body2">
        {typeof timezone === 'string' ? formatDate(start, timezone) : start}
      </BodyText>
      <Separator>
        <BodyText variant="body2" color={transparentize(0.4, colors.blue[500])}>
          {t('absolute_timeframe.separator')}
        </BodyText>
      </Separator>
      <BodyText variant="body2">
        {typeof timezone === 'string' ? formatDate(end, timezone) : end}
      </BodyText>
    </Container>
  );
};

export default AbsoluteTimeframe;
