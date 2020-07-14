import React, { FC } from 'react';
import { stringify } from 'qs';

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

  const params = stringify(queryParams, { indices: false, arrayFormat: 'repeat', skipNulls: true });
  const queryURL = `${protocol}://${host}/3.0/projects/${projectId}/queries/${analysisType}?api_key=${masterKey}&${params}`;

  return <div>{queryURL}</div>;
};

export default APIQueryUrl;
