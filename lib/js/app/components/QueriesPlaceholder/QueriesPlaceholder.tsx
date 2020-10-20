import React, { FC } from 'react';

import {
  Container,
  Placeholder,
  SearchMessage,
} from './QueriesPlaceholder.styles';
import text from './text.json';

type Props = {
  /** Empty search indicator */
  isEmptySearch?: boolean;
};

const QueriesPlaceholder: FC<Props> = ({ isEmptySearch }) => (
  <Container data-testid="queries-placeholder">
    <Placeholder opacityAmount={0.8} />
    <Placeholder opacityAmount={0.82}>
      {isEmptySearch && (
        <SearchMessage data-testid="empty-search-message">
          {text.emptySearchMessage}
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
