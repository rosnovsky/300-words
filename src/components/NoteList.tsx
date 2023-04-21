import React from 'react';
import Note from './Note';

const NoteList = ({ notes, setReloadNotes }) => {
  return (
    <div className="note-list grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.length > 0 &&
        notes.map((note) => (
          <Note
            title={note.title}
            key={note.id}
            id={note.id}
            content={note.content}
            setReloadNotes={setReloadNotes}
          />
        ))}
    </div>
  );
};

export default NoteList;
