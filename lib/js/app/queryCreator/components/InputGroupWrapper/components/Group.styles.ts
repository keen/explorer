import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

type Props = {
  disableBackground?: boolean;
}

export const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  
  margin-right: 1px;

  background-color: ${transparentize(0.85, colors.blue['100'])};
  ${props => props.disableBackground && css`background: none;`}


  &:first-child {
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    margin-right: 0;
    border-radius: 0 4px 4px 0;
  }
`;