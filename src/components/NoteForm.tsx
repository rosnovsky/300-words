import React, { useEffect, useState } from 'react';
import type { Note } from '@prisma/client';
import useNotes from '../hooks/useNotes';

interface NoteFormProps {
  initialValues: Note | null;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  onSubmit: (note: Note | Omit<Note, "title" | "id" | 'publishedAt' | 'updatedAt'>) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  onSubmit,
  initialValues,
  isEditing,
  setIsEditing
}: NoteFormProps
) => {
  const [note, setNotesContent] = useNotes('');

  useEffect(() => {
    if (initialValues) {
      setNotesContent(initialValues.content);
    } else {
      const localNote = localStorage.getItem("noteContent");
      setNotesContent(localNote ?? "");
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.noteContent) return;
    if (isEditing && initialValues) {
      onSubmit({ content: note.noteContent, id: initialValues.id });
      setNotesContent("");
      localStorage.removeItem('noteContent');
    } else {
      onSubmit({ content: note.noteContent });
      setNotesContent("");
      localStorage.removeItem('noteContent');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{!isEditing ? "Add" : "Edit"} a note</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <div className="mb-4">
          <label
            htmlFor="note-content"
            className="block text-gray-700 font-medium mb-2"
          >
            Note <span className="text-sm text-gray-500">{note.wordCount} words, {note.characterCount} characters</span>
          </label>
          <textarea
            id="note-content"
            value={note.noteContent}
            onChange={(e) => setNotesContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:bg-blue-300"
          disabled={!note.valid || (isEditing && initialValues?.content === note.noteContent)}
        >
          {isEditing ? "Update Note" : "Save Note"}
        </button>
        {isEditing && <button
          className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded disabled:bg-red-300'
          onClick={() => {
            setNotesContent("");
            setIsEditing(false);
            initialValues = null
          }}
        >Cancel</button>}
      </form>
    </div>
  );
};

export default NoteForm
