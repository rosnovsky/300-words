import type { Note as NoteType } from '@/types';

interface NoteProps extends NoteType {
  onUpdateClick: () => void;
  onDeleteClick: () => void;
  setReloadNotes: (value: boolean) => void;
}

const Note = ({ id, content, title, createdAt, updatedAt, onDeleteClick, onUpdateClick }: NoteProps) => {

  return (
    <div className="note bg-white p-4 rounded shadow mb-4 relative group" >
      <div className="absolute top-0 right-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          className="bg-red-500 text-white p-1 rounded mr-2"
          onClick={onDeleteClick}
        >
          Delete
        </button>
        <button className="bg-blue-500 text-white p-1 rounded" onClick={onUpdateClick}>
          Update
        </button>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-800">{content}</p>
      <pre>id: {id} {updatedAt === createdAt ? '' : ' (edited)'}</pre>
      <pre>publishedAt: {new Date(createdAt).toISOString()}</pre>
    </div >
  );
};

export default Note;
