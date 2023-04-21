import type { Note } from '../types';

class NoteService {
  async getAllNotes(): Promise<Note[]> {
    const notes = await fetch('http://localhost:3000/api/notes/all').then(res => res.json());
    return notes;
  }

  async createNote(note: Omit<Note, 'id' | 'updatedAt' | 'publishedAt'>) {
    const notes = await fetch('http://localhost:3000/api/notes/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },

      body: JSON.stringify(note)
    }).then(res => res.json());
    return notes;
  }

  async updateNote(note: Note) {
    const notes = await fetch('http://localhost:3000/api/notes/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },

      body: JSON.stringify(note)
    }).then(res => res.json());
    return notes;
  }

  async deleteNote(id: string) {
    const notes = await fetch('http://localhost:3000/api/notes/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },

      body: JSON.stringify({ id })
    }).then(res => res.json());
    return notes;
  }

}

const noteService = new NoteService()

export default noteService;
