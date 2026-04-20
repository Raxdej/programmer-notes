import { useState } from 'react';
import SyntaxView from '../../components/SyntaxView';
import './NoteDetail.css';

export default function NoteDetail({ note, onDelete }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!note) return;
    try {
      await navigator.clipboard.writeText(note.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!note) {
    return (
      <div className="note-detail empty">
        <div className="placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <p>Selecciona una nota para ver su contenido</p>
        </div>
      </div>
    );
  }

  return (
    <div className="note-detail">
      <div className="note-header">
        <div className="note-info">
          <h2>{note.title}</h2>
          <div className="note-meta">
            <span className="language-badge">{note.language}</span>
            <span className="date">Creada: {formatDate(note.createdAt)}</span>
          </div>
          {note.tags.length > 0 && (
            <div className="tags">
              {note.tags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className="note-actions">
          <button 
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                Copiado
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copiar
              </>
            )}
          </button>
          <button className="delete-btn" onClick={() => onDelete(note.id)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3,6 5,6 21,6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
      <div className="code-container">
        <SyntaxView code={note.code} language={note.language} />
      </div>
    </div>
  );
}