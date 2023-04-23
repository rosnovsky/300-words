import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import type { Note } from '@/types'
import { errorHandler } from '@/utils/errorHandler';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const notes = (await supabase.from("notes").select("*")).data as Note[]
    res.status(200).json({ notes });
  } catch (error) {
    errorHandler(res, error, "Error fetching notes")
  }
}
