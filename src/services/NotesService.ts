import { Note, NotesTable } from '@/types';
import { db } from '@/utils/kysley';
import { revalidatePath } from 'next/cache';

class NoteService {
  async getAllNotes() {
    "use server"
    const notes = await db
      .selectFrom('notes')
      .selectAll()
      .execute()
    revalidatePath('/')
    return notes
  }

  async createNote(note: string) {
    "use server"
    const title = new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    const noteWithTitle = {
      content: note,
      title,
      updated_at: new Date(),
      metadata: {
        wordCount: 0,
        characterCount: 0,
        readingTime: 0,
        summary: ""
      }
    };

    const notes = await db
      .insertInto('notes')
      .values(noteWithTitle)
      .executeTakeFirstOrThrow()
    revalidatePath('/')
    return notes
  }


  async updateNote(note: string, id: number) {
    "use server"
    const updatedNote = await db
      .updateTable('notes')
      .set({
        content: note,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .executeTakeFirstOrThrow()
    revalidatePath('/')
    return updatedNote
  }

  async deleteNote(id: number) {
    "use server"
    const deletedNote = await db
      .deleteFrom('notes')
      .where('id', '=', id)
      .executeTakeFirstOrThrow()
    revalidatePath('/')
    return deletedNote
  }
}

const noteService = new NoteService();

export default noteService;
