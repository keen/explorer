import React, { FC, useMemo, useContext } from 'react';
import { Button } from '@keen.io/ui-core';
import Prism from 'prismjs';

import { Code } from './EmbedWidget.styles';
import { createCodeSnippet } from './utils';
import text from './text.json';

import { AppContext } from '../../contexts';
import { copyToClipboard } from '../../utils';

type Props = {
  /** Widget type */
  widget: string;
  /** Query definition */
  query: Record<string, any>;
};

const EmbedWidget: FC<Props> = ({ widget, query }) => {
  const { keenAnalysis } = useContext(AppContext);
  const code = useMemo(
    () =>
      createCodeSnippet({
        widget,
        query,
        projectId: keenAnalysis.config.projectId,
        readKey: keenAnalysis.config.readKey,
      }),
    [widget, query]
  );

  const html = useMemo(
    () => Prism.highlight(code, Prism.languages.javascript, 'javascript'),
    [code]
  );

  return (
    <div>
      <Code dangerouslySetInnerHTML={{ __html: html }} />
      <Button
        variant="secondary"
        style="outline"
        onClick={() => copyToClipboard(code)}
      >
        {text.copyLabel}
      </Button>
    </div>
  );
};

export default EmbedWidget;
