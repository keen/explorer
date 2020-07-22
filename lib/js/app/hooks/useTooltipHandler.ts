import React, { useCallback } from 'react';

export const useTooltipHandler = (elementRef: React.MutableRefObject<any>) => {
  const calculateTooltipPosition = useCallback(
    (e: React.MouseEvent) => {
      e.persist();
      const {
        top,
        left,
      }: ClientRect = elementRef.current.getBoundingClientRect();

      const tooltipX = e.pageX - left - window.scrollX;
      const tooltipY = e.pageY - top - window.scrollY;

      return {
        tooltipX,
        tooltipY,
      };
    },
    [elementRef]
  );

  return { calculateTooltipPosition };
};
