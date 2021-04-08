import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  border: 1px solid ${colors.gray[300]};

  & + & {
    border-top: none;
  }
`;

export const Header = styled.div<{ isOpen: boolean }>`
  padding: 10px 12px;

  display: flex;
  column-gap: 10px;
  align-items: center;

  cursor: pointer;

  ${(props) =>
    props.isOpen &&
    css`
      background-color: ${colors.gray[100]};
      border-bottom: 1px solid ${colors.gray[300]};
    `}
`;

export const IconContainer = styled.div`
  line-height: 1;
`;

export const StepNumber = styled.div`
  flex-shrink: 0;
`;

export const Content = styled.div`
  padding: 10px 10px 0 10px;
`;
