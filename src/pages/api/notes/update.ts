import type { NextApiRequest, NextApiResponse } from 'next';
import type { Note } from '@/types'
import { psClient } from '@/utils/planetscale';
import { noteDataSchema, validateInput } from '@/utils/validatiors';
import { errorHandler } from '@/utils/errorHandler';


export default validateInput(noteDataSchema, async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    res.status(405).json({ error: 'Method not allowed' });
  } else {
    try {
      const noteData: Note = req.body;
      const updatedNote = await psClient.execute('UPDATE notes SET content = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?', [noteData.content, noteData.id]);
      console.log(updatedNote);

      res.status(201).json({ success: true, message: updatedNote.rowsAffected });
    } catch (error: any) {
      errorHandler(res, error, "Error updateing note");
    }
  }
})
