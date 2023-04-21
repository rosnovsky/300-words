import { Atkinson_Hyperlegible } from 'next/font/google'
import NoteList from '../components/NoteList';
import type { Note } from '../types';
import React, { useState, useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import Head from 'next/head';
import NotesService from '../services/NotesService';

const atkinson = Atkinson_Hyperlegible({ weight: ['400'], subsets: ['latin'] })

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [reloadNotes, setReloadNotes] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const allNotes = await NotesService.getAllNotes();
      setNotes(allNotes);
    };

    fetchNotes();
  }, [reloadNotes]);

  const handleFormSubmit = async (note: Omit<Note, 'id' | 'publishedAt' | 'updatedAt'>) => {
    await NotesService.createNote(note);
    setReloadNotes(!reloadNotes);
  };

  return (
    <div className={`${atkinson.className} app min-h-screen bg-gray-100 py-10`}>
      <Head>
        <title>300 words</title>
      </Head>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Note-taking App
        </h1>
        <NoteList notes={notes} setReloadNotes={setReloadNotes} />
        <div className="mt-10 w-full lg:w-1/2 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Add a new note</h2>
          <NoteForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
};

export default App;
