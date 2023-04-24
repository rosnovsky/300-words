import { NextRequest, NextResponse } from 'next/server';
import { Note } from '@/types'
import { psClient } from '@/utils/planetscale';
import { errorHandler } from '@/utils/errorHandler';

export const config = {
  runtime: 'edge',
};

export default async function handler(
  req: NextRequest,
  res: NextResponse
) {
  if (req.method !== 'DELETE') {
    return new NextResponse('Method not allowed', { status: 405 });
  } else {
    try {
      // NOTE: This is brittle and should be replaced with a proper url parser
      const id = req.url.split("/").pop()?.split("?")[0]
      console.log(id)
      if (!id) {
        return new NextResponse('No id provided', { status: 400 });
      }
      const deletedNote = await psClient.execute(`DELETE FROM notes WHERE id = ${id}`)

      console.log(deletedNote)

      return new NextResponse("success", { status: 200 });
    } catch (error) {
      errorHandler(res, error, "Error deleting note")
    }
  }
}
