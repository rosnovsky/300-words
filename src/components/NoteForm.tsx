import type { Note } from '@/types';
import useNoteDraft from '@/hooks/useNotesDraft';

// TODO: Refactor with reducer; add loading state
interface NoteFormProps {
  initialValue: Note | null;
  isEditing: boolean;
  initialLoad: boolean;
  setInitialLoad: (initialLoad: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
  onSubmit: (note: Note | Pick<Note, "content">) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  onSubmit,
  initialValue,
  isEditing,
  setIsEditing,
  initialLoad,
  setInitialLoad
}: NoteFormProps
) => {
  const {
    noteContent,
    setNoteContent,
    saveDraft,
    wordCount,
    characterCount,
    valid
  } = useNoteDraft(
    initialValue?.content || '',
    isEditing ? initialValue!.id : null,
    isEditing,
    initialLoad,
    setInitialLoad
  );


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent) return;
    if (isEditing && initialValue) {
      onSubmit({ content: noteContent, id: initialValue.id });
      setIsEditing(false);
      saveDraft(initialValue.id);
    } else {
      onSubmit({ content: noteContent });
      saveDraft(0);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{!isEditing ? "Add" : "Edit"} a note</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <div className="mb-4">
          <label
            htmlFor="note-content"
            className="block text-gray-700 font-medium mb-2"
          >
            Note <span className="text-sm text-gray-500">{wordCount} words, {characterCount} characters</span>
          </label>
          <textarea
            id="note-content"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:bg-blue-300"
          disabled={!valid || (isEditing && initialValue?.content === noteContent)}
        >
          {isEditing ? "Update Note" : "Save Note"}
        </button>
        {isEditing && <button
          className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded disabled:bg-red-300'
          onClick={() => {

          }}
        >Cancel</button>}
      </form>
    </div>
  );
};

export default NoteForm
