// @ts-nocheck
import React, { FC } from 'react';
import ReactJson from 'react-json-view';

import { Container } from './JSONView.styles';

type Props = {
  /** Query execution results */
  analysisResults: Record<string, any>;
};

const JSONView: FC<Props> = ({ analysisResults }) => {
  return (
    <Container>
      <ReactJson
        src={analysisResults}
        style={{
          fontFamily: "'Lato Regular', sans-serif",
        }}
        displayDataTypes={false}
        sortKeys
        iconStyle="square"
      />
    </Container>
  );
};

export default JSONView;
