import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import { psClient } from '@/utils/planetscale';
import { noteDataSchema, validateInput } from '@/utils/validatiors';
import { errorHandler } from '@/utils/errorHandler';
import { Note } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
  } else {
    try {
      const noteData: Partial<Note> = req.body
      const value = validateInput(noteDataSchema, noteData)
      if (!value) return res.status(400).json(value)

      const createdNote = await psClient.execute(
        `INSERT INTO notes (title, content) VALUES (?, ?)`,
        [value.title, value.content]
      )
      res.status(201).json(createdNote);
    } catch (error) {
      errorHandler(res, error, "Error creating note")
    }
  }
}
