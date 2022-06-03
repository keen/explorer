import React, { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import QueryCreator from '@keen.io/query-creator';

import { AppContext } from '../../../../contexts';
import { appActions } from '../../../../modules/app';

type Props = {
  onUpdateQuery: (query: Record<string, any>) => void;
  onUpdateChartSettings: (chartSettings: Record<string, any>) => void;
};

const Creator: FC<Props> = ({ onUpdateQuery, onUpdateChartSettings }) => {
  const dispatch = useDispatch();
  const { disableQueryFilterSuggestions } = useContext(AppContext);

  const {
    modalContainer,
    keenAnalysis: { config },
    defaultTimezoneForQuery,
    disableTimezoneSelection,
    timezonesHost,
  } = useContext(AppContext);

  useEffect(() => {
    dispatch(appActions.queryEditorMounted());
  }, []);
  return (
    <QueryCreator
      modalContainer={modalContainer}
      projectId={config.projectId}
      readKey={config.readKey}
      masterKey={config.masterKey}
      host={config.host}
      httpProtocol={config?.protocol}
      onUpdateQuery={onUpdateQuery}
      onUpdateChartSettings={onUpdateChartSettings}
      defaultTimezoneForQuery={defaultTimezoneForQuery}
      disableTimezoneSelection={disableTimezoneSelection}
      disableFilterSuggestions={disableQueryFilterSuggestions}
      timezonesHost={timezonesHost}
    />
  );
};

export default Creator;
