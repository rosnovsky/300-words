import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Note } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const notes: Note[] = await prisma.note.findMany();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching notes", message: error });
  }
}
