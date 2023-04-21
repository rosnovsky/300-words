import React, { useState } from 'react';

interface NoteFormProps {
  title?: string;
  content?: string;
  onSubmit: (title: string, content: string) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  title: initialTitle = '',
  content: initialContent = '',
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content);
    alert(title);
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
          // value={content}
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

export default NoteForm;
