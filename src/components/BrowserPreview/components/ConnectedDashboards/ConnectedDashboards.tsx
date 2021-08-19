import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { transparentize } from 'polished';
import { AnimatePresence } from 'framer-motion';

import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { ConnectedDashboard } from '../../../../modules/savedQuery';
import { ITEMS_TO_SHOW } from './constants';

import ConnectedDashboardItem from '../ConnectedDashboardItem';
import { Wrapper, LinkWrapper, Item } from './ConnectedDashboards.styles';

type Props = {
  dashboards: ConnectedDashboard[];
};

const ConnectedDashboards: FC<Props> = ({ dashboards }) => {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);

  const itemsToShow = showMore ? dashboards.length : ITEMS_TO_SHOW;

  if (!dashboards || !dashboards.length)
    return (
      <BodyText variant="body2" color={transparentize(0.5, colors.black[100])}>
        {t('browser_preview.dashboards_none')}
      </BodyText>
    );

  if (dashboards.length)
    return (
      <div>
        <AnimatePresence>
          <Wrapper
            transition={{ duration: 0.3 }}
            animate={
              showMore
                ? {
                    maxHeight: 500,
                  }
                : {
                    maxHeight: 50,
                  }
            }
          >
            {dashboards.map(
              ({ id, title }, idx, arr) =>
                idx <= itemsToShow - 1 && (
                  <Item key={id}>
                    <ConnectedDashboardItem dashboard={{ id, title }} />
                    {idx < itemsToShow - 1 && idx < arr.length - 1 && (
                      <BodyText variant="body2">{', '}</BodyText>
                    )}
                  </Item>
                )
            )}
          </Wrapper>
        </AnimatePresence>
        {dashboards.length > ITEMS_TO_SHOW && (
          <LinkWrapper onClick={() => setShowMore(!showMore)}>
            <BodyText
              variant="body2"
              fontWeight="bold"
              color={colors.blue[500]}
            >
              {showMore
                ? t('browser_preview.show_less')
                : t('browser_preview.show_more')}
            </BodyText>
          </LinkWrapper>
        )}
      </div>
    );
};

export default ConnectedDashboards;
