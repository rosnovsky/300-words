import NoteList from '@/components/NoteList';
import NoteForm from '@/components/NoteForm';
import { Suspense } from 'react';
import Loading from './loading';
import NoteService from '@/services/NotesService';

export default async function AllNotesPage() {
  const createNote = async (note: string) => {
    "use server"
    const newNote = await NoteService.createNote(note);
    return newNote;
  };

  const updateNote = async (note: string, id: number) => {
    "use server"
    const updatedNote = await NoteService.updateNote(note, id);
    return updatedNote;
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-10 text-center">
        300 Words a day
      </h1>
      <Suspense fallback={<Loading />}>
        {/* @ts-expect-error Async Server Component */}
        <NoteList />
      </Suspense>
      <div className="mt-10 w-full md:w-1/3 mx-auto">
        <NoteForm updateNote={updateNote} createNote={createNote} />
      </div>
    </>
  );
}
