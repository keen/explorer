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
  /** Disabled indicator */
  isDisabled: boolean;
  /** Clear properties event handler */
  onClearProperties: () => void;
};

const ExtractionTitle: FC<Props> = ({
  isFullExtraction,
  isDisabled,
  onClearProperties,
}) => (
  <Container>
    <Title isDisabled={isDisabled}>{text.title}</Title>
    {!isDisabled && (
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
    )}
  </Container>
);

export default ExtractionTitle;
