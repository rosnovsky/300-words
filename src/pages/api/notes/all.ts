import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import type { Note } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const notes = (await supabase.from("notes").select("*")).data as Note[]
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ error: "Error fetching notes", message: error });
  }
}
