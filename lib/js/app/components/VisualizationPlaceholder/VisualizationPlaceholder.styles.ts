import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 160px;
  background: ${colors.white[500]};

  box-shadow: 0 2px 4px 0 ${transparentize(0.85, colors.black[500])};
`;

type TextProps = {
  color?: string;
}

export const Text = styled.div<TextProps>`
  font-family: 'Gangster Grotesk Regular', sans-serif;
  font-size: 20px;
  line-height: 24px;

  color: ${props => props.color ? props.color : colors.green[400]};
`;

export const LoaderWrapper = styled.div`
  margin-bottom: 10px;
`;
