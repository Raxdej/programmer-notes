import NoteCard from '../../components/NoteCard';
import './NoteList.css';

export default function NoteList({ notes, selectedNote, onSelect, searchTerm, onSearch }) {
  return (
    <div className="note-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar notas..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="notes-container">
        {notes.length === 0 ? (
          <div className="empty-state">
            {searchTerm ? 'No se encontraron notas' : 'No hay notas aún'}
          </div>
        ) : (
          notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              isSelected={selectedNote?.id === note.id}
              onClick={() => onSelect(note)}
            />
          ))
        )}
      </div>
    </div>
  );
}