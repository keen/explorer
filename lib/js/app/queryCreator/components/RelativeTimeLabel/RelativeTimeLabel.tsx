import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Container, IncludesToday } from './RelativeTimeLabel.styles';

import { getInterval } from '../../utils';

type Props = {
  /** Time relativity */
  relativity: string;
  /** Time value */
  value: number;
  /** Timeframe units */
  units: string;
};

const RelativeTimeLabel: FC<Props> = ({ relativity, value, units }) => {
  const { t } = useTranslation();
  const interval = getInterval(units);
  return (
    <Container>
      <span>
        {t('query_creator_relative_time_label.label')} {value} {units}
      </span>{' '}
      {relativity === 'this' && (
        <IncludesToday>
          {interval === 'day'
            ? t('query_creator_relative_time_label.today_includes')
            : `(${t(
                'query_creator_relative_time_label.relativity_title'
              )} ${interval})`}
        </IncludesToday>
      )}
    </Container>
  );
};

export default RelativeTimeLabel;
