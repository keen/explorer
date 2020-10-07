import React, { FC } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
// import github from 'react-syntax-highlighter/dist/esm/styles/hljs/github';
import a11y from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-light';

SyntaxHighlighter.registerLanguage('javascript', js);

type Props = {
  children: string;
};

const EmbedWidget: FC<Props> = ({ children }) => (
  <SyntaxHighlighter language="javascript" style={a11y} wrapLongLines={true}>
    {children}
  </SyntaxHighlighter>
);

export default EmbedWidget;
