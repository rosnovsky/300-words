import express from 'express';
import cors from 'cors';
import setupDatabase from './db/database';

const main = async () => {
  const app = express();
  app.use(cors({ origin: '*' }));
  app.use(express.json());

  const db = await setupDatabase();

  app.get('/api/notes', async (req, res) => {
    console.log('NOTES ROUTE');
    const notes = await db.all('SELECT * FROM notes');
    res.json({ notes });
  });

  app.get('/api/notes/:id', async (req, res) => {
    const id = req.query.id;
    const notes = await db.all(`SELECT * FROM notes WHERE id=${id}`);
    if (!notes) {
      res.send(`No note with id ${id} found.`);
    }
    res.json({ notes });
  });

  app.post('/api/notes', async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required.' });
      return;
    }

    try {
      const result = await db.run(
        'INSERT INTO notes (title, content) VALUES (?, ?)',
        [title, content],
      );
      const noteId = result.lastID;
      const note = await db.get('SELECT * FROM notes WHERE id = ?', [noteId]);

      res.status(201).json(note);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'An error occurred while creating the note.' });
    }
  });

  const HOST = '0.0.0.0';
  const PORT = 9090;
  app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
};

main();
