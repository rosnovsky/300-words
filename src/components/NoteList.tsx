import Note from '@/components/Note';
import { useAppContext } from '@/contexts/NotesContext';
import type { Note as NoteType } from '@/types';

interface NoteListProps {
  onUpdateClick: (note: NoteType) => void;
  onDeleteClick: (note: NoteType) => void;
}

const NoteList = ({ onDeleteClick, onUpdateClick }: NoteListProps) => {
  const { state } = useAppContext();
  const { notes } = state;

  const notesInOrder = notes.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  })
  const latestThreeNotes = notesInOrder.slice(0, 3);
  return (
    <div className="note-list grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {latestThreeNotes.length > 0 &&
        latestThreeNotes.map((note) => (
          <Note key={note.id} note={note} onDeleteClick={() => onDeleteClick(note)} onUpdateClick={() => onUpdateClick(note)} />
        ))}
    </div>
  );
};

export default NoteList;
