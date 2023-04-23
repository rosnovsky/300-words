import type { NextApiRequest, NextApiResponse } from 'next';
import { psClient } from '@/utils/planetscale';
import type { Note } from '@/types'
import { errorHandler } from '@/utils/errorHandler';

export const config = {
  runtime: 'edge',
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const notes = (await psClient.execute("select * from notes")).rows as Note[]
    res.status(200).json({ notes });
  } catch (error) {
    errorHandler(res, error, "Error fetching notes")
  }
}
