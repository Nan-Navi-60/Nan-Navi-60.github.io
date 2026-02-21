import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, materialOceanic, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Code ({ children, language }) {
  return (
    <SyntaxHighlighter language={language} style={dracula} showLineNumbers={true}>
        {children}
    </SyntaxHighlighter>
  );
};