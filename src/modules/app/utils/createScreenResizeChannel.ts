import { eventChannel } from 'redux-saga';
import { getScreenDimensions } from './index';

export const createScreenResizeChannel = () =>
  eventChannel((emitter) => {
    const resizeHandler = () => {
      emitter(getScreenDimensions());
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });
