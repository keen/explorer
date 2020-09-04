import styled from 'styled-components';
import {
  layout,
  flexbox,
  space,
  LayoutProps,
  SpaceProps,
  FlexDirectionProps,
} from 'styled-system';

export const ModifiersSettings = styled.div<FlexDirectionProps>`
  display: flex;
  margin-bottom: 20px;

  ${flexbox}
`;

export const ModifiersItem = styled.div<LayoutProps & SpaceProps>`
  ${layout}
  ${space}
`;

export const LimitContainer = styled.div`
  max-width: 100px;
`;
