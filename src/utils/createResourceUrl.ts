import { stringify } from './stringify';
import { API_VERSION } from '../constants';

export const createResourceUrl = ({ query, config }) => {
  const { analysis_type: analysisType, ...queryParams } = query;
  const { protocol, host, projectId, readKey } = config;
  const urlParams = stringify(queryParams);

  return `${protocol}://${host}/${API_VERSION}/projects/${projectId}/queries/${analysisType}?api_key=${readKey}&${urlParams}`;
};
