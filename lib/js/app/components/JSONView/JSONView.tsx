// @ts-nocheck
import React, { FC } from 'react';
import Inspector from 'react-json-inspector';

import { Container } from './JSONView.styles';

type Props = {
  /** Query execution results */
  analysisResults: Record<string, any>;
};

const JSONView: FC<Props> = ({ analysisResults }) => {
  return (
    <Container>
      <Inspector
        data={analysisResults}
        search={false}
        displayDataTypes={false}
        isExpanded={function () {
          return true;
        }}
      />
    </Container>
  );
};

export default JSONView;
