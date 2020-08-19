import React, { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip } from '@keen.io/ui-core';

import { Content, UpgradeAnchor, DisableMessage } from './LimitTooltip.styles';
import text from './text.json';

import { getCacheQueriesLimit } from '../../../../modules/queries';
import { AppContext } from '../../../../contexts';

const LimitTooltip: FC<{}> = () => {
  const cacheQueriesLimit = useSelector(getCacheQueriesLimit);
  const { upgradeSubscriptionUrl } = useContext(AppContext);

  return (
    <Tooltip arrowDirection="top" mode="dark">
      <Content>
        {text.limitReachedMessage}
        {cacheQueriesLimit && (
          <>
            {' '}
            ({cacheQueriesLimit} {text.cachedQueries}).
          </>
        )}
        <DisableMessage>
          {text.disableMessage}
          {upgradeSubscriptionUrl ? (
            <>
              {' '}
              {text.upgradeConnector}{' '}
              <UpgradeAnchor target="_blank" href={upgradeSubscriptionUrl}>
                {text.upgradeAnchor}
              </UpgradeAnchor>
            </>
          ) : null}
        </DisableMessage>
      </Content>
    </Tooltip>
  );
};

export default LimitTooltip;
