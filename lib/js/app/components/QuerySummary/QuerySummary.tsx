import React, { FC } from 'react';

type Props = {
  querySettings: any;
};

const QuerySummary: FC<Props> = ({ querySettings }) => {
  const {
    query: { analysisType, eventCollection },
  } = querySettings;

  return (
    <div>
      <h3>Query details</h3>
      <ul>
        <li>{analysisType}</li>
        <li>{eventCollection}</li>
      </ul>
    </div>
  );
};

export default QuerySummary;
