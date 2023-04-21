import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const initializeDatabase = async () => {
  const db = await open({
    filename: './notes.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT
    );
  `);

  return db;
};

export default initializeDatabase;
