import React, { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import QueryCreator from '../../queryCreator';
import { AppContext } from '../../contexts';

import { queryEditorMounted } from '../../modules/app';

type Props = {
  onUpdateQuery: (query: Record<string, any>) => void;
};

const Creator: FC<Props> = ({ onUpdateQuery }) => {
  const dispatch = useDispatch();
  const {
    modalContainer,
    virtualFields,
    keenAnalysis: { config },
  } = useContext(AppContext);

  useEffect(() => {
    dispatch(queryEditorMounted());
  }, []);

  return (
    <QueryCreator
      virtualSchemas={virtualFields}
      modalContainer={modalContainer}
      projectId={config.projectId}
      readKey={config.readKey}
      masterKey={config.masterKey}
      host={config.host}
      onUpdateQuery={onUpdateQuery}
    />
  );
};

export default Creator;
