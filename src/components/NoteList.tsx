import React from 'react';
import Note from './Note';
import type { NoteList as NoteListType } from '../types'

const NoteList: React.FC<NoteListType> = ({ notes }) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <Note key={note.id} id={note.id} content={note.content} />
      ))}
    </div>
  );
};

export default NoteList;
