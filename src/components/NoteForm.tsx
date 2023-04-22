import React, { useEffect, useState } from 'react';
import type { Note } from '@prisma/client';
import useNotes from '../hooks/useNotes';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface NoteFormProps {
  initialValue: Note | null;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  onSubmit: (note: Note | Pick<Note, "content">) => void;
}

const loadFromLocalStorage = (key?: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!key) return null;

  const value = localStorage.getItem(key);
  if (!value || value === "") return null;
  return JSON.parse(value);
}


const NoteForm: React.FC<NoteFormProps> = ({
  onSubmit,
  initialValue,
  isEditing,
  setIsEditing
}: NoteFormProps
) => {
  const [noteContent, setNoteContent] = useNotes(loadFromLocalStorage(initialValue?.id || 'new-note') || "");
  const [localStorage, setLocalStorage] = useLocalStorage();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (isEditing && initialValue) {
      const value = loadFromLocalStorage(initialValue?.id);
      if (value) {
        setNoteContent(value);
      }
      setLocalStorage.setValue(initialValue?.id, initialValue.content);
    }
    setInitialLoad(false);
  }, [isEditing, initialValue])

  useEffect(() => {
    if (isEditing && !initialLoad) {
      setLocalStorage.setValue(initialValue?.id || 'new-note', noteContent.noteContent);
      return;
    }
    setLocalStorage.setValue('new-note', noteContent.noteContent);
  }, [noteContent, initialLoad])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.noteContent) return;
    if (isEditing && initialValue) {
      onSubmit({ content: noteContent.noteContent, id: initialValue.id });
      setIsEditing(false);
      setLocalStorage.deleteKey(initialValue.id);
      setNoteContent("")
    } else {
      onSubmit({ content: noteContent.noteContent });
      setLocalStorage.deleteKey('new-note');
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
            Note <span className="text-sm text-gray-500">{noteContent.wordCount} words, {noteContent.characterCount} characters</span>
          </label>
          <textarea
            id="note-content"
            value={noteContent.noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:bg-blue-300"
          disabled={!noteContent.valid || (isEditing && initialValue?.content === noteContent.noteContent)}
        >
          {isEditing ? "Update Note" : "Save Note"}
        </button>
        {isEditing && <button
          className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded disabled:bg-red-300'
          onClick={() => {
            setNoteContent("");
            setIsEditing(false);
            setLocalStorage.deleteKey(initialValue!.id);
          }}
        >Cancel</button>}
      </form>
    </div>
  );
};

export default NoteForm
