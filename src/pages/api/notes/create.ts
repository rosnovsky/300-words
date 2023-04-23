import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import { noteDataSchema, validateInput } from '@/utils/validatiors';
import { errorHandler } from '@/utils/errorHandler';

export default validateInput(noteDataSchema, async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
  } else {
    try {
      const noteData = req.body
      console.log(noteData)

      const createdNote = await supabase.from('notes').insert(noteData)
      if (createdNote.error) throw createdNote.error
      res.status(201).json(createdNote);
    } catch (error) {
      errorHandler(res, error, "Error creating note")
    }
  }
})
