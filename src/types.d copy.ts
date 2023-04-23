export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  metadata: {
    wordCount?: number;
    characterCount?: number;
    summary?: string;
    readingTime?: number;
  }
}
