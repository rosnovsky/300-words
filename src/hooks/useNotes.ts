import { Note } from '@prisma/client';
import { useState, useEffect } from 'react';

interface NotesData {
  noteContent: string;
  wordCount: number;
  characterCount: number;
  valid: boolean;
}

const loadNoteContent = (note: Note) => {
  if (typeof window === 'undefined') {
    return note.content;
  }

  const storageKey = note.id ? `noteContent-${note.id}` : 'noteContent';
  const storedContent = localStorage.getItem(storageKey);
  return storedContent !== null ? storedContent : note.content;
};

const useNotes = (initialContent: Note): [NotesData, (content: string) => void] => {
  const [noteContent, setNoteContent] = useState(() => loadNoteContent(initialContent));
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setNoteContent(loadNoteContent(initialContent));
  }, [initialContent]);

  useEffect(() => {
    const storageKey = initialContent.id ? `noteContent-${initialContent.id}` : 'noteContent';
    localStorage.setItem(storageKey, initialContent.content);
    const trimmedContent = noteContent.trim();

    const words = trimmedContent === '' ? [] : trimmedContent.split(/\s+/);
    setWordCount(words.length);
    setCharacterCount(trimmedContent.length);
    if (wordCount < 5) setValid(false);
    else setValid(true);
  }, [initialContent.id, initialContent.content, noteContent, wordCount]);

  return [{ noteContent, wordCount, characterCount, valid }, setNoteContent];
};

export default useNotes;
