// @ts-nocheck
import React, { FC } from 'react';
import ReactJson from 'react-json-view';

import { Container } from './JSONView.styles';

type Props = {
  /** Query execution results */
  analysisResults: Object;
};

const JSONView: FC<Props> = ({ analysisResults }) => {
  return (
    <Container>
      <ReactJson
        src={analysisResults}
        style={{
          fontFamily: 'inherit',
        }}
        collapsed={true}
        displayDataTypes={false}
        sortKeys={true}
      />
    </Container>
  );
};

export default JSONView;
