import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SyntaxView({ code, language }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      showLineNumbers
      wrapLines
      customStyle={{
        margin: 0,
        padding: '1rem',
        fontSize: '0.85rem',
        background: 'var(--code-bg)',
        borderRadius: '6px'
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}