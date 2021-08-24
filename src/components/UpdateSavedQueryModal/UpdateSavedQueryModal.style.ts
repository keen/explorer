import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Content = styled.div<{ isOverflow?: boolean }>`
  padding: 15px 25px;
  max-height: 250px;
  overflow: auto;

  ${({ isOverflow }) =>
    isOverflow &&
    css`
      box-shadow: inset 0 -2px 4px 0 ${transparentize(0.85, colors.black[500])};
    `};
`;

export const Cancel = styled.div`
  cursor: pointer;
`;

export const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Error = styled.div`
  padding: 10px 0;
`;
