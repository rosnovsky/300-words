import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const noteData = req.body

      const createdNote = await supabase.from('notes').insert(noteData)
      res.status(201).json(createdNote);
    } catch (error) {
      res.status(500).json({ error: "Error creating note", message: error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
