import React, { FC } from 'react';
import { stringify } from 'query-string';

type Props = {
  /** Keen analysis client*/
  keenAnalysis: any;
  /** Query definition */
  query: any;
};

const APIQueryUrl: FC<Props> = ({ keenAnalysis, query }) => {
  const { analysis_type: analysisType, ...queryParams } = query;
  const {
    config: { protocol, host, projectId, masterKey },
  } = keenAnalysis;

  const params = stringify(queryParams);
  const queryURL = `${protocol}://${host}/3.0/projects/${projectId}/queries/${analysisType}?api_key=${masterKey}&${params}`;

  return <div>{queryURL}</div>;
};

export default APIQueryUrl;
