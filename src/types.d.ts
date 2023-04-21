declare namespace NodeJS {
  interface Module {
    hot?: {
      accept(dependencies: string[] | string, callback: () => void): void;
    };
  }
}

export interface Note {
  id: number;
  title: string;
  content: string;
}

export interface NoteList {
  notes: Note[];
}
