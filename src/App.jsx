import useNotes from './hooks/UseNotes';
import NoteForm from './features/notes/NoteForm';
import NoteList from './features/notes/NoteList';
import NoteDetail from './features/notes/NoteDetail';
import './App.css';

function App() {
  const {
    notes,
    selectedNote,
    setSelectedNote,
    searchTerm,
    setSearchTerm,
    addNote,
    deleteNote
  } = useNotes();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Notas Para Programador</h1>
      </header>
      <main className="app-main">
        <section className="column column-form">
          <NoteForm onAdd={addNote} />
        </section>
        <section className="column column-list">
          <NoteList
            notes={notes}
            selectedNote={selectedNote}
            onSelect={setSelectedNote}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
        </section>
        <section className="column column-detail">
          <NoteDetail note={selectedNote} onDelete={deleteNote} />
        </section>
      </main>
    </div>
  );
}

export default App;