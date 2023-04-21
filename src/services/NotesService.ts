import type { Note } from '@prisma/client';

class NoteService {
  async getAllNotes(): Promise<Note[]> {
    const notes = await fetch('http://localhost:3000/api/notes/all').then(res => res.json());
    return notes;
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
    const createdNote = await fetch('http://localhost:3000/api/notes/create', {
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
    const updatedNote = await fetch('http://localhost:3000/api/notes/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(note)
    }).then(res => res.json());
    return updatedNote.id;
  }

  async deleteNote(id: string) {
    const deletedNote = await fetch(`http://localhost:3000/api/notes/delete/${id}`, {
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
