"use client"
import { useState, useEffect } from 'react';

interface NotesData {
  noteContent: string;
  wordCount: number;
  characterCount: number;
  valid: boolean;
}

const useNotes = (initialContent: string): [NotesData, (content: string) => void] => {
  const [noteContent, setNoteContent] = useState(initialContent || '');
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const trimmedContent = noteContent.trim();

    const words = trimmedContent === '' ? [] : trimmedContent.split(/\s+/);
    setWordCount(words.length);
    setCharacterCount(trimmedContent.length);

    if (wordCount < 5) setValid(false);
    else setValid(true);
  }, [noteContent, wordCount]);

  return [{ noteContent, wordCount, characterCount, valid }, setNoteContent];
};

export default useNotes;
