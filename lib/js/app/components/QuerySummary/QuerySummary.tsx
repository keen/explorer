import React, { FC } from 'react';

import { Card } from './QuerySummary.styles';

import { SavedQuery } from '../../types';

type Props = {
  querySettings: SavedQuery;
};

const QuerySummary: FC<Props> = ({ querySettings }) => {
  const {
    query: { analysisType, eventCollection },
  } = querySettings;

  return (
    <Card>
      <h3>Query details</h3>
      <ul>
        <li>{analysisType}</li>
        <li>{eventCollection}</li>
      </ul>
    </Card>
  );
};

export default QuerySummary;
