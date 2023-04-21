import { useState, useEffect } from 'react';

interface NotesData {
  noteContent: string;
  wordCount: number;
  characterCount: number;
  valid: boolean;
}

const loadNoteContent = (initialContent: string) => {
  if (typeof window === 'undefined') {
    return initialContent;
  }
  const storedContent = localStorage.getItem('noteContent');
  return storedContent !== null ? storedContent : initialContent;
};

const useNotes = (initialContent: string): [NotesData, (content: string) => void] => {
  const [noteContent, setNoteContent] = useState(() => loadNoteContent(initialContent));
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const trimmedContent = noteContent.trim();
    localStorage.setItem('noteContent', trimmedContent);
    const words = trimmedContent === '' ? [] : trimmedContent.split(/\s+/);
    setWordCount(words.length);
    setCharacterCount(trimmedContent.length);
    if (wordCount < 5) setValid(false);
    else setValid(true);
  }, [noteContent, wordCount]);

  return [{ noteContent, wordCount, characterCount, valid }, setNoteContent];
};

export default useNotes;
