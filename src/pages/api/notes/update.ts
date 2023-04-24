import type { NextRequest, NextResponse } from 'next/server';
import type { Note } from '@/types'
import { psClient } from '@/utils/planetscale';
import { noteDataSchema, validateInput } from '@/utils/validatiors';
import { errorHandler } from '@/utils/errorHandler';

export const config = {
  runtime: 'edge',
};

export default async function handler(
  req: NextRequest,
  res: NextResponse
) {
  if (req.method !== 'PUT') {
    return new Response('Method not allowed', { status: 405 });
  } else {
    try {
      const noteData: Partial<Note> = await new Response(req.body).json()

      const value = validateInput(noteDataSchema, noteData)

      if (!value) return new Response('Invalid input', { status: 400 })

      const updatedNote = await psClient.execute('UPDATE notes SET content = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?', [value.content, value.id]);

      return new Response('success', { status: 200 });
    } catch (error: any) {
      errorHandler(res, error, "Error updateing note");
    }
  }
}
