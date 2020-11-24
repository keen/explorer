import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;

  font-size: 14px;
  line-height: 17px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.white[500]};
`;

export const DisableMessage = styled.div`
  margin-top: 10px;
`;

export const UpgradeAnchor = styled.a`
  font-family: 'Lato Bold', sans-serif;
  color: ${colors.white[500]};
  text-decoration: none;

  &:hover {
    color: ${colors.white[500]};
  }
`;
