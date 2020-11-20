import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 360px;
`;

type TextProps = {
  color?: string;
};

export const Text = styled.div<TextProps>`
  font-family: 'Gangster Grotesk Regular', sans-serif;
  font-size: 20px;
  line-height: 24px;

  color: ${(props) => (props.color ? props.color : colors.green[400])};
`;

export const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

export const LoaderWrapper = styled.div`
  margin-bottom: 10px;
`;
