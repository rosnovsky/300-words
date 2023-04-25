import { Atkinson_Hyperlegible } from 'next/font/google'
import NoteList from '../components/NoteList';
import type { Note } from '@/types';
import React, { useEffect } from 'react';
import NoteForm from '../components/NoteForm';
import Head from 'next/head';
import NotesService from '@/services/NotesService';
import { useAppContext } from '@/contexts/NotesContext';

const atkinson = Atkinson_Hyperlegible({ weight: ['400'], subsets: ['latin'] })

const App: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const { notes, reloadNotes, initialLoad, isEditing, editingNote } = state;

  useEffect(() => {
    const fetchNotes = async () => {
      const allNotes = await NotesService.getAllNotes();
      dispatch({ type: 'SET_NOTES', payload: allNotes });
    };

    fetchNotes();
  }, [reloadNotes]);

  const handleFormSubmit = async (note: Note | Pick<Note, "content">) => {
    if (isEditing && editingNote) {
      await NotesService.updateNote(note as Note);
      dispatch({ type: 'SET_EDITING_NOTE', payload: null });
      dispatch({ type: 'SET_IS_EDITING', payload: false });
    } else {
      await NotesService.createNote(note as Omit<Note, 'id' | 'publishedAtAt' | 'updatedAt'>);
    }
    dispatch({ type: 'TOGGLE_RELOAD_NOTES', payload: !reloadNotes })
  };

  const handleUpdate = (note: Note) => {
    const noteToUpdate = notes.find((noteToUpdate) => noteToUpdate.id === note.id);
    if (noteToUpdate) {
      dispatch({
        type: "HANDLE_UPDATE",
        payload: {
          editingNote: noteToUpdate,
          initialLoad: true,
          isEditing: true
        }
      })
    }
  };

  const handleDelete = async (note: Note) => {
    await NotesService.deleteNote(note.id);
    dispatch({ type: 'TOGGLE_RELOAD_NOTES', payload: !reloadNotes })
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
        <NoteList
          onUpdateClick={handleUpdate}
          onDeleteClick={handleDelete} />
        <div className="mt-10 w-full lg:w-1/2 mx-auto">
          <NoteForm
            onSubmit={handleFormSubmit}
            initialValue={editingNote}
            isEditing={isEditing}
            setIsEditing={isEditing => dispatch({ type: 'SET_IS_EDITING', payload: isEditing })}
            initialLoad={initialLoad}
            setInitialLoad={initialLoad => dispatch({ type: 'SET_INITIAL_LOAD', payload: initialLoad })} />
        </div>
      </div>
    </div>
  );
};

export default App;
