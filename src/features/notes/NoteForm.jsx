import { useState } from 'react';
import './NoteForm.css';

const LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'csharp', 'cpp', 'go',
  'rust', 'ruby', 'php', 'swift', 'kotlin', 'sql', 'html', 'css', 'json',
  'bash', 'powershell', 'yaml', 'markdown'
];

export default function NoteForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('El título es requerido');
      return;
    }

    if (!code.trim()) {
      setError('El código es requerido');
      return;
    }

    const tags = tagsInput.split(',').map(t => t.trim());
    const success = onAdd(title, language, code, tags);

    if (success) {
      setTitle('');
      setCode('');
      setTagsInput('');
      setLanguage('javascript');
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>Nueva Nota</h2>
      
      <div className="form-content">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Función factorial"
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Lenguaje</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="code">Código</label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Tu código aquí..."
            rows={12}
          />
          <span className="char-count">{code.length}/10000</span>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Etiquetas (separadas por coma)</label>
          <input
            id="tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="algoritmo, recursividad, matemáticas"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-group">
          <button type="submit">Guardar Nota</button>
        </div>
      </div>
    </form>
  );
}