import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Note } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    try {
      const noteData: Note = req.body;
      const updatedNote = await prisma.note.update({
        where: { id: noteData.id },
        data: noteData,
      });
      res.status(201).json({ success: true, message: updatedNote.id });
    } catch (error) {
      res.status(500).json({ error: "Error updating note", message: error });
    }
  }
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
