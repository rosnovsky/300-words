import React, { useState } from 'react';
import { Note } from '../types';

interface NoteFormProps {
  onSubmit: (note: Omit<Note, 'id' | 'updatedAt' | 'publishedAt'>) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  onSubmit,
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    const note = { title, content }
    onSubmit(note);
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div className="mb-4">
        <label
          htmlFor="note-title"
          className="block text-gray-700 font-medium mb-2"
        >
          Title
        </label>
        <input
          id="note-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="note-content"
          className="block text-gray-700 font-medium mb-2"
        >
          Content
        </label>
        <textarea
          id="note-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={5}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
      >
        Save
      </button>
    </form>
  );
};

export default NoteForm
