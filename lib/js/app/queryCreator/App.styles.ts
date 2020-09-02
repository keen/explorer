import styled, { css } from 'styled-components';
import {
  layout,
  flexbox,
  space,
  LayoutProps,
  SpaceProps,
  FlexDirectionProps,
} from 'styled-system';

export const FiltersSettings = styled.div`
  margin-bottom: 20px;
`;

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

export const ActionContainer = styled.div<{ hasSpacing: boolean }>`
  ${(props) =>
    props.hasSpacing &&
    css`
      margin-top: 5px;
    `};
`;
