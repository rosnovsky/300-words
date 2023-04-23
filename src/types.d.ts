declare namespace NodeJS {
  interface Module {
    hot?: {
      accept(dependencies: string[] | string, callback: () => void): void;
    };
  }
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  wordCount?: number;
  characterCount?: number;
  summary?: string;
  readingTime?: number;
}

export interface NoteList {
  notes: Note[];
}
