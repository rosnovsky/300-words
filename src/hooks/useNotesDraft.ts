// hooks/useNoteDraft.ts
import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useNoteDraft = (
  initialContent: string,
  noteId: string | number | null,
  isEditing: boolean,
  initialLoad: boolean,
  setInitialLoad: (value: boolean) => void
) => {
  const [noteContent, setNoteContentState] = useState(initialContent);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [valid, setValid] = useState(false);
  const { setValue, getValue, deleteKey } = useLocalStorage();

  const setNoteContent = (content: string) => {
    setNoteContentState(content);
    setWordCount(content.trim().split(/\s+/).filter(Boolean).length);
    setCharacterCount(content.length);
    setValid(wordCount > 5)
  };

  useEffect(() => {
    if (initialLoad && noteId !== null) {
      const value = getValue(noteId);
      if (value) {
        setNoteContent(value);
        setInitialLoad(false);
        return;
      }
      setValue(noteId, initialContent);
      setNoteContent(initialContent);
      setInitialLoad(false);
      return;
    }

    if (isEditing && noteId !== null) {
      setValue(noteId, noteContent);
    } else {
      setValue(0, noteContent);
    }

    setInitialLoad(false);
  }, [
    isEditing,
    noteId,
    noteContent,
    initialLoad,
    setInitialLoad,
    setValue,
    getValue,
    initialContent,
    setNoteContent
  ]);

  const saveDraft = (id: string | number) => {
    deleteKey(id);
    setNoteContent('');
    setInitialLoad(true);
  };

  return { noteContent, setNoteContent, saveDraft, wordCount, characterCount, valid };
};

export default useNoteDraft;
