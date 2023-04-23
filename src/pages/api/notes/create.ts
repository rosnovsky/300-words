import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import { psClient } from '@/utils/planetscale';
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

      const createdNote = await psClient.execute(
        `INSERT INTO notes (title, content) VALUES (?, ?)`,
        [noteData.title, noteData.content]
      )
      console.log(createdNote)
      res.status(201).json(createdNote);
    } catch (error) {
      errorHandler(res, error, "Error creating note")
    }
  }
})
