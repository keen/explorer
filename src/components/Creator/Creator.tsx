import React, { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import QueryCreator from '@keen.io/query-creator';

import { AppContext } from '../../contexts';

import { queryEditorMounted } from '../../modules/app';

type Props = {
  onUpdateQuery: (query: Record<string, any>) => void;
  onUpdateChartSettings: (chartSettings: Record<string, any>) => void;
};

const Creator: FC<Props> = ({ onUpdateQuery, onUpdateChartSettings }) => {
  const dispatch = useDispatch();
  const {
    modalContainer,
    keenAnalysis: { config },
  } = useContext(AppContext);

  useEffect(() => {
    dispatch(queryEditorMounted());
  }, []);

  return (
    <QueryCreator
      modalContainer={modalContainer}
      projectId={config.projectId}
      readKey={config.readKey}
      masterKey={config.masterKey}
      host={config.host}
      onUpdateQuery={onUpdateQuery}
      onUpdateChartSettings={onUpdateChartSettings}
    />
  );
};

export default Creator;
