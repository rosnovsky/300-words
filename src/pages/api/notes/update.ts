import type { NextApiRequest, NextApiResponse } from 'next';
import type { Note } from '@/types'
import { supabase } from '@/utils/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    try {
      const noteData: Note = req.body;
      const updatedNote = await supabase.from('notes').update(noteData).eq('id', noteData.id);

      res.status(201).json({ success: true, message: updatedNote.data });
    } catch (error) {
      res.status(500).json({ error: "Error updating note", message: error });
    }
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
