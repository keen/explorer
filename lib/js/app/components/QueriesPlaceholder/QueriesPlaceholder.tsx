import React, { FC } from 'react';

import {
  Container,
  Placeholder,
  SearchMessage,
} from './QueriesPlaceholder.styles';

type Props = {
  /** Empty search message */
  emptySearchMessage?: string;
};

const QueriesPlaceholder: FC<Props> = ({ emptySearchMessage }) => (
  <Container data-testid="queries-placeholder">
    <Placeholder opacityAmount={0.8} />
    <Placeholder opacityAmount={0.82}>
      {emptySearchMessage && (
        <SearchMessage data-testid="empty-search-message">
          {emptySearchMessage}
        </SearchMessage>
      )}
    </Placeholder>
    <Placeholder opacityAmount={0.84} />
    <Placeholder opacityAmount={0.86} />
    <Placeholder opacityAmount={0.88} />
    <Placeholder opacityAmount={0.9} />
    <Placeholder opacityAmount={0.92} />
  </Container>
);

export default QueriesPlaceholder;
