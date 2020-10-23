import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Wrapper, Container, Title, Message } from './QueryLimitReached.styles';

type Props = {
  /** Upgrade subscription url */
  upgradeSubscriptionUrl?: string;
};

const QueryLimitReached: FC<Props> = ({ upgradeSubscriptionUrl }) => {
  const { t } = useTranslation('common');

  return (
    <Wrapper data-testid="query-execution-limit">
      <Container>
        <Title>{t('query_limit_reached.title')}</Title>
        {upgradeSubscriptionUrl ? (
          <>
            <Message>
              Run query when the new accounting period starts or{' '}
              <a
                href={upgradeSubscriptionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Upgrade
              </a>{' '}
              your plan.
            </Message>
            <Message>{t('query_limit_reached.secondary_message')}</Message>
          </>
        ) : (
          <>
            <Message>{t('query_limit_reached.main_message')}</Message>
            <Message>{t('query_limit_reached.secondary_message')}</Message>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

export default QueryLimitReached;
