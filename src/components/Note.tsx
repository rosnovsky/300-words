import React from 'react';
import type { Note as NoteType } from '../types';

const Note: React.FC<NoteType> = ({ id, content }) => {
  return (
    <div className="note" id={id}>
      <p>{content}</p>
    </div>
  );
};

export default Note;
