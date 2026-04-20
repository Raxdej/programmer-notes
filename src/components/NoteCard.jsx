export default function NoteCard({ note, isSelected, onClick }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={`note-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <h3>{note.title}</h3>
      <div className="note-meta">
        <span className="language-badge">{note.language}</span>
        <span className="date">{formatDate(note.createdAt)}</span>
      </div>
      {note.tags.length > 0 && (
        <div className="tags">
          {note.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}