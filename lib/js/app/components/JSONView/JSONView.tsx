// @ts-nocheck
import React, { FC } from 'react';
import ReactJson from 'react-json-view';

type Props = {
  /** Query execution results */
  analysisResults: Object;
};

const JSONView: FC<Props> = ({ analysisResults }) => {
  return (
    <ReactJson
      src={analysisResults}
      style={{
        fontFamily: 'inherit',
      }}
      collapsed={true}
      displayDataTypes={false}
      sortKeys={true}
    />
  );
};

export default JSONView;
