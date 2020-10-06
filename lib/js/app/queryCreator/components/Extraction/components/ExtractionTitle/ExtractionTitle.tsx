import React, { FC } from 'react';

import {
  Container,
  MessageContainer,
  FullExtraction,
  FilteredExtraction,
  ClearProperties,
} from './ExtractionTitle.styles';
import text from './text.json';

import Title from '../../../Title';

type Props = {
  /** Extracting all properties indicator */
  isFullExtraction: boolean;
  /** Clear properties event handler */
  onClearProperties: () => void;
};

const ExtractionTitle: FC<Props> = ({
  isFullExtraction,
  onClearProperties,
}) => (
  <Container>
    <Title>{text.title}</Title>
    <MessageContainer>
      {isFullExtraction ? (
        <FullExtraction>{text.fullExtraction}</FullExtraction>
      ) : (
        <FilteredExtraction>
          {text.filteredExtraction}{' '}
          <ClearProperties role="button" onClick={onClearProperties}>
            {text.clearProperties}
          </ClearProperties>
        </FilteredExtraction>
      )}
    </MessageContainer>
  </Container>
);

export default ExtractionTitle;
