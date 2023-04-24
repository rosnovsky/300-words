import { NextRequest, NextResponse } from 'next/server';
import { psClient } from '@/utils/planetscale';
import { noteDataSchema, validateInput } from '@/utils/validatiors';
import { errorHandler } from '@/utils/errorHandler';
import { Note } from '@/types';

export const config = {
  runtime: 'edge',
};

export default async function handler(
  req: NextRequest,
  res: NextResponse
) {
  if (req.method !== 'POST') {
    new Response('Method not allowed', {
      status: 405,
    })
  } else {
    try {
      const noteData: Partial<Note> = await new Response(req.body).json()
      const value = validateInput(noteDataSchema, noteData)
      if (!value) return new Response('Invalid input', { status: 400 })

      const createdNote = await psClient.execute(
        `INSERT INTO notes (title, content) VALUES (?, ?)`,
        [value.title, value.content]
      )
      return new Response(JSON.stringify(createdNote), {
        status: 200,

      })
    } catch (error) {
      errorHandler(res, error, "Error creating note")
    }
  }
}
