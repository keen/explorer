import React, { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import QueryCreator from '../../queryCreator';
import { AppContext } from '../../contexts';

import { queryEditorMounted } from '../../modules/app';

type Props = {
  onUpdateQuery: (query: Object) => void;
};

const Creator: FC<Props> = ({ onUpdateQuery }) => {
  const dispatch = useDispatch();
  const {
    keenAnalysis: { config },
  } = useContext(AppContext);

  useEffect(() => {
    dispatch(queryEditorMounted());
  }, []);

  return (
    <QueryCreator
      projectId={config.projectId}
      readKey={config.readKey}
      masterKey={config.masterKey}
      onUpdateQuery={onUpdateQuery}
    />
  );
};

export default Creator;
