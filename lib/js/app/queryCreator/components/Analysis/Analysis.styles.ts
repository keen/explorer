import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  position: relative;
`;

export const AnalysisTitle = styled.span`
  text-transform: capitalize;
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const Groups = styled.div`
  padding: 10px 0;

  ${List} + ${List} {
    margin-top: 14px;
  }
`;

export const TooltipContainer = styled(motion.div)<{
  tooltipY: number;
}>`
  font-size: 13px;
  line-height: 17px;
  font-family: 'Lato', sans-serif;
  width: 160px;

  position: absolute;
  top: ${(props) => props.tooltipY}px;
  transform: translateX(100%);
`;
