import React from 'react';
import type { Note as NoteType } from '../types';

const Note: React.FC<NoteType> = ({ id, content, title }) => {
  return (
    <div className="note bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-800">{content}</p>
    </div>
  );
};

export default Note;
