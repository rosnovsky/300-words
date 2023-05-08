import { Kysely, sql } from 'kysely'
import { createKysely } from '@vercel/postgres-kysely'
import { NotesTable } from '@/types';

interface Database {
  notes: NotesTable
}

// const db = createKysely<Database>();

// export async function up(): Promise<void> {
//   await db.schema
//     .createTable('notes')
//     .addColumn('id', 'serial', (col) => col.primaryKey())
//     .addColumn('title', 'varchar', (col) => col.notNull())
//     .addColumn('content', 'text', (col) => col.notNull())
//     .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).onUpdate('set default'))
//     .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`))
//     .addColumn('metadata', 'json')
//     .execute()
// }

// export async function down(): Promise<void> {
//   await db.schema.dropTable('notes').execute()
// }
