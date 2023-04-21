import React from 'react';
import Note from './Note';
import type { NoteList as NoteListType } from '../types'

const NoteList: React.FC<NoteListType> = ({ notes }) => {
  return (
    <div className="note-list grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Note title={note.title} key={note.id} id={note.id} content={note.content} />
      ))}
    </div>
  );
};

export default NoteList;
