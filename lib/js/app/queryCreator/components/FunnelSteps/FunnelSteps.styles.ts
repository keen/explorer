import styled from 'styled-components';
import { colors } from '@keen.io/colors';
import { StepContainer } from '../FunnelStep/FunnelStep.styles';

export const AddStep = styled.div`
  background: ${colors.white[500]};
  padding: 9px;
  font-family: Lato Bold, sans-serif;
  font-size: 16px;
  color: ${colors.green[500]};
  text-align: center;
`;

export const Container = styled.div`
  ${StepContainer} + ${StepContainer} {
    margin-top: 10px;
  }

  ${StepContainer} + ${AddStep} {
    margin-top: 10px;
  }
`;
