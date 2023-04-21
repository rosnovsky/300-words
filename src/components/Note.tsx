import React from 'react';

const Note = ({ id, content, title, setReloadNotes }) => {
  const handleDelete = async () => {
    console.log('Delete note with id:', id);
    await fetch(`http://localhost:3000/api/notes/delete/${id}`, {
      method: 'DELETE',
    });
    setReloadNotes(true);
  };

  const handleUpdate = async () => {
    console.log('Update note with id:', id);

    await fetch(`http://localhost:3000/api/notes/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
  };

  return (
    <div className="note bg-white p-4 rounded shadow mb-4 relative group" >
      <div className="absolute top-0 right-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          className="bg-red-500 text-white p-1 rounded mr-2"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className="bg-blue-500 text-white p-1 rounded" onClick={handleUpdate}>
          Update
        </button>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-800">{content}</p>
    </div >
  );
};

export default Note;
