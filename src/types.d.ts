export interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  metadata: {
    wordCount?: number;
    characterCount?: number;
    summary?: string;
    readingTime?: number;
  }
}

export interface NotesTable {
  id: Generated<number>
  created_at?: Date
  content: string
  title: string
  updated_at?: Date
  metadata?: {
    wordCount?: number
    characterCount?: number
    summary?: string
    readingTime?: number
  }
}
