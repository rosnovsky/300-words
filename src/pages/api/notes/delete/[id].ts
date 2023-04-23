import type { NextApiRequest, NextApiResponse } from 'next';
import { Note } from '@/types'
import { supabase } from '@/utils/supabase';
import { errorHandler } from '@/utils/errorHandler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ error: 'Method not allowed' });
  } else {
    try {
      const id: Note['id'] = req.query.id as string;
      if (!id) {
        res.status(400).json({ error: 'Missing note id' });
        return;
      }
      const deletedNote = await supabase.from("notes").delete().eq("id", id).single();

      res.status(201).json({ success: true, message: deletedNote.data });
    } catch (error) {
      errorHandler(res, error, "Error deleting note")
    }
  }
}
