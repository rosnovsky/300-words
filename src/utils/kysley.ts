import { NotesTable } from '@/types';
import { createKysely } from "@vercel/postgres-kysely";

interface Database {
  notes: NotesTable;
}

export const db = createKysely<Database>();
export { sql } from 'kysely'
