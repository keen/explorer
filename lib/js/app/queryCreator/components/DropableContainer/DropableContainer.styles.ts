import styled from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { Variant } from './types';

const containerVariants = {
  prop: 'variant',
  variants: {
    primary: {
      background: colors.white[500],
      borderColor: colors.white[500],
      color: colors.blue['500'],
    },
    secondary: {
      background: transparentize(0.85, colors.blue[100]),
      borderColor: transparentize(0.85, colors.blue[100]),
      color: colors.blue['500'],
    },
  },
};

export const Container = styled.div<{
  variant: Variant;
}>`
  ${variant(containerVariants)}
  display: flex;
  padding: 10px 14px;
  height: 37px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato', sans-serif;
  position: relative;
`;

export const Input = styled.input`
  outline: none;
  padding: 0;
  border: none;
  background: transparent;
  color: ${colors.blue[500]};
  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato', sans-serif;
`;
