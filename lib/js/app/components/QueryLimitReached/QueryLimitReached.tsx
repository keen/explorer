import React, { FC } from 'react';

import { Wrapper, Container, Title, Message } from './QueryLimitReached.styles';
import text from './text.json';

type Props = {
  /** Upgrade subscription url */
  upgradeSubscriptionUrl?: string;
};

const QueryLimitReached: FC<Props> = ({ upgradeSubscriptionUrl }) => (
  <Wrapper data-testid="query-execution-limit">
    <Container>
      <Title>{text.title}</Title>
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
          <Message>{text.second_line}</Message>
        </>
      ) : (
        <>
          <Message>{text.first_line}</Message>
          <Message>{text.second_line}</Message>
        </>
      )}
    </Container>
  </Wrapper>
);

export default QueryLimitReached;
