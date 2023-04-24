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
