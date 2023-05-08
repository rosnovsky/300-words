import Loading from '@/app/loading';
import Note from '@/components/Note';
import noteService from '@/services/NotesService';
import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';

export const config = {
  runtime: 'edge',
};

export async function getNotes() {
  const notes = await noteService.getAllNotes()
  return notes;
}

const updateNote = async (note: string, id: number) => {
  "use server"
  const updatedNote = await noteService.updateNote(note, id);
  revalidatePath('/')
  return updatedNote;
};

const deleteNote = async (id: number) => {
  "use server"
  const deletedNote = await noteService.deleteNote(id);
  revalidatePath('/')
  return deletedNote;
}

export default async function NoteList() {
  const notes = await getNotes() || []
  const notesInOrder = notes.sort((a, b) => {
    return new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime();
  })
  const latestThreeNotes = notesInOrder.slice(0, 3);
  return (
    <div className="note-list grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {latestThreeNotes.length > 0 &&
        latestThreeNotes.map((note) => (
          <Suspense key={note.id} fallback={<Loading />}>
            <Note
              deleteNote={deleteNote}
              updateNote={updateNote}
              note={note} />
          </Suspense>
        ))}
    </div>
  );
};
