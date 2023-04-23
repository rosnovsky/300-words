import { NextRequest, NextResponse } from 'next/server';
import { psClient } from '@/utils/planetscale';
import type { Note } from '@/types'
import { errorHandler } from '@/utils/errorHandler';

export const config = {
  runtime: 'edge',
};

export default async function handler(
  req: NextRequest,
  res: NextResponse
) {
  try {
    const notes = (await psClient.execute("select * from notes")).rows as Note[]
    return NextResponse.json({ notes });
  } catch (error) {
    errorHandler(res, error, "Error fetching notes")
  }
}
