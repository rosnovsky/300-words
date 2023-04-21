import express from 'express';
import cors from 'cors';
import setupDatabase from './db/database';

const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const db = await setupDatabase();

  app.get('/api/notes', async (req, res) => {
    console.log("NOTES ROUTE")
    const notes = await db.all('SELECT * FROM notes');
    res.json({ notes });
  });

  app.get('/api/notes/:id', async (req, res) => {
    const id = req.query.id;
    console.log("NOTES ROUTE")
    const notes = await db.all(`SELECT * FROM notes WHERE id=${id}`);
    if (!notes) { res.send(`No note with id ${id} found.`) }
    res.json({ notes });
  });

  const HOST = '0.0.0.0';
  const PORT = 9090;
  app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
};

main();
