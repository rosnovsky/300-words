import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const id = req.query.id;
      console.log(id);
      if (!id) throw new Error('No note id provided');
      const deletedNote = await prisma.note.delete({
        where: {
          id: id as string,
        },
      });
      res.status(201).json(deletedNote);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
