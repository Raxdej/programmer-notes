import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SyntaxView({ code, language }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      showLineNumbers
      lineNumberStyle={{ minWidth: '2.5em' }}
      customStyle={{
        margin: 0,
        padding: '0',
        fontSize: '0.85rem',
        borderRadius: '6px',
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
