import type { Note } from '../types';

class NoteService {
  async getAllNotes(): Promise<Note[]> {
    const response = await fetch('http://localhost:9090/api/notes');
    const notes = await response.json();
    if (!notes) {
      return [{ id: 0, title: 'title', content: 'content' }];
    }
    return notes;
  }

  async createNote(title: string, content: string): Promise<Note> {
    const response = await fetch('http://localhost:9090/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      const newNote = await response.json();
      return newNote;
    } else {
      throw new Error('An error occurred while creating the note.');
    }
  }

  // async updateNote(id: number, title: string, content: string): Promise<Note> {
  //   // Implement the method to update a note
  // }

  // async deleteNote(id: number): Promise<void> {
  //   // Implement the method to delete a note
  // }
}

export default new NoteService();
