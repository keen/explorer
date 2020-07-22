import React, { FC, useRef, useState, useContext, useCallback } from 'react';
import { stringify } from 'qs';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Tooltip } from '@keen.io/ui-core';

import { Container, TooltipContent } from './APIResource.styles';
import text from './text.json';

import { useTooltipHandler } from '../../hooks';
import { AppContext } from '../../contexts';

import { HIDE_TIME, API_VERSION } from './constants';

type Props = {
  /** Query definition */
  query: Record<string, any>;
  /** Click event handler */
  onClick: (resourceUrl: string) => void;
};

export const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

const APIResource: FC<Props> = ({ query, onClick }) => {
  const { keenAnalysis } = useContext(AppContext);

  const containerRef = useRef(null);
  const hideTooltip = useRef(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
  });

  const { calculateTooltipPosition } = useTooltipHandler(containerRef);

  const createResourceUrl = useCallback(() => {
    const { analysis_type: analysisType, ...queryParams } = query;
    const {
      config: { protocol, host, projectId, masterKey },
    } = keenAnalysis;

    const queryString = stringify(queryParams, {
      indices: false,
      arrayFormat: 'repeat',
      skipNulls: true,
    });

    return `${protocol}://${host}/${API_VERSION}/projects/${projectId}/queries/${analysisType}?api_key=${masterKey}&${queryString}`;
  }, [keenAnalysis, query]);

  return (
    <Container ref={containerRef}>
      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            {...tooltipMotion}
            initial={{ opacity: 0, x: tooltip.x, y: tooltip.y }}
            animate={{
              x: tooltip.x,
              y: tooltip.y,
              opacity: 1,
            }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
            }}
          >
            <Tooltip mode="dark" hasArrow={false}>
              <TooltipContent>{text.copyMessage}</TooltipContent>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        style="outline"
        variant="secondary"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          if (hideTooltip.current) clearTimeout(hideTooltip.current);
          const { tooltipX, tooltipY } = calculateTooltipPosition(e);

          setTooltip((state) => ({
            ...state,
            visible: true,
            x: tooltipX,
            y: tooltipY,
          }));

          hideTooltip.current = setTimeout(() => {
            setTooltip({
              visible: false,
              x: 0,
              y: 0,
            });
          }, HIDE_TIME);

          const resourceUrl = createResourceUrl();
          onClick(resourceUrl);
        }}
      >
        {text.label}
      </Button>
    </Container>
  );
};

export default APIResource;
