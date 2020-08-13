import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Wrapper = styled.div`
  margin: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 17px;

  background-color: ${transparentize(0.95, colors.blue[100])};
`;

export const Title = styled.h2`
  font-family: 'Gangster Grotesk Regular', sans-serif;
  font-size: 20px;
  line-height: 24px;

  margin: 0 0 10px 0;

  color: ${colors.red[500]};
`;

export const Message = styled.p`
font-family: 'Lato Regular', sans-serif;
font-size: 16px;
line-height: 26px;

margin: 0;

color: ${colors.black[500]};

a {
  font-family: 'Lato Bold', sans-serif;
  color: ${colors.green[500]};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
`;
