import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { transparentize } from 'polished';
import { BodyText } from '@keen.io/typography';
import { copyToClipboard } from '@keen.io/charts-utils';
import { MousePositionedTooltip } from '@keen.io/ui-core';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Container, Hint, IconWrapper } from './ResourceName.styles';

type Props = {
  /**
   * Saved query resource name
   */
  resourceName: string;
};

const RessourceName: FC<Props> = ({ resourceName }) => {
  const { t } = useTranslation();
  const [contentInClipboard, setContentInClipboard] = useState(false);

  return (
    <Container
      role="button"
      onClick={() => {
        copyToClipboard(resourceName);
        setContentInClipboard(true);
      }}
    >
      <MousePositionedTooltip
        isActive={true}
        maxContentWidth={300}
        onHideTooltip={() => setContentInClipboard(false)}
        renderContent={() => (
          <>
            {contentInClipboard ? (
              <BodyText variant="body2" color={colors.black[100]}>
                {t('query_settings.resource_name_copied')}
              </BodyText>
            ) : (
              <>
                <BodyText variant="body2" color={colors.black[100]}>
                  {t('query_settings.copy_resource_message')}
                </BodyText>
                <BodyText
                  variant="body2"
                  fontWeight="bold"
                  color={colors.black[100]}
                >
                  {resourceName}
                </BodyText>
                <Hint>
                  <BodyText variant="body2" color={colors.black[100]}>
                    {t('query_settings.resource_name_usage_hint')}
                  </BodyText>
                </Hint>
              </>
            )}
          </>
        )}
      >
        <BodyText variant="body3" color={colors.blue[500]} fontWeight={500}>
          {t('query_settings.resource_name')}
          <IconWrapper>
            <Icon
              type="clone"
              width={11}
              height={11}
              fill={transparentize(0.2, colors.blue[500])}
            />
          </IconWrapper>
        </BodyText>
      </MousePositionedTooltip>
    </Container>
  );
};

export default RessourceName;
