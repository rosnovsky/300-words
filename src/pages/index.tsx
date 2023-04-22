import { Atkinson_Hyperlegible } from 'next/font/google'
import NoteList from '../components/NoteList';
import type { Note } from '@prisma/client';
import React, { useState, useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import Head from 'next/head';
import NotesService from '../services/NotesService';

const atkinson = Atkinson_Hyperlegible({ weight: ['400'], subsets: ['latin'] })

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [reloadNotes, setReloadNotes] = useState<boolean>(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const allNotes = await NotesService.getAllNotes();
      setNotes(allNotes);
    };

    fetchNotes();
  }, [reloadNotes]);

  const handleFormSubmit = async (note: Note | Pick<Note, "content">) => {
    if (isEditing && editingNote) {
      await NotesService.updateNote(note as Note);
      setEditingNote(null);
      setIsEditing(false);
    } else {
      await NotesService.createNote(note as Omit<Note, 'id' | 'publishedAtAt' | 'updatedAt'>);
    }
    setReloadNotes(!reloadNotes);
  };

  const handleUpdate = (note: Note) => {
    if (!note.id) return;
    const noteToUpdate = notes.find((noteToUpdate) => noteToUpdate.id === note.id);
    if (noteToUpdate) {
      setEditingNote(noteToUpdate);
      setIsEditing(true);
    }
  };

  const handleDelete = async (note: Note) => {
    if (!note) return;
    await NotesService.deleteNote(note.id);
    setReloadNotes(!reloadNotes);
  };

  return (
    <div className={`${atkinson.className} app min-h-screen bg-gray-100 py-10`}>
      <Head>
        <title>300 words</title>
      </Head>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-center">
          300 Words a day
        </h1>
        <NoteList notes={notes} setReloadNotes={setReloadNotes} onUpdateClick={handleUpdate} onDeleteClick={handleDelete} />
        <div className="mt-10 w-full lg:w-1/2 mx-auto">
          <NoteForm onSubmit={handleFormSubmit} initialValue={editingNote} isEditing={isEditing} setIsEditing={setIsEditing} />
        </div>
      </div>
    </div>
  );
};

export default App;
