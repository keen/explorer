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
  resourceName?: string;
};

const ResourceName: FC<Props> = ({ resourceName }) => {
  const { t } = useTranslation();
  const [contentInClipboard, setContentInClipboard] = useState(false);
  const isDisabled = !resourceName;

  return (
    <Container
      data-testid="resource-name"
      isDisabled={isDisabled}
      role="button"
      onClick={() => {
        if (resourceName) {
          copyToClipboard(resourceName);
          setContentInClipboard(true);
        }
      }}
    >
      <MousePositionedTooltip
        isActive={true}
        maxContentWidth={300}
        onHideTooltip={() => setContentInClipboard(false)}
        renderContent={() => (
          <>
            {resourceName ? (
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
            ) : (
              <>{t('query_settings.save_query_to_access_resource_name')}</>
            )}
          </>
        )}
      >
        <BodyText
          variant="body3"
          color={
            isDisabled
              ? transparentize(0.5, colors.blue[500])
              : colors.blue[500]
          }
          fontWeight={500}
        >
          {t('query_settings.resource_name')}
          <IconWrapper>
            <Icon
              type="clone"
              width={11}
              height={11}
              fill={transparentize(isDisabled ? 0.5 : 0.2, colors.blue[500])}
            />
          </IconWrapper>
        </BodyText>
      </MousePositionedTooltip>
    </Container>
  );
};

export default ResourceName;
