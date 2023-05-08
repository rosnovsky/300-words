"use client"
import useNoteDraft from '@/hooks/useNotesDraft';
import type { InsertResult, UpdateResult } from 'kysely';
import { useEffect } from 'react';
import { useAppContext } from '@/contexts/NotesContext';

const NoteForm = ({ createNote, updateNote }: { createNote: (note: string) => Promise<InsertResult>, updateNote: (note: string, id: number) => Promise<UpdateResult> }) => {
  const { setNoteContent, noteContent, wordCount, characterCount, valid } = useNoteDraft(
    "",
    null,
    true,
    true,
    () => { }
  )

  const { state, dispatch } = useAppContext();
  const { editingNote, initialLoad, isEditing } = state;

  useEffect(() => {
    if (editingNote) {
      setNoteContent(editingNote.content);
      console.log('editingNote.id', editingNote.id)
    }
  }, [editingNote]);

  const newNote = async () => {
    if (valid) {
      await createNote(noteContent);
      setNoteContent("");
    }
  };

  const updatedNote = async () => {
    if (valid) {
      await updateNote(noteContent, state.editingNote!.id);
      setNoteContent("");
      dispatch({ type: 'HANDLE_UPDATE', payload: { editingNote: null, initialLoad: true, isEditing: false } })
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{state.isEditing ? `Edit note id ${state.editingNote!.id}` : "Add a note"}</h2>
      <form className="note-form">
        <div className="mb-4">
          <label
            htmlFor="note-content"
            className="block text-gray-700 font-medium mb-2"
          >
            Note <span className="text-sm text-gray-500"> {wordCount} words, {characterCount} characters</span>
          </label>
          <textarea
            id="note-content"
            className="w-full p-2 border border-gray-300 rounded"
            rows={5}
            value={noteContent}
            onChange={e => setNoteContent(e.target.value)}
          />
        </div>
        {!state.isEditing ? (
          <button
            type="submit"
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'formAction' does not exist on type 'DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>'.
            formAction={newNote}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:bg-blue-300"
            disabled={!valid}
          >
            Save Note
          </button>) : (
          <button
            type="submit"
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'formAction' does not exist on type 'DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>'.
            formAction={updatedNote}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:bg-blue-300"
            disabled={!valid}
          >
            Update Note
          </button>
        )}
        <button>Cancel</button>
      </form>
    </div>
  );
};

export default NoteForm
