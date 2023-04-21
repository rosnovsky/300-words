import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Note } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      if (!req.query.id) throw new Error('No note id provided');
      const id: Note['id'] = req.query.id as string;
      const deletedNote = await prisma.note.delete({
        where: {
          id: id
        },
      });
      res.status(201).json({ success: true, message: deletedNote.id });
    } catch (error) {
      res.status(500).json({ error: "Error deleting note", message: error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
