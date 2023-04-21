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
  publishedAt: Date;
  updatedAt: Date;
}

export interface NoteList {
  notes: Note[];
}
