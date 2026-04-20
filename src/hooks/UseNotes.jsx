import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'programmer_notes';
const MAX_CODE_LENGTH = 10000;

function getStoredNotes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export default function useNotes() {
  const [notes, setNotes] = useState(getStoredNotes);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = useCallback((title, language, code, tags) => {
    if (code.length > MAX_CODE_LENGTH) {
      alert(`El código no puede exceder ${MAX_CODE_LENGTH} caracteres`);
      return false;
    }

    const newNote = {
      id: Date.now().toString(),
      title: title.trim(),
      language,
      code: code.trim(),
      tags: tags.filter(t => t.trim() !== ''),
      createdAt: new Date().toISOString()
    };

    setNotes(prev => [newNote, ...prev]);
    return true;
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  }, [selectedNote]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    notes: filteredNotes,
    allNotes: notes,
    selectedNote,
    setSelectedNote,
    searchTerm,
    setSearchTerm,
    addNote,
    deleteNote
  };
}