import React, { FC, useRef, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import xml from 'react-syntax-highlighter/dist/cjs/languages/hljs/xml';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import a11y from 'react-syntax-highlighter/dist/cjs/styles/hljs/a11y-light';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

import { Button, Tooltip, UI_LAYERS } from '@keen.io/ui-core';
import { copyToClipboard } from '@keen.io/charts-utils';

import { TOOLTIP_HIDE_TIME, TOOLTIP_MOTION } from '../../../../constants';
import { ButtonContainer, Code, CodeWrapper } from './Syntax.styles';

SyntaxHighlighter.registerLanguage('xml', xml);
SyntaxHighlighter.registerLanguage('javascript', js);

type Props = {
  code: string;
};

const Syntax: FC<Props> = ({ code }) => {
  const { t } = useTranslation();
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [inViewRefTop, inViewTop] = useInView();
  const [inViewRefBottom, inViewBottom] = useInView();

  const containerRef = useRef(null);

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const onCopy = (e) => {
    copyToClipboard(code);
    const {
      top,
      left,
      height,
    }: ClientRect = containerRef.current.getBoundingClientRect();

    const tooltipX = e.pageX - left;
    const tooltipY = e.pageY - top - height;

    setTooltip((state) => ({
      ...state,
      visible: true,
      x: tooltipX,
      y: tooltipY,
    }));

    setTimeout(() => {
      setTooltip((state) => ({
        ...state,
        visible: false,
        x: 0,
        y: 0,
      }));
    }, TOOLTIP_HIDE_TIME);
  };

  return (
    <CodeWrapper>
      <Code
        onMouseEnter={() => setShowCopyButton(true)}
        onMouseLeave={() => setShowCopyButton(false)}
        overflowTop={!inViewTop}
        overflowBottom={!inViewBottom}
        data-testid="code"
        ref={containerRef}
      >
        <div ref={inViewRefTop} />
        <SyntaxHighlighter
          language="javascript"
          style={a11y}
          wrapLongLines={true}
          customStyle={{ margin: '0', padding: '0', background: 'none' }}
        >
          {code}
        </SyntaxHighlighter>
        <div ref={inViewRefBottom} />
        <AnimatePresence>
          {showCopyButton && (
            <ButtonContainer {...TOOLTIP_MOTION}>
              <Button
                variant="secondary"
                style="solid"
                onClick={(e) => onCopy(e)}
              >
                {t('embed_widget.copy')}
              </Button>
            </ButtonContainer>
          )}
        </AnimatePresence>
      </Code>
      <AnimatePresence>
        {tooltip.visible && (
          <motion.div
            {...TOOLTIP_MOTION}
            initial={{ opacity: 0, x: tooltip.x, y: tooltip.y }}
            animate={{
              x: tooltip.x,
              y: tooltip.y,
              opacity: 1,
            }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              zIndex: UI_LAYERS.tooltip,
            }}
          >
            <Tooltip mode="dark" hasArrow={false}>
              {t('embed_widget.copied')}
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </CodeWrapper>
  );
};

export default Syntax;
