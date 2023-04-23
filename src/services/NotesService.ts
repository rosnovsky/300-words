import { Note } from '@/types';

class NoteService {
  async getAllNotes(): Promise<Note[]> {
    const notes: { notes: Note[] } = await fetch('/api/notes/all').then(res => res.json());
    return notes.notes;
  }

  async createNote(note: Omit<Note, 'id' | 'updatedAt' | 'publishedAt'>) {
    const title = new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
    const noteWithTitle = {
      ...note,
      title
    }
    const createdNote = await fetch('/api/notes/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },

      body: JSON.stringify(noteWithTitle)
    }).then(res => res.json());
    return createdNote.id;
  }

  async updateNote(note: Note) {
    const updatedNote = await fetch('/api/notes/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(note)
    }).then(res => res.json());
    return updatedNote.id;
  }

  async deleteNote(id: number) {
    const deletedNote = await fetch(`/api/notes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then(res => res.json());
    return deletedNote.id;
  }
}

const noteService = new NoteService()

export default noteService;
