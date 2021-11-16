import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';
import { transparentize } from 'polished';
import { motion } from 'framer-motion';
import { UI_LAYERS } from '@keen.io/ui-core';

export const CodeWrapper = styled.div`
  position: relative;
`;

export const Code = styled.div<{
  overflowTop?: boolean;
  overflowBottom?: boolean;
}>`
  background-color: ${colors.gray[100]};
  margin: 10px 0;
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
  ${({ overflowTop, overflowBottom }) => {
    let boxShadow = ``;
    if (overflowTop)
      boxShadow += `inset 0px 6px 4px -4px ${transparentize(
        0.85,
        colors.black[500]
      )}`;
    if (overflowTop && overflowBottom) boxShadow += ',';
    if (overflowBottom)
      boxShadow += `inset 0 -6px 4px -4px ${transparentize(
        0.85,
        colors.black[500]
      )}`;
    return css`
      box-shadow: ${boxShadow};
    `;
  }};
`;

export const ButtonContainer = styled(motion.div)`
  position: absolute;
  top: 10px;
  right: 10px;

  z-index: ${UI_LAYERS.tooltip};
`;
