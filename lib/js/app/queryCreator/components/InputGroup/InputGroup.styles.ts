import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  position: relative;

  display: inline-flex;
  align-items: center;
  height: 37px;
  border-radius: 4px;
  
  &:focus-within {
    box-shadow: 0 0 3px 1px ${transparentize(0.85, colors.black['500'])};
  }
  `;