import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Title = styled.div`
  color: ${colors.red[500]};
`;

export const Close = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
`;

export const Footer = styled.div`
  display: flex;
`;

export const Description = styled.div<{ isOverflow?: boolean }>`
  width: 350px;
  padding: 20px 25px;
  max-height: 250px;
  overflow: auto;

  color: ${colors.black[500]};

  ${({ isOverflow }) =>
    isOverflow &&
    css`
      box-shadow: inset 0 -2px 4px 0 ${transparentize(0.85, colors.black[500])};
    `};
`;

export const QueryNotUsed = styled.div`
  opacity: 0.5;
`;

export const NoDashboardsInfo = styled.div`
  margin-top: 20px;
`;

export const ConnectedDashboardsWrapper = styled.div`
  margin-top: 20px;
`;
