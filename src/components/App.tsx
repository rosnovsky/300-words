import React, { useEffect, useState } from 'react';
import NoteList from './NoteList';
import '../styles.css';
import type { Note as NoteType } from '../types';
import NoteForm from './NoteForm';
import NoteService from '../services/NotesService';

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const allNotes = await NoteService.getAllNotes();
      alert(allNotes)
      setNotes(allNotes);
    };

    fetchNotes();
  }, [notes]);

  const addNote = async (title: string, content: string) => {
    const newNote = await NoteService.createNote(title, content);
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <div className="app min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Note-taking App
        </h1>
        <NoteList notes={notes} />
        <div className="mt-10 w-full lg:w-1/2 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Add a new note</h2>
          <NoteForm onSubmit={() => addNote} />
        </div>
      </div>
    </div>
  );
};

export default App;
