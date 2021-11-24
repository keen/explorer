import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Navigation = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px 25px 20px;
`;

export const NavigationItem = styled.div`
  margin-right: 20px;

  &:last-child {
    margin-right: 0;
  }
`;

export const Link = styled.a`
  text-decoration: none;
  font-family: 'Lato Bold', sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.blue[500]};
  cursor: pointer;

  &:hover {
    color: ${colors.blue[200]};
  }

  transition: color 0.2s linear;
`;

export const EmbedLabel = styled.div`
  margin-bottom: 5px;
`;

export const ModalBody = styled.div`
  padding: 20px 25px 0 20px;
`;

export const ModalWrapper = styled.div`
  width: 600px;
  box-sizing: border-box;
`;

export const Section = styled.div`
  margin-top: 20px;
`;

export const StepLabel = styled.div`
  display: flex;
`;
export const StepNumber = styled.div`
  margin-right: 10px;
`;
