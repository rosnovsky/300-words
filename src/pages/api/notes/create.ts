import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const noteData = req.body;
      const newNote = await prisma.note.create({
        data: noteData,
      });
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).json({ error: 'Error creating note' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
