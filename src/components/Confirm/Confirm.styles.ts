import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Title = styled.div`
  color: ${colors.red[500]};
`;

export const Close = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
`;

export const Footer = styled.div`
  display: flex;
`;

export const Description = styled.div`
  margin: 20px 25px;
  max-width: 350px;

  font-size: 16px;
  line-height: 19px;
  font-family: 'Lato Regular', sans-serif;

  color: ${colors.black[500]};
`;

export const Name = styled.strong`
  display: block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 2;
`;
