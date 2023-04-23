import type { NextApiRequest, NextApiResponse } from 'next';
import { Note } from '@/types'
import { psClient } from '@/utils/planetscale';
import { errorHandler } from '@/utils/errorHandler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ error: 'Method not allowed' });
  } else {
    try {
      const id: Note['id'] = Number(req.query.id) as number;
      if (!id) {
        res.status(400).json({ error: 'Missing note id' });
        return;
      }
      const deletedNote = await psClient.execute(`DELETE FROM notes WHERE id = ${id}`)

      console.log(deletedNote)

      res.status(201).json({ success: true, message: deletedNote.rowsAffected });
    } catch (error) {
      errorHandler(res, error, "Error deleting note")
    }
  }
}
