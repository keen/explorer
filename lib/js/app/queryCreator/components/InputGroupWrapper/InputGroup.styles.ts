import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

type Props = {
  isActive: boolean;
  isDragged: boolean;
};

export const Container = styled.div<Props>`
  position: relative;

  display: inline-flex;
  align-items: center;
  height: 37px;
  border-radius: 4px;

  `;
  // ${props => props.isActive && css`box-shadow: 0 0 3px 1px ${transparentize(0.85, colors.black['500'])};`}
  // cursor: ${props => props.isActive ? 'default' : props.isDragged ? 'grabbing' : 'grab'};