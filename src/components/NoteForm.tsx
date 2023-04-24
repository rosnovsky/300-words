import React, { useEffect, useState } from 'react';
import type { Note } from '@/types';
import useNotes from '@/hooks/useNotes';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface NoteFormProps {
  initialValue: Note | null;
  isEditing: boolean;
  initialLoad: boolean;
  setInitialLoad: (initialLoad: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
  onSubmit: (note: Note | Pick<Note, "content">) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  onSubmit,
  initialValue,
  isEditing,
  setIsEditing,
  initialLoad,
  setInitialLoad
}: NoteFormProps
) => {
  const [localStorage, setLocalStorage] = useLocalStorage();
  const [noteContent, setNoteContent] = useNotes(localStorage);

  // TODO: refactor this shit
  useEffect(() => {
    if (initialLoad && isEditing && initialValue) {
      const value = setLocalStorage.getValue(initialValue.id);
      if (value) {
        setNoteContent(value);
        setInitialLoad(false);
        return;
      }
      setLocalStorage.setValue(initialValue.id, initialValue.content);
      setNoteContent(initialValue.content);
      setInitialLoad(false);
      return;
    }
    if (isEditing && initialValue) {
      setLocalStorage.setValue(initialValue.id, noteContent.noteContent);
      setNoteContent(noteContent.noteContent);
      return;
    }
    if (initialLoad && !initialValue) {
      const value = setLocalStorage.getValue(0);
      if (value) {
        setNoteContent(value);
        setInitialLoad(false);
        return;
      }
      setLocalStorage.setValue(0, noteContent.noteContent);
      setNoteContent(noteContent.noteContent);
      setInitialLoad(false);
      return
    }
    setLocalStorage.setValue(0, noteContent.noteContent);
    setNoteContent(noteContent.noteContent);
    setInitialLoad(false);
  }, [isEditing, initialValue, noteContent, initialLoad, setNoteContent, setLocalStorage, setInitialLoad])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.noteContent) return;
    if (isEditing && initialValue) {
      onSubmit({ content: noteContent.noteContent, id: initialValue.id });
      setIsEditing(false);
      setLocalStorage.deleteKey(initialValue.id);
      setNoteContent("")
      setInitialLoad(true)
    } else {
      onSubmit({ content: noteContent.noteContent });
      setLocalStorage.deleteKey(0);
      setIsEditing(false);
      setNoteContent("");
      setInitialLoad(true)
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
            setInitialLoad(true)
          }}
        >Cancel</button>}
      </form>
    </div>
  );
};

export default NoteForm
