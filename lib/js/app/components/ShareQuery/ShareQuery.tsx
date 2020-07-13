import React, { FC, useRef, useState, useEffect } from 'react';
import { Button } from '@keen.io/ui-core';

import text from './text.json';
import { RESTORE_TIME } from './constants';

type Props = {
  /** Share query event handler */
  onShareQuery: () => void;
};

const ShareQuery: FC<Props> = ({ onShareQuery }) => {
  const [isShared, setShare] = useState(false);
  const restoreTimeout = useRef(null);

  useEffect(() => {
    if (isShared) {
      restoreTimeout.current = setTimeout(() => {
        setShare(false);
      }, RESTORE_TIME);
    }

    return () => {
      if (restoreTimeout.current) clearTimeout(restoreTimeout.current);
    };
  }, [isShared]);

  return (
    <Button
      isDisabled={isShared}
      onClick={() => {
        setShare(true);
        onShareQuery();
      }}
    >
      {isShared ? text.shareSuccess : text.shareLabel}
    </Button>
  );
};

export default ShareQuery;
