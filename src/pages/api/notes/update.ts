import type { NextApiRequest, NextApiResponse } from 'next';
import type { Note } from '@/types'
import { supabase } from '@/utils/supabase';
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
      const updatedNote = await supabase.from('notes').update(noteData).eq('id', noteData.id);

      res.status(201).json({ success: true, message: updatedNote.data });
    } catch (error: any) {
      errorHandler(res, error, "Error updateing note");
    }
  }
})
