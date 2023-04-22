import React from 'react';
import Note from './Note';
import type { Note as NoteType } from '@prisma/client';

interface NoteListProps {
  notes: NoteType[];
  onUpdateClick: (noteId: string, content: string) => void;
  onDeleteClick: (note: NoteType) => void;
  setReloadNotes: (value: boolean) => void;
}

const NoteList = ({ notes, setReloadNotes, onUpdateClick, onDeleteClick }: NoteListProps) => {
  return (
    <div className="note-list grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.length > 0 &&
        notes.map((note) => (
          <Note key={note.id} {...note} setReloadNotes={setReloadNotes} onUpdateClick={() => onUpdateClick(note.id, note.content)} onDeleteClick={() => onDeleteClick(note)} />
        ))}
    </div>
  );
};

export default NoteList;
