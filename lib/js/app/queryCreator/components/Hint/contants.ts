import { Position } from './types';

export const ARROW_DIRECTION: {
  [position in Position]: Position;
} = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
};
