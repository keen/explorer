import React, { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@keen.io/ui-core';

import { Content, UpgradeAnchor, DisableMessage } from './LimitTooltip.styles';

import { getCacheQueriesLimit } from '../../../../modules/queries';
import { AppContext } from '../../../../contexts';

const LimitTooltip: FC<{}> = () => {
  const cacheQueriesLimit = useSelector(getCacheQueriesLimit);
  const { upgradeSubscriptionUrl } = useContext(AppContext);
  const { t } = useTranslation();

  return (
    <Tooltip arrowDirection="top" mode="dark">
      <Content>
        {t('limit_tooltip.limit_reached_message')}
        {cacheQueriesLimit && (
          <>
            {' '}
            ({cacheQueriesLimit} {t('limit_tooltip.cached_queries')})
          </>
        )}
        .
        <DisableMessage>
          {t('limit_tooltip.disable_message')}
          {upgradeSubscriptionUrl ? (
            <>
              {' '}
              {t('limit_tooltip.upgrade_connector')}{' '}
              <UpgradeAnchor
                target="_blank"
                rel="noopener noreferrer"
                href={upgradeSubscriptionUrl}
              >
                {t('limit_tooltip.upgrade_anchor')}
              </UpgradeAnchor>
            </>
          ) : null}
        </DisableMessage>
      </Content>
    </Tooltip>
  );
};

export default LimitTooltip;
